import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as flux from '../../react-framework/exports';
import {RouteHook} from '../../react-framework/exports';
import {ENotImplemented, Exception, getClassName} from '../../utils/low-utils';
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

//setTimeout(() =>
//  flux.navigate(flux.createRoute(AppRootStore, null,
//    flux.createRoute<IChildRouteActionPar>(ChildStore, { title: 'Child1' }),
//    { otherHook: flux.createRoute<IChildRouteActionPar>(ChildStore, { title: 'Child2' }) })),
//  5000);

//****************** Login page
export class Login extends flux.Component<LoginStore> { }

export interface ILoginRouteActionPar { returnUrl: string; }

@flux.StoreDef({ moduleId: moduleId, componentClass: Login, loginNeeded: false })
class LoginStore extends flux.StoreDispatcher {

  //constructor($parent: flux.Store) {
  //  super($parent);
  //  debugger;
  //}

  doDispatchAction(id: number, par: flux.IActionPar, completed: flux.TExceptionCallback) {
    switch (id) {
      case TActions.login:
        (flux.store as AppStore).isLogged = true;
        flux.navigate(flux.decodeFullUrl(this.returnUrl));
        break;
      case flux.act_routeInitForBind:
        var p = par as ILoginRouteActionPar;
        this.returnUrl = p.returnUrl;
        completed(null);
        break;
    }
  }
  returnUrl: string;
  render(): JSX.Element {
    return <div>
      <a href='#' onClick={ev => this.clickAction<ILoginRouteActionPar>(ev, TActions.login, { returnUrl: this.returnUrl }) }>LOGIN</a>
    </div>;
  }
}

//****************** AppRoot component
export class AppRoot extends flux.Component<AppRootStore> { }

enum TActions { click, navigate, login, refreshState };

@flux.StoreDef({ moduleId: moduleId, componentClass: AppRoot })
class AppRootStore extends flux.StoreDispatcher {
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
      case TActions.click:
        setTimeout(() => { this.modify(st => st.title += 'x'); completed(null); }, 200);
        break;
      case TActions.refreshState:
        var stateStr = flux.saveAppStateToJSON(flux.store, 2);
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
      case flux.act_routeInitForBind:
        setTimeout(() => completed(null), 200);
        break;
      default:
        super.doDispatchAction(id, par, completed)
    }
  }
  render(): JSX.Element {
    return <div>
      <h2 onClick={ev => this.clickAction(ev, TActions.click) }>{this.title}</h2>
      <a href='#' onClick={ev => this.clickAction(ev, TActions.navigate) }>Navigate</a>
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
class ChildStore extends flux.StoreDispatcher {
  title: string;
  doDispatchAction(id: number, par: flux.IActionPar, completed: flux.TExceptionCallback) {
    switch (id) {
      case flux.act_routeInitForBind:
        setTimeout(() => { Object.assign(this, par); completed(null); }, 200);
        break;
      case TActions.click:
        flux.subNavigate<IChildRouteActionPar>(this.$parent, st => st.par.title += 'x', completed);
        //this.modify(st => st.title += 'x'); completed();
        break;
      default:
        super.doDispatchAction(id, par, completed)
    }
  }
  render(): JSX.Element {
    return <h3 onClick={ev => this.clickAction(ev, TActions.click) }>{this.title}</h3>;
  }
}
