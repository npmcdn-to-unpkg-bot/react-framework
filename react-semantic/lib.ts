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
  constructor(valueExample: boolean) { super(); }
  convert(propName: string, val): convertResult {
    if (propName[0] == '$') propName = propName.substr(1);
    return val ? propName : null;
  }
}

export class enumConverter<T> extends propConverter {
  constructor(public enumType, valueExample: T) { super(); }
  convert(propName: string, val): convertResult {
    let res = typeof val == 'number' ? this.enumType[val] as string : val as string; if (res == 'standard' || res == 'no') return res;
    var temp = classGenReplaces[res]; res = temp ? temp : res; //nahrada spatne hodnoty spravnou, napr. IPropsPointing.pointingAbove => pointing
    if (res[0] == '$') res = res.substr(1);
    //var newVal = enumExcepts[val]; if (!newVal) newVal = res; //nahrada spatne hodnoty spravnou, napr. IPropsPointing.pointingAbove => pointing
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
    var propInfo = enumValueToProp[propId]; 
    if (!propInfo) continue;
    res[propInfo.propName] = propId; delete res[propId]; continue
  }
  return res;
}

export function propsToClasses(init: Array<convertResult>, src: projectionResult): {} {
  var parts: Array<convertResult> = init ? init : [];
  for (var p in src.used) {
    var val = src.used[p]; var converter: propConverter = src.maskUsed[p];
    parts.push(converter.convert(p, val));
  }
  if (src.rest['className']) { parts.push(src.rest['className']); delete src.rest['className']; }
  src.rest['className'] = classNames.apply(null, parts);
  return src.rest;
}

export function registerEnum(enumType, propName: string, classGenReplace?: { [wrong: string]: string;}) {
  for (var p in enumType) {
    var val = enumType[p]; if (typeof val == 'number' || val === 'no' || val === 'standard') continue;
    var item = enumValueToProp[val]; var numValue: number = enumType[val];
    if (item) {
      if (item.propName != propName || item.numValue != numValue) {
        debugger; throw '';
      }
    }
    enumValueToProp[val] = { propName: propName, numValue: numValue }
  }
  if (classGenReplace) Object.assign(classGenReplaces, classGenReplace);
}
interface IEnumItem { propName: string, numValue: number; }
var enumValueToProp: { [short: string]: IEnumItem; } = {};
var classGenReplaces: { [wrong: string]: string; } = {};

export interface IPropsColor {
  $red?: boolean;
  $orange?: boolean;
  $yellow?: boolean;
  $olive?: boolean;
  $green?: boolean;
  $teal?: boolean;
  $blue?: boolean;
  $violet?: boolean;
  $purple?: boolean;
  $pink?: boolean;
  $brown?: boolean;
  $grey?: boolean;
  $black?: boolean;
}

export enum color {
  standard,
  $red,
  $orange,
  $yellow,
  $olive,
  $green,
  $teal,
  $blue,
  $violet,
  $purple,
  $pink,
  $brown,
  $grey,
  $black
}
registerEnum(color, '$Color');

export interface IPropsSize {
  standard?: boolean;
  $mini?: boolean;
  $tiny?: boolean;
  $small?: boolean;
  $medium?: boolean;
  $large?: boolean;
  $big?: boolean;
  $huge?: boolean;
  $massive?: boolean;
}

export enum size {
  standard,
  $ini,
  $tiny,
  $small,
  $medium,
  $large,
  $big,
  $huge,
  $massive
}
registerEnum(size, '$Size');