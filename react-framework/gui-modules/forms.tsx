import * as rx from 'rxjs/Rx';
import * as React from 'react';
import * as ReactDOM from 'react-dom';

import * as flux from '../flux';

const moduleId = 'forms';

interface IInputContext { MyInput: InputStore; }
enum TInputActions { setState };
interface InputActionPar extends flux.IActionPar { value: string; }

interface InputProps extends flux.IPropsEx {
  $title?: string;
  $defaultValue?: string;
  $validatorAsync?: (val: string, completed: TSyncCompleted) => void;
  $validator?: TSyncValidator;
  $validators?: Array<TSyncValidator>;
}


//@flux.StoreDef({ moduleId: moduleId })
export abstract class InputStore extends flux.Store {
  //props
  $title: string;
  $defaultValue: string;
  $validatorAsync: (val: string, completed: TSyncCompleted) => void;
  $validator: TSyncValidator;
  $validators: Array<TSyncValidator>;
  //state
  value: string;
  error: string;
  blured: boolean;
  validating: boolean;
  //engine

  //render(): JSX.Element {
  //  return this.$template ? this.$template(this) : <div>Missing $template component property</div>;
  //}
  componentCreated(comp: flux.TComponent) {
    super.componentCreated(comp);
    if (this.value===undefined) this.value = this.$defaultValue ? this.$defaultValue : '';
  }
  validate(completed?: (error: string) => void) {
    this.blured = true;
    this.setAndValidate(false, this.value, completed);
  }
  reset() {
    this.asyncCancel();
    this.modify(st => st.value = this.$defaultValue ? this.$defaultValue : '');
  }
  doDispatchAction(id: number, par: InputActionPar, completed: flux.TExceptionCallback) {
    switch (id) {
      case TInputActions.setState:
        this.blured = true;
        //this.setAndValidate(false, par.value, er => completed(er ? new Error(er) : null));
        this.setAndValidate(false, par.value, er => completed(null));
        break;
      default:
        super.doDispatchAction(id, par, completed);
    }
  }

  static renderInputTag = (pr: InputProps, context: IInputContext) => {
    var props: React.HTMLAttributes = Object.assign({}, pr); if (!props.type) props.type = 'text';
    if (!context || !context.MyInput) return React.createElement('input', props);
    var store = context.MyInput;
    props.value = store.value;
    props.onChange = store.handleChange.bind(store); if (store.hasValidator()) props.onBlur = store.blur.bind(store);
    return React.createElement('input', props);
  }

  protected hasValidator(): boolean { return !!this.$validator || !!this.$validators || !!this.$validatorAsync; }

  private blur() {
    console.log('blur');
    this.action<InputActionPar>(TInputActions.setState, 'setState', { value: this.value });
  }

  private handleChange(event) {
    this.asyncCancel();
    this.setAndValidate(true, event.target.value);
  }

  private setAndValidate(inHandleChange: boolean, val: string, completed?: TSyncCompleted) {
    var self = this;
    self.value = val;

    //******* local functions
    function refreshComponent(error: string) { //setState (=>render) & call completed
      self.modify(st => st.error = error);
      if (completed) completed(error);
    }
    function asyncStart() { //start of async validation
      console.log('asyncStart');
      self.asyncCancel();
      self.modify(st => { st.validating = true; st.error = null;});
      var obs: rx.Observable<string> = rx.Observable.create((obs: rx.Subscriber<string>) => {
        self.$validatorAsync(val, err => { console.log('getErrorAsync completed'); self.asyncDelete(); if (err) obs.error(err); else obs.complete(); });
      });
      self.$asyncConnectable = obs.publish();
      self.$asyncSubscription = self.$asyncConnectable.connect();
    }
    function asyncSubscribe(completed?: (error: string) => void) { //subscribe to async validation result
      self.$asyncConnectable.subscribe(null, err => refreshComponent(err), () => refreshComponent(null));
    }

    //******* no validation
    if (!this.hasValidator()) { refreshComponent(null); return; }

    //******* sync validation
    if (this.$validator || this.$validators) {
      if (!self.blured) { refreshComponent(null); return; }
      var error = null;
      if ((this.$validator ? [this.$validator] : this.$validators).find(v => { error = v(val); return !!error; })) { refreshComponent(error); return; }
    }

    //******* async validation
    if (!this.$validatorAsync) { refreshComponent(null); return; }
    //** at handleChange 
    //no async validation at the handleChange
    if (inHandleChange) { self.asyncCancel(); refreshComponent(null); return; }

    //** at blur or validate
    //already validated value is the same
    if (val == self.$asyncValidatingValue) {
      console.log('val == self.validatingValue');
      if (!self.$asyncSubscription) {
        if (completed) completed(self.error); //async validation not running => noop
      } else
        asyncSubscribe(err => completed(err)); //async validation already running => subscribe to its result
      return;
    }
    //value is not validated yet:
    asyncStart(); //start validation
    self.$asyncValidatingValue = val; //remember just validated value
    asyncSubscribe(completed); //subscribe to validation result
  }

  //asunchronni validace
  private $asyncSubscription: rx.Subscription;
  private $asyncConnectable: rx.ConnectableObservable<any>;
  asyncCancel() {
    if (!this.$asyncSubscription) return;
    console.log('asyncCancel');
    this.$asyncSubscription.unsubscribe();
    this.asyncDelete();
  }
  private asyncDelete() { delete this.$asyncSubscription; delete this.$asyncConnectable; delete this.$asyncValidatingValue; this.validating = false; }
  private $asyncValidatingValue: string;
}

//export class InputLow extends flux.Component<InputStore, InputProps> {
export abstract class InputLow extends flux.Component<InputStore, InputProps> {
  componentWillUnmount(): void { this.state.asyncCancel(); super.componentWillUnmount(); }

  //static childContextTypes: {} = { MyInput: React.PropTypes.any }; //neco je divneho, hlasi chybu kompatibility s TComponentClass
  getChildContext(): IInputContext { return { MyInput: this.state }; }
}
InputLow['childContextTypes'] = { MyInput: React.PropTypes.any };

//types for validators
export type TSyncValidator = (val: string) => string;
export type TSyncCompleted = (err: string) => void;

interface IFieldInputContext { MyInput: InputStore; }
export const InputTag: React.StatelessComponent<React.HTMLAttributes> = (props: InputProps, context: IInputContext) => InputStore.renderInputTag(props, context);
InputTag.contextTypes = { MyInput: React.PropTypes.any };


export class InputSmart extends InputLow { }
@flux.StoreDef({ moduleId: moduleId, componentClass: InputSmart })
export class InputSmartStore extends InputStore { }
