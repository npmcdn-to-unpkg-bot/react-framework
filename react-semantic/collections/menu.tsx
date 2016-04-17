import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as ui from '../exports';
    
export interface MenuProps extends ui.IProps {

}

var menuPropsDescr = ui.createDescr<MenuProps>(val => {
  return {

  };
});

export const Menu: ui.StatelessComponent<MenuProps> = pr => {
  var props = ui.enumValToProp(pr);
  var rest = ui.propsToClasses(['ui menu'], ui.projection(props, menuPropsDescr));
  return React.createElement('div', rest);
}