import * as React from 'react';
import {htmlTags, registerEnum, createDescr, IProps, enumConverter, boolConverter, StatelessComponent, enumValToProp, propsToClasses, projection} from './lib';
import {icon, flag, flagShort} from './largeEnums';

//********* This code is generated - do not modify it!

//content for "import {} from '???/exports"'
/*
  icon, flag, flagShort, color, size, floated, aligned, column, deviceOnlyGrid, relaxed, textAligned, verticalAligned, attached, wide, 
  Button, attachedButton,
  ButtonAnimated,
  ButtonIcon,
  ButtonLabeled,
  Buttons, eqWidth,
  ButtonSocial, social,
  Container,
  Dimmer,
  Divider, divider,
  Field,
  Fields, eqWidthFields,
  Flag,
  Form, outerTagForm, stateForm, sizeForm,
  Header, sizeHeader, outerTagHeader, subHeader,
  CheckBox, type,
  Icon, flipped, rotated, circularIcon, bordered,
  Icons,
  Image, outerTagImage,
  Images,
  Input, iconInput, action, labeledInput,
  Label, pointing, corner, attachedLabel, circularLabel, ribbon,
  Labels,
  List,
  Loader,
  Message, stateMessage, sizeMessage,
  Modal, sizeModal,
  Rail,
  Reveal,
  Segment, raised, padded, emphasis,
  Segments, raisedSegments,
  Step,
  Ad,
  Card,
  Comment,
  Feed,
  Item,
  Statistic,
  Breadcrumb,
  Column, wideMobile, wideTablet, wideComputer, wideLargeScreen, wideWidescreen,
  Grid, divided, celled, paddedGrid,
  Menu,
  Row,
  Table
*/

//content for "export {} from '/.generated"'
/*
export {
  animate, animateTo, color, size, floated, aligned, column, deviceOnlyGrid, relaxed, textAligned, verticalAligned, attached, wide, 
  Button, ButtonProps, attachedButton,
  ButtonAnimatedProps,
  ButtonIconProps,
  ButtonLabeledProps,
  ButtonsProps, eqWidth,
  ButtonSocialProps, social,
  Container, ContainerProps,
  Dimmer, DimmerProps,
  Divider, DividerProps, divider,
  Field, FieldProps,
  Fields, FieldsProps, eqWidthFields,
  Flag, FlagProps,
  Form, FormProps, outerTagForm, stateForm, sizeForm,
  Header, HeaderProps, sizeHeader, outerTagHeader, subHeader,
  CheckBox, CheckBoxProps, type,
  Icon, IconProps, flipped, rotated, circularIcon, bordered,
  Icons, IconsProps,
  ImageProps, outerTagImage,
  Images, ImagesProps,
  Input, InputProps, iconInput, action, labeledInput,
  Label, LabelProps, pointing, corner, attachedLabel, circularLabel, ribbon,
  Labels, LabelsProps,
  ListProps,
  LoaderProps,
  Message, MessageProps, stateMessage, sizeMessage,
  Modal, ModalProps, sizeModal,
  RailProps,
  RevealProps,
  Segment, SegmentProps, raised, padded, emphasis,
  Segments, SegmentsProps, raisedSegments,
  StepProps,
  AdProps,
  CardProps,
  CommentProps,
  FeedProps,
  ItemProps,
  StatisticProps,
  BreadcrumbProps,
  Column, ColumnProps, wideMobile, wideTablet, wideComputer, wideLargeScreen, wideWidescreen,
  Grid, GridProps, divided, celled, paddedGrid,
  MenuProps,
  Row, RowProps,
  TableProps,
} from './generated';
*/

export interface IPropsIconProp { }

export enum color { no, $colRed, $colOrange, $colYellow, $colOlive, $colGreen, $colTeal, $colBlue, $colViolet, $colPurple, $colPink, $colBrown, $colGrey, $colBlack, }
registerEnum(color, '$Color', { $colRed: 'red', $colOrange: 'orange', $colYellow: 'yellow', $colOlive: 'olive', $colGreen: 'green', $colTeal: 'teal', $colBlue: 'blue', $colViolet: 'violet', $colPurple: 'purple', $colPink: 'pink', $colBrown: 'brown', $colGrey: 'grey', $colBlack: 'black' });
export interface IPropsColorProp { $colRed?: boolean; $colOrange?: boolean; $colYellow?: boolean; $colOlive?: boolean; $colGreen?: boolean; $colTeal?: boolean; $colBlue?: boolean; $colViolet?: boolean; $colPurple?: boolean; $colPink?: boolean; $colBrown?: boolean; $colGrey?: boolean; $colBlack?: boolean; }

export enum size { no, $s3, $mini, $s2, $tiny, $s1, $small, $1, $large, $2, $big, $3, $huge, $4, $massive, }
registerEnum(size, '$Size', { $s3: 'mini', $s2: 'tiny', $s1: 'small', $1: 'large', $2: 'big', $3: 'huge', $4: 'massive' });
export interface IPropsSizeProp { $s3?: boolean; $mini?: boolean; $s2?: boolean; $tiny?: boolean; $s1?: boolean; $small?: boolean; $1?: boolean; $large?: boolean; $2?: boolean; $big?: boolean; $3?: boolean; $huge?: boolean; $4?: boolean; $massive?: boolean; }

export enum floated { no, $floatedLeft, $floatedRight, }
registerEnum(floated, '$Floated', { $floatedLeft: 'leftFloated', $floatedRight: 'rightFloated' });
export interface IPropsFloatedProp { $floatedLeft?: boolean; $floatedRight?: boolean; }

export enum aligned { no, $alignedLeft, $alignedCenter, $alignedRight, $alignedTop, $alignedBottom, $alignedMiddle, }
registerEnum(aligned, '$Aligned', { $alignedLeft: 'leftAligned', $alignedCenter: 'centerAligned', $alignedRight: '$rightAligned', $alignedTop: 'topAligned', $alignedBottom: 'bottomAligned', $alignedMiddle: 'middleAligned' });
export interface IPropsAlignedProp { $alignedLeft?: boolean; $alignedCenter?: boolean; $alignedRight?: boolean; $alignedTop?: boolean; $alignedBottom?: boolean; $alignedMiddle?: boolean; }

export enum column { no, $twoColumn, $threeColumn, $fourColumn, $fiveColumn, $sixColumn, $sevenColumn, $eightColumn, $nineColumn, $tenColumn, $elevenColumn, $twelveColumn, $thirteenColumn, $fourteenColumn, $fifteenColumn, $sixteenColumn, }
registerEnum(column, '$Column');
export interface IPropsColumnProp { $twoColumn?: boolean; $threeColumn?: boolean; $fourColumn?: boolean; $fiveColumn?: boolean; $sixColumn?: boolean; $sevenColumn?: boolean; $eightColumn?: boolean; $nineColumn?: boolean; $tenColumn?: boolean; $elevenColumn?: boolean; $twelveColumn?: boolean; $thirteenColumn?: boolean; $fourteenColumn?: boolean; $fifteenColumn?: boolean; $sixteenColumn?: boolean; }

export enum deviceOnlyGrid { no, $mobileOnly, $tabletOnly, $computerOnly, $largeScreenOnly, $widescreenOnly, }
registerEnum(deviceOnlyGrid, '$DeviceOnlyGrid');
export interface IPropsDeviceOnlyGridProp { $mobileOnly?: boolean; $tabletOnly?: boolean; $computerOnly?: boolean; $largeScreenOnly?: boolean; $widescreenOnly?: boolean; }

export enum relaxed { no, $relaxed, $relaxedVery, }
registerEnum(relaxed, '$Relaxed', { $relaxedVery: 'veryRelaxed' });
export interface IPropsRelaxedProp { $relaxed?: boolean; $relaxedVery?: boolean; }

