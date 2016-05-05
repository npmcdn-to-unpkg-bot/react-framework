import * as React from 'react';


import {
  Icon, icon, flipped, rotated, circularIcon, bordered,
  Input, iconInput, action,
  Label, pointing, corner, attachedLabel, circularLabel, ribbon,
  Button, attachedButton,
  ButtonLabeled, ButtonIcon, ButtonAnimated, ButtonSocial, Buttons, social, eqWidth,
  Segment, raised, padded, emphasis,
  Divider, divider,
} from '../../common/exports';

import {InputTag} from '../../../react-framework/behaviors/index';

import * as ui from '../../common/exports';

export const InputTest: ui.StatelessComponent<ui.IProps> = props => {
  return <div>
    <h1>Input</h1>
    <Input><InputTag placeholder="Search..."/></Input>

    <h2>Focus</h2>
    <Input $focus><InputTag placeholder="Search..."/></Input>

    <h2>Loading</h2>
    <Input $iconRight $loading><InputTag placeholder="Search..."/><Icon $Icon={icon.search}/></Input><br/>
    <Input $iconRight><InputTag placeholder="Search..."/><Icon $Icon={icon.search}/></Input>

    <h2>Disabled</h2>
    <Input $disabled><InputTag placeholder="Search..."/></Input>

    <h2>Error</h2>
    <Input $error><InputTag placeholder="Search..."/></Input>

    <h2>Icon</h2>
    <Input $iconLeft><InputTag placeholder="Search..."/><Icon $Icon={icon.search}/></Input><br/>
    <Input $iconRight><InputTag placeholder="Search..."/><Icon $Icon={icon.search}/></Input><br/>
    <Input $iconRight><InputTag placeholder="Search..."/><Icon $circularStandard $link $Icon={icon.search}/></Input><br/>
    <Input $iconRight><InputTag placeholder="Search..."/><Icon $inverted $circularStandard $link $Icon={icon.search}/></Input>

    <h2>Labeled</h2>
    <Input $labeledLeft><Label>http://</Label><InputTag placeholder="Search..."/></Input><br/>
    <Input $labeledRight><InputTag placeholder="Search..."/><Label>http://</Label></Input><br/>
    <h3>TODO: Dropdown label</h3>
    <Input $labeledRight><InputTag placeholder="Search..."/><Label $basic>http://</Label></Input><br/>
    <Input $labeledRight><Label>$</Label><InputTag placeholder="Search..."/><Label $basic>http://</Label></Input><br/>
    <Input $labeledRight $iconLeft><Icon $Icon={icon.search}/><InputTag placeholder="Search..."/><Label $tag>http://</Label></Input><br/>
    <Input $labeledLeftCorner><Label $cornerLeft><Icon $Icon={icon.asterisk}/></Label><InputTag placeholder="Search..."/></Input><br/>
    <Input $labeledRightCorner><Label $cornerRight><Icon $Icon={icon.asterisk}/></Label><InputTag placeholder="Search..."/></Input><br/>

    <h2>Action</h2>
    <Input $actionLeft><Button>Text</Button><InputTag placeholder="Search..."/></Input> <Input $actionRight><InputTag placeholder="Search..."/><Button>Text</Button></Input><br/>
    <Input $actionLeft><ButtonIcon $left $colTeal $Icon={icon.cart}>Checkout</ButtonIcon><InputTag placeholder="Search..."/></Input> <Input $actionRight><InputTag placeholder="Search..."/><ButtonIcon $colTeal $Icon={icon.cart}> Checkout</ButtonIcon></Input><br/>
    <Input $actionLeft ><ButtonIcon $Icon={icon.cart}/><InputTag placeholder="Search..."/></Input> <Input $actionRight ><InputTag placeholder="Search..."/><ButtonIcon $Icon={icon.cart}/></Input><br/>
    <Input $actionLeft ><ButtonIcon $left $Icon={icon.cart}>Text</ButtonIcon><InputTag placeholder="Search..."/></Input> <Input $actionRight ><InputTag placeholder="Search..."/><ButtonIcon $Icon={icon.cart}>Text</ButtonIcon></Input><br/><br/>
    <h3>TODO: dropdown action</h3>

    <h2>Transparent</h2>
    <Input $transparent $iconRight><InputTag placeholder="Search..."/><Icon $Icon={icon.search}/></Input><br/>
    <Input $transparent $iconLeft><InputTag placeholder="Search..."/><Icon $Icon={icon.search}/></Input><br/>
    <Input $transparent><InputTag placeholder="Search..."/></Input><br/>

    <h2>Inverted</h2>
    <Segment $inverted>
      <Input $iconRight><InputTag placeholder="Search..."/><Icon $Icon={icon.search}/></Input><br/>
      <Divider $inverted/>
      <Input $iconLeft><InputTag placeholder="Search..."/><Icon $Icon={icon.search}/></Input><br/>
      <Divider $inverted/>
      <Input $inverted $transparent $iconRight><InputTag placeholder="Search..."/><Icon $Icon={icon.search}/></Input><br/>
    </Segment>

    <h2>Fluid</h2>
    <Input $actionRight $fluid><InputTag placeholder="Search..."/><Button>Text</Button></Input>
    <Input $iconRight $fluid><InputTag placeholder="Search..."/><Icon $Icon={icon.search}/></Input><br/>

    <h2>Size</h2>
    <Input $s3 $iconLeft><InputTag placeholder="Search..."/><Icon $Icon={icon.search}/></Input><br/>
    <Input $s1 $iconLeft><InputTag placeholder="Search..."/><Icon $Icon={icon.search}/></Input><br/>
    <Input $iconLeft><InputTag placeholder="Search..."/><Icon $Icon={icon.search}/></Input><br/>
    <Input $1 $iconLeft><InputTag placeholder="Search..."/><Icon $Icon={icon.search}/></Input><br/>
    <Input $2 $iconLeft><InputTag placeholder="Search..."/><Icon $Icon={icon.search}/></Input><br/>
    <Input $3 $iconLeft><InputTag placeholder="Search..."/><Icon $Icon={icon.search}/></Input><br/>
    <Input $4 $iconLeft><InputTag placeholder="Search..."/><Icon $Icon={icon.search}/></Input><br/>

  </div >;
}
