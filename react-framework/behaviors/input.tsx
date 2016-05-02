import * as rx from 'rxjs/Rx';
import * as React from 'react';
import * as ReactDOM from 'react-dom';

import * as flux from '../flux';
import * as forms from './forms';

const moduleId = 'forms';

//************** INPUT
type TValue = string;

interface InputLowProps extends forms.FieldLowProps<TValue> {}

export abstract class InputLowStore extends forms.FieldLowStore<TValue> {
  //static renderInputTag = (pr: InputLowProps, context: forms.IFieldContext) => {
  //  let props: React.HTMLAttributes = Object.assign({}, pr); if (!props.type) props.type = 'text';
  //  if (!context || !context.MyInput) return React.createElement('input', props);
  //  let store = context.MyInput as InputLowStore;
  //  props.value = store.value;
  //  props.onChange = ev => store.handleChange((event.target as any).value); if (store.hasValidator()) props.onBlur = store.blur.bind(store);
  //  return React.createElement('input', props);
  //}

  modifyInputTagProps(props: React.HTMLAttributes) {
    super.modifyInputTagProps(props);
    props.value = this.value;
    props.onChange = ev => this.handleChange((event.target as any).value); if (this.hasValidator()) props.onBlur = this.blur.bind(this);
  }

  //string value
  $defaultValue: TValue;
  assignTo(val: TValue): TValue { return val ? val : ''; }
  modified(val1: TValue, val2: TValue):boolean {return val1!=val2;}
}
//interface IInputContext extends flux.IComponentContext { MyInput: InputLowStore; }

export abstract class InputLow<T extends InputLowStore, P> extends forms.FieldLow<TValue, T, InputLowProps & P> { }
InputLow['childContextTypes'] = { MyInput: React.PropTypes.any, $parent: React.PropTypes.any };
//InputLow['contextTypes'] = { MyForm: React.PropTypes.any, $parent: React.PropTypes.any };

//************** InputSmart
export class InputSmart extends InputLow<InputSmartStore, {}> { } 

@flux.StoreDef({ moduleId: moduleId, componentClass: InputSmart })
export class InputSmartStore extends InputLowStore { }