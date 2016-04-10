import * as rx from 'rxjs/Rx';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as flux from './exports';
import * as utils from '../utils/exports';

export function subNavigate<T extends flux.IActionPar>(st: flux.Store, modify: (st: flux.IRouteActionPar<T>) => void, completed?: flux.TExceptionCallback) {
  if (!st || !(st instanceof flux.StoreRouteHook)) throw new utils.Exception(`Wrong subNavigate parameter: flux.store is not flux.StoreRouteHook`);
  var routeHook = st as flux.StoreRouteHook;
  modify(routeHook.$routePar as flux.IRouteActionPar<T>);
  routeHook.routeBind(completed);
}

export function navigate(routes: flux.TRouteActionPar, completed?: flux.TExceptionCallback) {
  flux.store.routeBind(routes, true, completed);
}

export function encodeUrl(st: flux.TRouteActionPar): string {
  var res: Array<string> = [];
  encodeUrlLow(res, st, null);
  var url = res.join('');
  return clearSlashes(url.replace(/(\$\/)*$/g, ''));
}

export function encodeFullUrl(st: flux.TRouteActionPar): string {
  var urlStr = encodeUrl(st);
  return flux.store.$basicUrl + (urlStr ? (flux.store.$isHashRouter ? '#' : '/') + urlStr : '');
}

export function decodeFullUrl(url?: string): flux.TRouteActionPar {
  return decodeUrl(decodeUrlPart(url));
}

export function decodeUrlPart(url?: string): string {
  if (!url) url = window.location.href;
  if (!url.toLowerCase().startsWith(flux.store.$basicUrl)) {
    //url = flux.store.$basicUrl; history.pushState(null, null, url);
    throw new utils.Exception(`location.href does not start with ${flux.store.$basicUrl}`);
  }
  return clearSlashes(url.substr(flux.store.$basicUrl.length));
}

export function decodeUrl(url?: string): flux.TRouteActionPar {
  if (!url) return null;
  return decodeUrlLow(url);
}

export function createRoute<T extends flux.IActionPar>(storeClass: flux.TStoreClass, par?: T, routeHookDefault?: flux.TRouteActionPar, otherHooks?: { [name: string]: flux.TRouteActionPar; }): flux.TRouteActionPar {
  var res: flux.TRouteActionPar = { storeId: flux.Store.getClassMeta(storeClass).id, par: par };
  if (routeHookDefault) { res.routeHookDefault = routeHookDefault; delete routeHookDefault.hookId; }
  if (otherHooks)
    for (var p in otherHooks) { var hk = res[p] = otherHooks[p]; hk.hookId = p; }
  return res;
}

export function getChildRoutes(st: flux.TRouteActionPar): Array<string> {
  let props = [];
  for (let p in st) if (flux.routeParIgnores.indexOf(p) < 0) props.push(p);
  return props;
}

function decodeUrlLow(url: string): flux.TRouteActionPar {
  url = '{' + url.replace(/\$\//g, '}').replace(/\//g, '{');
  let stack: Array<IDecodeStack> = []; var i = 0; var ch: string; var res: IDecodeStack = null;
  let parseRoute = (endIdx: number, st: IDecodeStack) => {
    var s = url.substring(st.openIdx, endIdx - 1);
    var parts = s.split(';');
    var propComp = parts[0].split('-'); if (propComp.length > 2) throw new utils.Exception('propComp.length > 2');
    st.hookId = propComp.length == 1 ? null : propComp[0];
    st.route = { storeId: propComp.length == 1 ? propComp[0] : propComp[1] };
    for (let i = 1; i < parts.length; i++) {
      const nv = parts[i].split('=');
      if (!st.route.par) st.route.par = {};
      st.route.par[nv[0]] = decodeURIComponent(nv[1]);
    }
  };
  while (true) {
    if (i >= url.length) {
      if (stack.length >= 1) ch = '}'; else break;
      i = url.length + 1;
    } else {
      ch = url.charAt(i); i++;
    }
    switch (ch) {
      case '{':
        if (stack.length == 0) { res = { openIdx: i }; stack.push(res); break; } //root
        let last = stack[stack.length - 1];
        if (!last.route) parseRoute(i, last); //zpracuj sekvenci mezi {xxxx{
        stack.push({ openIdx: i }); //zacni novy stack
        break;
      case '}':
        if (stack.length == 0) break;
        let last2 = stack[stack.length - 1];
        if (!last2.route) parseRoute(i, last2); //zpracuj sekvenci mezi {xxxx}, xxx je bez { i }
        let parProp = last2.hookId ? last2.hookId : flux.routeHookDefaultName;
        if (parProp != flux.routeHookDefaultName) last2.route.hookId = parProp;
        //navazani na parent route
        let par = stack[stack.length - 2];
        if (par) par.route[parProp] = last2.route;
        //vyndej ze stacku
        stack.splice(stack.length - 1, 1); 
        break;
    }
  }
  return res.route;
}

interface IDecodeStack {
  openIdx: number;
  route?: flux.TRouteActionPar;
  hookId?: string;
}

function encodeUrlLow(res: Array<string>, st: flux.TRouteActionPar, parentPropName?: string) {
  res.push((parentPropName ? parentPropName + '-' : '') + st.storeId);
  if (st.par) {
    let props = [];
    for (let p in st.par) props.push(p);
    props.sort().forEach(p => res.push(`;${p}=${encodeURIComponent(st.par[p])}`));
  }
  getChildRoutes(st).sort().forEach(p => {
    res.push('/');
    encodeUrlLow(res, st[p], p == flux.routeHookDefaultName ? null : p);
    res.push('$/');
  });
}

function clearSlashes(path: string): string { return path.replace(/\/$/, '').replace(/^\#?\/?/, ''); }