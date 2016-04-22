import * as rx from 'rxjs/Rx';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {TSyncValidator, TSyncCompleted, IFieldProps} from './lib';
//import {InputProps, inputPropsDescr} from './generated';

interface IFieldInputContext { MyField: TField; }
export const FieldInput: React.StatelessComponent<React.HTMLAttributes> = (props, context: IFieldInputContext) => context.MyField.renderInput(props);
export const FieldError: React.StatelessComponent<React.HTMLAttributes> = (props, context: IFieldInputContext) => context.MyField.renderError(props);
FieldInput.contextTypes = FieldError.contextTypes = { MyField: React.PropTypes.any };

interface IFieldState { value: string; error?: string; blured?: boolean; }
const enum validatorStatus { no, sync, async }

type TField = Field<IFieldProps>;

export class Field<T extends IFieldProps> extends React.Component<T, IFieldState> {
  constructor(prop) {
    super(prop);
    this.state = { value: '' };
    if (this.props.$validator) this.validators = [this.props.$validator];
    if (this.props.$validators) this.validators = this.props.$validators.slice(0);
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

  static childContextTypes = { MyField: React.PropTypes.any };
  getChildContext(): IFieldInputContext { return { MyField: this }; }
  renderInput(props: React.HTMLAttributes): JSX.Element {
    var prs: React.HTMLAttributes = Object.assign({}, props);
    if (!prs.type) prs.type = 'text'; prs.onChange = this.handleChange.bind(this); prs.onBlur = this.blur.bind(this);
    return React.createElement('input', prs);
  }
  renderError(props: React.HTMLAttributes): JSX.Element { return <Error msg={this.state.error}/> }

  componentWillUnmount(): void { this.asyncCancel(); }

  private validators: Array<TSyncValidator>;
  private hasValidator: boolean;

  private blur() {
    if (!this.hasValidator) return;
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
      if (val != self.state.value || error != self.state.error) self.setState({ value: val, error: error, blured: self.state.blured });
      if (completed) completed(error);
    }
    function asyncStart() { //start of async validation
      console.log('asyncStart');
      self.asyncCancel();
      doSetState('...examining');
      var obs: rx.Observable<string> = rx.Observable.create((obs: rx.Subscriber<string>) => {
        self.props.$validatorAsync(val, err => { console.log('getErrorAsync completed'); if (err) obs.error(err); else obs.complete(); });
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
    delete this.asyncSubscription; delete this.asyncConnectable;
    delete this.asyncValidatingValue;
  }
  private asyncValidatingValue: string;

}

interface IError { msg: string; }
const Error: React.StatelessComponent<IError> = props => {
  return props.msg ? <span>{props.msg}</span> : null;
}