import * as rx from 'rxjs/Rx';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as flux from './exports';
import {ActionRecorder} from './action-recorder';

var moduleId = 'store';
export type TExceptionCallback = (exp: Error) => void;
export type TCreateStoreCallback = (res: Error | Store) => void;
export class ELoginNeeded extends Error {
  constructor() { super(); this.returnUrl = store.actRoutes(); }
  returnUrl: TRouteActionPar;
}
export interface ITypedObj { _type: string; }

//types for validators
export type TSyncValidator<V> = (val: V) => string;
export type TSyncCompleted = (err: string) => void;

//****************** DECORATOR FOR REGISTERING STORE CLASSES
export function StoreDef(meta: IStoreMeta): ClassDecorator {
  return (storeClass: TStoreClass) => {
    //create store meta info
    meta.className = flux.getClassName(storeClass);
    meta.classId = `${meta.moduleId}.${meta.className}`; //meta.moduleId + '.' + meta.className;
    meta.storeClass = storeClass;
    //ulozeni meta informace
    storeClass.prototype[prototypeMeta] = meta; //in class prototype
    storeMetasDir[meta.classId] = meta; //in directory
    storeMetas.push(meta); //in list
    return storeClass;
  }
}
const prototypeMeta = 'meta'; //v prototype[prototypeMeta] jsou store meta informace
var storeMetasDir: { [id: string]: IStoreMeta; } = {};
var storeMetas: Array<IStoreMeta> = [];
export interface IStoreMeta {
  moduleId: string;
  className?:string;
  classId?:string;
  //classId(): string {return `${this.moduleId}.${this.className}`; }
  //pro komponenty, co se binduji do route hook
  componentClass?: TComponentClass; //class nabindovana do route hook
  storeClass?: TStoreClass; //
  loginNeeded?: boolean; //true x false. Iff undefined => bere se StoreApp.defaultLoginNeeded.
}
function componentToStore(componentClass: TComponentClass): TStoreClass {
  let res = storeMetas.find(m => m.componentClass == componentClass);
  if (!res || !res.storeClass) throw new flux.Exception(`Missing StoreDef componentClass info: ${flux.getClassName(componentClass)}`);
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
        let actStore = store.findStore(act.dispPath); if (!actStore) { obs.error(new flux.Exception(`Cannot find store ${act.dispPath}`)); return; }
        try {
          actStore.action(act.actionId, act.descr, act.par, err => { if (err) obs.error(err); else obs.complete(); });
        } catch (err) {
          obs.error(new flux.Exception(err));
        }
        return () => { };
      })));
}

//******************  REACT COMPONENTS
export class Component<T extends Store, P extends IPropsEx> extends React.Component<IProps<T> & P, any> { //generic React component
  constructor(props: IProps<T> & P, ctx: IComponentContext) {
    super(props, ctx);
    this.state = props.store;
    //state to parent child states
    if (!this.state) { this.state = Store.createInRender<T>(ctx.$parent, componentToStore(this.constructor as TComponentClass), props.id); }
    else if (this.props.id && this.state.id && this.props.id!=this.state.id) throw new Exception(`Store "id=${this.state.id}" cannot be overrided by Component "id=${this.props.id}"`);
    this.state.componentCreated(this); //notificiation
  }
  state: T;
  context: IComponentContext;
  componentWillUnmount() { this.state.componentWillUnmount(this); }
  render(): JSX.Element { return this.state.render(this); }
  getChildContext(): IComponentContext { return { $parent: this.state }; }
}
Component['childContextTypes'] = { $parent: React.PropTypes.any };
Component['contextTypes'] = { $parent: React.PropTypes.any };
export interface IComponentContext { $parent: Store; }

export type TComponent = Component<Store, IPropsEx>;
export type TComponentClass = React.ComponentClass<TProps>;

//****************** STORE
export type IChildStores = { [idInParent: string]: Store; };
export interface IPropsEx { id?: string; $template?: TTemplate; }
export interface IProps<T extends Store> {
  store?: T; //cast globalniho stavy aplikace, ktery je initialnim stavem stateless komponenty
}
export type TProps = IProps<Store> & IPropsEx;
export type TTemplate = (self: Store) => React.ReactNode;


