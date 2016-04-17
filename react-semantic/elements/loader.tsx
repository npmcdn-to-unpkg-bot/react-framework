import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as ui from '../exports';

export interface LoaderProps extends ui.IProps {

}

var loaderPropsDescr = ui.createDescr<LoaderProps>(val => {
  return {

  };
});

export const Loader: ui.StatelessComponent<LoaderProps> = pr => {
  var props = ui.enumValToProp(pr);
  var rest = ui.propsToClasses(['ui loader'], ui.projection(props, loaderPropsDescr));
  return React.createElement('div', rest);
}
