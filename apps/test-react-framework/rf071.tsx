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
  routeHookDefault: flux.RouteHookStore;
  asyncConstructor() { return new Promise<{}>(res => setTimeout(() => res(null), 200)); }
  render(): JSX.Element {
    return <div>
      <RouteHook $store2={st => this.routeHookDefault = st ? st : this.routeHookDefault}/>
    </div>;
  }
}

//****************** Child component
export interface IPropsChild { $title?: string }

export class Child extends flux.Component<ChildStore, IPropsChild> {
  //constructor(props, ctx) {
  //  debugger;
  //  super(props, ctx);
  //}
}

export interface IChildRouteActionPar { title: string; }

@flux.StoreDef({ moduleId: moduleId, componentClass: Child })
export class ChildStore extends flux.Store<IPropsChild> implements IChildRouteActionPar {

  title: string;
  doDispatchAction(id: number, par: flux.IActionPar):Promise<any> {
    switch (id) {
      case TActions.childClick: return (this.$parent as flux.RouteHookStore).subNavigate<IChildRouteActionPar>(this.getMeta().classId, { title: this.title += 'x' });
      default: return super.doDispatchAction(id, par)
    }
  }
  //init from router parametter, could be async
  asyncConstructor() { return new Promise<{}>(res => setTimeout(() => res(null), 200)); }
  initStateFromProps(props) {
    super.initStateFromProps(props);
    this.title = props.$title;
  }
  render(): JSX.Element {
    return <h3 onClick={ev => this.clickAction(ev, TActions.childClick, 'childClick') }>{this.title}</h3>;
  }
}