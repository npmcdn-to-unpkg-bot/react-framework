import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as ui from '../exports';
    
export interface MessageProps extends ui.IProps {

}

var messagePropsDescr = ui.createDescr<MessageProps>(val => {
  return {

  };
});

export const Message: ui.StatelessComponent<MessageProps> = pr => {
  var props = ui.enumValToProp(pr);
  var rest = ui.propsToClasses(['ui message'], ui.projection(props, messagePropsDescr));
  return React.createElement('div', rest);
}
