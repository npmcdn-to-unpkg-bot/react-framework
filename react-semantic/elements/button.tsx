import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as ui from '../exports';
import {Label, pointing, corner, attachedLabel, circular} from '../exports';
import {Icon, icon, color, size} from '../exports';

export enum state {
  $standard,
  $active,
  $disabled,
  $loading
}
ui.registerEnum(state, '$State');
export interface IPropsState {
  $active?: boolean;
  $disabled?: boolean;
  $loading?: boolean;
}
export enum floated {
  no,
  $floatedLeft,
  $floatedRight
}
ui.registerEnum(floated, '$Floated');
export interface IPropsFloated {
  $floatedLeft?: boolean;
  $floatedRight?: boolean;
}
export enum attachedButton {
  no,
  $attachedTop,
  $attachedBottom,
  $attachedLeft,
  $attachedRight,
}
ui.registerEnum(attachedButton, '$Attached');
export interface IPropsAttached {
  $attachedTop?: boolean;
  $attachedBottom?: boolean;
  $attachedLeft?: boolean;
  $attachedRight?: boolean;
}
export interface ButtonProps extends ui.IProps, IPropsAttached, IPropsFloated, IPropsState, ui.IPropsColor, ui.IPropsSize {
  $Color?: color;
  $Size?: ui.size;
  $State?: state;
  $Floated?: floated;
  $Attached?: attachedButton;

  $basic?: boolean;
  $inverted?: boolean;
  $compact?: boolean;
  //toggle?: boolean; !!! TODO
  $fluid?: boolean;
  $circular?: boolean;
  $labeled?: boolean;
  $hasIcon?: boolean;
  $active?: boolean;
  $loading?: boolean,
  $primary?: boolean,
  $secondary?: boolean,
  $positive?: boolean,
  $negative?: boolean,
}
var buttonPropsDescr = ui.createDescr<ButtonProps>(val => {
  return {
    $Color: new ui.enumConverter<color>(color, val.$Color),
    $Size: new ui.enumConverter<ui.size>(ui.size, val.$Size),
    $State: new ui.enumConverter<state>(state, val.$State),
    $Floated: new ui.enumConverter<floated>(floated, val.$Floated),

    $basic: new ui.boolConverter(val.$basic),
    $inverted: new ui.boolConverter(val.$inverted),
    $compact: new ui.boolConverter(val.$compact),
    //toggle: new ui.boolConverter(val.toggle),
    $fluid: new ui.boolConverter(val.$fluid),
    $circular: new ui.boolConverter(val.$circular),
    $labeled: new ui.boolConverter(val.$labeled),
    $loading: new ui.boolConverter(val.$loading),
    $primary: new ui.boolConverter(val.$primary),
    $secondary: new ui.boolConverter(val.$secondary),
    $positive: new ui.boolConverter(val.$positive),
    $negative: new ui.boolConverter(val.$negative),
    $active: null,
    $hasIcon: null
  };
});
export const Button: ui.StatelessComponent<ButtonProps> = pr => {
  var props = ui.enumValToProp(pr);
  var rest = ui.propsToClasses(['ui button', { icon: props.$hasIcon, active: props.$active }], ui.projection(props, buttonPropsDescr));
  return <button {...rest}/>;
}

//******************* ButtonAnimated
export enum animate { standard, vertical, fade }

export interface animateTo {
  animate?: animate;
  to: React.ReactNode;
}

export interface ButtonAnimatedProps extends ButtonProps {
  $animateTo: animateTo;
}

var buttonAnimatePropsDescr = ui.createDescr<ButtonAnimatedProps>(val => {
  return { //animateTo a children se zpracovavaji jinak
    $animateTo: null,
    children: null
  };
}, buttonPropsDescr);

export const ButtonAnimated: ui.StatelessComponent<ButtonAnimatedProps> = pr => {
  var props = ui.enumValToProp(pr);
  var projection = ui.projection(props, buttonAnimatePropsDescr);
  var initCls = ['ui animated button', ui.enumToClass<animate>(animate, props.$animateTo.animate)];
  var rest = ui.propsToClasses(initCls, projection);
  return <button {...rest}>
    <div className="visible content">{props.children}</div>
    <div className="hidden content">{props.$animateTo.to}</div>
  </button>;
}

//****************** ButtonLabeled
export interface ButtonLabeledProps extends ButtonProps {
  $label: React.ReactElement<ui.LabelProps>;
  $left?: boolean;
  $pointing?: boolean;
}
var buttonLabeledDescr = ui.createDescr<ButtonProps>(val => {
  return { //props se zpracovavaji rucne
    $label: null,
    $left: null,
    $pointing: null,
  };
}, buttonPropsDescr);

