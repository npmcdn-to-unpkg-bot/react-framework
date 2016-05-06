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

  constructor(parent, id) {
    super(parent, id);
    this.checkBox1 = new CheckBoxStore(this, 'checkBox1');
    this.checkBox2 = new CheckBoxStore(this, 'checkBox2');
    this.checkBox3 = new CheckBoxStore(this, 'checkBox3');
  }

  checkBox1: CheckBoxStore;
  checkBox2: CheckBoxStore;
  checkBox3: CheckBoxStore;

  render(): JSX.Element {
    return <div>
      <CheckBox $store={this.checkBox1} $title='Check Box Test 1'/><br/>
      <CheckBox $store={this.checkBox2} $title='Check Box Test 2' $defaultValue={true}/><br/>
      <CheckBox $store={this.checkBox3} $title='Check Box Test 3' $defaultValue={false}/><br/>
      <hr/>
      <a href='#' onClick={ev => this.clickAction(ev, TActions.validate, 'validate') }>Validate</a> |
      <a href='#' onClick={ev => this.clickAction(ev, TActions.reset, 'reset') }>Reset</a>
    </div>;
  }
  doDispatchAction(id: number, par: flux.IActionPar, completed: flux.TExceptionCallback) {
    switch (id) {
      case TActions.validate: this.checkBox1.validate(res => completed(null)); break;
      case TActions.reset: this.checkBox1.reset(); this.checkBox2.reset(); this.checkBox3.reset(); completed(null); break;
      default: super.doDispatchAction(id, par, completed); break;
    }
  }
}