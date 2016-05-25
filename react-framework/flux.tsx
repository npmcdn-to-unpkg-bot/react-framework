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
- component props and context to store.$props / store.getContext()
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
          actStore.action(act.actionId, act.descr, act.par).then(() => obs.complete()).catch(err => obs.error(err));
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

    var res: ICreateInComponent<T> = props.$store instanceof Store ? { res: props.$store as T } : Store.createInComponent<T>(ctx.$parent, componentToStore(this.constructor as TComponentClass), props.id, props.$store as TGetStore<T>);
    var st = this.state = res.res; delete st.$animation;
    //this.state.$props() = props;
    st.$comp = this;
    if (props.$animation) st.$animation = new flux.Animation(st, props.$animation);

    if (!st.$initialized) {
      st.initStateFromProps(props);
      st.$initialized = true;
    }

    st.componentCreated(); //notificiation

    //async loading
    if (res.wait) {
      if (store.justRouting()) store.$routing.waitings.push(res.wait); //route changing - wait for all subcomponent loading
      else res.wait.then(() => this.forceUpdate()); //re-render afret loading
    }

  }
  state: T;
  componentWillUnmount() { this.state.componentWillUnmount(); }
  componentDidMount() { this.state.trace('componentDidMount'); this.state.componentDidMount(); }
  componentDidUpdate() { this.state.trace('componentDidUpdate'); this.state.componentDidUpdate(); }
  render(): JSX.Element {
    if (!this.state.$initialized) return null;
    //this.state.$props() = this.props;
    this.state.trace('render');
    return this.state.render();
  }
  getChildContext(): IComponentContext { return { $parent: this.state }; } //React child context provider
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
type TGetStore<T extends TStore> = (st?: T) => T;
interface ICreateInComponent<T extends TStore> { res: T, wait?: Promise<T> }
export interface IProps<T extends TStore> {
  //$store?: T; //cast globalniho stavy aplikace, ktery je initialnim stavem komponenty
  $store?: TGetStore<T> | T;
  //$routePar?: TRouteActionPar; //pro route hooked komponentu
  id?: string;
  $template?: TTemplate<T>;
  $animation?: flux.IAnimation;
}
export type TProps<T extends TStore, P> = IProps<T> & P & { children?: React.ReactNode };
export type TTemplate<T extends TStore> = (self: T) => React.ReactNode;
export type TStore = Store<{}>;
interface IChildRoutesResult {
  hookId: string;
  hook: RouteHookStore;
}

//IPropsEx x Store relationship:
//Every component props (eg. title:string) has to be defined in Store:
//IF we needs: interface IExampleProps extends IPropsEx { title?:string; }
//THEN we have to have: class ExampleStore extends Store { title:string; }
//Props are assigned to Store in component constructor (Object.assign(this.state, props); delete this.state['$store'];
export abstract class Store<T> implements IStoreLiteral {

  $comp: Component<Store<T>, {}>; //self component, could be omited for stores without component
  $subscribers: Array<string> = []; //components path's, using this store as a status
  $initialized = false; //flag: store already initialized from component properties
  //$onDidMount: rx.Subject<any>;//component didMount notification. Called after velocity start animation.
  $onDidMount: Deferred<any>; //componentDidMount is async due to velocity start animation.
  $animation: Animation; //component animations

  _type: string; //store type, kvuli JSON deserializaci
  //routePar: IActionPar; //TRouteActionPar.par, assigned from route
  path: string; //unique Store identification
  childStores: IChildStores;
  animIsOut: boolean; //aktualni hodnota animace v didMount: undefined - animuje se do IN, true - nastavi se OUT (bez animace), false - nastavi se IN

  constructor(public $parent: TStore, public id?: string) {
    var meta = this.getMeta();
    if (meta) { //!meta => store without component
      this._type = meta.classId;
      let idInParent = this.getIdInParent();
      this.path = ($parent ? $parent.path + '/' : '') + idInParent;
    }
  }
  //async dokonceni konstructoru.
  //!!!**** asyncConstructor je volan az po componentCreated a po initStateFromProps
  asyncConstructor(): Promise<this> { return null; }

  //"status from component props" initialization
  initStateFromProps(props: TProps<this, T>) { if (props.$animation) this.animIsOut = props.$animation.animIsOutDefault; }

