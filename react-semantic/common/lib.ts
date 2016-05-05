import * as React from 'react';

export type convertResult = string | {};
export abstract class propConverter {
  abstract convert(propName: string, val): convertResult;
}
export type TPropsDescr = { [propName: string]: propConverter; };
export interface IProps extends React.HTMLAttributes { }

export class htmlTags {
  static h1 = 1;
  static h2 = 2;
  static h3 = 3;
  static h4 = 4;
  static h5 = 5;
  static a = 6;
  static div = 7;
  static span = 8;
  static form = 9;
}

//export const InputTag: React.StatelessComponent<React.HTMLAttributes> = (pr, context) => {
//  let props: React.HTMLAttributes = Object.assign({}, pr); if (!props.type) props.type = 'text';
//  return React.createElement('input', props);
//}

//-----------------------
export interface StatelessComponent<T> extends React.StatelessComponent<React.Props<any> & T> { }

export function convert(enumType) {
  for (let p in enumType) {
    let val = enumType[p]; if (typeof val !== 'string') continue;
  }
}

export function enumToClass<T extends number>(enumType, val: T): string {
  let res = enumType[val as number];
  return res == 'standard' || res == 'no' ? '' : res;
}

export class boolConverter extends propConverter {
  constructor(valueExample: boolean, private ignoreGen?:boolean, private alias?:string) { super(); }
  convert(propName: string, val): convertResult {
    if (this.ignoreGen) return '';
    if (propName[0] == '$') propName = propName.substr(1);
    return val ? decodeValue(this.alias ? this.alias : propName) : null;
  }
}

export class enumConverter<T> extends propConverter {
  constructor(public enumType, valueExample: T) { super(); }
  convert(propName: string, val): convertResult {
    let res = typeof val == 'number' ? this.enumType[val] as string : val as string; if (res == 'standard' || res == 'no') return res;
    let temp = propsToHTMLClass[res]; res = temp ? temp : res; //nahrada spatne hodnoty spravnou, napr. IPropsPointing.pointingAbove => pointing
    if (res[0] == '$') res = res.substr(1);
    return decodeValue(res);
  }
}

function decodeValue(val: string): string {
  let parts = val.split(/(?=[A-Z])/);
  return parts.map(p => p.toLowerCase()).join(' ');
}

export function createDescr<T extends IProps>(create: (val: T) => TPropsDescr, ancestor?: TPropsDescr): TPropsDescr {
  let res: TPropsDescr = ancestor ? Object.assign({}, ancestor) : {};
  Object.assign(res, create({} as T));
  return res;
}

export interface projectionResult {
  used: { [propName: string]: any; };
  usedTodo: { [propName: string]: any; };
  rest: { [propName: string]: any; };
  maskUsed: TPropsDescr;
}
export function projection(source: {}, mask: TPropsDescr): projectionResult {
  let res: projectionResult = { used: {}, rest: {}, maskUsed: {}, usedTodo: {} };
  for (let id in source) {
    let val = source[id];
    let mp = mask[id];
    if (mp !== undefined) { //mp muze byt null => 
      if (mp) { res.used[id] = val; res.maskUsed[id] = mp; }
      else res.usedTodo[id] = val;
    } else {
      res.rest[id] = val;
    }
  }
  return res;
}

export function enumValToProp<T extends IProps>(props: T, allProps?: TPropsDescr): T {
  let initEnums = {};
  for (let p in allProps) {
    let propDescr = allProps[p] as enumConverter<any>; if (!(propDescr instanceof enumConverter)) continue;
    if (propDescr.enumType[0] != 'no') initEnums[p] =  0;
  }
  let res = Object.assign(initEnums, props);
  for (let propId in res) {
    let propInfo = enumValueToProp[propId]; if (!propInfo || !allProps[propInfo.propName]) continue;
    res[propInfo.propName] = propInfo.enumType[propId]; delete res[propId]; 
  }
  return res;
}

export function propsToClasses(init: Array<convertResult>, src: projectionResult): {} {
  let parts: Array<convertResult> = init ? init : [];
  for (let p in src.used) {
    let val = src.used[p]; let converter: propConverter = src.maskUsed[p];
    parts.push(converter.convert(p, val));
  }
  if (src.rest['className']) { parts.push(src.rest['className']); } //delete src.rest['className']; }
  src.rest['className'] = classNames.apply(null, parts);
  return src.rest;
}

function enumParse(enumType, isString:boolean): Array<string|number> {
  let res = [];
  for (let p in enumType) { let val = enumType[p]; if ((isString && !(typeof val == 'string')) || (!isString && !(typeof val == 'number'))) continue; res.push(val); }
  return res;
}
export function enumStrings(enumType): Array<string> { return enumParse(enumType, true) as Array<string>; }
export function enumNumbers(enumType): Array<number> { return enumParse(enumType, false) as Array<number>; }

export function registerEnum(enumType, propName: string, propToHTMLClass?: { [wrong: string]: string;}) {
  for (let p in enumType) {
    let val = enumType[p]; if (typeof val == 'number' || val === 'no' || val === 'standard') continue;
    let item = enumValueToProp[val]; let numValue: number = enumType[val];
    if (item) {
      if (item.propName != propName || item.numValue != numValue) {
        debugger; throw '';
      }
    }
    enumValueToProp[val] = { propName: propName, numValue: numValue, enumType: enumType }
  }
  if (propToHTMLClass) Object.assign(propsToHTMLClass, propToHTMLClass);
}
interface IEnumItem { propName: string, numValue: number; enumType }
var enumValueToProp: { [short: string]: IEnumItem; } = {};
var propsToHTMLClass: { [wrong: string]: string; } = {};
