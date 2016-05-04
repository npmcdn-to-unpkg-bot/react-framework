import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as flux from '../../react-framework/exports';

var moduleId = 'RF03';

//****************** Main Entry Point
export function init() {
  flux.StoreApp.bootApp(AppStore);
}

//****************** App Store
@flux.StoreDef({ moduleId: moduleId })
export class AppStore extends flux.StoreApp {
  //default URL je diky getIsHashRouter ???.html#testReactFramework.AppRootStore;title=Hello_World_Title
  //mozno zmenit napr. na #testReactFramework.AppRootStore;title=xxxx
  getStartRoute(): flux.TRouteActionPar { return flux.createRoute<IAppRoutePar>(AppRootStore, { title: 'Hallo_World_Title_3' }); }
  protected getIsHashRouter(): boolean { return true; }
}

//****************** AppRoot component
export class AppRoot extends flux.Component<AppRootStore, {}> { }

export interface IAppRoutePar extends flux.IActionPar { title: string; } //route action par

@flux.StoreDef({ moduleId: moduleId, componentClass: AppRoot })
export class AppRootStore extends flux.Store<{}> {
  render(): JSX.Element { return <h1>{this.title}</h1>; }
  title: string;
  //asynchronni inicializace Store
  initFromRoutePar(routePar: IAppRoutePar, completed: flux.TCreateStoreCallback) {
    this.title = routePar.title;
    setTimeout(() => completed(this), 1000);
  } 
}
