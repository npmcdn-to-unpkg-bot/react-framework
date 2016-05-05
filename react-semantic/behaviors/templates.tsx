import * as rx from 'rxjs/Rx';
import * as React from 'react';
import * as ReactDOM from 'react-dom';

import {Input, Label, Icon, icon } from '../common/exports';
import * as flux from '../../react-framework/flux';
import * as forms from '../../react-framework/behaviors/index';
import {InputTag} from '../../react-framework/behaviors/index';

export function initDefaultTemplates() {
  flux.defaultTemplates[flux.Store.getClassMeta(forms.InputSmartStore).classId] = (self: forms.InputSmartStore) =>
    <div>
      <Input $error={!!self.error} $iconLeft $loading={self.validating}>
        <InputTag placeholder="Search..." /><Icon $Icon={icon.search}/>
      </Input>
      <Label $tiny $pointingLeft $colRed $basic style={{ visibility: self.error ? 'visible' : 'hidden', marginTop: '-1px', }}>{self.error} in {self.$props.$title}</Label>
    </div>;
}