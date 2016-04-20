import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {
  animate, animateTo, color, size, floated, textAligned, column, icon,
  Divider, DividerProps, divider,
  Container,
  Segment, raised, attached, padded, emphasis,
  Grid, divided, celled, paddedGrid,
  Column, wide, wideMobile, wideTablet, wideComputer, wideLargeScreen, wideWidescreen,
  Row,
  Icon,
} from '../../common/exports';
import * as ui from '../../common/exports';

export const DividerTest: ui.StatelessComponent<ui.IProps> = props => {
  return <Container>
    <h1>Divider</h1>
    <Container>Text above<Divider/>Text bellow</Container>

    <h2>Vertical Divider</h2>
    <Grid $threeColumn $relaxedVery $container $stackable style={{ position: 'relative' }}>
      <Column>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. </Column>
      <Divider $vertical>AND</Divider>
      <Column>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa strong. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. </Column>
      <Divider $vertical>OR</Divider>
      <Column>Lorem ipsum dolor sit amet, consectetuer adipiscing elit.</Column>
    </Grid>

    <h2>Horizontal Divider</h2>
    <Segment $basic $alignedCenter $outerTag='h4'>
      <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit</p>
      <Divider $horizontal>OR</Divider>
      <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit</p>
    </Segment>
    <p></p>
    <Divider $horizontal>
      <Icon $Icon={icon.tag}/>
      Description
    </Divider>
    <p>Doggie treats are good for all times of the year. Proven to be eaten by 99.9% of all dogs worldwide.</p>

    <h2>Inverted</h2>
    <Segment $inverted>
      <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit</p>
      <Divider $inverted/>
      <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit</p>
      <Divider $inverted $horizontal>HORIZONTAL</Divider>
    </Segment>

    <h2>Section x Fitted</h2>
    <Segment>
      Lorem ipsum dolor sit amet, consectetuer adipiscing elit
      <Divider $section/>
      Lorem ipsum dolor sit amet, consectetuer adipiscing elit
    </Segment>
    <Segment>
      Lorem ipsum dolor sit amet, consectetuer adipiscing elit
      <Divider/>
      Lorem ipsum dolor sit amet, consectetuer adipiscing elit
    </Segment>
    <Segment>
      Lorem ipsum dolor sit amet, consectetuer adipiscing elit
      <Divider $fitted/>
      Lorem ipsum dolor sit amet, consectetuer adipiscing elit
    </Segment>

    <h2>Clearing</h2>
    <Segment $alignedRight>Right floated</Segment>
    <Divider $clearing/>
    Lorem ipsum dolor sit amet, consectetuer adipiscing elit

  </Container>;
}
