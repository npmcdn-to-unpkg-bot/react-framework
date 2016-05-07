import * as rx from 'rxjs/Rx';
import * as React from 'react';
import * as ReactDOM from 'react-dom';

import * as flux from '../flux';

const moduleId = 'behaviors';

export enum ModalResult { none, ok, cancel, abort, ignore, no, retry, yes, dimmerEscape, dimmerClick } //https://msdn.microsoft.com/cs-cz/library/system.windows.forms.dialogresult(v=vs.110).aspx

export interface IModalOut extends flux.IActionPar { cancel?: boolean; result?: ModalResult; }
export interface IModalIn extends flux.IActionPar { hideOnEscape?: boolean; hideOnClick?: boolean; }

export enum TModalAction { close }

export class Dimmer<T extends DimmerStore<P, IModalOut>, P> extends flux.Component<T, P> {
  render(): JSX.Element { return this.state.render(this); } //skip store.$props override
}
type TDimmer = Dimmer<DimmerStore<{}, IModalOut>, {}>;
type TDimmerStore = DimmerStore<IModalIn, IModalOut>;

export abstract class DimmerStore<TInp extends IModalIn, TOut extends IModalOut> extends flux.Store<TInp> {

  $completed: (out: TOut) => void; //notifikace o ukonceni modal promise
  private inputPars: TInp;
  private $doKeyDown;
  private $click;

  cancel(ev: flux.EventGeneric, res?: ModalResult) {
    flux.stopPropagation(ev);
    this.closeAction({ cancel: true, result: res ? res : ModalResult.cancel } as IModalOut as TOut);
  }
  ok(ev: flux.EventGeneric, out: TOut) {
    flux.stopPropagation(ev);
    if (!out) out = {} as TOut; out.cancel = false;
    this.closeAction(out);
  }

  doDispatchAction(id: TModalAction, out: TOut, completed: flux.TExceptionCallback) {
    switch (id) {
      case TModalAction.close:
        flux.store.routeHookModal.subNavigate(null, null, null); //odstran z DOM
        if (this.$completed) this.$completed(out);
        completed(null);
        break;
      default: super.doDispatchAction(id, out, completed); break;
    }
  }

  initFromRoutePar(par: TInp, completed: flux.TCreateStoreCallback) {
    if (par.hideOnClick === undefined) par.hideOnClick = true; if (par.hideOnEscape === undefined) par.hideOnEscape = true;
    this.inputPars = par;
    super.initFromRoutePar(par, completed);
  }

  componentCreated(comp: TDimmer) {
    super.componentCreated(comp);
    if (this.inputPars.hideOnEscape) document.addEventListener('keydown', this.$doKeyDown = this.doKeyDown.bind(this));
    if (this.inputPars.hideOnClick) document.addEventListener('click', this.$click = this.click.bind(this));
  }
  componentWillUnmount(comp: TDimmer) {
    super.componentWillUnmount(comp);
    if (this.inputPars.hideOnEscape) document.removeEventListener('keydown', this.$doKeyDown);
    if (this.inputPars.hideOnClick) document.removeEventListener('click', this.$click);
  }
  private closeAction(par: IModalOut) {
    this.action(TModalAction.close, 'close', par);
  }
  private doKeyDown(ev: KeyboardEvent) { if (ev.keyCode != 27) return; this.cancel(ev, ModalResult.dimmerEscape); }
  private click(ev: MouseEvent) { this.cancel(ev, ModalResult.dimmerClick); }
}

export function dimmerShow<TInp extends IModalIn, TOut extends IModalOut>(comp: flux.TStoreClass<TInp>, par: TInp, showCompleted: flux.TExceptionCallback): Promise<TOut> {
  return new Promise<TOut>((ok, err) => {
    flux.store.routeHookModal.subNavigate(flux.Store.getClassMeta(comp as any).classId, par, res => {
      if (res) { err(res); return; }
      var dimm = flux.store.routeHookModal.hookedStore as TDimmerStore;
      dimm.$completed = ok.bind(dimm);
      if (showCompleted) showCompleted(null);
    });
  });
}
