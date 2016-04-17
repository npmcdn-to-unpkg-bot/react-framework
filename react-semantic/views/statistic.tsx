import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as ui from '../exports';
    
export interface StatisticProps extends ui.IProps {

}

var statisticPropsDescr = ui.createDescr<StatisticProps>(val => {
  return {

  };
});

export const Statistic: ui.StatelessComponent<StatisticProps> = pr => {
  var props = ui.enumValToProp(pr);
  var rest = ui.propsToClasses(['ui statistic'], ui.projection(props, statisticPropsDescr));
  return React.createElement('div', rest);
}
