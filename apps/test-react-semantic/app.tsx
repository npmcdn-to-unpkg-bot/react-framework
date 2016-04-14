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
      <ui.ButtonLabeled colorId={ui.colorId.blue} pointing left labelElement={<ui.Label colorId={ui.colorId.blue} basic>2.048</ui.Label>}>
        <ui.Icon iconId={ui.iconId.heart}/> Like
      </ui.ButtonLabeled> <br/><br/>
      <div className="ui left labeled button" tabindex="0">
        <a className="ui basic right pointing label">
          2,048
        </a>
        <div className="ui button">
          <i className="heart icon"></i> Like
        </div>
      </div><br/><br/>
      <div className="ui left labeled button">
        <a className="ui label basic right pointing ">
          2.048
        </a>
        <div className="ui button blue">
          <i className="icon"></i>Like
        </div>
      </div>
      {/*
      <ui.IconTest/><hr/>
      <ui.ButtonTest/><hr/>
      <ui.ButtonAnimatedTest/><hr/>
      */}
    </div>;
  }
}

var x = <div class="ui labeled button left">
  <a class="ui label basic pointing right">
    2.048
  </a>
  <div class="ui button blue">
    <i class="icon"></i>Like
  </div>
</div>

var y = <div class="ui left labeled button" tabindex="0">
  <a class="ui basic right pointing label">
    2,048
  </a>
  <div class="ui button">
    <i class="heart icon"></i> Like
  </div>
</div>;
