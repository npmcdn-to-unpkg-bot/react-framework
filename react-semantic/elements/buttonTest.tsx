import * as React from 'react';

import {
  color, size,
  Button, ButtonAnimated, ButtonLabeled, ButtonIcon, Buttons, ButtonSocial, animate, social, eqWidth, floated, attachedButton, iconLabel, 
  Label, pointing, corner, attachedLabel, circular,
  Icon, icon
} from '../exports';
import * as ui from '../exports';

export const ButtonTest: ui.StatelessComponent<ui.IProps> = props => {
  return <div>
    <h1>Button</h1>
    <Button onClick={ev => alert('click') }>Follow</Button> <br/><br/>
    <Button tabIndex={0}>Focusable</Button> <br/><br/>
    <h2>Basic</h2>
    <Button $basic>Standard</Button>
    <Button $basic $colRed>Red</Button>
    <Button $basic $colOrange>Orange</Button>
    <Button $basic $colYellow>Yellow</Button>
    <Button $basic $colOlive>Olive</Button>
    <Button $basic $colGreen>Green</Button>
    <Button $basic $colTeal>Teal</Button>
    <Button $basic $colBlue>Blue</Button>
    <Button $basic $colViolet>Violet</Button>
    <Button $basic $colPurple>Purple</Button>
    <Button $basic $colPink>Pink</Button>
    <Button $basic $colBrown>Brown</Button>
    <Button $basic $colGrey>Grey</Button>
    <Button $basic $colBlack>Black</Button> <br/><br/>
    <h2>Inverted</h2>
    <div className="ui inverted segment">
      <Button $inverted>Standard</Button>
      <Button $inverted $colRed>Red</Button>
      <Button $inverted $colOrange>Orange</Button>
      <Button $inverted $colYellow>Yellow</Button>
      <Button $inverted $colOlive>Olive</Button>
      <Button $inverted $colGreen>Green</Button>
      <Button $inverted $colTeal>Teal</Button>
      <Button $inverted $colBlue>Blue</Button>
      <Button $inverted $colViolet>Violet</Button>
      <Button $inverted $colPurple>Purple</Button>
      <Button $inverted $colPink>Pink</Button>
      <Button $inverted $colBrown>Brown</Button>
      <Button $inverted $colGrey>Grey</Button>
      <Button $inverted $colBlack>Black</Button>
    </div> <br/><br/>
    <h2>Variants</h2>
    <Button $primary>primary</Button>
    <Button $secondary>secondary</Button>
    <Button $negative>negative</Button>
    <Button $positive>positive</Button>
    <h2>Colored</h2>
    <Button>Standard</Button>
    <Button $colRed>Red</Button>
    <Button $colOrange>Orange</Button>
    <Button $colYellow>Yellow</Button>
    <Button $colOlive>Olive</Button>
    <Button $colGreen>Green</Button>
    <Button $colTeal>Teal</Button>
    <Button $colBlue>Blue</Button>
    <Button $colViolet>Violet</Button>
    <Button $colPurple>Purple</Button>
    <Button $colPink>Pink</Button>
    <Button $colBrown>Brown</Button>
    <Button $colGrey>Grey</Button>
    <Button $colBlack>Black</Button> <br/><br/>
    <h2>Floated</h2>
    <Button $floatedLeft>Left</Button><Button $floatedRight>Right</Button> <br/><br/>
    <h2>Size</h2>
    <Button $s3>mini</Button>
    <Button $s2>tiny</Button>
    <Button $s1>small</Button>
    <Button>medium</Button>
    <Button $1>large</Button>
    <Button $2>big</Button>
    <Button $3>huge</Button>
    <Button $4>massive</Button>
    <h2>Compact</h2>
    <Button $compact>Compact</Button>
    <ButtonIcon $compact $Icon={icon.user}>Compact</ButtonIcon>
    <Button $labeled $hasIcon><Icon $Icon={icon.user} />Add Friend</Button>
    <h2>Active</h2>
    <Button $active>Active</Button>
    <h2>Disabled</h2>
    <Button $disabled>Disabled</Button>
    <h2>Loading</h2>
    <Button $loading>Loading</Button><Button $loading $basic>Loading</Button><Button $loading $primary>Loading</Button><Button $loading $secondary>Loading</Button>
    <h2>Attached</h2>
    <div className="ui attached segment">
      <Button $attachedTop>Top</Button>
      <img src="images/paragraph.png" className="ui wireframe image"/>
      <Button $attachedBottom>Top</Button>
    </div><br/>
    <Button $attachedLeft>Left</Button><Button $attachedRight>Right</Button>
  </div>;
}

