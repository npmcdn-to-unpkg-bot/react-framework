import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {
  animate, animateTo, color, size, floated, aligned, column, icon,
  Container, textAligned,
  Divider,
  Icon,
  Segment, raised, attached, padded, emphasis,
  Grid, divided, celled, paddedGrid,
  Column, wide, wideMobile, wideTablet, wideComputer, wideLargeScreen, wideWidescreen,
  Image, Images,
  Row,
} from '../../common/exports';
import * as ui from '../../common/exports';

export const ImageTest: ui.StatelessComponent<ui.IProps> = props => {
  return <Container>
    <h1>Image</h1>
    <Image $small src='images/image.png'/>

    <h2>Link</h2>
    <Image $a $small src='images/image.png' href='about:blank'/>

    <h2>Hidden</h2>
    <Image $hidden $small src='images/image.png'/>

    <h2>Disabled</h2>
    <Image $disabled $small src='images/image.png'/>

    <h2>Avatar</h2>
    <Image $avatar src='images/joe.jpg'/>

    <h2>Bordered</h2>
    <Image $bordered $small src='images/image.png'/>

    <h2>Fluid</h2>
    <Grid $centered>
      <Column $fiveWide>
        <Image $fluid src='images/image.png'/>
      </Column>
    </Grid>

    <h2>Rounded</h2>
    <Image $rounded $small src='images/image.png'/>

    <h2>Circular</h2>
    <Image $circular $small src='images/image.png'/>

    <h2>Vertically Aligned</h2>
    <Image $alignedTop $tiny src='images/image.png'/><span>Top Aligned</span>
    <Divider/>
    <Image $alignedMiddle $tiny src='images/image.png'/><span>Middle Aligned</span>
    <Divider/>
    <Image $alignedBottom $tiny src='images/image.png'/><span>Bottom Aligned</span>

    <h2>Centered</h2>
    Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.
    <Image $centered $small src='images/image.png'/>
    Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.

    <h2>Spaced</h2>
    Lorem ipsum<Image $spaced src='images/joe.jpg'/>dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget <Image $spaced $mini src='images/image.png'/> dolor.

    <h2>Floated</h2>
    <Segment>
      <Image $floatedLeft $tiny src='images/image.png'/>
      Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.
      Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.
      Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.
      Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.
      Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.
      <Image $floatedRight $tiny src='images/image.png'/>
      Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.
      Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.
      Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.
      Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.
    </Segment>

    <h2>Size</h2>
    <Image $mini src='images/image.png'/><br/>
    <Image $tiny src='images/image.png'/><br/>
    <Image $small src='images/image.png'/><br/>

    <h2>Group of images</h2>
    <Images $tiny><Image src='images/image.png'/><Image src='images/image.png'/></Images><br/>
    <Images $mini><Image src='images/image.png'/><Image src='images/image.png'/></Images>

  </Container>;
}