import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as val from '../common/inputValidated';
import {InputSmartProps, inputSmartPropsDescr, InputProps, inputPropsDescr
} from '../common/generated';
import {
  Label, pointing, corner, attachedLabel, circularLabel, ribbon,
  Input,
} from '../common/exports';

import * as ui from '../common/exports'

export class InputSmart extends val.inputLow<InputSmartProps> {
  render(): JSX.Element {
    //var res = super.render();
    //var inputProps: InputProps = ui.enumValToProp(this.props, inputPropsDescr);
    //props.$loading = this.state.error;
    ////if (this.state.asyncRunning) props.$loading = true; else if (this.state.error) props.$error = true;
    //var rest: React.HTMLAttributes = ui.propsToClasses([], ui.projection(props, inputSmartPropsDescr));
    var prCopy: InputSmartProps = Object.assign({}, this.props);
    if (this.state.error) prCopy.$error = true;
    if (this.state.asyncRunning) prCopy.$loading = true;
    return React.createElement('div', null, [
      React.createElement(Input, prCopy),
      <Label $tiny $pointingLeft $colRed $basic style={{ visibility: this.state.error ? 'visible' : 'hidden', marginTop: '-1px' }}>{this.state.error}</Label>]);
  }
  static childContextTypes = { MyInput: React.PropTypes.any };
}


