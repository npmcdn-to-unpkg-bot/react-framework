import * as rx from 'rxjs/Rx';
import * as React from 'react';
import * as ReactDOM from 'react-dom';

import * as ui from '../common/exports';
import * as forms from '../../react-framework/behaviors/forms';
import * as flux from '../../react-framework/flux';

const moduleId = 'forms-ui';

export class FormSmart extends forms.FormLow<FormSmartStore, ui.FormProps> {}

@flux.StoreDef({ moduleId: moduleId, componentClass: FormSmart })
export class FormSmartStore extends forms.FormLowStore {
  render(): JSX.Element { return React.createElement(ui.Form, this as any, this.children); }
}

export class FieldSmart extends forms.InputLow<FieldSmartStore, ui.FieldProps> { }

@flux.StoreDef({ moduleId: moduleId, componentClass: FieldSmart })
export class FieldSmartStore extends forms.InputLowStore {
  render(): JSX.Element {
    var props: ui.FieldProps = Object.assign({}, this); 
    props.$error = !!this.error; props['key'] = this.getIdInParent();
    return React.createElement(ui.Field, props, this.$template ? this.$template(this) : null);
  }
}

