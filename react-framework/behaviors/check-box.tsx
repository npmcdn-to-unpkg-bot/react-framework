import * as rx from 'rxjs/Rx';
import * as React from 'react';
import * as ReactDOM from 'react-dom';

import * as flux from '../flux';
import * as forms from './forms';

const moduleId = 'behaviors';

//****** CheckBoxLow
export interface CheckBoxLowProps extends forms.FieldLowProps<boolean> { }
export abstract class CheckBoxLowStore extends forms.FieldLowStore<boolean> {
  modifyInputTagProps(props: React.HTMLAttributes) {
    super.modifyInputTagProps(props);
    props.checked = this.value;
    props.type = 'checkbox';
  }
}
export abstract class CheckBoxLow<T extends CheckBoxLowStore, P> extends forms.FieldLow<boolean, T, CheckBoxLowProps & P> { }

//****** RadioButtons
export interface RadioProps {
  $parent: RadiosStore;
  $checked?: boolean;
  $title?: string;
}

export class RadioLowStore extends flux.Store<RadioProps> {
  //props
  //$checked:boolean;
  //$title:string;
  //inherited
  $parent:RadiosStore;
  //state
  checked:boolean;

  componentCreated(comp: RadioLow<any>) {
    super.componentCreated(comp);
    this.checked = this.$props.$checked;
  }

  onClick(ev: React.FormEvent) {
    ev.preventDefault();
    this.$parent.onRadioClick(this);
  }
  modifyInputTagProps(props: React.HTMLAttributes) {
    props.checked = this.checked;
    props.type = 'radio';
    props.name = this.$parent.getIdInParent();
  }
}

export abstract class RadioLow<T> extends flux.Component<RadioLowStore, RadioProps & T> { 
  constructor(props: flux.IProps<RadioLowStore> & RadioProps & T, ctx: flux.IComponentContext) {
    ctx.$parent = props.$parent;
    super(props, ctx);
  }
  getChildContext(): forms.IFieldContext { return { MyInput: this.state, $parent: this.state }; }
}
RadioLow['childContextTypes'] = { MyInput: React.PropTypes.any, $parent: React.PropTypes.any };


export class RadiosStore extends forms.FieldLowStore<any> {
  onRadioClick(radio: RadioLowStore) {
    if (radio.checked) return;
    radio.modify(st => st.checked = !st.checked);
    for (var p in this.childStores) {
      var ch:RadioLowStore  = this.childStores[p] as RadioLowStore; if (ch===radio || !ch.checked) continue;
      ch.modify(st => st.checked = !st.checked);
    }
  }
  selected():RadioLowStore {
    for(var p in this.childStores) { var ch:RadioLowStore  = this.childStores[p] as RadioLowStore; if (ch.checked) return ch; }
    return null;
  }
}


