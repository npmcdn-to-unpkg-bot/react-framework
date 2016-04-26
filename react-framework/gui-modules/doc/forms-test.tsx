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

import {InputSmart, InputSmartStore, InputTag, Form, FormStore, FormResult, FormResultStore} from '../forms';
import * as flux from '../../js';
import {BindToState} from '../../js';


import * as ui from '../../../react-semantic/common/exports';

const moduleId = 'formsTest';

export class FormTest extends flux.Component<FormTestStore, flux.IPropsEx> { }

var inpTemplate: flux.TTemplate = (self: InputSmartStore) =>
  <div>
    <Input $iconLeft $loading={self.validating}>
      <InputTag placeholder="Search..." /><Icon $Icon={icon.search}/>
    </Input>
    <Label $tiny $pointingLeft $colRed $basic style={{ visibility: self.error ? 'visible' : 'hidden', marginTop: '-1px' }}>{self.error} in {self.$title}</Label>
  </div>;

enum TAction { click };

@flux.StoreDef({ moduleId: moduleId, componentClass: FormTest })
export class FormTestStore extends flux.Store {
  constructor($parent: flux.Store, instanceId?: string) {
    super($parent, instanceId);
    this.name = new InputSmartStore(this, 'name');
    this.password = new InputSmartStore(this, 'password'); 
  }
  render(): JSX.Element {
    return <div>
      <h1>Input Validation</h1>
      <Form $parent={this} ref={f => this.form = f.state}>
        <InputSmart $title='Name' $defaultValue='3' $parent={this} initState={this.name}
          $validators = {[ui.requiredValidator(), ui.rangeValidator(3, 10)]}
          $validatorAsync = {(val, completed) => setTimeout(() => completed((val ? val.trim() : val) == '4' ? null : 'async validation error'), 4000) }
          $template = {inpTemplate}
          />
        <InputSmart $title='Password' $parent={this} initState={this.password} $validator = {ui.requiredValidator() } $template = {inpTemplate} />
      </Form>
      <hr/>
      <BindToState $stores={[this.password, this.name]} $parent={this} $template={self => <i>Name={this.name.value}, Password={this.password.value}</i>}/>
      <hr/>
      <a href='#' onClick={ev => this.clickAction(ev, TAction.click, 'click') }>OK</a>
      <hr/>
    </div >;
  }

  name: InputSmartStore;
  password: InputSmartStore;
  form: FormStore;

  doDispatchAction(id: number, par: flux.IActionPar, completed: flux.TExceptionCallback) {
    switch (id) {
      case TAction.click:
        this.form.validate(errs => { if (errs) alert('Error'); completed(null); });
        return;
      default:
        super.doDispatchAction(id, par, completed);
    }
  }

}