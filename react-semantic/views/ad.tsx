import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as ui from '../exports';
    
export interface AdProps extends ui.IProps {

}

var adPropsDescr = ui.createDescr<AdProps>(val => {
  return {

  };
});

export const Ad: ui.StatelessComponent<AdProps> = pr => {
  var props = ui.enumValToProp(pr);
  var rest = ui.propsToClasses(['ui ad'], ui.projection(props, adPropsDescr));
  return React.createElement('div', rest);
}