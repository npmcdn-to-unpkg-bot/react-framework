import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as ui from '../exports';

export interface DividerProps extends ui.IProps {

}

var dividerPropsDescr = ui.createDescr<DividerProps>(val => {
  return {

  };
});

export const Divider: ui.StatelessComponent<DividerProps> = pr => {
  var props = ui.enumValToProp(pr);
  var rest = ui.propsToClasses(['ui divider'], ui.projection(props, dividerPropsDescr));
  return React.createElement('div', rest);
}
