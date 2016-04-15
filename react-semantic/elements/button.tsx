import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as ui from '../exports';
import {Label, pointing, corner, attachedLabel, circular} from '../exports';
import {Icon, iconUI, colorUI, size} from '../exports';

export enum state {
  standard,
  active,
  disabled,
  loading
}
export enum floated {
  no,
  leftFloated,
  rightFloated
}
export enum attachedButton {
  no,
  leftAttached,
  rightAttached,
  topAttached,
  bottomAttached
}
export interface ButtonProps extends ui.IProps {
  colorUI?: colorUI;
  size?: ui.size;
  state?: state;
  floated?: floated;
  attached?: attachedButton;
  basic?: boolean;
  inverted?: boolean;
  compact?: boolean;
  //toggle?: boolean;
  fluid?: boolean;
  circular?: boolean;
  labeled?: boolean;
  hasIcon?: boolean;
  activeUI?: boolean;
  loading?: boolean,
  primary?: boolean,
  secondary?: boolean,
  positive?: boolean,
  negative?: boolean,
}
var buttonPropsDescr = ui.createDescr<ButtonProps>(val => {
  return {
    colorUI: new ui.enumConverter<colorUI>(colorUI, val.colorUI),
    size: new ui.enumConverter<ui.size>(ui.size, val.size),
    state: new ui.enumConverter<state>(state, val.state),
    floated: new ui.enumConverter<floated>(floated, val.floated),
    basic: new ui.boolConverter(val.basic),
    inverted: new ui.boolConverter(val.inverted),
    compact: new ui.boolConverter(val.compact),
    //toggle: new ui.boolConverter(val.toggle),
    fluid: new ui.boolConverter(val.fluid),
    circular: new ui.boolConverter(val.circular),
    labeled: new ui.boolConverter(val.labeled),
    loading: new ui.boolConverter(val.loading),
    primary: new ui.boolConverter(val.primary),
    secondary: new ui.boolConverter(val.secondary),
    positive: new ui.boolConverter(val.positive),
    negative: new ui.boolConverter(val.negative),
    activeUI: null,
    hasIcon: null
  };
});
export const Button: ui.StatelessComponent<ButtonProps> = props => {
  var rest = ui.propsToClasses(['ui button', { icon: props.hasIcon, active: props.activeUI }], ui.projection(props, buttonPropsDescr));
  return <button {...rest}/>;
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
  return <button {...rest}>
    <div className="visible content">{props.children}</div>
    <div className="hidden content">{props.animateTo.to}</div>
  </button>;
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
    pointing: null,
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
var buttonIconDescr = ui.createDescr<ButtonIconProps>(val => {
  return {
    iconUI: null, //new ui.enumConverter<iconUI>(iconUI, val.iconUI),
    iconLabel: null
  }
}, buttonPropsDescr);
export const ButtonIcon: ui.StatelessComponent<ButtonIconProps> = props => {
  var rest = ui.propsToClasses(['ui', { right: props.iconLabel === iconLabel.right }, props.iconLabel ? 'labeled' : null, 'icon button'], ui.projection(props, buttonPropsDescr));
  var iconProps: ui.IconProps = { iconUI: props.iconUI };
  if (props.iconLabel == iconLabel.right) iconProps.className = 'right';
  var icon = <Icon {...iconProps}/>
  return <button {...rest}>
    {icon} {props.children}
  </button>;
}

//******************* Buttons
export enum eqWidth {
  two,
  three,
  four,
  five,
  six,
  seven,
  eight,
  nine,
  ten,
  eleven,
  twelve
}

export interface ButtonsProps extends ui.IProps {
  vertical?: boolean;
  labeled?: boolean;
  basic?: boolean;
  hasIcon?: boolean;
  eqWidth?: eqWidth;
  colorUI?: colorUI;
  size?: size;
}
var buttonsPropsDescr = ui.createDescr<ButtonsProps>(val => {
  return {
    vertical: new ui.boolConverter(val.vertical),
    labeled: new ui.boolConverter(val.labeled),
    basic: new ui.boolConverter(val.basic),
    hasIcon: null, //osetri se rucne
    eqWidth: new ui.enumConverter<eqWidth>(eqWidth, val.eqWidth),
    colorUI: new ui.enumConverter<colorUI>(colorUI, val.colorUI),
    size: new ui.enumConverter<size>(size, val.size),
  }
});

export const Buttons: ui.StatelessComponent<ButtonsProps> = props => {
  var rest = ui.propsToClasses(['ui buttons', { icon: props.hasIcon }], ui.projection(props, buttonsPropsDescr));
  return <div {...rest}/>;
};

//******************* Social
export enum social {
  facebook,
  twitter,
  googlePlus,
  vk,
  linkedin,
  instagram,
  youtube
}
export interface ButtonSocialProps extends ButtonProps {
  social: social;
}
var buttonSocialPropsDescr = ui.createDescr<ButtonSocialProps>(val => {
  return {
    social: new ui.enumConverter<social>(social, val.social),
  }
});

export const ButtonSocial: ui.StatelessComponent<ButtonSocialProps> = props => {
  var rest = ui.propsToClasses(['ui button'], ui.projection(props, buttonSocialPropsDescr));
  var label = '';
  switch (props.social) {
    case social.facebook: label = 'Facebook'; break;
    case social.twitter: label = 'Twitter'; break;
    case social.googlePlus: label = 'Google Plus'; break;
    case social.vk: label = 'VK'; break;
    case social.linkedin: label = 'Linked In'; break;
    case social.instagram: label = 'Instagram'; break;
    case social.youtube: label = 'YouTube'; break;
  }
  var socClass = classNames(['icon', new ui.enumConverter<social>(social, social.facebook).convert(null, props.social)]);
  return <div {...rest}>
    <i className={socClass}/>
    {label}
  </div>;
};
