import * as rx from 'rxjs/Rx';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as flux from './exports';
import * as utils from '../utils/exports';

var moduleId = 'store';
export type TExceptionCallback = (exp: Error) => void;
export type TCreateStoreCallback = (res: Error | Store) => void;
export class ELoginNeeded extends Error {
  constructor() { super(); this.returnUrl = store.actRoutes(); }
  returnUrl: TRouteActionPar;
}
export interface ITypedObj { _type: string; }

//****************** DECORATOR FOR REGISTERING STORE CLASSES
export function StoreDef(meta: IStoreMeta): ClassDecorator {
  return (storeClass: TStoreClass) => {
    if (!meta.id) meta.id = meta.moduleId + '.' + utils.getClassName(storeClass);
    meta.storeClass = storeClass;
    storeClass.prototype[prototypeMeta] = meta;
    storeMetasDir[meta.id] = meta;
    storeMetas.push(meta);
    return storeClass;
  }
}
const prototypeMeta = 'meta'; //v prototype[prototypeMeta] jsou store meta informace
var storeMetasDir: { [id: string]: IStoreMeta; } = {};
var storeMetas: Array<IStoreMeta> = [];
export interface IStoreMeta {
  moduleId: string;
  id?: string; //<moduleId>.<class name>
  //pro komponenty, co se binduji do route hook
  componentClass?: TComponentClass; //class nabindovana do route hook
  storeClass?: TStoreClass; //
  loginNeeded?: boolean; //true x false. Iff undefined => bere se StoreApp.defaultLoginNeeded.
}
function componentToStore(componentClass: TComponentClass): TStoreClass {
  var res = storeMetas.find(m => m.componentClass == componentClass);
  if (!res || !res.storeClass) throw new utils.Exception(`Missing StoreDef componentClass info: ${utils.getClassName(componentClass)}`);
  return res.storeClass;
}

//****************** ACTION INTERFACES
export interface IAction<T extends IActionPar> { //flux action
  dispPath: string; //Dispatcher.path, identifying action dispatcher
  actionId: number; //action id (use enum for it)
  descr: string;
  par: T; //action parameter
}
export interface IActionPar { } //flux action parameter
export type TAction = IAction<IActionPar>;

export function playActions(actions: Array<TAction>): rx.Observable<any> {
  return rx.Observable.from(actions).concatMap((act: TAction) =>
    rx.Observable.timer(300).concat(
      rx.Observable.create((obs: rx.Subscriber<any>) => {
        var actStore = store.findStore(act.dispPath); if (!actStore) { obs.error(new utils.Exception(`Cannot find store ${act.dispPath}`)); return; }
        try {
          actStore.action(act.actionId, act.descr, act.par, err => { if (err) obs.error(err); else obs.complete(); });
        } catch (err) {
          obs.error(new utils.Exception(err));
        }
        return () => { };
      })));
}

//****************** STORE
export type IChildStores = { [path: string]: Store; };
export interface IStore { $parent: Store; instanceId?: string; childStores: IChildStores; /*sem se nabinduji Stores z child component, ktere nemaji delegovan Store od parenta*/ }
export interface IPropsEx { $parent?: Store; instanceId?: string; }
export interface IProps<T extends Store> {
  initState?: T; //cast globalniho stavy aplikace, ktery je initialnim stavem stateless komponenty
}
export type TProps = IProps<Store>;


