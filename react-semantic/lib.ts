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
    return val ? propName : null;
  }
}

export class enumConverter<T> extends propConverter {
  constructor(public enumType, valueExample: T) { super(); }
  convert(propName: string, val): convertResult {
    var res = this.enumType[val] as string; if (res == 'standard' || res == 'no') return res;
    var parts = res.split(/(?=[A-Z])/);
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
  used: {};
  usedTodo: {};
  rest: {};
  maskUsed: {};
}
export function projection(source: {}, mask: {}): projectionResult {
  var res: projectionResult = { used: {}, rest: {}, maskUsed: {}, usedTodo: {} };
  for (var p in source) {
    var mp = mask[p]; var src = source[p];
    if (mp !== undefined) { //mp muze byt null
      if (mp) { res.used[p] = src; res.maskUsed[p] = mp; }
      else res.usedTodo[p] = src; //mp je null
    } else
      res.rest[p] = src;
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

export enum colorUI {
  standard,
  red,
  orange,
  yellow,
  olive,
  green,
  teal,
  blue,
  violet,
  purple,
  pink,
  brown,
  grey,
  black
}

export enum size {
  standard,
  mini,
  tiny,
  small,
  medium,
  large,
  big,
  huge,
  massive
}