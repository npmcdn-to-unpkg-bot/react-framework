import * as rx from 'rxjs/Rx';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {Exception, ENotImplemented, getClassName, noop} from '../utils/low-utils';
import {decodeUrl, decodeFullUrl, decodeUrlPart, getChildRoutes, encodeUrl, encodeFullUrl, navigate} from './router';
import {ActionRecorder, replaceByStore} from './action-recorder';

var moduleId = 'store';
export type TExceptionCallback = (exp: Error) => void;
export class ELoginNeeded extends Error {
  constructor() { super(); this.returnUrl = store.actRoutes(); }
  returnUrl: TRouteActionPar;
}
export interface ITypedObj { _type: string; }

//****************** DECORATOR FOR REGISTERING STORE CLASSES
export function StoreDef(meta: IStoreMeta): ClassDecorator {
  return (target: TStoreClass) => {
    if (!meta.id) meta.id = meta.moduleId + '.' + getClassName(target);
    target.prototype[prototypeMeta] = meta;
    storeConstructors[meta.id] = target;
    return target;
  }
}
const prototypeMeta = 'meta';
var storeConstructors: { [id: string]: TStoreClass; } = {};
export function createStore<T extends Store>(parent: Store, storeId: string, ignoreLogin?: boolean): T {
  var constr = storeConstructors[storeId]; if (!constr) throw new Exception(`Store ${storeId} not registered`);
  if (!ignoreLogin && store.loginNeeded(constr)) return null;
  var res = new constr(parent);
  return res as T;
}
export interface IStoreMeta {
  moduleId: string;
  id?: string; //<moduleId>.<class name>
  //pro komponenty, co se binduji do route hook
  componentClass?: TComponentClass; //class nabindovana do route hook
  loginNeeded?: boolean; //true x false. Iff undefined => bere se store.defaultLoginNeeded.
}

//****************** ACTION INTERFACES
export interface IAction<T extends IActionPar> { //flux action
  dispPath: string; //Dispatcher.path, identifying action dispatcher
  actionId: number; //action id (use enum for it)
  par: T; //action parameter
}
export interface IActionPar { } //flux action parameter
export type TAction = IAction<IActionPar>;

export function playActions(actions: Array<TAction>): rx.Observable<any> {
  return rx.Observable.from(actions).concatMap((act: TAction) =>
    rx.Observable.timer(300).concat(
    rx.Observable.create((obs: rx.Subscriber<any>) => {
      var actStore = store.findStore(act.dispPath); if (!actStore) { obs.error(new Exception(`Cannot find store ${act.dispPath}`)); return; }
      (actStore as StoreDispatcher).action(act.actionId, act.par, err => {
        if (err) obs.error(err); else obs.complete();
      });
      return () => { };
    })));
}

//****************** STORE
@StoreDef({ moduleId: moduleId })
export abstract class Store implements ITypedObj {
  constructor(public $parent: Store, public instanceId?: string) {
    var name = this._type = this.getMeta().id; if (instanceId) name += '.' + instanceId;
    this.path = ($parent ? $parent.path + '/' : '') + name;
  }
  $subscribers: Array<string> = []; //components path's, using this store as a status
  getMeta(): IStoreMeta { return Store.getClassMeta(this.constructor as TStoreClass); } //store meta info
  static getClassMeta(storeClass: TStoreClass): IStoreMeta { //store meta info
    var res: IStoreMeta = storeClass.prototype[prototypeMeta]; if (!res) throw new Exception('Maybe missing @StoreDef() store decorator'); return res;
  }
  _type: string; //kvuli JSON deserializaci
  path: string; //unique Store identification
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

  abstract render(): JSX.Element; // { throw new ENotImplemented('Missing render override'); } //React.Component render
  trace(msg: string) { console.log(`> ${this.path}: ${msg}`); } //helper

}


export type TStoreClass = new ($parent: Store, instanceId?: string) => Store;


//****************** DISPATCHER STORE
@StoreDef({ moduleId: moduleId })
export abstract class StoreDispatcher extends Store { //Store, which can dispatch (flux) Actions. Actions could be assync.
  doDispatchAction(id: number, par: IActionPar, completed: TExceptionCallback) { //generic action dispatcher (which solves some Route binding issues)
    switch (id) {
      case act_routeBindTo:
      case act_routeRestoreAssignTo:
        let rPar = par as TRouteActionPar;
        let hookId = rPar.hookId ? rPar.hookId : routeHookDefault;
        let hookStore = this[hookId]; if (!hookStore) throw new Exception(`Missing route hook ${rPar.hookId}`);
        console.log(`> binding to hook: hookId=${rPar.hookId ? rPar.hookId : routeHookDefault}, storeId=${rPar.storeId}`);
        hookStore.doDispatchAction(id, rPar, completed);
        break;
      case act_routeInitForBind:
        completed(null);
        break;
      default:
        throw new ENotImplemented(`doDispatchAction id=${id}`);
    }
  }

