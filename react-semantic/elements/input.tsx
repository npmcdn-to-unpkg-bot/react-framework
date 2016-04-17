import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as ui from '../exports';

export interface InputProps extends ui.IProps {

}

var inputPropsDescr = ui.createDescr<InputProps>(val => {
  return {

  };
});

export const Input: ui.StatelessComponent<InputProps> = pr => {
  var props = ui.enumValToProp(pr);
  var rest = ui.propsToClasses(['ui input'], ui.projection(props, inputPropsDescr));
  return React.createElement('div', rest);
}
