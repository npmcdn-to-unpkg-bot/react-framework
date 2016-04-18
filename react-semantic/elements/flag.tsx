import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as ui from '../exports';
import {FlagProps, flagPropsDescr} from '../generated';

export const Flag: ui.StatelessComponent<FlagProps> = pr => {
  var props = ui.enumValToProp(pr);
  var rest = ui.propsToClasses(['ui flag'], ui.projection(props, flagPropsDescr));
  return React.createElement('i', rest);
}