  action<T extends IActionPar>(id: number, par?: T, completed?: TExceptionCallback) { //call action
    console.log(`> action ${JSON.stringify({ dispPath: this.path, actionId: id, par: par })}`);
    store.$recorder.onStoreAction(() => { return { dispPath: this.path, actionId: id, par: par }; });
    this.doDispatchAction(id, par, completed ? completed : noop);
  }
  clickAction<T extends IActionPar>(ev: React.MouseEvent, id: number, par?: T, completed?: TExceptionCallback) { //call action and prevent default for HTML DOM mouse event
    this.action<T>(id, par, completed);
    ev.preventDefault();
  }

}

export type TDispatchCallback = (store: Store) => void;

export const act_routeBindTo = 9090; //akci dostava store, do ktereho je bindovano plus route hook
export const act_routeRestoreAssignTo = 9091; //akci dostava store, do ktereho je bindovano plus route hook
export const act_routeInitForBind = 9092; //inicializace store pred nabindovanim do route hook

//******************  REACT COMPONENTS
export interface IProps<T extends Store> {
  state: T; //cast globalniho stavy aplikace, ktery je stavem stateless komponenty
}
export type TProps = IProps<Store>;
export class Component<T extends Store> extends React.Component<IProps<T>, any> { //generic React component
  constructor(props: IProps<T>, ctx) {
    super(props, ctx);
    props.state.trace('create');
    props.state.subscribe(this);
  }
  componentWillUnmount = () => {
    this.props.state.unSubscribe(this);
    this.props.state.trace('destroy');
  }
  render(): JSX.Element {
    return this.props.state.render();
  }
}
export type TComponent = Component<Store>;
export type TComponentClass = React.ComponentClass<TProps>;

//****************** ROUTER HOOK STORE
export class RouteHook extends Component<StoreRouteHook> { }

@StoreDef({ moduleId: moduleId, componentClass: RouteHook })
export class StoreRouteHook extends StoreDispatcher { //Route Hook component
  doDispatchAction(id: number, par: TRouteActionPar, completed: TExceptionCallback) {
    switch (id) {
      case act_routeRestoreAssignTo:
        this.$routePar = par;
        getChildRoutes(par).forEach(propName => this.hookedStore.action(act_routeRestoreAssignTo, par[propName]));
        completed(null);
        break;
      case act_routeBindTo:
        this.$routePar = par;
        this.hookedStore = createStore<StoreDispatcher>(this, par.storeId); //vytvori store (po kontrole na loginNeeded)
        if (!this.hookedStore) { /*debugger; console.log(JSON.stringify(store.actRoutes(), null, 2));*/ completed(new ELoginNeeded()); return; } //je potreba login
        this.hookedStore.doDispatchAction(act_routeInitForBind, par.par, err => {
          if (err) { completed(err); return; }
          //process child routes
          let childRoutes = getChildRoutes(par); if (childRoutes.length <= 0) { completed(null); return; } //no child routes => completed
          //hookedStore.action(routeHookActionId) for all child routes:
          var childRoutesPromises = childRoutes.map(p => par[p]).map(subPar => new Promise((ok, err) => this.hookedStore.doDispatchAction(act_routeBindTo, subPar, exp => { if (exp) err(exp); else ok(); })));
          rx.Observable.concat.apply(this, childRoutesPromises).subscribe(null, err => completed(err), () => completed(null));
        });
        break;
    }
  }
  routeBind(completed?: TExceptionCallback) {
    this.doDispatchAction(act_routeBindTo, this.$routePar, err => {
      if (err) { store.navigateError(err, completed); return; }
      this.modify();
      store.pushState();
      if (completed) completed(null);
    });
  }
  $routePar: TRouteActionPar;
  render(): JSX.Element {
    return this.hookedStore ? React.createElement(this.hookedStore.getMeta().componentClass, { state: this.hookedStore, key: store.getUnique() }) : <div>Loading...</div>;
  }
  hookedStore: StoreDispatcher;
}

export interface IRouteActionPar<T extends IActionPar> extends IActionPar {
  storeId: string; //Store.getId()
  hookId?: string; //nazev property v parent Store, obsahujici RouteHookDispatcher. !hookId => routeDefaultPropName property
  par?: T; //<storeId>.routeAction(par, hookId)
  routeHookDefault?: TRouteActionPar;
}
export type TRouteActionPar = IRouteActionPar<IActionPar>;
export var routeParIgnores = ['storeId', 'hookId', 'par'];
export var routeHookDefault = 'routeHookDefault';

//****************** ROOT STORE
export var store: StoreApp;

