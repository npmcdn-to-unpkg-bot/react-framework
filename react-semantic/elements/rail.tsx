import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as ui from '../exports';

export interface RailProps extends ui.IProps {

}

var railPropsDescr = ui.createDescr<RailProps>(val => {
  return {

  };
});

export const Rail: ui.StatelessComponent<RailProps> = pr => {
  var props = ui.enumValToProp(pr);
  var rest = ui.propsToClasses(['ui rail'], ui.projection(props, railPropsDescr));
  return React.createElement('div', rest);
}