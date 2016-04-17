import * as React from 'react';
import * as ui from '../exports';

export interface FlagProps extends ui.IProps {
}

var flagPropsDescr = ui.createDescr<FlagProps>(val => {
  return {
  }
});

export const Flag: ui.StatelessComponent<FlagProps> = pr => {
  var props = ui.enumValToProp(pr);
  var rest = ui.propsToClasses(['ui flag'], ui.projection(props, flagPropsDescr));
  return React.createElement('div', rest);
}