@StoreDef({ moduleId: moduleId })
export abstract class StoreApp extends StoreDispatcher { //global Application store (root for other stores)
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
  getLoginRoute(returnUrl: TRouteActionPar): TRouteActionPar { throw new ENotImplemented('getLoginRoute'); } //dej login page URL
  protected getDefaultLoginNeeded(): boolean { return false; } //je x neni potreba login pro neoznaceny store
  $defaultLoginNeeded: boolean;
  getIsLogged(): boolean { throw new ENotImplemented('isLogged'); } //dej info o zalogovani

  //**** action player
  saveRoute: TRouteActionPar;
  $recorder = new ActionRecorder();

  //************************** 
  routeBind(routes: TRouteActionPar, withPustState: boolean, completed?: TExceptionCallback) {
    if (!routes) routes = this.getStartRoute(); if (!routes) { if (completed) completed(null); return; };
    this.doDispatchAction(act_routeBindTo, routes, err => {
      if (err) { this.navigateError(err, completed); return; }
      this.routeHookDefault.modify();
      if (withPustState) this.pushState();
      if (completed) completed(null);
    });
  }
  actRoutes(): TRouteActionPar { return this.routeHookDefault.$routePar; }

  static bootApp(source: TStoreAppClass | ITypedObj, compl?: TExceptionCallback, startRoute?: TRouteActionPar /*null => default route, undefined => decodeFullUrl, else => startRoute*/) {
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
      replaceByStore(null, literal) as StoreApp; //nahrad objects literals (with _type prop) by new Store(). Vedlejsi efekt je naplneni store
      store.action(act_routeRestoreAssignTo, store.saveRoute, exp => { //assign route to StoreRouteHook.$routePar
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
      store.routeBind(startRoute ? startRoute : decodeFullUrl(), startRoute ? true : false, compl); //bind (=> init Stores) route
    }
  }

  pushState() {
    var urlStr = encodeFullUrl(this.actRoutes());
    console.log(`> pushState: ${urlStr}`);
    history.pushState(null, null, urlStr);
  }
  navigateError(err: Error, completed: TExceptionCallback) {
    if (err instanceof ELoginNeeded) {
      console.log(`> navigateError, redirect to login`)
      var logUrl = this.getLoginRoute((err as ELoginNeeded).returnUrl);
      navigate(logUrl, completed);
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
  findComponent(path: string): TComponent { var comp = this.$components[path]; if (!comp) throw new Exception(`Component ${path} does not exist`); return comp; }

  doSubscribe(st: Store, comp: TComponent, isSubscribe: boolean) { //prihlas x odhlas se k notifikaci o zmene stavu. Volano v TComponent konstructoru x TComponent.unmount.
    if (isSubscribe) { //konstructor
      //kontroly
      if (this.$components[st.path]) throw new Exception(`Dve komponenty stejneho jmena: ${st.path}`); //komponenta je jiz zaevidovana => dve komponenty stejneho jmena
      if (st.$subscribers.indexOf(st.path) >= 0) throw new Exception(`${st.path}: st.$componentIds && st.$componentIds.indexOf(p) >= 0`); //ta sama komponenta je prihlasena dvakrat
      //evidence
      this.$components[st.path] = comp;
      st.$subscribers.push(st.path);
    } else { //unmount
      //kontroly
      if (!this.$components[st.path]) throw new Exception(`${st.path}: !Sync.path2Component[p]`);
      //st.path nemusi byt v st.$subscribers, protoze st muze byt vytvoreno uplne znova (v ramci zmen parenta).
      //var idx: number; if ((idx = st.$subscribers.indexOf(st.path)) < 0) throw new Exception(`${st.path}: !st.$componentIds || (idx = st.$componentIds.indexOf(p)) < 0`);
      var idx = st.$subscribers.indexOf(st.path);
      //undo evidence
      delete this.$components[st.path];
      if (idx >= 0) st.$subscribers.splice(idx, 1);
    }
  }

  render(): JSX.Element { return React.createElement(RouteHook, { state: this.routeHookDefault }); }

  findStore(path: string): Store { var res = this._findStore(path, this); if (!res) throw new Exception(`Cannot find store ${path}`); return res; }

  private $components: { [path: string]: TComponent; } = {}; //all existing app component

  private _findStore(path: string, obj): Store {
    if (obj instanceof Store && (obj as Store).path == path) return obj as Store;
    if (Array.isArray(obj)) for (var o of obj) { let res = this._findStore(path, o); if (res) return res; }
    else if (obj instanceof Object) for (var p in obj) { if (p.startsWith('$')) continue; let res = this._findStore(path, obj[p]); if (res) return res; }
    return null;
  }

}
window.addEventListener("popstate", ev => {
  if (!store) return;
  console.log(`> popstate: ${window.location.href}`);
  store.routeBind(decodeFullUrl(), false);
  //store.onPopState(false);
});

export type TStoreAppClass = new () => StoreApp;