import * as React from 'react';


import {
  Icon, icon, flipped, rotated, circularIcon, bordered,
  Input, iconInput, action,
  Label, pointing, corner, attachedLabel, circularLabel, ribbon,
  Button, attachedButton,
  ButtonLabeled, ButtonIcon, ButtonAnimated, ButtonSocial, Buttons, social, eqWidth,
  Segment, raised, padded, emphasis,
  Divider, divider,
  //InputSmart
} from '../../../react-semantic/common/exports';

import {InputSmart, InputStore, InputTag} from '../forms';
import * as flux from '../../flux';

import * as ui from '../../../react-semantic/common/exports';

const moduleId = 'formsTest';

export class FormTest extends flux.Component<FormTestStore, flux.IPropsEx> { }

@flux.StoreDef({ moduleId: moduleId, componentClass: FormTest })
export class FormTestStore extends flux.Store {
  render(): JSX.Element {
    return <div>
      <h1>Input Validation</h1>

      <InputSmart $title='Input 1' $defaultValue='3' $parent={this}
        //ref={self => this.field = self.state}
        $validators = {[ui.requiredValidator(), ui.rangeValidator(3, 10)]}
        $validatorAsync = {(val, completed) => setTimeout(() => completed((val ? val.trim() : val) == '4' ? null : 'async validation error'), 4000) }
        $template = {self => <div>
          <Input $iconLeft $loading={self.validating}>
            <InputTag placeholder="Search..." /><Icon $Icon={icon.search}/>
          </Input>
          <Label $tiny $pointingLeft $colRed $basic style={{ visibility: self.error ? 'visible' : 'hidden', marginTop: '-1px' }}>{self.error} in {self.$title}</Label>
        </div>}
        />
      <hr/>
      <a href='#' onClick={this.click.bind(this) }>OK</a>
      <hr/>
    </div >;
  }
  field: InputStore;

  click(ev: React.MouseEvent) {
    ev.preventDefault();
    //console.log('OK click');
    //this.field.validate(err => { console.log('OK done'); });
  }
}