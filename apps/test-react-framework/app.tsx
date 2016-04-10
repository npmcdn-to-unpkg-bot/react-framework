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
export class Login extends flux.Component<LoginStore> { }

export interface ILoginRouteActionPar { returnUrl: string; }

@flux.StoreDef({ moduleId: moduleId, componentClass: Login, loginNeeded: false })
class LoginStore extends flux.Store {

  doDispatchAction(id: number, par: flux.IActionPar, completed: flux.TExceptionCallback) {
    switch (id) {
      case TActions.login:
        (flux.store as AppStore).isLogged = true;
        flux.navigate(flux.decodeFullUrl(this.returnUrl));
        break;
    }
  }
  prepareBindRouteToStore(par: flux.IActionPar, completed: flux.TExceptionCallback) {
    var p = par as ILoginRouteActionPar;
    this.returnUrl = p.returnUrl;
    completed(null);
  }
  returnUrl: string;
  render(): JSX.Element {
    return <div>
      <a href='#' onClick={ev => this.clickAction<ILoginRouteActionPar>(ev, TActions.login, 'login', { returnUrl: this.returnUrl }) }>LOGIN</a>
    </div>;
  }
}

//****************** AppRoot component
export class AppRoot extends flux.Component<AppRootStore> { }

enum TActions { appClick, childClick, navigate, login, refreshState };

@flux.StoreDef({ moduleId: moduleId, componentClass: AppRoot })
class AppRootStore extends flux.Store {
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
      case TActions.refreshState:
        var stateStr = flux.appStateToJSON(flux.store, 2);
        ReactDOM.unmountComponentAtNode(document.getElementById('app'));
        history.pushState(null, null, 'http://localhost:53159/apps/test-react-framework/index.html');
        setTimeout(() => flux.StoreApp.bootApp(JSON.parse(stateStr)), 1000);
        break;
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
  prepareBindRouteToStore(par: flux.IActionPar, completed: flux.TExceptionCallback) {
    setTimeout(() => completed(null), 200);
  }
  render(): JSX.Element {
    return <div>
      <h2 onClick={ev => this.clickAction(ev, TActions.appClick, 'appCLick') }>{this.title}</h2>
      <a href='#' onClick={ev => this.clickAction(ev, TActions.navigate, 'navigate') }>Navigate</a>
      {/*
      <hr/>
      <a href='#' onClick={ev => this.clickAction(ev, TActions.refreshState) }>Refresh State</a>*/}
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
export class Child extends flux.Component<ChildStore> { }

export interface IChildRouteActionPar { title: string; }

@flux.StoreDef({ moduleId: moduleId, componentClass: Child, loginNeeded: true })
class ChildStore extends flux.Store {
  title: string;
  doDispatchAction(id: number, par: flux.IActionPar, completed: flux.TExceptionCallback) {
    switch (id) {
      case TActions.childClick:
        flux.subNavigate<IChildRouteActionPar>(this.$parent, st => st.par.title += 'x', completed);
        //this.modify(st => st.title += 'x'); completed();
        break;
      default:
        super.doDispatchAction(id, par, completed)
    }
  }
  prepareBindRouteToStore(par: flux.IActionPar, completed: flux.TExceptionCallback) {
    setTimeout(() => { Object.assign(this, par); completed(null); }, 200);
  }
  render(): JSX.Element {
    return <h3 onClick={ev => this.clickAction(ev, TActions.childClick, 'childClick') }>{this.title}</h3>;
  }
}
