import * as React from 'react';
import * as ui from './lib';
import {icon, flag, flagShort} from './largeEnums';

//********* This code is generated - do not modify it!

//content for "import {} from '???/exports"'
/*
  icon, flag, flagShort, color, size, floated, aligned, column,
  Button, attachedButton,
  ButtonAnimated,
  ButtonIcon, iconLabel,
  ButtonLabeled,
  Buttons, eqWidth,
  ButtonSocial, social,
  Container, alignedContainer,
  Divider, divider,
  Flag,
  Header,
  Icon, flipped, rotated, circularIcon, bordered,
  Icons,
  Image,
  Input,
  Label, pointing, corner, attachedLabel, circularLabel, ribbon,
  Labels,
  List,
  Loader,
  Rail,
  Reveal,
  Segment, raised, attachedSegment, padded, emphasis,
  Segments, raisedSegments,
  Step,
  Ad,
  Card,
  Comment,
  Feed,
  Item,
  Statistic,
  Breadcrumb,
  Column, wide, wideMobile, wideTablet, wideComputer, wideLargeScreen, wideWidescreen,
  Form,
  Grid, divided, celled, paddedGrid,
  Menu,
  Message,
  Row,
  Table
*/

//content for "export {} from '/.generated"'
/*
export {
  animate, animateTo, color, size, floated, aligned, column,
  Button, ButtonProps, attachedButton,
  ButtonAnimatedProps,
  ButtonIconProps, iconLabel,
  ButtonLabeledProps,
  ButtonsProps, eqWidth,
  ButtonSocialProps, social,
  Container, ContainerProps, alignedContainer,
  Divider, DividerProps, divider,
  Flag, FlagProps,
  HeaderProps,
  Icon, IconProps, flipped, rotated, circularIcon, bordered,
  Icons, IconsProps,
  ImageProps,
  InputProps,
  Label, LabelProps, pointing, corner, attachedLabel, circularLabel, ribbon,
  Labels, LabelsProps,
  ListProps,
  LoaderProps,
  RailProps,
  RevealProps,
  Segment, SegmentProps, raised, attachedSegment, padded, emphasis,
  Segments, SegmentsProps, raisedSegments,
  StepProps,
  AdProps,
  CardProps,
  CommentProps,
  FeedProps,
  ItemProps,
  StatisticProps,
  BreadcrumbProps,
  Column, ColumnProps, wide, wideMobile, wideTablet, wideComputer, wideLargeScreen, wideWidescreen,
  FormProps,
  Grid, GridProps, divided, celled, paddedGrid,
  MenuProps,
  MessageProps,
  Row, RowProps,
  TableProps,
} from './generated';
*/

export interface IPropsIconProp { }

export enum color { standard, $colRed, $colOrange, $colYellow, $colOlive, $colGreen, $colTeal, $colBlue, $colViolet, $colPurple, $colPink, $colBrown, $colGrey, $colBlack, }
ui.registerEnum(color, '$Color', { $colRed: 'red', $colOrange: 'orange', $colYellow: 'yellow', $colOlive: 'olive', $colGreen: 'green', $colTeal: 'teal', $colBlue: 'blue', $colViolet: 'violet', $colPurple: 'purple', $colPink: 'pink', $colBrown: 'brown', $colGrey: 'grey', $colBlack: 'black' });
export interface IPropsColorProp { $colRed?: boolean; $colOrange?: boolean; $colYellow?: boolean; $colOlive?: boolean; $colGreen?: boolean; $colTeal?: boolean; $colBlue?: boolean; $colViolet?: boolean; $colPurple?: boolean; $colPink?: boolean; $colBrown?: boolean; $colGrey?: boolean; $colBlack?: boolean; }

export enum size { standard, $s3, $mini, $s2, $tiny, $s1, $small, $1, $large, $2, $big, $3, $huge, $4, $massive, }
ui.registerEnum(size, '$Size', { $s3: 'mini', $s2: 'tiny', $s1: 'small', $1: 'large', $2: 'big', $3: 'huge', $4: 'massive' });
export interface IPropsSizeProp { $s3?: boolean; $mini?: boolean; $s2?: boolean; $tiny?: boolean; $s1?: boolean; $small?: boolean; $1?: boolean; $large?: boolean; $2?: boolean; $big?: boolean; $3?: boolean; $huge?: boolean; $4?: boolean; $massive?: boolean; }

export enum floated { no, $floatedLeft, $floatedRight, }
ui.registerEnum(floated, '$Floated', { $floatedLeft: 'leftFloated', $floatedRight: 'rightFloated' });
export interface IPropsFloatedProp { $floatedLeft?: boolean; $floatedRight?: boolean; }

export enum aligned { no, $alignedLeft, $alignedCenter, $alignedRight, $alignedTop, $alignedBottom, $alignedMiddle, }
ui.registerEnum(aligned, '$Aligned', { $alignedLeft: 'leftAligned', $alignedCenter: 'centerAligned', $alignedRight: '$rightAligned', $alignedTop: 'topAligned', $alignedBottom: 'bottomAligned', $alignedMiddle: 'middleAligned' });
export interface IPropsAlignedProp { $alignedLeft?: boolean; $alignedCenter?: boolean; $alignedRight?: boolean; $alignedTop?: boolean; $alignedBottom?: boolean; $alignedMiddle?: boolean; }

