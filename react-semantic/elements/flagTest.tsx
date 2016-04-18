import * as React from 'react';


import {
  color, size,
  Button, ButtonAnimated, ButtonLabeled, ButtonIcon, Buttons, ButtonSocial, floated, attachedButton, animate, iconLabel, eqWidth,
  Label, Labels, pointing, corner, attachedLabel, ribbon,
  Icon, Icons, icon,
  Segment, Segments, raised, attachedSegment, padded, emphasis, aligned, raisedSegments,
  Divider,
  Flag, flag, flagShort,
  Header,
  Image,
  Input,
  List,
  Loader,
  Rail,
  Reveal,
  Step

} from '../exports';

import * as ui from '../exports';

export const FlagTest: ui.StatelessComponent<ui.IProps> = props => {
  return <div>
    <h1>Flag</h1>
    <h3>Long flag names</h3>
    {ui.enumNumbers(flag).map(num => <Flag $Flag={num} title={flag[num]}/>) }
    <h3>Shortflag names</h3>
    {ui.enumNumbers(flagShort).map(num => <Flag $FlagShort={num} title={flagShort[num]}/>) }
  </div >;
}