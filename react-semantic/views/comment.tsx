import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as ui from '../exports';
    
export interface CommentProps extends ui.IProps {

}

var commentPropsDescr = ui.createDescr<CommentProps>(val => {
  return {

  };
});

export const Comment: ui.StatelessComponent<CommentProps> = pr => {
  var props = ui.enumValToProp(pr);
  var rest = ui.propsToClasses(['ui comment'], ui.projection(props, commentPropsDescr));
  return React.createElement('div', rest);
}