@StoreDef({ moduleId: moduleId })
export abstract class Store implements IStore, ITypedObj {
  constructor(public $parent: Store, public instanceId?: string) {
    this._type = this.getMeta().id;
    var idInParent = this.getIdInParent();
    this.path = ($parent ? $parent.path + '/' : '') + idInParent;
  }
  static createInStore<T extends Store>(parent: Store, storeId: string | TStoreClass, completed: TCreateStoreCallback, instanceId?: string, routePar?: IActionPar) {
    var cls = Store.getStoreClass(storeId);
    if (store.loginNeeded(cls)) return completed(new ELoginNeeded());
    var res = new cls(parent, instanceId);
    res.initStore(routePar, completed);
  }
  static createInRender<T extends Store>(props: TProps & IPropsEx, storeId: string | TStoreClass, instanceId?: string): T {
    var parent = props.$parent; if (!parent) throw new utils.Exception(`"${utils.getClassName(this.constructor)}" component: missing $parent property`);
    var cls = Store.getStoreClass(storeId);
    var idInParent = Store.getClassIdInParent(cls, instanceId);
    var res = (parent.childStores ? parent.childStores[idInParent] : null) as T;
    if (res) return res;
    res = new cls(parent, instanceId) as T;
    Object.assign(res, props);
    if (!parent.childStores) parent.childStores = {};
    parent.childStores[idInParent] = res;
    return res as T;

  }
  static createInJSON(parent: Store, _type: string): Store {
    var meta = storeMetasDir[_type]; if (!meta) throw new utils.Exception(`Store ${_type} not registered`);
    return new meta.storeClass(parent);
  }

  $subscribers: Array<string> = []; //components path's, using this store as a status
  getMeta(): IStoreMeta { return Store.getClassMeta(this.constructor as TStoreClass); } //store meta info
  getIdInParent(): string { return Store.getClassIdInParent(this.constructor as TStoreClass, this.instanceId); } //jednoznacna identifikace v parent child seznamu
  static getClassMeta(storeClass: TStoreClass): IStoreMeta { //store meta info
    var res: IStoreMeta = storeClass.prototype[prototypeMeta]; if (!res) throw new utils.Exception('Maybe missing @StoreDef() store decorator'); return res;
  }
  static getStoreClass(storeId: string | TStoreClass): TStoreClass {
    if (typeof storeId === 'string') {
      let meta = storeMetasDir[storeId]; if (!meta) throw new utils.Exception(`Store ${storeId} not registered`);
      return meta.storeClass;
    } else
      return storeId;
  }
  static getClassIdInParent(storeClass: TStoreClass, instanceId: string): string { return Store.getClassMeta(storeClass).id + (instanceId ? '.' + instanceId : ''); }
  _type: string; //kvuli JSON deserializaci
  path: string; //unique Store identification
  childStores: IChildStores;
  modify(modifyProc?: (st: this) => void) { //modify store and rerender all $subscribers
    if (modifyProc) modifyProc(this);
    this.$subscribers.forEach(path => {
      var comp = store.findComponent(path);
      this.trace('changeState');
      comp.forceUpdate();
    });
  }
  subscribe(comp: TComponent) { store.doSubscribe(this, comp, true); } //called in React.Component constructor
  unSubscribe(comp: TComponent) { store.doSubscribe(this, comp, false); } //called in React.Component componentWillUnmount

  abstract render(): JSX.Element; // { throw new utils.ENotImplemented('Missing render override'); } //React.Component render
  trace(msg: string) { console.log(`> ${this.path}: ${msg}`); } //helper

  //************** Action Binding
  initStore(par: IActionPar, completed: TCreateStoreCallback) { completed(this); } //inicializace store po jeho vytvoreni. Muze byt asynchronni

  doDispatchAction(id: number, par: IActionPar, completed: TExceptionCallback) { throw new utils.ENotImplemented(`id=${id}, par=${JSON.stringify(par)}`); }

  bindRouteToStore(isRestore: boolean, par: IActionPar, completed: TExceptionCallback) {
    let rPar = par as TRouteActionPar;
    let hookId = rPar.hookId ? rPar.hookId : routeHookDefaultName;
    let hookStore = this[hookId] as StoreRouteHook; if (!hookStore) throw new utils.Exception(`Missing route hook ${rPar.hookId}`);
    console.log(`> binding to hook: hookId=${rPar.hookId ? rPar.hookId : routeHookDefaultName}, storeId=${rPar.storeId}`);
    hookStore.bindRouteToHookStore(isRestore, rPar, completed);
  }

  action<T extends IActionPar>(id: number, descr: string, par?: T, completed?: TExceptionCallback) { //call action
    console.log(`> action ${JSON.stringify({ dispPath: this.path, actionId: id, par: par })}`);
    store.$recorder.onStoreAction(() => { return { dispPath: this.path, actionId: id, par: par, descr: this.getMeta().id + ': ' + descr }; });
    this.doDispatchAction(id, par, completed ? completed : utils.noop);
  }
  clickAction<T extends IActionPar>(ev: React.MouseEvent, id: number, descr: string, par?: T, completed?: TExceptionCallback) { //call action and prevent default for HTML DOM mouse event
    this.action<T>(id, descr, par, completed);
    ev.preventDefault();
  }
}

