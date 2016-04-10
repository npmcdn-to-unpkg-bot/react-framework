import * as rx from 'rxjs/Rx';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as flux from '../../react-framework/exports';
import {ENotImplemented, Exception} from '../../utils/low-utils';
import * as right from './right-panel';
import * as cfg from './config';

var moduleId = 'testingLeftPanel';
export function init() { flux.StoreApp.bootApp(AppStore); }

@flux.StoreDef({ moduleId: moduleId })
export class AppStore extends flux.StoreApp {
  getStartRoute(): flux.TRouteActionPar { return flux.createRoute(AppRootStore); }
}

//****************** AppRoot component
export class AppRoot extends flux.Component<AppRootStore> { }

@flux.StoreDef({ moduleId: moduleId, componentClass: AppRoot })
class AppRootStore extends flux.StoreDispatcher {
  constructor($parent: flux.Store, instanceId?: string) {
    super($parent, instanceId);
    this.items = Object.keys(cfg.tests).map(k => { return { key: k, value: cfg.tests[k] }; }).map((kv, idx) => new TestItemStore(this, idx.toString(), kv.key, kv.value));
  }
  exportImport(ev: React.MouseEvent, isExport: boolean) { ev.preventDefault(); rightClient.service(isExport ? right.AppRootMode.export : right.AppRootMode.import); }
  export(ev: React.MouseEvent) { this.exportImport(ev, true); }
  import(ev: React.MouseEvent) { this.exportImport(ev, false); }
  items: Array<TestItemStore>;
  render(): JSX.Element {
    return <div>
      <a href='#' onClick={this.export.bind(this) }>Export All</a> |
      <a href='#' onClick={this.import.bind(this) }>Import All</a>
      <hr/>
      {this.items.map(item => <TestItem state={item} key={item.instanceId}/>) }
    </div>;
  }
}

//****************** TestItem component
enum TItemState { no, playing, recording }

export class TestItem extends flux.Component<TestItemStore> { }

@flux.StoreDef({ moduleId: moduleId })
class TestItemStore extends flux.StoreDispatcher {
  constructor($parent: AppRootStore, instanceId: string, public key: string, public cfg: cfg.Test) {
    super($parent, instanceId);
  }
  $parent: AppRootStore;
  selected: boolean;
  state: TItemState = TItemState.no;
  playProgress: string;
  toogleSelected(ev: React.MouseEvent) {
    ev.preventDefault();
    rightClient.init(null);
    var unselect = (st: TestItemStore) => { st.selected = false; st.state = TItemState.no; }
    if (this.selected) { this.modify(st => unselect(st)); return; }
    this.$parent.modify(p => {
      p.items.forEach(it => unselect(it));
      this.selected = true;
    });
    this.run();
  }

  noStatus(ev?: React.MouseEvent) { if (ev) ev.preventDefault(); rightClient.init(null); this.modify(st => st.state = TItemState.no); }
  hasRecording(): boolean { return rightClient.hasRecording(this.key); }

  run(ev?: React.MouseEvent) { if (ev) ev.preventDefault(); rightClient.init(this.key); }
  startPlaying(ev: React.MouseEvent) {
    ev.preventDefault();
    this.modify(st => { st.state = TItemState.playing; st.playProgress = '-'; });
    rightClient.startPlaying(this.key,
      (pos, len) => this.modify(st => st.playProgress = `${pos} / ${len}`),
      err => this.modify(st => st.playProgress += ' - ' + (err ? `*** ERROR: ${err.message}` : 'DONE'))
    );
  }
  startRecording(ev: React.MouseEvent) {
    ev.preventDefault();
    this.modify(st => st.state = TItemState.recording);
    rightClient.startRecording();
  }
  saveRecording(ev: React.MouseEvent) { ev.preventDefault(); rightClient.saveRecording(this.key); this.noStatus(); }
  dumpRecording(ev: React.MouseEvent) { ev.preventDefault(); rightClient.service(right.AppRootMode.dump, this.key); }

  render(): JSX.Element {
    var detail: React.ReactNode = null;
    var st = this;
    if (st.selected) {
      switch (st.state) {
        case TItemState.no:
          detail = <span>
            <a href='#' onClick={st.run.bind(st) }>Run</a>
            <span style={{ display: st.hasRecording() ? 'inline' : 'none' }}>| <a href='#' onClick={st.startPlaying.bind(st) }>Play</a> | <a href='#' onClick={st.dumpRecording.bind(st) }>Dump</a></span> |
            <a href='#' onClick={st.startRecording.bind(st) }>Record</a>
          </span>;
          break;
        case TItemState.playing:
          detail = <span><a href='#' onClick={st.noStatus.bind(st) }>Stop Playing</a> ({st.playProgress}) </span>;
          break;
        case TItemState.recording:
          detail = <span><a href='#' onClick={st.saveRecording.bind(st) }>Save Recording</a> | <a href='#' onClick={st.noStatus.bind(st) }>Cancel Recording</a></span>;
          break;
      }
    }
    return <div>
      <div style={{ cursor: 'pointer', fontWeight: this.selected ? 'bold' : undefined }} onClick={this.toogleSelected.bind(this) }>> {this.cfg.descr }({this.key}) </div>
      <div style={{ marginLeft: '20px' }}>
        {detail}
      </div>
    </div>;
  }
}

////**************** inter panel communication
//export class LeftClient {
//  test() { alert('LeftClient.call'); }
//}
//export var leftClient = new LeftClient();

var rightClient: right.RightClient;
var sys = window.parent['right'].System;
sys.import(sys['baseURL'] + 'right-panel.js').then(m => {
  rightClient = m.rightClient as right.RightClient;
  //rightClient.test();
}, function (m) { debugger; });

