import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as flux from '../../react-framework/exports';
import {InputSmart, InputSmartStore, InputTag, RadiosStore} from '../../react-framework/exports';
import * as forms from '../../react-framework/behaviors/index';
import * as uiForms from '../../react-semantic/behaviors/forms';
import {FormSmart, FormSmartStore, CheckBox, CheckBoxStore, FieldSmart, FieldSmartStore, Radio, Dimmer, DimmerStore } from '../../react-semantic/behaviors/forms';
import {Fields, Field } from '../../react-semantic/common/exports';

var moduleId = 'UI03';

uiForms.initDefaultTemplates();

enum TActions { showDimmer }

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

@flux.StoreDef({ moduleId: moduleId, componentClass: Dimmer })
class Dimm extends DimmerStore {
  componentCreated(comp) {
    this.$props = {
      $onConfirmHide: (res, done) => done(true), $hideOnClick: true, $hideOnEscape: true, $page: true, $active: true, $template: dim => <div className='content'>
        <h1>Dimmer</h1>
      </div>
    };
    super.componentCreated(comp);
  }
}

//****************** AppRoot component
export class AppRoot extends flux.Component<AppRootStore, {}> { }

@flux.StoreDef({ moduleId: moduleId, componentClass: AppRoot })
export class AppRootStore extends flux.Store<{}> {

  render(): JSX.Element {
    return <div>
      <a href='#' onClick={ev => this.clickAction(ev, TActions.showDimmer, 'showDimmer') }>Show Dimmer</a>
    </div>;
  }

  doDispatchAction(id: TActions, par: flux.IActionPar, completed: flux.TExceptionCallback) {
    switch (id) {
      case TActions.showDimmer: forms.dimmerShow<flux.IActionPar, forms.IModalOut>(Dimm as any, {}).then(out => { }); break;
      default: super.doDispatchAction(id, par, completed); break;
    }
  }

}