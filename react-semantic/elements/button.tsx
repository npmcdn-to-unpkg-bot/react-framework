import * as React from 'react';
import * as ui from '../exports';


export enum colorButton {
  standard,
  primary,
  secondary,
  positive,
  negative,
  red,
  orange,
  yellow,
  olive,
  green,
  teal,
  blue,
  violet,
  purple,
  pink,
  brown,
  grey,
  black
}
export enum size {
  standard,
  mini,
  tiny,
  small,
  medium,
  large,
  big,
  huge,
  massive
}
export enum state {
  standard,
  active, 
  disabled,
  loading
}
export enum social {
  facebook,
  twitter,
  google,
  vk,
  linkedin,
  instagram,
  youtube
}
export enum floated {
  no,
  left, 
  right
}
export enum attached {
  no,
  left,
  right,
  top,
  bottom
}
export interface ButtonProps {
  color?: colorButton;
  size?: size;
  basic?: boolean;
  inverted?: boolean;
  compact?: boolean;
  state?: state;
  social?: social;
  floated?: floated;
  toogle?: boolean;
  fluid?: boolean;
  circular?: boolean;
  attached?: attached;
}
export class Button extends React.Component<ButtonProps, any> { }
var buttonTest = <Button basic={true} color={colorButton.standard}/>

//****************** ButtonLabeled
export interface labelButton {
  label: JSX.Element;
  pointing?: boolean;
  left?: boolean;
}

export interface ButtonLabeledProps extends ButtonProps {
  label: labelButton;
}

export class ButtonLabeled extends React.Component<ButtonLabeledProps, any> { }
var buttonLabeledTest = <ButtonLabeled label={{ left: true, pointing: true, label: <ui.Label/> }}>Text</ButtonLabeled>

//******************* ButtonAnimated
export enum animate { horizontal, vertical, fade }
export interface animateTo {
  animate?: animate;
  to: React.ReactNode;
}
export interface ButtonAnimatedProps extends ButtonProps {
  animateTo: animateTo;
}

export class ButtonAnimated extends React.Component<ButtonAnimatedProps, any> {
  render(): JSX.Element {
    return <div className='ui animated button'>
      <div className="visible content">{this.props.children}</div>
      <div className="hidden content">{this.props.animateTo.to}</div>
    </div>;
  }
}
var buttonAnimatedTest = <ButtonAnimated animateTo={{ animate: animate.fade, to: <a/> }}>Text</ButtonAnimated>

//******************* ButtonIcon
export enum iconLabel { no, right, left }
export interface ButtonIconProps extends ButtonProps {
  icon: ui.Icons;
  iconLabel?: iconLabel;
}

export class ButtonIcon extends React.Component<ButtonIconProps, any> { }
var buttonIconTest = <ButtonIcon icon={ui.Icons.alarm} iconLabel={iconLabel.left} > Text</ButtonIcon>


function convert(enumType) {
  for (var p in enumType) {
    var val = enumType[p]; if (typeof val !== 'string') continue;
  }
}