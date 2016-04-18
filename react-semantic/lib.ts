import * as ui from './exports';

//-----------------------
export interface StatelessComponent<T> extends React.StatelessComponent<React.Props<any> & T> { }

export function convert(enumType) {
  for (var p in enumType) {
    var val = enumType[p]; if (typeof val !== 'string') continue;
  }
}

export function enumToClass<T extends number>(enumType, val: T): string {
  var res = enumType[val as number];
  return res == 'standard' || res == 'no' ? '' : res;
}

type convertResult = string | {};

export abstract class propConverter {
  abstract convert(propName: string, val): convertResult;
}

export class boolConverter extends propConverter {
  constructor(valueExample: boolean, private ignoreGen?:boolean) { super(); }
  convert(propName: string, val): convertResult {
    if (this.ignoreGen) return '';
    if (propName[0] == '$') propName = propName.substr(1);
    return val ? propName : null;
  }
}

export class enumConverter<T> extends propConverter {
  constructor(public enumType, valueExample: T) { super(); }
  convert(propName: string, val): convertResult {
    let res = typeof val == 'number' ? this.enumType[val] as string : val as string; if (res == 'standard' || res == 'no') return res;
    var temp = propsToHTMLClass[res]; res = temp ? temp : res; //nahrada spatne hodnoty spravnou, napr. IPropsPointing.pointingAbove => pointing
    if (res[0] == '$') res = res.substr(1);
    let parts = res.split(/(?=[A-Z])/);
    return parts.map(p => p.toLowerCase()).join(' ');
  }
}

export type TPropsDescr = { [propName: string]: propConverter; };

export interface IProps extends React.HTMLAttributes { }

export function createDescr<T extends IProps>(create: (val: T) => TPropsDescr, ancestor?: TPropsDescr): TPropsDescr {
  var res: TPropsDescr = ancestor ? Object.assign({}, ancestor) : {};
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
  for (var id in source) {
    var val = source[id];
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

export function enumValToProp<T extends IProps>(props: T): T {
  var res = Object.assign({}, props);
  for (var propId in res) {
    var propInfo = enumValueToProp[propId]; if (!propInfo) continue;
    res[propInfo.propName] = propInfo.enumType[propId]; delete res[propId]; 
  }
  return res;
}

export function propsToClasses(init: Array<convertResult>, src: projectionResult): {} {
  var parts: Array<convertResult> = init ? init : [];
  for (var p in src.used) {
    var val = src.used[p]; var converter: propConverter = src.maskUsed[p];
    parts.push(converter.convert(p, val));
  }
  if (src.rest['className']) { parts.push(src.rest['className']); } //delete src.rest['className']; }
  src.rest['className'] = classNames.apply(null, parts);
  return src.rest;
}

function enumParse(enumType, isString:boolean): Array<string|number> {
  var res = [];
  for (var p in enumType) { var val = enumType[p]; if ((isString && !(typeof val == 'string')) || (!isString && !(typeof val == 'number'))) continue; res.push(val); }
  return res;
}
export function enumStrings(enumType): Array<string> { return enumParse(enumType, true) as Array<string>; }
export function enumNumbers(enumType): Array<number> { return enumParse(enumType, false) as Array<number>; }

export function registerEnum(enumType, propName: string, propToHTMLClass?: { [wrong: string]: string;}) {
  for (var p in enumType) {
    var val = enumType[p]; if (typeof val == 'number' || val === 'no' || val === 'standard') continue;
    var item = enumValueToProp[val]; var numValue: number = enumType[val];
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

export interface IPropsColor {
  $colRed?: boolean;
  $colOrange?: boolean;
  $colYellow?: boolean;
  $colOlive?: boolean;
  $colGreen?: boolean;
  $colTeal?: boolean;
  $colBlue?: boolean;
  $colViolet?: boolean;
  $colPurple?: boolean;
  $colPink?: boolean;
  $colBrown?: boolean;
  $colGrey?: boolean;
  $colBlack?: boolean;
}

export enum color {
  standard,
  $colRed,
  $colOrange,
  $colYellow,
  $colOlive,
  $colGreen,
  $colTeal,
  $colBlue,
  $colViolet,
  $colPurple,
  $colPink,
  $colBrown,
  $colGrey,
  $colBlack
}
registerEnum(color, '$Color', {
  $colRed: 'red', $colOrange: 'orange', $colYellow: 'yellow', $colOlive: 'olive', $colGreen: 'green', $colTeal: 'teal', $colBlue: 'blue',
  $colViolet: 'violet', $colPurple: 'purple', $colPink: 'pink', $colBrown: 'brown', $colGrey: 'grey', $colBlack: 'black'
});

export interface IPropsSize {
  $s3?: boolean; $mini?: boolean;
  $s2?: boolean; $tiny?: boolean;
  $s1?: boolean; $small?: boolean;
  //$medium?: boolean;
  $1?: boolean; $large?: boolean;
  $2?: boolean; $big?: boolean;
  $3?: boolean; $huge?: boolean;
  $4?: boolean; $massive?: boolean;
}

export enum size {
  standard,
  $s3, $mini,
  $s2, $tiny,
  $s1, $small,
  //$medium,
  $1, $large,
  $2, $big,
  $3, $huge,
  $4, $massive
}
registerEnum(size, '$Size', { $s3: 'mini', $s2: 'tiny', $s1: 'small', $1: 'large', $2: 'big', $3: 'huge', $4: 'massive' });

export enum floated {
  no,
  $floatedLeft,
  $floatedRight
}
ui.registerEnum(floated, '$Floated', { $floatedLeft: 'leftFloated', $floatedRight:'rightFloated'});
export interface IPropsFloated {
  $floatedLeft?: boolean;
  $floatedRight?: boolean;
}
