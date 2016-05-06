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

export interface DimmerProps {
  $hideOnEscape: boolean;
  $hideOnClick: boolean;
  $onConfirmHide: (onEscape: boolean, confirm: (hide: boolean) => void) => void;
}
export class Dimmer<T extends DimmerStore<P>, P> extends flux.Component<T, DimmerProps & P> {
  componentDidMount() {
    this.state.componentDidMount(this);
  }
}
type TDimmer = Dimmer<DimmerStore<{}>, {}>
export abstract class DimmerStore<P> extends flux.Store<DimmerProps & P> {
  private doKeyDown(ev: KeyboardEvent) {
    if (ev.keyCode != 27) return;
    this.hide(true);
    
  }
  private doClick(ev: MouseEvent) {
    this.hide(false);
  }
  private hide(onEscape: boolean) {
    var doHide = () => {
      //flux.store.routeHookModal.
    };
    if (this.$props.$onConfirmHide) {
      this.$props.$onConfirmHide(onEscape, hide => { if (!hide) return; doHide(); });
    } else
      doHide();
  }
  show() {
  }
  componentDidMount(comp: TDimmer) {
    if (this.$props.$hideOnEscape) document.addEventListener('keydown', this.doKeyDown);
    if (this.$props.$hideOnClick) document.addEventListener('click', this.doClick);
  }
  componentWillUnmount(comp: TDimmer) {
    super.componentWillUnmount(comp);
    if (this.$props.$hideOnEscape) document.removeEventListener('keydown', this.doKeyDown)
    if (this.$props.$hideOnClick) document.removeEventListener('click', this.doClick);
  }
}
