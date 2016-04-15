import * as React from 'react';
import * as ui from '../exports';

export enum pointing {
  no,
  $pointingAbove,
  $pointingBelow,
  $pointingLeft, 
  $pointingRight,
}
//in SemanticUI, class='... pointing left' does not work. Must be class='... left pointing',
ui.registerEnum(pointing, '$Pointing', { $pointingAbove: 'pointing', $pointingLeft: 'leftPointing', $pointingRight: 'rightPointing' });

export interface IPropsPointing {
  $pointingAbove?: boolean;
  $pointingBelow?: boolean;
  $pointingLeft?: boolean;
  $pointingRight?: boolean;
}

export enum corner {
  no,
  $cornerLeft,
  $cornerRight,
}
ui.registerEnum(corner, '$Corner');

export interface IPropsCorner {
  $cornerLeft?: boolean;
  $cornerRight?: boolean;
}

export enum attachedLabel {
  no,
  $attachedTop,
  $attachedBottom,
  $attachedTopRight,
  $attachedTopLeft,
  $attachedBottomRight,
  $attachedBottomLeft,
}
ui.registerEnum(attachedLabel, '$Attached');

export interface IPropsAttached {
  $attachedTop?: boolean;
  $attachedBottom?: boolean;
  $attachedTopRight?: boolean;
  $attachedTopLeft?: boolean;
  $attachedBottomRight?: boolean;
  $attachedBottomLeft?: boolean;
}

export enum circular {
  no,
  $circularStandard,
  $circularEmpty,
}
ui.registerEnum(circular, '$Circular', { $circularStandard: 'circular' });
export interface IPropsCircular {
  $circularStandard?: boolean;
  $emptyCircular?: boolean;
}

export interface LabelProps extends ui.IProps, ui.IPropsColor, ui.IPropsSize, IPropsPointing, IPropsAttached, IPropsCircular, IPropsCorner {
  $image?: boolean;
  $basic?: boolean;
  $tag?: boolean;
  $ribbon?: boolean;
  $horizontal?: boolean;
  $floating?: boolean;
  $Pointing?: pointing;
  $Color?: ui.color;
  $Corner?: corner;
  $Attached?: attachedLabel;
  $Size?: ui.size;
  $Circular?: circular;
  $outerTag?: string;
}

var labelPropsDescr = ui.createDescr<LabelProps>(val => {
  return {
    $basic: new ui.boolConverter(val.$basic),
    $image: new ui.boolConverter(val.$image),
    $tag: new ui.boolConverter(val.$tag),
    $ribbon: new ui.boolConverter(val.$ribbon),
    $horizontal: new ui.boolConverter(val.$horizontal),
    $floating: new ui.boolConverter(val.$floating),
    $Pointing: new ui.enumConverter<pointing>(pointing, val.$Pointing),
    $Color: new ui.enumConverter<ui.color>(ui.color, val.$Color),
    $Corner: new ui.enumConverter<corner>(corner, val.$Corner),
    $Attached: new ui.enumConverter<attachedLabel>(attachedLabel, val.$Attached),
    $Size: new ui.enumConverter<ui.size>(ui.size, val.$Size),
    $Circular: new ui.enumConverter<circular>(circular, val.$Circular),
  };
});

export const Label: ui.StatelessComponent<LabelProps> = pr => {
  var props = ui.enumValToProp(pr);
  var rest = ui.propsToClasses(['ui label'], ui.projection(props, labelPropsDescr));
  return React.createElement(props.$outerTag ? props.$outerTag : 'span', rest);
}

