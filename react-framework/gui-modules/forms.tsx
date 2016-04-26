import * as rx from 'rxjs/Rx';
import * as React from 'react';
import * as ReactDOM from 'react-dom';

import * as flux from '../flux';

const moduleId = 'forms';

//types for validators
export type TSyncValidator = (val: string) => string;
export type TSyncCompleted = (err: string) => void;

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

export abstract class InputStore extends flux.Store {
  //props
  $title: string;
  $defaultValue: string;
  $validatorAsync: (val: string, completed: TSyncCompleted) => void;
  $validator: TSyncValidator;
  $validators: Array<TSyncValidator>;
  //inherited
  $context: IFormContext;
  $myForm: FormStore;
  //state
  value: string;
  error: string;
  blured: boolean;
  validating: boolean;
  //engine

  componentCreated(comp: InputLow) {
    super.componentCreated(comp);
    if (this.value === undefined) this.value = this.$defaultValue ? this.$defaultValue : '';
    if (this.$context && this.$context.MyForm) this.$context.MyForm.register(this, true);
  }
  componentWillUnmount(comp: InputLow): void { this.asyncCancel(); if (this.$myForm) this.$myForm.register(this, false); super.componentWillUnmount(comp); }

  validate(completed?: (error: string) => void) {
    this.blured = true;
    this.setAndValidate(false, this.value, completed);
  }
  reset() {
    this.asyncCancel();
    delete this.$asyncLastResult;
    this.modify(st => st.value = this.$defaultValue ? this.$defaultValue : '');
  }
  doDispatchAction(id: number, par: InputActionPar, completed: flux.TExceptionCallback) {
    switch (id) {
      case TInputActions.setState:
        this.blured = true;
        this.setAndValidate(false, par.value, er => completed(null));
        break;
      default:
        super.doDispatchAction(id, par, completed);
    }
  }

  static renderInputTag = (pr: InputProps, context: IInputContext) => {
    let props: React.HTMLAttributes = Object.assign({}, pr); if (!props.type) props.type = 'text';
    if (!context || !context.MyInput) return React.createElement('input', props);
    let store = context.MyInput;
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
    let self = this;
    self.value = val;

    //******* local functions
    function refreshComponent(error: string) { //setState (=>render) & call completed
      self.modify(st => st.error = error);
      if (completed) completed(error);
    }
    function asyncStart() { //start of async validation
      console.log('asyncStart');
      self.asyncCancel();
      self.modify(st => { st.validating = true; st.error = null; });
      let lastVal = val;
      let obs: rx.Observable<string> = rx.Observable.create((obs: rx.Subscriber<string>) => {
        self.$validatorAsync(val, err => { console.log('getErrorAsync completed'); self.asyncDelete(); self.$asyncLastResult = { value: lastVal, error: err }; if (err) obs.error(err); else obs.complete(); });
        return () => { };
      });
      self.$asyncConnectable = obs.publish();
      self.$asyncSubscription = self.$asyncConnectable.connect();
    }
    function asyncSubscribe() { //subscribe to async validation result
      self.$asyncConnectable.subscribe(null, err => refreshComponent(err), () => refreshComponent(null));
    }

    //******* no validation
    if (!this.hasValidator()) { refreshComponent(null); return; }

    //******* sync validation
    if (this.$validator || this.$validators) {
      if (!self.blured) { refreshComponent(null); return; }
      let error = null;
      if ((this.$validator ? [this.$validator] : this.$validators).find(v => { error = v(val); return !!error; })) { refreshComponent(error); return; }
    }

    if (!this.$validatorAsync) { refreshComponent(null); return; }

    //******* async validation
    //** at handleChange
    //no async validation at the handleChange
    if (inHandleChange) { self.asyncCancel(); refreshComponent(null); return; }

    //** at blur or validate
    //just validating value is the same => subscribe to its result
    if (val == self.$asyncValidatingValue) { asyncSubscribe(); return; }//async validation already running => subscribe to its result

    //use last validation: value does not changed => show last error
    if (self.$asyncLastResult && self.$asyncLastResult.value == val) { if (completed) completed(self.$asyncLastResult.error); return; }

    //value is not validated yet:
    self.$asyncValidatingValue = val; //remember just validated value
    asyncStart(); //start validation
    asyncSubscribe(); //subscribe to validation result
  }

