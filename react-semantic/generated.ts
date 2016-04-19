//********* This code is generated - do not modify it!

//content for "import {} from '???/exports"'
/*
  color, size, floated, icon, flag, flagShort,
  Button, attachedButton,
  ButtonAnimated,
  ButtonIcon, iconLabel,
  ButtonLabeled,
  Buttons, eqWidth,
  ButtonSocial, social,
  Divider,
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
  Segment, raised, attachedSegment, padded, emphasis, aligned,
  Segments, raisedSegments,
  Step,
  Ad,
  Card,
  Comment,
  Feed,
  Item,
  Statistic,
  Breadcrumb,
  Form,
  Grid,
  Menu,
  Message,
  Table
*/

//content for "export {} from '/.generated"'
/*
export {
  animate, animateTo, color, size, floated,
  Button, ButtonProps, attachedButton,
  ButtonAnimatedProps,
  ButtonIconProps, iconLabel,
  ButtonLabeledProps,
  ButtonsProps, eqWidth,
  ButtonSocialProps, social,
  DividerProps,
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
  Segment, SegmentProps, raised, attachedSegment, padded, emphasis, aligned,
  Segments, SegmentsProps, raisedSegments,
  StepProps,
  AdProps,
  CardProps,
  CommentProps,
  FeedProps,
  ItemProps,
  StatisticProps,
  BreadcrumbProps,
  FormProps,
  GridProps,
  MenuProps,
  MessageProps,
  TableProps,
} from './generated';
*/

import * as React from 'react';
import * as ui from './lib';
import {icon, flag, flagShort} from './largeEnums';

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
  return React.createElement(props.$Attached ? 'div' : 'button', rest);
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
//*   DIVIDER
//**************************************************************    
export interface DividerProps extends ui.IProps {

}

export var dividerPropsDescr = ui.createDescr<DividerProps>(val => {
  return {

  };
});

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
  return React.createElement('i', rest);
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
  return React.createElement('i', rest);
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
  return React.createElement('i', rest);
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
  return React.createElement(props.$outerTag ? props.$outerTag : 'span', rest);
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
  return React.createElement('div', rest);
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

export enum aligned { no, $alignedLeft, $alignedCenter, $alignedRight, }
ui.registerEnum(aligned, '$Aligned', { $alignedLeft: 'leftAligned', $alignedCenter: 'centerAligned', $alignedRight: '$rightAligned' });
export interface IPropsAlignedProp { $alignedLeft?: boolean; $alignedCenter?: boolean; $alignedRight?: boolean; }

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
    $basic: new ui.boolConverter(val.$basic)
  };
});

export const Segment: ui.StatelessComponent<SegmentProps> = pr => {
  var props: SegmentProps = ui.enumValToProp(pr);
  var rest = ui.propsToClasses(['ui segment'], ui.projection(props, segmentPropsDescr));
  return React.createElement('div', rest);
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
  return React.createElement('div', rest);
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
export interface GridProps extends ui.IProps {

}

export var gridPropsDescr = ui.createDescr<GridProps>(val => {
  return {

  };
});

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
//*   TABLE
//**************************************************************    
export interface TableProps extends ui.IProps {

}

export var tablePropsDescr = ui.createDescr<TableProps>(val => {
  return {

  };
});