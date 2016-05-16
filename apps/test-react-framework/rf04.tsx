import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as flux from '../../react-framework/exports';

var moduleId = 'RF04';

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
export class AppRootStore extends flux.Store<{}> {

  render(): JSX.Element {
    return <div>
      <Comp $title='Comp 1 title' $store2={st => this.comp1 = st ? st : this.comp1} id='comp1'/>
      <Comp $title='Comp 2 title' id='comp2'/>
    </div>
  }
  comp1: CompStore;
}

//****************** Comp component
export interface ICompPar { $title?: string; }

export class Comp extends flux.Component<CompStore, ICompPar> { }

@flux.StoreDef({ moduleId: moduleId, componentClass: Comp })
export class CompStore extends flux.Store<ICompPar> {
  render(): JSX.Element {
    return <h1>Title: {this.$props.$title}</h1>;
  }
  asyncConstructor() { return this.id == 'comp1' ? null : new Promise<{}>(res => setTimeout(() => res(null), 1000)); }
  //asyncConstructor() { return new Promise<{}>(res => setTimeout(() => res(null), this.id == 'comp1' ? 1000 : 2000)); }
}