export enum textAligned { no, $alignedLeft, $alignedCenter, $alignedRight, }
registerEnum(textAligned, '$Aligned', { $alignedLeft: 'leftAligned', $alignedCenter: 'centerAligned', $alignedRight: '$rightAligned', });
export interface IPropsTextAlignedProp { $alignedLeft?: boolean; $alignedCenter?: boolean; $alignedRight?: boolean; }

export enum verticalAligned { no, $alignedTop = 4, $alignedBottom = 5, $alignedMiddle = 6, }
registerEnum(verticalAligned, '$Aligned', { $alignedTop: 'topAligned', $alignedBottom: 'bottomAligned', $alignedMiddle: 'middleAligned' });
export interface IPropsVerticalAlignedProp { $alignedTop?: boolean; $alignedBottom?: boolean; $alignedMiddle?: boolean; }

export enum attached { no, $attachedTop, $attachedBottom, $attachedBoth, }
registerEnum(attached, '$Attached', { $attachedBoth: 'attached' });
export interface IPropsAttachedProp { $attachedTop?: boolean; $attachedBottom?: boolean; $attachedBoth?: boolean; }

export enum wide { no, $twoWide, $threeWide, $fourWide, $fiveWide, $sixWide, $sevenWide, $eightWide, $nineWide, $tenWide, $elevenWide, $twelveWide, $thirteenWide, $fourteenWide, $fifteenWide, $sixteenWide, }
registerEnum(wide, '$Wide');
export interface IPropsWideProp { $twoWide?: boolean; $threeWide?: boolean; $fourWide?: boolean; $fiveWide?: boolean; $sixWide?: boolean; $sevenWide?: boolean; $eightWide?: boolean; $nineWide?: boolean; $tenWide?: boolean; $elevenWide?: boolean; $twelveWide?: boolean; $thirteenWide?: boolean; $fourteenWide?: boolean; $fifteenWide?: boolean; $sixteenWide?: boolean; }

//**************************************************************
//*   BUTTON
//**************************************************************

export enum attachedButton { no, $attachedTop, $attachedBottom, $attachedLeft, $attachedRight, }
registerEnum(attachedButton, '$Attached');
export interface IPropsAttachedButtonProp { $attachedTop?: boolean; $attachedBottom?: boolean; $attachedLeft?: boolean; $attachedRight?: boolean; }

export interface ButtonProps extends IProps, IPropsAttachedButtonProp, IPropsSizeProp, IPropsColorProp, IPropsFloatedProp {
  $Attached?: attachedButton;
  $Size?: size;
  $Color?: color;
  $Floated?: floated;
  $basic?: boolean;
  $inverted?: boolean;
  $compact?: boolean;
  $fluid?: boolean;
  $circular?: boolean;
  $active?: boolean;
  $loading?: boolean;
  $disabled?: boolean;
  $primary?: boolean;
  $secondary?: boolean;
  $positive?: boolean;
  $negative?: boolean;
}

export var buttonPropsDescr = createDescr<ButtonProps>(val => {
  return {
    $Attached: new enumConverter<attachedButton>(attachedButton, val.$Attached),
    $Size: new enumConverter<size>(size, val.$Size),
    $Color: new enumConverter<color>(color, val.$Color),
    $Floated: new enumConverter<floated>(floated, val.$Floated),
    $basic: new boolConverter(val.$basic),
    $inverted: new boolConverter(val.$inverted),
    $compact: new boolConverter(val.$compact),
    $fluid: new boolConverter(val.$fluid),
    $circular: new boolConverter(val.$circular),
    $active: new boolConverter(val.$active, true),
    $loading: new boolConverter(val.$loading),
    $disabled: new boolConverter(val.$disabled),
    $primary: new boolConverter(val.$primary),
    $secondary: new boolConverter(val.$secondary),
    $positive: new boolConverter(val.$positive),
    $negative: new boolConverter(val.$negative)
  };
});

export const Button: StatelessComponent<ButtonProps> = pr => {
  let props: ButtonProps = enumValToProp(pr, buttonPropsDescr);
  let rest = propsToClasses(['ui button', { active: props.$active }], projection(props, buttonPropsDescr));
  return React.createElement(props.$Attached ? 'div' : 'button', rest, pr.children);
}


//**************************************************************
//*   BUTTONANIMATED
//**************************************************************
export enum animate { standard, vertical, fade }
export interface animateTo {
  animate?: animate;
  to: React.ReactNode;
}

export interface ButtonAnimatedProps extends ButtonProps {

  $animateTo: animateTo;
}

export var buttonAnimatedPropsDescr = createDescr<ButtonAnimatedProps>(val => {
  return {

    $animateTo: null,
  };
}, buttonPropsDescr);

//**************************************************************
//*   BUTTONICON
//**************************************************************    
export interface ButtonIconProps extends ButtonProps, IPropsIconProp {
  $Icon?: icon;
  $left?: boolean;
}

export var buttonIconPropsDescr = createDescr<ButtonIconProps>(val => {
  return {
    $Icon: new enumConverter<icon>(icon, val.$Icon),
    $left: new boolConverter(val.$left)
  };
}, buttonPropsDescr);

//**************************************************************
//*   BUTTONLABELED
//**************************************************************    
export interface ButtonLabeledProps extends ButtonProps {
  $pointing?: boolean;
  $left?: boolean;
  $label: React.ReactElement<any>;
}

export var buttonLabeledPropsDescr = createDescr<ButtonLabeledProps>(val => {
  return {
    $pointing: new boolConverter(val.$pointing),
    $left: new boolConverter(val.$left)
    , $label: null
  };
}, buttonPropsDescr);

//**************************************************************
//*   BUTTONS
//**************************************************************

export enum eqWidth { no, $two, $three, $four, $five, $six, $seven, $eight, $nine, $ten, $eleven, $twelve, }
registerEnum(eqWidth, '$EqWidth');
export interface IPropsEqWidthProp { $two?: boolean; $three?: boolean; $four?: boolean; $five?: boolean; $six?: boolean; $seven?: boolean; $eight?: boolean; $nine?: boolean; $ten?: boolean; $eleven?: boolean; $twelve?: boolean; }

export interface ButtonsProps extends IProps, IPropsEqWidthProp, IPropsSizeProp, IPropsColorProp {
  $EqWidth?: eqWidth;
  $Size?: size;
  $Color?: color;
  $vertical?: boolean;
  $labeled?: boolean;
  $basic?: boolean;
  $hasIcon?: boolean;
}

export var buttonsPropsDescr = createDescr<ButtonsProps>(val => {
  return {
    $EqWidth: new enumConverter<eqWidth>(eqWidth, val.$EqWidth),
    $Size: new enumConverter<size>(size, val.$Size),
    $Color: new enumConverter<color>(color, val.$Color),
    $vertical: new boolConverter(val.$vertical),
    $labeled: new boolConverter(val.$labeled),
    $basic: new boolConverter(val.$basic),
    $hasIcon: new boolConverter(val.$hasIcon)
  };
});

//**************************************************************
//*   BUTTONSOCIAL
//**************************************************************

export enum social { no, $facebook, $twitter, $googlePlus, $vk, $linkedin, $instagram, $youtube, }
registerEnum(social, '$Social');
export interface IPropsSocialProp { $facebook?: boolean; $twitter?: boolean; $googlePlus?: boolean; $vk?: boolean; $linkedin?: boolean; $instagram?: boolean; $youtube?: boolean; }

export interface ButtonSocialProps extends ButtonProps, IPropsSocialProp {
  $Social?: social;
}

export var buttonSocialPropsDescr = createDescr<ButtonSocialProps>(val => {
  return {
    $Social: new enumConverter<social>(social, val.$Social)
  };
}, buttonPropsDescr);

//**************************************************************
//*   CONTAINER
//**************************************************************    
export interface ContainerProps extends IProps, IPropsTextAlignedProp {
  $Aligned?: textAligned;
  $text?: boolean;
  $justified?: boolean;
  $fluid?: boolean;
}

