import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {
  color, size,
  Button, ButtonAnimated, ButtonLabeled, ButtonIcon, Buttons, ButtonSocial, animate, social, eqWidth, state, floated, attachedButton, iconLabel,
  Label, pointing, corner, attachedLabel, circular,
  Icon, icon
} from '../exports';
import * as ui from '../exports';

export const IconTest: ui.StatelessComponent<ui.IProps> = props => {
  return <div>
    <h1>Icon</h1>
    <ui.Icon $Icon={ui.icon.alarmSlashOutline}/>
  </div>;
}