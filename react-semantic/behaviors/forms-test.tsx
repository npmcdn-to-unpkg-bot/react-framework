import * as React from 'react';


import {
  Icon, icon, flipped, rotated, circularIcon, bordered, color,
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
} from '../common/exports';

import {InputSmart, InputSmartStore, InputTag} from '../../react-framework/behaviors/forms';
import {FormSmart, FormSmartStore, FieldSmart, FieldSmartStore} from './forms';
import * as flux from '../../react-framework/flux';
import {BindToState} from '../../react-framework/flux';


import * as ui from '../common/exports';

const moduleId = 'formsTest';

export class FormSmartTest extends flux.Component<FormTestStore, flux.IPropsEx> { }

var inpTemplate: flux.TTemplate = (self: InputSmartStore) =>
  <div>
    <Input $error={!!self.error} $iconLeft $loading={self.validating}>
      <InputTag placeholder="Search..." /><Icon $Icon={icon.search}/>
    </Input>
    <Label $tiny $pointingLeft $colRed $basic style={{ visibility: self.error ? 'visible' : 'hidden', marginTop: '-1px', }}>{self.error} in {self.$title}</Label>
  </div>;

var fieldTemplate: flux.TTemplate = (self: InputSmartStore) =>
  [<label>{self.$title}</label>,
    <InputTag placeholder={self.$title}/>,
    <Label $small $colRed $basic style={{ visibility: self.error || self.validating ? 'visible' : 'hidden', border: '0', }}>
      <span style={{ display: self.error ? null : 'none' }}>{self.error} in {self.$title}</span>
      <Icon $disabled $Color={color.no} style={{ display: self.validating ? null : 'none' }} $Icon={icon.circleNotched} $loading />
    </Label>,

    /*<div className='ui red' style={{ visibility: self.error ? 'visible' : 'hidden'}}>{self.error} in {self.$title}</div>,
    /*<Label $tiny $pointingAbove $colRed $basic style={{ visibility: self.error ? 'visible' : 'hidden', marginTop: '-1px' }}>{self.error} in {self.$title}</Label>*/]

enum TAction { click, click2 };

@flux.StoreDef({ moduleId: moduleId, componentClass: FormSmartTest })
export class FormTestStore extends flux.Store {
  constructor($parent: flux.Store, instanceId?: string) {
    super($parent, instanceId);
    this.name = new InputSmartStore(this, 'name');
    this.password = new InputSmartStore(this, 'password');
    //form2:
    this.form2 = new FormSmartStore(this, '2');
    this.name2 = new FieldSmartStore(this, '2');
    this.name2.$validatorAsync = (val, completed) => setTimeout(() => completed((val ? val.trim() : val) == '4' ? null : 'async validation error'), 4000);
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
      <FormSmart $equalWidth initState={this.form2}>
        <Fields>
          <FieldSmart $title='First Name' instanceId='0' $parent={this} $required $validator = {ui.requiredValidator() } $template = {fieldTemplate}/>
          <FieldSmart $title='Last Name' instanceId='1' $parent={this} $required $validator = {ui.requiredValidator() } $template = {fieldTemplate}/>
          <FieldSmart $title='Name' $defaultValue='3' initState={this.name2} $template = {fieldTemplate} />
        </Fields>
      </FormSmart>
      <hr/>
      <a href='#' onClick={ev => this.clickAction(ev, TAction.click2, 'click2') }>OK</a>
    </Container>;
  }

  name: InputSmartStore;
  name2: FieldSmartStore;
  password: InputSmartStore;
  form: FormSmartStore;
  form2: FormSmartStore;

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