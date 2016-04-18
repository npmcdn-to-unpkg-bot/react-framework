import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as ui from '../lib';
import {
  Button, ButtonProps, buttonPropsDescr,
  ButtonAnimatedProps, buttonAnimatedPropsDescr, animate, animateTo,
  ButtonLabeledProps, buttonLabeledPropsDescr,
  ButtonIconProps, buttonIconPropsDescr, iconLabel,
  ButtonSocialProps, buttonSocialPropsDescr, social,
  ButtonsProps, buttonsPropsDescr, eqWidth,
  LabelProps, IconProps
} from '../generated';
import { Label, Icon} from '../exports';

//******************* ButtonAnimated
export const ButtonAnimated: ui.StatelessComponent<ButtonAnimatedProps> = pr => {
  var props = ui.enumValToProp(pr);
  var projection = ui.projection(props, buttonAnimatedPropsDescr);
  var initCls = ['ui animated button', ui.enumToClass<animate>(animate, props.$animateTo.animate)];
  var rest = ui.propsToClasses(initCls, projection);
  return <button {...rest}>
    <div className="visible content">{props.children}</div>
    <div className="hidden content">{props.$animateTo.to}</div>
  </button>;
}

//****************** ButtonLabeled
export const ButtonLabeled: ui.StatelessComponent<ButtonLabeledProps> = pr => {
  var props = ui.enumValToProp(pr);
  //button
  var projection = ui.projection(props, buttonPropsDescr);
  var btn = <Button {...ui.propsToClasses(null, projection) }/>;
  //kopie a uprava label props
  var labelProps: LabelProps = Object.assign({}, props.$label.props);
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

export const ButtonIcon: ui.StatelessComponent<ButtonIconProps> = pr => {
  var props = ui.enumValToProp(pr);
  var rest = ui.propsToClasses(['ui', { right: props.$iconLabelRight }, props.$IconLabel ? 'labeled' : null, 'icon button'], ui.projection(props, buttonPropsDescr));
  var iconProps: IconProps = { $Icon: pr.$Icon };
  if (props.$IconLabel == iconLabel.$iconLabelRight) iconProps.className = 'right';
  var icon = <Icon {...iconProps}/>
  return <button {...rest}>
    {icon} {props.children}
  </button>;
}

//******************* Buttons
export const Buttons: ui.StatelessComponent<ButtonsProps> = pr => {
  var props = ui.enumValToProp(pr);
  var rest = ui.propsToClasses(['ui buttons', { icon: props.$hasIcon }], ui.projection(props, buttonsPropsDescr));
  return <div {...rest}/>;
};

//******************* Social
export const ButtonSocial: ui.StatelessComponent<ButtonSocialProps> = pr => {
  var props = ui.enumValToProp(pr);
  var rest = ui.propsToClasses(['ui button'], ui.projection(props, buttonSocialPropsDescr));
  var label = '';
  //switch (social[props.$Social] as any) {
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
