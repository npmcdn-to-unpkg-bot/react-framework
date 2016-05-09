import * as rx from 'rxjs/Rx';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as flux from './exports';
import * as right from './test-right-panel';

var moduleId = 'testing-left-panel';
export function init() { flux.StoreApp.bootApp(AppStore); }

@flux.StoreDef({ moduleId: moduleId })
export class AppStore extends flux.StoreApp {
  getStartRoute(): flux.TRouteActionPar { return flux.createRoute(AppRootStore); }
}

//****************** AppRoot component
export class AppRoot extends flux.Component<AppRootStore, {}> { }

@flux.StoreDef({ moduleId: moduleId, componentClass: AppRoot })
export class AppRootStore extends flux.Store<{}> {
  constructor($parent: flux.TStore, instanceId?: string) {
    super($parent, instanceId);
    this.items = Object.keys(flux.Tests.tests).map(k => { return { key: k, value: flux.Tests.tests[k] }; }).map((kv, idx) => new TestItemStore(this, idx.toString(), kv.key, kv.value));
  }
  showDump: boolean;
  exportImport(ev: React.MouseEvent, isExport: boolean) { ev.preventDefault(); rightClient().service(isExport ? right.AppRootMode.export : right.AppRootMode.import); }
  export(ev: React.MouseEvent) { this.exportImport(ev, true); }
  import(ev: React.MouseEvent) { this.exportImport(ev, false); }
  playAll(ev: React.MouseEvent) {
    ev.preventDefault();
    this.modify(st => st.items.forEach(it => it.selected = false));
    var all = this.items.filter(it => it.hasRecording());
    let obss = rx.Observable.from(all.map(inp => rx.Observable.create((obs: rx.Subscriber<any>) => {
      inp.doPlay(() => { obs.next(); setTimeout(() => obs.complete(), 500); });
      return () => { };
    }))).concatAll() as rx.Observable<any>;
    obss.subscribe(null, null, null);
  }
  dump(ev: React.MouseEvent) { ev.preventDefault(); this.modify(st => st.showDump = true); }
  items: Array<TestItemStore>;
  render(): JSX.Element {
    var shoDumpEl = null;
    if (this.showDump) {
      this.showDump = false; shoDumpEl = [<br/>, <textarea rows={2} style={{ width: '100%' }} value={rightClient().getActStatus() }/>];
    }
    return <div>
      <a href='#' onClick={this.export.bind(this) }>Export All</a> |
      <a href='#' onClick={this.import.bind(this) }>Import All</a> |
      <a href='#' onClick={this.dump.bind(this) }>Dump</a> |
      <a href='#' onClick={this.playAll.bind(this) }>Play All</a>
      {shoDumpEl}
      <hr/>
      {this.items.map(item => <TestItem $store={item} key={item.id}/>) }
    </div>;
  }
}

//****************** TestItem component
export enum TItemState { no, playing, recording }

export class TestItem extends flux.Component<TestItemStore, {}> { }

@flux.StoreDef({ moduleId: moduleId })
export class TestItemStore extends flux.Store<{}> {
  constructor($parent: AppRootStore, instanceId: string, public key: string, public cfg: flux.ITest) {
    super($parent, instanceId);
  }
  $parent: AppRootStore;
  selected: boolean;
  state: TItemState = TItemState.no;
  playProgress: string;
  toogleSelected(ev: React.MouseEvent) {
    ev.preventDefault();
    rightClient().init(null);
    var unselect = (st: TestItemStore) => { st.selected = false; st.state = TItemState.no; }
    if (this.selected) { this.modify(st => unselect(st)); return; }
    this.$parent.modify(p => {
      p.items.forEach(it => unselect(it));
      this.selected = true;
    });
    this.run();
  }

  noStatus(ev?: React.MouseEvent) { if (ev) ev.preventDefault(); rightClient().init(null); this.modify(st => st.state = TItemState.no); }
  hasRecording(): boolean { return rightClient().hasRecording(this.key); }

  run(ev?: React.MouseEvent) { if (ev) ev.preventDefault(); rightClient().init(this.key); }
  startPlaying(ev: React.MouseEvent) {
    ev.preventDefault();
    this.doPlay();
  }
  doPlay(completed?: () => void) {
    this.modify(st => { st.selected = true; st.state = TItemState.playing; st.playProgress = '-'; });
    rightClient().startPlaying(this.key,
      (pos, len) => this.modify(st => st.playProgress = `${pos} / ${len}`),
      res => {
        this.modify(st => st.playProgress += ' - ' + (res ? `*** ERROR: ${res.message}` : 'DONE'));
        //if (completed) setTimeout(() => completed(), 800);
        if (completed) completed();
      }
    );
  }
  startRecording(ev: React.MouseEvent) {
    ev.preventDefault();
    this.modify(st => st.state = TItemState.recording);
    rightClient().startRecording();
  }
  saveRecording(ev: React.MouseEvent) { ev.preventDefault(); rightClient().saveRecording(this.key); this.noStatus(); }
  dumpRecording(ev: React.MouseEvent) { ev.preventDefault(); rightClient().service(right.AppRootMode.dump, this.key); }

  render(): JSX.Element {
    var detail: React.ReactNode = null;
    var st = this;
    if (st.selected) {
      switch (st.state) {
        case TItemState.no:
          detail = <span>
            <a href='#' onClick={st.run.bind(st) }>Run</a>
            <span style={{ display: st.hasRecording() ? 'inline' : 'none' }}>| <a href='#' onClick={st.startPlaying.bind(st) }>Play</a> | <a href='#' onClick={st.dumpRecording.bind(st) }>Dump-Recording</a></span> |
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
function rightClient(): right.RightClient {
  if (_rightClient) return _rightClient;
  throw new flux.Exception('');
}
var _rightClient: right.RightClient;

var sys = window.parent['right'].System;
sys.import(sys['baseURL'] + sys.paths['test-right-panel']).then(m => {
  _rightClient = m.rightClient as right.RightClient;
  //_rightClient.test();
}, function (m) { debugger; });


