import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as ui from '../exports';

export interface FlagProps extends ui.IProps, ui.IPropsColor {
  $Color?: ui.color;
  $boolTest?: boolean;
}

var flagPropsDescr = ui.createDescr<FlagProps>(val => {
  return {
    $Color: new ui.enumConverter<ui.color>(ui.color, val.$Color),
    $boolTest: new ui.boolConverter(val.$boolTest)
  };
});

export const Flag: ui.StatelessComponent<FlagProps> = pr => {
  var props = ui.enumValToProp(pr);
  var rest = ui.propsToClasses(['ui flag'], ui.projection(props, flagPropsDescr));
  return React.createElement('div', rest);
}
