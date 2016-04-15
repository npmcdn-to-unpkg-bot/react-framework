import * as React from 'react';

import {
  //colorUI, size,
  Button, ButtonAnimated, ButtonLabeled, ButtonIcon, Buttons, ButtonSocial, animate, social, eqWidth, //state, floated, attachedButton, iconLabel, 
  Label, //pointing, corner, attachedLabel, circular,
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
    <Button $basic $red>Red</Button>
    <Button $basic $orange>Orange</Button>
    <Button $basic $yellow>Yellow</Button>
    <Button $basic $olive>Olive</Button>
    <Button $basic $green>Green</Button>
    <Button $basic $teal>Teal</Button>
    <Button $basic $blue>Blue</Button>
    <Button $basic $violet>Violet</Button>
    <Button $basic $purple>Purple</Button>
    <Button $basic $pink>Pink</Button>
    <Button $basic $brown>Brown</Button>
    <Button $basic $grey>Grey</Button>
    <Button $basic $black>Black</Button> <br/><br/>
    <h2>Inverted</h2>
    <div className="ui inverted segment">
      <Button $inverted>Standard</Button>
      <Button $inverted $red>Red</Button>
      <Button $inverted $orange>Orange</Button>
      <Button $inverted $yellow>Yellow</Button>
      <Button $inverted $olive>Olive</Button>
      <Button $inverted $green>Green</Button>
      <Button $inverted $teal>Teal</Button>
      <Button $inverted $blue>Blue</Button>
      <Button $inverted $violet>Violet</Button>
      <Button $inverted $purple>Purple</Button>
      <Button $inverted $pink>Pink</Button>
      <Button $inverted $brown>Brown</Button>
      <Button $inverted $grey>Grey</Button>
      <Button $inverted $black>Black</Button>
    </div> <br/><br/>
    <h2>Variants</h2>
    <Button $primary>primary</Button>
    <Button $secondary>secondary</Button>
    <Button $negative>negative</Button>
    <Button $positive>positive</Button>
    <h2>Colored</h2>
    <Button>Standard</Button>
    <Button $red>Red</Button>
    <Button $orange>Orange</Button>
    <Button $yellow>Yellow</Button>
    <Button $olive>Olive</Button>
    <Button $green>Green</Button>
    <Button $teal>Teal</Button>
    <Button $blue>Blue</Button>
    <Button $violet>Violet</Button>
    <Button $purple>Purple</Button>
    <Button $pink>Pink</Button>
    <Button $brown>Brown</Button>
    <Button $grey>Grey</Button>
    <Button $black>Black</Button> <br/><br/>
    <h2>Floated</h2>
    <Button $floatedLeft>Left</Button><Button $floatedRight>Right</Button> <br/><br/>
    <h2>Size</h2>
    <Button $mini>mini</Button>
    <Button $tiny>tiny</Button>
    <Button $small>small</Button>
    <Button $medium>medium</Button>
    <Button $large>large</Button>
    <Button $big>big</Button>
    <Button $huge>huge</Button>
    <Button $massive>massive</Button>
    <h2>Compact</h2>
    <Button $compact>Compact</Button>
    <ButtonIcon $compact $Icon={icon.user}>Compact</ButtonIcon>
    <Button $labeled $hasIcon><Icon $Icon={icon.user} />Add Friend</Button>
    <h2>Active</h2>
    <Button $active>Active</Button>
    <h2>Disabled</h2>
    <Button disabled>Disabled</Button>
    <h2>Loading</h2>
    <Button $loading>Loading</Button><Button $loading $basic>Loading</Button><Button $loading $primary>Loading</Button><Button $loading $secondary>Loading</Button>

  </div>;
}

export const ButtonAnimatedTest: ui.StatelessComponent<ui.IProps> = props => {
  return <div>
    <h1>ButtonAnimated</h1>
    <ButtonAnimated $olive $animateTo={{ animate: animate.fade, to: <b>hidden</b> }} onClick={ev => alert('click') }>visible</ButtonAnimated> <br/><br/>
    <ButtonAnimated $pink $basic $animateTo={{ animate: animate.vertical, to: 'hidden' }}>visible</ButtonAnimated> <br/><br/>
    <ButtonAnimated $circular $animateTo={{ to: 'hidden' }}>visible</ButtonAnimated> <br/><br/>
  </div>;
}

export const ButtonLabeledTest: ui.StatelessComponent<ui.IProps> = props => {
  return <div>
    <h1>ButtonLabeled</h1>
    <ButtonLabeled $pointing $blue $label={<Label $basic $blue>2.048</Label>}><Icon $Icon={icon.heart}/> Like</ButtonLabeled> <br/><br/>
    <ButtonLabeled $left $label={<Label $basic><Icon $Icon={icon.heart}/></Label>}> Left</ButtonLabeled> <br/> <br/>
    <ButtonLabeled $left $pointing $label={<Label $basic>2.048</Label>}> Left Pointing</ButtonLabeled> <br/> <br/>
    <Button $labeled $hasIcon><Icon $Icon={icon.user} />Add Friend</Button>
  </div >;
}

export const ButtonIconTest: ui.StatelessComponent<ui.IProps> = props => {
  return <div>
    <h1>ButtonIcon</h1>
    <ButtonIcon $iconLabelRight $basic $teal $Icon={icon.user}>Add Friend</ButtonIcon> <br/><br/>
    <ButtonIcon $IconLabel={ui.iconLabel.iconLabelRight} $basic $teal $Icon={icon.user}>Add Friend</ButtonIcon> <br/><br/>
    <ButtonIcon $iconLabelLeft $orange $Icon={icon.user}>Add Friend</ButtonIcon> <br/><br/>
    <ButtonIcon $pink $Icon={icon.user}></ButtonIcon> <br/><br/>
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
    <Buttons $green><Button>One</Button> <Button>Two</Button> <Button>Three</Button></Buttons><br/><br/>
    <Buttons $basic><Button>One</Button><Button>Two</Button><Button>Three</Button></Buttons><br/><br/>
    <Buttons $basic $vertical><Button>One</Button><Button>Two</Button><Button>Three</Button></Buttons><br/><br/>
    <Buttons $huge> <Button>One</Button> <Button>Two</Button> <Button>Three</Button></Buttons><br/><br/>
    <Buttons $hasIcon $small> <ButtonIcon $Icon={icon.alignLeft}/> <ButtonIcon $Icon={icon.alignRight}/> <ButtonIcon $Icon={icon.alignCenter}/></Buttons><br/><br/>
  </div>;
};

export const ButtonSocialTest: ui.StatelessComponent<ui.IProps> = props => {
  return <div>
    <h1>Social</h1>
    <ButtonSocial $Social={social.$facebook}/>
    <ButtonSocial $Social={social.$googlePlus}/>
    <ButtonSocial $Social={social.$instagram}/>
    <ButtonSocial $Social={social.$linkedin}/>
    <ButtonSocial $Social={social.$twitter}/>
    <ButtonSocial $Social={social.$vk}/>
    <ButtonSocial $Social={social.$youtube}/>
  </div>;
};
