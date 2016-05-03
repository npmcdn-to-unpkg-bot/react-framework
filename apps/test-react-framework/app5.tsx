import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as flux from '../../react-framework/exports';

var moduleId = 'RFTest5';

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
  comp2: CompStore;
  comp3: CompStore;
}

//****************** Comp component
export interface ICompPar { $title?: string; $async?: boolean; }

export class Comp extends flux.Component<CompStore, ICompPar> { }
export enum CompAction { click }

@flux.StoreDef({ moduleId: moduleId, componentClass: Comp })
export class CompStore extends flux.Store<ICompPar> {
  subTitle: string = '';
  render(): JSX.Element { return <h1 onClick={ev => this.clickAction(ev, CompAction.click, 'click') }>Title/subTitle: {this.$props.$title}/{this.subTitle}</h1>; }
  doDispatchAction(id: number, par: flux.IActionPar, completed: flux.TExceptionCallback) {
    switch (id) {
      case CompAction.click:
        if (this.$props.$async) { //Async action
          setTimeout(() => {
            this.modify(st => st.subTitle += 'x');
            completed(null);
          }, 500)
        } else { //Sync action
          this.modify(st => st.subTitle += 'x');
          completed(null);
        }
        break;
      default:
        super.doDispatchAction(id, par, completed);
        break;
    }
  }
}