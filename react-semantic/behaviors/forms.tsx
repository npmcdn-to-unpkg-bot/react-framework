import * as rx from 'rxjs/Rx';
import * as React from 'react';
import * as ReactDOM from 'react-dom';

import * as ui from '../common/exports';
import * as forms from '../../react-framework/behaviors/forms';
import * as flux from '../../react-framework/flux';

const moduleId = 'forms-ui';

export class FormSmart extends flux.Component<FormSmartStore, flux.IPropsEx & ui.FormProps> { getChildContext() { return { MyForm: this.state }; } }
FormSmart['childContextTypes'] = { MyForm: React.PropTypes.any };

@flux.StoreDef({ moduleId: moduleId, componentClass: FormSmart })
export class FormSmartStore extends forms.FormStore {
  render(): JSX.Element { return React.createElement(ui.Form, this as any, this.children); }
}

export class FieldSmart extends flux.Component<FieldSmartStore, forms.InputProps & ui.FieldProps> {  getChildContext() { return { MyInput: this.state }; } }
FieldSmart['childContextTypes'] = { MyInput: React.PropTypes.any };
FieldSmart['contextTypes'] = { MyForm: React.PropTypes.any };

@flux.StoreDef({ moduleId: moduleId, componentClass: FieldSmart })
export class FieldSmartStore extends forms.InputStore {
  render(): JSX.Element {
    var props: ui.FieldProps = Object.assign({}, this); 
    props.$error = !!this.error;
    return React.createElement(ui.Field, props, this.$template ? this.$template(this) : null);
  }
}

