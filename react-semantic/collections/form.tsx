import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as ui from '../exports';
    
export interface FormProps extends ui.IProps {

}

var formPropsDescr = ui.createDescr<FormProps>(val => {
  return {

  };
});

export const Form: ui.StatelessComponent<FormProps> = pr => {
  var props = ui.enumValToProp(pr);
  var rest = ui.propsToClasses(['ui form'], ui.projection(props, formPropsDescr));
  return React.createElement('div', rest);
}