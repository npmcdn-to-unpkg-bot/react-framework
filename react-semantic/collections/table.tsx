import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as ui from '../exports';
    
export interface TableProps extends ui.IProps {

}

var tablePropsDescr = ui.createDescr<TableProps>(val => {
  return {

  };
});

export const Table: ui.StatelessComponent<TableProps> = pr => {
  var props = ui.enumValToProp(pr);
  var rest = ui.propsToClasses(['ui table'], ui.projection(props, tablePropsDescr));
  return React.createElement('div', rest);
}