export const ButtonAnimatedTest: ui.StatelessComponent<ui.IProps> = props => {
  return <div>
    <h1>ButtonAnimated</h1>
    <ButtonAnimated $colOlive $animateTo={{ animate: animate.fade, to: <b>hidden</b> }} onClick={ev => alert('click') }>visible</ButtonAnimated> <br/><br/>
    <ButtonAnimated $colPink $basic $animateTo={{ animate: animate.vertical, to: 'hidden' }}>visible</ButtonAnimated> <br/><br/>
    <ButtonAnimated $circular $animateTo={{ to: 'hidden' }}>visible</ButtonAnimated> <br/><br/>
  </div>;
}

export const ButtonLabeledTest: ui.StatelessComponent<ui.IProps> = props => {
  return <div>
    <h1>ButtonLabeled</h1>
    <ButtonLabeled $pointing $colBlue $label={<Label $basic $colBlue>2.048</Label>}><Icon $Icon={icon.heart}/> Like</ButtonLabeled> <br/><br/>
    <ButtonLabeled $left $label={<Label $basic><Icon $Icon={icon.heart}/></Label>}> Left</ButtonLabeled> <br/> <br/>
    <ButtonLabeled $left $pointing $label={<Label $basic>2.048</Label>}> Left Pointing</ButtonLabeled> <br/> <br/>
    <Button $labeled $hasIcon><Icon $Icon={icon.user} />Add Friend</Button>
  </div >;
}

export const ButtonIconTest: ui.StatelessComponent<ui.IProps> = props => {
  return <div>
    <h1>ButtonIcon</h1>
    <ButtonIcon $iconLabelRight $basic $colTeal $Icon={icon.user}>Add Friend</ButtonIcon> <br/><br/>
    <ButtonIcon $IconLabel={ui.iconLabel.iconLabelRight} $basic $colTeal $Icon={icon.user}>Add Friend</ButtonIcon> <br/><br/>
    <ButtonIcon $iconLabelLeft $colOrange $Icon={icon.user}>Add Friend</ButtonIcon> <br/><br/>
    <ButtonIcon $colPink $Icon={icon.user}></ButtonIcon> <br/><br/>
  </div>;
}

export const ButtonsTest: ui.StatelessComponent<ui.IProps> = props => {
  return <div>
    <h1>Buttons</h1>
    <Buttons><Button>One</Button><Button>Two</Button><Button>Three</Button></Buttons><br/><br/>
    <Buttons $hasIcon><ButtonIcon $Icon={icon.alignLeft}/><ButtonIcon $Icon={icon.alignRight}/><ButtonIcon $Icon={icon.alignCenter}/></Buttons><br/><br/>
    <Buttons $vertical><Button>One</Button><Button>Two</Button><Button>Three</Button></Buttons><br/><br/>
    <Buttons $vertical $labeled $hasIcon>
      <Button><Icon $Icon={icon.user} />Add Friend</Button>
      <Button><Icon $Icon={icon.user} />Add Friend</Button>
    </Buttons><br/><br/>
    <Buttons $EqWidth={eqWidth.three}><Button>One</Button><Button>Two</Button><Button>Three</Button></Buttons><br/><br/>
    <Buttons $colGreen><Button>One</Button> <Button>Two</Button> <Button>Three</Button></Buttons><br/><br/>
    <Buttons $basic><Button>One</Button><Button>Two</Button><Button>Three</Button></Buttons><br/><br/>
    <Buttons $basic $vertical><Button>One</Button><Button>Two</Button><Button>Three</Button></Buttons><br/><br/>
    <Buttons $3> <Button>One</Button> <Button>Two</Button> <Button>Three</Button></Buttons><br/><br/>
    <Buttons $hasIcon $s1> <ButtonIcon $Icon={icon.alignLeft}/> <ButtonIcon $Icon={icon.alignRight}/> <ButtonIcon $Icon={icon.alignCenter}/></Buttons><br/><br/>
  </div>;
};

export const ButtonSocialTest: ui.StatelessComponent<ui.IProps> = props => {
  return <div>
    <h1>Social</h1>
    <ButtonSocial $facebook/>
    <ButtonSocial $googlePlus/>
    <ButtonSocial $instagram/>
    <ButtonSocial $Social={social.$linkedin}/>
    <ButtonSocial $twitter/>
    <ButtonSocial $vk/>
    <ButtonSocial $youtube/>
  </div>;
};
