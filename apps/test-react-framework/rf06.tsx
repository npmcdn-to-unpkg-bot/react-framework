import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as flux from '../../react-framework/exports';

var moduleId = 'RF06';

//****************** Main Entry Point
export function init() {
  flux.StoreApp.bootApp(AppStore);
}

//****************** App Store
@flux.StoreDef({ moduleId: moduleId })
export class AppStore extends flux.StoreApp {
  getStartRoute(): flux.TRouteActionPar { return flux.createRoute<IAppRootRoutePar>(AppRootStore, { title: 'init_' }); }
  getIsHashRouter(): boolean { return true; }
}

//****************** AppRoot component
export class AppRoot extends flux.Component<AppRootStore, {}> { }

export enum AppRootAction { click }

export interface IAppRootRoutePar extends flux.IActionPar { title: string; } //route action par

@flux.StoreDef({ moduleId: moduleId, componentClass: AppRoot })
export class AppRootStore extends flux.Store<{}> {
  title: string;
  uniqId = (() => {
    var res = flux.getUnique(); console.log(res); return res;
  })();
  initFromRoutePar(routePar: IAppRootRoutePar) { this.title = routePar.title; } 
  asyncConstructor() { return new Promise<{}>(res => setTimeout(() => res(null), 1000)); }
  render(): JSX.Element {
    this.trace(`... ${this.uniqId}`);
    return <h1 onClick={ev => this.clickAction(ev, AppRootAction.click, 'click') }>Title: {this.title}</h1>;
  }
  doDispatchAction(id: number, par: flux.IActionPar): Promise<any> {
    switch (id) {
      case AppRootAction.click: return (this.$parent as flux.RouteHookStore).subNavigate<IAppRootRoutePar>(this.getMeta().classId, { title: this.title += 'x' });
      default: return super.doDispatchAction(id, par);
    }
  }
  componentWillUnmount() {
    super.componentWillUnmount();
    this.trace(`... ${this.uniqId}`);
  }
}
