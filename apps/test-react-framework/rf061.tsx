import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as flux from '../../react-framework/exports';

var moduleId = 'RF061';

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

export enum TActions { click, childClick }

//****************** AppRoot component
export class AppRoot extends flux.Component<AppRootStore, {}> { }

@flux.StoreDef({ moduleId: moduleId, componentClass: AppRoot })
export class AppRootStore extends flux.Store<{}> {
  title: string = 'title ';
  render(): JSX.Element {
    return <div>
      <h1 onClick={ev => this.clickAction(ev, TActions.click, 'click') }>Title: {this.title}</h1>
      <Child $title={this.title} id='child1'/><br/>
      Force component create: <Child $title={this.title} key={flux.getUnique() } id='child2'/>
    </div>;
  }
  doDispatchAction(id: number, par: flux.IActionPar, completed: flux.TExceptionCallback) {
    switch (id) {
      case TActions.click:
        this.modify(st => st.title += 'x');
        completed(null);
        break;
      default:
        super.doDispatchAction(id, par, completed);
        break;
    }
  }
}

//****************** Child component
export interface IPropsChild { $title?: string }

export class Child extends flux.Component<ChildStore, IPropsChild> { }

@flux.StoreDef({ moduleId: moduleId, componentClass: Child })
export class ChildStore extends flux.Store<IPropsChild> {
  subTitle: string = 'subTitle ';
  doDispatchAction(id: number, par: flux.IActionPar, completed: flux.TExceptionCallback) {
    switch (id) {
      case TActions.childClick:
        this.modify(st => st.subTitle += 'x');
        completed(null);
        break;
      default:
        super.doDispatchAction(id, par, completed)
    }
  }
  render(): JSX.Element {
    return <h3 onClick={ev => this.clickAction(ev, TActions.childClick, 'childClick') }>Title/subtitle: {this.$props.$title}/{this.subTitle}</h3>;
  }

}