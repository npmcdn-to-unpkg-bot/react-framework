import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as flux from '../../react-framework/exports';
import {InputSmart, InputSmartStore, InputTag, RadiosStore} from '../../react-framework/exports';
import * as forms from '../../react-framework/behaviors/index';
import * as uiForms from '../../react-semantic/behaviors/forms';
import {FormSmart, FormSmartStore, CheckBox, CheckBoxStore, FieldSmart, FieldSmartStore, Radio, DimmerSmart, DimmerStore } from '../../react-semantic/behaviors/forms';
import {Fields, Field, Dimmer, Modal, Icon, icon } from '../../react-semantic/common/exports';

var moduleId = 'UI04';

uiForms.initDefaultTemplates();

enum TActions { showModal }

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
class ModalSmart extends DimmerStore<{},forms.IModalOut> {
  render(): JSX.Element {
    return <Dimmer $page $active $modals>
      <Modal>
        <Icon $Icon={icon.close} onClick={ev => this.clickAction(ev, 1,'')}/>
      </Modal>
    </Dimmer>
  }
}

//****************** AppRoot component
export class AppRoot extends flux.Component<AppRootStore, {}> { }

@flux.StoreDef({ moduleId: moduleId, componentClass: AppRoot })
export class AppRootStore extends flux.Store<{}> {

  render(): JSX.Element {
    return <div>
      <a href='#' onClick={ev => this.clickAction(ev, TActions.showModal, 'showDimmer') }>Show Dimmer</a>
    </div>;
  }

  doDispatchAction(id: TActions, par: flux.IActionPar, completed: flux.TExceptionCallback) {
    switch (id) {
      case TActions.showModal: forms.dimmerShow<flux.IActionPar, forms.IModalOut>(ModalSmart as any, {}).then(out => { }); break;
      default: super.doDispatchAction(id, par, completed); break;
    }
  }

}