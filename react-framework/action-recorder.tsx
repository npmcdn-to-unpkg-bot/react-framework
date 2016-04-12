import * as rx from 'rxjs/Rx';
import * as flux from './exports';

export class ActionRecorder {
  status: TPlayRecordStatus;
  playListCancel: rx.Subscription;
  data: IData = {};
  stopAll() {
    this.status = TPlayRecordStatus.no;
    if (this.playListCancel) {
      this.playListCancel.unsubscribe(); this.playListCancel = null;
    }
    delete this.data;
  }

  //***** recording
  startRecording() {
    var json = appStateToJSON(flux.store, 2);
    this.data = { playList: [], store: JSON.parse(json) };
    this.status = TPlayRecordStatus.recording;
  }
  onStoreAction(getAction: () => flux.TAction) {
    if (this.status != TPlayRecordStatus.recording) return;
    var act = getAction();
    this.data.playList.push(act);
  }
  saveRecording(saveId: string) {
    doSaveRecording(saveId, this.data);
    this.stopAll();
  }
}

export interface ITest {
  descr: string;
  storeAppClass: flux.TStoreAppClass;
  startUrl?: flux.TRouteActionPar;
  resetServer?: (compl: flux.TCallback) => void
}

export class Tests {
  static tests: { [id: string]: flux.ITest; };
}

export function hasRecording(saveId: string): boolean {
  return !!getRecording(saveId);
}
export function getRecording(saveId: string): string {
  return localStorage.getItem(storageKey(saveId));
}
export function getAllRecordings(): string {
  var res: { [key: string]: {}; } = {};
  for (var i = 0; i < localStorage.length; i++) {
    var key = localStorage.key(i); var saveId = objKey(key); if (!saveId) continue;
    res[saveId] = JSON.parse(getRecording(saveId));
  }
  return JSON.stringify(res, null, 2);
}
export function saveAllRecordings(obj: {}) {
  for (var p in obj) doSaveRecording(p, obj[p]);
}

//***** playing
export function startPlaying(saveId: string, progress: (pos: number, len: number) => void, completed: flux.TExceptionCallback) {
  var str = getRecording(saveId); if (!str) { completed(new flux.Exception(`Recording not found: ${saveId}`)); return; }
  var data: IData = JSON.parse(str);
  var playList = data.playList;
  if (!playList || playList.length <= 0) { completed(new flux.Exception(`Empty Recording playlist: ${saveId}`)); return; }
  var len = playList.length; var pos = 1;
  flux.StoreApp.bootApp(data.store, err => {
    if (err) { completed(err); return; }
    flux.store.$recorder.playListCancel = flux.playActions(playList).subscribe(() => progress(pos++, len), err => completed(err), () => completed(null));
  });
}

export function appStateToJSON(st: flux.StoreApp, indent?: number): string {
  st.saveRoute = st.actRoutes();
  return JSON.stringify(st, (key, val) => {
    if (key && key.startsWith('$')) return undefined;
    return val;
  }, indent)
}

export function literalToAppState(literal: flux.ITypedObj): flux.StoreApp {
  return literalsToStores(null, literal) as flux.StoreApp;
}

//------------------ PRIVATE 
const prefix = 'action-recorder.';
function storageKey(objKey: string): string { return `${prefix}${objKey}` }
function objKey(storageKey: string): string { if (!storageKey || !storageKey.startsWith(prefix)) return null; return storageKey.substr(prefix.length); }

const enum TPlayRecordStatus { no, playing, recording }

function doSaveRecording(saveId: string, obj: {}) {
  var res = JSON.stringify(obj, null, 2);
  localStorage.setItem(storageKey(saveId), res);
}

interface IData {
  store?: flux.ITypedObj;
  playList?: Array<flux.TAction>;
}

function literalsToStores(parentStore: flux.Store, literal: flux.ITypedObj): flux.Store {
  if (!literal || !literal._type) throw new flux.Exception(JSON.stringify(literal));
  var st = flux.Store.createInJSON(parentStore, literal._type);
  Object.assign(st, literal);
  traverseToRepl(st, st);
  return st;
}

function traverseToRepl(parentStore: flux.Store, obj: Object) {
  for (var p in obj) {
    if (p.startsWith('$')) continue;
    let res = obj[p]; if (!res) continue;
    if (Array.isArray(res)) {
      var arr = res as Array<any>;
      for (var i = 0; i < arr.length; i++) {
        let subRes = arr[i]; if (!subRes) continue;
        if (subRes._type) arr[i] = literalsToStores(parentStore, subRes); else traverseToRepl(parentStore, subRes);
      }
    } else if (typeof res === 'object') {
      if (res._type) obj[p] = literalsToStores(parentStore, res); else traverseToRepl(parentStore, res);
    }
  }
}