//IPropsEx x Store relationship:
//Every component props (eg. title:string) has to be defined in Store:
//IF we needs: interface IExampleProps extends IPropsEx { title?:string; }
//THEN we have to have: class ExampleStore extends Store { title:string; }
//Props are assigned to Store in component constructor (Object.assign(this.state, props); delete this.state['initState'];
@StoreDef({ moduleId: moduleId })
export abstract class Store implements ITypedObj {

  $template: TTemplate;
  $subscribers: Array<string> = []; //components path's, using this store as a status
  $context: any;
  _type: string; //kvuli JSON deserializaci
  path: string; //unique Store identification
  childStores: IChildStores;
  children: React.ReactNode;

  constructor(public $parent: Store, public id?: string) {
    this._type = this.getMeta().classId;
    let idInParent = this.getIdInParent();
    this.path = ($parent ? $parent.path + '/' : '') + idInParent;
  }
  static createInStore<T extends Store>(parent: Store, storeId: string | TStoreClass, completed: TCreateStoreCallback, instanceId?: string, routePar?: IActionPar) {
    let cls = Store.getStoreClass(storeId);
    if (store.loginNeeded(cls)) return completed(new ELoginNeeded());
    let res = new cls(parent, instanceId);
    res.initStore(routePar, completed);
  }
  static createInRender<T extends Store>(parent: Store, storeId: string | TStoreClass, instanceId?: string): T {
    //let parent = props.$parent; if (!parent) throw new flux.Exception(`"${flux.getClassName(this.constructor)}" component: missing $parent property`);
    let cls = Store.getStoreClass(storeId);
    let idInParent = Store.getClassIdInParent(cls, instanceId);
    let res = (parent.childStores ? parent.childStores[idInParent] : null) as T;
    if (res) return res;
    res = new cls(parent, instanceId) as T;
    //Object.assign(res, props); //component props field () to store.
    if (!parent.childStores) parent.childStores = {};
    parent.childStores[idInParent] = res;
    return res as T;

  }
  static createInJSON(parent: Store, _type: string): Store {
    let meta = storeMetasDir[_type]; if (!meta) throw new flux.Exception(`Store ${_type} not registered`);
    return new meta.storeClass(parent);
  }

  getMeta(): IStoreMeta { return Store.getClassMeta(this.constructor as TStoreClass); } //store meta info
  getIdInParent(): string { return Store.getClassIdInParent(this.constructor as TStoreClass, this.id); } //jednoznacna identifikace v parent child seznamu
  static getClassMeta(storeClass: TStoreClass): IStoreMeta { //store meta info
    let res: IStoreMeta = storeClass.prototype[prototypeMeta]; if (!res) throw new flux.Exception('Maybe missing @StoreDef() store decorator'); return res;
  }
  static getStoreClass(storeId: string | TStoreClass): TStoreClass {
    if (typeof storeId === 'string') {
      let meta = storeMetasDir[storeId]; if (!meta) throw new flux.Exception(`Store ${storeId} not registered`);
      return meta.storeClass;
    } else
      return storeId;
  }
  static getClassIdInParent(storeClass: TStoreClass, instanceId: string): string {
    //return Store.getClassMeta(storeClass).className.replace('Store','') + (instanceId ? '_' + instanceId : '');
    return instanceId ? instanceId : Store.getClassMeta(storeClass).className.replace('Store','');
    //return Store.getClassMeta(storeClass).classId + (instanceId ? '.' + instanceId : ''); 
  }
  modify(modifyProc?: (st: this) => void) { //modify store and rerender all $subscribers
    if (modifyProc) modifyProc(this);
    this.$subscribers.forEach(path => {
      let comp = store.findComponent(path);
      this.trace('changeState');
      comp.forceUpdate();
    });
  }
  subscribe(comp: TComponent, includingComponent?: boolean) { store.doSubscribe(this, comp, true, includingComponent); } //called in React.Component constructor
  unSubscribe(comp: TComponent, includingComponent?: boolean) { store.doSubscribe(this, comp, false, includingComponent); } //called in React.Component componentWillUnmount
  trace(msg: string) { console.log(`> ${this.path}: ${msg}`); } //helper

