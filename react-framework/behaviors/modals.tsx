import * as rx from 'rxjs/Rx';
import * as React from 'react';
import * as ReactDOM from 'react-dom';

import * as flux from '../flux';

const moduleId = 'behaviors';

export enum ModalResult { none, ok, cancel, abort, ignore, no, retry, yes, dimmerEscape, dimmerClick } //https://msdn.microsoft.com/cs-cz/library/system.windows.forms.dialogresult(v=vs.110).aspx

export interface IModalOut { result: ModalResult; }

export interface DimmerProps {
  $hideOnEscape: boolean;
  $hideOnClick: boolean;
  $onConfirmHide: (result: ModalResult, confirm: (hide: boolean) => void) => void;
}
export class Dimmer<T extends DimmerStore<P, IModalOut>, P> extends flux.Component<T, DimmerProps & P> {
  render(): JSX.Element { return this.state.render(this); } //skip store.$props override
}
type TDimmer = Dimmer<DimmerStore<{}, IModalOut>, {}>

export abstract class DimmerStore<TInp extends flux.IActionPar, TOut extends IModalOut> extends flux.Store<DimmerProps & TInp> {

  $completed: (out: TOut) => void;

  private doKeyDown(ev: KeyboardEvent) {
    if (ev.keyCode != 27) return; this.hide(ModalResult.dimmerEscape);
  }
  private $doKeyDown;

  private click(ev: MouseEvent) {
    this.hide(ModalResult.dimmerClick);
  }
  private $click;

  private hide(result: ModalResult) {
    var doHide = () => {
      if (this.$completed) this.$completed({ result: result } as TOut);
      flux.store.routeHookModal.subNavigate(null, null, null);
    };
    if (this.$props.$onConfirmHide) {
      this.$props.$onConfirmHide(result, hide => { if (!hide) return; doHide(); });
    } else
      doHide();
  }
  show() {
  }
  componentCreated(comp: TDimmer) {
    super.componentCreated(comp);
    if (this.$props.$hideOnEscape) document.addEventListener('keydown', this.$doKeyDown = ev => this.doKeyDown(ev));
    if (this.$props.$hideOnClick) document.addEventListener('click', this.$click = ev => this.click(ev));
  }
  componentWillUnmount(comp: TDimmer) {
    super.componentWillUnmount(comp);
    if (this.$props.$hideOnEscape) document.removeEventListener('keydown', this.$doKeyDown);
    if (this.$props.$hideOnClick) document.removeEventListener('click', this.$click);
  }
}

export function dimmerShow<TInp extends flux.IActionPar, TOut extends IModalOut>(comp: flux.TComponentClass, par: TInp): Promise<TOut> {
  return new Promise<TOut>((ok, err) => {
    flux.store.routeHookModal.subNavigate(flux.Store.getClassMeta(comp as any).classId, par, res => {
      if (res) { err(res); return; }
      var dimm = flux.store.routeHookModal.hookedStore as DimmerStore<TInp, TOut>;
      dimm.$completed = ok.bind(dimm);
    });
  });
}