export var containerPropsDescr = createDescr<ContainerProps>(val => {
  return {
    $Aligned: new enumConverter<textAligned>(textAligned, val.$Aligned),
    $text: new boolConverter(val.$text),
    $justified: new boolConverter(val.$justified),
    $fluid: new boolConverter(val.$fluid)
  };
});

export const Container: StatelessComponent<ContainerProps> = pr => {
  let props: ContainerProps = enumValToProp(pr, containerPropsDescr);
  let rest = propsToClasses(['ui container'], projection(props, containerPropsDescr));
  return React.createElement('div', rest, pr.children);
}


//**************************************************************
//*   DIMMER
//**************************************************************    
export interface DimmerProps extends IProps {
  $active?: boolean;
  $page?: boolean;
  $disabled?: boolean;
  $inverted?: boolean;
  $modals?: boolean;
}

export var dimmerPropsDescr = createDescr<DimmerProps>(val => {
  return {
    $active: new boolConverter(val.$active),
    $page: new boolConverter(val.$page),
    $disabled: new boolConverter(val.$disabled),
    $inverted: new boolConverter(val.$inverted),
    $modals: new boolConverter(val.$modals)
  };
});

export const Dimmer: StatelessComponent<DimmerProps> = pr => {
  let props: DimmerProps = enumValToProp(pr, dimmerPropsDescr);
  let rest = propsToClasses(['ui dimmer'], projection(props, dimmerPropsDescr));
  return React.createElement('div', rest, pr.children);
}


//**************************************************************
//*   DIVIDER
//**************************************************************

export enum divider { no, $horizontal, $vertical, }
registerEnum(divider, '$Divider');
export interface IPropsDividerProp { $horizontal?: boolean; $vertical?: boolean; }

export interface DividerProps extends IProps, IPropsDividerProp {
  $Divider?: divider;
  $clearing?: boolean;
  $section?: boolean;
  $hidden?: boolean;
  $fitted?: boolean;
  $inverted?: boolean;
}

export var dividerPropsDescr = createDescr<DividerProps>(val => {
  return {
    $Divider: new enumConverter<divider>(divider, val.$Divider),
    $clearing: new boolConverter(val.$clearing),
    $section: new boolConverter(val.$section),
    $hidden: new boolConverter(val.$hidden),
    $fitted: new boolConverter(val.$fitted),
    $inverted: new boolConverter(val.$inverted)
  };
});

export const Divider: StatelessComponent<DividerProps> = pr => {
  let props: DividerProps = enumValToProp(pr, dividerPropsDescr);
  let rest = propsToClasses(['ui divider'], projection(props, dividerPropsDescr));
  return React.createElement('div', rest, pr.children);
}


//**************************************************************
//*   FIELD
//**************************************************************    
export interface FieldProps extends IProps, IPropsWideProp {
  $Wide?: wide;
  $inline?: boolean;
  $error?: boolean;
  $disabled?: boolean;
  $required?: boolean;
}

export var fieldPropsDescr = createDescr<FieldProps>(val => {
  return {
    $Wide: new enumConverter<wide>(wide, val.$Wide),
    $inline: new boolConverter(val.$inline),
    $error: new boolConverter(val.$error),
    $disabled: new boolConverter(val.$disabled),
    $required: new boolConverter(val.$required)
  };
});

export const Field: StatelessComponent<FieldProps> = pr => {
  let props: FieldProps = enumValToProp(pr, fieldPropsDescr);
  let rest = propsToClasses(['field'], projection(props, fieldPropsDescr));
  return React.createElement('div', rest, pr.children);
}


//**************************************************************
//*   FIELDS
//**************************************************************

export enum eqWidthFields { no, $two, $three, $four, $five, $six, $seven, $eight, $nine, $ten, }
registerEnum(eqWidthFields, '$EqWidth');
export interface IPropsEqWidthFieldsProp { $two?: boolean; $three?: boolean; $four?: boolean; $five?: boolean; $six?: boolean; $seven?: boolean; $eight?: boolean; $nine?: boolean; $ten?: boolean; }

export interface FieldsProps extends IProps, IPropsEqWidthFieldsProp {
  $EqWidth?: eqWidthFields;
  $inline?: boolean;
  $grouped?: boolean;
  $equalWidth?: boolean;
}

export var fieldsPropsDescr = createDescr<FieldsProps>(val => {
  return {
    $EqWidth: new enumConverter<eqWidthFields>(eqWidthFields, val.$EqWidth),
    $inline: new boolConverter(val.$inline),
    $grouped: new boolConverter(val.$grouped),
    $equalWidth: new boolConverter(val.$equalWidth)
  };
});

export const Fields: StatelessComponent<FieldsProps> = pr => {
  let props: FieldsProps = enumValToProp(pr, fieldsPropsDescr);
  let rest = propsToClasses(['fields'], projection(props, fieldsPropsDescr));
  return React.createElement('div', rest, pr.children);
}


//**************************************************************
//*   FLAG
//**************************************************************    
export interface FlagProps extends IProps, IPropsColorProp {
  $Color?: color;
  $Flag?: flag;
  $FlagShort?: flagShort;
}

export var flagPropsDescr = createDescr<FlagProps>(val => {
  return {
    $Color: new enumConverter<color>(color, val.$Color)
    , $Flag: new enumConverter<flag>(flag, val.$Flag),
    $FlagShort: new enumConverter<flagShort>(flagShort, val.$FlagShort),
  };
});

export const Flag: StatelessComponent<FlagProps> = pr => {
  let props: FlagProps = enumValToProp(pr, flagPropsDescr);
  let rest = propsToClasses(['ui flag'], projection(props, flagPropsDescr));
  return React.createElement('i', rest, pr.children);
}


//**************************************************************
//*   FORM
//**************************************************************

export enum outerTagForm { no, $form = htmlTags.form, }
registerEnum(outerTagForm, '$OuterTag');
export interface IPropsOuterTagFormProp { $form?: boolean; }

export enum stateForm { no, $success, $error, $warning, }
registerEnum(stateForm, '$State');
export interface IPropsStateFormProp { $success?: boolean; $error?: boolean; $warning?: boolean; }

export enum sizeForm { no, $small = 6, $large = 8, $huge = 12, }
registerEnum(sizeForm, '$Size');
export interface IPropsSizeFormProp { $small?: boolean; $large?: boolean; $huge?: boolean; }

export interface FormProps extends IProps, IPropsOuterTagFormProp, IPropsStateFormProp, IPropsSizeFormProp {
  $OuterTag?: outerTagForm;
  $State?: stateForm;
  $Size?: sizeForm;
  $loading?: boolean;
  $success?: boolean;
  $equalWidth?: boolean;
  $inverted?: boolean;
}

export var formPropsDescr = createDescr<FormProps>(val => {
  return {
    $OuterTag: new enumConverter<outerTagForm>(outerTagForm, val.$OuterTag),
    $State: new enumConverter<stateForm>(stateForm, val.$State),
    $Size: new enumConverter<sizeForm>(sizeForm, val.$Size),
    $loading: new boolConverter(val.$loading),
    $success: new boolConverter(val.$success),
    $equalWidth: new boolConverter(val.$equalWidth),
    $inverted: new boolConverter(val.$inverted)
  };
});

export const Form: StatelessComponent<FormProps> = pr => {
  let props: FormProps = enumValToProp(pr, formPropsDescr);
  let rest = propsToClasses(['ui form'], projection(props, formPropsDescr));
  return React.createElement('div', rest, pr.children);
}


//**************************************************************
//*   HEADER
//**************************************************************

export enum sizeHeader { no, $tiny = 4, $small = 6, $large = 8, $huge = 12, $medium = 99, }
registerEnum(sizeHeader, '$Size');
export interface IPropsSizeHeaderProp { $tiny?: boolean; $small?: boolean; $large?: boolean; $huge?: boolean; $medium?: boolean; }

