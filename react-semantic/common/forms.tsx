import * as rx from 'rxjs/Rx';
import * as React from 'react';
import * as ReactDOM from 'react-dom';

//types for validators
export type TSyncValidator = (val: string) => string;
export type TSyncCompleted = (err: string) => void;

//**************** FORM LOW
interface IFormErrorItem { input: TInputLow; error: string; title: string; }
interface IFormState { loading?: boolean; errors: Array<IFormErrorItem>; }
interface IFormContext { MyForm: formLow<IFormProps>; }
export interface IFormProps {
  password: inputValue;
}
abstract class inputValue {
  value: string;
  error: string;
}


export abstract class formLow<T extends IFormProps> extends React.Component<T, IFormState> {
  static childContextTypes = { MyForm: React.PropTypes.any };
  getChildContext(): IFormContext { return { MyForm: this }; }

  private inputs: Array<TInputLow> = [];
  inputRegister(inp: TInputLow) { this.inputs.push(inp); }

  validate(completed?: (error: string) => void) {
  }
  reset() { this.inputs.forEach(inp => inp.reset()); }

}


//**************** INPUT LOW
interface IFieldInputContext { MyInput: TInputLow; }
export const InputTag: React.StatelessComponent<React.HTMLAttributes> = (props: IInputLowProps, context: IFieldInputContext) => inputLow.renderInputTag(props, context);
InputTag.contextTypes = { MyInput: React.PropTypes.any };

export type TInputLowTemplate = (self: TInputLow) => JSX.Element;
export interface IInputLowProps {
  $title?: string;
  $defaultValue?: string;
  $template?: TInputLowTemplate;
  $validatorAsync?: (val: string, completed: TSyncCompleted) => void;
  $validator?: TSyncValidator;
  $validators?: Array<TSyncValidator>;
}

interface IInputLowState { value: string; error?: string; blured?: boolean; validating?: boolean; }

const enum validatorStatus { no, sync, async }

type TInputLow = inputLow<IInputLowProps>;

export abstract class inputLow<T extends IInputLowProps> extends React.Component<T, IInputLowState> {
  constructor(props, ctx: IFormContext) {
    super(props, ctx);
    this.state = { value: props.$defaultValue ? props.$defaultValue : '' };
    //register self in the form
    if (ctx && ctx.MyForm) ctx.MyForm.inputRegister(this);
    //prepare validators
    if (this.props.$validator) this.validators = [this.props.$validator];
    else if (this.props.$validators) this.validators = this.props.$validators;
    this.hasValidator = !!this.validators || !!this.props.$validatorAsync;
  }
  render(): JSX.Element {
    return this.props.$template ? this.props.$template(this) : <div>Missing $template component property</div>;
  }
  validate(completed?: (error: string) => void) {
    this.state.blured = true;
    this.setNewValue(false, null, completed);
  }
  reset() {
    this.asyncCancel();
    this.setState({ value: this.props.$defaultValue ? this.props.$defaultValue : '' });
  }
  static renderInputTag = (pr: IInputLowProps, context: IFieldInputContext) => { 
    var props: React.HTMLAttributes = Object.assign({}, pr); if (!props.type) props.type = 'text';
    if (!context || !context.MyInput) return React.createElement('input', props);
    var field = context.MyInput;
    props.value = field.state.value;
    props.onChange = field.handleChange.bind(field); if (field.hasValidator) props.onBlur = field.blur.bind(field);
    return React.createElement('input', props);
  }

  static childContextTypes = { MyInput: React.PropTypes.any };
  static contextTypes = { MyForm: React.PropTypes.any}
  getChildContext(): IFieldInputContext { return { MyInput: this }; }

  componentWillUnmount(): void { this.asyncCancel(); }

  protected validators: Array<TSyncValidator>;
  protected hasValidator: boolean;

  private blur() {
    console.log('blur');
    this.state.blured = true;
    this.setNewValue(false);
  }

  private handleChange(event) {
    this.asyncCancel();
    this.setNewValue(true, event.target.value);
  }

  private setNewValue(inHandleChange: boolean, val?: string, completed?: TSyncCompleted) {
    var self = this;
    if (!inHandleChange) val = self.state.value;

    //******* local functions
    function doSetState(error: string) { //setState (=>render) & call completed
      //if (val != self.state.value || error != self.state.error)
      self.setState({ value: val, error: error, blured: self.state.blured, validating: self.state.validating });
      if (completed) completed(error);
    }
    function asyncStart() { //start of async validation
      console.log('asyncStart');
      self.asyncCancel();
      //doSetState('...examining');
      self.setState({ value: self.state.value, validating: true, error:null});
      var obs: rx.Observable<string> = rx.Observable.create((obs: rx.Subscriber<string>) => {
        self.props.$validatorAsync(val, err => { console.log('getErrorAsync completed'); self.asyncDelete(); if (err) obs.error(err); else obs.complete(); });
      });
      self.asyncConnectable = obs.publish();
      self.asyncSubscription = self.asyncConnectable.connect();
    }
    function asyncSubscribe(completed?: (error: string) => void) { //subscribe to async validation result
      self.asyncConnectable.subscribe(null, err => doSetState(err), () => doSetState(null));
    }

    //******* no validation
    if (!this.hasValidator) { doSetState(null); return; }

    //******* sync validation
    if (self.validators) {
      if (!self.state.blured) { doSetState(null); return; }
      var error = null;
      if (self.validators.find(v => { error = v(val); return !!error; })) { doSetState(error); return; }
    }

    //******* async validation
    //** at handleChange 
    //no async validation at the handleChange
    if (inHandleChange) { self.asyncCancel(); doSetState(null); return; }

    //** at blur or validate
    //already validated value is the same
    if (val == self.asyncValidatingValue) {
      console.log('val == self.validatingValue');
      if (!self.asyncSubscription) {
        if (completed) completed(self.state.error); //async validation not running => noop
      } else
        asyncSubscribe(err => completed(err)); //async validation already running => subscribe to its result
      return;
    }
    //value is not validated yet:
    asyncStart(); //start validation
    self.asyncValidatingValue = val; //remember just validated value
    asyncSubscribe(completed); //subscribe to validation result
  }

  //asunchronni validace
  private asyncSubscription: rx.Subscription;
  private asyncConnectable: rx.ConnectableObservable<any>;
  private asyncCancel() {
    if (!this.asyncSubscription) return;
    console.log('asyncCancel');
    this.asyncSubscription.unsubscribe();
    this.asyncDelete();
  }
  private asyncDelete() { delete this.asyncSubscription; delete this.asyncConnectable; delete this.asyncValidatingValue; this.state.validating = false; }
  private asyncValidatingValue: string;

}

export class InputSmart extends inputLow<IInputLowProps> { }
