import * as React from 'react';
import * as ReactDOM from 'react-dom';

import {
  colorUI, size,
  Button, ButtonAnimated, ButtonLabeled, ButtonIcon, Buttons, ButtonSocial, state, social, floated, attachedButton, animate, iconLabel, eqWidth,
  Label, pointing, corner, attachedLabel, circular,
  Icon, iconUI
} from '../exports';

import * as ui from '../exports';

export const ButtonTest: ui.StatelessComponent<ui.IProps> = props => {
  return <div>
    <h1>Button</h1>
    <Button onClick={ev => alert('click') }>Follow</Button> <br/><br/>
    <Button tabIndex={0}>Focusable</Button> <br/><br/>
    <h2>Basic</h2>
    <Button basic>Standard</Button>
    <Button basic colorUI={colorUI.red}>Red</Button>
    <Button basic colorUI={colorUI.orange}>Orange</Button>
    <Button basic colorUI={colorUI.yellow}>Yellow</Button>
    <Button basic colorUI={colorUI.olive}>Olive</Button>
    <Button basic colorUI={colorUI.green}>Green</Button>
    <Button basic colorUI={colorUI.teal}>Teal</Button>
    <Button basic colorUI={colorUI.blue}>Blue</Button>
    <Button basic colorUI={colorUI.violet}>Violet</Button>
    <Button basic colorUI={colorUI.purple}>Purple</Button>
    <Button basic colorUI={colorUI.pink}>Pink</Button>
    <Button basic colorUI={colorUI.brown}>Brown</Button>
    <Button basic colorUI={colorUI.grey}>Grey</Button>
    <Button basic colorUI={colorUI.black}>Black</Button> <br/><br/>
    <h2>Inverted</h2>
    <div className="ui inverted segment">
      <Button inverted>Standard</Button>
      <Button inverted colorUI={colorUI.red}>Red</Button>
      <Button inverted colorUI={colorUI.orange}>Orange</Button>
      <Button inverted colorUI={colorUI.yellow}>Yellow</Button>
      <Button inverted colorUI={colorUI.olive}>Olive</Button>
      <Button inverted colorUI={colorUI.green}>Green</Button>
      <Button inverted colorUI={colorUI.teal}>Teal</Button>
      <Button inverted colorUI={colorUI.blue}>Blue</Button>
      <Button inverted colorUI={colorUI.violet}>Violet</Button>
      <Button inverted colorUI={colorUI.purple}>Purple</Button>
      <Button inverted colorUI={colorUI.pink}>Pink</Button>
      <Button inverted colorUI={colorUI.brown}>Brown</Button>
      <Button inverted colorUI={colorUI.grey}>Grey</Button>
      <Button inverted colorUI={colorUI.black}>Black</Button>
    </div> <br/><br/>
    <h2>Variants</h2>
    <Button primary>primary</Button>
    <Button secondary>secondary</Button>
    <Button negative>negative</Button>
    <Button positive>positive</Button>
    <h2>Colored</h2>
    <Button>Standard</Button>
    <Button colorUI={colorUI.red}>Red</Button>
    <Button colorUI={colorUI.orange}>Orange</Button>
    <Button colorUI={colorUI.yellow}>Yellow</Button>
    <Button colorUI={colorUI.olive}>Olive</Button>
    <Button colorUI={colorUI.green}>Green</Button>
    <Button colorUI={colorUI.teal}>Teal</Button>
    <Button colorUI={colorUI.blue}>Blue</Button>
    <Button colorUI={colorUI.violet}>Violet</Button>
    <Button colorUI={colorUI.purple}>Purple</Button>
    <Button colorUI={colorUI.pink}>Pink</Button>
    <Button colorUI={colorUI.brown}>Brown</Button>
    <Button colorUI={colorUI.grey}>Grey</Button>
    <Button colorUI={colorUI.black}>Black</Button> <br/><br/>
    <h2>Floated</h2>
    <Button floated={floated.leftFloated}>Left</Button><Button floated={floated.rightFloated}>Right</Button> <br/><br/>
    <h2>Size</h2>
    <Button size={size.mini}>mini</Button>
    <Button size={size.tiny}>tiny</Button>
    <Button size={size.small}>small</Button>
    <Button size={size.medium}>medium</Button>
    <Button size={size.large}>large</Button>
    <Button size={size.big}>big</Button>
    <Button size={size.huge}>huge</Button>
    <Button size={size.massive}>massive</Button>
    <h2>Compact</h2>
    <Button compact>Compact</Button>
    <ButtonIcon compact iconUI={iconUI.user}>Compact</ButtonIcon>
    <Button labeled hasIcon><Icon iconUI={iconUI.user} />Add Friend</Button>
    <h2>Active</h2>
    <Button activeUI>Active</Button>
    <h2>Disabled</h2>
    <Button disabled>Disabled</Button>
    <h2>Loading</h2>
    <Button loading>Loading</Button><Button loading basic>Loading</Button><Button loading primary>Loading</Button><Button loading secondary>Loading</Button>

  </div>;
}

