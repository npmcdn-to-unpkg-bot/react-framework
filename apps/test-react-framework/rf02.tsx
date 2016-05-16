import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as flux from '../../react-framework/exports';

var moduleId = 'RF02';

//****************** Main Entry Point
export function init() {
  flux.StoreApp.bootApp(AppStore);
}

//****************** App Store
@flux.StoreDef({ moduleId: moduleId })
export class AppStore extends flux.StoreApp {
  //default URL je ???.html/testReactFramework.AppRootStore;title=Hello_World_Title
  getStartRoute(): flux.TRouteActionPar { return flux.createRoute<IAppRoutePar>(AppRootStore, { title: 'Hallo_World_Title_2' }); }
}

//****************** AppRoot component
export class AppRoot extends flux.Component<AppRootStore, {}> { }

export interface IAppRoutePar extends flux.IActionPar { title: string; } //route action par

@flux.StoreDef({ moduleId: moduleId, componentClass: AppRoot })
export class AppRootStore extends flux.Store<{}> {
  render(): JSX.Element { return <h1>{this.title}</h1>; }
  title: string;
  //finish store creation from route parameters. Not called in playing bootApp for action playing.
  initFromRoutePar(routePar: IAppRoutePar) { this.title = routePar.title } //inicializace store po jeho vytvoreni. Muze byt asynchronni
}