export enum outerTagHeader { no, $h1 = htmlTags.h1, $h2 = htmlTags.h2, $h3 = htmlTags.h3, $h4 = htmlTags.h4, $h5 = htmlTags.h5, }
registerEnum(outerTagHeader, '$OuterTag');
export interface IPropsOuterTagHeaderProp { $h1?: boolean; $h2?: boolean; $h3?: boolean; $h4?: boolean; $h5?: boolean; }

export enum subHeader { no, $sub, $subUppercase, }
registerEnum(subHeader, '$SubHeader');
export interface IPropsSubHeaderProp { $sub?: boolean; $subUppercase?: boolean; }

export interface HeaderProps extends IProps, IPropsSizeHeaderProp, IPropsOuterTagHeaderProp, IPropsAttachedProp, IPropsFloatedProp, IPropsTextAlignedProp, IPropsColorProp, IPropsSubHeaderProp {
  $Size?: sizeHeader;
  $OuterTag?: outerTagHeader;
  $Attached?: attached;
  $Floated?: floated;
  $Aligned?: textAligned;
  $Color?: color;
  $SubHeader?: subHeader;
  $icon?: boolean;
  $disabled?: boolean;
  $dividing?: boolean;
  $block?: boolean;
  $inverted?: boolean;
  $justified?: boolean;
}

export var headerPropsDescr = createDescr<HeaderProps>(val => {
  return {
    $Size: new enumConverter<sizeHeader>(sizeHeader, val.$Size),
    $OuterTag: new enumConverter<outerTagHeader>(outerTagHeader, val.$OuterTag),
    $Attached: new enumConverter<attached>(attached, val.$Attached),
    $Floated: new enumConverter<floated>(floated, val.$Floated),
    $Aligned: new enumConverter<textAligned>(textAligned, val.$Aligned),
    $Color: new enumConverter<color>(color, val.$Color),
    $SubHeader: new enumConverter<subHeader>(subHeader, val.$SubHeader),
    $icon: new boolConverter(val.$icon),
    $disabled: new boolConverter(val.$disabled),
    $dividing: new boolConverter(val.$dividing),
    $block: new boolConverter(val.$block),
    $inverted: new boolConverter(val.$inverted),
    $justified: new boolConverter(val.$justified)
  };
});

export const Header: StatelessComponent<HeaderProps> = pr => {
  let props: HeaderProps = enumValToProp(pr, headerPropsDescr);
  let rest = propsToClasses([(props.$SubHeader == subHeader.$sub ? 'sub header' : (props.$SubHeader == subHeader.$subUppercase) ? 'ui sub header' : 'ui header')], projection(props, headerPropsDescr));
  return React.createElement(props.$OuterTag ? outerTagHeader[props.$OuterTag].replace('$', '') : 'div', rest, pr.children);
}


//**************************************************************
//*   CHECKBOX
//**************************************************************

export enum type { no, $slider, $toggle, }
registerEnum(type, '$Type');
export interface IPropsTypeProp { $slider?: boolean; $toggle?: boolean; }

export interface CheckBoxProps extends IProps, IPropsTypeProp {
  $Type?: type;
  $readOnly?: boolean;
  $checked?: boolean;
  $disabled?: boolean;
  $fitted?: boolean;
  $radio?: boolean;
}

export var checkBoxPropsDescr = createDescr<CheckBoxProps>(val => {
  return {
    $Type: new enumConverter<type>(type, val.$Type),
    $readOnly: new boolConverter(val.$readOnly, false, 'read-only'),
    $checked: new boolConverter(val.$checked),
    $disabled: new boolConverter(val.$disabled),
    $fitted: new boolConverter(val.$fitted),
    $radio: new boolConverter(val.$radio)
  };
});

export const CheckBox: StatelessComponent<CheckBoxProps> = pr => {
  let props: CheckBoxProps = enumValToProp(pr, checkBoxPropsDescr);
  let rest = propsToClasses(['ui checkbox'], projection(props, checkBoxPropsDescr));
  return React.createElement('div', rest, pr.children);
}


//**************************************************************
//*   ICON
//**************************************************************

export enum flipped { no, $flippedHorizontally, $flippedVertically, }
registerEnum(flipped, '$Flipped');
export interface IPropsFlippedProp { $flippedHorizontally?: boolean; $flippedVertically?: boolean; }

export enum rotated { no, $rotatedClockwise, $rotatedCounterclockwise, }
registerEnum(rotated, '$Rotated');
export interface IPropsRotatedProp { $rotatedClockwise?: boolean; $rotatedCounterclockwise?: boolean; }

export enum circularIcon { no, $circularStandard, $circularInverted, }
registerEnum(circularIcon, '$Circular', { $circularStandard: 'circular' });
export interface IPropsCircularIconProp { $circularStandard?: boolean; $circularInverted?: boolean; }

export enum bordered { no, $borderedStandard, $borderedInverted, }
registerEnum(bordered, '$Bordered', { $borderedStandard: 'bordered' });
export interface IPropsBorderedProp { $borderedStandard?: boolean; $borderedInverted?: boolean; }

export interface IconProps extends IProps, IPropsFlippedProp, IPropsRotatedProp, IPropsCircularIconProp, IPropsBorderedProp, IPropsIconProp, IPropsSizeProp, IPropsColorProp {
  $Flipped?: flipped;
  $Rotated?: rotated;
  $Circular?: circularIcon;
  $Bordered?: bordered;
  $Icon?: icon;
  $Size?: size;
  $Color?: color;
  $disabled?: boolean;
  $loading?: boolean;
  $fitted?: boolean;
  $link?: boolean;
  $inverted?: boolean;
  $corner?: boolean;
}

export var iconPropsDescr = createDescr<IconProps>(val => {
  return {
    $Flipped: new enumConverter<flipped>(flipped, val.$Flipped),
    $Rotated: new enumConverter<rotated>(rotated, val.$Rotated),
    $Circular: new enumConverter<circularIcon>(circularIcon, val.$Circular),
    $Bordered: new enumConverter<bordered>(bordered, val.$Bordered),
    $Icon: new enumConverter<icon>(icon, val.$Icon),
    $Size: new enumConverter<size>(size, val.$Size),
    $Color: new enumConverter<color>(color, val.$Color),
    $disabled: new boolConverter(val.$disabled),
    $loading: new boolConverter(val.$loading),
    $fitted: new boolConverter(val.$fitted),
    $link: new boolConverter(val.$link),
    $inverted: new boolConverter(val.$inverted),
    $corner: new boolConverter(val.$corner)
  };
});

export const Icon: StatelessComponent<IconProps> = pr => {
  let props: IconProps = enumValToProp(pr, iconPropsDescr);
  let rest = propsToClasses(['icon'], projection(props, iconPropsDescr));
  return React.createElement('i', rest, pr.children);
}


//**************************************************************
//*   ICONS
//**************************************************************    
export interface IconsProps extends IProps, IPropsSizeProp {
  $Size?: size;
}

export var iconsPropsDescr = createDescr<IconsProps>(val => {
  return {
    $Size: new enumConverter<size>(size, val.$Size)
  };
});

export const Icons: StatelessComponent<IconsProps> = pr => {
  let props: IconsProps = enumValToProp(pr, iconsPropsDescr);
  let rest = propsToClasses(['icons'], projection(props, iconsPropsDescr));
  return React.createElement('i', rest, pr.children);
}


//**************************************************************
//*   IMAGE
//**************************************************************

export enum outerTagImage { no, $a = htmlTags.a, }
registerEnum(outerTagImage, '$OuterTag');
export interface IPropsOuterTagImageProp { $a?: boolean; }

