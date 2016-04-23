import * as rx from 'rxjs/Rx';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {TSyncValidator, TSyncCompleted, IFieldProps} from './lib';
//import {InputProps, inputPropsDescr} from './generated';

interface IFieldInputContext { MyInput: TInputLow; }
export const InputTag: React.StatelessComponent<React.HTMLAttributes> = (props: IFieldProps, context: IFieldInputContext) => inputLow.renderInputTag(props, context);
  
export const InputError: React.StatelessComponent<React.HTMLAttributes> = (props, context: IFieldInputContext) => context.MyInput.renderError(props);
InputTag.contextTypes = InputError.contextTypes = { MyInput: React.PropTypes.any };

interface IFieldState { value: string; error?: string; blured?: boolean; asyncRunning?: boolean; }

const enum validatorStatus { no, sync, async }

type TInputLow = inputLow<IFieldProps>;

export abstract class inputLow<T extends IFieldProps> extends React.Component<T, IFieldState> {
  constructor(props) {
    super(props);
    this.state = { value: props.$defaultValue ? props.$defaultValue : '' };
    if (this.props.$validator) this.validators = [this.props.$validator];
    else if (this.props.$validators) this.validators = this.props.$validators;
    this.hasValidator = !!this.validators || !!this.props.$validatorAsync;
  }
  render(): JSX.Element {
    var chlds = this.props.children;
    return React.Children.count(chlds) == 1 ? React.Children.only(chlds) : <div>{this.props.children}</div>;
  }
  validate(completed?: (error: string) => void) {
    this.state.blured = true;
    this.setNewValue(false, null, completed);
  }
  reset() {
    this.asyncCancel();
    this.setState({ value: this.props.$defaultValue ? this.props.$defaultValue : '' });
  }
  static renderInputTag = (pr: IFieldProps, context: IFieldInputContext) => { 
    var props: React.HTMLAttributes = Object.assign({}, pr); if (!props.type) props.type = 'text';
    if (!context || !context.MyInput) React.createElement('input', props);
    var field = context.MyInput;
    props.onChange = field.handleChange.bind(field); if (field.hasValidator) props.onBlur = field.blur.bind(field);
    return React.createElement('input', props);
  }

  static childContextTypes = { MyInput: React.PropTypes.any };
  getChildContext(): IFieldInputContext { return { MyInput: this }; }

  renderError(props: React.HTMLAttributes): JSX.Element { return <Error msg={this.state.error}/> }

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
      self.setState({ value: val, error: error, blured: self.state.blured, asyncRunning: self.state.asyncRunning });
      if (completed) completed(error);
    }
    function asyncStart() { //start of async validation
      console.log('asyncStart');
      self.asyncCancel();
      //doSetState('...examining');
      self.setState({ value: self.state.value, asyncRunning: true, error:'...loading'});
      var obs: rx.Observable<string> = rx.Observable.create((obs: rx.Subscriber<string>) => {
        self.props.$validatorAsync(val, err => { console.log('getErrorAsync completed'); self.state.asyncRunning = false; if (err) obs.error(err); else obs.complete(); self.asyncDelete(); });
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
  private asyncDelete() { delete this.asyncSubscription; delete this.asyncConnectable; delete this.asyncValidatingValue; }
  private asyncValidatingValue: string;

}

interface IError { msg: string; }
const Error: React.StatelessComponent<IError> = props => {
  return props.msg ? <span>{props.msg}</span> : null;
}