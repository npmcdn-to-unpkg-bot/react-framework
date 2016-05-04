import * as rx from 'rxjs/Rx';
import * as React from 'react';
import * as ReactDOM from 'react-dom';

import * as flux from '../flux';

const moduleId = 'behaviors';

export enum ModalResult { none, ok, cancel, abort, ignore, no, retry, yes } //https://msdn.microsoft.com/cs-cz/library/system.windows.forms.dialogresult(v=vs.110).aspx

export interface IModalOut { result: ModalResult; }

export abstract class modalStore<TInp, TOut extends IModalOut> extends flux.Store<{}> {
  abstract show(inp: TInp): Promise<TOut>;
}
