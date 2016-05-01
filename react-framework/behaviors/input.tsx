import * as rx from 'rxjs/Rx';
import * as React from 'react';
import * as ReactDOM from 'react-dom';

import * as flux from '../flux';
import * as forms from './forms';

const moduleId = 'forms';

//************** INPUT
export abstract class InputLowStore extends forms.FieldLowStore {
  static renderInputTag = (pr: forms.FieldLowProps, context: IInputContext) => {
    let props: React.HTMLAttributes = Object.assign({}, pr); if (!props.type) props.type = 'text';
    if (!context || !context.MyInput) return React.createElement('input', props);
    let store = context.MyInput;
    props.value = store.value;
    props.onChange = store.handleChange.bind(store); if (store.hasValidator()) props.onBlur = store.blur.bind(store);
    return React.createElement('input', props);
  }

}
interface IInputContext extends flux.IComponentContext { MyInput: InputLowStore; }

export abstract class InputLow<T extends InputLowStore, P> extends flux.Component<T, forms.FieldLowProps & P> { getChildContext(): IInputContext { return { MyInput: this.state, $parent: this.state }; } }
InputLow['childContextTypes'] = { MyInput: React.PropTypes.any, $parent: React.PropTypes.any };
InputLow['contextTypes'] = { MyForm: React.PropTypes.any, $parent: React.PropTypes.any };

//************** InputTag
export const InputTag: React.StatelessComponent<React.HTMLAttributes> = (props: forms.FieldLowProps, context: IInputContext) => InputLowStore.renderInputTag(props, context);
InputTag.contextTypes = { MyInput: React.PropTypes.any };

//************** InputSmart
export class InputSmart extends InputLow<InputSmartStore, {}> { } 

@flux.StoreDef({ moduleId: moduleId, componentClass: InputSmart })
export class InputSmartStore extends forms.FieldLowStore { }