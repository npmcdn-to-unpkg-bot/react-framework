import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as flux from '../../react-framework/exports';
import * as tests from '../test-config';

import {
  colorUI, size,
  Button, ButtonAnimated, ButtonLabeled, colorButton, state, social, floated, attachedButton, animate,
  Label, pointing, corner, attachedLabel, circular,
  Icon, iconUI,
  ButtonTest, ButtonAnimatedTest, ButtonLabeledTest, IconTest
} from '../../react-semantic/exports';

//import * as ui from '../exports';


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
      <ButtonLabeledTest/><hr/>
      <IconTest/><hr/>
      <ButtonTest/><hr/>
      <ButtonAnimatedTest/><hr/>
    </div>;
  }
}