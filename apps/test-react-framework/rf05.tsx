import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as flux from '../../react-framework/exports';

var moduleId = 'RF05';

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
      <Comp $title='Sync' id='sync'/>
      <Comp $title='Aync' $async={true} id='async'/>
    </div>
  }
}

//****************** Comp component
export interface ICompPar { $title?: string; $async?: boolean; }

export class Comp extends flux.Component<CompStore, ICompPar> { }
export enum CompAction { click }

@flux.StoreDef({ moduleId: moduleId, componentClass: Comp })
export class CompStore extends flux.Store<ICompPar> {
  subTitle: string = '';
  render(): JSX.Element { return <h1 onClick={ev => this.clickAction(ev, CompAction.click, 'click') }>Title/subTitle: {this.getProps().$title}/{this.subTitle}</h1>; }
  doDispatchAction(id: number, par: flux.IActionPar): Promise<any> {
    switch (id) {
      case CompAction.click:
        if (this.getProps().$async) { //Async action
          return new Promise(res => setTimeout(() => {
              this.modify(st => st.subTitle += 'x');
              res(null);
            }, 500));
        } else { //Sync action
          this.modify(st => st.subTitle += 'x');
          return Promise.resolve();
        }
      default: return super.doDispatchAction(id, par);
    }
  }
}