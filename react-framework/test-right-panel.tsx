import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as flux from './exports';

//******************* GUI for Dump
var moduleId = 'testingRightPanel';

export function init() { }

@flux.StoreDef({ moduleId: moduleId })
export class AppStore extends flux.StoreApp {
}

//****************** AppRoot component
export interface IStoreApp extends flux.IStore { mode: AppRootMode; dumpKey: string; }
export interface IPropsExApp extends flux.IPropsEx { mode?: AppRootMode; dumpKey?: string; }
export class AppRoot extends flux.Component<AppRootStore, IPropsExApp> { }

export enum AppRootMode { export, import, dump }
export interface IAppRootRouteActionPar { mode: AppRootMode; dumpKey: string; }

@flux.StoreDef({ moduleId: moduleId, componentClass: AppRoot })
export class AppRootStore extends flux.Store implements IStoreApp {
  dumpKey: string;
  mode: AppRootMode;
  initStore(par: flux.IActionPar, completed: flux.TCreateStoreCallback) {
    Object.assign(this, par as IAppRootRouteActionPar); completed(this);
  }
  import(ev: React.MouseEvent) {
    ev.preventDefault();
    try {
      var src = JSON.parse(this.input.value);
      flux.saveAllRecordings(src);
      this.input.value = '**** done *****';
    } catch (msg) {
      alert('Wrong JSON format');
    }
  }
  input;
  render(): JSX.Element {
    if (this.mode == AppRootMode.import) return <div>
      <br/>
      <div>Paste exported JSON here and click <a href='#' onClick={this.import.bind(this) }><b>Import</b></a></div>
      <br/>
      <textarea ref= {c => this.input = c} rows='40' style={{ width: '99%' }}></textarea>
    </div>;
    var txt = '';
    switch (this.mode) {
      case AppRootMode.export: txt = flux.getAllRecordings(); break;
      case AppRootMode.dump: txt = flux.getRecording(this.dumpKey); break;
      //case AppRootMode.dumpAct: txt = flux.appStateToJSON(flux.store, 2); break;
      default: return null;
    }
    return <pre><code>{txt}</code></pre>;
  }
}

//**************** inter panel communication
export class RightClient {
  test() { alert('RightClient.call'); }
  get store(): flux.StoreApp { return flux.store; }
  init(key: string, compl?: flux.TExceptionCallback) {
    if (!key) { flux.StoreApp.bootApp(null); if (compl) compl(null); return; }
    var test = flux.Tests.tests[key];
    var boot = () => flux.StoreApp.bootApp(test.storeAppClass, compl, test.startUrl ? test.startUrl : null /*default route*/);
    if (test.resetServer) test.resetServer(boot); else boot();
  }
  startRecording() { flux.store.$recorder.startRecording(); }
  saveRecording(key: string) { flux.store.$recorder.saveRecording(key); }
  hasRecording(key: string) { return flux.hasRecording(key); }
  startPlaying(key: string, progress: (pos: number, len: number) => void, completed: flux.TExceptionCallback) { flux.startPlaying(key, progress, completed); }
  service(mode: AppRootMode, dumpKey?: string) { flux.StoreApp.bootApp(AppStore, null, flux.createRoute<IAppRootRouteActionPar>(AppRootStore, { mode: mode, dumpKey: dumpKey })); }
  getActStatus(): string {
    if (!flux.store) return '';
    flux.store['actUrl'] = window.location.href;
    try {
      return flux.store ? flux.appStateToJSON(flux.store, 2) : '';
    } finally { delete flux.store['actUrl']; }
  } 
}
export var rightClient = new RightClient();
