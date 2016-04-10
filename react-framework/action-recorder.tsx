import * as rx from 'rxjs/Rx';
//import * as React from 'react';
//import * as ReactDOM from 'react-dom';
import {Exception, ENotImplemented, TCallback} from '../utils/low-utils';
import {store, ITypedObj, createStore, StoreApp, Store, TAction, TExceptionCallback, playActions} from './flux';

export const enum TPlayRecordStatus { no, playing, recording }

interface IData {
  store?: ITypedObj;
  playList?: Array<TAction>;
}
const prefix = 'action-recorder.';
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
  
  static key(saveId: string): string { return `${prefix}${saveId}` }
  static saveId(key: string): string { if (!key || !key.startsWith(prefix)) return null; return key.substr(prefix.length); }

  //***** recording
  startRecording() {
    var json = saveAppStateToJSON(store, 2);
    this.data = { playList: [], store: JSON.parse(json) };
    this.status = TPlayRecordStatus.recording;
  }
  onStoreAction(getAction: () => TAction) {
    if (this.status != TPlayRecordStatus.recording) return;
    var act = getAction();
    this.data.playList.push(act);
  }
  saveRecording(saveId: string) {
    ActionRecorder.doSaveRecording(saveId, this.data);
    this.stopAll();
  }
  private static doSaveRecording(saveId: string, obj: {}) {
    var res = JSON.stringify(obj, null, 2);
    localStorage.setItem(ActionRecorder.key(saveId), res);
  }
  static hasRecording(saveId: string): boolean {
    return !!ActionRecorder.getRecording(saveId);
  }
  static getRecording(saveId: string): string {
    return localStorage.getItem(ActionRecorder.key(saveId));
  }
  static getAllRecordings(): string {
    var res: { [key: string]: {}; } = {};
    for (var i = 0; i < localStorage.length; i++) {
      var key = localStorage.key(i); var saveId = ActionRecorder.saveId(key); if (!saveId) continue;
      res[saveId] = JSON.parse(ActionRecorder.getRecording(saveId));
    }
    return JSON.stringify(res, null, 2);
  }
  static saveAllRecordings(obj: {}) {
    for (var p in obj) ActionRecorder.doSaveRecording(p, obj[p]);
  }

  //***** playing
  static startPlaying(saveId: string, progress: (pos: number, len: number) => void, completed: TExceptionCallback) {
    var str = ActionRecorder.getRecording(saveId); if (!str) { completed(new Exception(`Recording not found: ${saveId}`)); return; }
    var data = JSON.parse(str);
    var playList = data.playList;
    if (!playList || playList.length <= 0) { completed(new Exception(`Empty Recording playlist: ${saveId}`)); return; }
    var len = playList.length; var pos = 1; 
    StoreApp.bootApp(data.store, err => {
      if (err) { completed(err); return; }
      store.$recorder.playListCancel = playActions(playList).subscribe(() => progress(pos++, len), err => completed(err), () => completed(null));
    });
    //this.data.playList.map(act => new Promise((ok, err) => {
    //  var actStore = store.findStore(act.dispPath); if (!actStore) { err(`Cannot find store ${act.dispPath}`); return; }
    //}));
  }
}

export function saveAppStateToJSON(store: StoreApp, indent?: number): string {
  store.saveRoute = store.actRoutes();
  return JSON.stringify(store, (key, val) => {
    if (key && key.startsWith('$')) return undefined;
    return val;
  }, indent)
}

export function replaceByStore(parentStore: Store, toRepl: ITypedObj): Store {
  if (!toRepl || !toRepl._type) throw new Exception(JSON.stringify(toRepl));
  var st = createStore(parentStore, toRepl._type, true);
  Object.assign(st, toRepl);
  traverseToRepl(st, st);
  return st;
}

function traverseToRepl(parentStore: Store, obj: Object) {
  for (var p in obj) {
    if (p.startsWith('$')) continue;
    let res = obj[p];
    if (res && res._type) {
      obj[p] = replaceByStore(parentStore, res); continue;
    }
    if (Array.isArray(res)) {
      var arr = res as Array<any>;
      for (var i = 0; i < arr.length; i++) {
        let subRes = arr[i];
        if (subRes && subRes._type) { arr[i] = replaceByStore(parentStore, subRes); continue; }
        traverseToRepl(parentStore, subRes);
      }
      continue;
    }
  }
}