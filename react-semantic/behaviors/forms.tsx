import * as rx from 'rxjs/Rx';
import * as React from 'react';
import * as ReactDOM from 'react-dom';

import * as ui from '../common/exports';
import * as forms from '../../react-framework/behaviors/forms';
import * as input from '../../react-framework/behaviors/input';
import * as chb from '../../react-framework/behaviors/check-box';
import * as flux from '../../react-framework/flux';

const moduleId = 'semantic';

export class FormSmart extends forms.FormLow<FormSmartStore, ui.FormProps> {}

@flux.StoreDef({ moduleId: moduleId, componentClass: FormSmart })
export class FormSmartStore extends forms.FormLowStore {
  render(): JSX.Element { return React.createElement(ui.Form, this as any, this.$props.children); }
}

export class FieldSmart extends input.InputLow<FieldSmartStore, ui.FieldProps> { }

@flux.StoreDef({ moduleId: moduleId, componentClass: FieldSmart })
export class FieldSmartStore extends input.InputLowStore {
  render(): JSX.Element {
    var props: ui.FieldProps = Object.assign({}, this); 
    props.$error = !!this.error; props['key'] = this.getIdInParent();
    return React.createElement(ui.Field, props, this.$props.$template ? this.$props.$template(this) : null);
  }
}

export class CheckBox extends chb.CheckBoxLow<CheckBoxStore, ui.CheckBoxProps> { 
  componentDidMount() { this.state.semanticHack(); }
}

@flux.StoreDef({ moduleId: moduleId, componentClass: CheckBox })
export class CheckBoxStore extends chb.CheckBoxLowStore {
  render(): JSX.Element {
    this.semanticHack();
    var props = Object.assign({}, this); 
    props.onClick = ev => this.handleChange(!this.value);
    return React.createElement(ui.CheckBox, props, this.$props.$template ? this.$props.$template(this) : [<forms.InputTag ref = {inp => this.inp = inp}/>, <label>{this.$props.$title}</label>]);
  }
  modifyInputTagProps(props: React.HTMLAttributes) {
    super.modifyInputTagProps(props);
    props.className = 'hidden';
  }
  private inp: forms.InputTag;
  semanticHack() { 
    if (this.inp) ReactDOM.findDOMNode(this.inp)['indeterminate'] = this.value === undefined;  
  }
}

export class Radio extends chb.RadioLow<ui.CheckBoxProps> { }

@flux.StoreDef({ moduleId: moduleId, componentClass: Radio })
export class RadioStore extends chb.RadioLowStore {
  render(): JSX.Element {
    var props: ui.CheckBoxProps = Object.assign({}, this); 
    props.onClick = this.onClick.bind(this);
    props.$radio = true;
    return React.createElement(ui.CheckBox, props, this.$props.$template ? this.$props.$template(this) : [<forms.InputTag/>, <label>{this.$props.$title}</label>]);
  }
  modifyInputTagProps(props: React.HTMLAttributes) {
    super.modifyInputTagProps(props);
    props.className = 'hidden';
  }
}


