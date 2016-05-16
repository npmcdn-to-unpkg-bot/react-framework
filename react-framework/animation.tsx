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
  no = 100,
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
  animIsOutDefault: boolean; //undefined - nastavi se anim stav, bez animace, true
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
  constructor(private store: flux.TStore, public par: IAnimation) { }

  onDidMount() {
    if (flux.store.justRouting()) return; //prave bezi routign proces => neanimuj
    var el = this.el(); if (!el) return;
    if (this.store.animIsOut == undefined) this.in(() => { if (this.store.$onDidMount.isUnsubscribed) return; this.store.$onDidMount.complete(); });
    else this.setState(this.store.animIsOut, el);
  }
  dispose() {
    var el = this.el(); if (!el) return;
    delete this.store.animIsOut;
    Velocity(el, 'stop');
  }

  in(completed: () => void) {
    var el = this.el(); if (!el) { completed(); return; }
    var ef = decodeEfect(this.par.in);
    this.store.animIsOut = false;
    var opt: velocity.Options = { complete: () => completed() };
    this.setPar(true, opt);
    Velocity(el, 'finish');
    Velocity(el, ef, opt);
  }
  out(completed: () => void) {
    var el = this.el(); if (!el) { completed(); return; }
    var ef = decodeOutEfect(this.par.out, this.par.in);
    this.store.animIsOut = true;
    var opt: velocity.Options = { complete: () => completed() };
    this.setPar(!efectAssigned(this.par.out), opt);
    Velocity(el, 'finish');
    Velocity(el, ef, opt);
  }
  toggle(completed: () => void) {
    if (this.store.animIsOut) this.in(completed); else this.out(completed);
  }

  private setPar(inPar: boolean, opt: velocity.Options) {
    var pars = inPar ? { duration: this.par.inDuration, delay: this.par.inDelay, easing: this.par.inEasing } : { duration: this.par.outDuration, delay: this.par.outDelay, easing: this.par.outEasing };
    if (pars.duration) opt.duration = pars.duration; if (pars.delay) opt.delay = pars.delay; if (pars.easing) opt.easing = easing[pars.easing];
  }
  private el(): HTMLElement {
    return this.store && this.store.$comp ? ReactDOM.findDOMNode(this.store.$comp) as HTMLElement : null;
  }
  private setState(toOut: boolean, el: HTMLElement) {
    Velocity(el, 'stop');
    var ef = toOut ? decodeOutEfect(this.par.out, this.par.in) : decodeEfect(this.par.in);
    Velocity(el, ef);
    Velocity(el, 'finish');
  }
}
function efectAssigned(ef: transition | callout | velocity.Properties): boolean { return typeof ef == 'number' || typeof ef == 'object'; }
