import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as ui from '../exports';
    
export interface BreadcrumbProps extends ui.IProps {

}

var breadcrumbPropsDescr = ui.createDescr<BreadcrumbProps>(val => {
  return {

  };
});

export const Breadcrumb: ui.StatelessComponent<BreadcrumbProps> = pr => {
  var props = ui.enumValToProp(pr);
  var rest = ui.propsToClasses(['ui breadcrumb'], ui.projection(props, breadcrumbPropsDescr));
  return React.createElement('div', rest);
}