  static createInComponent<T extends TStore>(parent: TStore, storeId: string | TStoreClassLow, id: string, storeProc: (st?: T) => T): ICreateInComponent<T> {
    let res: T;
    if (storeProc) { res = storeProc(); if (res) return { res: res }; } //Store jiz vytvoren, v parent fieldu
    let cls = Store.getStoreClass(storeId);
    let idInParent = null;
    if (!storeProc) { //Store jiz vytvoren, v parent childStores
      idInParent = Store.getClassIdInParent(cls, id);
      res = (parent.childStores ? parent.childStores[idInParent] : null) as T;
      if (res) return { res: res };
    }
    //Store nevytvoren, vytvor:
    res = new cls(parent, id) as T;
    if (storeProc) storeProc(res); //... a uloz do fieldu
    else { //... a uloz do parent childStores
      if (!parent.childStores) parent.childStores = {};
      parent.childStores[idInParent] = res;
    }
    return { res: res, wait: res.asyncConstructor() };
  }

  static createInJSON(parent: TStore, _type: string, id: string): TStore {
    let meta = storeMetasDir[_type]; if (!meta) throw new flux.Exception(`Store ${_type} not registered`);
    var res = new meta.storeClass(parent, id); res.$initialized = true;
    return res;
  }

  subscribe(comp: TComponent, includingComponent?: boolean) { store.doSubscribe(this, comp, true, includingComponent); } //called in React.Component constructor
  unSubscribe(comp: TComponent, includingComponent?: boolean) { store.doSubscribe(this, comp, false, includingComponent); } //called in React.Component componentWillUnmount
  trace(msg: string) { console.log(`> ${this.path ? this.path : 'RoutingGlobalStore'}: ${msg}`); } //helper
  getProps(): TProps<this, T> { return this.$comp ? this.$comp.props as TProps<this, T> : null; } //my component props
  getContext<T extends IComponentContext>(): any { return this.$comp ? this.$comp.context as T : null; } //my component context

  getMeta(avoidNull?: boolean): IStoreMeta { return Store.getClassMeta(this.constructor as TStoreClassLow, avoidNull); } //store meta info
  getIdInParent(): string { return Store.getClassIdInParent(this.constructor as TStoreClassLow, this.id); } //jednoznacna identifikace v parent child seznamu
  static getClassMeta(storeClass: TStoreClassLow, avoidNull?: boolean): IStoreMeta { //store meta info
    let res: IStoreMeta = storeClass.prototype[prototypeMeta]; if (avoidNull && !res) throw new flux.Exception('Maybe missing @StoreDef() store decorator'); return res;
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
    this.trace('changeState');
    this.$subscribers.forEach(path => {
      let comp = store.findComponent(path);
      comp.forceUpdate();
    });
  }

  //************** when ROUTE 
  parentRoute(): RouteHookStore {
    if (!(this.$parent instanceof RouteHookStore)) throw new Exception(`Parent component is not RouteHookStore: ${this.path}`);
    return this.$parent as RouteHookStore;
  }
  childRoutes(res?: Array<RouteHookStore>, recursive?: boolean): Array<RouteHookStore> {
    if (!res) res = [];
    let push = (r: RouteHookStore) => {
      if (!(r instanceof RouteHookStore)) return;
      res.push(r);
      if (recursive) r.hookedStore.childRoutes(res, true);
    };
    for (var p in this) if (!p.startsWith('$')) push(this[p]);
    if (this.childStores) for (var p in this.childStores) push(this.childStores[p] as RouteHookStore);
    return res;
  }
  findRouteHook(hookId?: string): RouteHookStore {
    if (!hookId) hookId = routeHookDefaultName;
    var res = this.childRoutes().find(r => {
      var hid = r.getProps().$hookId ? r.getProps().$hookId : routeHookDefaultName;
      return hid === hookId;
    });
    if (!res) throw new Exception(`Cannot find RouteHook, hookId=${hookId}`);
    return res;
  }
  getRoutePar<T extends IActionPar>(): T {
    return this.parentRoute().getHookPar().par as T;
  }
  onUnbindFromRoute(): Promise<any> { return null; }

