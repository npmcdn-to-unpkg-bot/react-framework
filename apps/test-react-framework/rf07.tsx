import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as flux from '../../react-framework/exports';

import {RouteHook} from '../../react-framework/exports';

var moduleId = 'RF07';

//****************** Main Entry Point
export function init() {
  flux.StoreApp.bootApp(AppStore);
}

//****************** App Store
@flux.StoreDef({ moduleId: moduleId })
export class AppStore extends flux.StoreApp {
  getStartRoute(): flux.TRouteActionPar {
    return flux.createRoute(AppRootStore, null,
      flux.createRoute<IChildRouteActionPar>(ChildStore, { title: 'Child1' }),
      { otherHook: flux.createRoute<IChildRouteActionPar>(ChildStore, { title: 'Child2' }) });
  }
  getIsHashRouter(): boolean { return true; } //hash URL format
}

enum TActions { appClick, childClick, navigate };

//****************** AppRoot component
export class AppRoot extends flux.Component<AppRootStore, {}> { }

@flux.StoreDef({ moduleId: moduleId, componentClass: AppRoot })
export class AppRootStore extends flux.Store<{}> {
  constructor($parent: flux.TStore) {
    super($parent);
    this.routeHookDefault = new flux.RouteHookStore(this, '1');
    this.otherHook = new flux.RouteHookStore(this, '2');
    this.child1 = new ChildStore(this);
  }

  routeHookDefault: flux.RouteHookStore;
  otherHook: flux.RouteHookStore;
  child1: ChildStore;
  title = 'App title';
  doDispatchAction(id: number, par: flux.IActionPar): Promise<any> {
    switch (id) {
      case TActions.appClick:
        return new Promise(res => setTimeout(() => { this.modify(st => st.title += 'x'); res(null); }, 200));
      case TActions.navigate:
        return flux.navigate(
          flux.createRoute(AppRootStore, null,
            flux.createRoute<IChildRouteActionPar>(ChildStore, { title: 'NavigateChild1' }),
            { otherHook: flux.createRoute<IChildRouteActionPar>(ChildStore, { title: 'NavigateChild2' }) })
        );
      default: return super.doDispatchAction(id, par);
    }
  }
  asyncConstructor() { return new Promise<{}>(res => setTimeout(() => res(null), 200)); }

  render(): JSX.Element {
    return <div>
      <h2 onClick={ev => this.clickAction(ev, TActions.appClick, 'appCLick') }>{this.title}</h2>
      <a href='#' onClick={ev => this.clickAction(ev, TActions.navigate, 'navigate') }>Navigate</a>
      <hr/>
      <Child $title='Not routed child 1' $store2={this.child1} id='child1'/>
      <Child $title='Not routed child 2' id='child2'/>
      <hr/>
      <RouteHook $store2={this.routeHookDefault}/>
      <hr/>
      <RouteHook $store2={this.otherHook}/>
      <hr/>
      {/*
      */}
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
  doDispatchAction(id: number, par: flux.IActionPar): Promise<any> {
    switch (id) {
      case TActions.childClick:
        if (this.$parent instanceof flux.RouteHookStore) {
          return (this.$parent as flux.RouteHookStore).subNavigate<IChildRouteActionPar>(this.getMeta().classId, { title: this.title += 'x' });
        } else {
          this.modify(st => st.title += 'x');
          return Promise.resolve();
        }
      default: return super.doDispatchAction(id, par);
    }
  }
  //init from router parametter, could be async
  asyncConstructor() { return new Promise<{}>(res => setTimeout(() => res(null), 200)); }
  initFromRoutePar(routePar: IChildRouteActionPar) { Object.assign(this, routePar); }
  initStateFromProps(props) {
    super.initStateFromProps(props);
    this.title = props.$title;
  }
  render(): JSX.Element {
    return <h3 onClick={ev => this.clickAction(ev, TActions.childClick, 'childClick') }>{this.title}</h3>;
  }
}