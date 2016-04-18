import * as React from 'react';

import {
  color, size,
  Button, ButtonAnimated, ButtonLabeled, ButtonIcon, Buttons, ButtonSocial, social, floated, attachedButton, animate, iconLabel, eqWidth,
  Label, Labels, pointing, corner, attachedLabel, circular, ribbon,
  Icon, Icons, icon,
  Segment, Segments, raised, attachedSegment, padded, emphasis, aligned, raisedSegments,

  ButtonTest, ButtonAnimatedTest, ButtonLabeledTest, ButtonIconTest, IconTest, ButtonsTest, ButtonSocialTest, LabelTest
} from '../exports';

import * as ui from '../exports';

export const SegmentTest: ui.StatelessComponent<ui.IProps> = props => {
  return <div>
    <h1>Segment</h1>
    <Segment>
      <p>lorem ipsum</p>
    </Segment><br/><br/>

    <h2>Raised</h2>
    <Segment $raisedStandard>
      <p>lorem ipsum</p>
    </Segment><br/><br/>
    <Segment $raisedStacked>
      <p>lorem ipsum</p>
    </Segment><br/><br/>
    <Segment $raisedStackedTall>
      <p>lorem ipsum</p>
    </Segment><br/><br/>
    <Segment $raisedPiled>
      <p>lorem ipsum</p>
    </Segment><br/><br/>

    <h2>Vertical</h2>
    <Segment $vertical>
      <p>lorem ipsum</p>
    </Segment><br/><br/>
    <Segment $vertical>
      <p>lorem ipsum</p>
    </Segment><br/><br/>

    <h2>Disabled</h2>
    <Segment $disabled>
      <p>lorem ipsum</p>
    </Segment><br/><br/>

    <h2>Loading</h2>
    <Segment $loading>
      <p>lorem ipsum</p>
    </Segment><br/><br/>

    <h2>Inverted</h2>
    <Segment $inverted>
      <p>lorem ipsum</p>
    </Segment><br/><br/>

    <h2>Attached</h2>
    <Segment $attachedTop>
      <p>lorem ipsum</p>
    </Segment>
    <Segment $attachedBoth>
      <p>lorem ipsum</p>
    </Segment>
    <Segment $attachedBottom>
      <p>lorem ipsum</p>
    </Segment>
    <br/><br/>

    <h2>Padded</h2>
    <Segment>
      <p>lorem ipsum</p>
    </Segment>
    <Segment $paddedStandard>
      <p>lorem ipsum</p>
    </Segment>
    <Segment $paddedVery>
      <p>lorem ipsum</p>
    </Segment>
    <br/><br/>

    <h2>Compact</h2>
    <Segment $compact>
      <p>lorem ipsum</p>
    </Segment>

    <h2>Colored</h2>
    <Segment $colRed>
      <p>lorem ipsum</p>
    </Segment>
    <Segment $colTeal>
      <p>lorem ipsum</p>
    </Segment>
    <Segment $inverted $colRed>
      <p>lorem ipsum</p>
    </Segment>
    <Segment $inverted $colTeal>
      <p>lorem ipsum</p>
    </Segment>

    <h2>Emphasis</h2>
    <Segment>
      <p>lorem ipsum</p>
    </Segment>
    <Segment $secondary>
      <p>lorem ipsum</p>
    </Segment>
    <Segment $tertiary>
      <p>lorem ipsum</p>
    </Segment>
    <Segment $inverted $tertiary>
      <p>lorem ipsum</p>
    </Segment>
    <Segment $inverted $secondary>
      <p>lorem ipsum</p>
    </Segment>
    <Segment $inverted>
      <p>lorem ipsum</p>
    </Segment>
    <Segment $inverted $tertiary $colRed>
      <p>lorem ipsum</p>
    </Segment>
    <Segment $inverted $secondary $colRed>
      <p>lorem ipsum</p>
    </Segment>
    <Segment $inverted $colRed>
      <p>lorem ipsum</p>
    </Segment>

    <h2>Circular</h2>
    <Segment $circular>
      <p>lorem ipsum</p>
    </Segment>
    <Segment $circular $inverted>
      <p>lorem ipsum</p>
    </Segment>
    <Segment $circular $inverted $colRed $tertiary>
      <p>lorem ipsum</p>
    </Segment>

    <h2>Clearing</h2>
    <Segment $clearing>
      <Button $floatedRight>Right button</Button>
      <Button $floatedLeft>Left button</Button>
    </Segment>

    <h2>Floated</h2>
    <Segment $clearing>
      <Segment $floatedRight>
        <p>This segment will appear to the right</p>
      </Segment>
      <Segment $floatedLeft>
        <p>This segment will appear to the left</p>
      </Segment>
    </Segment>

    <h2>Text Alignment</h2>
    <Segment $alignedLeft>
      <p>lorem ipsum</p>
    </Segment>
    <Segment $alignedCenter>
      <p>lorem ipsum</p>
    </Segment>
    <Segment $alignedRight>
      <p>lorem ipsum</p>
    </Segment>

    <h2>Basic</h2>
    <Segment $basic>
      <p>lorem ipsum</p>
    </Segment>
    <Segment $basic $inverted $colRed>
      <p>lorem ipsum</p>
    </Segment>

    {/*============ SEGMENTS =================*/}
    <h1>Segments Group</h1>
    <Segments>
      <Segment $secondary>
        <p>lorem ipsum</p>
      </Segment>
      <Segment $colRed>
        <p>lorem ipsum</p>
      </Segment>
      <Segment $colBlue>
        <p>lorem ipsum</p>
      </Segment>
      <Segment $tertiary>
        <p>lorem ipsum</p>
      </Segment>
    </Segments>

    <h2>Horizontal</h2>
    <Segments $horizontal>
      <Segment>
        <p>lorem ipsum</p>
      </Segment>
      <Segment>
        <p>lorem ipsum</p>
      </Segment>
      <Segment>
        <p>lorem ipsum</p>
      </Segment>
    </Segments>

    <h2>Compact</h2>
    <Segments $compact>
      <Segment>
        <p>lorem ipsum</p>
      </Segment>
      <Segment>
        <p>lorem ipsum</p>
      </Segment>
    </Segments>


    <h2>Nested</h2>
    <Segments>
      <Segment>
        <p>lorem ipsum</p>
      </Segment>
      <Segments>
        <Segment>
          <p>lorem ipsum</p>
        </Segment>
        <Segments $horizontal>
          <Segment>
            <p>lorem ipsum</p>
          </Segment>
          <Segment>
            <p>lorem ipsum</p>
          </Segment>
        </Segments>
      </Segments>
      <Segment $secondary>
        <p>lorem ipsum</p>
      </Segment>
    </Segments>

    <h2>Raised</h2>
    <Segments $raisedStandard>
      <Segment>
        <p>lorem ipsum</p>
      </Segment>
      <Segment>
        <p>lorem ipsum</p>
      </Segment>
    </Segments>
    <Segments $raisedStacked>
      <Segment>
        <p>lorem ipsum</p>
      </Segment>
      <Segment>
        <p>lorem ipsum</p>
      </Segment>
    </Segments>
    <Segments $raisedPiled>
      <Segment>
        <p>lorem ipsum</p>
      </Segment>
      <Segment>
        <p>lorem ipsum</p>
      </Segment>
    </Segments>

  </div>;
}