export enum column { no, $twoColumn, $threeColumn, $fourColumn, $fiveColumn, $sixColumn, $sevenColumn, $eightColumn, $nineColumn, $tenColumn, $elevenColumn, $twelveColumn, $thirteenColumn, $fourteenColumn, $fifteenColumn, $sixteenColumn, }
ui.registerEnum(column, '$Column');
export interface IPropsColumnProp { $twoColumn?: boolean; $threeColumn?: boolean; $fourColumn?: boolean; $fiveColumn?: boolean; $sixColumn?: boolean; $sevenColumn?: boolean; $eightColumn?: boolean; $nineColumn?: boolean; $tenColumn?: boolean; $elevenColumn?: boolean; $twelveColumn?: boolean; $thirteenColumn?: boolean; $fourteenColumn?: boolean; $fifteenColumn?: boolean; $sixteenColumn?: boolean; }

export enum deviceOnlyGrid { no, $mobileOnly, $tabletOnly, $computerOnly, $largeScreenOnly, $widescreenOnly, }
ui.registerEnum(deviceOnlyGrid, '$DeviceOnlyGrid');
export interface IPropsDeviceOnlyGridProp { $mobileOnly?: boolean; $tabletOnly?: boolean; $computerOnly?: boolean; $largeScreenOnly?: boolean; $widescreenOnly?: boolean; }

export enum relaxed { no, $relaxed, $relaxedVery, }
ui.registerEnum(relaxed, '$Relaxed', { $relaxedVery: 'veryRelaxed' });
export interface IPropsRelaxedProp { $relaxed?: boolean; $relaxedVery?: boolean; }

//**************************************************************
//*   BUTTON
//**************************************************************

export enum attachedButton { no, $attachedTop, $attachedBottom, $attachedLeft, $attachedRight, }
ui.registerEnum(attachedButton, '$Attached');
export interface IPropsAttachedButtonProp { $attachedTop?: boolean; $attachedBottom?: boolean; $attachedLeft?: boolean; $attachedRight?: boolean; }

export interface ButtonProps extends ui.IProps, IPropsAttachedButtonProp, IPropsSizeProp, IPropsColorProp, IPropsFloatedProp {
  $Attached?: attachedButton;
  $Size?: size;
  $Color?: color;
  $Floated?: floated;
  $basic?: boolean;
  $inverted?: boolean;
  $compact?: boolean;
  $fluid?: boolean;
  $circular?: boolean;
  $labeled?: boolean;
  $hasIcon?: boolean;
  $active?: boolean;
  $loading?: boolean;
  $disabled?: boolean;
  $primary?: boolean;
  $secondary?: boolean;
  $positive?: boolean;
  $negative?: boolean;
}

export var buttonPropsDescr = ui.createDescr<ButtonProps>(val => {
  return {
    $Attached: new ui.enumConverter<attachedButton>(attachedButton, val.$Attached),
    $Size: new ui.enumConverter<size>(size, val.$Size),
    $Color: new ui.enumConverter<color>(color, val.$Color),
    $Floated: new ui.enumConverter<floated>(floated, val.$Floated),
    $basic: new ui.boolConverter(val.$basic),
    $inverted: new ui.boolConverter(val.$inverted),
    $compact: new ui.boolConverter(val.$compact),
    $fluid: new ui.boolConverter(val.$fluid),
    $circular: new ui.boolConverter(val.$circular),
    $labeled: new ui.boolConverter(val.$labeled),
    $hasIcon: new ui.boolConverter(val.$hasIcon, true),
    $active: new ui.boolConverter(val.$active, true),
    $loading: new ui.boolConverter(val.$loading),
    $disabled: new ui.boolConverter(val.$disabled),
    $primary: new ui.boolConverter(val.$primary),
    $secondary: new ui.boolConverter(val.$secondary),
    $positive: new ui.boolConverter(val.$positive),
    $negative: new ui.boolConverter(val.$negative)
  };
});

