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
    let json = appStateToJSON(flux.store, 2);
    this.data = { playList: [], store: JSON.parse(json) };
    this.status = TPlayRecordStatus.recording;
  }
  onStoreAction(getAction: () => flux.TAction) {
    if (this.status != TPlayRecordStatus.recording) return;
    let act = getAction();
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
  let res: { [key: string]: {}; } = {};
  for (let i = 0; i < localStorage.length; i++) {
    let key = localStorage.key(i); let saveId = objKey(key); if (!saveId) continue;
    res[saveId] = JSON.parse(getRecording(saveId));
  }
  return JSON.stringify(res, null, 2);
}
export function deleteAllRecordings() {
  var toRemove:Array<string> = [];
  for (let i = 0; i < localStorage.length; i++) {
    let key = localStorage.key(i); let saveId = objKey(key); if (!saveId) continue;
    toRemove.push(key);
  }
  toRemove.forEach(k => localStorage.removeItem(k));
}
export function saveAllRecordings(obj: {}) {
  deleteAllRecordings();
  for (let p in obj) doSaveRecording(p, obj[p]);
}

//var playing = false;

//***** playing
export function startPlaying(saveId: string, progress: (pos: number, len: number) => void, completed: flux.TExceptionCallback) {
  let str = getRecording(saveId); if (!str) { completed(new flux.Exception(`Recording not found: ${saveId}`)); return; }
  let data: IData = JSON.parse(str);
  let playList = data.playList;
  if (!playList) { completed(new flux.Exception(`Empty Recording playlist: ${saveId}`)); return; }
  let len = playList.length; let pos = 1;
  //playing = true; var compl = err => { playing = false; completed(err); }
  flux.StoreApp.bootApp(data.store).then(() => {
    //if (res) { completed(res); return; }
    flux.store.$recorder.playListCancel = flux.playActions(playList).subscribe(() => progress(pos++, len), err => completed(err), () => completed(null));
    //flux.store.$recorder.playListCancel = flux.playActions(playList, it => { if (!it) return; progress(pos++, len) }).then(() => completed(null)).catch(err => completed(err));
  }).catch(res => completed(res));
}

export function appStateToJSON(st: flux.StoreApp, indent?: number): string {
  //st.saveRoute = st.actRoutes();
  return JSON.stringify(st, (key, val) => {
    //console.log('>>>* ' + key);
    //if (key == 'state') { debugger; }
    if (key && key.startsWith('$')) return undefined;
    return val;
  }, indent)
}

export function literalToAppState(literal: flux.IStoreLiteral): flux.StoreApp {
  return literalsToStores(null, literal) as flux.StoreApp;
}

//------------------ PRIVATE 
const prefix = 'action-recorder.';
function storageKey(objKey: string): string { return `${prefix}${objKey}` }
function objKey(storageKey: string): string { if (!storageKey || !storageKey.startsWith(prefix)) return null; return storageKey.substr(prefix.length); }

export const enum TPlayRecordStatus { no, playing, recording }

function doSaveRecording(saveId: string, obj: {}) {
  let res = JSON.stringify(obj, null, 2);
  localStorage.setItem(storageKey(saveId), res);
}

export interface IData {
  store?: flux.IStoreLiteral;
  playList?: Array<flux.TAction>;
}

function literalsToStores(parentStore: flux.TStore, literal: flux.IStoreLiteral): flux.TStore {
  if (!literal || !literal._type) throw new flux.Exception(JSON.stringify(literal));
  let st = flux.Store.createInJSON(parentStore, literal._type, literal.id);
  Object.assign(st, literal);
  traverseToRepl(st, st);
  return st;
}

function traverseToRepl(parentStore: flux.TStore, obj: Object) {
  for (let p in obj) {
    if (p.startsWith('$')) continue;
    let res = obj[p]; if (!res) continue;
    if (Array.isArray(res)) {
      let arr = res as Array<any>;
      for (let i = 0; i < arr.length; i++) {
        let subRes = arr[i]; if (!subRes) continue;
        if (subRes._type) arr[i] = literalsToStores(parentStore, subRes); else traverseToRepl(parentStore, subRes);
      }
    } else if (typeof res === 'object') {
      if (res._type) obj[p] = literalsToStores(parentStore, res); else traverseToRepl(parentStore, res);
    }
  }
}