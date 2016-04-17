import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as ui from '../exports';
    
export interface GridProps extends ui.IProps {

}

var gridPropsDescr = ui.createDescr<GridProps>(val => {
  return {

  };
});

export const Grid: ui.StatelessComponent<GridProps> = pr => {
  var props = ui.enumValToProp(pr);
  var rest = ui.propsToClasses(['ui grid'], ui.projection(props, gridPropsDescr));
  return React.createElement('div', rest);
}