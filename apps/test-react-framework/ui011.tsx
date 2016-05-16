import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as flux from '../../react-framework/exports';
import {InputSmart, InputSmartStore, InputTag, RadiosStore} from '../../react-framework/exports';
import {CheckBox, CheckBoxStore } from '../../react-semantic/behaviors/forms';
import {initDefaultTemplates} from '../../react-semantic/behaviors/templates';

var moduleId = 'UI011';

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

  checkBox1: CheckBoxStore;
  checkBox2: CheckBoxStore;
  checkBox3: CheckBoxStore;

  render(): JSX.Element {
    return <div>
      <CheckBox $store2={st => this.checkBox1 = st ? st : this.checkBox1} id='checkbox1' $title='Check Box Test 1'/><br/>
      <CheckBox $store2={st => this.checkBox1 = st ? st : this.checkBox2} id='checkbox2' $title='Check Box Test 2' $defaultValue={true}/><br/>
      <CheckBox $store2={st => this.checkBox1 = st ? st : this.checkBox3} id='checkbox3' $title='Check Box Test 3' $defaultValue={false}/><br/>
      <hr/>
      <a href='#' onClick={ev => this.clickAction(ev, TActions.validate, 'validate') }>Validate</a> |
      <a href='#' onClick={ev => this.clickAction(ev, TActions.reset, 'reset') }>Reset</a>
    </div>;
  }
  doDispatchAction(id: number, par: flux.IActionPar):Promise<any> {
    switch (id) {
      case TActions.validate: return new Promise(ok => this.checkBox1.validate(res => ok(null))); 
      case TActions.reset: this.checkBox1.reset(); this.checkBox2.reset(); this.checkBox3.reset(); return Promise.resolve();
      default: return super.doDispatchAction(id, par);
    }
  }
}