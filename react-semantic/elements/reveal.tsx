import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as ui from '../exports';

export interface RevealProps extends ui.IProps {

}

var revealPropsDescr = ui.createDescr<RevealProps>(val => {
  return {

  };
});

export const Reveal: ui.StatelessComponent<RevealProps> = pr => {
  var props = ui.enumValToProp(pr);
  var rest = ui.propsToClasses(['ui reveal'], ui.projection(props, revealPropsDescr));
  return React.createElement('div', rest);
}