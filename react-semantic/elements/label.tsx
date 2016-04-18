import * as React from 'react';
import * as ui from '../exports';


export enum pointing { no, $pointingAbove, $pointingBelow, $pointingLeft, $pointingRight, }
ui.registerEnum(pointing, '$Pointing', { $pointingAbove: 'pointing', $pointingLeft: 'leftPointing', $pointingRight: 'rightPointing' });
export interface IPropsPointingProp { $pointingAbove?: boolean; $pointingBelow?: boolean; $pointingLeft?: boolean; $pointingRight?: boolean; }

export enum corner { no, $cornerLeft, $cornerRight, }
ui.registerEnum(corner, '$Corner');
export interface IPropsCornerProp { $cornerLeft?: boolean; $cornerRight?: boolean; }

export enum attachedLabel { no, $attachedTop, $attachedBottom, $attachedTopRight, $attachedTopLeft, $attachedBottomRight, $attachedBottomLeft, }
ui.registerEnum(attachedLabel, '$AttachedLabel', {
  $attachedBottom: 'bottomAttached', $attachedTop: 'topAttached', $attachedTopRight: 'topRightAttached',
  $attachedTopLeft: 'topLeftAttached', $attachedBottomRight: 'bottomRightAttached', $attachedBottomLeft: 'bottomLeftAttached'
});
export interface IPropsAttachedLabelProp { $attachedTop?: boolean; $attachedBottom?: boolean; $attachedTopRight?: boolean; $attachedTopLeft?: boolean; $attachedBottomRight?: boolean; $attachedBottomLeft?: boolean; }

export enum circular { no, $circularStandard, $circularEmpty, }
ui.registerEnum(circular, '$Circular');
export interface IPropsCircularProp { $circularStandard?: boolean; $circularEmpty?: boolean; }

export enum ribbon { no, $ribbonLeft, $ribbonRight, }
ui.registerEnum(ribbon, '$Ribbon');
export interface IPropsRibbonProp { $ribbonLeft?: boolean; $ribbonRight?: boolean; }

export interface LabelProps extends ui.IProps, IPropsPointingProp, IPropsCornerProp, IPropsAttachedLabelProp, IPropsCircularProp, IPropsRibbonProp, ui.IPropsSize, ui.IPropsColor {
  $Pointing?: pointing;
  $Corner?: corner;
  $Attached?: attachedLabel;
  $Circular?: circular;
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

var labelPropsDescr = ui.createDescr<LabelProps>(val => {
  return {
    $Pointing: new ui.enumConverter<pointing>(pointing, val.$Pointing),
    $Corner: new ui.enumConverter<corner>(corner, val.$Corner),
    $Attached: new ui.enumConverter<attachedLabel>(attachedLabel, val.$Attached),
    $Circular: new ui.enumConverter<circular>(circular, val.$Circular),
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

export const Label: ui.StatelessComponent<LabelProps> = pr => {
  var props = ui.enumValToProp(pr);
  var rest = ui.propsToClasses(['ui label'], ui.projection(props, labelPropsDescr));
  return React.createElement(props.$outerTag ? props.$outerTag : 'span', rest);
}

//* Labels
export interface LabelsProps extends ui.IProps, ui.IPropsColor, ui.IPropsSize {
  $tag?: boolean;
  $circular?: boolean;
  $Size?: ui.size;
  $Color?: ui.color;
}
var labelsPropsDescr = ui.createDescr<LabelsProps>(val => {
  return {
    $tag: new ui.boolConverter(val.$tag),
    $circular: new ui.boolConverter(val.$circular),
    $Color: new ui.enumConverter<ui.color>(ui.color, val.$Color),
    $Size: new ui.enumConverter<ui.size>(ui.size, val.$Size),
  }
});
export const Labels: ui.StatelessComponent<LabelsProps> = pr => {
  var props = ui.enumValToProp(pr);
  var rest = ui.propsToClasses(['ui labels'], ui.projection(props, labelsPropsDescr));
  return React.createElement('div', rest);
};

