import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as flux from '../../react-framework/exports';
import * as tests from '../test-config';

import {CodeGenerator, CodeGenerator2} from '../../react-semantic/common/codeGenerator';

import {
  icon, flag, flagShort, color, size, floated, aligned, column,
  Button, attachedButton,
  ButtonAnimated,
  ButtonIcon,
  ButtonLabeled,
  Buttons, eqWidth,
  ButtonSocial, social,
  Divider,
  Flag,
  Icon, flipped, rotated, circularIcon, bordered,
  Icons,
  Label, pointing, corner, attachedLabel, circularLabel, ribbon,
  Labels,
  Segment, raised, attached, padded, emphasis,
  Segments, raisedSegments,
  Column, wide,
  Grid,
  Row,

  ButtonTest, ButtonAnimatedTest, ButtonLabeledTest, ButtonIconTest, IconTest, ButtonsTest, ButtonSocialTest, LabelTest, SegmentTest,
  FlagTest, GridTest, ContainerTest, DividerTest, HeaderTest, ImageTest, InputTest, MessageTest, FormsTest,
} from '../../react-semantic/common/exports';
import * as ui from '../../react-semantic/common/exports';

import {FormSmartTest} from '../../react-semantic/behaviors/forms-test';


var moduleId = 'UITest'

//****************** Main Entry Point
export function init() {
  flux.StoreApp.bootApp(AppStore);
}

//****************** App Store
@flux.StoreDef({ moduleId: moduleId })
export class AppStore extends flux.StoreApp {
  getStartRoute(): flux.TRouteActionPar { return flux.createRoute(AppRootStore); }
  getIsHashRouter(): boolean { return true; }
}

//****************** AppRoot component
export class AppRoot extends flux.Component<AppRootStore, {}> { }

enum TActions { };//, refreshState };

@flux.StoreDef({ moduleId: moduleId, componentClass: AppRoot })
export class AppRootStore extends flux.Store<{}> {
  render(): JSX.Element {
    return <div>
      <FormSmartTest/>
      {/*
      <div className="ui form">
        <div className="three fields">
          <div className="field" style={{ marginBottom: '0' }}>
            <label>First name</label>
            <input type="text" placeholder="First Name"/>
            <Label $tiny $pointingAbove $colRed $basic style={{ visibility: 'hidden', marginTop: '-1px' }}>asdfasd f asdf sadf</Label>
          </div>
          <div className="field" style={{ marginBottom: '0' }}>
            <label>Middle name</label>
            <input type="text" placeholder="Middle Name"/>
            <Label $tiny $pointingAbove $colRed $basic style={{ visibility: 'xhidden', marginTop: '-1px' }}>asdfasd f asdf sadf</Label>
          </div>
          <div className="field" style={{ marginBottom: '0' }}>
            <label>Last name</label>
            <input type="text" placeholder="Last Name"/>
            <Label $tiny $pointingAbove $colRed $basic style={{ visibility: 'xhidden', marginTop: '-1px' }}>asdfasd f asdf sadf</Label>
          </div>
        </div>
      </div>
      <CodeGenerator2/>
      <CodeGenerator/>
      <FormSmartTest/>
      <MessageTest/>
      <FormsTest/>
      <InputTest/>
      <ImageTest/>
      <HeaderTest/>
      <DividerTest/>
      <ContainerTest/>
      <FlagTest/>
      <SegmentTest/>
      <IconTest/><hr/>
      <LabelTest/><hr/>
      <ButtonTest/><hr/>
      <ButtonSocialTest/><hr/>
      <ButtonLabeledTest/><hr/>
      <ButtonIconTest/><hr/>
      <ButtonAnimatedTest/><hr/>
      <ButtonsTest/><hr/>
      */}
    </div>;
  }
}