export interface ImageProps extends IProps, IPropsSizeProp, IPropsFloatedProp, IPropsVerticalAlignedProp, IPropsOuterTagImageProp {
  $Size?: size;
  $Floated?: floated;
  $Aligned?: verticalAligned;
  $OuterTag?: outerTagImage;
  $hidden?: boolean;
  $disabled?: boolean;
  $avatar?: boolean;
  $bordered?: boolean;
  $fluid?: boolean;
  $rounded?: boolean;
  $circular?: boolean;
  $centered?: boolean;
  $spaced?: boolean;
}

export var imagePropsDescr = createDescr<ImageProps>(val => {
  return {
    $Size: new enumConverter<size>(size, val.$Size),
    $Floated: new enumConverter<floated>(floated, val.$Floated),
    $Aligned: new enumConverter<verticalAligned>(verticalAligned, val.$Aligned),
    $OuterTag: new enumConverter<outerTagImage>(outerTagImage, val.$OuterTag),
    $hidden: new boolConverter(val.$hidden),
    $disabled: new boolConverter(val.$disabled),
    $avatar: new boolConverter(val.$avatar),
    $bordered: new boolConverter(val.$bordered),
    $fluid: new boolConverter(val.$fluid),
    $rounded: new boolConverter(val.$rounded),
    $circular: new boolConverter(val.$circular),
    $centered: new boolConverter(val.$centered),
    $spaced: new boolConverter(val.$spaced)
  };
});

//**************************************************************
//*   IMAGES
//**************************************************************    
export interface ImagesProps extends IProps, IPropsSizeProp {
  $Size?: size;
}

export var imagesPropsDescr = createDescr<ImagesProps>(val => {
  return {
    $Size: new enumConverter<size>(size, val.$Size)
  };
});

export const Images: StatelessComponent<ImagesProps> = pr => {
  let props: ImagesProps = enumValToProp(pr, imagesPropsDescr);
  let rest = propsToClasses(['ui images'], projection(props, imagesPropsDescr));
  return React.createElement('div', rest, pr.children);
}


//**************************************************************
//*   INPUT
//**************************************************************

export enum iconInput { no, $iconRight, $iconLeft, }
registerEnum(iconInput, '$IconInput', { $iconRight: 'icon', $iconLeft: 'left icon' });
export interface IPropsIconInputProp { $iconRight?: boolean; $iconLeft?: boolean; }

export enum action { no, $actionRight, $actionLeft, }
registerEnum(action, '$Action', { $actionRight: 'action', $actionLeft: 'leftAction' });
export interface IPropsActionProp { $actionRight?: boolean; $actionLeft?: boolean; }

export enum labeledInput { no, $labeledLeft, $labeledRight, $labeledRightCorner, $labeledLeftCorner, }
registerEnum(labeledInput, '$Labeled', { $labeledLeft: 'labeled', $labeledRight: 'rightLabeled', $labeledRightCorner: 'cornerLabeled', $labeledLeftCorner: 'leftCornerLabeled' });
export interface IPropsLabeledInputProp { $labeledLeft?: boolean; $labeledRight?: boolean; $labeledRightCorner?: boolean; $labeledLeftCorner?: boolean; }

export interface InputProps extends IProps, IPropsIconInputProp, IPropsActionProp, IPropsSizeProp, IPropsLabeledInputProp {
  $IconInput?: iconInput;
  $Action?: action;
  $Size?: size;
  $Labeled?: labeledInput;
  $error?: boolean;
  $focus?: boolean;
  $loading?: boolean;
  $disabled?: boolean;
  $transparent?: boolean;
  $inverted?: boolean;
  $fluid?: boolean;
}

export var inputPropsDescr = createDescr<InputProps>(val => {
  return {
    $IconInput: new enumConverter<iconInput>(iconInput, val.$IconInput),
    $Action: new enumConverter<action>(action, val.$Action),
    $Size: new enumConverter<size>(size, val.$Size),
    $Labeled: new enumConverter<labeledInput>(labeledInput, val.$Labeled),
    $error: new boolConverter(val.$error),
    $focus: new boolConverter(val.$focus),
    $loading: new boolConverter(val.$loading),
    $disabled: new boolConverter(val.$disabled),
    $transparent: new boolConverter(val.$transparent),
    $inverted: new boolConverter(val.$inverted),
    $fluid: new boolConverter(val.$fluid)
  };
});

export const Input: StatelessComponent<InputProps> = pr => {
  let props: InputProps = enumValToProp(pr, inputPropsDescr);
  let rest = propsToClasses(['ui input'], projection(props, inputPropsDescr));
  return React.createElement('div', rest, pr.children);
}


//**************************************************************
//*   LABEL
//**************************************************************

export enum pointing { no, $pointingAbove, $pointingBelow, $pointingLeft, $pointingRight, }
registerEnum(pointing, '$Pointing', { $pointingAbove: 'pointing', $pointingLeft: 'leftPointing', $pointingRight: 'rightPointing' });
export interface IPropsPointingProp { $pointingAbove?: boolean; $pointingBelow?: boolean; $pointingLeft?: boolean; $pointingRight?: boolean; }

export enum corner { no, $cornerLeft, $cornerRight, }
registerEnum(corner, '$Corner');
export interface IPropsCornerProp { $cornerLeft?: boolean; $cornerRight?: boolean; }

export enum attachedLabel { no, $attachedTop, $attachedBottom, $attachedTopRight, $attachedTopLeft, $attachedBottomRight, $attachedBottomLeft, }
registerEnum(attachedLabel, '$Attached', { $attachedBottom: 'bottomAttached', $attachedTop: 'topAttached', $attachedTopRight: 'topRightAttached', $attachedTopLeft: 'topLeftAttached', $attachedBottomRight: 'bottomRightAttached', $attachedBottomLeft: 'bottomLeftAttached' });
export interface IPropsAttachedLabelProp { $attachedTop?: boolean; $attachedBottom?: boolean; $attachedTopRight?: boolean; $attachedTopLeft?: boolean; $attachedBottomRight?: boolean; $attachedBottomLeft?: boolean; }

export enum circularLabel { no, $circularStandard, $circularEmpty, }
registerEnum(circularLabel, '$Circular');
export interface IPropsCircularLabelProp { $circularStandard?: boolean; $circularEmpty?: boolean; }

export enum ribbon { no, $ribbonLeft, $ribbonRight, }
registerEnum(ribbon, '$Ribbon');
export interface IPropsRibbonProp { $ribbonLeft?: boolean; $ribbonRight?: boolean; }

export interface LabelProps extends IProps, IPropsPointingProp, IPropsCornerProp, IPropsAttachedLabelProp, IPropsCircularLabelProp, IPropsRibbonProp, IPropsSizeProp, IPropsColorProp {
  $Pointing?: pointing;
  $Corner?: corner;
  $Attached?: attachedLabel;
  $Circular?: circularLabel;
  $Ribbon?: ribbon;
  $Size?: size;
  $Color?: color;
  $image?: boolean;
  $basic?: boolean;
  $tag?: boolean;
  $horizontal?: boolean;
  $floating?: boolean;
  $outerTag?: string;
}

export var labelPropsDescr = createDescr<LabelProps>(val => {
  return {
    $Pointing: new enumConverter<pointing>(pointing, val.$Pointing),
    $Corner: new enumConverter<corner>(corner, val.$Corner),
    $Attached: new enumConverter<attachedLabel>(attachedLabel, val.$Attached),
    $Circular: new enumConverter<circularLabel>(circularLabel, val.$Circular),
    $Ribbon: new enumConverter<ribbon>(ribbon, val.$Ribbon),
    $Size: new enumConverter<size>(size, val.$Size),
    $Color: new enumConverter<color>(color, val.$Color),
    $image: new boolConverter(val.$image),
    $basic: new boolConverter(val.$basic),
    $tag: new boolConverter(val.$tag),
    $horizontal: new boolConverter(val.$horizontal),
    $floating: new boolConverter(val.$floating)
  };
});

