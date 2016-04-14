import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as ui from '../exports';
//import { Icons } from '../exports';

export enum borderSegment { standard, stacked, stackedTall, piled  }
export interface SegmentProps extends ui.IProps {
  border?: borderSegment;
}

export const Segment: ui.StatelessComponent<SegmentProps> = props => {
  return <div></div>;
}
