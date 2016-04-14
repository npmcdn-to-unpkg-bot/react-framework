import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as ui from '../exports';

export const ButtonTest: ui.StatelessComponent<ui.IProps> = props => {
  return <div>
    <h1>Button</h1>
    <ui.Button onClick={ev => alert('click') }>Follow</ui.Button> <br/><br/>
    <ui.Button tabIndex={0}>Focusable</ui.Button> <br/><br/>
    <ui.Button basic={true}><ui.Icon iconId={ui.iconId.user} />Add Friend</ui.Button> <br/><br/>
    <ui.Button basic={true}>Standard</ui.Button>
    <ui.Button basic={true} colorId={ui.colorButton.red}>Red</ui.Button>
    <ui.Button basic={true} colorId={ui.colorButton.orange}>Orange</ui.Button>
    <ui.Button basic={true} colorId={ui.colorButton.yellow}>Yellow</ui.Button>
    <ui.Button basic={true} colorId={ui.colorButton.olive}>Olive</ui.Button>
    <ui.Button basic={true} colorId={ui.colorButton.green}>Green</ui.Button>
    <ui.Button basic={true} colorId={ui.colorButton.teal}>Teal</ui.Button>
    <ui.Button basic={true} colorId={ui.colorButton.blue}>Blue</ui.Button>
    <ui.Button basic={true} colorId={ui.colorButton.violet}>Violet</ui.Button>
    <ui.Button basic={true} colorId={ui.colorButton.purple}>Purple</ui.Button>
    <ui.Button basic={true} colorId={ui.colorButton.pink}>Pink</ui.Button>
    <ui.Button basic={true} colorId={ui.colorButton.brown}>Brown</ui.Button>
    <ui.Button basic={true} colorId={ui.colorButton.grey}>Grey</ui.Button>
    <ui.Button basic={true} colorId={ui.colorButton.black}>Black</ui.Button> <br/><br/>
    <div className="ui inverted segment">
      <ui.Button inverted={true}>Standard</ui.Button>
      <ui.Button inverted={true} colorId={ui.colorButton.red}>Red</ui.Button>
      <ui.Button inverted={true} colorId={ui.colorButton.orange}>Orange</ui.Button>
      <ui.Button inverted={true} colorId={ui.colorButton.yellow}>Yellow</ui.Button>
      <ui.Button inverted={true} colorId={ui.colorButton.olive}>Olive</ui.Button>
      <ui.Button inverted={true} colorId={ui.colorButton.green}>Green</ui.Button>
      <ui.Button inverted={true} colorId={ui.colorButton.teal}>Teal</ui.Button>
      <ui.Button inverted={true} colorId={ui.colorButton.blue}>Blue</ui.Button>
      <ui.Button inverted={true} colorId={ui.colorButton.violet}>Violet</ui.Button>
      <ui.Button inverted={true} colorId={ui.colorButton.purple}>Purple</ui.Button>
      <ui.Button inverted={true} colorId={ui.colorButton.pink}>Pink</ui.Button>
      <ui.Button inverted={true} colorId={ui.colorButton.brown}>Brown</ui.Button>
      <ui.Button inverted={true} colorId={ui.colorButton.grey}>Grey</ui.Button>
      <ui.Button inverted={true} colorId={ui.colorButton.black}>Black</ui.Button>
    </div> <br/><br/>
    <ui.Button colorId={ui.colorButton.negative}>negative</ui.Button>
    <ui.Button colorId={ui.colorButton.positive}>positive</ui.Button>
    <ui.Button colorId={ui.colorButton.primary}>primary</ui.Button>
    <ui.Button colorId={ui.colorButton.secondary}>secondary</ui.Button>
    <ui.Button>Standard</ui.Button>
    <ui.Button colorId={ui.colorButton.red}>Red</ui.Button>
    <ui.Button colorId={ui.colorButton.orange}>Orange</ui.Button>
    <ui.Button colorId={ui.colorButton.yellow}>Yellow</ui.Button>
    <ui.Button colorId={ui.colorButton.olive}>Olive</ui.Button>
    <ui.Button colorId={ui.colorButton.green}>Green</ui.Button>
    <ui.Button colorId={ui.colorButton.teal}>Teal</ui.Button>
    <ui.Button colorId={ui.colorButton.blue}>Blue</ui.Button>
    <ui.Button colorId={ui.colorButton.violet}>Violet</ui.Button>
    <ui.Button colorId={ui.colorButton.purple}>Purple</ui.Button>
    <ui.Button colorId={ui.colorButton.pink}>Pink</ui.Button>
    <ui.Button colorId={ui.colorButton.brown}>Brown</ui.Button>
    <ui.Button colorId={ui.colorButton.grey}>Grey</ui.Button>
    <ui.Button colorId={ui.colorButton.black}>Black</ui.Button> <br/><br/>
  </div>;
}

export const ButtonAnimatedTest: ui.StatelessComponent<ui.IProps> = props => {
  return <div>
    <h1>ButtonAnimated</h1>
    <ui.ButtonAnimated animateTo={{ animate: ui.animate.fade, to: 'hidden' }} onClick={ev => alert('click') }>visible</ui.ButtonAnimated> <br/><br/>
    <ui.ButtonAnimated animateTo={{ animate: ui.animate.vertical, to: 'hidden' }}>visible</ui.ButtonAnimated> <br/><br/>
    <ui.ButtonAnimated animateTo={{ to: 'hidden' }}>visible</ui.ButtonAnimated> <br/><br/>
  </div>;
}
