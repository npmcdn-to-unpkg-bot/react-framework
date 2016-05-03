import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as flux from '../../react-framework/exports';

var moduleId = 'RFTest1';

//****************** Main Entry Point
export function init() {
  flux.StoreApp.bootApp(AppStore);
}

//****************** App Store
@flux.StoreDef({ moduleId: moduleId })
export class AppStore extends flux.StoreApp {
  getStartRoute(): flux.TRouteActionPar { return flux.createRoute(AppRootStore); }
}

//****************** AppRoot component
export class AppRoot extends flux.Component<AppRootStore, {}> { }

@flux.StoreDef({ moduleId: moduleId, componentClass: AppRoot })
export class AppRootStore extends flux.Store {
  render(): JSX.Element { return <h1>Hallo world 1</h1>; }
}