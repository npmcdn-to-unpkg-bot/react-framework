import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as ui from '../exports';

export interface HeaderProps extends ui.IProps {

}

var headerPropsDescr = ui.createDescr<HeaderProps>(val => {
  return {

  };
});

export const Header: ui.StatelessComponent<HeaderProps> = pr => {
  var props = ui.enumValToProp(pr);
  var rest = ui.propsToClasses(['ui header'], ui.projection(props, headerPropsDescr));
  return React.createElement('div', rest);
}
