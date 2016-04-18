import * as React from 'react';
import * as ui from '../exports';
import {LabelsProps, labelsPropsDescr, LabelProps, labelPropsDescr} from '../generated';

export const Label: ui.StatelessComponent<LabelProps> = pr => {
  var props = ui.enumValToProp(pr);
  var rest = ui.propsToClasses(['ui label'], ui.projection(props, labelPropsDescr));
  return React.createElement(props.$outerTag ? props.$outerTag : 'span', rest);
}

//* Labels
export const Labels: ui.StatelessComponent<LabelsProps> = pr => {
  var props = ui.enumValToProp(pr);
  var rest = ui.propsToClasses(['ui labels'], ui.projection(props, labelsPropsDescr));
  return React.createElement('div', rest);
};