  //************** Component management
  renderTemplate(escape?: React.ReactChild | Array<React.ReactChild>, forceElement?: boolean): React.ReactNode {
    let props = this.getProps();
    let expandTemplate = () => {
      let templ = props.$template || defaultTemplates[this.getMeta().classId];
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

    let res = normalizeArray(React.Children.toArray(props.children)) || normalizeArray(expandTemplate()) || normalizeArray(escape) || <div>Missing children or $template component property</div>;
    if (!(normalizeArray(React.Children.toArray(props.children)) || normalizeArray(expandTemplate()) || normalizeArray(escape))) {
      let props = this.getProps();
      debugger;
    }
    let isArr = Array.isArray(res); if (!isArr) return res;
    return forceElement ? <div>{res}</div> : res;
  }

  render(): JSX.Element {
    return this.renderTemplate(null, true) as JSX.Element;
  }

  componentCreated() {
    this.trace('create');
    this.subscribe(this.$comp, true);
  }
  componentDidMount() {
    this.$onDidMount = new Deferred();
    if (this.$animation) this.$animation.onDidMount();
    else this.$onDidMount.resolve(null);
  }
  componentDidUpdate() { }
  componentWillUnmount() {
    if (this.$parent && this.$parent.childStores) this.$parent.childStores[this.getIdInParent()]; //undo adjustComponentState
    this.unSubscribe(this.$comp, true);
    if (this.$animation) this.$animation.dispose();
    this.trace('destroy');
  }

  //************** Action Binding
  doDispatchAction(id: number, par: IActionPar): Promise<any> { throw new flux.ENotImplemented(`id=${id}, par=${JSON.stringify(par)}`); }

  action<T extends IActionPar>(id: number, descr: string, par?: T): Promise<any> { //call action
    console.log(`> action ${JSON.stringify({ dispPath: this.path, actionId: id, par: par })}`);
    store.$recorder.onStoreAction(() => { return { dispPath: this.path, actionId: id, par: par, descr: this.getMeta().classId + ': ' + descr }; });
    return this.doDispatchAction(id, par);
  }
  clickAction<T extends IActionPar>(ev: React.MouseEvent, id: number, descr: string, par?: T): Promise<any> { //call action and prevent default for HTML DOM mouse event
    ev.preventDefault();
    return this.action<T>(id, descr, par);
  }
}

export type TStoreClass<T> = new ($parent: TStore, id?: string) => Store<T>;
export type TStoreClassLow = TStoreClass<{}>;
export type TDispatchCallback = (store: TStore) => void;

//****************** ROUTER HOOK STORE
enum RoutingGlobalStatus { no, toStart, toFinish }
class RoutingGlobalStore extends Store<{}> { //globalni routing change information
  sender: RouteHookStore; //actual routing store
  waitings: Array<Promise<TStore>>; //async stores, cekajici na naladovani.
  running: RoutingGlobalStatus; //routing phase
  //status pro sender
  topIsAct: boolean; //double buffer status
  actComp: JSX.Element; //aktualne navazana komponenta
  nextComp: JSX.Element; //asynce render komponenta
  completed: Deferred<any>; //notifikace o dokonceni route binding
}
export interface IRouteHookProps { $ignoreLoading?: boolean; $hookPar?: TRouteActionPar; $hookId?: string; $modalLike?: boolean; }
export interface IRouteHookState { routing: boolean; }

export interface IRouteActionPar<T extends IActionPar> extends IActionPar {
  storeId: string; //Store.getId()
  hookId?: string; //nazev property v hook.parent Store, obsahujici RouteHookDispatcher. !hookId => routeDefaultPropName property
  par?: T; //<storeId>.routeAction(par, hookId)
  routeHookDefault?: TRouteActionPar; //difotni child route hook
}
export type TRouteActionPar = IRouteActionPar<IActionPar>;

export class RouteHook extends Component<RouteHookStore, IRouteHookProps> { }

@StoreDef({ moduleId: moduleId, componentClass: RouteHook })
export class RouteHookStore extends Store<IRouteHookProps> { //Route Hook component

  hookedStore: TStore;

  getHookPar(): TRouteActionPar {
    if (this.$parent === store) return this.getProps().$hookId ? null : store.route; //simple case
    let act: RouteHookStore = this; let path: Array<string> = [];
    while (act.$parent != store) { //hookId path:
      path.push(this.getProps().$hookId ? this.getProps().$hookId : routeHookDefaultName);
      do { act = act.$parent as RouteHookStore; } while (!(act instanceof RouteHookStore));
    }
    let res = store.route; for (var i = path.length - 1; i >= 0; i--) {
      res = res[path[i]]; //to down route parsing
      if (!res) throw new Exception('Missing ${path[i]} route hook');
    }
    return res;
  }