export type TStoreClass = new ($parent: Store, instanceId?: string) => Store;
export type TDispatchCallback = (store: Store) => void;

//******************  REACT COMPONENTS
export class Component<T extends Store, P extends IPropsEx> extends React.Component<IProps<T> & P, any> { //generic React component
  constructor(props: IProps<T> & P, ctx) {
    super(props, ctx);
    this.state = props.initState;
    if (!this.state) { this.state = Store.createInRender<T>(this.props, componentToStore(this.constructor as TComponentClass), this.props.instanceId); }
    this.state.trace('create');
    this.state.subscribe(this);
  }
  state: T;
  componentWillUnmount() {
    if (this.props.$parent && this.props.$parent.childStores && this.state) delete this.props.$parent.childStores[this.state.getIdInParent()]; //undo adjustComponentState
    this.state.unSubscribe(this);
    this.state.trace('destroy');
  }
  render(): JSX.Element {
    return this.state.render();
  }

}

export type TComponent = Component<Store, IPropsEx>;
export type TComponentClass = React.ComponentClass<TProps>;

//****************** ROUTER HOOK STORE
export interface IStoreRouteHook extends IStore { }
export interface IPropsExRouteHook extends IPropsEx { }

export class RouteHook extends Component<StoreRouteHook, IPropsExRouteHook> { }

@StoreDef({ moduleId: moduleId, componentClass: RouteHook })
export class StoreRouteHook extends Store implements IStoreRouteHook { //Route Hook component

  bindRouteToHookStore(isRestore: boolean, par: TRouteActionPar, completed: TExceptionCallback) {
    this.$routePar = par;
    if (isRestore) {
      flux.getChildRoutes(par).forEach(propName => this.hookedStore.bindRouteToStore(true, par[propName], utils.noop));
      completed(null);
    } else {
      Store.createInStore<Store>(this, par.storeId, res => {
        if (res instanceof Store) {
          this.hookedStore = res;
          //process child routes
          let childRoutes = flux.getChildRoutes(par); if (childRoutes.length <= 0) { completed(null); return; } //no child routes => completed
          var childRoutesPromises = childRoutes.map(p => par[p]).map(subPar => new Promise((ok, err) => res.bindRouteToStore(false, subPar, exp => { if (exp) err(exp); else ok(); })));
          rx.Observable.concat.apply(this, childRoutesPromises).subscribe(null, err => completed(err), () => completed(null));
        } else {
          completed(res);
        }
      }, null, par.par);
    }
  }

  subNavigate<T extends flux.IActionPar>(modify: (st: flux.IRouteActionPar<T>) => void, completed?: flux.TExceptionCallback) {
    modify(this.$routePar as flux.IRouteActionPar<T>);
    this.routeBind(completed);
  }

  routeBind(completed?: TExceptionCallback) {
    this.bindRouteToHookStore(false, this.$routePar, err => {
      if (err) { store.navigateError(err, completed); return; }
      this.modify();
      store.pushState();
      if (completed) completed(null);
    });
  }
  $routePar: TRouteActionPar;
  render(): JSX.Element {
    return this.hookedStore ? React.createElement(this.hookedStore.getMeta().componentClass, { initState: this.hookedStore, key: store.getUnique() }) : <div>Loading...</div>;
  }
  hookedStore: Store;
}

export interface IRouteActionPar<T extends IActionPar> extends IActionPar {
  storeId: string; //Store.getId()
  hookId?: string; //nazev property v parent Store, obsahujici RouteHookDispatcher. !hookId => routeDefaultPropName property
  par?: T; //<storeId>.routeAction(par, hookId)
  routeHookDefault?: TRouteActionPar;
}
export type TRouteActionPar = IRouteActionPar<IActionPar>;
export var routeParIgnores = ['storeId', 'hookId', 'par'];
export var routeHookDefaultName = 'routeHookDefault';

