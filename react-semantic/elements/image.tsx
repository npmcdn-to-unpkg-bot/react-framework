import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as ui from '../exports';

export interface ImageProps extends ui.IProps {

}

var imagePropsDescr = ui.createDescr<ImageProps>(val => {
  return {

  };
});

export const Image: ui.StatelessComponent<ImageProps> = pr => {
  var props = ui.enumValToProp(pr);
  var rest = ui.propsToClasses(['ui image'], ui.projection(props, imagePropsDescr));
  return React.createElement('div', rest);
}