export const Button: ui.StatelessComponent<ButtonProps> = pr => {
  var props: ButtonProps = ui.enumValToProp(pr);
  var rest = ui.propsToClasses(['ui button', { icon: props.$hasIcon, active: props.$active }], ui.projection(props, buttonPropsDescr));
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

export var buttonAnimatedPropsDescr = ui.createDescr<ButtonAnimatedProps>(val => {
  return {

    $animateTo: null,
  };
}, buttonPropsDescr);

//**************************************************************
//*   BUTTONICON
//**************************************************************

export enum iconLabel { no, $iconLabelRight, $iconLabelLeft, }
ui.registerEnum(iconLabel, '$IconLabel');
export interface IPropsIconLabelProp { $iconLabelRight?: boolean; $iconLabelLeft?: boolean; }

export interface ButtonIconProps extends ButtonProps, IPropsIconLabelProp, IPropsIconProp {
  $IconLabel?: iconLabel;
  $Icon?: icon;
}

export var buttonIconPropsDescr = ui.createDescr<ButtonIconProps>(val => {
  return {
    $IconLabel: new ui.enumConverter<iconLabel>(iconLabel, val.$IconLabel),
    $Icon: new ui.enumConverter<icon>(icon, val.$Icon)
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

export var buttonLabeledPropsDescr = ui.createDescr<ButtonLabeledProps>(val => {
  return {
    $pointing: new ui.boolConverter(val.$pointing),
    $left: new ui.boolConverter(val.$left)
    , $label: null
  };
}, buttonPropsDescr);

//**************************************************************
//*   BUTTONS
//**************************************************************

export enum eqWidth { no, $two, $three, $four, $five, $six, $seven, $eight, $nine, $ten, $eleven, $twelve, }
ui.registerEnum(eqWidth, '$EqWidth');
export interface IPropsEqWidthProp { $two?: boolean; $three?: boolean; $four?: boolean; $five?: boolean; $six?: boolean; $seven?: boolean; $eight?: boolean; $nine?: boolean; $ten?: boolean; $eleven?: boolean; $twelve?: boolean; }

export interface ButtonsProps extends ui.IProps, IPropsEqWidthProp, IPropsSizeProp, IPropsColorProp {
  $EqWidth?: eqWidth;
  $Size?: size;
  $Color?: color;
  $vertical?: boolean;
  $labeled?: boolean;
  $basic?: boolean;
  $hasIcon?: boolean;
}

export var buttonsPropsDescr = ui.createDescr<ButtonsProps>(val => {
  return {
    $EqWidth: new ui.enumConverter<eqWidth>(eqWidth, val.$EqWidth),
    $Size: new ui.enumConverter<size>(size, val.$Size),
    $Color: new ui.enumConverter<color>(color, val.$Color),
    $vertical: new ui.boolConverter(val.$vertical),
    $labeled: new ui.boolConverter(val.$labeled),
    $basic: new ui.boolConverter(val.$basic),
    $hasIcon: new ui.boolConverter(val.$hasIcon)
  };
});

//**************************************************************
//*   BUTTONSOCIAL
//**************************************************************

export enum social { no, $facebook, $twitter, $googlePlus, $vk, $linkedin, $instagram, $youtube, }
ui.registerEnum(social, '$Social');
export interface IPropsSocialProp { $facebook?: boolean; $twitter?: boolean; $googlePlus?: boolean; $vk?: boolean; $linkedin?: boolean; $instagram?: boolean; $youtube?: boolean; }

export interface ButtonSocialProps extends ButtonProps, IPropsSocialProp {
  $Social?: social;
}

export var buttonSocialPropsDescr = ui.createDescr<ButtonSocialProps>(val => {
  return {
    $Social: new ui.enumConverter<social>(social, val.$Social)
  };
}, buttonPropsDescr);

//**************************************************************
//*   CONTAINER
//**************************************************************

export enum alignedContainer { no, $alignedLeft, $alignedCenter, $alignedRight, }
ui.registerEnum(alignedContainer, '$Aligned', { $alignedLeft: 'leftAligned', $alignedCenter: 'centerAligned', $alignedRight: '$rightAligned', });
export interface IPropsAlignedContainerProp { $alignedLeft?: boolean; $alignedCenter?: boolean; $alignedRight?: boolean; }

export interface ContainerProps extends ui.IProps, IPropsAlignedContainerProp {
  $Aligned?: alignedContainer;
  $text?: boolean;
  $justified?: boolean;
  $fluid?: boolean;
}

export var containerPropsDescr = ui.createDescr<ContainerProps>(val => {
  return {
    $Aligned: new ui.enumConverter<alignedContainer>(alignedContainer, val.$Aligned),
    $text: new ui.boolConverter(val.$text),
    $justified: new ui.boolConverter(val.$justified),
    $fluid: new ui.boolConverter(val.$fluid)
  };
});

export const Container: ui.StatelessComponent<ContainerProps> = pr => {
  var props: ContainerProps = ui.enumValToProp(pr);
  var rest = ui.propsToClasses(['ui container'], ui.projection(props, containerPropsDescr));
  return React.createElement('div', rest, pr.children);
}


//**************************************************************
//*   DIVIDER
//**************************************************************

export enum divider { standard, $horizontal, $vertical, }
ui.registerEnum(divider, '$Divider');
export interface IPropsDividerProp { $horizontal?: boolean; $vertical?: boolean; }

export interface DividerProps extends ui.IProps, IPropsDividerProp {
  $Divider?: divider;
  $clearing?: boolean;
  $section?: boolean;
  $hidden?: boolean;
  $fitted?: boolean;
  $inverted?: boolean;
}

export var dividerPropsDescr = ui.createDescr<DividerProps>(val => {
  return {
    $Divider: new ui.enumConverter<divider>(divider, val.$Divider),
    $clearing: new ui.boolConverter(val.$clearing),
    $section: new ui.boolConverter(val.$section),
    $hidden: new ui.boolConverter(val.$hidden),
    $fitted: new ui.boolConverter(val.$fitted),
    $inverted: new ui.boolConverter(val.$inverted)
  };
});

export const Divider: ui.StatelessComponent<DividerProps> = pr => {
  var props: DividerProps = ui.enumValToProp(pr);
  var rest = ui.propsToClasses(['ui divider'], ui.projection(props, dividerPropsDescr));
  return React.createElement('div', rest, pr.children);
}


//**************************************************************
//*   FLAG
//**************************************************************    
export interface FlagProps extends ui.IProps, IPropsColorProp {
  $Color?: color;
  $Flag?: flag;
  $FlagShort?: flagShort;
}

export var flagPropsDescr = ui.createDescr<FlagProps>(val => {
  return {
    $Color: new ui.enumConverter<color>(color, val.$Color)
    , $Flag: new ui.enumConverter<flag>(flag, val.$Flag),
    $FlagShort: new ui.enumConverter<flagShort>(flagShort, val.$FlagShort),
  };
});

export const Flag: ui.StatelessComponent<FlagProps> = pr => {
  var props: FlagProps = ui.enumValToProp(pr);
  var rest = ui.propsToClasses(['ui flag'], ui.projection(props, flagPropsDescr));
  return React.createElement('i', rest, pr.children);
}


//**************************************************************
//*   HEADER
//**************************************************************    
export interface HeaderProps extends ui.IProps {

}

export var headerPropsDescr = ui.createDescr<HeaderProps>(val => {
  return {

  };
});

//**************************************************************
//*   ICON
//**************************************************************

export enum flipped { no, $flippedHorizontally, $flippedVertically, }
ui.registerEnum(flipped, '$Flipped');
export interface IPropsFlippedProp { $flippedHorizontally?: boolean; $flippedVertically?: boolean; }

export enum rotated { no, $rotatedClockwise, $rotatedCounterclockwise, }
ui.registerEnum(rotated, '$Rotated');
export interface IPropsRotatedProp { $rotatedClockwise?: boolean; $rotatedCounterclockwise?: boolean; }

export enum circularIcon { no, $circularStandard, $circularInverted, }
ui.registerEnum(circularIcon, '$Circular', { $circularStandard: 'circular' });
export interface IPropsCircularIconProp { $circularStandard?: boolean; $circularInverted?: boolean; }

export enum bordered { no, $borderedStandard, $borderedInverted, }
ui.registerEnum(bordered, '$Bordered', { $borderedStandard: 'bordered' });
export interface IPropsBorderedProp { $borderedStandard?: boolean; $borderedInverted?: boolean; }

export interface IconProps extends ui.IProps, IPropsFlippedProp, IPropsRotatedProp, IPropsCircularIconProp, IPropsBorderedProp, IPropsIconProp, IPropsSizeProp, IPropsColorProp {
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

export var iconPropsDescr = ui.createDescr<IconProps>(val => {
  return {
    $Flipped: new ui.enumConverter<flipped>(flipped, val.$Flipped),
    $Rotated: new ui.enumConverter<rotated>(rotated, val.$Rotated),
    $Circular: new ui.enumConverter<circularIcon>(circularIcon, val.$Circular),
    $Bordered: new ui.enumConverter<bordered>(bordered, val.$Bordered),
    $Icon: new ui.enumConverter<icon>(icon, val.$Icon),
    $Size: new ui.enumConverter<size>(size, val.$Size),
    $Color: new ui.enumConverter<color>(color, val.$Color),
    $disabled: new ui.boolConverter(val.$disabled),
    $loading: new ui.boolConverter(val.$loading),
    $fitted: new ui.boolConverter(val.$fitted),
    $link: new ui.boolConverter(val.$link),
    $inverted: new ui.boolConverter(val.$inverted),
    $corner: new ui.boolConverter(val.$corner)
  };
});

export const Icon: ui.StatelessComponent<IconProps> = pr => {
  var props: IconProps = ui.enumValToProp(pr);
  var rest = ui.propsToClasses(['icon'], ui.projection(props, iconPropsDescr));
  return React.createElement('i', rest, pr.children);
}


//**************************************************************
//*   ICONS
//**************************************************************    
export interface IconsProps extends ui.IProps, IPropsSizeProp {
  $Size?: size;
}

export var iconsPropsDescr = ui.createDescr<IconsProps>(val => {
  return {
    $Size: new ui.enumConverter<size>(size, val.$Size)
  };
});

export const Icons: ui.StatelessComponent<IconsProps> = pr => {
  var props: IconsProps = ui.enumValToProp(pr);
  var rest = ui.propsToClasses(['icons'], ui.projection(props, iconsPropsDescr));
  return React.createElement('i', rest, pr.children);
}


//**************************************************************
//*   IMAGE
//**************************************************************    
export interface ImageProps extends ui.IProps {

}

export var imagePropsDescr = ui.createDescr<ImageProps>(val => {
  return {

  };
});

//**************************************************************
//*   INPUT
//**************************************************************    
export interface InputProps extends ui.IProps {

}

export var inputPropsDescr = ui.createDescr<InputProps>(val => {
  return {

  };
});

//**************************************************************
//*   LABEL
//**************************************************************

export enum pointing { no, $pointingAbove, $pointingBelow, $pointingLeft, $pointingRight, }
ui.registerEnum(pointing, '$Pointing', { $pointingAbove: 'pointing', $pointingLeft: 'leftPointing', $pointingRight: 'rightPointing' });
export interface IPropsPointingProp { $pointingAbove?: boolean; $pointingBelow?: boolean; $pointingLeft?: boolean; $pointingRight?: boolean; }

export enum corner { no, $cornerLeft, $cornerRight, }
ui.registerEnum(corner, '$Corner');
export interface IPropsCornerProp { $cornerLeft?: boolean; $cornerRight?: boolean; }

export enum attachedLabel { no, $attachedTop, $attachedBottom, $attachedTopRight, $attachedTopLeft, $attachedBottomRight, $attachedBottomLeft, }
ui.registerEnum(attachedLabel, '$Attached', { $attachedBottom: 'bottomAttached', $attachedTop: 'topAttached', $attachedTopRight: 'topRightAttached', $attachedTopLeft: 'topLeftAttached', $attachedBottomRight: 'bottomRightAttached', $attachedBottomLeft: 'bottomLeftAttached' });
export interface IPropsAttachedLabelProp { $attachedTop?: boolean; $attachedBottom?: boolean; $attachedTopRight?: boolean; $attachedTopLeft?: boolean; $attachedBottomRight?: boolean; $attachedBottomLeft?: boolean; }

export enum circularLabel { no, $circularStandard, $circularEmpty, }
ui.registerEnum(circularLabel, '$Circular');
export interface IPropsCircularLabelProp { $circularStandard?: boolean; $circularEmpty?: boolean; }

export enum ribbon { no, $ribbonLeft, $ribbonRight, }
ui.registerEnum(ribbon, '$Ribbon');
export interface IPropsRibbonProp { $ribbonLeft?: boolean; $ribbonRight?: boolean; }

export interface LabelProps extends ui.IProps, IPropsPointingProp, IPropsCornerProp, IPropsAttachedLabelProp, IPropsCircularLabelProp, IPropsRibbonProp, IPropsSizeProp, IPropsColorProp {
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

export var labelPropsDescr = ui.createDescr<LabelProps>(val => {
  return {
    $Pointing: new ui.enumConverter<pointing>(pointing, val.$Pointing),
    $Corner: new ui.enumConverter<corner>(corner, val.$Corner),
    $Attached: new ui.enumConverter<attachedLabel>(attachedLabel, val.$Attached),
    $Circular: new ui.enumConverter<circularLabel>(circularLabel, val.$Circular),
    $Ribbon: new ui.enumConverter<ribbon>(ribbon, val.$Ribbon),
    $Size: new ui.enumConverter<size>(size, val.$Size),
    $Color: new ui.enumConverter<color>(color, val.$Color),
    $image: new ui.boolConverter(val.$image),
    $basic: new ui.boolConverter(val.$basic),
    $tag: new ui.boolConverter(val.$tag),
    $horizontal: new ui.boolConverter(val.$horizontal),
    $floating: new ui.boolConverter(val.$floating)
  };
});

export const Label: ui.StatelessComponent<LabelProps> = pr => {
  var props: LabelProps = ui.enumValToProp(pr);
  var rest = ui.propsToClasses(['ui label'], ui.projection(props, labelPropsDescr));
  return React.createElement(props.$outerTag ? props.$outerTag : 'span', rest, pr.children);
}


//**************************************************************
//*   LABELS
//**************************************************************    
export interface LabelsProps extends ui.IProps, IPropsSizeProp, IPropsColorProp {
  $Size?: size;
  $Color?: color;
  $tag?: boolean;
  $circular?: boolean;
}

export var labelsPropsDescr = ui.createDescr<LabelsProps>(val => {
  return {
    $Size: new ui.enumConverter<size>(size, val.$Size),
    $Color: new ui.enumConverter<color>(color, val.$Color),
    $tag: new ui.boolConverter(val.$tag),
    $circular: new ui.boolConverter(val.$circular)
  };
});

export const Labels: ui.StatelessComponent<LabelsProps> = pr => {
  var props: LabelsProps = ui.enumValToProp(pr);
  var rest = ui.propsToClasses(['ui labels'], ui.projection(props, labelsPropsDescr));
  return React.createElement('div', rest, pr.children);
}


//**************************************************************
//*   LIST
//**************************************************************    
export interface ListProps extends ui.IProps {

}

export var listPropsDescr = ui.createDescr<ListProps>(val => {
  return {

  };
});

//**************************************************************
//*   LOADER
//**************************************************************    
export interface LoaderProps extends ui.IProps {

}

export var loaderPropsDescr = ui.createDescr<LoaderProps>(val => {
  return {

  };
});

//**************************************************************
//*   RAIL
//**************************************************************    
export interface RailProps extends ui.IProps {

}

export var railPropsDescr = ui.createDescr<RailProps>(val => {
  return {

  };
});

//**************************************************************
//*   REVEAL
//**************************************************************    
export interface RevealProps extends ui.IProps {

}

export var revealPropsDescr = ui.createDescr<RevealProps>(val => {
  return {

  };
});

//**************************************************************
//*   SEGMENT
//**************************************************************

export enum raised { no, $raisedStandard, $raisedStacked, $raisedPiled, $raisedStackedTall, }
ui.registerEnum(raised, '$Raised', { $raisedStandard: 'raised', $raisedStacked: 'stacked', $raisedStackedTall: 'stackedTall', $raisedPiled: 'piled' });
export interface IPropsRaisedProp { $raisedStandard?: boolean; $raisedStacked?: boolean; $raisedPiled?: boolean; $raisedStackedTall?: boolean; }

export enum attachedSegment { no, $attachedTop, $attachedBottom, $attachedBoth, }
ui.registerEnum(attachedSegment, '$Attached', { $attachedBoth: 'attached' });
export interface IPropsAttachedSegmentProp { $attachedTop?: boolean; $attachedBottom?: boolean; $attachedBoth?: boolean; }

export enum padded { no, $paddedStandard, $paddedVery, }
ui.registerEnum(padded, '$Padded', { $paddedVery: 'veryPadded' });
export interface IPropsPaddedProp { $paddedStandard?: boolean; $paddedVery?: boolean; }

export enum emphasis { standard, $secondary, $tertiary, }
ui.registerEnum(emphasis, '$Emphasis');
export interface IPropsEmphasisProp { $secondary?: boolean; $tertiary?: boolean; }

export interface SegmentProps extends ui.IProps, IPropsRaisedProp, IPropsAttachedSegmentProp, IPropsPaddedProp, IPropsEmphasisProp, IPropsAlignedProp, IPropsColorProp, IPropsFloatedProp {
  $Raised?: raised;
  $Attached?: attachedSegment;
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
  $header?: boolean;
  $outerTag?: string;
}

export var segmentPropsDescr = ui.createDescr<SegmentProps>(val => {
  return {
    $Raised: new ui.enumConverter<raised>(raised, val.$Raised),
    $Attached: new ui.enumConverter<attachedSegment>(attachedSegment, val.$Attached),
    $Padded: new ui.enumConverter<padded>(padded, val.$Padded),
    $Emphasis: new ui.enumConverter<emphasis>(emphasis, val.$Emphasis),
    $Aligned: new ui.enumConverter<aligned>(aligned, val.$Aligned),
    $Color: new ui.enumConverter<color>(color, val.$Color),
    $Floated: new ui.enumConverter<floated>(floated, val.$Floated),
    $vertical: new ui.boolConverter(val.$vertical),
    $disabled: new ui.boolConverter(val.$disabled),
    $loading: new ui.boolConverter(val.$loading),
    $inverted: new ui.boolConverter(val.$inverted),
    $compact: new ui.boolConverter(val.$compact),
    $circular: new ui.boolConverter(val.$circular),
    $clearing: new ui.boolConverter(val.$clearing),
    $basic: new ui.boolConverter(val.$basic),
    $container: new ui.boolConverter(val.$container),
    $containerText: new ui.boolConverter(val.$containerText, false, 'text'),
    $header: new ui.boolConverter(val.$header)
  };
});

export const Segment: ui.StatelessComponent<SegmentProps> = pr => {
  var props: SegmentProps = ui.enumValToProp(pr);
  var rest = ui.propsToClasses(['ui segment'], ui.projection(props, segmentPropsDescr));
  return React.createElement(props.$outerTag ? props.$outerTag : 'div', rest, pr.children);
}


//**************************************************************
//*   SEGMENTS
//**************************************************************

export enum raisedSegments { no, $raisedStandard, $raisedStacked, $raisedPiled, }
ui.registerEnum(raisedSegments, '$Raised', { $raisedStandard: 'raised', $raisedStacked: 'stacked', $raisedPiled: 'piled' });
export interface IPropsRaisedSegmentsProp { $raisedStandard?: boolean; $raisedStacked?: boolean; $raisedPiled?: boolean; }

export interface SegmentsProps extends ui.IProps, IPropsRaisedSegmentsProp {
  $Raised?: raisedSegments;
  $compact?: boolean;
  $horizontal?: boolean;
}

export var segmentsPropsDescr = ui.createDescr<SegmentsProps>(val => {
  return {
    $Raised: new ui.enumConverter<raisedSegments>(raisedSegments, val.$Raised),
    $compact: new ui.boolConverter(val.$compact),
    $horizontal: new ui.boolConverter(val.$horizontal)
  };
});

export const Segments: ui.StatelessComponent<SegmentsProps> = pr => {
  var props: SegmentsProps = ui.enumValToProp(pr);
  var rest = ui.propsToClasses(['ui segments'], ui.projection(props, segmentsPropsDescr));
  return React.createElement('div', rest, pr.children);
}


//**************************************************************
//*   STEP
//**************************************************************    
export interface StepProps extends ui.IProps {

}

export var stepPropsDescr = ui.createDescr<StepProps>(val => {
  return {

  };
});

//**************************************************************
//*   AD
//**************************************************************    
export interface AdProps extends ui.IProps {

}

export var adPropsDescr = ui.createDescr<AdProps>(val => {
  return {

  };
});

//**************************************************************
//*   CARD
//**************************************************************    
export interface CardProps extends ui.IProps {

}

export var cardPropsDescr = ui.createDescr<CardProps>(val => {
  return {

  };
});

//**************************************************************
//*   COMMENT
//**************************************************************    
export interface CommentProps extends ui.IProps {

}

export var commentPropsDescr = ui.createDescr<CommentProps>(val => {
  return {

  };
});

//**************************************************************
//*   FEED
//**************************************************************    
export interface FeedProps extends ui.IProps {

}

export var feedPropsDescr = ui.createDescr<FeedProps>(val => {
  return {

  };
});

//**************************************************************
//*   ITEM
//**************************************************************    
export interface ItemProps extends ui.IProps {

}

export var itemPropsDescr = ui.createDescr<ItemProps>(val => {
  return {

  };
});

//**************************************************************
//*   STATISTIC
//**************************************************************    
export interface StatisticProps extends ui.IProps {

}

export var statisticPropsDescr = ui.createDescr<StatisticProps>(val => {
  return {

  };
});

//**************************************************************
//*   BREADCRUMB
//**************************************************************    
export interface BreadcrumbProps extends ui.IProps {

}

export var breadcrumbPropsDescr = ui.createDescr<BreadcrumbProps>(val => {
  return {

  };
});

//**************************************************************
//*   COLUMN
//**************************************************************

export enum wide { no, $twoWide, $threeWide, $fourWide, $fiveWide, $sixWide, $sevenWide, $eightWide, $nineWide, $tenWide, $elevenWide, $twelveWide, $thirteenWide, $fourteenWide, $fifteenWide, $sixteenWide, }
ui.registerEnum(wide, '$Wide');
export interface IPropsWideProp { $twoWide?: boolean; $threeWide?: boolean; $fourWide?: boolean; $fiveWide?: boolean; $sixWide?: boolean; $sevenWide?: boolean; $eightWide?: boolean; $nineWide?: boolean; $tenWide?: boolean; $elevenWide?: boolean; $twelveWide?: boolean; $thirteenWide?: boolean; $fourteenWide?: boolean; $fifteenWide?: boolean; $sixteenWide?: boolean; }

export enum wideMobile { no, $twoWideMobile, $threeWideMobile, $fourWideMobile, $fiveWideMobile, $sixWideMobile, $sevenWideMobile, $eightWideMobile, $nineWideMobile, $tenWideMobile, $elevenWideMobile, $twelveWideMobile, $thirteenWideMobile, $fourteenWideMobile, $fifteenWideMobile, $sixteenWideMobile, }
ui.registerEnum(wideMobile, '$WideMobile');
export interface IPropsWideMobileProp { $twoWideMobile?: boolean; $threeWideMobile?: boolean; $fourWideMobile?: boolean; $fiveWideMobile?: boolean; $sixWideMobile?: boolean; $sevenWideMobile?: boolean; $eightWideMobile?: boolean; $nineWideMobile?: boolean; $tenWideMobile?: boolean; $elevenWideMobile?: boolean; $twelveWideMobile?: boolean; $thirteenWideMobile?: boolean; $fourteenWideMobile?: boolean; $fifteenWideMobile?: boolean; $sixteenWideMobile?: boolean; }

export enum wideTablet { no, $twoWideTablet, $threeWideTablet, $fourWideTablet, $fiveWideTablet, $sixWideTablet, $sevenWideTablet, $eightWideTablet, $nineWideTablet, $tenWideTablet, $elevenWideTablet, $twelveWideTablet, $thirteenWideTablet, $fourteenWideTablet, $fifteenWideTablet, $sixteenWideTablet, }
ui.registerEnum(wideTablet, '$WideTablet');
export interface IPropsWideTabletProp { $twoWideTablet?: boolean; $threeWideTablet?: boolean; $fourWideTablet?: boolean; $fiveWideTablet?: boolean; $sixWideTablet?: boolean; $sevenWideTablet?: boolean; $eightWideTablet?: boolean; $nineWideTablet?: boolean; $tenWideTablet?: boolean; $elevenWideTablet?: boolean; $twelveWideTablet?: boolean; $thirteenWideTablet?: boolean; $fourteenWideTablet?: boolean; $fifteenWideTablet?: boolean; $sixteenWideTablet?: boolean; }

export enum wideComputer { no, $twoWideComputer, $threeWideComputer, $fourWideComputer, $fiveWideComputer, $sixWideComputer, $sevenWideComputer, $eightWideComputer, $nineWideComputer, $tenWideComputer, $elevenWideComputer, $twelveWideComputer, $thirteenWideComputer, $fourteenWideComputer, $fifteenWideComputer, $sixteenWideComputer, }
ui.registerEnum(wideComputer, '$WideComputer');
export interface IPropsWideComputerProp { $twoWideComputer?: boolean; $threeWideComputer?: boolean; $fourWideComputer?: boolean; $fiveWideComputer?: boolean; $sixWideComputer?: boolean; $sevenWideComputer?: boolean; $eightWideComputer?: boolean; $nineWideComputer?: boolean; $tenWideComputer?: boolean; $elevenWideComputer?: boolean; $twelveWideComputer?: boolean; $thirteenWideComputer?: boolean; $fourteenWideComputer?: boolean; $fifteenWideComputer?: boolean; $sixteenWideComputer?: boolean; }

export enum wideLargeScreen { no, $twoWideLargeScreen, $threeWideLargeScreen, $fourWideLargeScreen, $fiveWideLargeScreen, $sixWideLargeScreen, $sevenWideLargeScreen, $eightWideLargeScreen, $nineWideLargeScreen, $tenWideLargeScreen, $elevenWideLargeScreen, $twelveWideLargeScreen, $thirteenWideLargeScreen, $fourteenWideLargeScreen, $fifteenWideLargeScreen, $sixteenWideScreen, }
ui.registerEnum(wideLargeScreen, '$WideLargeScreen');
export interface IPropsWideLargeScreenProp { $twoWideLargeScreen?: boolean; $threeWideLargeScreen?: boolean; $fourWideLargeScreen?: boolean; $fiveWideLargeScreen?: boolean; $sixWideLargeScreen?: boolean; $sevenWideLargeScreen?: boolean; $eightWideLargeScreen?: boolean; $nineWideLargeScreen?: boolean; $tenWideLargeScreen?: boolean; $elevenWideLargeScreen?: boolean; $twelveWideLargeScreen?: boolean; $thirteenWideLargeScreen?: boolean; $fourteenWideLargeScreen?: boolean; $fifteenWideLargeScreen?: boolean; $sixteenWideScreen?: boolean; }

export enum wideWidescreen { no, $twoWideWidescreen, $threeWideWidescreen, $fourWideWidescreen, $fiveWideWidescreen, $sixWideWidescreen, $sevenWideWidescreen, $eightWideWidescreen, $nineWideWidescreen, $tenWideWidescreen, $elevenWideWidescreen, $twelveWideWidescreen, $thirteenWideWidescreen, $fourteenWideWidescreen, $fifteenWideWidescreen, $sixteenWideWideScreen, }
ui.registerEnum(wideWidescreen, '$WideWidescreen');
export interface IPropsWideWidescreenProp { $twoWideWidescreen?: boolean; $threeWideWidescreen?: boolean; $fourWideWidescreen?: boolean; $fiveWideWidescreen?: boolean; $sixWideWidescreen?: boolean; $sevenWideWidescreen?: boolean; $eightWideWidescreen?: boolean; $nineWideWidescreen?: boolean; $tenWideWidescreen?: boolean; $elevenWideWidescreen?: boolean; $twelveWideWidescreen?: boolean; $thirteenWideWidescreen?: boolean; $fourteenWideWidescreen?: boolean; $fifteenWideWidescreen?: boolean; $sixteenWideWideScreen?: boolean; }

export interface ColumnProps extends ui.IProps, IPropsWideProp, IPropsWideMobileProp, IPropsWideTabletProp, IPropsWideComputerProp, IPropsWideLargeScreenProp, IPropsWideWidescreenProp, IPropsFloatedProp, IPropsAlignedProp, IPropsColorProp, IPropsDeviceOnlyGridProp {
  $Wide?: wide;
  $WideMobile?: wideMobile;
  $WideTablet?: wideTablet;
  $WideComputer?: wideComputer;
  $WideLargeScreen?: wideLargeScreen;
  $WideWidescreen?: wideWidescreen;
  $Floated?: floated;
  $Aligned?: aligned;
  $Color?: color;
  $DeviceOnlyGrid?: deviceOnlyGrid;
  $relaxed?: boolean;
}

export var columnPropsDescr = ui.createDescr<ColumnProps>(val => {
  return {
    $Wide: new ui.enumConverter<wide>(wide, val.$Wide),
    $WideMobile: new ui.enumConverter<wideMobile>(wideMobile, val.$WideMobile),
    $WideTablet: new ui.enumConverter<wideTablet>(wideTablet, val.$WideTablet),
    $WideComputer: new ui.enumConverter<wideComputer>(wideComputer, val.$WideComputer),
    $WideLargeScreen: new ui.enumConverter<wideLargeScreen>(wideLargeScreen, val.$WideLargeScreen),
    $WideWidescreen: new ui.enumConverter<wideWidescreen>(wideWidescreen, val.$WideWidescreen),
    $Floated: new ui.enumConverter<floated>(floated, val.$Floated),
    $Aligned: new ui.enumConverter<aligned>(aligned, val.$Aligned),
    $Color: new ui.enumConverter<color>(color, val.$Color),
    $DeviceOnlyGrid: new ui.enumConverter<deviceOnlyGrid>(deviceOnlyGrid, val.$DeviceOnlyGrid),
    $relaxed: new ui.boolConverter(val.$relaxed)
  };
});

export const Column: ui.StatelessComponent<ColumnProps> = pr => {
  var props: ColumnProps = ui.enumValToProp(pr);
  var rest = ui.propsToClasses(['column'], ui.projection(props, columnPropsDescr));
  return React.createElement('div', rest, pr.children);
}


//**************************************************************
//*   FORM
//**************************************************************    
export interface FormProps extends ui.IProps {

}

export var formPropsDescr = ui.createDescr<FormProps>(val => {
  return {

  };
});

//**************************************************************
//*   GRID
//**************************************************************

export enum divided { no, $dividedHorizontally, $dividedVertically, }
ui.registerEnum(divided, '$Divided', { $dividedHorizontally: 'divided', $dividedVertically: 'verticallyDivided' });
export interface IPropsDividedProp { $dividedHorizontally?: boolean; $dividedVertically?: boolean; }

export enum celled { no, $celled, $celledInternally, }
ui.registerEnum(celled, '$Celled', { $celledInternally: 'internallyCelled' });
export interface IPropsCelledProp { $celled?: boolean; $celledInternally?: boolean; }

export enum paddedGrid { no, $padded, $paddedHorizontally, $paddedVertically, }
ui.registerEnum(paddedGrid, '$PaddedGrid', { $paddedHorizontally: '$horizontallyPadded', $paddedVertically: 'verticallyPadded' });
export interface IPropsPaddedGridProp { $padded?: boolean; $paddedHorizontally?: boolean; $paddedVertically?: boolean; }

export interface GridProps extends ui.IProps, IPropsDividedProp, IPropsCelledProp, IPropsPaddedGridProp, IPropsColumnProp, IPropsAlignedProp, IPropsRelaxedProp {
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

export var gridPropsDescr = ui.createDescr<GridProps>(val => {
  return {
    $Divided: new ui.enumConverter<divided>(divided, val.$Divided),
    $Celled: new ui.enumConverter<celled>(celled, val.$Celled),
    $PaddedGrid: new ui.enumConverter<paddedGrid>(paddedGrid, val.$PaddedGrid),
    $Column: new ui.enumConverter<column>(column, val.$Column),
    $Aligned: new ui.enumConverter<aligned>(aligned, val.$Aligned),
    $Relaxed: new ui.enumConverter<relaxed>(relaxed, val.$Relaxed),
    $internallyCelled: new ui.boolConverter(val.$internallyCelled),
    $equalWidth: new ui.boolConverter(val.$equalWidth),
    $centered: new ui.boolConverter(val.$centered),
    $stackable: new ui.boolConverter(val.$stackable),
    $container: new ui.boolConverter(val.$container),
    $reversed: new ui.boolConverter(val.$reversed),
    $doubling: new ui.boolConverter(val.$doubling)
  };
});

export const Grid: ui.StatelessComponent<GridProps> = pr => {
  var props: GridProps = ui.enumValToProp(pr);
  var rest = ui.propsToClasses(['ui grid'], ui.projection(props, gridPropsDescr));
  return React.createElement('div', rest, pr.children);
}


//**************************************************************
//*   MENU
//**************************************************************    
export interface MenuProps extends ui.IProps {

}

export var menuPropsDescr = ui.createDescr<MenuProps>(val => {
  return {

  };
});

//**************************************************************
//*   MESSAGE
//**************************************************************    
export interface MessageProps extends ui.IProps {

}

export var messagePropsDescr = ui.createDescr<MessageProps>(val => {
  return {

  };
});

//**************************************************************
//*   ROW
//**************************************************************    
export interface RowProps extends ui.IProps, IPropsColumnProp, IPropsDeviceOnlyGridProp, IPropsAlignedProp, IPropsColorProp, IPropsRelaxedProp {
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

export var rowPropsDescr = ui.createDescr<RowProps>(val => {
  return {
    $Column: new ui.enumConverter<column>(column, val.$Column),
    $DeviceOnlyGrid: new ui.enumConverter<deviceOnlyGrid>(deviceOnlyGrid, val.$DeviceOnlyGrid),
    $Aligned: new ui.enumConverter<aligned>(aligned, val.$Aligned),
    $Color: new ui.enumConverter<color>(color, val.$Color),
    $Relaxed: new ui.enumConverter<relaxed>(relaxed, val.$Relaxed),
    $reversed: new ui.boolConverter(val.$reversed),
    $doubling: new ui.boolConverter(val.$doubling),
    $equalWidth: new ui.boolConverter(val.$equalWidth),
    $centered: new ui.boolConverter(val.$centered),
    $stretched: new ui.boolConverter(val.$stretched),
    $justified: new ui.boolConverter(val.$justified)
  };
});

export const Row: ui.StatelessComponent<RowProps> = pr => {
  var props: RowProps = ui.enumValToProp(pr);
  var rest = ui.propsToClasses(['ui row'], ui.projection(props, rowPropsDescr));
  return React.createElement('div', rest, pr.children);
}


//**************************************************************
//*   TABLE
//**************************************************************    
export interface TableProps extends ui.IProps {

}

export var tablePropsDescr = ui.createDescr<TableProps>(val => {
  return {

  };
});