export function navigate(routes: flux.TRouteActionPar, completed?: flux.TExceptionCallback) {
  store.routeBind(routes, true, completed);
}

//****************** ROOT STORE
export var store: StoreApp;
export type TStoreAppClass = new () => StoreApp;

@StoreDef({ moduleId: moduleId })
export abstract class StoreApp extends Store { //global Application store (root for other stores)
  constructor() {
    super(null);
    //configure App
    store = this;
    this.routeHookDefault = new StoreRouteHook(this);
    this.$basicUrl = this.getBasicUrl(window.location.href);
    console.log(`> router basicUrl=${this.$basicUrl}`);
    this.$appElement = this.getAppElement();
    //this.startRoute = this.getStartRoute();
    this.$isHashRouter = this.getIsHashRouter();
    this.$defaultLoginNeeded = this.getDefaultLoginNeeded();
  }

  //************************** CONFIGURATION SECTION
  protected getBasicUrl(startUrl: string): string { var idx = startUrl.toLowerCase().indexOf('.html'); return idx >= 0 ? startUrl.substr(0, idx + 5) : startUrl; }
  $basicUrl: string;
  protected getIsHashRouter(): boolean { return false; }
  $isHashRouter: boolean;
  protected getAppElement(): HTMLElement { return document.getElementById('app'); } //vrati element pro React.render
  private $appElement: HTMLElement;
  protected getStartRoute(): TRouteActionPar { return null; } //difotni route

  //**** login configuration
  getLoginRoute(returnUrl: TRouteActionPar): TRouteActionPar { throw new utils.ENotImplemented('getLoginRoute'); } //dej login page URL
  protected getDefaultLoginNeeded(): boolean { return false; } //je x neni potreba login pro neoznaceny store
  $defaultLoginNeeded: boolean;
  getIsLogged(): boolean { throw new utils.ENotImplemented('isLogged'); } //dej info o zalogovani

  //**** action player
  saveRoute: TRouteActionPar;
  $recorder = new flux.ActionRecorder();

  //************************** 
  routeBind(routes: TRouteActionPar, withPustState: boolean, completed?: TExceptionCallback) {
    if (!routes) routes = this.getStartRoute(); if (!routes) { if (completed) completed(null); return; };
    this.bindRouteToStore(false, routes, err => {
      if (err) { this.navigateError(err, completed); return; }
      this.routeHookDefault.modify();
      if (withPustState) this.pushState();
      if (completed) completed(null);
    });
  }
  actRoutes(): TRouteActionPar { return this.routeHookDefault.$routePar; }

  static bootApp(source: TStoreAppClass | ITypedObj, compl?: TExceptionCallback, startRoute?: TRouteActionPar /*null => default route, undefined => flux.decodeFullUrl, else => startRoute*/) {
    //clear all
    if (store) {
      store.$recorder.stopAll();
      ReactDOM.unmountComponentAtNode(store.$appElement);
      store = null;
    }
    if (!source) { if (compl) compl(null); return; }
    //create
    if ((source as ITypedObj)._type) { //from StoreApp encoded do JSON literal object
      var literal = source as ITypedObj;
      flux.literalToAppState(literal); //nahrad objects literals (with _type prop) by new Store(). Vedlejsi efekt je naplneni store
      store.bindRouteToStore(true, store.saveRoute, exp => { //assign route to StoreRouteHook.$routePar
        delete store.saveRoute;
        store.pushState();
        ReactDOM.render(store.render(), store.$appElement); //render all, route is already binded in state
        if (compl) compl(null);
      });
    } else { //from StoreApp constructor
      var cls = source as TStoreAppClass;
      new cls(); //vedlejsi efekt je naplneni store
      ReactDOM.render(store.render(), store.$appElement); //render pouze StoreApp a jeji hook
      if (startRoute === null) startRoute = store.getStartRoute();
      store.routeBind(startRoute ? startRoute : flux.decodeFullUrl(), startRoute ? true : false, compl); //bind (=> init Stores) route
    }
  }

