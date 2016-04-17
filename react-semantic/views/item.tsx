import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as ui from '../exports';
    
export interface ItemProps extends ui.IProps {

}

var itemPropsDescr = ui.createDescr<ItemProps>(val => {
  return {

  };
});

export const Item: ui.StatelessComponent<ItemProps> = pr => {
  var props = ui.enumValToProp(pr);
  var rest = ui.propsToClasses(['ui item'], ui.projection(props, itemPropsDescr));
  return React.createElement('div', rest);
}