  subNavigate(subRoute: flux.TRouteActionPar): Promise<TStore> {
    var hookPar = this.getHookPar(); if (!hookPar) throw new Exception('!hookPar');
    //nahrazeni stareho hook par novym
    for (var p in hookPar) delete hookPar[p]; Object.assign(hookPar, subRoute);
    return this.routing(true);
  }

  routing(withPustState: boolean): Promise<TStore> {
    let self = this;
    store.$routing.completed = new Deferred<any>();
    let unbindAll = Promise.all(!self.hookedStore ? [] : self.hookedStore.childRoutes(null, true).map(r => r.hookedStore.onUnbindFromRoute()));
    unbindAll.then(() => { //async hookedStores unbind
      if (self.hookedStore) { self.hookedStore.componentWillUnmount(); delete self.hookedStore; }
      store.$routing.subscribe(self.$comp); //store.$routing.modify subscription
      store.$routing.modify(st => {
        st.running = RoutingGlobalStatus.toStart; st.sender = self; st.waitings = [];
        delete st.topIsAct; delete st.actComp; delete st.nextComp;
      });
    }).catch(err => store.$routing.completed.reject(err));
    if (withPustState) store.pushState();
    return store.$routing.completed.promise;
  }

  routed() {
    if (store.$routing.sender !== this || !store.$routing.running) return;
    let doFinish = () => {
      store.$routing.modify(st => {
        st.running = RoutingGlobalStatus.toFinish; st.actComp = st.nextComp;
        delete st.waitings; delete st.nextComp; st.completed.resolve(this.hookedStore);
      });
      store.$routing.unSubscribe(this.$comp);
    }
    if (store.$routing.waitings.length > 0) Promise.all(store.$routing.waitings).then(() => doFinish());
    else doFinish();
  }

  render(): JSX.Element {
    let hookPar = this.getHookPar(); if (!hookPar) return null; //empty route par

    //recreate and re-render hooked comp
    let getComp = () => {
      let compClass = Store.getClassMeta(Store.getStoreClass(hookPar.storeId)).componentClass;
      return React.createElement(compClass, {
        key: getUnique(), id: 'hooked',
        $store: st => this.hookedStore = st ? st : this.hookedStore,
      });
    }

    //no routing, just render hook
    if (store.$routing.sender !== this || !store.$routing.running) return getComp();

    if (store.$routing.running === RoutingGlobalStatus.toStart) {
      if (!store.$routing.actComp) store.$routing.actComp = this.getProps().$ignoreLoading ? null : <div>Loading...</div>; //first routing => actComp is splash
      store.$routing.nextComp = getComp();
      store.$routing.topIsAct = !store.$routing.topIsAct;
      this.trace('... routing');
      return store.$routing.topIsAct ?
        <div><RouteHookItem key={1} comp={store.$routing.actComp} store={this}/><RouteHookItem key={2} comp={store.$routing.nextComp} store={this}/></div> :
        <div><RouteHookItem key={2} comp={store.$routing.actComp} store={this}/><RouteHookItem key={1} comp={store.$routing.nextComp} store={this}/></div>;
    } else if (store.$routing.running === RoutingGlobalStatus.toFinish) {
      this.trace('... NOT routing');
      store.$routing.running = RoutingGlobalStatus.no;
      return <div><RouteHookItem key={store.$routing.topIsAct ? 2 : 1} comp={store.$routing.actComp} store={this}/></div>;
    } else
      throw new Exception('');
  }

