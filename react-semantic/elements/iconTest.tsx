import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {
  color, size,
  Button, ButtonAnimated, ButtonLabeled, ButtonIcon, Buttons, ButtonSocial, animate, social, eqWidth, floated, attachedButton, iconLabel,
  Label, Labels, pointing, corner, attachedLabel, ribbon,
  Icon, Icons, icon,
} from '../exports';
import * as ui from '../exports';

export const IconTest: ui.StatelessComponent<ui.IProps> = props => {
  return <div>
    <h1>Icon</h1>
    <Icon $Icon={ui.icon.alarmSlashOutline}/>
    <h3>Disabled</h3>
    <Icon $disabled $Icon={ui.icon.alarmSlashOutline}/>
    <h3>Disabled</h3>
    <Icon $loading $Icon={ui.icon.circleNotched}/> <Icon $loading $Icon={ui.icon.clock}/>
    <h3>Fitted</h3>
    Before<Icon $Icon={ui.icon.clock}/>after.
    <h3>Size</h3>
    <Icon $s3 $Icon={ui.icon.clock}/><Icon $s2 $Icon={ui.icon.clock}/><Icon $s1 $Icon={ui.icon.clock}/><Icon $Icon={ui.icon.clock}/><Icon $1 $Icon={ui.icon.clock}/><Icon $2 $Icon={ui.icon.clock}/><Icon $3 $Icon={ui.icon.clock}/><Icon $4 $Icon={ui.icon.clock}/>
    <h3>Link</h3>
    <Icon $link $Icon={ui.icon.cloud}/>
    <h3>Flipped</h3>
    <Icon $flippedHorizontally $Icon={ui.icon.cloud}/> <Icon $Icon={ui.icon.cloud}/> <Icon $flippedVertically $Icon={ui.icon.cloud}/>
    <h3>Rotated</h3>
    <Icon $rotatedClockwise $Icon={ui.icon.cloud}/> <Icon $Icon={ui.icon.cloud}/> <Icon $rotatedCounterclockwise $Icon={ui.icon.cloud}/>
    <h3>Circular</h3>
    <Icon $circularStandard $Icon={ui.icon.users}/> <Icon $circularStandard $colTeal $Icon={ui.icon.users}/>
    <Icon $circularInverted $Icon={ui.icon.users}/><Icon $circularInverted $colTeal $Icon={ui.icon.users}/>
    <h3>Bordered</h3>
    <Icon $borderedStandard $Icon={ui.icon.users}/> <Icon $borderedStandard $colTeal $Icon={ui.icon.users}/>
    <Icon $borderedInverted $Icon={ui.icon.users}/><Icon $borderedInverted $colTeal $Icon={ui.icon.users}/>
    <h3>Colored</h3>
    <Icon $Icon={ui.icon.users}/> <Icon $colTeal $Icon={ui.icon.users}/>
    <h3>Inverted</h3>
    <div className="ui inverted segment">
      <Icon $inverted $Icon={ui.icon.users}/> <Icon $inverted $colTeal $Icon={ui.icon.users}/>
    </div>
    <hr/>
    <h1>Icons ?? logic ??</h1>
    <Icons><Icon $huge $Icon={ui.icon.circleThin}/><Icon $Icon={ui.icon.user}/></Icons><br/>
    <Icons $huge><Icon $big $colRed $Icon={ui.icon.dont}/><Icon $Icon={ui.icon.user}/></Icons>
    <Icons $huge><Icon $big $loading $Icon={ui.icon.sun}/><Icon $Icon={ui.icon.user}/></Icons>
    <br/>
    <Icons $big><Icon $Icon={ui.icon.twitter}/><Icon $corner $Icon={ui.icon.add}/></Icons>
    <Icons $big><Icon $Icon={ui.icon.twitter}/><Icon $inverted $corner $Icon={ui.icon.add}/></Icons>
    <br/>
 </div>;
}
