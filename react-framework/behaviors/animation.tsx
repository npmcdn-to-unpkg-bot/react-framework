import * as React from 'react';
import * as ReactDOM from 'react-dom';


export enum easing {
  ease,
  ease_in,
  ease_out,
  ease_in_out,
  easeInSine,
  easeOutSine,
  easeInOutSine,
  easeInQuad,
  easeOutQuad,
  easeInOutQuad,
  easeInCubic,
  easeOutCubic,
  easeInOutCubic,
  easeInQuart,
  easeOutQuart,
  easeInOutQuart,
  easeInQuint,
  easeOutQuint,
  easeInOutQuint,
  easeInExpo,
  easeOutExpo,
  easeInOutExpo,
  easeInCirc,
  easeOutCirc,
  easeInOutCirc
}

export enum callout {
  bounce = 101,
  shake = 102,
  flash = 103,
  pulse = 104,
  swing = 105,
  tada = 106,
}

export enum transition {
  fadeIn,
  fadeOut,
  flipXIn,
  flipXOut,
  flipYIn,
  flipYOut,
  flipBounceXIn,
  flipBounceXOut,
  flipBounceYIn,
  flipBounceYOut,
  swoopIn,
  swoopOut,
  whirlIn,
  whirlOut,
  shrinkIn,
  shrinkOut,
  expandIn,
  expandOut,
  bounceIn,
  bounceOut,
  bounceUpIn,
  bounceUpOut,
  bounceDownIn,
  bounceDownOut,
  bounceLeftIn,
  bounceLeftOut,
  bounceRightIn,
  bounceRightOut,
  slideUpIn,
  slideUpOut,
  slideDownIn,
  slideDownOut,
  slideLeftIn,
  slideLeftOut,
  slideRightIn,
  slideRightOut,
  slideUpBigIn,
  slideUpBigOut,
  slideDownBigIn,
  slideDownBigOut,
  slideLeftBigIn,
  slideLeftBigOut,
  slideRightBigIn,
  slideRightBigOut,
  perspectiveUpIn,
  perspectiveUpOut,
  perspectiveDownIn,
  perspectiveDownOut,
  perspectiveLeftIn,
  perspectiveLeftOut,
  perspectiveRightIn,
  perspectiveRightOut,
}

function decodeEfect(ef: transition | callout | velocity.Properties): string | velocity.Properties {
  if (typeof ef == 'number') {
    let isCallout = ef >= 100;
    return isCallout ? `callout.${callout[ef as number]}` : `transition.${transition[ef as number]}`;
  } else
    return ef;
}

function decodeOutEfect(ef: transition | callout | velocity.Properties, inEf: transition | callout | velocity.Properties): string | velocity.Properties {
  if (typeof ef == 'number' || typeof ef == 'object') return ef;
  if (ef != 'number' || ef >= 100) throw 'decodeOutEfect';
  var res: string = transition[ef as number] as string; if (!res.endsWith('In')) throw 'decodeOutEfect 2';
  return res.replace('In', 'Out');
}

function decodeEasing(es: easing): string { return (easing[es] as string).replace('_','-'); }

export interface IAnimation {
  in: transition | callout | velocity.Properties;
  out: transition | callout | velocity.Properties;
  options: velocity.Options;
}