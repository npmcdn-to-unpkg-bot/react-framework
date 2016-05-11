import * as rx from 'rxjs/Rx';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as flux from './exports';
import {ActionRecorder} from './action-recorder';
import {Animation} from './animation';

/*
**** store lifecycle
1. ROUTE
- async creation of all HOOK x COMPONENT stores
- component stores are saved in persistent HOOK.hookedStore field
- async completed => hook.modify => hook.render => all comonent's create and render (where hook is sub hook (for subNavigate) or global root hook (for navigate))
=== play version:
- all hook and components stores are created and persisted.
- route bind mechanism is used for HOOK.$routePar assignment only. Source for route binding is persisted store.saveRoute object literal

2. EXPLICIT store
- created anywhere in code (e.g. in $parent store constructor, in app initialization etc.)
=== play version, if created in $parent store constructor:
- created in $parent store constructor during "literal to store" $parent replacement in JSON status
- after that replaced by @selfLiteral literal in $parent Object.assign($parent, literal)
- after that created one more in @selfLiteral replacement (resulting in @selfClass)
- after that assigned all its persistent properties in Object.assign(@selfClass, literal)
=== play version, created in app initialization and assigned anywhere in global STATE
- ...

3. IMPLICIT store
- created in component constructor and saved in $parent.childStores
- created if it does not already exists
=== play version:
- not created, already exists in $parent.childStores

4. PLAY version
call root store.render(), yielding to calling all component constructors:
- component props and context to store.$props / store.$context
- state change notification subscribe
*/

var moduleId = 'flux';

export type TExceptionCallback = (exp: Error) => void;
export type TCreateStoreCallback = (res: Error | TStore) => void;
export class ELoginNeeded extends Error {
  constructor() { super(); this.returnUrl = store.actRoutes(); }
  returnUrl: TRouteActionPar;
}
export interface IStoreLiteral { _type: string; id: string; }

//types for validators
export type TSyncValidator<V> = (val: V) => string;
export type TSyncCompleted = (err: string) => void;

export function getUnique(): number { return unique++; } var unique = 0;

export type EventGeneric = React.SyntheticEvent | Event;
export function stopPropagation(ev: EventGeneric) {
  if (!ev) return;
  var e: Event = (ev as React.SyntheticEvent).nativeEvent ? (ev as React.SyntheticEvent).nativeEvent : ev as any;
  e.stopImmediatePropagation();
}