export const Label: StatelessComponent<LabelProps> = pr => {
  let props: LabelProps = enumValToProp(pr, labelPropsDescr);
  let rest = propsToClasses(['ui label'], projection(props, labelPropsDescr));
  return React.createElement(props.$outerTag ? props.$outerTag : 'span', rest, pr.children);
}


//**************************************************************
//*   LABELS
//**************************************************************    
export interface LabelsProps extends IProps, IPropsSizeProp, IPropsColorProp {
  $Size?: size;
  $Color?: color;
  $tag?: boolean;
  $circular?: boolean;
}

export var labelsPropsDescr = createDescr<LabelsProps>(val => {
  return {
    $Size: new enumConverter<size>(size, val.$Size),
    $Color: new enumConverter<color>(color, val.$Color),
    $tag: new boolConverter(val.$tag),
    $circular: new boolConverter(val.$circular)
  };
});

export const Labels: StatelessComponent<LabelsProps> = pr => {
  let props: LabelsProps = enumValToProp(pr, labelsPropsDescr);
  let rest = propsToClasses(['ui labels'], projection(props, labelsPropsDescr));
  return React.createElement('div', rest, pr.children);
}


//**************************************************************
//*   LIST
//**************************************************************    
export interface ListProps extends IProps {

}

export var listPropsDescr = createDescr<ListProps>(val => {
  return {

  };
});

//**************************************************************
//*   LOADER
//**************************************************************    
export interface LoaderProps extends IProps {

}

export var loaderPropsDescr = createDescr<LoaderProps>(val => {
  return {

  };
});

//**************************************************************
//*   MESSAGE
//**************************************************************

export enum stateMessage { no, $success, $error, $warning, $info, $positive, $negative, }
registerEnum(stateMessage, '$State');
export interface IPropsStateMessageProp { $success?: boolean; $error?: boolean; $warning?: boolean; $info?: boolean; $positive?: boolean; $negative?: boolean; }

export enum sizeMessage { no, $small = 6, $large = 8, $huge = 12, $massive = 14, }
registerEnum(sizeMessage, '$Size');
export interface IPropsSizeMessageProp { $small?: boolean; $large?: boolean; $huge?: boolean; $massive?: boolean; }

export interface MessageProps extends IProps, IPropsAttachedProp, IPropsStateMessageProp, IPropsColorProp, IPropsSizeMessageProp {
  $Attached?: attached;
  $State?: stateMessage;
  $Color?: color;
  $Size?: sizeMessage;
  $icon?: boolean;
  $hidden?: boolean;
  $visible?: boolean;
  $floating?: boolean;
  $compact?: boolean;
}

export var messagePropsDescr = createDescr<MessageProps>(val => {
  return {
    $Attached: new enumConverter<attached>(attached, val.$Attached),
    $State: new enumConverter<stateMessage>(stateMessage, val.$State),
    $Color: new enumConverter<color>(color, val.$Color),
    $Size: new enumConverter<sizeMessage>(sizeMessage, val.$Size),
    $icon: new boolConverter(val.$icon),
    $hidden: new boolConverter(val.$hidden),
    $visible: new boolConverter(val.$visible),
    $floating: new boolConverter(val.$floating),
    $compact: new boolConverter(val.$compact)
  };
});

export const Message: StatelessComponent<MessageProps> = pr => {
  let props: MessageProps = enumValToProp(pr, messagePropsDescr);
  let rest = propsToClasses(['ui message'], projection(props, messagePropsDescr));
  return React.createElement('div', rest, pr.children);
}


//**************************************************************
//*   MODAL
//**************************************************************

export enum sizeModal { no, $small = 6, $large = 8, $fullscreen = 20, }
registerEnum(sizeModal, '$Size');
export interface IPropsSizeModalProp { $small?: boolean; $large?: boolean; $fullscreen?: boolean; }

export interface ModalProps extends IProps, IPropsSizeModalProp {
  $Size?: sizeModal;
  $active?: boolean;
  $scrolling?: boolean;
  $long?: boolean;
  $basic?: boolean;
}

export var modalPropsDescr = createDescr<ModalProps>(val => {
  return {
    $Size: new enumConverter<sizeModal>(sizeModal, val.$Size),
    $active: new boolConverter(val.$active),
    $scrolling: new boolConverter(val.$scrolling),
    $long: new boolConverter(val.$long),
    $basic: new boolConverter(val.$basic)
  };
});

export const Modal: StatelessComponent<ModalProps> = pr => {
  let props: ModalProps = enumValToProp(pr, modalPropsDescr);
  let rest = propsToClasses(['ui modal'], projection(props, modalPropsDescr));
  return React.createElement('div', rest, pr.children);
}


//**************************************************************
//*   RAIL
//**************************************************************    
export interface RailProps extends IProps {

}

export var railPropsDescr = createDescr<RailProps>(val => {
  return {

  };
});

//**************************************************************
//*   REVEAL
//**************************************************************    
export interface RevealProps extends IProps {

}

export var revealPropsDescr = createDescr<RevealProps>(val => {
  return {

  };
});

//**************************************************************
//*   SEGMENT
//**************************************************************

export enum raised { no, $raisedStandard, $raisedStacked, $raisedPiled, $raisedStackedTall, }
registerEnum(raised, '$Raised', { $raisedStandard: 'raised', $raisedStacked: 'stacked', $raisedStackedTall: 'stackedTall', $raisedPiled: 'piled' });
export interface IPropsRaisedProp { $raisedStandard?: boolean; $raisedStacked?: boolean; $raisedPiled?: boolean; $raisedStackedTall?: boolean; }

export enum padded { no, $paddedStandard, $paddedVery, }
registerEnum(padded, '$Padded', { $paddedVery: 'veryPadded' });
export interface IPropsPaddedProp { $paddedStandard?: boolean; $paddedVery?: boolean; }

export enum emphasis { no, $secondary, $tertiary, }
registerEnum(emphasis, '$Emphasis');
export interface IPropsEmphasisProp { $secondary?: boolean; $tertiary?: boolean; }

export interface SegmentProps extends IProps, IPropsRaisedProp, IPropsAttachedProp, IPropsPaddedProp, IPropsEmphasisProp, IPropsAlignedProp, IPropsColorProp, IPropsFloatedProp {
  $Raised?: raised;
  $Attached?: attached;
  $Padded?: padded;
  $Emphasis?: emphasis;
  $Aligned?: aligned;
  $Color?: color;
  $Floated?: floated;
  $vertical?: boolean;
  $disabled?: boolean;
  $loading?: boolean;
  $inverted?: boolean;
  $compact?: boolean;
  $circular?: boolean;
  $clearing?: boolean;
  $basic?: boolean;
  $container?: boolean;
  $containerText?: boolean;
  $outerTag?: string;
}

export var segmentPropsDescr = createDescr<SegmentProps>(val => {
  return {
    $Raised: new enumConverter<raised>(raised, val.$Raised),
    $Attached: new enumConverter<attached>(attached, val.$Attached),
    $Padded: new enumConverter<padded>(padded, val.$Padded),
    $Emphasis: new enumConverter<emphasis>(emphasis, val.$Emphasis),
    $Aligned: new enumConverter<aligned>(aligned, val.$Aligned),
    $Color: new enumConverter<color>(color, val.$Color),
    $Floated: new enumConverter<floated>(floated, val.$Floated),
    $vertical: new boolConverter(val.$vertical),
    $disabled: new boolConverter(val.$disabled),
    $loading: new boolConverter(val.$loading),
    $inverted: new boolConverter(val.$inverted),
    $compact: new boolConverter(val.$compact),
    $circular: new boolConverter(val.$circular),
    $clearing: new boolConverter(val.$clearing),
    $basic: new boolConverter(val.$basic),
    $container: new boolConverter(val.$container),
    $containerText: new boolConverter(val.$containerText, false, 'text')
  };
});

