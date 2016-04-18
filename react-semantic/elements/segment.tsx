import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as ui from '../exports';
import {SegmentsProps, segmentsPropsDescr, SegmentProps, segmentPropsDescr} from '../generated';

export const Segment: ui.StatelessComponent<SegmentProps> = pr => {
  var props = ui.enumValToProp(pr);
  var rest = ui.propsToClasses(['ui segment'], ui.projection(props, segmentPropsDescr));
  return React.createElement('div', rest);
}

//************* Segments
export const Segments: ui.StatelessComponent<SegmentsProps> = pr => {
  var props = ui.enumValToProp(pr);
  var rest = ui.propsToClasses(['ui segments'], ui.projection(props, segmentsPropsDescr));
  return React.createElement('div', rest);
}


