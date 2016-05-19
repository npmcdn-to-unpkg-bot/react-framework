import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as flux from '../../react-framework/exports';
import {InputSmart, InputSmartStore, InputTag, RadiosStore} from '../../react-framework/exports';
import {Radio} from '../../react-semantic/behaviors/forms';
import {initDefaultTemplates} from '../../react-semantic/behaviors/templates';

var moduleId = 'UI012';

initDefaultTemplates();

enum TActions { validate, reset }

//****************** Main Entry Point
export function init() {
  flux.StoreApp.bootApp(AppStore);
}

//****************** App Store
@flux.StoreDef({ moduleId: moduleId })
export class AppStore extends flux.StoreApp {
  getStartRoute(): flux.TRouteActionPar { return flux.createRoute(AppRootStore); }
  getIsHashRouter(): boolean { return true; }
}

//****************** AppRoot component
export class AppRoot extends flux.Component<AppRootStore, {}> { }

@flux.StoreDef({ moduleId: moduleId, componentClass: AppRoot })
export class AppRootStore extends flux.Store<{}> {

  radios: RadiosStore;

  render(): JSX.Element {
    return <div>
      <Radio $radios={st => this.radios = st ? st : this.radios} $title='Radio 1' id='r1'/><br/>
      <Radio $radios={st => this.radios = st ? st : this.radios} $title='Radio 2' id='r2' $defaultValue={true}/><br/>
      <Radio $radios={st => this.radios = st ? st : this.radios} $title='Radio 3' id='r3'/><br/>
      <hr/>
      <a href='#' onClick={ev => this.clickAction(ev, TActions.validate, 'validate') }>Validate</a> |
      <a href='#' onClick={ev => this.clickAction(ev, TActions.reset, 'reset') }>Reset</a>
    </div>;
  }
  doDispatchAction(id: number, par: flux.IActionPar): Promise<any> {
    switch (id) {
      case TActions.validate: return Promise.resolve(null); 
      case TActions.reset: this.radios.reset(); return Promise.resolve(null);
      default: return super.doDispatchAction(id, par);
    }
  }
}