export const Segment: StatelessComponent<SegmentProps> = pr => {
  let props: SegmentProps = enumValToProp(pr, segmentPropsDescr);
  let rest = propsToClasses(['ui segment'], projection(props, segmentPropsDescr));
  return React.createElement(props.$outerTag ? props.$outerTag : 'div', rest, pr.children);
}


//**************************************************************
//*   SEGMENTS
//**************************************************************

export enum raisedSegments { no, $raisedStandard, $raisedStacked, $raisedPiled, }
registerEnum(raisedSegments, '$Raised', { $raisedStandard: 'raised', $raisedStacked: 'stacked', $raisedPiled: 'piled' });
export interface IPropsRaisedSegmentsProp { $raisedStandard?: boolean; $raisedStacked?: boolean; $raisedPiled?: boolean; }

export interface SegmentsProps extends IProps, IPropsRaisedSegmentsProp {
  $Raised?: raisedSegments;
  $compact?: boolean;
  $horizontal?: boolean;
}

export var segmentsPropsDescr = createDescr<SegmentsProps>(val => {
  return {
    $Raised: new enumConverter<raisedSegments>(raisedSegments, val.$Raised),
    $compact: new boolConverter(val.$compact),
    $horizontal: new boolConverter(val.$horizontal)
  };
});

export const Segments: StatelessComponent<SegmentsProps> = pr => {
  let props: SegmentsProps = enumValToProp(pr, segmentsPropsDescr);
  let rest = propsToClasses(['ui segments'], projection(props, segmentsPropsDescr));
  return React.createElement('div', rest, pr.children);
}


//**************************************************************
//*   STEP
//**************************************************************    
export interface StepProps extends IProps {

}

export var stepPropsDescr = createDescr<StepProps>(val => {
  return {

  };
});

//**************************************************************
//*   AD
//**************************************************************    
export interface AdProps extends IProps {

}

export var adPropsDescr = createDescr<AdProps>(val => {
  return {

  };
});

//**************************************************************
//*   CARD
//**************************************************************    
export interface CardProps extends IProps {

}

export var cardPropsDescr = createDescr<CardProps>(val => {
  return {

  };
});

//**************************************************************
//*   COMMENT
//**************************************************************    
export interface CommentProps extends IProps {

}

export var commentPropsDescr = createDescr<CommentProps>(val => {
  return {

  };
});

//**************************************************************
//*   FEED
//**************************************************************    
export interface FeedProps extends IProps {

}

export var feedPropsDescr = createDescr<FeedProps>(val => {
  return {

  };
});

//**************************************************************
//*   ITEM
//**************************************************************    
export interface ItemProps extends IProps {

}

export var itemPropsDescr = createDescr<ItemProps>(val => {
  return {

  };
});

//**************************************************************
//*   STATISTIC
//**************************************************************    
export interface StatisticProps extends IProps {

}

export var statisticPropsDescr = createDescr<StatisticProps>(val => {
  return {

  };
});

//**************************************************************
//*   BREADCRUMB
//**************************************************************    
export interface BreadcrumbProps extends IProps {

}

export var breadcrumbPropsDescr = createDescr<BreadcrumbProps>(val => {
  return {

  };
});

//**************************************************************
//*   COLUMN
//**************************************************************

export enum wideMobile { no, $twoWideMobile, $threeWideMobile, $fourWideMobile, $fiveWideMobile, $sixWideMobile, $sevenWideMobile, $eightWideMobile, $nineWideMobile, $tenWideMobile, $elevenWideMobile, $twelveWideMobile, $thirteenWideMobile, $fourteenWideMobile, $fifteenWideMobile, $sixteenWideMobile, }
registerEnum(wideMobile, '$WideMobile');
export interface IPropsWideMobileProp { $twoWideMobile?: boolean; $threeWideMobile?: boolean; $fourWideMobile?: boolean; $fiveWideMobile?: boolean; $sixWideMobile?: boolean; $sevenWideMobile?: boolean; $eightWideMobile?: boolean; $nineWideMobile?: boolean; $tenWideMobile?: boolean; $elevenWideMobile?: boolean; $twelveWideMobile?: boolean; $thirteenWideMobile?: boolean; $fourteenWideMobile?: boolean; $fifteenWideMobile?: boolean; $sixteenWideMobile?: boolean; }

export enum wideTablet { no, $twoWideTablet, $threeWideTablet, $fourWideTablet, $fiveWideTablet, $sixWideTablet, $sevenWideTablet, $eightWideTablet, $nineWideTablet, $tenWideTablet, $elevenWideTablet, $twelveWideTablet, $thirteenWideTablet, $fourteenWideTablet, $fifteenWideTablet, $sixteenWideTablet, }
registerEnum(wideTablet, '$WideTablet');
export interface IPropsWideTabletProp { $twoWideTablet?: boolean; $threeWideTablet?: boolean; $fourWideTablet?: boolean; $fiveWideTablet?: boolean; $sixWideTablet?: boolean; $sevenWideTablet?: boolean; $eightWideTablet?: boolean; $nineWideTablet?: boolean; $tenWideTablet?: boolean; $elevenWideTablet?: boolean; $twelveWideTablet?: boolean; $thirteenWideTablet?: boolean; $fourteenWideTablet?: boolean; $fifteenWideTablet?: boolean; $sixteenWideTablet?: boolean; }

export enum wideComputer { no, $twoWideComputer, $threeWideComputer, $fourWideComputer, $fiveWideComputer, $sixWideComputer, $sevenWideComputer, $eightWideComputer, $nineWideComputer, $tenWideComputer, $elevenWideComputer, $twelveWideComputer, $thirteenWideComputer, $fourteenWideComputer, $fifteenWideComputer, $sixteenWideComputer, }
registerEnum(wideComputer, '$WideComputer');
export interface IPropsWideComputerProp { $twoWideComputer?: boolean; $threeWideComputer?: boolean; $fourWideComputer?: boolean; $fiveWideComputer?: boolean; $sixWideComputer?: boolean; $sevenWideComputer?: boolean; $eightWideComputer?: boolean; $nineWideComputer?: boolean; $tenWideComputer?: boolean; $elevenWideComputer?: boolean; $twelveWideComputer?: boolean; $thirteenWideComputer?: boolean; $fourteenWideComputer?: boolean; $fifteenWideComputer?: boolean; $sixteenWideComputer?: boolean; }

export enum wideLargeScreen { no, $twoWideLargeScreen, $threeWideLargeScreen, $fourWideLargeScreen, $fiveWideLargeScreen, $sixWideLargeScreen, $sevenWideLargeScreen, $eightWideLargeScreen, $nineWideLargeScreen, $tenWideLargeScreen, $elevenWideLargeScreen, $twelveWideLargeScreen, $thirteenWideLargeScreen, $fourteenWideLargeScreen, $fifteenWideLargeScreen, $sixteenWideScreen, }
registerEnum(wideLargeScreen, '$WideLargeScreen');
export interface IPropsWideLargeScreenProp { $twoWideLargeScreen?: boolean; $threeWideLargeScreen?: boolean; $fourWideLargeScreen?: boolean; $fiveWideLargeScreen?: boolean; $sixWideLargeScreen?: boolean; $sevenWideLargeScreen?: boolean; $eightWideLargeScreen?: boolean; $nineWideLargeScreen?: boolean; $tenWideLargeScreen?: boolean; $elevenWideLargeScreen?: boolean; $twelveWideLargeScreen?: boolean; $thirteenWideLargeScreen?: boolean; $fourteenWideLargeScreen?: boolean; $fifteenWideLargeScreen?: boolean; $sixteenWideScreen?: boolean; }

