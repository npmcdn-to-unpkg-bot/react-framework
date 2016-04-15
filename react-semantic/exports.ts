export {
StatelessComponent, enumToClass, propConverter, boolConverter, enumConverter, TPropsDescr, IProps, createDescr, propsToClasses, color, size, projection,
IPropsColor, enumValToProp, IPropsSize, registerEnum
} from './lib';
export {Label, LabelProps, pointing, corner, attachedLabel, circular} from './elements/label';
export {
Button, state, floated, attachedButton, 
ButtonLabeled, ButtonLabeledProps,
ButtonIcon, iconLabel,
ButtonAnimated, animate, animateTo,
ButtonSocial, social,
Buttons, eqWidth
} from './elements/button';
export {ButtonTest, ButtonAnimatedTest, ButtonLabeledTest, ButtonIconTest, ButtonsTest, ButtonSocialTest} from './elements/buttonTest';
export {Icon, icon, IconProps} from './elements/icon';
export {IconTest} from './elements/iconTest';
export {LabelTest} from './elements/labelTest';
export {Segment} from './elements/segment';


import {
  color, size,
  Button, ButtonAnimated, ButtonLabeled, ButtonIcon, Buttons, ButtonSocial, state, social, floated, attachedButton, animate, iconLabel, eqWidth,
  Label, pointing, corner, attachedLabel, circular,
  Icon, icon,

  ButtonTest, ButtonAnimatedTest, ButtonLabeledTest, ButtonIconTest, IconTest, ButtonsTest, ButtonSocialTest, LabelTest
} from './exports';