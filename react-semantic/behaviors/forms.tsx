import * as rx from 'rxjs/Rx';
import * as React from 'react';
import * as ReactDOM from 'react-dom';

import * as ui from '../common/exports';
import * as forms from '../../react-framework/behaviors/index';
import * as flux from '../../react-framework/flux';

export { InputSmart, InputSmartStore} from '../../react-framework/behaviors/index';
export { initDefaultTemplates } from './templates';

const moduleId = 'semantic';

//***** FormSmart
export class FormSmart extends forms.FormLow<FormSmartStore, ui.FormProps> {}

@flux.StoreDef({ moduleId: moduleId, componentClass: FormSmart })
export class FormSmartStore extends forms.FormLowStore {
  render(): JSX.Element { return React.createElement(ui.Form, this as any, this.renderTemplate()); }
}

export class FieldSmart extends forms.InputLow<FieldSmartStore, ui.FieldProps> { }

@flux.StoreDef({ moduleId: moduleId, componentClass: FieldSmart })
export class FieldSmartStore extends forms.InputLowStore {
  render(): JSX.Element {
    var props: ui.FieldProps = Object.assign({}, this); 
    props.$error = !!this.error; props['key'] = this.getIdInParent();
    return React.createElement(ui.Field, props, this.renderTemplate());
  }
}

//***** CheckBox
export class CheckBox extends forms.CheckBoxLow<CheckBoxStore, ui.CheckBoxProps> {
  componentDidMount() { this.state.semanticHack(); }
}

@flux.StoreDef({ moduleId: moduleId, componentClass: CheckBox })
export class CheckBoxStore extends forms.CheckBoxLowStore {
  render(): JSX.Element {
    this.semanticHack();
    return React.createElement(ui.CheckBox, this as any, this.renderTemplate());
  }
  modifyInputTagProps(props: React.HTMLAttributes) {
    super.modifyInputTagProps(props);
    props.className = 'hidden';
  }
  $inp: HTMLInputElement;
  semanticHack() { 
    if (this.$inp) this.$inp['indeterminate'] = this.value === undefined;  
  }
}

//***** Radio
export class Radio extends forms.RadioLow<ui.CheckBoxProps> { }

@flux.StoreDef({ moduleId: moduleId, componentClass: Radio })
export class RadioStore extends forms.RadioLowStore {
  render(): JSX.Element {
    var props: ui.CheckBoxProps = Object.assign({}, this); 
    props.$radio = true;
    return React.createElement(ui.CheckBox, props, this.renderTemplate());
  }
  modifyInputTagProps(props: React.HTMLAttributes) {
    super.modifyInputTagProps(props);
    props.className = 'hidden';
  }
}

//***** Dimmer
export class Dimmer extends forms.Dimmer<DimmerStore, ui.DimmerProps> { }

@flux.StoreDef({ moduleId: moduleId, componentClass: Dimmer })
export class DimmerStore extends forms.DimmerStore<ui.DimmerProps, forms.IModalOut> {
  render(): JSX.Element {
    return React.createElement(ui.Dimmer, this.$props, this.renderTemplate());
  }
}
