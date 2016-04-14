import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as flux from '../../react-framework/exports';
import * as tests from '../test-config';
import * as ui from '../../react-semantic/exports';

var moduleId = 'testReactSemantic';

//****************** Main Entry Point
export function init() {
  flux.StoreApp.bootApp(AppStore);
}

//****************** App Store
@flux.StoreDef({ moduleId: moduleId })
export class AppStore extends flux.StoreApp {
  getStartRoute(): flux.TRouteActionPar {
    return flux.createRoute(AppRootStore);
  }
  getIsHashRouter(): boolean { return true; }
}


//****************** AppRoot component
export interface IStoreApp extends flux.IStore { }
export interface IPropsExApp extends flux.IPropsEx { }
export class AppRoot extends flux.Component<AppRootStore, IPropsExApp> { }

enum TActions { };//, refreshState };

@flux.StoreDef({ moduleId: moduleId, componentClass: AppRoot })
export class AppRootStore extends flux.Store implements IStoreApp {
  constructor($parent: flux.Store) {
    super($parent);
  }
  render(): JSX.Element {
    return <div>
      <h3>testReactSemantic</h3>
      <ui.ButtonAnimated animateTo={{ animate: ui.animate.fade, to: 'Hidden' }}>Follow</ui.ButtonAnimated>
    </div>;
  }
}
