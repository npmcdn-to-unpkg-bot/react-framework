import * as React from 'react';

import {
  color, size,
  Button, ButtonAnimated, ButtonLabeled, ButtonIcon, Buttons, ButtonSocial, state, social, floated, attachedButton, animate, iconLabel, eqWidth,
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
    <Label $basic $red $pointingBelow>Below</Label><Label $basic $red $pointingAbove>Top</Label>
    <Label $basic $red $pointingRight>Right</Label><Label $basic $red $pointingLeft>Left</Label>
    <h3>Tag</h3>
    <Label $tag $red>New</Label>
    <h3>Horizontal</h3>
    <Label $horizontal $red>New</Label> product
    <h3>Floating</h3>
    <div className="ui compact menu">
      <a className="item">
        <Icon $Icon={icon.mail}/> Messages
        <Label $floating $red>22</Label>
      </a>
      <a className="item">
        <Icon $Icon={icon.users}/> Friends
        <Label $floating $red>22</Label>
      </a>
    </div>
  </div>;
}
