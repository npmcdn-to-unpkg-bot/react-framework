import * as rx from 'rxjs/Rx';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as flux from './exports';


export enum easing {
  no,
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
  no = 100;
  bounce = 101,
  shake = 102,
  flash = 103,
  pulse = 104,
  swing = 105,
  tada = 106,
}

export enum transition {
  no,
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
  if (efectAssigned(ef)) return ef;
  if (typeof inEf != 'number' || inEf >= 100) throw 'decodeOutEfect';
  var res: string = transition[inEf as number] as string;
  //if (res.endsWith('In')) throw 'decodeOutEfect 2';
  return `transition.${res.endsWith('In') ? res.replace('In', 'Out') : res.replace('Out', 'In')}`;
}

function decodeEasing(es: easing): string { return (easing[es] as string).replace('_','-'); }

export interface IAnimation {
  in: transition | callout | velocity.Properties;
  inDuration?: number;
  inDelay?: number;
  inEasing?: easing;
  out?: transition | callout | velocity.Properties;
  outDuration?: number;
  outDelay?: number;
  outEasing?: easing;
}
export class Animation {
  constructor(private par: IAnimation) { }
  init(store: flux.TStore) {
    //debugger;
    this.el = store && store.$comp ? ReactDOM.findDOMNode(store.$comp) as HTMLElement : null;
  }
  private el: HTMLElement;
  in(completed: () => void) {
    if (!this.el) { completed(); return; }
    var ef = decodeEfect(this.par.in);
    var opt: velocity.Options = { complete: () => completed() };
    this.setPar(true, opt);
    Velocity(this.el, 'finish');
    Velocity(this.el, ef, opt);
  }
  out(completed: () => void) {
    if (!this.el) { completed(); return; }
    var ef = decodeOutEfect(this.par.out, this.par.in);
    var opt: velocity.Options = { complete: () => completed() };
    this.setPar(!efectAssigned(this.par.out), opt);
    Velocity(this.el, 'finish');
    Velocity(this.el, ef, opt);
  }
  dispose() {
    if (!this.el) return;
    Velocity(this.el, 'stop');
  }
  private setPar(inPar: boolean, opt: velocity.Options) {
    var pars = inPar ? { duration: this.par.inDuration, delay: this.par.inDelay, easing: this.par.inEasing } : { duration: this.par.outDuration, delay: this.par.outDelay, easing: this.par.outEasing };
    if (pars.duration) opt.duration = pars.duration; if (pars.delay) opt.delay = pars.delay; if (pars.easing) opt.easing = easing[pars.easing];
  }
}
function efectAssigned(ef: transition | callout | velocity.Properties): boolean { return typeof ef == 'number' || typeof ef == 'object'; }
