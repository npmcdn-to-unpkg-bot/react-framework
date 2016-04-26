import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as ui from '../common/lib';
import {
  Button, ButtonProps, buttonPropsDescr,
  ButtonAnimatedProps, buttonAnimatedPropsDescr, animate, animateTo,
  ButtonLabeledProps, buttonLabeledPropsDescr,
  ButtonIconProps, buttonIconPropsDescr, 
  ButtonSocialProps, buttonSocialPropsDescr, social,
  ButtonsProps, buttonsPropsDescr, eqWidth,
  LabelProps, IconProps
} from '../common/generated';
import { Label, Icon} from '../common/exports';

//******************* ButtonAnimated
export const ButtonAnimated: ui.StatelessComponent<ButtonAnimatedProps> = pr => {
  let props = ui.enumValToProp(pr);
  let projection = ui.projection(props, buttonAnimatedPropsDescr);
  let initCls = ['ui animated button', ui.enumToClass<animate>(animate, props.$animateTo.animate)];
  let rest = ui.propsToClasses(initCls, projection);
  return <button {...rest}>
    <div className="visible content">{props.children}</div>
    <div className="hidden content">{props.$animateTo.to}</div>
  </button>;
}

//****************** ButtonLabeled
export const ButtonLabeled: ui.StatelessComponent<ButtonLabeledProps> = pr => {
  let props = ui.enumValToProp(pr);
  //button
  let projection = ui.projection(props, buttonPropsDescr);
  let btn = <Button {...ui.propsToClasses(null, projection) }/>;
  //kopie a uprava label props
  let labelProps: LabelProps = Object.assign({}, props.$label.props);
  if (props.$pointing)
    if (props.$left) labelProps.$pointingRight = true; else labelProps.$pointingLeft = true;
  labelProps.$outerTag = 'a';
  let label = <Label {...labelProps}/>;
  //result
  let initCls = classNames(['ui', { left: props.$left }, 'labeled button']);
  return <div className={initCls}>
    {props.$left ? [label, btn] : [btn, label]}
  </div>
};

//******************* ButtonIcon

export const ButtonIcon: ui.StatelessComponent<ButtonIconProps> = pr => {
  let props = ui.enumValToProp(pr); 
  let hasText = React.Children.count(pr.children)>0;
  let rest = ui.propsToClasses(['ui icon button', hasText ? { right: !props.$left} : null, hasText ? 'labeled' : null/*props.$IconLabel ? 'labeled' : null, 'icon button'*/], ui.projection(props, buttonPropsDescr));
  let iconProps: IconProps = { $Icon: pr.$Icon };
  //if (!props.$left) iconProps.className = 'right';
  let icon = <Icon {...iconProps}/>
  return <button {...rest}>
    {icon} {props.children}
  </button>;
}

//******************* Buttons
export const Buttons: ui.StatelessComponent<ButtonsProps> = pr => {
  let props = ui.enumValToProp(pr);
  let rest = ui.propsToClasses(['ui buttons', { icon: props.$hasIcon }], ui.projection(props, buttonsPropsDescr));
  return <div {...rest}/>;
};

//******************* Social
export const ButtonSocial: ui.StatelessComponent<ButtonSocialProps> = pr => {
  let props = ui.enumValToProp(pr);
  let rest = ui.propsToClasses(['ui button'], ui.projection(props, buttonSocialPropsDescr));
  let label = '';
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
  let socClass = classNames(['icon', new ui.enumConverter<social>(social, social.$facebook).convert(null, props.$Social)]);
  return <div {...rest}>
    <i className={socClass}/>
    {label}
  </div>;
};
