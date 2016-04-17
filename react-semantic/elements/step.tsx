import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as ui from '../exports';

export interface StepProps extends ui.IProps {

}

var stepPropsDescr = ui.createDescr<StepProps>(val => {
  return {

  };
});

export const Step: ui.StatelessComponent<StepProps> = pr => {
  var props = ui.enumValToProp(pr);
  var rest = ui.propsToClasses(['ui step'], ui.projection(props, stepPropsDescr));
  return React.createElement('div', rest);
}
