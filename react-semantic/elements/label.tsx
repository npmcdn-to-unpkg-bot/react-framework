import * as React from 'react';
import * as ui from '../exports';

export enum pointing {
  no,
  pointing,
  belowPointing,
  leftPointing,
  rightPointing,
}

export enum corner {
  no,
  leftCorner,
  rightCorner,
}

export enum attachedLabel {
  no,
  topAttached,
  bottomAttached,
  topRightAttached,
  topLeftAttached,
  bottomRightAttached,
  bottomLeftAttached,
}

export enum circular {
  no,
  circular,
  emptyCircular,
}

export interface LabelProps extends ui.IProps {
  image?: boolean;
  basic?: boolean;
  tag?: boolean;
  ribbon?: boolean;
  horizontal?: boolean;
  floating?: boolean;
  pointing?: pointing;
  colorUI?: ui.colorUI;
  corner?: corner;
  attached?: attachedLabel;
  size?: ui.size;
  circular?: circular;
  outerTag?: string;
}
var labelPropsDescr = ui.createDescr<LabelProps>(val => {
  return {
    basic: new ui.boolConverter(val.basic),
    image: new ui.boolConverter(val.image),
    tag: new ui.boolConverter(val.tag),
    ribbon: new ui.boolConverter(val.ribbon),
    horizontal: new ui.boolConverter(val.horizontal),
    floating: new ui.boolConverter(val.floating),
    pointing: new ui.enumConverter<pointing>(pointing, val.pointing),
    colorUI: new ui.enumConverter<ui.colorUI>(ui.colorUI, val.colorUI),
    corner: new ui.enumConverter<corner>(corner, val.corner),
    attached: new ui.enumConverter<attachedLabel>(attachedLabel, val.attached),
    size: new ui.enumConverter<ui.size>(ui.size, val.size),
    circular: new ui.enumConverter<circular>(circular, val.circular),
  };
});

export const Label: ui.StatelessComponent<LabelProps> = props => {
  var rest = ui.propsToClasses(['ui label'], ui.projection(props, labelPropsDescr));
  return React.createElement(props.outerTag ? props.outerTag : 'span', rest);
}