  //************** Component management
  render(comp: TComponent): JSX.Element {
    if (this.$template) {
      var res = this.$template(this);
      if (Array.isArray(res)) return <div>{res}</div>; else return res as JSX.Element;
    }
    let childCount = this.children ? React.Children.count(this.children) : 0;
    switch (childCount) {
      case 0: return <div>Missing children or $template component property</div>;
      case 1: return React.Children.only(this.children);
      default: return React.createElement('div', null, this.children);
    }
  }
  componentCreated(comp: TComponent) {
    Object.assign(this, comp.props); delete this['initState']; //props to state:
    this.$context = comp.context;
    this.trace('create');
    this.subscribe(comp, true);
  }
  componentWillUnmount(comp: TComponent) {
    if (this.$parent && this.$parent.childStores) this.$parent.childStores[this.getIdInParent()]; //undo adjustComponentState
    this.unSubscribe(comp, true);
    this.trace('destroy');
  }

  //************** Action Binding
  initStore(par: IActionPar, completed: TCreateStoreCallback) { completed(this); } //inicializace store po jeho vytvoreni. Muze byt asynchronni

  doDispatchAction(id: number, par: IActionPar, completed: TExceptionCallback) { throw new flux.ENotImplemented(`id=${id}, par=${JSON.stringify(par)}`); }

  bindRouteToStore(isRestore: boolean, par: IActionPar, completed: TExceptionCallback) {
    let rPar = par as TRouteActionPar;
    let hookId = rPar.hookId ? rPar.hookId : routeHookDefaultName;
    let hookStore = this[hookId] as RouteHookStore; if (!hookStore) throw new flux.Exception(`Missing route hook ${rPar.hookId}`);
    console.log(`> binding to hook: hookId=${rPar.hookId ? rPar.hookId : routeHookDefaultName}, storeId=${rPar.storeId}`);
    hookStore.bindRouteToHookStore(isRestore, rPar, completed);
  }

  action<T extends IActionPar>(id: number, descr: string, par?: T, completed?: TExceptionCallback) { //call action
    console.log(`> action ${JSON.stringify({ dispPath: this.path, actionId: id, par: par })}`);
    store.$recorder.onStoreAction(() => { return { dispPath: this.path, actionId: id, par: par, descr: this.getMeta().classId + ': ' + descr }; });
    this.doDispatchAction(id, par, completed ? completed : flux.noop);
  }
  clickAction<T extends IActionPar>(ev: React.MouseEvent, id: number, descr: string, par?: T, completed?: TExceptionCallback) { //call action and prevent default for HTML DOM mouse event
    this.action<T>(id, descr, par, completed);
    ev.preventDefault();
  }
}

export type TStoreClass = new ($parent: Store, instanceId?: string) => Store;
export type TDispatchCallback = (store: Store) => void;

//****************** ROUTER HOOK STORE
//export interface IStoreRouteHook extends IStore { }
export interface IPropsExRouteHook extends IPropsEx { }

export class RouteHook extends Component<RouteHookStore, IPropsExRouteHook> { }

@StoreDef({ moduleId: moduleId, componentClass: RouteHook })
export class RouteHookStore extends Store { //Route Hook component

