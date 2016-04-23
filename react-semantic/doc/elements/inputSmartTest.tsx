import * as React from 'react';


import {
  Icon, icon, flipped, rotated, circularIcon, bordered,
  Input, InputTag, InputError, iconInput, action,
  Label, pointing, corner, attachedLabel, circularLabel, ribbon,
  Button, attachedButton,
  ButtonLabeled, ButtonIcon, ButtonAnimated, ButtonSocial, Buttons, social, eqWidth,
  Segment, raised, padded, emphasis,
  Divider, divider,
  InputSmart
} from '../../common/exports';

import * as ui from '../../common/exports';

export class InputSmartTest extends React.Component<any, any> {
  render(): JSX.Element {
    return <div>
      <h1>Input Validation</h1>

      <InputSmart $iconLeft ref={self => this.field = self}
        $validators = {[ui.requiredValidator(), ui.rangeValidator(3, 10)]}
        $validatorAsync = {(val, completed) => setTimeout(() => completed((val ? val.trim() : val) == '4' ? null : 'async validation error'), 4000) }
        >
        <InputTag placeholder="Search..."/><Icon $Icon={icon.search}/>
      </InputSmart>
      <hr/>
      <a href='#' onClick={this.click.bind(this) }>OK</a>
      <hr/>
    </div >;
  }
  field: ui.InputSmart;

  click(ev: React.MouseEvent) {
    ev.preventDefault();
    console.log('OK click');
    this.field.validate(err => { console.log('OK done'); });
  }
}

//      <span style={this.field.state.error ? {display: 'none'} : null}>asdas d asd as d asd as da </span>
