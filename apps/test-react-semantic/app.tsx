﻿import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as flux from '../../react-framework/exports';
import * as tests from '../test-config';

import {CodeGenerator, CodeGenerator2} from '../../react-semantic/codeGenerator';

import {
  color, size,
  Button, ButtonAnimated, ButtonLabeled, ButtonIcon, Buttons, ButtonSocial, floated, attachedButton, animate, iconLabel, eqWidth,
  Label, Labels, pointing, corner, attachedLabel, ribbon,
  Icon, icon,
  Segment, Segments, raised, attachedSegment, padded, emphasis, aligned, raisedSegments,

  ButtonTest, ButtonAnimatedTest, ButtonLabeledTest, ButtonIconTest, IconTest, ButtonsTest, ButtonSocialTest, LabelTest, SegmentTest,
  FlagTest, 
} from '../../react-semantic/exports';
import * as ui from '../../react-semantic/exports';

var moduleId = 'testReactSemantic';

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
      <CodeGenerator2/>
      {/*
      <CodeGenerator2/>
      <CodeGenerator/>
      <ComponentGen comp={genData['divider']}/>
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