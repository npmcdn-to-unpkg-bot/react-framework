import * as rx from 'rxjs/Rx';
import * as React from 'react';
import * as ReactDOM from 'react-dom';

import * as flux from '../flux';
import * as forms from './forms';

const moduleId = 'forms';

export interface CheckBoxProps extends forms.FieldLowProps {
  $groupName?:string;
}

export abstract class CheckBoxLowStore extends forms.FieldLowStore implements CheckBoxProps {
  $groupName:string;
}

export abstract class CheckBoxLow<T extends CheckBoxLowStore, P> extends forms.FieldLow<T, CheckBoxProps & P> { }
CheckBoxLow['contextTypes'] = { MyForm: React.PropTypes.any, $parent: React.PropTypes.any };
