import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as flux from '../../react-framework/exports';
import * as tests from '../test-config';

import {CodeGenerator, CodeGenerator2} from '../../react-semantic/common/codeGenerator';

import {
  icon, flag, flagShort, color, size, floated, aligned, column,
  Button, attachedButton,
  ButtonAnimated,
  ButtonIcon, iconLabel,
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
  FlagTest, GridTest, ContainerTest, DividerTest, HeaderTest, ImageTest
} from '../../react-semantic/common/exports';
import * as ui from '../../react-semantic/common/exports';

var moduleId = 'testReactSemantic;'

//****************** Main Entry Point
export function init() {
  flux.StoreApp.bootApp(AppStore);
}

//****************** App Store
@flux.StoreDef({ moduleId: moduleId })
export class AppStore extends flux.StoreApp {
  getStartRoute(): flux.TRouteActionPar {
    return flux.createRoute(AppRootStore);
  }
  getIsHashRouter(): boolean { return true; }
}

//****************** AppRoot component
export interface IStoreApp extends flux.IStore { }
export interface IPropsExApp extends flux.IPropsEx { }
export class AppRoot extends flux.Component<AppRootStore, IPropsExApp> { }

enum TActions { };//, refreshState };

@flux.StoreDef({ moduleId: moduleId, componentClass: AppRoot })
export class AppRootStore extends flux.Store implements IStoreApp {
  render(): JSX.Element {
    return <div>
      <ImageTest/>
      {/*
      <CodeGenerator2/>
      <CodeGenerator/>
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
      <ButtonAnimatedTest/><hr/>
      <ButtonIconTest/><hr/>
      <ButtonsTest/><hr/>
      */}
    </div>;
  }
}