import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as flux from '../../react-framework/exports';

import {RouteHook} from '../../react-framework/exports';
import {Badge, Button, FABButton } from 'react-mdl';


var moduleId = 'testReactFramework';

//****************** Main Entry Point
export function init() { flux.StoreApp.bootApp(AppStore); }

//****************** App Store
@flux.StoreDef({ moduleId: moduleId })
export class AppStore extends flux.StoreApp {
  getStartRoute(): flux.TRouteActionPar {
    return flux.createRoute(AppRootStore, null,
      flux.createRoute<IChildRouteActionPar>(ChildStore, { title: 'Child1' }),
      { otherHook: flux.createRoute<IChildRouteActionPar>(ChildStore, { title: 'Child2' }) });
  }
  getIsHashRouter(): boolean { return true; }
  //login
  getLoginRoute(returnUrl: flux.TRouteActionPar): flux.TRouteActionPar { return flux.createRoute<ILoginRouteActionPar>(LoginStore, { returnUrl: flux.encodeFullUrl(returnUrl) }); }
  getIsLogged(): boolean { return this.isLogged; }
  //permanentni app state infos. Zachovaji se pri browser back x forward
  isLogged = false;
}

//****************** Login page
export interface IStoreLogin extends flux.IStore { returnUrl: string }
export interface IPropsExLogin extends flux.IPropsEx { returnUrl?: string }

export class Login extends flux.Component<LoginStore, IPropsExLogin> { }

export interface ILoginRouteActionPar extends IPropsExLogin { }

@flux.StoreDef({ moduleId: moduleId, componentClass: Login, loginNeeded: false })
class LoginStore extends flux.Store implements IStoreLogin {

  doDispatchAction(id: number, par: flux.IActionPar, completed: flux.TExceptionCallback) {
    switch (id) {
      case TActions.login:
        (flux.store as AppStore).isLogged = true;
        flux.navigate(flux.decodeFullUrl(this.returnUrl));
        break;
    }
  }
  initStore(par: flux.IActionPar, completed: flux.TCreateStoreCallback) {
    var p = par as ILoginRouteActionPar;
    this.returnUrl = p.returnUrl;
    completed(this);
  }
  returnUrl: string;
  render(): JSX.Element {
    return <div>
      <a href='#' onClick={ev => this.clickAction<ILoginRouteActionPar>(ev, TActions.login, 'login', { returnUrl: this.returnUrl }) }>LOGIN</a>
    </div>;
  }
}

//****************** AppRoot component
export interface IStoreApp extends flux.IStore { title: string }
export interface IPropsExApp extends flux.IPropsEx { title?: string }
export class AppRoot extends flux.Component<AppRootStore, IPropsExApp> { }

enum TActions { appClick, childClick, navigate, login };//, refreshState };

@flux.StoreDef({ moduleId: moduleId, componentClass: AppRoot })
class AppRootStore extends flux.Store implements IStoreApp {
  constructor($parent: flux.Store) {
    super($parent);
    this.routeHookDefault = new flux.StoreRouteHook(this, '1');
    this.otherHook = new flux.StoreRouteHook(this, '2');
  }

  title: string = 'Hello world'
  routeHookDefault: flux.StoreRouteHook;
  otherHook: flux.StoreRouteHook;
  doDispatchAction(id: number, par: flux.IActionPar, completed: flux.TExceptionCallback) {
    switch (id) {
      case TActions.appClick:
        setTimeout(() => { this.modify(st => st.title += 'x'); completed(null); }, 200);
        break;
      //case TActions.refreshState:
      //  var stateStr = flux.appStateToJSON(flux.store, 2);
      //  ReactDOM.unmountComponentAtNode(document.getElementById('app'));
      //  history.pushState(null, null, 'http://localhost:53159/apps/test-react-framework/index.html');
      //  setTimeout(() => flux.StoreApp.bootApp(JSON.parse(stateStr)), 1000);
      //  break;
      case TActions.navigate:
        flux.navigate(
          flux.createRoute(AppRootStore, null,
            flux.createRoute<IChildRouteActionPar>(ChildStore, { title: 'NavigateChild1' }),
            { otherHook: flux.createRoute<IChildRouteActionPar>(ChildStore, { title: 'NavigateChild2' }) }),
          completed
        );
        break;
      default:
        super.doDispatchAction(id, par, completed)
    }
  }
  initStore(par: flux.IActionPar, completed: flux.TCreateStoreCallback) {
    setTimeout(() => completed(this), 200);
  }
  render(): JSX.Element {
    return <div>
      <h2 onClick={ev => this.clickAction(ev, TActions.appClick, 'appCLick') }>{this.title}</h2>
      <a href='#' onClick={ev => this.clickAction(ev, TActions.navigate, 'navigate') }>Navigate</a>
      <hr/>
      <Child title='Not routed child' $parent={this} />
      <hr/>
      <RouteHook state={this.routeHookDefault}/>
      <hr/>
      <RouteHook state={this.otherHook}/>
      <hr/>
      <FABButton />
    </div>;
  }
}

//****************** Child component
export interface IStoreChild extends flux.IStore { title: string }
export interface IPropsExChild extends flux.IPropsEx { title?: string }

export class Child extends flux.Component<ChildStore, IPropsExChild> { }

export interface IChildRouteActionPar { title: string; }

@flux.StoreDef({ moduleId: moduleId, componentClass: Child, loginNeeded: true })
class ChildStore extends flux.Store implements IStoreChild {
  title: string;
  doDispatchAction(id: number, par: flux.IActionPar, completed: flux.TExceptionCallback) {
    switch (id) {
      case TActions.childClick:
        if (this.$parent instanceof flux.StoreRouteHook)
          flux.subNavigate<IChildRouteActionPar>(this.$parent, st => st.par.title += 'x', completed);
        else {
          this.modify(st => st.title += 'x');
          completed(null);
        }
        break;
      default:
        super.doDispatchAction(id, par, completed)
    }
  }
  initStore(par: flux.IActionPar, completed: flux.TCreateStoreCallback) {
    setTimeout(() => { Object.assign(this, par); completed(this); }, 200);
  }
  render(): JSX.Element {
    return <h3 onClick={ev => this.clickAction(ev, TActions.childClick, 'childClick') }>{this.title}</h3>;
  }
}

//interface IStorex { instanceId: string; }
//interface IPropsEx { instanceId?: string; }
//interface IPropsx<T extends Storex> { state: T; }

//class Storex implements IStorex { instanceId: string; }
//class Component<T extends Storex, P extends IPropsEx> extends React.Component<IPropsx<T> & P, any>{ }

//interface IStoreChildx extends IStorex { title: string; }
//interface IChilsPropsEx extends IPropsEx { title?: string; }
//class StoreChildx extends Storex implements IStoreChildx { title: string; }
//export class Childx extends Component<StoreChildx, IChilsPropsEx>{ }

//var ch = <Childx state={null}/>

declare var __extends: any;
__extends(Component, React.Component);
function Component(props, ctx) {
  React.Component.call(this, props, ctx);
  props.state.trace('create');
  props.state.subscribe(this);
}
Component.prototype.componentWillUnmount = function () {
  //undo adjustComponentState
  if (this.props.$parent && this.props.$parent.childStores && this.props.state)
    delete this.props.$parent.childStores[this.props.state.getIdInParent()];
  this.props.state.unSubscribe(this);
  this.props.state.trace('destroy');
};
Component.prototype.render = function () {
  return this.props.state.render();
};

