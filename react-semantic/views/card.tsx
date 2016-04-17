import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as ui from '../exports';
    
export interface CardProps extends ui.IProps {

}

var cardPropsDescr = ui.createDescr<CardProps>(val => {
  return {

  };
});

export const Card: ui.StatelessComponent<CardProps> = pr => {
  var props = ui.enumValToProp(pr);
  var rest = ui.propsToClasses(['ui card'], ui.projection(props, cardPropsDescr));
  return React.createElement('div', rest);
}
