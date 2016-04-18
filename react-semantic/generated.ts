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

import * as React from 'react';
import * as ui from './lib';
import {icon, flag, flagShort} from './largeEnums';


//**************************************************************
//*   BUTTON
//**************************************************************

export enum attachedButton { no, $attachedTop, $attachedBottom, $attachedLeft, $attachedRight, }
ui.registerEnum(attachedButton, '$AttachedButton');
export interface IPropsAttachedButtonProp { $attachedTop?: boolean; $attachedBottom?: boolean; $attachedLeft?: boolean; $attachedRight?: boolean; }

export interface ButtonProps extends ui.IProps, IPropsAttachedButtonProp, ui.IPropsSize, ui.IPropsColor, ui.IPropsFloated {
  $Attached?: attachedButton;
  $Size?: ui.size;
  $Color?: ui.color;
  $Floated?: ui.floated;
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
    $Size: new ui.enumConverter<ui.size>(ui.size, val.$Size),
    $Color: new ui.enumConverter<ui.color>(ui.color, val.$Color),
    $Floated: new ui.enumConverter<ui.floated>(ui.floated, val.$Floated),
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

export interface ButtonIconProps extends ButtonProps, IPropsIconLabelProp, ui.IPropsIcon {
  $IconLabel?: iconLabel;
  $Icon?: ui.icon;
}

export var buttonIconPropsDescr = ui.createDescr<ButtonIconProps>(val => {
  return {
    $IconLabel: new ui.enumConverter<iconLabel>(iconLabel, val.$IconLabel),
    $Icon: new ui.enumConverter<ui.icon>(ui.icon, val.$Icon)
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

export interface ButtonsProps extends ui.IProps, IPropsEqWidthProp, ui.IPropsSize, ui.IPropsColor {
  $EqWidth?: eqWidth;
  $Size?: ui.size;
  $Color?: ui.color;
  $vertical?: boolean;
  $labeled?: boolean;
  $basic?: boolean;
  $hasIcon?: boolean;
}

export var buttonsPropsDescr = ui.createDescr<ButtonsProps>(val => {
  return {
    $EqWidth: new ui.enumConverter<eqWidth>(eqWidth, val.$EqWidth),
    $Size: new ui.enumConverter<ui.size>(ui.size, val.$Size),
    $Color: new ui.enumConverter<ui.color>(ui.color, val.$Color),
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
export interface FlagProps extends ui.IProps, ui.IPropsColor {
  $Color?: ui.color;
  $Flag?: flag;
  $FlagShort?: flagShort;
}

export var flagPropsDescr = ui.createDescr<FlagProps>(val => {
  return {
    $Color: new ui.enumConverter<ui.color>(ui.color, val.$Color)
    , $Flag: new ui.enumConverter<flag>(flag, val.$Flag),
    $FlagShort: new ui.enumConverter<flagShort>(flagShort, val.$FlagShort),
  };
});

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
ui.registerEnum(circularIcon, '$CircularIcon', { $circularStandard: 'circular' });
export interface IPropsCircularIconProp { $circularStandard?: boolean; $circularInverted?: boolean; }

export enum bordered { no, $borderedStandard, $borderedInverted, }
ui.registerEnum(bordered, '$Bordered', { $borderedStandard: 'bordered' });
export interface IPropsBorderedProp { $borderedStandard?: boolean; $borderedInverted?: boolean; }

export interface IconProps extends ui.IProps, IPropsFlippedProp, IPropsRotatedProp, IPropsCircularIconProp, IPropsBorderedProp, ui.IPropsIcon, ui.IPropsSize, ui.IPropsColor {
  $Flipped?: flipped;
  $Rotated?: rotated;
  $Circular?: circularIcon;
  $Bordered?: bordered;
  $Icon?: ui.icon;
  $Size?: ui.size;
  $Color?: ui.color;
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
    $Icon: new ui.enumConverter<ui.icon>(ui.icon, val.$Icon),
    $Size: new ui.enumConverter<ui.size>(ui.size, val.$Size),
    $Color: new ui.enumConverter<ui.color>(ui.color, val.$Color),
    $disabled: new ui.boolConverter(val.$disabled),
    $loading: new ui.boolConverter(val.$loading),
    $fitted: new ui.boolConverter(val.$fitted),
    $link: new ui.boolConverter(val.$link),
    $inverted: new ui.boolConverter(val.$inverted),
    $corner: new ui.boolConverter(val.$corner)
  };
});

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
ui.registerEnum(attachedLabel, '$AttachedLabel', { $attachedBottom: 'bottomAttached', $attachedTop: 'topAttached', $attachedTopRight: 'topRightAttached', $attachedTopLeft: 'topLeftAttached', $attachedBottomRight: 'bottomRightAttached', $attachedBottomLeft: 'bottomLeftAttached' });
export interface IPropsAttachedLabelProp { $attachedTop?: boolean; $attachedBottom?: boolean; $attachedTopRight?: boolean; $attachedTopLeft?: boolean; $attachedBottomRight?: boolean; $attachedBottomLeft?: boolean; }

export enum circularLabel { no, $circularStandard, $circularEmpty, }
ui.registerEnum(circularLabel, '$CircularLabel');
export interface IPropsCircularLabelProp { $circularStandard?: boolean; $circularEmpty?: boolean; }

export enum ribbon { no, $ribbonLeft, $ribbonRight, }
ui.registerEnum(ribbon, '$Ribbon');
export interface IPropsRibbonProp { $ribbonLeft?: boolean; $ribbonRight?: boolean; }

export interface LabelProps extends ui.IProps, IPropsPointingProp, IPropsCornerProp, IPropsAttachedLabelProp, IPropsCircularLabelProp, IPropsRibbonProp, ui.IPropsSize, ui.IPropsColor {
  $Pointing?: pointing;
  $Corner?: corner;
  $Attached?: attachedLabel;
  $Circular?: circularLabel;
  $Ribbon?: ribbon;
  $Size?: ui.size;
  $Color?: ui.color;
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
    $Size: new ui.enumConverter<ui.size>(ui.size, val.$Size),
    $Color: new ui.enumConverter<ui.color>(ui.color, val.$Color),
    $image: new ui.boolConverter(val.$image),
    $basic: new ui.boolConverter(val.$basic),
    $tag: new ui.boolConverter(val.$tag),
    $horizontal: new ui.boolConverter(val.$horizontal),
    $floating: new ui.boolConverter(val.$floating)
  };
});

//**************************************************************
//*   LABELS
//**************************************************************    
export interface LabelsProps extends ui.IProps, ui.IPropsSize, ui.IPropsColor {
  $Size?: ui.size;
  $Color?: ui.color;
  $tag?: boolean;
  $circular?: boolean;
}

export var labelsPropsDescr = ui.createDescr<LabelsProps>(val => {
  return {
    $Size: new ui.enumConverter<ui.size>(ui.size, val.$Size),
    $Color: new ui.enumConverter<ui.color>(ui.color, val.$Color),
    $tag: new ui.boolConverter(val.$tag),
    $circular: new ui.boolConverter(val.$circular)
  };
});

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
ui.registerEnum(attachedSegment, '$AttachedSegment', { $attachedBoth: 'attached' });
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

export interface SegmentProps extends ui.IProps, IPropsRaisedProp, IPropsAttachedSegmentProp, IPropsPaddedProp, IPropsEmphasisProp, IPropsAlignedProp, ui.IPropsColor, ui.IPropsFloated {
  $Raised?: raised;
  $Attached?: attachedSegment;
  $Padded?: padded;
  $Emphasis?: emphasis;
  $Aligned?: aligned;
  $Color?: ui.color;
  $Floated?: ui.floated;
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
    $Color: new ui.enumConverter<ui.color>(ui.color, val.$Color),
    $Floated: new ui.enumConverter<ui.floated>(ui.floated, val.$Floated),
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

//**************************************************************
//*   SEGMENTS
//**************************************************************

export enum raisedSegments { no, $raisedStandard, $raisedStacked, $raisedPiled, }
ui.registerEnum(raisedSegments, '$RaisedSegments', { $raisedStandard: 'raised', $raisedStacked: 'stacked', $raisedPiled: 'piled' });
export interface IPropsRaisedSegmentsProp { $raisedStandard?: boolean; $raisedStacked?: boolean; $raisedPiled?: boolean; }

export interface SegmentsProps extends ui.IProps, IPropsRaisedSegmentsProp {
  $raised?: raisedSegments;
  $compact?: boolean;
  $horizontal?: boolean;
}

export var segmentsPropsDescr = ui.createDescr<SegmentsProps>(val => {
  return {
    $raised: new ui.enumConverter<raisedSegments>(raisedSegments, val.$raised),
    $compact: new ui.boolConverter(val.$compact),
    $horizontal: new ui.boolConverter(val.$horizontal)
  };
});

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