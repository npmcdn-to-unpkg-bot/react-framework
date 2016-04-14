import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as ui from '../exports';
import {Label, pointing, corner, attachedLabel, circular} from '../exports';
import {Icon, iconUI} from '../exports';

export enum colorButton {
  standard,
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
  black,
  primary,
  secondary,
  positive,
  negative,
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
export enum attachedButton {
  no,
  leftAttached,
  rightAttached,
  topAttached,
  bottomAttached
}
export interface ButtonProps extends ui.IProps {
  colorUI?: colorButton;
  size?: ui.size;
  state?: state;
  social?: social;
  floated?: floated;
  attached?: attachedButton;
  basic?: boolean;
  inverted?: boolean;
  compact?: boolean;
  toogle?: boolean;
  fluid?: boolean;
  circular?: boolean;
}
var buttonPropsDescr = ui.createDescr<ButtonProps>(val => {
  return {
    colorUI: new ui.enumConverter<colorButton>(colorButton, val.colorUI),
    size: new ui.enumConverter<ui.size>(ui.size, val.size),
    state: new ui.enumConverter<state>(state, val.state),
    social: new ui.enumConverter<social>(social, val.social),
    floated: new ui.enumConverter<floated>(floated, val.floated),
    basic: new ui.boolConverter(val.basic),
    inverted: new ui.boolConverter(val.inverted),
    compact: new ui.boolConverter(val.compact),
    toogle: new ui.boolConverter(val.toogle),
    fluid: new ui.boolConverter(val.fluid),
    circular: new ui.boolConverter(val.circular),
  };
});
export const Button: ui.StatelessComponent<ButtonProps> = props => {
  var rest = ui.propsToClasses(['ui button'], ui.projection(props, buttonPropsDescr));
  return <div {...rest}/>;
}

//******************* ButtonAnimated
export enum animate { standard, vertical, fade }

export interface animateTo {
  animate?: animate;
  to: React.ReactNode;
}

export interface ButtonAnimatedProps extends ButtonProps {
  animateTo: animateTo;
}

var buttonAnimatePropsDescr = ui.createDescr<ButtonAnimatedProps>(val => {
  return { //animateTo a children se zpracovavaji jinak
    animateTo: null,
    children: null
  };
}, buttonPropsDescr);

export const ButtonAnimated: ui.StatelessComponent<ButtonAnimatedProps> = props => {
  var projection = ui.projection(props, buttonAnimatePropsDescr);
  var initCls = ['ui animated button', ui.enumToClass<animate>(animate, props.animateTo.animate)];
  var rest = ui.propsToClasses(initCls, projection);
  return <div {...rest}>
    <div className="visible content">{props.children}</div>
    <div className="hidden content">{props.animateTo.to}</div>
  </div>;
}

//****************** ButtonLabeled
export interface ButtonLabeledProps extends ButtonProps {
  labelUI: React.ReactElement<ui.LabelProps>;
  left?: boolean;
  pointing?: boolean;
}
var buttonLabeledDescr = ui.createDescr<ButtonProps>(val => {
  return { //props se zporacovavaji rucne
    labelElement: null,
    left: null,
    pointing:null,
  };
}, buttonPropsDescr);

export const ButtonLabeled: ui.StatelessComponent<ButtonLabeledProps> = props => {
  //button
  var projection = ui.projection(props, buttonPropsDescr);
  var btn = <Button {...ui.propsToClasses(null, projection) }/>;
  //kopie a uprava label props
  var labelProps: ui.LabelProps = Object.assign({}, props.labelUI.props); 
  if (props.pointing) labelProps.pointing = props.left ? ui.pointing.rightPointing : ui.pointing.leftPointing;
  labelProps.outerTag = 'a';
  var label = <Label {...labelProps}/>;
  //result
  var initCls = classNames(['ui', { left: props.left }, 'labeled button']);
  return <div className={initCls}>
    {props.left ? [label, btn] : [btn, label]}
  </div>
};

//******************* ButtonIcon
export enum iconLabel { no, right, left }
export interface ButtonIconProps extends ButtonProps {
  iconUI: iconUI;
  iconLabel?: iconLabel;
}

export class ButtonIcon extends React.Component<ButtonIconProps, any> {
}
//var buttonIconTest = <ButtonIcon icon={Icons.alarm} iconLabel={iconLabel.left} > Text</ButtonIcon>