export enum wideWidescreen { no, $twoWideWidescreen, $threeWideWidescreen, $fourWideWidescreen, $fiveWideWidescreen, $sixWideWidescreen, $sevenWideWidescreen, $eightWideWidescreen, $nineWideWidescreen, $tenWideWidescreen, $elevenWideWidescreen, $twelveWideWidescreen, $thirteenWideWidescreen, $fourteenWideWidescreen, $fifteenWideWidescreen, $sixteenWideWideScreen, }
registerEnum(wideWidescreen, '$WideWidescreen');
export interface IPropsWideWidescreenProp { $twoWideWidescreen?: boolean; $threeWideWidescreen?: boolean; $fourWideWidescreen?: boolean; $fiveWideWidescreen?: boolean; $sixWideWidescreen?: boolean; $sevenWideWidescreen?: boolean; $eightWideWidescreen?: boolean; $nineWideWidescreen?: boolean; $tenWideWidescreen?: boolean; $elevenWideWidescreen?: boolean; $twelveWideWidescreen?: boolean; $thirteenWideWidescreen?: boolean; $fourteenWideWidescreen?: boolean; $fifteenWideWidescreen?: boolean; $sixteenWideWideScreen?: boolean; }

export interface ColumnProps extends IProps, IPropsWideMobileProp, IPropsWideTabletProp, IPropsWideComputerProp, IPropsWideLargeScreenProp, IPropsWideWidescreenProp, IPropsFloatedProp, IPropsAlignedProp, IPropsColorProp, IPropsWideProp, IPropsDeviceOnlyGridProp {
  $WideMobile?: wideMobile;
  $WideTablet?: wideTablet;
  $WideComputer?: wideComputer;
  $WideLargeScreen?: wideLargeScreen;
  $WideWidescreen?: wideWidescreen;
  $Floated?: floated;
  $Aligned?: aligned;
  $Color?: color;
  $Wide?: wide;
  $DeviceOnlyGrid?: deviceOnlyGrid;
  $relaxed?: boolean;
}

export var columnPropsDescr = createDescr<ColumnProps>(val => {
  return {
    $WideMobile: new enumConverter<wideMobile>(wideMobile, val.$WideMobile),
    $WideTablet: new enumConverter<wideTablet>(wideTablet, val.$WideTablet),
    $WideComputer: new enumConverter<wideComputer>(wideComputer, val.$WideComputer),
    $WideLargeScreen: new enumConverter<wideLargeScreen>(wideLargeScreen, val.$WideLargeScreen),
    $WideWidescreen: new enumConverter<wideWidescreen>(wideWidescreen, val.$WideWidescreen),
    $Floated: new enumConverter<floated>(floated, val.$Floated),
    $Aligned: new enumConverter<aligned>(aligned, val.$Aligned),
    $Color: new enumConverter<color>(color, val.$Color),
    $Wide: new enumConverter<wide>(wide, val.$Wide),
    $DeviceOnlyGrid: new enumConverter<deviceOnlyGrid>(deviceOnlyGrid, val.$DeviceOnlyGrid),
    $relaxed: new boolConverter(val.$relaxed)
  };
});

export const Column: StatelessComponent<ColumnProps> = pr => {
  let props: ColumnProps = enumValToProp(pr, columnPropsDescr);
  let rest = propsToClasses(['column'], projection(props, columnPropsDescr));
  return React.createElement('div', rest, pr.children);
}


//**************************************************************
//*   GRID
//**************************************************************

export enum divided { no, $dividedHorizontally, $dividedVertically, }
registerEnum(divided, '$Divided', { $dividedHorizontally: 'divided', $dividedVertically: 'verticallyDivided' });
export interface IPropsDividedProp { $dividedHorizontally?: boolean; $dividedVertically?: boolean; }

export enum celled { no, $celled, $celledInternally, }
registerEnum(celled, '$Celled', { $celledInternally: 'internallyCelled' });
export interface IPropsCelledProp { $celled?: boolean; $celledInternally?: boolean; }

export enum paddedGrid { no, $padded, $paddedHorizontally, $paddedVertically, }
registerEnum(paddedGrid, '$PaddedGrid', { $paddedHorizontally: '$horizontallyPadded', $paddedVertically: 'verticallyPadded' });
export interface IPropsPaddedGridProp { $padded?: boolean; $paddedHorizontally?: boolean; $paddedVertically?: boolean; }

export interface GridProps extends IProps, IPropsDividedProp, IPropsCelledProp, IPropsPaddedGridProp, IPropsColumnProp, IPropsAlignedProp, IPropsRelaxedProp {
  $Divided?: divided;
  $Celled?: celled;
  $PaddedGrid?: paddedGrid;
  $Column?: column;
  $Aligned?: aligned;
  $Relaxed?: relaxed;
  $internallyCelled?: boolean;
  $equalWidth?: boolean;
  $centered?: boolean;
  $stackable?: boolean;
  $container?: boolean;
  $reversed?: boolean;
  $doubling?: boolean;
}

export var gridPropsDescr = createDescr<GridProps>(val => {
  return {
    $Divided: new enumConverter<divided>(divided, val.$Divided),
    $Celled: new enumConverter<celled>(celled, val.$Celled),
    $PaddedGrid: new enumConverter<paddedGrid>(paddedGrid, val.$PaddedGrid),
    $Column: new enumConverter<column>(column, val.$Column),
    $Aligned: new enumConverter<aligned>(aligned, val.$Aligned),
    $Relaxed: new enumConverter<relaxed>(relaxed, val.$Relaxed),
    $internallyCelled: new boolConverter(val.$internallyCelled),
    $equalWidth: new boolConverter(val.$equalWidth),
    $centered: new boolConverter(val.$centered),
    $stackable: new boolConverter(val.$stackable),
    $container: new boolConverter(val.$container),
    $reversed: new boolConverter(val.$reversed),
    $doubling: new boolConverter(val.$doubling)
  };
});

export const Grid: StatelessComponent<GridProps> = pr => {
  let props: GridProps = enumValToProp(pr, gridPropsDescr);
  let rest = propsToClasses(['ui grid'], projection(props, gridPropsDescr));
  return React.createElement('div', rest, pr.children);
}


//**************************************************************
//*   MENU
//**************************************************************    
export interface MenuProps extends IProps {

}

export var menuPropsDescr = createDescr<MenuProps>(val => {
  return {

  };
});

//**************************************************************
//*   ROW
//**************************************************************    
export interface RowProps extends IProps, IPropsColumnProp, IPropsDeviceOnlyGridProp, IPropsAlignedProp, IPropsColorProp, IPropsRelaxedProp {
  $Column?: column;
  $DeviceOnlyGrid?: deviceOnlyGrid;
  $Aligned?: aligned;
  $Color?: color;
  $Relaxed?: relaxed;
  $reversed?: boolean;
  $doubling?: boolean;
  $equalWidth?: boolean;
  $centered?: boolean;
  $stretched?: boolean;
  $justified?: boolean;
}

export var rowPropsDescr = createDescr<RowProps>(val => {
  return {
    $Column: new enumConverter<column>(column, val.$Column),
    $DeviceOnlyGrid: new enumConverter<deviceOnlyGrid>(deviceOnlyGrid, val.$DeviceOnlyGrid),
    $Aligned: new enumConverter<aligned>(aligned, val.$Aligned),
    $Color: new enumConverter<color>(color, val.$Color),
    $Relaxed: new enumConverter<relaxed>(relaxed, val.$Relaxed),
    $reversed: new boolConverter(val.$reversed),
    $doubling: new boolConverter(val.$doubling),
    $equalWidth: new boolConverter(val.$equalWidth),
    $centered: new boolConverter(val.$centered),
    $stretched: new boolConverter(val.$stretched),
    $justified: new boolConverter(val.$justified)
  };
});

export const Row: StatelessComponent<RowProps> = pr => {
  let props: RowProps = enumValToProp(pr, rowPropsDescr);
  let rest = propsToClasses(['ui row'], projection(props, rowPropsDescr));
  return React.createElement('div', rest, pr.children);
}


//**************************************************************
//*   TABLE
//**************************************************************    
export interface TableProps extends IProps {

}

export var tablePropsDescr = createDescr<TableProps>(val => {
  return {

  };
});