  bindRouteToHookStore(isRestore: boolean, par: TRouteActionPar, completed: TExceptionCallback) {
    this.$routePar = par;
    if (isRestore) {
      flux.getChildRoutes(par).forEach(propName => this.hookedStore.bindRouteToStore(true, par[propName], flux.noop));
      completed(null);
    } else {
      Store.createInStore<Store>(this, par.storeId, res => {
        if (res instanceof Store) {
          this.hookedStore = res;
          //process child routes
          let childRoutes = flux.getChildRoutes(par); if (childRoutes.length <= 0) { completed(null); return; } //no child routes => completed
          let childRoutesPromises = childRoutes.map(p => par[p]).map(subPar => new Promise((ok, err) => res.bindRouteToStore(false, subPar, exp => { if (exp) err(exp); else ok(); })));
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
    return this.hookedStore ? React.createElement(this.hookedStore.getMeta().componentClass, { store: this.hookedStore, key: store.getUnique() }) : <div>Loading...</div>;
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
    this.routeHookDefault = new RouteHookStore(this);
    this.$basicUrl = this.getBasicUrl(window.location.href);
    console.log(`> router basicUrl=${this.$basicUrl}`);
    this.$appElement = this.getAppElement();
    //this.startRoute = this.getStartRoute();
    this.$isHashRouter = this.getIsHashRouter();
    this.$defaultLoginNeeded = this.getDefaultLoginNeeded();
  }

  //************************** CONFIGURATION SECTION
  protected getBasicUrl(startUrl: string): string { let idx = startUrl.toLowerCase().indexOf('.html'); return idx >= 0 ? startUrl.substr(0, idx + 5) : startUrl; }
  $basicUrl: string;
  protected getIsHashRouter(): boolean { return false; }
  $isHashRouter: boolean;
  protected getAppElement(): HTMLElement { return document.getElementById('app'); } //vrati element pro React.render
  private $appElement: HTMLElement;
  protected getStartRoute(): TRouteActionPar { return null; } //difotni route

  //**** login configuration
  getLoginRoute(returnUrl: TRouteActionPar): TRouteActionPar { throw new flux.ENotImplemented('getLoginRoute'); } //dej login page URL
  protected getDefaultLoginNeeded(): boolean { return false; } //je x neni potreba login pro neoznaceny store
  $defaultLoginNeeded: boolean;
  getIsLogged(): boolean { throw new flux.ENotImplemented('isLogged'); } //dej info o zalogovani

  //**** action player
  saveRoute: TRouteActionPar;
  $recorder = new ActionRecorder();

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
      let literal = source as ITypedObj;
      flux.literalToAppState(literal); //nahrad objects literals (with _type prop) by new Store(). Vedlejsi efekt je naplneni store
      store.bindRouteToStore(true, store.saveRoute, exp => { //assign route to StoreRouteHook.$routePar
        delete store.saveRoute;
        store.pushState();
        ReactDOM.render(store.render(), store.$appElement); //render all, route is already binded in state
        if (compl) compl(null);
      });
    } else { //from StoreApp constructor
      let cls = source as TStoreAppClass;
      new cls(); //vedlejsi efekt je naplneni store
      ReactDOM.render(store.render(), store.$appElement); //render pouze StoreApp a jeji hook
      if (startRoute === null) startRoute = store.getStartRoute();
      store.routeBind(startRoute ? startRoute : flux.decodeFullUrl(), startRoute ? true : false, compl); //bind (=> init Stores) route
    }
  }

  pushState() {
    let urlStr = flux.encodeFullUrl(this.actRoutes());
    console.log(`> pushState: ${urlStr}`);
    history.pushState(null, null, urlStr);
  }
  navigateError(err: Error, completed: TExceptionCallback) {
    if (err instanceof ELoginNeeded) {
      console.log(`> navigateError, redirect to login`)
      let logUrl = this.getLoginRoute((err as ELoginNeeded).returnUrl);
      flux.navigate(logUrl, completed);
    }
  }
  loginNeeded(storeClass: TStoreClass): boolean {
    let ln = Store.getClassMeta(storeClass).loginNeeded; //priznak u komponenty...
    if (ln === undefined) ln = this.$defaultLoginNeeded; //...neni nastaven, pouzij defaultLoginNeeded
    if (!ln) return false; //vrat "neni potreba login"
    if (this.getIsLogged()) return false; //jiz je zalogovano => vrat "neni potreba login"
    return true; //redirekt na login page
  }

  private unique = 0;

  routeHookDefault: RouteHookStore; //hook for root React component

  getUnique(): number { return this.unique++; }
  findComponent(path: string): TComponent { let comp = this.$components[path]; if (!comp) throw new flux.Exception(`Component ${path} does not exist`); return comp; }

  doSubscribe(st: Store, comp: TComponent, isSubscribe: boolean, includingComponent:boolean) { //prihlas x odhlas se k notifikaci o zmene stavu. Volano v TComponent konstructoru x TComponent.unmount.
    if (isSubscribe) { //konstructor
      //komponenta
      if (includingComponent) {
        if (this.$components[st.path]) throw new flux.Exception(`Dve komponenty stejneho jmena: ${st.path}`); //komponenta je jiz zaevidovana => dve komponenty stejneho jmena
        this.$components[st.path] = comp;
      }
      //notifikace
      if (st.$subscribers.indexOf(comp.state.path) >= 0) throw new flux.Exception(`${comp.state.path}: st.$subscribers.indexOf(comp.state.path) >= 0`); //ta sama komponenta je subscribed dvakrat
      //evidence
      st.$subscribers.push(comp.state.path);
    } else { //unmount
      //komponenta
      if (includingComponent) {
        if (!this.$components[st.path]) throw new flux.Exception(`${st.path}: !Sync.path2Component[p]`);
        delete this.$components[st.path];
      }
      //st.path nemusi byt v st.$subscribers, protoze st muze byt vytvoreno uplne znova (v ramci zmen parenta).
      //var idx: number; if ((idx = st.$subscribers.indexOf(st.path)) < 0) throw new flux.Exception(`${st.path}: !st.$componentIds || (idx = st.$componentIds.indexOf(p)) < 0`);
      let idx = st.$subscribers.indexOf(comp.state.path);
      //undo evidence
      if (idx >= 0) st.$subscribers.splice(idx, 1);
    }
  }

  render(): JSX.Element { 
    return React.createElement(RouteHook, { store: this.routeHookDefault }); }

  findStore(path: string): Store { let res = StoreApp._findStore(path, this); if (!res) throw new flux.Exception(`Cannot find store ${path}`); return res; }

  private $components: { [path: string]: TComponent; } = {}; //all existing app component

  private static _findStore(path: string, obj): Store {
    if (obj instanceof Store && (obj as Store).path == path) return obj as Store;
    if (Array.isArray(obj)) {
      let res = null;
      (obj as Array<any>).find(o => !!(res = StoreApp._findStore(path, o)));
      return res;
    } else if (typeof obj == 'object') {
      let isStore = obj instanceof Store; let isLiteral = obj && obj.constructor == Object;
      if (!isStore && !isLiteral) return null;
      let res = null;
      Object.keys(obj).find(p => { if (isStore && p.startsWith('$')) return false; res = StoreApp._findStore(path, obj[p]); if (res) return true; });
      return res;
    } 
    return null;
  }

}

//******************  bind to state
interface BindToStateProps extends flux.IPropsEx { $stores: Array<flux.Store> | flux.Store; }

export class BindToState extends flux.Component<BindToStateStore, BindToStateProps> { }

@flux.StoreDef({ moduleId: moduleId, componentClass: BindToState })
export class BindToStateStore extends flux.Store {
  $stores: Array<flux.Store> | flux.Store;
  componentCreated(comp: flux.TComponent) {
    super.componentCreated(comp);
    if (this.$stores) this.stores().forEach(st => st.subscribe(comp));
  }
  componentWillUnmount(comp: flux.TComponent) {
    super.componentWillUnmount(comp);
    if (this.$stores) this.stores().forEach(st => st.unSubscribe(comp));
  }
  private stores(): Array<flux.Store> { return Array.isArray(this.$stores) ? this.$stores as Array<flux.Store> : [this.$stores as flux.Store]; }
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
  let res = constructor['name']; if (res) return res;
  let arr = constructor.toString().match(/function\s*(\w+)/);
  return arr && arr.length == 2 ? arr[1] : undefined;
}

export function noop() { }