export const ButtonAnimatedTest: ui.StatelessComponent<ui.IProps> = props => {
  return <div>
    <h1>ButtonAnimated</h1>
    <ButtonAnimated colorUI={colorUI.olive} animateTo={{ animate: animate.fade, to: <b>hidden</b> }} onClick={ev => alert('click') }>visible</ButtonAnimated> <br/><br/>
    <ButtonAnimated colorUI={colorUI.pink} basic animateTo={{ animate: animate.vertical, to: 'hidden' }}>visible</ButtonAnimated> <br/><br/>
    <ButtonAnimated circular animateTo={{ to: 'hidden' }}>visible</ButtonAnimated> <br/><br/>
  </div>;
}

export const ButtonLabeledTest: ui.StatelessComponent<ui.IProps> = props => {
  return <div>
    <h1>ButtonLabeled</h1>
    <ButtonLabeled pointing colorUI={colorUI.blue} labelUI={<Label basic colorUI={colorUI.blue}>2.048</Label>}><Icon iconUI={iconUI.heart}/> Like</ButtonLabeled> <br/><br/>
    <ButtonLabeled left labelUI={<Label basic><Icon iconUI={iconUI.heart}/></Label>}> Left</ButtonLabeled> <br/> <br/>
    <ButtonLabeled left pointing labelUI={<Label basic>2.048</Label>}> Left Pointing</ButtonLabeled> <br/> <br/>
    <Button labeled hasIcon><Icon iconUI={iconUI.user} />Add Friend</Button>
  </div >;
}

export const ButtonIconTest: ui.StatelessComponent<ui.IProps> = props => {
  return <div>
    <h1>ButtonIcon</h1>
    <ButtonIcon iconLabel={iconLabel.right} basic colorUI={colorUI.teal} iconUI={iconUI.user}>Add Friend</ButtonIcon> <br/><br/>
    <ButtonIcon iconLabel={iconLabel.left} colorUI={colorUI.orange} iconUI={iconUI.user}>Add Friend</ButtonIcon> <br/><br/>
    <ButtonIcon colorUI={colorUI.pink} iconUI={iconUI.user}></ButtonIcon> <br/><br/>
  </div>;
}

export const ButtonsTest: ui.StatelessComponent<ui.IProps> = props => {
  return <div>
    <h1>Buttons</h1>
    <Buttons><Button>One</Button><Button>Two</Button><Button>Three</Button></Buttons><br/><br/>
    <Buttons hasIcon><ButtonIcon iconUI={iconUI.alignLeft}/><ButtonIcon iconUI={iconUI.alignRight}/><ButtonIcon iconUI={iconUI.alignCenter}/></Buttons><br/><br/>
    <Buttons vertical><Button>One</Button><Button>Two</Button><Button>Three</Button></Buttons><br/><br/>
    <Buttons vertical labeled hasIcon>
      <Button><Icon iconUI={iconUI.user} />Add Friend</Button>
      <Button><Icon iconUI={iconUI.user} />Add Friend</Button>
    </Buttons><br/><br/>
    <Buttons eqWidth={eqWidth.three}><Button>One</Button><Button>Two</Button><Button>Three</Button></Buttons><br/><br/>
    <Buttons colorUI={colorUI.green}><Button>One</Button> <Button>Two</Button> <Button>Three</Button></Buttons><br/><br/>
    <Buttons basic><Button>One</Button><Button>Two</Button><Button>Three</Button></Buttons><br/><br/>
    <Buttons basic vertical><Button>One</Button><Button>Two</Button><Button>Three</Button></Buttons><br/><br/>
    <Buttons size={size.huge}> <Button>One</Button> <Button>Two</Button> <Button>Three</Button></Buttons><br/><br/>
    <Buttons hasIcon size={size.small}> <ButtonIcon iconUI={iconUI.alignLeft}/> <ButtonIcon iconUI={iconUI.alignRight}/> <ButtonIcon iconUI={iconUI.alignCenter}/></Buttons><br/><br/>
  </div>;
};

export const ButtonSocialTest: ui.StatelessComponent<ui.IProps> = props => {
  return <div>
    <h1>Social</h1>
    <ButtonSocial social={social.facebook}/>
    <ButtonSocial social={social.googlePlus}/>
    <ButtonSocial social={social.instagram}/>
    <ButtonSocial social={social.linkedin}/>
    <ButtonSocial social={social.twitter}/>
    <ButtonSocial social={social.vk}/>
    <ButtonSocial social={social.youtube}/>
  </div>;
};
