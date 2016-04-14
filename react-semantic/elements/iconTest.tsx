import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as ui from '../exports';

export const IconTest: ui.StatelessComponent<ui.IProps> = props => {
  return <div>
    <h1>Icon</h1>
    <ui.Icon iconUI={ui.iconUI.alarmSlashOutline}/>
  </div>;
}