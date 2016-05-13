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
  initFromRoutePar(routePar: IAppRootRoutePar, completed: flux.TCreateStoreCallback) { //asynchronni inicializace store po jeho vytvoreni
    setTimeout(() => { this.title = routePar.title; completed(this); }, 1500);
  } 
  render(): JSX.Element { return <h1 onClick={ev => this.clickAction(ev, AppRootAction.click, 'click') }>Title: {this.title}</h1>; }
  doDispatchAction(id: number, par: flux.IActionPar, completed: flux.TExceptionCallback) {
    switch (id) {
      case AppRootAction.click:
        (this.$parent as flux.RouteHookStore).subNavigate<IAppRootRoutePar>(this.getMeta().classId, { title: this.title += 'x' }, res => res instanceof Error ? completed(res) : completed(null));
        break;
      default:
        super.doDispatchAction(id, par, completed);
        break;
    }
  }
}
