import * as React from 'react';
import * as ui from './exports';

export interface TestSectionProps extends ui.IProps {
  title: string;
  subTitle?: string;
}

export const TestSection: ui.StatelessComponent<TestSectionProps> = props => {
  return <ui.Segment>
  </ui.Segment>;
};