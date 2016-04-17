import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as ui from '../exports';

export interface ListProps extends ui.IProps {

}

var listPropsDescr = ui.createDescr<ListProps>(val => {
  return {

  };
});

export const List: ui.StatelessComponent<ListProps> = pr => {
  var props = ui.enumValToProp(pr);
  var rest = ui.propsToClasses(['ui list'], ui.projection(props, listPropsDescr));
  return React.createElement('div', rest);
}