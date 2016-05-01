import * as rx from 'rxjs/Rx';
import * as React from 'react';
import * as ReactDOM from 'react-dom';

import * as flux from '../flux';

const moduleId = 'forms';

//************** FIELD

enum TFieldActions { setState };
interface FieldActionPar extends flux.IActionPar { value: string; }

export abstract class FieldLow<T extends FieldLowStore, P> extends flux.Component<T, FieldLowProps & P> {}

type TFieldComponent = FieldLow<FieldLowStore, {}>;

export interface FieldLowProps extends flux.IPropsEx {
  $title?: string;
  $defaultValue?: string;
  $validatorAsync?: (val: string, completed: flux.TSyncCompleted) => void;
  $validator?: flux.TSyncValidator | Array<flux.TSyncValidator>;
}

//************** FieldLowStore
export abstract class FieldLowStore extends flux.Store implements FieldLowProps {
  //props
  $title: string;
  $defaultValue: string;
  $validatorAsync: (val: string, completed: flux.TSyncCompleted) => void;
  $validator: flux.TSyncValidator | Array<flux.TSyncValidator>;
  //inherited
  $context: IFormContext;
  $myForm: FormLowStore;
  //state
  value: string;
  error: string;
  blured: boolean;
  validating: boolean;
  //engine

  componentCreated(comp: TFieldComponent) {
    super.componentCreated(comp);
    if (this.value === undefined) this.value = this.$defaultValue ? this.$defaultValue : '';
    if (this.$context && this.$context.MyForm) this.$context.MyForm.register(this, true);
  }
  componentWillUnmount(comp: TFieldComponent): void { this.asyncCancel(); if (this.$myForm) this.$myForm.register(this, false); super.componentWillUnmount(comp); }

  validate(completed?: (error: string) => void) {
    this.blured = true;
    this.setAndValidate(false, this.value, completed);
  }
  reset() {
    this.asyncCancel();
    delete this.$asyncLastResult;
    this.modify(st => st.value = this.$defaultValue ? this.$defaultValue : '');
  }
  doDispatchAction(id: number, par: FieldActionPar, completed: flux.TExceptionCallback) {
    switch (id) {
      case TFieldActions.setState:
        this.blured = true;
        this.setAndValidate(false, par.value, er => completed(null));
        break;
      default:
        super.doDispatchAction(id, par, completed);
    }
  }

  protected hasValidator(): boolean { return !!this.$validator || !!this.$validatorAsync; }

  protected blur() {
    console.log('blur');
    this.action<FieldActionPar>(TFieldActions.setState, 'setState', { value: this.value });
  }

  protected handleChange(event) {
    this.asyncCancel();
    this.setAndValidate(true, event.target.value);
  }

  private setAndValidate(inHandleChange: boolean, val: string, completed?: flux.TSyncCompleted) {
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
      let obs: rx.Observable<string> = rx.Observable.create((obs: rx.Subscriber<string>) => {
        self.$validatorAsync(val, err => { console.log('getErrorAsync completed'); self.asyncDelete(); if (err) obs.error(err); else obs.complete(); });
        return () => { };
      });
      self.$asyncConnectable = obs.publish();
      self.$asyncSubscription = self.$asyncConnectable.connect();
    }
    function asyncSubscribe() { //subscribe to async validation result
      let lastVal = val;
      let done = err => { self.$asyncLastResult = { value: lastVal, error: err}; refreshComponent(err); }
      self.$asyncConnectable.subscribe(null, err => done(err), () => done(null));
    }

    //******* no validation
    if (!this.hasValidator()) { refreshComponent(null); return; }

    //******* sync validation
    if (this.$validator) {
      if (!self.blured) { refreshComponent(null); return; }
      let error = null;
      var vals = Array.isArray(this.$validator) ? this.$validator as Array<flux.TSyncValidator> : [this.$validator as flux.TSyncValidator];
      if (vals.find(v => { error = v(val); return !!error; })) { refreshComponent(error); return; }
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



//************** FormLow
export abstract class FormLow<T extends FormLowStore, P extends flux.IPropsEx> extends flux.Component<T, flux.IPropsEx & P> {
  getChildContext(): IFormContext { return { MyForm: this.state, $parent:this.state }; }
}
FormLow['childContextTypes'] = { MyForm: React.PropTypes.any, $parent: React.PropTypes.any };
export interface IFormContext extends flux.IComponentContext { MyForm: FormLowStore; }

export abstract class FormLowStore extends flux.Store  {
 register(input: FieldLowStore, isRegister: boolean) {
    if (isRegister) {
      input.$myForm = this;
      this.$inputs.push(input); 
    } else {
      let idx = this.$inputs.indexOf(input);
      if (idx >= 0) this.$inputs = this.$inputs.slice(idx);
    }
  }

  $inputs: Array<FieldLowStore> = [];

  validate(completed: (errors: Array<FieldLowStore>) => void) {
    let res: Array<FieldLowStore> = [];
    let obss = rx.Observable.from(this.$inputs.map(inp => rx.Observable.create((obs: rx.Subscriber<FieldLowStore>) => {
      inp.validate(err => { obs.next(inp); obs.complete(); }); return () => { };
    }))).mergeAll() as rx.Observable<FieldLowStore>;
    obss.subscribe((inpRes: FieldLowStore) => { if (inpRes.error) res.push(inpRes); }, err => new flux.Exception(err.toString()), () => completed(res.length == 0 ? null : res));
  }
  reset() { this.$inputs.forEach(inp => inp.reset()); }
}
