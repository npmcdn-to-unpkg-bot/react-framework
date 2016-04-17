import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as ui from '../exports';
    
export interface FeedProps extends ui.IProps {

}

var feedPropsDescr = ui.createDescr<FeedProps>(val => {
  return {

  };
});

export const Feed: ui.StatelessComponent<FeedProps> = pr => {
  var props = ui.enumValToProp(pr);
  var rest = ui.propsToClasses(['ui feed'], ui.projection(props, feedPropsDescr));
  return React.createElement('div', rest);
}