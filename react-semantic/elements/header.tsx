import * as React from 'react';
import * as ui from '../exports';

export interface TestProps extends ui.IProps {
}

var dividerPropsDescr = ui.createDescr<TestProps>(val => {
  return {
  }
});

export const Test: ui.StatelessComponent<TestProps> = pr => {
  var props = ui.enumValToProp(pr);
  var rest = ui.propsToClasses(['ui divider'], ui.projection(props, dividerPropsDescr));
  return React.createElement('div', rest);
}