  componentDidMount() { super.componentDidMount(); this.routed(); }
  componentDidUpdate() { super.componentDidUpdate(); this.routed(); }

}
//pomocna komponenta pro render double-buffer
interface IRouteHookItemProps { comp: JSX.Element; store: RouteHookStore; }
class RouteHookItem extends React.Component<IRouteHookItemProps, {}> {
  shouldComponentUpdate(nextProps: IRouteHookItemProps, nextState: TStore, nextContext: any): boolean { return !this.props.store || store.$routing.actComp !== this.props.comp; }
  render(): JSX.Element { return this.props.comp; }
}

export var routeParIgnores = ['storeId', 'hookId', 'par'];
export var routeHookDefaultName = 'routeHookDefault';

//****************** ROOT STORE
export function navigate(routes: flux.TRouteActionPar, completed?: flux.TExceptionCallback): Promise<TStore> {
  return store.rootRouteBind(routes, true);
}

export var store: StoreApp;
export type TStoreAppClass = new () => StoreApp;

class StoreComponent extends Component<StoreApp, {}> { }

@StoreDef({ moduleId: moduleId, componentClass: StoreComponent })
export abstract class StoreApp extends Store<{}> { //global Application store (root for other stores)
  constructor() {
    super(null);
    //configure App
    store = this;
    this.$basicUrl = this.getBasicUrl(window.location.href);
    console.log(`> router basicUrl=${this.$basicUrl}`);
    this.$appElement = this.getAppElement();
    this.$isHashRouter = this.getIsHashRouter();
    this.$defaultLoginNeeded = this.getDefaultLoginNeeded();
    this.$routing = new RoutingGlobalStore(this);
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

  route: TRouteActionPar;
  //**** action player
  //saveRoute: TRouteActionPar;
  $recorder = new ActionRecorder();

  //**** routing 
  $routing: RoutingGlobalStore;
  justRouting(): boolean { return !!this.$routing.running; }

  //************************** 
  //called: 
  // - in navigate(routes, true, completed)
  // - in bootApp(), not playing, just start app
  // - in windows.onPopstate event (flux.decodeFullUrl(), false)
  rootRouteBind(routes: TRouteActionPar /*null => start route*/, withPustState: boolean): Promise<TStore> {
    if (!routes) routes = this.getStartRoute(); if (!routes) return Promise.resolve(null);
    store.route = routes;
    //return this.findRouteHook(routes.hookId).routing(routes, withPustState);
    return this.findRouteHook(routes.hookId).routing(withPustState);
  }
  actRoutes(): TRouteActionPar { return store.route; }// throw new ENotImplemented('return this.findRouteHook().$hookPar;'); }

  static bootApp(source: TStoreAppClass /*run app*/ | IStoreLiteral /*before play actions*/, startRoute?: TRouteActionPar /* ===null => force getStartRoute -> decodeFullUrl call, ===undefined => decodeFullUrl -> getStartRoute, ===else => startRoute*/): Promise<TStore> {    //clear all
    if (store) {
      store.$recorder.stopAll();
      ReactDOM.unmountComponentAtNode(store.$appElement);
      store = null;
    }
    if (!source) return Promise.resolve(null); // { if (compl) compl(null); return; } //clear by ReactDOM.unmountComponentAtNode only
    //create
    if ((source as IStoreLiteral)._type) { //from StoreApp encoded do JSON literal object
      let literal = source as IStoreLiteral;
      flux.literalToAppState(literal); //nahrad objects literals (with _type prop) by new Store(). Vedlejsi efekt je naplneni store
      store.pushState();
      ReactDOM.render(React.createElement(StoreComponent, { $store: store }), store.$appElement); //render all, route is already binded in state
      return Promise.resolve(null);
    } else { //from StoreApp constructor
      let cls = source as TStoreAppClass;
      new cls(); //vedlejsi efekt je naplneni store
      ReactDOM.render(React.createElement(StoreComponent, { $store: store }), store.$appElement); //render pouze StoreApp a jeji hook

      //compute start route logic. 
      if (startRoute === null) { //null used just in test-right-panel.tsx as a flag for forcing store.getStartRoute() call
        startRoute = store.getStartRoute();
        if (!startRoute) startRoute = flux.decodeFullUrl();
      } else if (!startRoute) { //standard !startRoute behavior
        startRoute = flux.decodeFullUrl();
        if (!startRoute) startRoute = store.getStartRoute() //this code is repeated in store.routeBind, putting here for logic clarification
      }
      if (!startRoute) return Promise.resolve(null);

      //route exists => bind route
      return store.rootRouteBind(startRoute, startRoute ? true : false);
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


  //routeHookDefault: RouteHookStore; //hook for root React component
  //routeHookModal: RouteHookStore; //hook modal dialog

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
        //componentWillUnmount se pro RouteHook.hookStore vola dvakrat, kontrol atedy neprojde
        //if (!this.$components[st.path]) throw new flux.Exception(`${st.path}: !Sync.path2Component[p]`);
        //delete this.$components[st.path];
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
    //return <div>
    //  <RouteHook $store={st => this.routeHookDefault = st ? st : this.routeHookDefault} id='hook'/>
    //  <RouteHook $store={st => this.routeHookModal = st ? st : this.routeHookModal} $hookId='modal' $ignoreLoading id='modal'/>
    //</div>
    return <div>
      <RouteHook id='hook'/>
      <RouteHook $hookId='modal' id='modal' $modalLike={true}/>
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

//******************  Placeholder
//export interface IPlaceholderState { storeId: string; }
//export class Placeholder extends Component<PlaceholderStore, {}> { }

//@StoreDef({ moduleId: moduleId, componentClass: Placeholder })
//export class PlaceholderStore extends Store<{}> {
//  state: IPlaceholderState;
//  hookedStore: TStore;
//  render(): JSX.Element {
//    if (!this.state || !this.state.storeId) return null;
//    let compClass = Store.getClassMeta(Store.getStoreClass(this.state.storeId)).componentClass;
//    return React.createElement(compClass, {
//      key: getUnique(), id: 'hooked',
//      $store: st => {
//        return this.hookedStore = st ? st : this.hookedStore;
//      },
//    });
//  }
//  bind<T extends IPlaceholderState>(): Promise<{}> {
//    this.modify(
//    delete this.hookedStore;
//  }
//}

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
    if (this.getProps().$stores) this.stores().forEach(st => st.subscribe(this.$comp));
  }
  componentWillUnmount() {
    super.componentWillUnmount();
    if (this.getProps().$stores) this.stores().forEach(st => st.unSubscribe(this.$comp));
  }
  private stores(): Array<flux.TStore> { return Array.isArray(this.getProps().$stores) ? this.getProps().$stores as Array<flux.TStore> : [this.getProps().$stores as flux.TStore]; }
}

//***************** POPSTATE EVENT
window.addEventListener("popstate", ev => {
  if (!store) return;
  console.log(`> popstate: ${window.location.href}`);
  store.rootRouteBind(flux.decodeFullUrl(), false);
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

//console.log('####### START');
//interface item { x: number; }
//var subj = new rx.Subject<number>();
//var obs = subj.scan<item>((r, i) => { return { x: i }; }, { x: 0 });
//obs.do(x => console.log('A## ' + x.x)).subscribe();
//subj.next(1);
//setTimeout(() => subj.next(2), 500);
//var subb = obs.do(x => console.log('B## ' + x.x)).subscribe();
//subj.next(3);
//obs.do(x => console.log('C## ' + x.x)).subscribe();
//setTimeout(() => subj.next(4), 500);
//subb.unsubscribe();
//console.log('####### DONE');


//https://github.com/seangenabe/es6-deferred/blob/master/deferred.js
export class Deferred<T> {
  constructor() {
    this.promise = new Promise((function (resolve, reject) { this.resolve = resolve; this.reject = reject; }).bind(this));
    this.then = this.promise.then.bind(this.promise);
    this.catch = this.promise.catch.bind(this.promise);
  }
  promise;
  then: (compl: (res: T) => void) => void;
  catch: (error: (err: any) => void) => void;
  resolve: (res: T) => void;
  reject: (reason: any) => void;
};

//var d = new Deferred<boolean>();
//d.resolve(true);
//d.then(res => { debugger; })
//debugger;
////setTimeout(() => d.resolve(true), 1000);

export function PromiseTimeout<T>(milisecs: number): Promise<any> { return new Promise<any>(res => setTimeout(() => res(null), milisecs)); }

export function PromiseContactAll<T>(getPromises: Array<() => Promise<T>>): Promise<Array<T | Error>> {

  // Create a new empty promise
  var sequence = Promise.resolve<T>(null);
  var res: Array<T | Error> = [];
  var hasError = false;

  getPromises.forEach(getPromise => {
    // Chain one computation onto the sequence
    sequence = sequence.then(getPromise).then(r => { res.push(r); return r; }).catch((err: Error) => { hasError = true; res.push(err); });
  });

  // This will resolve after the entire chain is resolved
  return sequence.then(r => new Promise<Array<T | Error>>((ok, err) => {
    if (hasError) err(res); else ok(res);
  }));
}

//debugger;
//var pr = PromiseContactAll<number>([
//  () => new Promise<number>(ok => setTimeout(() => ok(1), 1000)),
//  () => new Promise<number>((ok, err) => setTimeout(() => ok(2)/*err(new Error('xxx'))*/, 1000)),
//  () => new Promise<number>(ok => setTimeout(() => ok(3), 1000)),
//]);
//pr.then(res => { debugger; pr.then(r => { debugger; }); }).catch(err => { debugger; })


