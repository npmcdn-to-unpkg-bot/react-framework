import * as React from 'react';

import {
  color, size,
  Button, ButtonAnimated, ButtonLabeled, ButtonIcon, Buttons, ButtonSocial, social, floated, attachedButton, animate, iconLabel, eqWidth,
  Label, Labels, pointing, corner, attachedLabel, circular, ribbon,
  Icon, Icons, icon,
  Segment, Segments, raised, attachedSegment, padded, emphasis, aligned, raisedSegments,
} from '../exports';
import * as ui from '../exports';

export const LabelTest: ui.StatelessComponent<ui.IProps> = props => {
  return <div>
    <h1>Label</h1>
    <Label><Icon $Icon={icon.mail}/> 23</Label><br/><br/>
    <h3>Image</h3>
    <Label $image><img src="images/joe.jpg"/> Joe</Label><br/><br/>
    <Label $image $colBlue><img src="images/joe.jpg"/> Joe <div className='detail'>Friend</div></Label><br/><br/>
    <Label $image $colBlue><img src="images/joe.jpg"/> Joe <Icon $Icon={icon.delete} /></Label><br/><br/>
    <h3>Pointing</h3>
    <Label $pointingBelow>Below</Label><Label $pointingAbove>Top</Label><Label $pointingRight>Right</Label><Label $pointingLeft>Left</Label>
    <Label $basic $colRed $pointingBelow>Below</Label><Label $basic $colRed $pointingAbove>Top</Label>
    <Label $basic $colRed $pointingRight>Right</Label><Label $basic $colRed $pointingLeft>Left</Label>
    <h3>Content</h3>
    <Label>Dogs <div className='detail'>214</div></Label><br/><br/>
    <Label><Icon $Icon={icon.mail} /> Mail</Label><Label>Mail <Icon $Icon={icon.mail} /></Label><br/><br/>
    <Label><img className="ui right spaced avatar image" src="images/joe.jpg"/> Elliot</Label><br/><br/>
    <h3>Link</h3>
    <Label $outerTag='a'>Dogs <div className='detail'>214</div></Label><br/><br/>
    <Label $outerTag='a'><Icon $Icon={icon.mail} /> Mail</Label><Label $outerTag='a'>Mail <Icon $Icon={icon.mail} /></Label><br/><br/>
    <Label $outerTag='a'><img className="ui right spaced avatar image" src="images/joe.jpg"/> Elliot</Label><br/><br/>
    <h3>Circular</h3>
    <Label $circularStandard $colRed>red</Label> <Label $circularEmpty $colBlue></Label><br/><br/>
    <h3>Colored</h3>
    <Label $colRed>red</Label><br/><br/>
    <h3>Size</h3>
    <Label $s3>s3</Label> <Label $s2>s2</Label> <Label $s1>s1</Label> <Label>-</Label> <Label $1>1</Label> <Label $2>2</Label> <Label $3>3</Label> <Label $4>4</Label><br/><br/>
    <h3>Tag</h3>
    <Label $tag $colRed>New</Label>
    <h3>Horizontal</h3>
    <Label $horizontal $colRed>New</Label> product
    <h3>Floating</h3>
    <div className="ui compact menu">
      <a className="item">
        <Icon $Icon={icon.mail}/> Messages
        <Label $floating $colRed>22</Label>
      </a>
      <a className="item">
        <Icon $Icon={icon.users}/> Friends
        <Label $floating $colRed>22</Label>
      </a>
    </div>
    <h3>Group Size</h3>
    <Labels $2><Label>Fun</Label> <Label>Happy</Label></Labels>
    <h3>Group Color</h3>
    <Labels $colBlue><Label>Fun</Label> <Label>Happy</Label></Labels>
    <h3>Group Tag</h3>
    <Labels $tag><Label>Fun</Label> <Label>Happy</Label></Labels>
    <h3>Group Circular</h3>
    <Labels $circular $colRed $s2><Label>Fun</Label> <Label>Happy</Label></Labels>
    <h3>Corner</h3>
    <div className="ui fluid image" style={{ width: 200 }}>
      <Label $cornerLeft><Icon $Icon={icon.heart} /></Label>
      <img src="images/image.png"/>
    </div><br/>
    <div className="ui fluid image" style={{ width: 200 }}>
      <Label $cornerRight $colRed><Icon $Icon={icon.heart} /></Label>
      <img src="images/image.png"/>
    </div><br/>
    <h3>Ribbon</h3>
    <Segment>
      <Label $colRed $ribbonLeft>Overview</Label><span>Account Details</span>
      <img className="ui wireframe image" src="images/paragraph.png"/>
      <p></p>
      <Label $colBlue $ribbonLeft>Community</Label> User Reviews
      <img className="ui wireframe image" src="images/paragraph.png"/>
      <p></p>
    </Segment >
    <div className="ui fluid image" style={{ width: 200 }}>
      <Label $colBlack $ribbonLeft><Icon $Icon={icon.hotel} /></Label>
      <img src="images/image.png"/>
    </div><br/>
    <h3>Attached</h3>
    <div className="ui three column grid">
      <div className="row">
        <div className="column">
          <Segment>
            <Label $attachedTop>HTML</Label>
            <img className="ui wireframe image" src="images/paragraph.png"/>
          </Segment>
        </div>
        <div className="column">
          <Segment>
            <Label $attachedBottom>HTML</Label>
            <img className="ui wireframe image" src="images/paragraph.png"/>
          </Segment>
        </div>
        <div className="column">
          <Segment>
            <Label $attachedTopRight>HTML</Label>
            <img className="ui wireframe image" src="images/paragraph.png"/>
          </Segment>
        </div>
      </div>
      <div className="row">
        <div className="column">
          <Segment>
            <Label $attachedTopLeft>HTML</Label>
            <img className="ui wireframe image" src="images/paragraph.png"/>
          </Segment>
        </div>
        <div className="column">
          <Segment>
            <Label $attachedBottomLeft>HTML</Label>
            <img className="ui wireframe image" src="images/paragraph.png"/>
          </Segment>
        </div>
        <div className="column">
          <Segment>
            <Label $attachedBottomRight>HTML</Label>
            <img className="ui wireframe image" src="images/paragraph.png"/>
          </Segment >
        </div>
      </div>
    </div>

  </div>;
}
