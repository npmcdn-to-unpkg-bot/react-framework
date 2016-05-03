import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as flux from '../../react-framework/exports';

import {RouteHook} from '../../react-framework/exports';

var moduleId = 'RFTest7';

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
  getIsHashRouter(): boolean { return true; }
}

//****************** AppRoot component
export interface IPropsExApp { title?: string }
export class AppRoot extends flux.Component<AppRootStore, {}> { }

enum TActions { appClick, childClick, navigate, login };

@flux.StoreDef({ moduleId: moduleId, componentClass: AppRoot })
export class AppRootStore extends flux.Store<{}> {
  constructor($parent: flux.TStore) {
    super($parent);
    this.routeHookDefault = new flux.RouteHookStore(this, '1');
    this.otherHook = new flux.RouteHookStore(this, '2');
  }

  routeHookDefault: flux.RouteHookStore;
  otherHook: flux.RouteHookStore;
  title = 'App title';
  doDispatchAction(id: number, par: flux.IActionPar, completed: flux.TExceptionCallback) {
    switch (id) {
      case TActions.appClick:
        setTimeout(() => { this.modify(st => st.title += 'x'); completed(null); }, 200);
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
  initFromRoutePar(routePar: flux.IActionPar, completed: flux.TCreateStoreCallback) {
    setTimeout(() => completed(this), 200);
  }
  render(): JSX.Element {
    return <div>
      <h2 onClick={ev => this.clickAction(ev, TActions.appClick, 'appCLick') }>{this.title}</h2>
      <a href='#' onClick={ev => this.clickAction(ev, TActions.navigate, 'navigate') }>Navigate</a>
      <hr/>
      <Child $title='Not routed child'/>
      <hr/>
      <RouteHook $store={this.routeHookDefault}/>
      <hr/>
      <RouteHook $store={this.otherHook}/>
      <hr/>
      {/*
      */}
    </div>;
  }
}

//****************** Child component
export interface IPropsChild { $title?: string }

export class Child extends flux.Component<ChildStore, IPropsChild> { }

export interface IChildRouteActionPar { title: string; }

@flux.StoreDef({ moduleId: moduleId, componentClass: Child })
export class ChildStore extends flux.Store<IPropsChild> implements IChildRouteActionPar {
  title: string;
  doDispatchAction(id: number, par: flux.IActionPar, completed: flux.TExceptionCallback) {
    switch (id) {
      case TActions.childClick:
        if (this.$parent instanceof flux.RouteHookStore) {
          this.subNavigate<IChildRouteActionPar>(st => st.title += 'x', completed);
        } else {
          this.modify(st => st.title += 'x');
          completed(null);
        }
        break;
      default:
        super.doDispatchAction(id, par, completed)
    }
  }
  initFromRoutePar(routePar: IChildRouteActionPar, completed: flux.TCreateStoreCallback) {
    setTimeout(() => { Object.assign(this, routePar); completed(this); }, 200);
  }
  componentCreated(comp: Child) {
    super.componentCreated(comp);
    if (this.$props.$title) this.title = this.$props.$title;
  }
  render(): JSX.Element {
    return <h3 onClick={ev => this.clickAction(ev, TActions.childClick, 'childClick') }>{this.title}</h3>;
  }
}