export const ButtonLabeled: ui.StatelessComponent<ButtonLabeledProps> = pr => {
  var props = ui.enumValToProp(pr);
  //button
  var projection = ui.projection(props, buttonPropsDescr);
  var btn = <Button {...ui.propsToClasses(null, projection) }/>;
  //kopie a uprava label props
  var labelProps: ui.LabelProps = Object.assign({}, props.$label.props);
  if (props.$pointing)
    if (props.$left) labelProps.$pointingRight = true; else labelProps.$pointingLeft = true;
  labelProps.$outerTag = 'a';
  var label = <Label {...labelProps}/>;
  //result
  var initCls = classNames(['ui', { left: props.$left }, 'labeled button']);
  return <div className={initCls}>
    {props.$left ? [label, btn] : [btn, label]}
  </div>
};

//******************* ButtonIcon
export enum iconLabel { no, iconLabelRight, iconLabelLeft }
ui.registerEnum(iconLabel, '$IconLabel');
export interface IPropsIconLabel {
  $iconLabelRight?: boolean;
  $iconLabelLeft?: boolean;
}

export interface ButtonIconProps extends ButtonProps, IPropsIconLabel {
  $Icon: icon;
  $IconLabel?: iconLabel;
}
var buttonIconDescr = ui.createDescr<ButtonIconProps>(val => {
  return {
    $Icon: null,
    $IconLabel: null
  }
}, buttonPropsDescr);
export const ButtonIcon: ui.StatelessComponent<ButtonIconProps> = pr => {
  var props = ui.enumValToProp(pr);
  var rest = ui.propsToClasses(['ui', { right: props.$iconLabelRight }, props.$IconLabel ? 'labeled' : null, 'icon button'], ui.projection(props, buttonPropsDescr));
  var iconProps: ui.IconProps = { $Icon: pr.$Icon };
  if (props.$IconLabel == iconLabel.iconLabelRight) iconProps.className = 'right';
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

export interface ButtonsProps extends ui.IProps, ui.IPropsColor, ui.IPropsSize {
  $vertical?: boolean;
  $labeled?: boolean;
  $basic?: boolean;
  $hasIcon?: boolean;
  $EqWidth?: eqWidth;
  $Color?: color;
  $Size?: size;
}
var buttonsPropsDescr = ui.createDescr<ButtonsProps>(val => {
  return {
    $vertical: new ui.boolConverter(val.$vertical),
    $labeled: new ui.boolConverter(val.$labeled),
    $basic: new ui.boolConverter(val.$basic),
    $hasIcon: null, //osetri se rucne

    $EqWidth: new ui.enumConverter<eqWidth>(eqWidth, val.$EqWidth),
    $Color: new ui.enumConverter<color>(color, val.$Color),
    $Size: new ui.enumConverter<size>(size, val.$Size),
  }
});

export const Buttons: ui.StatelessComponent<ButtonsProps> = pr => {
  var props = ui.enumValToProp(pr);
  var rest = ui.propsToClasses(['ui buttons', { icon: props.$hasIcon }], ui.projection(props, buttonsPropsDescr));
  return <div {...rest}/>;
};

//******************* Social
export enum social {
  $facebook,
  $twitter,
  $googlePlus,
  $vk,
  $linkedin,
  $instagram,
  $youtube
}
export interface ButtonSocialProps extends ButtonProps {
  $Social: social;
}
var buttonSocialPropsDescr = ui.createDescr<ButtonSocialProps>(val => {
  return {
    $Social: new ui.enumConverter<social>(social, val.$Social),
  }
});

export const ButtonSocial: ui.StatelessComponent<ButtonSocialProps> = pr => {
  var props = ui.enumValToProp(pr);
  var rest = ui.propsToClasses(['ui button'], ui.projection(props, buttonSocialPropsDescr));
  var label = '';
  switch (props.$Social) {
    case social.$facebook: label = 'Facebook'; break;
    case social.$twitter: label = 'Twitter'; break;
    case social.$googlePlus: label = 'Google Plus'; break;
    case social.$vk: label = 'VK'; break;
    case social.$linkedin: label = 'Linked In'; break;
    case social.$instagram: label = 'Instagram'; break;
    case social.$youtube: label = 'YouTube'; break;
  }
  var socClass = classNames(['icon', new ui.enumConverter<social>(social, social.$facebook).convert(null, props.$Social)]);
  return <div {...rest}>
    <i className={socClass}/>
    {label}
  </div>;
};
