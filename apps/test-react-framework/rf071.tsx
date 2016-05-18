import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as flux from '../../react-framework/exports';

import {RouteHook} from '../../react-framework/exports';

var moduleId = 'RF071';

//****************** Main Entry Point
export function init() {
  flux.StoreApp.bootApp(AppStore);
}

//****************** App Store
@flux.StoreDef({ moduleId: moduleId })
export class AppStore extends flux.StoreApp {
  getStartRoute(): flux.TRouteActionPar {
    return flux.createRoute(AppRootStore, null, flux.createRoute<IChildRouteActionPar>(ChildStore, { title: 'Child1' }));
  }
  getIsHashRouter(): boolean { return true; } //hash URL format
}

enum TActions { childClick };

//****************** AppRoot component
export class AppRoot extends flux.Component<AppRootStore, {}> { }

@flux.StoreDef({ moduleId: moduleId, componentClass: AppRoot })
export class AppRootStore extends flux.Store<{}> {
  asyncConstructor() { return new Promise<{}>(res => setTimeout(() => res(null), 200)); }
  render(): JSX.Element { return <RouteHook/> }
}

//****************** Child component
export class Child extends flux.Component<ChildStore, {}> {}

export interface IChildRouteActionPar { title: string; }

@flux.StoreDef({ moduleId: moduleId, componentClass: Child })
export class ChildStore extends flux.Store<{}> {

  doDispatchAction(id: number, par: flux.IActionPar):Promise<any> {
    switch (id) {
      case TActions.childClick: return this.parentRoute().subNavigate(flux.createRoute<IChildRouteActionPar>(ChildStore, { title: this.getRoutePar<IChildRouteActionPar>().title += 'x' }));
      default: return super.doDispatchAction(id, par)
    }
  }
  //init from router parametter, could be async
  asyncConstructor() { return new Promise<{}>(res => setTimeout(() => res(null), 200)); }

  render(): JSX.Element {
    return <h3 onClick={ev => this.clickAction(ev, TActions.childClick, 'childClick') }>{this.getRoutePar<IChildRouteActionPar>().title}</h3>;
  }
}