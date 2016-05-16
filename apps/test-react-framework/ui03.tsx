import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as flux from '../../react-framework/exports';
import {InputSmart, InputSmartStore, InputTag, RadiosStore} from '../../react-framework/exports';
import * as forms from '../../react-framework/behaviors/index';
import * as uiForms from '../../react-semantic/behaviors/forms';
import {FormSmart, FormSmartStore, CheckBox, CheckBoxStore, FieldSmart, FieldSmartStore, Radio, DimmerSmart, DimmerStore } from '../../react-semantic/behaviors/forms';
import {Fields, Field, Dimmer, Modal, Icon, icon } from '../../react-semantic/common/exports';

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


@flux.StoreDef({ moduleId: moduleId, componentClass: DimmerSmart })
class TestDimmer extends DimmerStore<forms.IModalIn, forms.IModalOut> {

  render(): JSX.Element {
    return <Dimmer $page $active>
      <div className='content' style={{ padding: '400px' }} >
        <h1 onClick={ev => flux.stopPropagation(ev) } onKeyDown={ev => flux.stopPropagation(ev) } tabIndex={1}>Dimmer</h1>
      </div>
    </Dimmer>
  }
  asyncConstructor() { return new Promise<{}>(res => setTimeout(() => res(null), 500)); }
  cont: Element;
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

  doDispatchAction(id: TActions, par: flux.IActionPar): Promise<any> {
    switch (id) {
      case TActions.showDimmer: return new Promise(ok => forms.dimmerShow<forms.IModalIn, forms.IModalOut>(TestDimmer, { hideOnEscape: true }, () => ok()).then(out => { })); 
      default: return super.doDispatchAction(id, par);
    }
  }

}