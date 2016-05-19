import * as rx from 'rxjs/Rx';
import * as React from 'react';
import * as ReactDOM from 'react-dom';

import * as flux from '../flux';
import * as forms from './forms';

const moduleId = 'behaviors';

//****** CheckBoxLow
export interface CheckBoxLowProps extends forms.FieldLowProps<boolean> { }
export abstract class CheckBoxLowStore extends forms.FieldLowStore<boolean> {
  componentCreated() {
    super.componentCreated();
    this.$actionInHandleChange = true;
  }

  modifyInputTagProps(props: React.HTMLAttributes) {
    super.modifyInputTagProps(props);
    props.type = 'checkbox';
    props.checked = this.value;
    props.onClick = ev => this.handleChange(!this.value);
  }
}
export abstract class CheckBoxLow<T extends CheckBoxLowStore, P> extends forms.FieldLow<boolean, T, CheckBoxLowProps & P> { }

//****** RadioButtons
enum TAction { radioClick }

export interface RadioProps {
  $radios: TGetRadios;
  $defaultValue?: boolean;
  $title?: string;
}
type TGetRadios = (st?: RadiosStore) => RadiosStore;

export class RadioLowStore extends flux.Store<RadioProps> {
  $parent: RadiosStore;
  value: boolean;

  componentCreated() {
    super.componentCreated();
    this.value = this.getProps().$defaultValue;
    if (this.isRadiosOwner()) forms.FormLowStore.register(this.getMyForm(), this.$parent, true);
  }
  componentWillUnmount(): void { if (this.isRadiosOwner()) forms.FormLowStore.register(this.getMyForm(), this.$parent, false); super.componentWillUnmount(); }

  modifyInputTagProps(props: React.HTMLAttributes) {
    props.type = 'radio';
    props.checked = this.value;
    props.onClick = ev => this.action(TAction.radioClick, 'radioClick');
    props.name = this.$parent.getIdInParent();
  }
  doDispatchAction(id: number, par): Promise<any> {
    switch (id) {
      case TAction.radioClick: this.$parent.onRadioClick(this); return Promise.resolve(null);
      default: return super.doDispatchAction(id, par);
    }
  }
  isRadiosOwner(): boolean { return this.id + '_owner' === this.$parent.id; }

  getMyForm(): forms.FormLowStore {
    var fld: flux.TStore = this.$parent;
    while (fld != null) { if (fld instanceof forms.FormLowStore) return fld as forms.FormLowStore; fld = fld.$parent; }
    return null;
  }
}

export abstract class RadioLow<T> extends flux.Component<RadioLowStore, RadioProps & T> {
  constructor(props: flux.IProps<RadioLowStore> & RadioProps & T, ctx: flux.IComponentContext) {
    //adjust (create or use) RadiosStore
    let rad = props.$radios();
    if (!rad) { //radios creator is its owner (see RadioLowStore.componentCreated and RadioLowStore.componentWillUnmount)
      rad = new RadiosStore(ctx.$parent, props.id + '_owner'); props.$radios(rad);
    }
    ctx.$parent = rad;
    super(props, ctx);
  }
  getChildContext(): forms.IFieldContext { return { MyInput: this.state, $parent: this.state }; }
}
RadioLow['childContextTypes'] = { MyInput: React.PropTypes.any, $parent: React.PropTypes.any };


@flux.StoreDef({ moduleId: moduleId })
export class RadiosStore extends forms.FieldLowStore<any> {

  onRadioClick(radio: RadioLowStore) {
    if (radio.value) return;
    radio.modify(st => st.value = true);
    for (var p in this.childStores) {
      var ch: RadioLowStore = this.childStores[p] as RadioLowStore; if (ch === radio || !ch.value) continue;
      ch.modify(st => st.value = false);
    }
  }
  reset() {
    for (var p in this.childStores) {
      var ch: RadioLowStore = this.childStores[p] as RadioLowStore;
      ch.modify(st => st.value = ch.getProps().$defaultValue);
    }
    super.reset();
  }
  selected(): RadioLowStore {
    for (var p in this.childStores) { var ch: RadioLowStore = this.childStores[p] as RadioLowStore; if (ch.value) return ch; }
    return null;
  }
}


