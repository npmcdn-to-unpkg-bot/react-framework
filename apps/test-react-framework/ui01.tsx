import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as flux from '../../react-framework/exports';
import {InputSmart, InputSmartStore, InputTag, RadiosStore} from '../../react-framework/exports';
import * as uiForms from '../../react-semantic/behaviors/forms';

var moduleId = 'UI01';

uiForms.initDefaultTemplates();

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
  render(): JSX.Element {
    return <div>
      <InputSmart ref={inp => this.inp = inp ? inp.state : null} $defaultValue='default value' $validator={flux.requiredValidator() } $validatorAsync={(val, compl) => setTimeout(() => { compl(val == 'ok' ? null : 'ok required') }, 500) }/>
      <hr/>
      <a href='#' onClick={ev => this.clickAction(ev, TActions.validate, 'validate') }>Validate</a> |
      <a href='#' onClick={ev => this.clickAction(ev, TActions.reset, 'reset') }>Reset</a>
    </div>;
  }
  inp: InputSmartStore;

  doDispatchAction(id: number, par: flux.IActionPar): Promise<any> {
    switch (id) {
      case TActions.validate: return new Promise(ok => this.inp.validate(res => ok(null))); 
      case TActions.reset: this.inp.reset(); return Promise.resolve();
      default: return super.doDispatchAction(id, par);
    }
  }
}