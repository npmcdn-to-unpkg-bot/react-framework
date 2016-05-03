import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as flux from '../../react-framework/exports';

var moduleId = 'RFTest4';

//****************** Main Entry Point
export function init() {
  flux.StoreApp.bootApp(AppStore);
}

//****************** App Store
@flux.StoreDef({ moduleId: moduleId })
export class AppStore extends flux.StoreApp {
  getStartRoute(): flux.TRouteActionPar { return flux.createRoute(AppRootStore); }
}

//****************** AppRoot component
export class AppRoot extends flux.Component<AppRootStore, {}> { }

@flux.StoreDef({ moduleId: moduleId, componentClass: AppRoot })
export class AppRootStore extends flux.Store {
  constructor($parent: flux.Store, id?: string) {
    super($parent, id);
    this.comp2 = new CompStore(this, 'comp2');
    this.comp3 = new CompStore(this, 'comp3');
  }
  render(): JSX.Element {
    return <div>
      <Comp $title='Comp 1 title' id='comp1'/>
      <Comp $store={this.comp2} />
      <Comp $title='Comp 3 title override' $store={this.comp3} />
      <Comp $title='Comp 4 title' id='comp4'/>
    </div>
  }
  comp2: CompStore;
  comp3: CompStore;
}

//****************** Comp component
export interface ICompPar { $title?: string; }

export class Comp extends flux.Component<CompStore, ICompPar> { }

@flux.StoreDef({ moduleId: moduleId, componentClass: Comp })
export class CompStore extends flux.Store {
  $props: flux.TProps<this, ICompPar>;
  render(): JSX.Element {
    return <h1>Title: {this.$props.$title}</h1>;
  }
}