import * as React from 'react';


import {
  Icon, icon, flipped, rotated, circularIcon, bordered,
  Input, iconInput, action,
  Label, pointing, corner, attachedLabel, circularLabel, ribbon,
  Button, attachedButton,
  ButtonLabeled, ButtonIcon, ButtonAnimated, ButtonSocial, Buttons, social, eqWidth,
  Segment, raised, padded, emphasis,
  Divider, divider,
  Container,

  Form, outerTagForm, stateForm, sizeForm,
  Field,
  Fields, eqWidthFields,
  Message, stateMessage, sizeMessage,
  //InputSmart
} from '../../../react-semantic/common/exports';

import {InputSmart, InputSmartStore, InputTag, FormSmart, FormStore, FormResult, FormResultStore} from '../forms';
import * as flux from '../../js';
import {BindToState} from '../../js';


import * as ui from '../../../react-semantic/common/exports';

const moduleId = 'formsTest';

export class FormSmartTest extends flux.Component<FormTestStore, flux.IPropsEx> { }

var inpTemplate: flux.TTemplate = (self: InputSmartStore) =>
  <div>
    <Input $error={!!self.error} $iconLeft $loading={self.validating}>
      <InputTag placeholder="Search..." /><Icon $Icon={icon.search}/>
    </Input>
    <Label $tiny $pointingLeft $colRed $basic style={{ visibility: self.error ? 'visible' : 'hidden', marginTop: '-1px' }}>{self.error} in {self.$title}</Label>
  </div>;

var fieldTemplate: flux.TTemplate = (self: InputSmartStore) => 
  <Field $error={!!self.error} $required>
    <label>{self.$title}</label>
    <InputTag placeholder={self.$title}/>
    <Label $tiny $pointingAbove $colRed $basic style={{ visibility: self.error ? 'visible' : 'hidden', marginTop: '-1px' }}>{self.error} in {self.$title}</Label>
  </Field>;

enum TAction { click, click2 };

@flux.StoreDef({ moduleId: moduleId, componentClass: FormSmartTest })
export class FormTestStore extends flux.Store {
  constructor($parent: flux.Store, instanceId?: string) {
    super($parent, instanceId);
    this.name = new InputSmartStore(this, 'name');
    this.password = new InputSmartStore(this, 'password'); 
  }
  render(): JSX.Element {
    return <Container>
      <h1>Input Validation</h1>
      <FormSmart $parent={this} instanceId='1' ref={f => this.form = f.state}>
        <InputSmart $title='Name' $defaultValue='3' $parent={this} initState={this.name}
          $validators = {[ui.requiredValidator(), ui.rangeValidator(3, 10)]}
          $validatorAsync = {(val, completed) => setTimeout(() => completed((val ? val.trim() : val) == '4' ? null : 'async validation error'), 4000) }
          $template = {inpTemplate}
          />
        <InputSmart $title='Password' $parent={this} initState={this.password} $validator = {ui.requiredValidator() } $template = {inpTemplate} />
      </FormSmart>
      <hr/>
      <BindToState $stores={[this.password, this.name]} $parent={this} $template={self => <i>Name={this.name.value}, Password={this.password.value}</i>}/>
      <hr/>
      <a href='#' onClick={ev => this.clickAction(ev, TAction.click, 'click') }>OK</a>
      <hr/>

      <h1>Form, Fields</h1>
      <FormSmart $parent={this} instanceId='2' ref={f => this.form2 = f.state}>
        <Form>
          <Fields $equalWidth>
            <InputSmart $title='First Name' instanceId='fn' $parent={this} $validator = {ui.requiredValidator() } $template = {fieldTemplate}/>
            <InputSmart $title='Last Name' instanceId='ln' $parent={this} $validator = {ui.requiredValidator() } $template = {fieldTemplate}/>
          </Fields>
        </Form>
      </FormSmart>
      <hr/>
      <a href='#' onClick={ev => this.clickAction(ev, TAction.click2, 'click2') }>OK</a>
    </Container>;
  }

  name: InputSmartStore;
  password: InputSmartStore;
  form: FormStore;
  form2: FormStore;

  doDispatchAction(id: number, par: flux.IActionPar, completed: flux.TExceptionCallback) {
    switch (id) {
      case TAction.click:
        this.form.validate(errs => { if (errs) alert('Error'); completed(null); });
        return;
      case TAction.click2:
        this.form2.validate(errs => completed(null));
        return;
      default:
        super.doDispatchAction(id, par, completed);
    }
  }

}