  pushState() {
    var urlStr = flux.encodeFullUrl(this.actRoutes());
    console.log(`> pushState: ${urlStr}`);
    history.pushState(null, null, urlStr);
  }
  navigateError(err: Error, completed: TExceptionCallback) {
    if (err instanceof ELoginNeeded) {
      console.log(`> navigateError, redirect to login`)
      var logUrl = this.getLoginRoute((err as ELoginNeeded).returnUrl);
      flux.navigate(logUrl, completed);
    }
  }
  loginNeeded(storeClass: TStoreClass): boolean {
    var ln = Store.getClassMeta(storeClass).loginNeeded; //priznak u komponenty...
    if (ln === undefined) ln = this.$defaultLoginNeeded; //...neni nastaven, pouzij defaultLoginNeeded
    if (!ln) return false; //vrat "neni potreba login"
    if (this.getIsLogged()) return false; //jiz je zalogovano => vrat "neni potreba login"
    return true; //redirekt na login page
  }

  private unique = 0;

  routeHookDefault: StoreRouteHook; //hook for root React component

  getUnique(): number { return this.unique++; }
  findComponent(path: string): TComponent { var comp = this.$components[path]; if (!comp) throw new utils.Exception(`Component ${path} does not exist`); return comp; }

  doSubscribe(st: Store, comp: TComponent, isSubscribe: boolean) { //prihlas x odhlas se k notifikaci o zmene stavu. Volano v TComponent konstructoru x TComponent.unmount.
    if (isSubscribe) { //konstructor
      //kontroly
      if (this.$components[st.path]) throw new utils.Exception(`Dve komponenty stejneho jmena: ${st.path}`); //komponenta je jiz zaevidovana => dve komponenty stejneho jmena
      if (st.$subscribers.indexOf(st.path) >= 0) throw new utils.Exception(`${st.path}: st.$componentIds && st.$componentIds.indexOf(p) >= 0`); //ta sama komponenta je prihlasena dvakrat
      //evidence
      this.$components[st.path] = comp;
      st.$subscribers.push(st.path);
    } else { //unmount
      //kontroly
      if (!this.$components[st.path]) throw new utils.Exception(`${st.path}: !Sync.path2Component[p]`);
      //st.path nemusi byt v st.$subscribers, protoze st muze byt vytvoreno uplne znova (v ramci zmen parenta).
      //var idx: number; if ((idx = st.$subscribers.indexOf(st.path)) < 0) throw new utils.Exception(`${st.path}: !st.$componentIds || (idx = st.$componentIds.indexOf(p)) < 0`);
      var idx = st.$subscribers.indexOf(st.path);
      //undo evidence
      delete this.$components[st.path];
      if (idx >= 0) st.$subscribers.splice(idx, 1);
    }
  }

  render(): JSX.Element { return React.createElement(RouteHook, { initState: this.routeHookDefault }); }

  findStore(path: string): Store { var res = this._findStore(path, this); if (!res) throw new utils.Exception(`Cannot find store ${path}`); return res; }

  private $components: { [path: string]: TComponent; } = {}; //all existing app component

  private _findStore(path: string, obj): Store {
    if (obj instanceof Store && (obj as Store).path == path) return obj as Store;
    if (Array.isArray(obj)) for (var o of obj) { let res = this._findStore(path, o); if (res) return res; }
    else if (obj instanceof Object) for (var p in obj) { if (p.startsWith('$')) continue; let res = this._findStore(path, obj[p]); if (res) return res; }
    return null;
  }

}

//***************** POPSTATE EVENT
window.addEventListener("popstate", ev => {
  if (!store) return;
  console.log(`> popstate: ${window.location.href}`);
  store.routeBind(flux.decodeFullUrl(), false);
});

//***************** UTILS
export class Exception extends Error {
  constructor(msg: string) {
    super(msg);
    debugger;
    console.error(msg);
  }
}
export class ENotImplemented extends Exception {
  constructor(msg: string) { super(`Missing ${msg} override`); }
}
export type TCallback = () => void;

export function getClassName(constructor: Function): string {
  var res = constructor['name']; if (res) return res;
  var arr = constructor.toString().match(/function\s*(\w+)/);
  return arr && arr.length == 2 ? arr[1] : undefined;
}

export function noop() { }
