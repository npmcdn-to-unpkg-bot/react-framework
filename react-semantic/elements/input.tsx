import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as val from '../common/inputValidated';
import {InputProps, inputPropsDescr
} from '../common/generated';

import * as ui from '../common/exports'

export class Input extends val.Field<InputProps> {
  render(): JSX.Element {
    var props: InputProps = ui.enumValToProp(this.props, inputPropsDescr);
    if (this.state.error) props.$error = true;
    var rest = ui.propsToClasses(['ui input'], ui.projection(props, inputPropsDescr));
    return React.createElement('div', rest, props.children);
  }
}


