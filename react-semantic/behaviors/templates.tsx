import * as rx from 'rxjs/Rx';
import * as React from 'react';
import * as ReactDOM from 'react-dom';

import {Input, Label, Icon, icon, color } from '../common/exports';
import * as flux from '../../react-framework/flux';
import * as forms from '../../react-framework/behaviors/index';
import {InputTag} from '../../react-framework/behaviors/index';
import * as semantic from '../../react-semantic/behaviors/forms';

export function initDefaultTemplates() {
  flux.defaultTemplates[flux.Store.getClassMeta(forms.InputSmartStore).classId] = (self: forms.InputSmartStore) =>
    <div>
      <Input $error={!!self.error} $iconLeft $loading={self.validating}>
        <InputTag placeholder="Search..." /><Icon $Icon={icon.search}/>
      </Input>
      <Label $tiny $pointingLeft $colRed $basic style={{ visibility: self.error ? 'visible' : 'hidden', marginTop: '-1px', }}>{self.error} in {self.getProps().$title}</Label>
    </div>;

  flux.defaultTemplates[flux.Store.getClassMeta(semantic.FormSmartStore).classId] = (self: semantic.FormSmartStore) => [
  ];

  flux.defaultTemplates[flux.Store.getClassMeta(semantic.FieldSmartStore).classId] = (self: semantic.FieldSmartStore) => [
    <label key={0}>{self.getProps().$title}</label>,
    <InputTag placeholder={self.getProps().$title} key={1}/>,
    <Label $small $colRed $basic style={{ visibility: self.error || self.validating ? 'visible' : 'hidden', border: '0px', }} key={2}>
      <span style={{ display: self.error ? null : 'none' }} key={0}>{self.error} in {self.getProps().$title}</span>
      <Icon $disabled $Color={color.no} style={{ display: self.validating ? null : 'none' }} $Icon={icon.circleNotched} $loading key={2}/>
    </Label>
  ];

  flux.defaultTemplates[flux.Store.getClassMeta(semantic.CheckBoxStore).classId] = (self: semantic.CheckBoxStore) => {
    var id = '_' + flux.getUnique().toString();
    return [
      <InputTag ref = {inp => self.$inp = inp ? ReactDOM.findDOMNode(inp) as HTMLInputElement : null } key={1} id={id}/>,
      <label key={2} htmlFor={id}>{self.getProps().$title}</label>
    ]
  };

  flux.defaultTemplates[flux.Store.getClassMeta(semantic.RadioStore).classId] = (self: semantic.RadioStore) => {
    var id = '_' + flux.getUnique().toString();
    return [
      <InputTag key={1} id={id}/>,
      <label key={2} htmlFor={id}>{self.getProps().$title}</label>
    ]
  };

}