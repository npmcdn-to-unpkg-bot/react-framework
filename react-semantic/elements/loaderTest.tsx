import * as React from 'react';

import {
  color, size,
  Button, ButtonAnimated, ButtonLabeled, ButtonIcon, Buttons, ButtonSocial, floated, attachedButton, animate, iconLabel, eqWidth,
  Label, Labels, pointing, corner, attachedLabel, ribbon,
  Icon, Icons, icon,
  Segment, Segments, raised, attachedSegment, padded, emphasis, aligned, raisedSegments,
  Divider,
  Flag,
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

export const LoaderTest: ui.StatelessComponent<ui.IProps> = props => {
  return <div>
    <h1>Loader</h1>
    <Loader>
    </Loader>
  </div>;
}