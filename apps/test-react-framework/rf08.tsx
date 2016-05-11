import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as flux from '../../react-framework/exports';

import {RouteHook, Dummy, DummyStore} from '../../react-framework/exports';

var moduleId = 'RF08';

//****************** Main Entry Point
export function init() {
  flux.StoreApp.bootApp(AppStore);
}

//****************** App Store
@flux.StoreDef({ moduleId: moduleId })
export class AppStore extends flux.StoreApp {
  getStartRoute(): flux.TRouteActionPar { return flux.createRoute(AppRootStore); }
  getIsHashRouter(): boolean { return true; } //hash URL format
}

enum TActions { click };

//****************** AppRoot component
export class AppRoot extends flux.Component<AppRootStore, {}> { }

@flux.StoreDef({ moduleId: moduleId, componentClass: AppRoot })
export class AppRootStore extends flux.Store<{}> {

  constructor(p, i) {
    super(p, i);
    this.dummy = this.hidden ? null : new DummyStore(this);
  }

  hidden = false;
  render(): JSX.Element {
    return <div>
      <a href='#' onClick={ev => this.clickAction(ev, TActions.click, 'click') }>Toggle</a>
      {this.hidden ? null : <Dummy $store={this.dummy} $animation={new flux.Animation({ in: flux.transition.expandIn, inDuration: 1000 }) }>
        <div style={{ width: '200px', border: '1px solid black' }} >
          <h2>Title</h2>
          <p>Content</p>
        </div>
      </Dummy>}
    </div>;
  }
  doDispatchAction(id: TActions, par: flux.IActionPar, completed: flux.TExceptionCallback) {
    switch (id) {
      case TActions.click:
        if (this.hidden) {
          this.dummy = new DummyStore(this);
          this.dummy.$onDidMount.subscribe(null, null, () => completed(null));
          this.modify(st => st.hidden = false);
        } else {
          this.dummy.$props.$animation.out(() => {
            this.modify(st => st.hidden = true);
            delete this.dummy;
            completed(null);
          });
        }
        break;
      default: super.doDispatchAction(id, par, completed); break;
    }
  }
  dummy: DummyStore;
}