//****************** DECORATOR FOR REGISTERING STORE CLASSES
export function StoreDef(meta: IStoreMeta): ClassDecorator {
  return (storeClass: TStoreClassLow) => {
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
  className?: string;
  classId?: string;
  //classId(): string {return `${this.moduleId}.${this.className}`; }
  //pro komponenty, co se binduji do route hook
  componentClass?: TComponentClass; //class nabindovana do route hook
  storeClass?: TStoreClassLow; //
  loginNeeded?: boolean; //true x false. Iff undefined => bere se StoreApp.defaultLoginNeeded.
}
function componentToStore(componentClass: TComponentClass): TStoreClassLow {
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
export class Component<T extends TStore, P> extends React.Component<IProps<T> & P, any> { //generic React component
  constructor(props: TProps<T, P>, ctx: IComponentContext) {
    super(props, ctx);

    if (props.$store2) {
      var st = props.$store2();
      if (st) { this.state = st; return; }
      st = Store.createInRender<T>(ctx.$parent, componentToStore(this.constructor as TComponentClass), props.id);
      st.itsMe(this);
      st.componentCreated(); //notificiation
    }

    this.state = props.$store;
    //state to parent child states
    if (!this.state) { this.state = Store.createInRender<T>(ctx.$parent, componentToStore(this.constructor as TComponentClass), props.id); }
    else {
      if (this.state.$parent && ctx.$parent && this.state.$parent !== ctx.$parent) throw new Exception(`Parent mishmash`);
      if (props.id && this.state.id && props.id != this.state.id) throw new Exception(`Store "id=${this.state.id}" cannot be overrided by Component "id=${props.id}"`);
    }
    if (!this.state.id) this.state.id = props.id;
    if (!this.state.$initialized) {
      this.state.initStateFromProps(props);
      this.state.$initialized = true;
    }
    this.state.itsMe(this);
    this.state.componentCreated(); //notificiation
  }
  state: T;
  //props: TProps<T, P>;
  //context: IComponentContext;
  componentWillUnmount() { this.state.componentWillUnmount(); }
  componentDidMount() { this.state.componentDidMount(); }
  render(): JSX.Element {
    this.state.trace('render');
    this.state.itsMe(this);
    return this.state.render();
  }
  getChildContext(): IComponentContext { return { $parent: this.state }; }
}
Component['childContextTypes'] = { $parent: React.PropTypes.any };
Component['contextTypes'] = { $parent: React.PropTypes.any };
export interface IComponentContext { $parent: TStore; }

export type TComponent = Component<TStore, {}>;
export type TComponentClass = React.ComponentClass<TProps<TStore, {}>>;

export var defaultTemplates: { [storeId: string]: TTemplate<TStore>; } = {};

//****************** STORE
export type IChildStores = { [idInParent: string]: TStore; };
//export interface IPropsEx {  }
export interface IProps<T extends TStore> {
  $store?: T; //cast globalniho stavy aplikace, ktery je initialnim stavem komponenty
  $store2?: (st?: T) => T;
  id?: string;
  $template?: TTemplate<T>;
  $animation?: flux.IAnimation;
}
export type TProps<T extends TStore, P> = IProps<T> & P & { children?: React.ReactNode };
export type TTemplate<T extends TStore> = (self: T) => React.ReactNode;
export type TStore = Store<{}>;

//IPropsEx x Store relationship:
//Every component props (eg. title:string) has to be defined in Store:
//IF we needs: interface IExampleProps extends IPropsEx { title?:string; }
//THEN we have to have: class ExampleStore extends Store { title:string; }
//Props are assigned to Store in component constructor (Object.assign(this.state, props); delete this.state['$store'];
export abstract class Store<T> implements IStoreLiteral {

  $comp: Component<Store<T>, {}>; //self component, could be omited for stores without component
  $subscribers: Array<string> = []; //components path's, using this store as a status
  $props: TProps<this, T>;
  $initialized = false; //flag: store already initialized from component properties
  $onDidMount = new rx.Subject(); //component didMount notification. Called after velocity start animation.
  $animation: Animation;

  _type: string; //kvuli JSON deserializaci
  path: string; //unique Store identification
  childStores: IChildStores;
  animIsOut: boolean;
  //children: React.ReactNode;

  constructor(public $parent: TStore, public id?: string) {
    this._type = this.getMeta().classId;
    let idInParent = this.getIdInParent();
    this.path = ($parent ? $parent.path + '/' : '') + idInParent;
  }
  static createInHook<T extends TStore>(parent: TStore, storeId: string | TStoreClassLow, completed: TCreateStoreCallback, instanceId?: string, routePar?: IActionPar) {
    if (!storeId) { completed(null); return; }
    let cls = Store.getStoreClass(storeId);
    if (store.loginNeeded(cls)) { completed(new ELoginNeeded()); return null; }
    let res = new cls(parent, instanceId);
    res.$initialized = true;
    res.initFromRoutePar(routePar, completed);
  }
  static createInRender<T extends TStore>(parent: TStore, storeId: string | TStoreClassLow, instanceId?: string): T {
    let cls = Store.getStoreClass(storeId);
    let idInParent = Store.getClassIdInParent(cls, instanceId);
    let res = (parent.childStores ? parent.childStores[idInParent] : null) as T;
    if (res) return res;
    res = new cls(parent, instanceId) as T;
    if (!parent.childStores) parent.childStores = {};
    parent.childStores[idInParent] = res;
    return res as T;

  }
  static createInJSON(parent: TStore, _type: string, id: string): TStore {
    let meta = storeMetasDir[_type]; if (!meta) throw new flux.Exception(`Store ${_type} not registered`);
    var res = new meta.storeClass(parent, id); res.$initialized = true;
    return res;
  }

  getMeta(): IStoreMeta { return Store.getClassMeta(this.constructor as TStoreClassLow); } //store meta info
  getIdInParent(): string { return Store.getClassIdInParent(this.constructor as TStoreClassLow, this.id); } //jednoznacna identifikace v parent child seznamu
  static getClassMeta(storeClass: TStoreClassLow): IStoreMeta { //store meta info
    let res: IStoreMeta = storeClass.prototype[prototypeMeta]; if (!res) throw new flux.Exception('Maybe missing @StoreDef() store decorator'); return res;
  }
  static getStoreClass(storeId: string | TStoreClassLow): TStoreClassLow {
    if (typeof storeId === 'string') {
      let meta = storeMetasDir[storeId]; if (!meta) throw new flux.Exception(`Store ${storeId} not registered`);
      return meta.storeClass;
    } else
      return storeId;
  }
  static getClassIdInParent(storeClass: TStoreClassLow, instanceId: string): string {
    //return Store.getClassMeta(storeClass).className.replace('Store','') + (instanceId ? '_' + instanceId : '');
    return instanceId ? instanceId : Store.getClassMeta(storeClass).className.replace('Store', '');
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

  renderTemplate(escape?: React.ReactChild | Array<React.ReactChild>, forceElement?: boolean): React.ReactNode {
    let expandTemplate = () => {
      let templ = this.$props.$template || defaultTemplates[this.getMeta().classId];
      return templ ? templ(this) : null;
    };
    let normalizeArray = arr => {
      if (!arr) return null; if (!Array.isArray(arr)) return arr;
      switch (arr.length) {
        case 0: return null;
        case 1: return typeof arr[0] === 'string' ? arr : arr[0];
        default: return arr;
      }
    }

    let res = normalizeArray(React.Children.toArray(this.$props.children)) || normalizeArray(expandTemplate()) || normalizeArray(escape) || <div>Missing children or $template component property</div>;
    let isArr = Array.isArray(res); if (!isArr) return res;
    return forceElement ? <div>{res}</div> : res;
  }

  //************** Component management
  itsMe(comp: Component<this, {}>) {
    this.$props = comp.props as TProps<this, T>; this.$comp = comp;
    if (this.$props.$animation) this.$animation = new flux.Animation(this, this.$props.$animation);
  }

  render(): JSX.Element {
    return this.renderTemplate(null, true) as JSX.Element;
  }
  componentCreated() {
    this.trace('create');
    this.subscribe(this.$comp, true);
  }
  componentDidMount() {
    if (this.$animation) this.$animation.onDidMount();
    else this.$onDidMount.next({});
  }
  componentWillUnmount() {
    if (this.$parent && this.$parent.childStores) this.$parent.childStores[this.getIdInParent()]; //undo adjustComponentState
    this.unSubscribe(this.$comp, true);
    if (this.$animation) this.$animation.dispose();
    this.trace('destroy');
  }

  subNavigate<T extends flux.IActionPar>(storeId: string, par: T, completed?: flux.TCreateStoreCallback) {
    if (!(this instanceof RouteHookStore)) throw new Exception(`${this.path} is not RouteHookStore`);
    var hook = this as any as RouteHookStore;
    hook.bindRouteToHookStore(false, { storeId: storeId, par: par }, err => {
      if (err instanceof Error) { store.navigateError(err, completed); return; }
      hook.modify();
      store.pushState();
      if (completed) completed(err);
    });
  }

  //********************* INIT
  //"status from component props" initialization
  initStateFromProps(props: T) { }

  //finish store creation from route parameters. Not called in playing bootApp for action playing.
  //Could be async
  initFromRoutePar(par: IActionPar, completed: TCreateStoreCallback) { completed(this); }

  //************** Action Binding
  doDispatchAction(id: number, par: IActionPar, completed: TExceptionCallback) { throw new flux.ENotImplemented(`id=${id}, par=${JSON.stringify(par)}`); }

  bindRouteToStore(isRestore: boolean/*=true => bind from global state, encoded do JSON literal object*/, par: IActionPar, completed: TCreateStoreCallback) {
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

export type TStoreClass<T> = new ($parent: TStore, id?: string) => Store<T>;
export type TStoreClassLow = TStoreClass<{}>;
export type TDispatchCallback = (store: TStore) => void;

//****************** ROUTER HOOK STORE
export class RouteHook extends Component<RouteHookStore, {}> { }

@StoreDef({ moduleId: moduleId, componentClass: RouteHook })
export class RouteHookStore extends Store<{}> { //Route Hook component

  hookedStore: TStore;
  ignoreLoading: boolean; //dont show "Loading..." markup during router binding
  $routePar: TRouteActionPar;

  bindRouteToHookStore(isRestore: boolean, par: TRouteActionPar, completed: TCreateStoreCallback) {
    this.$routePar = par;
    if (isRestore) {
      flux.getChildRoutes(par).forEach(propName => this.hookedStore.bindRouteToStore(true, par[propName], flux.noop));
      completed(this.hookedStore);
    } else {
      var self = this;
      Store.createInHook<TStore>(this, par.storeId, res => {
        if (res instanceof Store) {
          self.hookedStore = res;
          //process child routes
          let childRoutes = flux.getChildRoutes(par); if (childRoutes.length <= 0) { completed(self.hookedStore); return; } //no child routes => completed
          let childRoutesPromises = childRoutes.map(p => par[p]).map(subPar => new Promise((ok, err) => res.bindRouteToStore(false, subPar, res => { if (res instanceof Error) err(res); else ok(res); })));
          rx.Observable.concat.apply(self, childRoutesPromises).subscribe(null, err => completed(err), () => completed(self.hookedStore));
        } else {
          delete self.hookedStore; delete self.$routePar;
          completed(null);
        }
      }, null, par.par);
    }
  }

  render(): JSX.Element {
    return this.hookedStore ? React.createElement(this.hookedStore.getMeta().componentClass, { $store: this.hookedStore, key: getUnique() }) : (this.ignoreLoading ? null : <div>Loading...</div>);
  }
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
  store.routeBind(routes, true, res => res instanceof Error ? completed(res) : completed(null));
}

//****************** ROOT STORE
export var store: StoreApp;
export type TStoreAppClass = new () => StoreApp;

@StoreDef({ moduleId: moduleId })
export abstract class StoreApp extends Store<{}> { //global Application store (root for other stores)
  constructor() {
    super(null);
    //configure App
    store = this;
    this.routeHookDefault = new RouteHookStore(this, 'hook');
    this.routeHookModal = new RouteHookStore(this, 'modal');
    this.routeHookModal.ignoreLoading = true;
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
  //called: 
  // - in navigate(routes, true, completed)
  // - in bootApp(), not playing, just start app
  // - in windows.onPopstate event (flux.decodeFullUrl(), false)
  routeBind(routes: TRouteActionPar /*null => start route*/, withPustState: boolean, completed?: TCreateStoreCallback) {
    if (!routes) routes = this.getStartRoute(); if (!routes) { if (completed) completed(null); return; };
    this.bindRouteToStore(false, routes, err => {
      if (err instanceof Error) { this.navigateError(err, completed); return; }
      this.routeHookDefault.modify();
      if (withPustState) this.pushState();
      if (completed) completed(err);
    });
  }
  actRoutes(): TRouteActionPar { return this.routeHookDefault.$routePar; }

  static bootApp(source: TStoreAppClass /*run app*/ | IStoreLiteral /*before play actions*/, compl?: TExceptionCallback, startRoute?: TRouteActionPar /* ===null => force getStartRoute -> decodeFullUrl call, ===undefined => decodeFullUrl -> getStartRoute, ===else => startRoute*/) {
    //clear all
    if (store) {
      store.$recorder.stopAll();
      ReactDOM.unmountComponentAtNode(store.$appElement);
      store = null;
    }
    if (!source) { if (compl) compl(null); return; } //clear by ReactDOM.unmountComponentAtNode only
    //create
    if ((source as IStoreLiteral)._type) { //from StoreApp encoded do JSON literal object
      let literal = source as IStoreLiteral;
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

      //compute start route logic. 
      if (startRoute === null) { //null used just in test-right-panel.tsx as a flag for forcing store.getStartRoute() call
        startRoute = store.getStartRoute();
        if (!startRoute) startRoute = flux.decodeFullUrl();
      } else if (!startRoute) { //standard !startRoute behavior
        startRoute = flux.decodeFullUrl();
        if (!startRoute) startRoute = store.getStartRoute() //this code is repeated in store.routeBind, putting here for logic clarification
      }
      if (!startRoute) { if (compl) compl(null); return; } //this code is repeated in store.routeBind, putting here for logic clarification

      //route exists => bind route
      store.routeBind(startRoute, startRoute ? true : false, !compl ? null : res => res instanceof Error ? compl(res) : compl(null)); //bind (=> init Stores) route
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
  loginNeeded(storeClass: TStoreClassLow): boolean {
    let ln = Store.getClassMeta(storeClass).loginNeeded; //priznak u komponenty...
    if (ln === undefined) ln = this.$defaultLoginNeeded; //...neni nastaven, pouzij defaultLoginNeeded
    if (!ln) return false; //vrat "neni potreba login"
    if (this.getIsLogged()) return false; //jiz je zalogovano => vrat "neni potreba login"
    return true; //redirekt na login page
  }


  routeHookDefault: RouteHookStore; //hook for root React component
  routeHookModal: RouteHookStore; //hook modal dialog

  findComponent(path: string): TComponent { let comp = this.$components[path]; if (!comp) throw new flux.Exception(`Component ${path} does not exist`); return comp; }

  doSubscribe(st: TStore, comp: TComponent, isSubscribe: boolean, includingComponent: boolean) { //prihlas x odhlas se k notifikaci o zmene stavu. Volano v TComponent konstructoru x TComponent.unmount.
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
    return <div>
      <RouteHook $store={this.routeHookDefault}/>
      <RouteHook $store={this.routeHookModal}/>
    </div>
  }

  findStore(path: string): TStore { let res = StoreApp._findStore(path, this); if (!res) throw new flux.Exception(`Cannot find store ${path}`); return res; }

  private $components: { [path: string]: TComponent; } = {}; //all existing app component

  private static _findStore(path: string, obj): TStore {
    if (obj instanceof Store && (obj as TStore).path == path) return obj as TStore;
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

//******************  dummy
interface DummyProps { [propName: string]: any; }
export class Dummy extends flux.Component<DummyStore, DummyProps> { }

@flux.StoreDef({ moduleId: moduleId, componentClass: Dummy })
export class DummyStore extends Store<DummyProps> { }

//******************  bind to state
interface BindToStateProps { $stores: Array<flux.TStore> | flux.TStore; }

export class BindToState extends flux.Component<BindToStateStore, BindToStateProps> { }

@flux.StoreDef({ moduleId: moduleId, componentClass: BindToState })
export class BindToStateStore extends Store<BindToStateProps> {
  //$stores: Array<flux.TStore> | flux.TStore;
  componentCreated() {
    super.componentCreated();
    if (this.$props.$stores) this.stores().forEach(st => st.subscribe(this.$comp));
  }
  componentWillUnmount() {
    super.componentWillUnmount();
    if (this.$props.$stores) this.stores().forEach(st => st.unSubscribe(this.$comp));
  }
  private stores(): Array<flux.TStore> { return Array.isArray(this.$props.$stores) ? this.$props.$stores as Array<flux.TStore> : [this.$props.$stores as flux.TStore]; }
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
