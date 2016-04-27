import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {
  animate, animateTo, color, size, floated, aligned, column, icon,
  Container, textAligned,
  Icon,
  Segment, raised, attached, padded, emphasis,
  Grid, divided, celled, paddedGrid,
  Column, wide, wideMobile, wideTablet, wideComputer, wideLargeScreen, wideWidescreen,
  Header, sizeHeader, outerTagHeader, subHeader,
  Row,
  Message, stateMessage, sizeMessage,
} from '../../common/exports';
import * as ui from '../../common/exports';

export const MessageTest: ui.StatelessComponent<ui.IProps> = props => {
  return <Container>
    <h1>Message</h1>
    <Message>
      <Header>Changes in Service</Header>
      <p>We just updated our privacy policy here to better service our customers. We recommend reviewing the changes.</p>
    </Message>

    <h2>Icon</h2>
    <Message $icon>
      <Icon $Icon={icon.inbox}/>
      <div className='content'>
        <Header>Header</Header>
        <p>Content</p>
      </div>
    </Message>

    <h2>Hidden</h2>
    <Message $hidden>
      <Header>Header</Header>
      <p>Content</p>
    </Message>

    <h2>Visible</h2>
    <Message $visible>
      <Header>Header</Header>
      <p>Content</p>
    </Message>

    <h2>Floating</h2>
    <Message $floating>
      <Header>Header</Header>
      <p>Content</p>
    </Message>

    <h2>Compact</h2>
    <Message $compact>
      <Header>Header</Header>
      <p>Content</p>
    </Message>


    <h2>Attached</h2>
    <Message $attachedTop $colBlue>
      <Header>Header</Header>
      <p>Content</p>
    </Message>
    <Message $attachedBoth>
      <Header>Header</Header>
      <p>Content</p>
    </Message>
    <Message $attachedBottom $colTeal>
      <Header>Header</Header>
      <p>Content</p>
    </Message>

    <h2>Warning</h2>
    <Message $warning>
      <Header>Header</Header>
      <p>Content</p>
    </Message>

    <h2>Info</h2>
    <Message $info>
      <Header>Header</Header>
      <p>Content</p>
    </Message>

    <h2>Positive / Success</h2>
    <Message $positive>
      <Header>Header</Header>
      <p>Content</p>
    </Message>
    <Message $success>
      <Header>Header</Header>
      <p>Content</p>
    </Message>

    <h2>Negative / Error</h2>
    <Message $negative>
      <Header>Header</Header>
      <p>Content</p>
    </Message>
    <Message $error>
      <Header>Header</Header>
      <p>Content</p>
    </Message>

    <h2>Colored</h2>
    <Message $colBrown>
      <Header>Header</Header>
      <p>Content</p>
    </Message>

    <h2>Size</h2>
    <Message $small>
      <Header>Header</Header>
      <p>Content</p>
    </Message>
    <Message>
      <Header>Header</Header>
      <p>Content</p>
    </Message>
    <Message $large>
      <Header>Header</Header>
      <p>Content</p>
    </Message>
    <Message $huge>
      <Header>Header</Header>
      <p>Content</p>
    </Message>
    <Message $massive>
      <Header>Header</Header>
      <p>Content</p>
    </Message>

  </Container>;
}