  //asynchronni validace
  private $asyncSubscription: rx.Subscription;
  private $asyncConnectable: rx.ConnectableObservable<any>;
  asyncCancel() {
    if (!this.$asyncSubscription) return;
    console.log('asyncCancel');
    this.$asyncSubscription.unsubscribe();
    this.asyncDelete();
  }
  private asyncDelete() { delete this.$asyncSubscription; delete this.$asyncConnectable; delete this.$asyncValidatingValue; delete this.validating; }
  private $asyncValidatingValue: string;
  private $asyncLastResult: { value: string; error: string; };

}

//************** InputLow
export abstract class InputLow extends flux.Component<InputStore, InputProps> {
  //static childContextTypes: {} = { MyInput: React.PropTypes.any }; //neco je divneho, hlasi chybu kompatibility s TComponentClass
  getChildContext(): IInputContext { return { MyInput: this.state }; }
}
InputLow['childContextTypes'] = { MyInput: React.PropTypes.any };
InputLow['contextTypes'] = { MyForm: React.PropTypes.any };

//************** InputTag
export const InputTag: React.StatelessComponent<React.HTMLAttributes> = (props: InputProps, context: IInputContext) => InputStore.renderInputTag(props, context);
InputTag.contextTypes = { MyInput: React.PropTypes.any };

//************** InputSmart
export class InputSmart extends InputLow { }
@flux.StoreDef({ moduleId: moduleId, componentClass: InputSmart })
export class InputSmartStore extends InputStore { }

//************** FormResult
export class FormResult extends flux.Component<FormResultStore, flux.IPropsEx> { }
FormResult['contextTypes'] = { MyForm: React.PropTypes.any };

@flux.StoreDef({ moduleId: moduleId, componentClass: FormResult })
export class FormResultStore extends flux.Store {
  $myForm: FormStore;
  componentCreated(comp: InputLow) {
    super.componentCreated(comp);
    if (this.$context && this.$context.MyForm) this.$context.MyForm.register(this, true);
  }
  componentWillUnmount(comp: InputLow): void { if (this.$myForm) this.$myForm.register(this, false); super.componentWillUnmount(comp); }
}

//************** Form
export class Form extends flux.Component<FormStore, InputProps> {
  getChildContext(): IFormContext { return { MyForm: this.state }; }
}
Form['childContextTypes'] = { MyForm: React.PropTypes.any };
interface IFormContext { MyForm: FormStore; }

@flux.StoreDef({ moduleId: moduleId, componentClass: Form })
export class FormStore extends flux.Store {
  register(input: InputStore | FormResultStore, isRegister: boolean) {
    if (isRegister) {
      input.$myForm = this;
      if (input instanceof InputStore) this.$inputs.push(input); else this.$results.push(input);
    } else {
      if (input instanceof InputStore) {
        let idx = this.$inputs.indexOf(input);
        if (idx >= 0) this.$inputs = this.$inputs.slice(idx);
      } else {
        let idx = this.$results.indexOf(input);
        if (idx >= 0) this.$results = this.$results.slice(idx);
      }
    }
  }
  $inputs: Array<InputStore> = [];
  $results: Array<FormResultStore> = [];

  validate(completed: (errors: Array<InputStore>) => void) {
    let res: Array<InputStore> = [];
    let obss = rx.Observable.from(this.$inputs.map(inp => rx.Observable.create((obs: rx.Subscriber<InputStore>) => {
      inp.validate(err => { obs.next(inp); obs.complete(); }); return () => { };
    }))).mergeAll() as rx.Observable<InputStore>;
    obss.subscribe((inpRes: InputStore) => { if (inpRes.error) res.push(inpRes); }, err => new flux.Exception(err.toString()), () => completed(res.length == 0 ? null : res));
  }
  reset() { this.$inputs.forEach(inp => inp.reset()); }
}
