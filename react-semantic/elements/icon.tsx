import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as ui from '../exports';
import {IconProps, iconPropsDescr} from '../generated';

export const Icon: ui.StatelessComponent<IconProps> = pr => {
  var props = ui.enumValToProp(pr);
  var rest = ui.propsToClasses(['icon'], ui.projection(props, iconPropsDescr));
  return React.createElement('i', rest);
}

//********************** Icons

export interface IconsProps extends ui.IProps, ui.IPropsSize {
  $Size?: ui.size;
}
var iconsPropsDescr = ui.createDescr<IconsProps>(val => {
  return {
    $Size: new ui.enumConverter<ui.size>(ui.size, val.$Size),
  }
});

export const Icons: ui.StatelessComponent<IconsProps> = pr => {
  var props = ui.enumValToProp(pr);
  var rest = ui.propsToClasses(['icons'], ui.projection(props, iconPropsDescr));
  return React.createElement('i', rest);
}

