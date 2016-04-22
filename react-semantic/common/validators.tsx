import {TSyncValidator} from './lib';

//https://github.com/christianalfoni/formsy-react/blob/master/src/validationRules.js
var validationInt = /^(?:[-+]?(?:0|[1-9]\d*))$/;
var validationFloat = /^(?:[-+]?(?:\d+))?(?:\.\d*)?(?:[eE][\+\-]?(?:\d+))?$/;
export var rangeValidator: (beg: number, end: number) => TSyncValidator = (beg, end) => val => {
  if (val) val = val.trim();
  if (!val || !validationInt.test(val)) return 'number expected'; val = val.trim();
  var int = parseInt(val);
  if (beg > int || end < int) return 'range error';
  return null;
};

export var requiredValidator: () => TSyncValidator = () => val => val || val.trim() ? null : 'value required';
