import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {
  animate, animateTo, color, size, floated, aligned, column, icon,
  Container, textAligned,
  Icon,
  Segment, raised, attached, padded, emphasis,
  Grid, divided, celled, paddedGrid,
  Column, wide, wideMobile, wideTablet, wideComputer, wideLargeScreen, wideWidescreen,
  Header, sizeHeader, outerTag, subHeader,
  Row,
} from '../../common/exports';
import * as ui from '../../common/exports';

export const HeaderTest: ui.StatelessComponent<ui.IProps> = props => {
  return <Container>
    <h1>Header</h1>
    <Header $h1>First header<Header $sub>Sub Header</Header></Header>
    <Header $h2>Second header<Header $sub>Sub Header</Header></Header>
    <Header $h3>Third header<Header $sub>Sub Header</Header></Header>
    <Header $h4>Fourth header<Header $sub>Sub Header</Header></Header>
    <Header $h5>Fifts header<Header $sub>Sub Header</Header></Header>

    <h2>Content Headers</h2>
    <Header $huge>Huge</Header>
    <Header $large>Large</Header>
    <Header $medium>Medium</Header>
    <Header $small>Small</Header>
    <Header $tiny>Tiny</Header>

    <h2>Icon Headers</h2>
    <Header $icon>
      <Icon $Icon={icon.settings}/>
      Account Settings
      <Header $sub>Manage your account settings and set e-mail preferences.</Header>
    </Header>
    <p/>
    <Header $h2 $alignedCenter $icon>
      <Icon $Icon={icon.users} $circularStandard/>
      Friends
    </Header>

    <h2>Sub Header</h2>
    <Header $subUppercase>Label</Header>

    <h2>Image</h2>
    <Header>
      <img src='images/joe.jpg'/>
      Joe
    </Header>
    <Header>
      <img src='images/joe.jpg'/>
      <div className="content">
        Plug-ins
        <Header $sub>Check out our plug-in marketplace</Header>
      </div>
    </Header>

    <h2>Icon</h2>
    <Header>
      <Icon $Icon={icon.plug}/>
      <div className="content">
        Uptime Guarantee
      </div>
    </Header>
    <Header>
      <Icon $Icon={icon.plug}/>
      <div className="content">
        Uptime Guarantee
        <Header $sub>Check out our plug-in marketplace</Header>
      </div>
    </Header>

    <Header $h2 $disabled>Disabled</Header>

    <Header $h2 $dividing>Dividing</Header>

    <Header $h2 $block>Block</Header>


    <h2>Attached</h2>
    <Header $attachedTop>Top attached</Header>
    <Segment $attachedBoth>Lorem ipsum dolor sit amet, consectetuer adipiscing elit.</Segment>
    <Header $attachedBoth>Attached Both</Header>
    <Segment $attachedBoth>Lorem ipsum dolor sit amet, consectetuer adipiscing elit.</Segment>
    <Header $attachedBottom>Bottom attached</Header>

    <h2>Floating</h2>
    <Segment $clearing>
      <Header $floatedRight>Floated Right</Header>
      <Header $floatedLeft>Floated Left</Header>
    </Segment>

    <h2>Text align</h2>
    <Segment>
      <Header $alignedRight>Right</Header>
      <Header $alignedLeft>Left</Header>
      <Header $alignedCenter>Center</Header>
      <Header $justified>Justified: Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.</Header>
    </Segment>

    <h2>Colored</h2>
    <Header $colGreen>Green</Header>
    <Segment $inverted>
      <Header $inverted $colGreen>Green</Header>
    </Segment>
  </Container>;
}