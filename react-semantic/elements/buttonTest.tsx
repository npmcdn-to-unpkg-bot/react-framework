import * as React from 'react';
import * as ReactDOM from 'react-dom';

import {
  colorUI, size,
  Button, ButtonAnimated, ButtonLabeled, colorButton, state, social, floated, attachedButton, animate,
  Label, pointing, corner, attachedLabel, circular,
  Icon, iconUI
} from '../exports';

import * as ui from '../exports';

export const ButtonTest: ui.StatelessComponent<ui.IProps> = props => {
  return <div>
    <h1>Button</h1>
    <Button onClick={ev => alert('click') }>Follow</Button> <br/><br/>
    <Button tabIndex={0}>Focusable</Button> <br/><br/>
    <Button basic={true}><Icon iconUI={iconUI.user} />Add Friend</Button> <br/><br/>
    <Button basic={true}>Standard</Button>
    <Button basic={true} colorUI={colorButton.red}>Red</Button>
    <Button basic={true} colorUI={colorButton.orange}>Orange</Button>
    <Button basic={true} colorUI={colorButton.yellow}>Yellow</Button>
    <Button basic={true} colorUI={colorButton.olive}>Olive</Button>
    <Button basic={true} colorUI={colorButton.green}>Green</Button>
    <Button basic={true} colorUI={colorButton.teal}>Teal</Button>
    <Button basic={true} colorUI={colorButton.blue}>Blue</Button>
    <Button basic={true} colorUI={colorButton.violet}>Violet</Button>
    <Button basic={true} colorUI={colorButton.purple}>Purple</Button>
    <Button basic={true} colorUI={colorButton.pink}>Pink</Button>
    <Button basic={true} colorUI={colorButton.brown}>Brown</Button>
    <Button basic={true} colorUI={colorButton.grey}>Grey</Button>
    <Button basic={true} colorUI={colorButton.black}>Black</Button> <br/><br/>
    <div className="ui inverted segment">
      <Button inverted={true}>Standard</Button>
      <Button inverted={true} colorUI={colorButton.red}>Red</Button>
      <Button inverted={true} colorUI={colorButton.orange}>Orange</Button>
      <Button inverted={true} colorUI={colorButton.yellow}>Yellow</Button>
      <Button inverted={true} colorUI={colorButton.olive}>Olive</Button>
      <Button inverted={true} colorUI={colorButton.green}>Green</Button>
      <Button inverted={true} colorUI={colorButton.teal}>Teal</Button>
      <Button inverted={true} colorUI={colorButton.blue}>Blue</Button>
      <Button inverted={true} colorUI={colorButton.violet}>Violet</Button>
      <Button inverted={true} colorUI={colorButton.purple}>Purple</Button>
      <Button inverted={true} colorUI={colorButton.pink}>Pink</Button>
      <Button inverted={true} colorUI={colorButton.brown}>Brown</Button>
      <Button inverted={true} colorUI={colorButton.grey}>Grey</Button>
      <Button inverted={true} colorUI={colorButton.black}>Black</Button>
    </div> <br/><br/>
    <Button colorUI={colorButton.negative}>negative</Button>
    <Button colorUI={colorButton.positive}>positive</Button>
    <Button colorUI={colorButton.primary}>primary</Button>
    <Button colorUI={colorButton.secondary}>secondary</Button>
    <Button>Standard</Button>
    <Button colorUI={colorButton.red}>Red</Button>
    <Button colorUI={colorButton.orange}>Orange</Button>
    <Button colorUI={colorButton.yellow}>Yellow</Button>
    <Button colorUI={colorButton.olive}>Olive</Button>
    <Button colorUI={colorButton.green}>Green</Button>
    <Button colorUI={colorButton.teal}>Teal</Button>
    <Button colorUI={colorButton.blue}>Blue</Button>
    <Button colorUI={colorButton.violet}>Violet</Button>
    <Button colorUI={colorButton.purple}>Purple</Button>
    <Button colorUI={colorButton.pink}>Pink</Button>
    <Button colorUI={colorButton.brown}>Brown</Button>
    <Button colorUI={colorButton.grey}>Grey</Button>
    <Button colorUI={colorButton.black}>Black</Button> <br/><br/>
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
    <ButtonLabeled left pointing labelUI={<Label basic>2.048</Label>}></ButtonLabeled> <br/> <br/>
  </div >;
}
