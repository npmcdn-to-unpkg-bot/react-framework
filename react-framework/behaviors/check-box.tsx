import * as rx from 'rxjs/Rx';
import * as React from 'react';
import * as ReactDOM from 'react-dom';

import * as flux from '../flux';
import * as forms from './forms';

const moduleId = 'forms';

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
export class RadioLowStore extends flux.Store {
  //props
  $group: RadiosStore;
  $checked:boolean;
  $title:string;
  //inherited
  $parent:RadiosStore;
  //state
  checked:boolean;

  componentCreated(comp: RadioLow<any>) {
    super.componentCreated(comp);
    this.checked = this.$checked;
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

export interface RadioProps extends flux.IPropsEx {
  $group: RadiosStore;
  $checked?:boolean;
  $title?:string;
}
export abstract class RadioLow<T> extends flux.Component<RadioLowStore, RadioProps & T> { 
  constructor(props: flux.IProps<RadioLowStore> & RadioProps & T, ctx: flux.IComponentContext) {
    if (!props.$group) throw new flux.Exception('!this.props.$group');
    ctx.$parent = props.$group;
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
}

//class CheckBox extends React.Component<any, any> {
//  constructor(props) {
//    super(props);
//  }
//  render(): JSX.Element {
//    if (this.inp) this.inp['indeterminate'] = this.state === undefined;
//    return <div className={classNames('ui checkbox', { 'indeterminate': this.state === undefined, 'checked': this.state === true }) } onClick={this.handleChange.bind(this) }>
//      <input ref={inp => this.inp = inp} type="checkbox" checked={this.state} className='hidden' name='name'/>
//      <label>r1</label>
//    </div>;
//  }
//  setValue(val?:boolean) {
//    if (val==undefined) delete this.state; else this.state = val;
//    this.forceUpdate();
//  }
//  private handleChange(ev: React.FormEvent) {
//    this.setValue(!this.state);
//    //var ch = this.inp['checked'];
//    //this.state.value = !this.state.value; this.forceUpdate();
//    //setTimeout(() => this.setState({ value: !this.state.value }), 1);
//    event.preventDefault();
//  }
//  componentDidMount() {
//    this.inp['indeterminate'] = this.state === undefined;
//  }
//  private inp:HTMLInputElement;
//  state:boolean;
//}
