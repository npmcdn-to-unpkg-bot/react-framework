import * as React from 'react';

import {
  icon, flag, flagShort, color, size, floated, aligned, column,
  Column as Col, ColumnProps, wide, wideMobile, wideTablet, wideComputer, wideLargeScreen, wideWidescreen,
  Grid,
  Row,
  Button, attachedButton,
  Segment,
} from '../../common/exports';
import * as ui from '../../common/exports';

export const Column: React.StatelessComponent<ColumnProps> = props => {
  return React.createElement(Col, props, props.children ? props.children : <div className= 'column-content'/>);
};

export const GridTest: ui.StatelessComponent<ui.IProps> = props => {
  return <div>
    <style type=''>
      {`
        .column-content {
          background-color: rgba(86, 61, 124, .1);
          height: 50px;
        }
      `}
    </style>

    <h1>Grid</h1>

    <Grid><Column $fourWide/><Column $fourWide/><Column $fourWide/><Column $fourWide/></Grid>
    <Grid $fourColumn>
      <Column/><Column/><Column/>
      <Column/><Column/><Column/><Column/>
    </Grid>

    <h2>Columns</h2>
    <Grid>
      <Column $fourWide/><Column $fourWide/><Column $fourWide/><Column $fourWide/>
      <Column $twoWide/><Column $eightWide/><Column $sixWide/>
    </Grid>

    <h2>Rows</h2>
    <Grid $fourColumn>
      <Row>
        <Column/><Column/><Column/>
      </Row>
      <Column/><Column/><Column/><Column/>
    </Grid>

    <h2>Gutters</h2>
    <Grid>
      <Row $threeColumn><Column/><Column/><Column/></Row>
      <Row $eightColumn><Column/><Column/><Column/><Column/><Column/><Column/><Column/><Column/></Row>
    </Grid>
    <Grid $relaxed>
      <Row $threeColumn><Column/><Column/><Column/></Row>
      <Row $eightColumn><Column/><Column/><Column/><Column/><Column/><Column/><Column/><Column/></Row>
    </Grid>
    <Grid $relaxedVery>
      <Row $threeColumn><Column/><Column/><Column/></Row>
      <Row $eightColumn><Column/><Column/><Column/><Column/><Column/><Column/><Column/><Column/></Row>
    </Grid>

    <h2>Negative Margins</h2>
    <Button $Attached={attachedButton.$attachedTop}>Button before grid</Button>
    <Grid><Column $tenWide/><Column $sixWide/><Column $sixteenWide/></Grid>
    <Grid><Column $sixteenWide/></Grid>
    <Button $Attached={attachedButton.$attachedBottom}>Button before grid</Button>

    <h2>Automatic Flow</h2>
    <Grid><Column $fourWide/><Column $fourWide/><Column $fourWide/><Column $fourWide/><Column $fourWide/><Column $fourWide/><Column $fourWide/><Column $fourWide/></Grid>

    <h2>Grouping</h2>
    <Grid $fourColumn>
      <Row $twoColumn><Column/></Row>
      <Column/><Column/><Column/><Column/>
    </Grid>

    <h2>Divided</h2>
    <Grid $threeColumn $dividedHorizontally>
      <Row><Column/><Column/><Column/></Row>
      <Row><Column/><Column/><Column/></Row>
    </Grid>
    <Grid $dividedVertically>
      <Row $threeColumn ><Column/><Column/><Column/></Row>
      <Row $twoColumn><Column/><Column/></Row>
    </Grid>

    <h2>Clearing Content</h2>
    <Grid>
      <Row $fourColumn><Column $floatedLeft/><Column $floatedRight/></Row>
      <Row><Column $threeWide/><Column $eightWide/><Column $fiveWide/></Row>
    </Grid>

    <h2>Celled</h2>
    <Grid $celled>
      <Row $fourColumn>
        <Column $fourWide/><Column $fourWide/><Column $fourWide/><Column $fourWide/>
      </Row>
      <Row $fourColumn>
        <Column $fourWide/><Column $fourWide/><Column $fourWide/><Column $fourWide/>
      </Row>
    </Grid>
    <Grid $internallyCelled>
      <Row $fourColumn>
        <Column $fourWide/><Column $fourWide/><Column $fourWide/><Column $fourWide/>
      </Row>
      <Row $fourColumn>
        <Column $fourWide/><Column $fourWide/><Column $fourWide/><Column $fourWide/>
      </Row>
    </Grid>

    <h2>Nesting Grids</h2>
    <Grid $twoColumn>
      <Col><Grid $threeColumn><Column/><Column/><Column/></Grid></Col>
      <Column/>
      <Column/>
      <Col><Grid><Column $tenWide/><Column $sixWide/></Grid></Col>
    </Grid>

    <h2>Colored</h2>
    <Grid $equalWidth $alignedCenter $padded>
      <Row>
        <Col $colOlive>Olive</Col>
        <Col $colBlack>Black</Col>
      </Row>
      <Row style={{ backgroundColor: '#869D05', color: '#FFFFFF' }}>
        <Col>Custom Row</Col>
      </Row>
      <Row>
        <Col $colBlack>Black</Col>
        <Col $colOlive>Olive</Col>
      </Row>
      <Row $colGreen>
        <Col/><Col/>
      </Row>
    </Grid>

    <h2>Automatic Column Count</h2>
    <Grid $equalWidth>
      <Column/>
      <Column/>
      <Column/>
      <Row $equalWidth>
        <Column/>
        <Column/>
      </Row>
    </Grid>

    <h2>Centering Content</h2>
    <Grid $twoColumn $centered>
      <Column/>
      <Row $fourColumn $centered>
        <Column/>
        <Column/>
      </Row>
    </Grid>

    <h2>Significant Word Order</h2>
    <Grid $alignedRight>
      <Column $floatedLeft $alignedRight $sixWide>
        <Segment>Left floated right aligned column</Segment>
      </Column>
      <Column $floatedRight $alignedLeft $sixWide>
        <Segment>Right floated left aligned column</Segment>
      </Column>
      <Row $twoColumn $alignedCenter >
        <Column>
          <Segment>Center aligned row</Segment>
        </Column>
        <Column>
          <Segment>Center aligned row</Segment>
        </Column>
      </Row>
      <Column $sixteenWide>
        <Segment>Right Aligned Grid</Segment>
      </Column>
    </Grid>

    <h1>Responsive Grids</h1>

    <h2>Containers</h2>
    <Grid $container>
      <Column $fourWide/><Column $fourWide/><Column $fourWide/><Column $fourWide/>
      <Column $fourWide/><Column $fourWide/><Column $fourWide/><Column $fourWide/>
    </Grid>

    <h2>Stackable</h2>
    <Grid $stackable $fourColumn>
      <Column/><Column/><Column/><Column/>
    </Grid>

    <h2>Reverse Order</h2>
    <Grid $reversed $equalWidth>
      <Column></Column>
    </Grid>

    <h2>Stretched</h2>
    <Grid $threeColumn $dividedHorizontally>
      <Row $stretched>
        <Col>
          <div style={{ backgroundColor: 'teal' }}>a<br/>a<br/>a<br/>a<br/>a<br/>a<br/></div>
        </Col>
        <Col>
          <div style={{ backgroundColor: 'teal' }}>a<br/>a<br/></div>
        </Col>
        <Col>
          <div style={{ backgroundColor: 'teal' }}>a<br/>a<br/>a<br/>a</div>
        </Col>
      </Row>
    </Grid>

    <h2>Vertical Alignment</h2>
    <Grid $fourColumn $centered>
      <Row $alignedTop>
        <Col>
          <div style={{ backgroundColor: 'teal' }}>a<br/>a<br/>a<br/>a<br/>a<br/>a<br/></div>
        </Col>
        <Col>
          <div style={{ backgroundColor: 'teal' }}>a<br/>a<br/></div>
        </Col>
        <Col>
          <div style={{ backgroundColor: 'teal' }}>a<br/>a<br/>a<br/>a</div>
        </Col>
      </Row>
      <Row $alignedMiddle>
        <Col>
          <div style={{ backgroundColor: 'teal' }}>a<br/>a<br/>a<br/>a<br/>a<br/>a<br/></div>
        </Col>
        <Col>
          <div style={{ backgroundColor: 'teal' }}>a<br/>a<br/></div>
        </Col>
        <Col>
          <div style={{ backgroundColor: 'teal' }}>a<br/>a<br/>a<br/>a</div>
        </Col>
      </Row>
      <Row $alignedBottom>
        <Col>
          <div style={{ backgroundColor: 'teal' }}>a<br/>a<br/>a<br/>a<br/>a<br/>a<br/></div>
        </Col>
        <Col>
          <div style={{ backgroundColor: 'teal' }}>a<br/>a<br/></div>
        </Col>
        <Col>
          <div style={{ backgroundColor: 'teal' }}>a<br/>a<br/>a<br/>a</div>
        </Col>
      </Row>
    </Grid>

    <h2>Containers Using Grids</h2>
    <Grid $container $fourColumn $doubling $stackable><Column/><Column/><Column/><Column/></Grid>

    <h2>Manual Tweaks</h2>
    <Grid $centered>
      <Column $sixteenWideMobile $eightWideTablet $fourWideComputer />
      <Column $sixteenWideMobile $eightWideTablet $fourWideComputer />
      <Column $sixteenWideMobile $eightWideTablet $fourWideComputer />
      <Column $sixteenWideMobile $eightWideTablet $fourWideComputer />
      <Column $sixteenWideMobile $eightWideTablet $fourWideComputer />
    </Grid>
  </div>;
};
