import * as React from 'react';

import {
  color, size,
  Button, ButtonAnimated, ButtonLabeled, ButtonIcon, Buttons, ButtonSocial, animate, social, eqWidth, state, floated, attachedButton, iconLabel,
  Label, pointing, corner, attachedLabel, circular,
  Icon, icon
} from '../exports';
import * as ui from '../exports';

export const LabelTest: ui.StatelessComponent<ui.IProps> = props => {
  return <div>
    <h1>Label</h1>
    <Label><Icon $Icon={icon.mail}/> 23</Label><br/><br/>
    <h3>Pointing</h3>
    <Label $pointingBelow>Below</Label><Label $pointingAbove>Top</Label><Label $pointingRight>Right</Label><Label $pointingLeft>Left</Label>
    <Label $basic $colRed $pointingBelow>Below</Label><Label $basic $colRed $pointingAbove>Top</Label>
    <Label $basic $colRed $pointingRight>Right</Label><Label $basic $colRed $pointingLeft>Left</Label>
    <h3>Tag</h3>
    <Label $tag $colRed>New</Label>
    <h3>Horizontal</h3>
    <Label $horizontal $colRed>New</Label> product
    <h3>Floating</h3>
    <div className="ui compact menu">
      <a className="item">
        <Icon $Icon={icon.mail}/> Messages
        <Label $floating $colRed>22</Label>
      </a>
      <a className="item">
        <Icon $Icon={icon.users}/> Friends
        <Label $floating $colRed>22</Label>
      </a>
    </div>
  </div>;
}
