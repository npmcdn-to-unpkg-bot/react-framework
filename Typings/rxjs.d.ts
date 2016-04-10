declare module "rxjs/util/isFunction" {
    export function isFunction(x: any): x is Function;
}
declare module "rxjs/Observer" {
    export interface NextObserver<T> {
        isUnsubscribed?: boolean;
        next: (value: T) => void;
        error?: (err: any) => void;
        complete?: () => void;
    }
    export interface ErrorObserver<T> {
        isUnsubscribed?: boolean;
        next?: (value: T) => void;
        error: (err: any) => void;
        complete?: () => void;
    }
    export interface CompletionObserver<T> {
        isUnsubscribed?: boolean;
        next?: (value: T) => void;
        error?: (err: any) => void;
        complete: () => void;
    }
    export type PartialObserver<T> = NextObserver<T> | ErrorObserver<T> | CompletionObserver<T>;
    export interface Observer<T> {
        isUnsubscribed?: boolean;
        next: (value: T) => void;
        error: (err: any) => void;
        complete: () => void;
    }
    export const empty: Observer<any>;
}
declare module "rxjs/util/isArray" {
    export const isArray: (arg: any) => arg is any[];
}
declare module "rxjs/util/isObject" {
    export function isObject(x: any): x is Object;
}
declare module "rxjs/util/errorObject" {
    export var errorObject: any;
}
declare module "rxjs/util/tryCatch" {
    export function tryCatch<T extends Function>(fn: T): T;
}
declare module "rxjs/Subscription" {
    export class Subscription {
        static EMPTY: Subscription;
        isUnsubscribed: boolean;
        constructor(_unsubscribe?: () => void);
        unsubscribe(): void;
        add(subscription: Subscription | Function | void): void;
        remove(subscription: Subscription): void;
    }
    export class UnsubscriptionError extends Error {
        errors: any[];
        constructor(errors: any[]);
    }
}
declare module "rxjs/util/root" {
    export let root: any;
}
declare module "rxjs/symbol/rxSubscriber" {
    /**
     * rxSubscriber symbol is a symbol for retrieving an "Rx safe" Observer from an object
     * "Rx safety" can be defined as an object that has all of the traits of an Rx Subscriber,
     * including the ability to add and remove subscriptions to the subscription chain and
     * guarantees involving event triggering (can't "next" after unsubscription, etc).
     */
    export const $$rxSubscriber: any;
}
declare module "rxjs/Subscriber" {
    import { Observer, PartialObserver } from "rxjs/Observer";
    import { Subscription } from "rxjs/Subscription";
    export class Subscriber<T> extends Subscription implements Observer<T> {
        static create<T>(next?: (x?: T) => void, error?: (e?: any) => void, complete?: () => void): Subscriber<T>;
        syncErrorValue: any;
        syncErrorThrown: boolean;
        syncErrorThrowable: boolean;
        protected isStopped: boolean;
        protected destination: PartialObserver<any>;
        constructor(destinationOrNext?: PartialObserver<any> | ((value: T) => void), error?: (e?: any) => void, complete?: () => void);
        next(value?: T): void;
        error(err?: any): void;
        complete(): void;
        unsubscribe(): void;
        protected _next(value: T): void;
        protected _error(err: any): void;
        protected _complete(): void;
    }
}
declare module "rxjs/OuterSubscriber" {
    import { Subscriber } from "rxjs/Subscriber";
    import { InnerSubscriber } from "rxjs/InnerSubscriber";
    export class OuterSubscriber<T, R> extends Subscriber<T> {
        notifyNext(outerValue: T, innerValue: R, outerIndex: number, innerIndex: number, innerSub: InnerSubscriber<T, R>): void;
        notifyError(error: any, innerSub: InnerSubscriber<T, R>): void;
        notifyComplete(innerSub: InnerSubscriber<T, R>): void;
    }
}
declare module "rxjs/InnerSubscriber" {
    import { Subscriber } from "rxjs/Subscriber";
    import { OuterSubscriber } from "rxjs/OuterSubscriber";
    export class InnerSubscriber<T, R> extends Subscriber<R> {
        private parent;
        private outerValue;
        private outerIndex;
        private index;
        constructor(parent: OuterSubscriber<T, R>, outerValue: T, outerIndex: number);
        protected _next(value: R): void;
        protected _error(error: any): void;
        protected _complete(): void;
    }
}
declare module "rxjs/Operator" {
    import { Subscriber } from "rxjs/Subscriber";
    export class Operator<T, R> {
        call(subscriber: Subscriber<R>): Subscriber<T>;
    }
}
declare module "rxjs/symbol/observable" {
    export let $$observable: any;
}
declare module "rxjs/util/toSubscriber" {
    import { PartialObserver } from "rxjs/Observer";
    import { Subscriber } from "rxjs/Subscriber";
    export function toSubscriber<T>(nextOrObserver?: PartialObserver<T> | ((value: T) => void), error?: (error: any) => void, complete?: () => void): Subscriber<T>;
}
declare module "rxjs/observable/IfObservable" {
    import { Observable } from "rxjs/Observable";
    import { Subscriber } from "rxjs/Subscriber";
    import { Subscription } from "rxjs/Subscription";
    /**
     * We need this JSDoc comment for affecting ESDoc.
     * @extends {Ignored}
     * @hide true
     */
    export class IfObservable<T, R> extends Observable<T> {
        private condition;
        private thenSource;
        private elseSource;
        static create<T, R>(condition: () => boolean, thenSource?: Observable<T>, elseSource?: Observable<R>): Observable<T | R>;
        constructor(condition: () => boolean, thenSource?: Observable<T>, elseSource?: Observable<R>);
        protected _subscribe(subscriber: Subscriber<T | R>): Subscription | Function | void;
    }
}
declare module "rxjs/scheduler/Action" {
    import { Subscription } from "rxjs/Subscription";
    import { Scheduler } from "rxjs/Scheduler";
    export interface Action extends Subscription {
        work: (state?: any) => void | Subscription;
        state?: any;
        delay?: number;
        schedule(state?: any, delay?: number): void;
        execute(): void;
        scheduler: Scheduler;
        error: any;
    }
}
declare module "rxjs/Scheduler" {
    import { Subscription } from "rxjs/Subscription";
    import { Action } from "rxjs/scheduler/Action";
    export interface Scheduler {
        now(): number;
        schedule<T>(work: (state?: T) => Subscription | void, delay?: number, state?: T): Subscription;
        flush(): void;
        active: boolean;
        actions: Action[];
        scheduledId: number;
    }
}
declare module "rxjs/observable/ErrorObservable" {
    import { Scheduler } from "rxjs/Scheduler";
    import { Observable } from "rxjs/Observable";
    import { Subscription } from "rxjs/Subscription";
    /**
     * We need this JSDoc comment for affecting ESDoc.
     * @extends {Ignored}
     * @hide true
     */
    export class ErrorObservable extends Observable<any> {
        error: any;
        private scheduler;
        /**
         * @param error
         * @param scheduler
         * @return {ErrorObservable}
         * @static true
         * @name throw
         * @owner Observable
         */
        static create<T>(error: any, scheduler?: Scheduler): ErrorObservable;
        static dispatch({error, subscriber}: {
            error: any;
            subscriber: any;
        }): void;
        constructor(error: any, scheduler?: Scheduler);
        protected _subscribe(subscriber: any): Subscription | Function | void;
    }
}
declare module "rxjs/Observable" {
    import { PartialObserver, Observer } from "rxjs/Observer";
    import { Operator } from "rxjs/Operator";
    import { Subscriber } from "rxjs/Subscriber";
    import { Subscription } from "rxjs/Subscription";
    import { IfObservable } from "rxjs/observable/IfObservable";
    import { ErrorObservable } from "rxjs/observable/ErrorObservable";
    export interface Subscribable<T> {
        subscribe(observer: Observer<T>): Subscription;
    }
    export type SubscribableOrPromise<T> = Subscribable<T> | Promise<T>;
    export type ArrayOrIterator<T> = Iterator<T> | ArrayLike<T>;
    export type ObservableInput<T> = SubscribableOrPromise<T> | ArrayOrIterator<T>;
    /**
     * A representation of any set of values over any amount of time. This the most basic building block
     * of RxJS.
     *
     * @class Observable<T>
     */
    export class Observable<T> implements Subscribable<T> {
        _isScalar: boolean;
        protected source: Observable<any>;
        protected operator: Operator<any, T>;
        /**
         * @constructor
         * @param {Function} subscribe the function that is  called when the Observable is
         * initially subscribed to. This function is given a Subscriber, to which new values
         * can be `next`ed, or an `error` method can be called to raise an error, or
         * `complete` can be called to notify of a successful completion.
         */
        constructor(subscribe?: <R>(subscriber: Subscriber<R>) => Subscription | Function | void);
        /**
         * Creates a new cold Observable by calling the Observable constructor
         * @static true
         * @owner Observable
         * @method create
         * @param {Function} subscribe? the subscriber function to be passed to the Observable constructor
         * @return {Observable} a new cold observable
         */
        static create: Function;
        /**
         * Creates a new Observable, with this Observable as the source, and the passed
         * operator defined as the new observable's operator.
         * @method lift
         * @param {Operator} operator the operator defining the operation to take on the observable
         * @return {Observable} a new observable with the Operator applied
         */
        lift<R>(operator: Operator<T, R>): Observable<R>;
        /**
         * Registers handlers for handling emitted values, error and completions from the observable, and
         *  executes the observable's subscriber function, which will take action to set up the underlying data stream
         * @method subscribe
         * @param {PartialObserver|Function} observerOrNext (optional) either an observer defining all functions to be called,
         *  or the first of three possible handlers, which is the handler for each value emitted from the observable.
         * @param {Function} error (optional) a handler for a terminal event resulting from an error. If no error handler is provided,
         *  the error will be thrown as unhandled
         * @param {Function} complete (optional) a handler for a terminal event resulting from successful completion.
         * @return {Subscription} a subscription reference to the registered handlers
         */
        subscribe(observerOrNext?: PartialObserver<T> | ((value: T) => void), error?: (error: any) => void, complete?: () => void): Subscription;
        /**
         * @method forEach
         * @param {Function} next a handler for each value emitted by the observable
         * @param {PromiseConstructor} [PromiseCtor] a constructor function used to instantiate the Promise
         * @return {Promise} a promise that either resolves on observable completion or
         *  rejects with the handled error
         */
        forEach(next: (value: T) => void, PromiseCtor?: typeof Promise): Promise<void>;
        protected _subscribe(subscriber: Subscriber<any>): Subscription | Function | void;
        static if: typeof IfObservable.create;
        static throw: typeof ErrorObservable.create;
    }
}
declare module "rxjs/Notification" {
    import { PartialObserver } from "rxjs/Observer";
    import { Observable } from "rxjs/Observable";
    export class Notification<T> {
        kind: string;
        value: T;
        exception: any;
        hasValue: boolean;
        constructor(kind: string, value?: T, exception?: any);
        observe(observer: PartialObserver<T>): any;
        do(next: (value: T) => void, error?: (err: any) => void, complete?: () => void): any;
        accept(nextOrObserver: PartialObserver<T> | ((value: T) => void), error?: (err: any) => void, complete?: () => void): any;
        toObservable(): Observable<T>;
        private static completeNotification;
        private static undefinedValueNotification;
        static createNext<T>(value: T): Notification<T>;
        static createError<T>(err?: any): Notification<T>;
        static createComplete(): Notification<any>;
    }
}
declare module "rxjs/subject/SubjectSubscription" {
    import { Subject } from "rxjs/Subject";
    import { Observer } from "rxjs/Observer";
    import { Subscription } from "rxjs/Subscription";
    export class SubjectSubscription extends Subscription {
        subject: Subject<any>;
        observer: Observer<any>;
        isUnsubscribed: boolean;
        constructor(subject: Subject<any>, observer: Observer<any>);
        unsubscribe(): void;
    }
}
declare module "rxjs/util/throwError" {
    export function throwError(e: any): void;
}
declare module "rxjs/util/ObjectUnsubscribedError" {
    /**
     * an error thrown when an action is invalid because the object
     * has been unsubscribed
     */
    export class ObjectUnsubscribedError extends Error {
        constructor();
    }
}
declare module "rxjs/Subject" {
    import { Operator } from "rxjs/Operator";
    import { Observer } from "rxjs/Observer";
    import { Observable } from "rxjs/Observable";
    import { Subscriber } from "rxjs/Subscriber";
    import { Subscription } from "rxjs/Subscription";
    /**
     * @class Subject<T>
     */
    export class Subject<T> extends Observable<T> implements Observer<T>, Subscription {
        protected destination: Observer<T>;
        protected source: Observable<T>;
        static create: Function;
        constructor(destination?: Observer<T>, source?: Observable<T>);
        observers: Observer<T>[];
        isUnsubscribed: boolean;
        protected isStopped: boolean;
        protected hasErrored: boolean;
        protected errorValue: any;
        protected dispatching: boolean;
        protected hasCompleted: boolean;
        lift<T, R>(operator: Operator<T, R>): Observable<T>;
        add(subscription: Subscription | Function | void): void;
        remove(subscription: Subscription): void;
        unsubscribe(): void;
        protected _subscribe(subscriber: Subscriber<T>): Subscription | Function | void;
        protected _unsubscribe(): void;
        next(value: T): void;
        error(err?: any): void;
        complete(): void;
        asObservable(): Observable<T>;
        protected _next(value: T): void;
        protected _finalNext(value: T): void;
        protected _error(err: any): void;
        protected _finalError(err: any): void;
        protected _complete(): void;
        protected _finalComplete(): void;
        private throwIfUnsubscribed();
    }
}
declare module "rxjs/subject/AsyncSubject" {
    import { Subject } from "rxjs/Subject";
    import { Subscriber } from "rxjs/Subscriber";
    import { Subscription } from "rxjs/Subscription";
    /**
     * @class AsyncSubject<T>
     */
    export class AsyncSubject<T> extends Subject<T> {
        value: T;
        hasNext: boolean;
        protected _subscribe(subscriber: Subscriber<any>): Subscription | Function | void;
        protected _next(value: T): void;
        protected _complete(): void;
    }
}
declare module "rxjs/observable/BoundCallbackObservable" {
    import { Observable } from "rxjs/Observable";
    import { Subscriber } from "rxjs/Subscriber";
    import { Subscription } from "rxjs/Subscription";
    import { Scheduler } from "rxjs/Scheduler";
    import { AsyncSubject } from "rxjs/subject/AsyncSubject";
    /**
     * We need this JSDoc comment for affecting ESDoc.
     * @extends {Ignored}
     * @hide true
     */
    export class BoundCallbackObservable<T> extends Observable<T> {
        callbackFunc: Function;
        private selector;
        args: any[];
        scheduler: Scheduler;
        subject: AsyncSubject<T>;
        static create<R>(callbackFunc: (callback: (result: R) => any) => any, selector?: void, scheduler?: Scheduler): () => Observable<R>;
        static create<T, R>(callbackFunc: (v1: T, callback: (result: R) => any) => any, selector?: void, scheduler?: Scheduler): (v1: T) => Observable<R>;
        static create<T, T2, R>(callbackFunc: (v1: T, v2: T2, callback: (result: R) => any) => any, selector?: void, scheduler?: Scheduler): (v1: T, v2: T2) => Observable<R>;
        static create<T, T2, T3, R>(callbackFunc: (v1: T, v2: T2, v3: T3, callback: (result: R) => any) => any, selector?: void, scheduler?: Scheduler): (v1: T, v2: T2, v3: T3) => Observable<R>;
        static create<T, T2, T3, T4, R>(callbackFunc: (v1: T, v2: T2, v3: T3, v4: T4, callback: (result: R) => any) => any, selector?: void, scheduler?: Scheduler): (v1: T, v2: T2, v3: T3, v4: T4) => Observable<R>;
        static create<T, T2, T3, T4, T5, R>(callbackFunc: (v1: T, v2: T2, v3: T3, v4: T4, v5: T5, callback: (result: R) => any) => any, selector?: void, scheduler?: Scheduler): (v1: T, v2: T2, v3: T3, v4: T4, v5: T5) => Observable<R>;
        static create<T, T2, T3, T4, T5, T6, R>(callbackFunc: (v1: T, v2: T2, v3: T3, v4: T4, v5: T5, v6: T6, callback: (result: R) => any) => any, selector?: void, scheduler?: Scheduler): (v1: T, v2: T2, v3: T3, v4: T4, v5: T5, v6: T6) => Observable<R>;
        static create<R>(callbackFunc: (callback: (...args: any[]) => any) => any, selector: (...args: any[]) => R, scheduler?: Scheduler): () => Observable<R>;
        static create<T, R>(callbackFunc: (v1: T, callback: (...args: any[]) => any) => any, selector: (...args: any[]) => R, scheduler?: Scheduler): (v1: T) => Observable<R>;
        static create<T, T2, R>(callbackFunc: (v1: T, v2: T2, callback: (...args: any[]) => any) => any, selector: (...args: any[]) => R, scheduler?: Scheduler): (v1: T, v2: T2) => Observable<R>;
        static create<T, T2, T3, R>(callbackFunc: (v1: T, v2: T2, v3: T3, callback: (...args: any[]) => any) => any, selector: (...args: any[]) => R, scheduler?: Scheduler): (v1: T, v2: T2, v3: T3) => Observable<R>;
        static create<T, T2, T3, T4, R>(callbackFunc: (v1: T, v2: T2, v3: T3, v4: T4, callback: (...args: any[]) => any) => any, selector: (...args: any[]) => R, scheduler?: Scheduler): (v1: T, v2: T2, v3: T3, v4: T4) => Observable<R>;
        static create<T, T2, T3, T4, T5, R>(callbackFunc: (v1: T, v2: T2, v3: T3, v4: T4, v5: T5, callback: (...args: any[]) => any) => any, selector: (...args: any[]) => R, scheduler?: Scheduler): (v1: T, v2: T2, v3: T3, v4: T4, v5: T5) => Observable<R>;
        static create<T, T2, T3, T4, T5, T6, R>(callbackFunc: (v1: T, v2: T2, v3: T3, v4: T4, v5: T5, v6: T6, callback: (...args: any[]) => any) => any, selector: (...args: any[]) => R, scheduler?: Scheduler): (v1: T, v2: T2, v3: T3, v4: T4, v5: T5, v6: T6) => Observable<R>;
        static create<T>(callbackFunc: Function, selector?: void, scheduler?: Scheduler): (...args: any[]) => Observable<T>;
        static create<T>(callbackFunc: Function, selector?: (...args: any[]) => T, scheduler?: Scheduler): (...args: any[]) => Observable<T>;
        constructor(callbackFunc: Function, selector: Function, args: any[], scheduler: Scheduler);
        protected _subscribe(subscriber: Subscriber<T | T[]>): Subscription;
    }
}
declare module "rxjs/add/observable/bindCallback" {
    import { BoundCallbackObservable } from "rxjs/observable/BoundCallbackObservable";
    module "rxjs/Observable" {
        namespace Observable {
            let bindCallback: typeof BoundCallbackObservable.create;
        }
    }
}
declare module "rxjs/observable/BoundNodeCallbackObservable" {
    import { Observable } from "rxjs/Observable";
    import { Subscriber } from "rxjs/Subscriber";
    import { Subscription } from "rxjs/Subscription";
    import { Scheduler } from "rxjs/Scheduler";
    import { AsyncSubject } from "rxjs/subject/AsyncSubject";
    /**
     * We need this JSDoc comment for affecting ESDoc.
     * @extends {Ignored}
     * @hide true
     */
    export class BoundNodeCallbackObservable<T> extends Observable<T> {
        callbackFunc: Function;
        private selector;
        args: any[];
        scheduler: Scheduler;
        subject: AsyncSubject<T>;
        static create<R>(callbackFunc: (callback: (err: any, result: R) => any) => any, selector?: void, scheduler?: Scheduler): () => Observable<R>;
        static create<T, R>(callbackFunc: (v1: T, callback: (err: any, result: R) => any) => any, selector?: void, scheduler?: Scheduler): (v1: T) => Observable<R>;
        static create<T, T2, R>(callbackFunc: (v1: T, v2: T2, callback: (err: any, result: R) => any) => any, selector?: void, scheduler?: Scheduler): (v1: T, v2: T2) => Observable<R>;
        static create<T, T2, T3, R>(callbackFunc: (v1: T, v2: T2, v3: T3, callback: (err: any, result: R) => any) => any, selector?: void, scheduler?: Scheduler): (v1: T, v2: T2, v3: T3) => Observable<R>;
        static create<T, T2, T3, T4, R>(callbackFunc: (v1: T, v2: T2, v3: T3, v4: T4, callback: (err: any, result: R) => any) => any, selector?: void, scheduler?: Scheduler): (v1: T, v2: T2, v3: T3, v4: T4) => Observable<R>;
        static create<T, T2, T3, T4, T5, R>(callbackFunc: (v1: T, v2: T2, v3: T3, v4: T4, v5: T5, callback: (err: any, result: R) => any) => any, selector?: void, scheduler?: Scheduler): (v1: T, v2: T2, v3: T3, v4: T4, v5: T5) => Observable<R>;
        static create<T, T2, T3, T4, T5, T6, R>(callbackFunc: (v1: T, v2: T2, v3: T3, v4: T4, v5: T5, v6: T6, callback: (err: any, result: R) => any) => any, selector?: void, scheduler?: Scheduler): (v1: T, v2: T2, v3: T3, v4: T4, v5: T5, v6: T6) => Observable<R>;
        static create<T>(callbackFunc: Function, selector?: void, scheduler?: Scheduler): (...args: any[]) => Observable<T>;
        static create<T>(callbackFunc: Function, selector?: (...args: any[]) => T, scheduler?: Scheduler): (...args: any[]) => Observable<T>;
        constructor(callbackFunc: Function, selector: Function, args: any[], scheduler: Scheduler);
        protected _subscribe(subscriber: Subscriber<T | T[]>): Subscription;
    }
}
declare module "rxjs/add/observable/bindNodeCallback" {
    import { BoundNodeCallbackObservable } from "rxjs/observable/BoundNodeCallbackObservable";
    module "rxjs/Observable" {
        namespace Observable {
            let bindNodeCallback: typeof BoundNodeCallbackObservable.create;
        }
    }
}
declare module "rxjs/observable/ScalarObservable" {
    import { Scheduler } from "rxjs/Scheduler";
    import { Observable } from "rxjs/Observable";
    import { Subscriber } from "rxjs/Subscriber";
    import { Subscription } from "rxjs/Subscription";
    /**
     * We need this JSDoc comment for affecting ESDoc.
     * @extends {Ignored}
     * @hide true
     */
    export class ScalarObservable<T> extends Observable<T> {
        value: T;
        private scheduler;
        static create<T>(value: T, scheduler?: Scheduler): ScalarObservable<T>;
        static dispatch(state: any): void;
        _isScalar: boolean;
        constructor(value: T, scheduler?: Scheduler);
        protected _subscribe(subscriber: Subscriber<T>): Subscription | Function | void;
    }
}
declare module "rxjs/observable/EmptyObservable" {
    import { Scheduler } from "rxjs/Scheduler";
    import { Subscriber } from "rxjs/Subscriber";
    import { Observable } from "rxjs/Observable";
    import { Subscription } from "rxjs/Subscription";
    /**
     * We need this JSDoc comment for affecting ESDoc.
     * @extends {Ignored}
     * @hide true
     */
    export class EmptyObservable<T> extends Observable<T> {
        private scheduler;
        /**
         * @param scheduler
         * @return {Observable<T>}
         * @static true
         * @name empty
         * @owner Observable
         */
        static create<T>(scheduler?: Scheduler): Observable<T>;
        static dispatch({subscriber}: {
            subscriber: any;
        }): void;
        constructor(scheduler?: Scheduler);
        protected _subscribe(subscriber: Subscriber<T>): Subscription | Function | void;
    }
}
declare module "rxjs/util/isScheduler" {
    import { Scheduler } from "rxjs/Scheduler";
    export function isScheduler<T>(value: any): value is Scheduler;
}
declare module "rxjs/observable/ArrayObservable" {
    import { Scheduler } from "rxjs/Scheduler";
    import { Observable } from "rxjs/Observable";
    import { Subscriber } from "rxjs/Subscriber";
    import { Subscription } from "rxjs/Subscription";
    /**
     * We need this JSDoc comment for affecting ESDoc.
     * @extends {Ignored}
     * @hide true
     */
    export class ArrayObservable<T> extends Observable<T> {
        array: T[];
        scheduler: Scheduler;
        /**
         * @param array
         * @param scheduler
         * @return {Observable}
         * @static true
         * @name fromArray
         * @owner Observable
         */
        static create<T>(array: T[], scheduler?: Scheduler): Observable<T>;
        /**
         * @param array
         * @return {any}
         * @static true
         * @name of
         * @owner Observable
         */
        static of<T>(...array: Array<T | Scheduler>): Observable<T>;
        static dispatch(state: any): void;
        value: any;
        constructor(array: T[], scheduler?: Scheduler);
        protected _subscribe(subscriber: Subscriber<T>): Subscription | Function | void;
    }
}
declare module "rxjs/util/isPromise" {
    export function isPromise<T>(value: any | Promise<T>): value is Promise<T>;
}
declare module "rxjs/symbol/iterator" {
    export let $$iterator: any;
}
declare module "rxjs/util/subscribeToResult" {
    import { Subscription } from "rxjs/Subscription";
    import { OuterSubscriber } from "rxjs/OuterSubscriber";
    export function subscribeToResult<T, R>(outerSubscriber: OuterSubscriber<T, R>, result: any, outerValue?: T, outerIndex?: number): Subscription;
}
declare module "rxjs/operator/combineLatest" {
    import { Observable, ObservableInput } from "rxjs/Observable";
    import { Scheduler } from "rxjs/Scheduler";
    import { Operator } from "rxjs/Operator";
    import { Subscriber } from "rxjs/Subscriber";
    import { OuterSubscriber } from "rxjs/OuterSubscriber";
    import { InnerSubscriber } from "rxjs/InnerSubscriber";
    /**
     * Combines the values from this observable with values from observables passed as arguments. This is done by subscribing
     * to each observable, in order, and collecting an array of each of the most recent values any time any of the observables
     * emits, then either taking that array and passing it as arguments to an option `project` function and emitting the return
     * value of that, or just emitting the array of recent values directly if there is no `project` function.
     * @param {...Observable} observables the observables to combine the source with
     * @param {function} [project] an optional function to project the values from the combined recent values into a new value for emission.
     * @return {Observable} an observable of other projected values from the most recent values from each observable, or an array of each of
     * the most recent values from each observable.
     * @method combineLatest
     * @owner Observable
     */
    export function combineLatest<T, R>(...observables: Array<ObservableInput<any> | Array<ObservableInput<any>> | ((...values: Array<any>) => R)>): Observable<R>;
    export interface CombineLatestSignature<T> {
        <R>(project: (v1: T) => R): Observable<R>;
        <T2, R>(v2: ObservableInput<T2>, project: (v1: T, v2: T2) => R): Observable<R>;
        <T2, T3, R>(v2: ObservableInput<T2>, v3: ObservableInput<T3>, project: (v1: T, v2: T2, v3: T3) => R): Observable<R>;
        <T2, T3, T4, R>(v2: ObservableInput<T2>, v3: ObservableInput<T3>, v4: ObservableInput<T4>, project: (v1: T, v2: T2, v3: T3, v4: T4) => R): Observable<R>;
        <T2, T3, T4, T5, R>(v2: ObservableInput<T2>, v3: ObservableInput<T3>, v4: ObservableInput<T4>, v5: ObservableInput<T5>, project: (v1: T, v2: T2, v3: T3, v4: T4, v5: T5) => R): Observable<R>;
        <T2, T3, T4, T5, T6, R>(v2: ObservableInput<T2>, v3: ObservableInput<T3>, v4: ObservableInput<T4>, v5: ObservableInput<T5>, v6: ObservableInput<T6>, project: (v1: T, v2: T2, v3: T3, v4: T4, v5: T5, v6: T6) => R): Observable<R>;
        <T2>(v2: ObservableInput<T2>): Observable<[T, T2]>;
        <T2, T3>(v2: ObservableInput<T2>, v3: ObservableInput<T3>): Observable<[T, T2, T3]>;
        <T2, T3, T4>(v2: ObservableInput<T2>, v3: ObservableInput<T3>, v4: ObservableInput<T4>): Observable<[T, T2, T3, T4]>;
        <T2, T3, T4, T5>(v2: ObservableInput<T2>, v3: ObservableInput<T3>, v4: ObservableInput<T4>, v5: ObservableInput<T5>): Observable<[T, T2, T3, T4, T5]>;
        <T2, T3, T4, T5, T6>(v2: ObservableInput<T2>, v3: ObservableInput<T3>, v4: ObservableInput<T4>, v5: ObservableInput<T5>, v6: ObservableInput<T6>): Observable<[T, T2, T3, T4, T5, T6]>;
        <R>(...observables: Array<ObservableInput<any> | ((...values: Array<any>) => R)>): Observable<R>;
        <R>(array: ObservableInput<any>[]): Observable<R>;
        <R>(array: ObservableInput<any>[], project: (...values: Array<any>) => R): Observable<R>;
    }
    export function combineLatestStatic<T>(v1: ObservableInput<T>, scheduler?: Scheduler): Observable<[T]>;
    export function combineLatestStatic<T, T2>(v1: ObservableInput<T>, v2: ObservableInput<T2>, scheduler?: Scheduler): Observable<[T, T2]>;
    export function combineLatestStatic<T, T2, T3>(v1: ObservableInput<T>, v2: ObservableInput<T2>, v3: ObservableInput<T3>, scheduler?: Scheduler): Observable<[T, T2, T3]>;
    export function combineLatestStatic<T, T2, T3, T4>(v1: ObservableInput<T>, v2: ObservableInput<T2>, v3: ObservableInput<T3>, v4: ObservableInput<T4>, scheduler?: Scheduler): Observable<[T, T2, T3, T4]>;
    export function combineLatestStatic<T, T2, T3, T4, T5>(v1: ObservableInput<T>, v2: ObservableInput<T2>, v3: ObservableInput<T3>, v4: ObservableInput<T4>, v5: ObservableInput<T5>, scheduler?: Scheduler): Observable<[T, T2, T3, T4, T5]>;
    export function combineLatestStatic<T, T2, T3, T4, T5, T6>(v1: ObservableInput<T>, v2: ObservableInput<T2>, v3: ObservableInput<T3>, v4: ObservableInput<T4>, v5: ObservableInput<T5>, v6: ObservableInput<T6>, scheduler?: Scheduler): Observable<[T, T2, T3, T4, T5, T6]>;
    export function combineLatestStatic<T, R>(v1: ObservableInput<T>, project: (v1: T) => R, scheduler?: Scheduler): Observable<R>;
    export function combineLatestStatic<T, T2, R>(v1: ObservableInput<T>, v2: ObservableInput<T2>, project: (v1: T, v2: T2) => R, scheduler?: Scheduler): Observable<R>;
    export function combineLatestStatic<T, T2, T3, R>(v1: ObservableInput<T>, v2: ObservableInput<T2>, v3: ObservableInput<T3>, project: (v1: T, v2: T2, v3: T3) => R, scheduler?: Scheduler): Observable<R>;
    export function combineLatestStatic<T, T2, T3, T4, R>(v1: ObservableInput<T>, v2: ObservableInput<T2>, v3: ObservableInput<T3>, v4: ObservableInput<T4>, project: (v1: T, v2: T2, v3: T3, v4: T4) => R, scheduler?: Scheduler): Observable<R>;
    export function combineLatestStatic<T, T2, T3, T4, T5, R>(v1: ObservableInput<T>, v2: ObservableInput<T2>, v3: ObservableInput<T3>, v4: ObservableInput<T4>, v5: ObservableInput<T5>, project: (v1: T, v2: T2, v3: T3, v4: T4, v5: T5) => R, scheduler?: Scheduler): Observable<R>;
    export function combineLatestStatic<T, T2, T3, T4, T5, T6, R>(v1: ObservableInput<T>, v2: ObservableInput<T2>, v3: ObservableInput<T3>, v4: ObservableInput<T4>, v5: ObservableInput<T5>, v6: ObservableInput<T6>, project: (v1: T, v2: T2, v3: T3, v4: T4, v5: T5, v6: T6) => R, scheduler?: Scheduler): Observable<R>;
    export function combineLatestStatic<R>(...observables: Array<ObservableInput<any> | ((...values: Array<any>) => R) | Scheduler>): Observable<R>;
    export function combineLatestStatic<R>(array: ObservableInput<any>[], scheduler?: Scheduler): Observable<R>;
    export function combineLatestStatic<R>(array: ObservableInput<any>[], project: (...values: Array<any>) => R, scheduler?: Scheduler): Observable<R>;
    export class CombineLatestOperator<T, R> implements Operator<T, R> {
        private project;
        constructor(project?: (...values: Array<any>) => R);
        call(subscriber: Subscriber<R>): Subscriber<T>;
    }
    export class CombineLatestSubscriber<T, R> extends OuterSubscriber<T, R> {
        private project;
        private active;
        private values;
        private observables;
        private toRespond;
        constructor(destination: Subscriber<R>, project?: (...values: Array<any>) => R);
        protected _next(observable: any): void;
        protected _complete(): void;
        notifyComplete(unused: Subscriber<R>): void;
        notifyNext(outerValue: T, innerValue: R, outerIndex: number, innerIndex: number, innerSub: InnerSubscriber<T, R>): void;
        private _tryProject(values);
    }
}
declare module "rxjs/add/observable/combineLatest" {
    import { combineLatestStatic } from "rxjs/operator/combineLatest";
    module "rxjs/Observable" {
        namespace Observable {
            let combineLatest: typeof combineLatestStatic;
        }
    }
}
declare module "rxjs/operator/mergeAll" {
    import { Observable } from "rxjs/Observable";
    import { Operator } from "rxjs/Operator";
    import { Observer } from "rxjs/Observer";
    import { Subscription } from "rxjs/Subscription";
    import { OuterSubscriber } from "rxjs/OuterSubscriber";
    /**
     * @param concurrent
     * @return {Observable<R>|WebSocketSubject<Observable<any>>|Observable<Observable<any>>}
     * @method mergeAll
     * @owner Observable
     */
    export function mergeAll<T>(concurrent?: number): T;
    export interface MergeAllSignature<T> {
        (): T;
    }
    export class MergeAllOperator<T> implements Operator<Observable<T>, T> {
        private concurrent;
        constructor(concurrent: number);
        call(observer: Observer<T>): MergeAllSubscriber<T>;
    }
    export class MergeAllSubscriber<T> extends OuterSubscriber<Observable<T>, T> {
        private concurrent;
        private hasCompleted;
        private buffer;
        private active;
        constructor(destination: Observer<T>, concurrent: number);
        protected _next(observable: Observable<T>): void;
        protected _complete(): void;
        notifyComplete(innerSub: Subscription): void;
    }
}
declare module "rxjs/operator/concat" {
    import { Observable, ObservableInput } from "rxjs/Observable";
    import { Scheduler } from "rxjs/Scheduler";
    /**
     * Joins this observable with multiple other observables by subscribing to them one at a time, starting with the source,
     * and merging their results into the returned observable. Will wait for each observable to complete before moving
     * on to the next.
     * @params {...Observable} the observables to concatenate
     * @params {Scheduler} [scheduler] an optional scheduler to schedule each observable subscription on.
     * @return {Observable} All values of each passed observable merged into a single observable, in order, in serial fashion.
     * @method concat
     * @owner Observable
     */
    export function concat<T, R>(...observables: Array<ObservableInput<any> | Scheduler>): Observable<R>;
    export interface ConcatSignature<T> {
        (scheduler?: Scheduler): Observable<T>;
        <T2>(v2: ObservableInput<T2>, scheduler?: Scheduler): Observable<T | T2>;
        <T2, T3>(v2: ObservableInput<T2>, v3: ObservableInput<T3>, scheduler?: Scheduler): Observable<T | T2 | T3>;
        <T2, T3, T4>(v2: ObservableInput<T2>, v3: ObservableInput<T3>, v4: ObservableInput<T4>, scheduler?: Scheduler): Observable<T | T2 | T3 | T4>;
        <T2, T3, T4, T5>(v2: ObservableInput<T2>, v3: ObservableInput<T3>, v4: ObservableInput<T4>, v5: ObservableInput<T5>, scheduler?: Scheduler): Observable<T | T2 | T3 | T4 | T5>;
        <T2, T3, T4, T5, T6>(v2: ObservableInput<T2>, v3: ObservableInput<T3>, v4: ObservableInput<T4>, v5: ObservableInput<T5>, v6: ObservableInput<T6>, scheduler?: Scheduler): Observable<T | T2 | T3 | T4 | T5 | T6>;
        (...observables: Array<ObservableInput<T> | Scheduler>): Observable<T>;
        <R>(...observables: Array<ObservableInput<any> | Scheduler>): Observable<R>;
    }
    /**
     * Joins multiple observables together by subscribing to them one at a time and merging their results
     * into the returned observable. Will wait for each observable to complete before moving on to the next.
     * @params {...Observable} the observables to concatenate
     * @params {Scheduler} [scheduler] an optional scheduler to schedule each observable subscription on.
     * @return {Observable} All values of each passed observable merged into a single observable, in order, in serial fashion.
     * @static true
     * @name concat
     * @owner Observable
     */
    export function concatStatic<T>(v1: ObservableInput<T>, scheduler?: Scheduler): Observable<T>;
    export function concatStatic<T, T2>(v1: ObservableInput<T>, v2: ObservableInput<T2>, scheduler?: Scheduler): Observable<T | T2>;
    export function concatStatic<T, T2, T3>(v1: ObservableInput<T>, v2: ObservableInput<T2>, v3: ObservableInput<T3>, scheduler?: Scheduler): Observable<T | T2 | T3>;
    export function concatStatic<T, T2, T3, T4>(v1: ObservableInput<T>, v2: ObservableInput<T2>, v3: ObservableInput<T3>, v4: ObservableInput<T4>, scheduler?: Scheduler): Observable<T | T2 | T3 | T4>;
    export function concatStatic<T, T2, T3, T4, T5>(v1: ObservableInput<T>, v2: ObservableInput<T2>, v3: ObservableInput<T3>, v4: ObservableInput<T4>, v5: ObservableInput<T5>, scheduler?: Scheduler): Observable<T | T2 | T3 | T4 | T5>;
    export function concatStatic<T, T2, T3, T4, T5, T6>(v1: ObservableInput<T>, v2: ObservableInput<T2>, v3: ObservableInput<T3>, v4: ObservableInput<T4>, v5: ObservableInput<T5>, v6: ObservableInput<T6>, scheduler?: Scheduler): Observable<T | T2 | T3 | T4 | T5 | T6>;
    export function concatStatic<T>(...observables: (ObservableInput<T> | Scheduler)[]): Observable<T>;
    export function concatStatic<T, R>(...observables: (ObservableInput<any> | Scheduler)[]): Observable<R>;
}
declare module "rxjs/add/observable/concat" {
    import { concatStatic } from "rxjs/operator/concat";
    module "rxjs/Observable" {
        namespace Observable {
            let concat: typeof concatStatic;
        }
    }
}
declare module "rxjs/observable/DeferObservable" {
    import { Observable, SubscribableOrPromise } from "rxjs/Observable";
    import { Subscriber } from "rxjs/Subscriber";
    import { Subscription } from "rxjs/Subscription";
    /**
     * We need this JSDoc comment for affecting ESDoc.
     * @extends {Ignored}
     * @hide true
     */
    export class DeferObservable<T> extends Observable<T> {
        private observableFactory;
        /**
         * @param observableFactory
         * @return {DeferObservable}
         * @static true
         * @name defer
         * @owner Observable
         */
        static create<T>(observableFactory: () => SubscribableOrPromise<T> | void): Observable<T>;
        constructor(observableFactory: () => SubscribableOrPromise<T> | void);
        protected _subscribe(subscriber: Subscriber<T>): Subscription;
    }
}
declare module "rxjs/add/observable/defer" {
    import { DeferObservable } from "rxjs/observable/DeferObservable";
    module "rxjs/Observable" {
        namespace Observable {
            let defer: typeof DeferObservable.create;
        }
    }
}
declare module "rxjs/add/observable/empty" {
    import { EmptyObservable } from "rxjs/observable/EmptyObservable";
    module "rxjs/Observable" {
        namespace Observable {
            let empty: typeof EmptyObservable.create;
        }
    }
}
declare module "rxjs/observable/PromiseObservable" {
    import { Scheduler } from "rxjs/Scheduler";
    import { Observable } from "rxjs/Observable";
    import { Subscriber } from "rxjs/Subscriber";
    import { Subscription } from "rxjs/Subscription";
    /**
     * We need this JSDoc comment for affecting ESDoc.
     * @extends {Ignored}
     * @hide true
     */
    export class PromiseObservable<T> extends Observable<T> {
        private promise;
        scheduler: Scheduler;
        value: T;
        /**
         * @param promise
         * @param scheduler
         * @return {PromiseObservable}
         * @static true
         * @name fromPromise
         * @owner Observable
         */
        static create<T>(promise: Promise<T>, scheduler?: Scheduler): Observable<T>;
        constructor(promise: Promise<T>, scheduler?: Scheduler);
        protected _subscribe(subscriber: Subscriber<T>): Subscription | Function | void;
    }
}
declare module "rxjs/observable/ForkJoinObservable" {
    import { Observable } from "rxjs/Observable";
    import { Subscriber } from "rxjs/Subscriber";
    /**
     * We need this JSDoc comment for affecting ESDoc.
     * @extends {Ignored}
     * @hide true
     */
    export class ForkJoinObservable<T> extends Observable<T> {
        private sources;
        private resultSelector;
        constructor(sources: Array<Observable<any> | Promise<any>>, resultSelector?: (...values: Array<any>) => T);
        /**
         * @param sources
         * @return {any}
         * @static true
         * @name forkJoin
         * @owner Observable
         */
        static create<T>(...sources: Array<Observable<any> | Promise<any> | Array<Observable<any>> | ((...values: Array<any>) => any)>): Observable<T>;
        protected _subscribe(subscriber: Subscriber<any>): void;
    }
}
declare module "rxjs/add/observable/forkJoin" {
    import { ForkJoinObservable } from "rxjs/observable/ForkJoinObservable";
    module "rxjs/Observable" {
        namespace Observable {
            let forkJoin: typeof ForkJoinObservable.create;
        }
    }
}
declare module "rxjs/observable/IteratorObservable" {
    import { Scheduler } from "rxjs/Scheduler";
    import { Observable } from "rxjs/Observable";
    import { Subscription } from "rxjs/Subscription";
    import { Subscriber } from "rxjs/Subscriber";
    /**
     * We need this JSDoc comment for affecting ESDoc.
     * @extends {Ignored}
     * @hide true
     */
    export class IteratorObservable<T> extends Observable<T> {
        private iterator;
        static create<T>(iterator: any, project?: ((x?: any, i?: number) => T) | any, thisArg?: any | Scheduler, scheduler?: Scheduler): IteratorObservable<{}>;
        static dispatch(state: any): void;
        private thisArg;
        private project;
        private scheduler;
        constructor(iterator: any, project?: ((x?: any, i?: number) => T) | any, thisArg?: any | Scheduler, scheduler?: Scheduler);
        protected _subscribe(subscriber: Subscriber<T>): Subscription | Function | void;
    }
}
declare module "rxjs/observable/ArrayLikeObservable" {
    import { Scheduler } from "rxjs/Scheduler";
    import { Observable } from "rxjs/Observable";
    import { Subscriber } from "rxjs/Subscriber";
    import { Subscription } from "rxjs/Subscription";
    /**
     * We need this JSDoc comment for affecting ESDoc.
     * @extends {Ignored}
     * @hide true
     */
    export class ArrayLikeObservable<T> extends Observable<T> {
        private arrayLike;
        private scheduler;
        private mapFn;
        static create<T>(arrayLike: ArrayLike<T>, mapFn: (x: T, y: number) => T, thisArg: any, scheduler?: Scheduler): Observable<T>;
        static dispatch(state: any): void;
        private value;
        constructor(arrayLike: ArrayLike<T>, mapFn: (x: T, y: number) => T, thisArg: any, scheduler?: Scheduler);
        protected _subscribe(subscriber: Subscriber<T>): Subscription | Function | void;
    }
}
declare module "rxjs/operator/observeOn" {
    import { Observable } from "rxjs/Observable";
    import { Scheduler } from "rxjs/Scheduler";
    import { Operator } from "rxjs/Operator";
    import { Subscriber } from "rxjs/Subscriber";
    /**
     * @param scheduler
     * @param delay
     * @return {Observable<R>|WebSocketSubject<T>|Observable<T>}
     * @method observeOn
     * @owner Observable
     */
    export function observeOn<T>(scheduler: Scheduler, delay?: number): Observable<T>;
    export interface ObserveOnSignature<T> {
        (scheduler: Scheduler, delay?: number): Observable<T>;
    }
    export class ObserveOnOperator<T> implements Operator<T, T> {
        private scheduler;
        private delay;
        constructor(scheduler: Scheduler, delay?: number);
        call(subscriber: Subscriber<T>): Subscriber<T>;
    }
    export class ObserveOnSubscriber<T> extends Subscriber<T> {
        private scheduler;
        private delay;
        static dispatch({notification, destination}: {
            notification: any;
            destination: any;
        }): void;
        constructor(destination: Subscriber<T>, scheduler: Scheduler, delay?: number);
        private scheduleMessage(notification);
        protected _next(value: T): void;
        protected _error(err: any): void;
        protected _complete(): void;
    }
}
declare module "rxjs/observable/FromObservable" {
    import { Scheduler } from "rxjs/Scheduler";
    import { Observable, ObservableInput } from "rxjs/Observable";
    import { Subscriber } from "rxjs/Subscriber";
    /**
     * We need this JSDoc comment for affecting ESDoc.
     * @extends {Ignored}
     * @hide true
     */
    export class FromObservable<T> extends Observable<T> {
        private ish;
        private scheduler;
        constructor(ish: ObservableInput<T>, scheduler: Scheduler);
        /**
         * @param ish
         * @param mapFnOrScheduler
         * @param thisArg
         * @param lastScheduler
         * @return {any}
         * @static true
         * @name from
         * @owner Observable
         */
        static create<T>(ish: any, mapFnOrScheduler?: Scheduler | ((x: any, y: number) => T), thisArg?: any, lastScheduler?: Scheduler): Observable<T>;
        protected _subscribe(subscriber: Subscriber<T>): any;
    }
}
declare module "rxjs/add/observable/from" {
    import { FromObservable } from "rxjs/observable/FromObservable";
    module "rxjs/Observable" {
        namespace Observable {
            let from: typeof FromObservable.create;
        }
    }
}
declare module "rxjs/add/observable/of" {
    import { ArrayObservable } from "rxjs/observable/ArrayObservable";
    module "rxjs/Observable" {
        namespace Observable {
            let of: typeof ArrayObservable.of;
        }
    }
}
declare module "rxjs/add/observable/fromArray" {
    import { ArrayObservable } from "rxjs/observable/ArrayObservable";
    import "rxjs/add/observable/of";
    module "rxjs/Observable" {
        namespace Observable {
            let fromArray: typeof ArrayObservable.create;
        }
    }
}
declare module "rxjs/observable/FromEventObservable" {
    import { Observable } from "rxjs/Observable";
    import { Subscriber } from "rxjs/Subscriber";
    export type NodeStyleEventEmmitter = {
        addListener: (eventName: string, handler: Function) => void;
        removeListener: (eventName: string, handler: Function) => void;
    };
    export type JQueryStyleEventEmitter = {
        on: (eventName: string, handler: Function) => void;
        off: (eventName: string, handler: Function) => void;
    };
    export type EventTargetLike = EventTarget | NodeStyleEventEmmitter | JQueryStyleEventEmitter | NodeList | HTMLCollection;
    /**
     * We need this JSDoc comment for affecting ESDoc.
     * @extends {Ignored}
     * @hide true
     */
    export class FromEventObservable<T, R> extends Observable<T> {
        private sourceObj;
        private eventName;
        private selector;
        /**
         * @param sourceObj
         * @param eventName
         * @param selector
         * @return {FromEventObservable}
         * @static true
         * @name fromEvent
         * @owner Observable
         */
        static create<T>(sourceObj: EventTargetLike, eventName: string, selector?: (...args: Array<any>) => T): Observable<T>;
        constructor(sourceObj: EventTargetLike, eventName: string, selector?: (...args: Array<any>) => T);
        private static setupSubscription<T>(sourceObj, eventName, handler, subscriber);
        protected _subscribe(subscriber: Subscriber<T>): void;
    }
}
declare module "rxjs/add/observable/fromEvent" {
    import { FromEventObservable } from "rxjs/observable/FromEventObservable";
    module "rxjs/Observable" {
        namespace Observable {
            let fromEvent: typeof FromEventObservable.create;
        }
    }
}
declare module "rxjs/observable/FromEventPatternObservable" {
    import { Observable } from "rxjs/Observable";
    import { Subscriber } from "rxjs/Subscriber";
    /**
     * We need this JSDoc comment for affecting ESDoc.
     * @extends {Ignored}
     * @hide true
     */
    export class FromEventPatternObservable<T, R> extends Observable<T> {
        private addHandler;
        private removeHandler;
        private selector;
        /**
         * @param addHandler
         * @param removeHandler
         * @param selector
         * @return {FromEventPatternObservable}
         * @static true
         * @name fromEventPattern
         * @owner Observable
         */
        static create<T>(addHandler: (handler: Function) => any, removeHandler: (handler: Function) => void, selector?: (...args: Array<any>) => T): FromEventPatternObservable<T, {}>;
        constructor(addHandler: (handler: Function) => any, removeHandler: (handler: Function) => void, selector?: (...args: Array<any>) => T);
        protected _subscribe(subscriber: Subscriber<T>): void;
    }
}
declare module "rxjs/add/observable/fromEventPattern" {
    import { FromEventPatternObservable } from "rxjs/observable/FromEventPatternObservable";
    module "rxjs/Observable" {
        namespace Observable {
            let fromEventPattern: typeof FromEventPatternObservable.create;
        }
    }
}
declare module "rxjs/add/observable/fromPromise" {
    import { PromiseObservable } from "rxjs/observable/PromiseObservable";
    module "rxjs/Observable" {
        namespace Observable {
            let fromPromise: typeof PromiseObservable.create;
        }
    }
}
declare module "rxjs/util/isNumeric" {
    export function isNumeric(val: any): val is number;
}
declare module "rxjs/scheduler/FutureAction" {
    import { Action } from "rxjs/scheduler/Action";
    import { Scheduler } from "rxjs/Scheduler";
    import { Subscription } from "rxjs/Subscription";
    export class FutureAction<T> extends Subscription implements Action {
        scheduler: Scheduler;
        work: (x?: T) => Subscription | void;
        id: number;
        state: T;
        delay: number;
        error: any;
        private pending;
        constructor(scheduler: Scheduler, work: (x?: T) => Subscription | void);
        execute(): void;
        schedule(state?: T, delay?: number): Action;
        protected _schedule(state?: T, delay?: number): Action;
        protected _unsubscribe(): void;
    }
}
declare module "rxjs/scheduler/QueueAction" {
    import { Action } from "rxjs/scheduler/Action";
    import { FutureAction } from "rxjs/scheduler/FutureAction";
    export class QueueAction<T> extends FutureAction<T> {
        protected _schedule(state?: T, delay?: number): Action;
    }
}
declare module "rxjs/scheduler/QueueScheduler" {
    import { Scheduler } from "rxjs/Scheduler";
    import { QueueAction } from "rxjs/scheduler/QueueAction";
    import { Subscription } from "rxjs/Subscription";
    import { Action } from "rxjs/scheduler/Action";
    export class QueueScheduler implements Scheduler {
        active: boolean;
        actions: QueueAction<any>[];
        scheduledId: number;
        now(): number;
        flush(): void;
        schedule<T>(work: (x?: T) => Subscription | void, delay?: number, state?: T): Subscription;
        scheduleNow<T>(work: (x?: T) => Subscription | void, state?: T): Action;
        scheduleLater<T>(work: (x?: T) => Subscription | void, delay: number, state?: T): Action;
    }
}
declare module "rxjs/scheduler/AsyncScheduler" {
    import { Action } from "rxjs/scheduler/Action";
    import { Subscription } from "rxjs/Subscription";
    import { QueueScheduler } from "rxjs/scheduler/QueueScheduler";
    export class AsyncScheduler extends QueueScheduler {
        scheduleNow<T>(work: (x?: any) => Subscription, state?: any): Action;
    }
}
declare module "rxjs/scheduler/async" {
    import { AsyncScheduler } from "rxjs/scheduler/AsyncScheduler";
    export const async: AsyncScheduler;
}
declare module "rxjs/observable/IntervalObservable" {
    import { Subscriber } from "rxjs/Subscriber";
    import { Scheduler } from "rxjs/Scheduler";
    import { Observable } from "rxjs/Observable";
    /**
     * We need this JSDoc comment for affecting ESDoc.
     * @extends {Ignored}
     * @hide true
     */
    export class IntervalObservable extends Observable<number> {
        private period;
        private scheduler;
        /**
         * @param period
         * @param scheduler
         * @return {IntervalObservable}
         * @static true
         * @name interval
         * @owner Observable
         */
        static create(period?: number, scheduler?: Scheduler): Observable<number>;
        static dispatch(state: any): void;
        constructor(period?: number, scheduler?: Scheduler);
        protected _subscribe(subscriber: Subscriber<number>): void;
    }
}
declare module "rxjs/add/observable/interval" {
    import { IntervalObservable } from "rxjs/observable/IntervalObservable";
    module "rxjs/Observable" {
        namespace Observable {
            let interval: typeof IntervalObservable.create;
        }
    }
}
declare module "rxjs/operator/merge" {
    import { Observable, ObservableInput } from "rxjs/Observable";
    import { Scheduler } from "rxjs/Scheduler";
    /**
     * Creates a result Observable which emits values from every given input Observable.
     *
     * <img src="./img/merge.png" width="100%">
     *
     * @param {Observable} input Observables
     * @return {Observable} an Observable that emits items that are the result of every input Observable.
     * @method merge
     * @owner Observable
     */
    export function merge<T, R>(...observables: Array<ObservableInput<any> | Scheduler | number>): Observable<R>;
    export interface MergeSignature<T> {
        (scheduler?: Scheduler): Observable<T>;
        (concurrent?: number, scheduler?: Scheduler): Observable<T>;
        <T2>(v2: ObservableInput<T2>, scheduler?: Scheduler): Observable<T | T2>;
        <T2>(v2: ObservableInput<T2>, concurrent?: number, scheduler?: Scheduler): Observable<T | T2>;
        <T2, T3>(v2: ObservableInput<T2>, v3: ObservableInput<T3>, scheduler?: Scheduler): Observable<T | T2 | T3>;
        <T2, T3>(v2: ObservableInput<T2>, v3: ObservableInput<T3>, concurrent?: number, scheduler?: Scheduler): Observable<T | T2 | T3>;
        <T2, T3, T4>(v2: ObservableInput<T2>, v3: ObservableInput<T3>, v4: ObservableInput<T4>, scheduler?: Scheduler): Observable<T | T2 | T3 | T4>;
        <T2, T3, T4>(v2: ObservableInput<T2>, v3: ObservableInput<T3>, v4: ObservableInput<T4>, concurrent?: number, scheduler?: Scheduler): Observable<T | T2 | T3 | T4>;
        <T2, T3, T4, T5>(v2: ObservableInput<T2>, v3: ObservableInput<T3>, v4: ObservableInput<T4>, v5: ObservableInput<T5>, scheduler?: Scheduler): Observable<T | T2 | T3 | T4 | T5>;
        <T2, T3, T4, T5>(v2: ObservableInput<T2>, v3: ObservableInput<T3>, v4: ObservableInput<T4>, v5: ObservableInput<T5>, concurrent?: number, scheduler?: Scheduler): Observable<T | T2 | T3 | T4 | T5>;
        <T2, T3, T4, T5, T6>(v2: ObservableInput<T2>, v3: ObservableInput<T3>, v4: ObservableInput<T4>, v5: ObservableInput<T5>, v6: ObservableInput<T6>, scheduler?: Scheduler): Observable<T | T2 | T3 | T4 | T5 | T6>;
        <T2, T3, T4, T5, T6>(v2: ObservableInput<T2>, v3: ObservableInput<T3>, v4: ObservableInput<T4>, v5: ObservableInput<T5>, v6: ObservableInput<T6>, concurrent?: number, scheduler?: Scheduler): Observable<T | T2 | T3 | T4 | T5 | T6>;
        (...observables: Array<ObservableInput<T> | Scheduler | number>): Observable<T>;
        <R>(...observables: Array<ObservableInput<any> | Scheduler | number>): Observable<R>;
    }
    export function mergeStatic<T>(v1: ObservableInput<T>, scheduler?: Scheduler): Observable<T>;
    export function mergeStatic<T>(v1: ObservableInput<T>, concurrent?: number, scheduler?: Scheduler): Observable<T>;
    export function mergeStatic<T, T2>(v1: ObservableInput<T>, v2: ObservableInput<T2>, scheduler?: Scheduler): Observable<T | T2>;
    export function mergeStatic<T, T2>(v1: ObservableInput<T>, v2: ObservableInput<T2>, concurrent?: number, scheduler?: Scheduler): Observable<T | T2>;
    export function mergeStatic<T, T2, T3>(v1: ObservableInput<T>, v2: ObservableInput<T2>, v3: ObservableInput<T3>, scheduler?: Scheduler): Observable<T | T2 | T3>;
    export function mergeStatic<T, T2, T3>(v1: ObservableInput<T>, v2: ObservableInput<T2>, v3: ObservableInput<T3>, concurrent?: number, scheduler?: Scheduler): Observable<T | T2 | T3>;
    export function mergeStatic<T, T2, T3, T4>(v1: ObservableInput<T>, v2: ObservableInput<T2>, v3: ObservableInput<T3>, v4: ObservableInput<T4>, scheduler?: Scheduler): Observable<T | T2 | T3 | T4>;
    export function mergeStatic<T, T2, T3, T4>(v1: ObservableInput<T>, v2: ObservableInput<T2>, v3: ObservableInput<T3>, v4: ObservableInput<T4>, concurrent?: number, scheduler?: Scheduler): Observable<T | T2 | T3 | T4>;
    export function mergeStatic<T, T2, T3, T4, T5>(v1: ObservableInput<T>, v2: ObservableInput<T2>, v3: ObservableInput<T3>, v4: ObservableInput<T4>, v5: ObservableInput<T5>, scheduler?: Scheduler): Observable<T | T2 | T3 | T4 | T5>;
    export function mergeStatic<T, T2, T3, T4, T5>(v1: ObservableInput<T>, v2: ObservableInput<T2>, v3: ObservableInput<T3>, v4: ObservableInput<T4>, v5: ObservableInput<T5>, concurrent?: number, scheduler?: Scheduler): Observable<T | T2 | T3 | T4 | T5>;
    export function mergeStatic<T, T2, T3, T4, T5, T6>(v1: ObservableInput<T>, v2: ObservableInput<T2>, v3: ObservableInput<T3>, v4: ObservableInput<T4>, v5: ObservableInput<T5>, v6: ObservableInput<T6>, scheduler?: Scheduler): Observable<T | T2 | T3 | T4 | T5 | T6>;
    export function mergeStatic<T, T2, T3, T4, T5, T6>(v1: ObservableInput<T>, v2: ObservableInput<T2>, v3: ObservableInput<T3>, v4: ObservableInput<T4>, v5: ObservableInput<T5>, v6: ObservableInput<T6>, concurrent?: number, scheduler?: Scheduler): Observable<T | T2 | T3 | T4 | T5 | T6>;
    export function mergeStatic<T>(...observables: (ObservableInput<T> | Scheduler | number)[]): Observable<T>;
    export function mergeStatic<T, R>(...observables: (ObservableInput<any> | Scheduler | number)[]): Observable<R>;
}
declare module "rxjs/add/observable/merge" {
    import { mergeStatic } from "rxjs/operator/merge";
    module "rxjs/Observable" {
        namespace Observable {
            let merge: typeof mergeStatic;
        }
    }
}
declare module "rxjs/operator/race" {
    import { Observable } from "rxjs/Observable";
    import { Operator } from "rxjs/Operator";
    import { Subscriber } from "rxjs/Subscriber";
    import { OuterSubscriber } from "rxjs/OuterSubscriber";
    import { InnerSubscriber } from "rxjs/InnerSubscriber";
    /**
     * Returns an Observable that mirrors the first source Observable to emit an item
     * from the combination of this Observable and supplied Observables
     * @param {...Observables} ...observables sources used to race for which Observable emits first.
     * @return {Observable} an Observable that mirrors the output of the first Observable to emit an item.
     * @method race
     * @owner Observable
     */
    export function race<T>(...observables: Array<Observable<T> | Array<Observable<T>>>): Observable<T>;
    export interface RaceSignature<T> {
        (...observables: Array<Observable<T> | Array<Observable<T>>>): Observable<T>;
        <R>(...observables: Array<Observable<any> | Array<Observable<T>>>): Observable<R>;
    }
    /**
     * Returns an Observable that mirrors the first source Observable to emit an item.
     * @param {...Observables} ...observables sources used to race for which Observable emits first.
     * @return {Observable} an Observable that mirrors the output of the first Observable to emit an item.
     * @static true
     * @name race
     * @owner Observable
     */
    export function raceStatic<T>(...observables: Array<Observable<T> | Array<Observable<T>>>): Observable<T>;
    export class RaceOperator<T> implements Operator<T, T> {
        call(subscriber: Subscriber<T>): Subscriber<T>;
    }
    export class RaceSubscriber<T> extends OuterSubscriber<T, T> {
        private hasFirst;
        private observables;
        private subscriptions;
        constructor(destination: Subscriber<T>);
        protected _next(observable: any): void;
        protected _complete(): void;
        notifyNext(outerValue: T, innerValue: T, outerIndex: number, innerIndex: number, innerSub: InnerSubscriber<T, T>): void;
    }
}
declare module "rxjs/add/observable/race" {
    import { raceStatic } from "rxjs/operator/race";
    module "rxjs/Observable" {
        namespace Observable {
            let race: typeof raceStatic;
        }
    }
}
declare module "rxjs/util/noop" {
    export function noop(): void;
}
declare module "rxjs/observable/NeverObservable" {
    import { Observable } from "rxjs/Observable";
    import { Subscriber } from "rxjs/Subscriber";
    /**
     * We need this JSDoc comment for affecting ESDoc.
     * @extends {Ignored}
     * @hide true
     */
    export class NeverObservable<T> extends Observable<T> {
        /**
         * @return {NeverObservable<T>}
         * @static true
         * @name never
         * @owner Observable
         */
        static create<T>(): NeverObservable<T>;
        constructor();
        protected _subscribe(subscriber: Subscriber<T>): void;
    }
}
declare module "rxjs/add/observable/never" {
    import { NeverObservable } from "rxjs/observable/NeverObservable";
    module "rxjs/Observable" {
        namespace Observable {
            let never: typeof NeverObservable.create;
        }
    }
}
declare module "rxjs/observable/RangeObservable" {
    import { Scheduler } from "rxjs/Scheduler";
    import { Observable } from "rxjs/Observable";
    import { Subscription } from "rxjs/Subscription";
    import { Subscriber } from "rxjs/Subscriber";
    /**
     * We need this JSDoc comment for affecting ESDoc.
     * @extends {Ignored}
     * @hide true
     */
    export class RangeObservable extends Observable<number> {
        /**
         * @param start
         * @param end
         * @param scheduler
         * @return {RangeObservable}
         * @static true
         * @name range
         * @owner Observable
         */
        static create(start?: number, end?: number, scheduler?: Scheduler): Observable<number>;
        static dispatch(state: any): void;
        private start;
        private end;
        private scheduler;
        constructor(start: number, end: number, scheduler?: Scheduler);
        protected _subscribe(subscriber: Subscriber<number>): Subscription | Function | void;
    }
}
declare module "rxjs/add/observable/range" {
    import { RangeObservable } from "rxjs/observable/RangeObservable";
    module "rxjs/Observable" {
        namespace Observable {
            let range: typeof RangeObservable.create;
        }
    }
}
declare module "rxjs/add/observable/throw" {
}
declare module "rxjs/util/isDate" {
    export function isDate(value: any): value is Date;
}
declare module "rxjs/observable/TimerObservable" {
    import { Scheduler } from "rxjs/Scheduler";
    import { Observable } from "rxjs/Observable";
    import { Subscription } from "rxjs/Subscription";
    import { Subscriber } from "rxjs/Subscriber";
    /**
     * We need this JSDoc comment for affecting ESDoc.
     * @extends {Ignored}
     * @hide true
     */
    export class TimerObservable extends Observable<number> {
        /**
         * @param dueTime
         * @param period
         * @param scheduler
         * @return {TimerObservable}
         * @static true
         * @name timer
         * @owner Observable
         */
        static create(dueTime?: number | Date, period?: number | Scheduler, scheduler?: Scheduler): Observable<number>;
        static dispatch(state: any): any;
        private period;
        private dueTime;
        private scheduler;
        constructor(dueTime?: number | Date, period?: number | Scheduler, scheduler?: Scheduler);
        protected _subscribe(subscriber: Subscriber<number>): Subscription | Function | void;
    }
}
declare module "rxjs/add/observable/timer" {
    import { TimerObservable } from "rxjs/observable/TimerObservable";
    module "rxjs/Observable" {
        namespace Observable {
            let timer: typeof TimerObservable.create;
        }
    }
}
declare module "rxjs/operator/zip" {
    import { Observable, ObservableInput } from "rxjs/Observable";
    import { Operator } from "rxjs/Operator";
    import { Subscriber } from "rxjs/Subscriber";
    /**
     * @param observables
     * @return {Observable<R>}
     * @method zip
     * @owner Observable
     */
    export function zipProto<R>(...observables: Array<ObservableInput<any> | ((...values: Array<any>) => R)>): Observable<R>;
    export interface ZipSignature<T> {
        <R>(project: (v1: T) => R): Observable<R>;
        <T2, R>(v2: ObservableInput<T2>, project: (v1: T, v2: T2) => R): Observable<R>;
        <T2, T3, R>(v2: ObservableInput<T2>, v3: ObservableInput<T3>, project: (v1: T, v2: T2, v3: T3) => R): Observable<R>;
        <T2, T3, T4, R>(v2: ObservableInput<T2>, v3: ObservableInput<T3>, v4: ObservableInput<T4>, project: (v1: T, v2: T2, v3: T3, v4: T4) => R): Observable<R>;
        <T2, T3, T4, T5, R>(v2: ObservableInput<T2>, v3: ObservableInput<T3>, v4: ObservableInput<T4>, v5: ObservableInput<T5>, project: (v1: T, v2: T2, v3: T3, v4: T4, v5: T5) => R): Observable<R>;
        <T2, T3, T4, T5, T6, R>(v2: ObservableInput<T2>, v3: ObservableInput<T3>, v4: ObservableInput<T4>, v5: ObservableInput<T5>, v6: ObservableInput<T6>, project: (v1: T, v2: T2, v3: T3, v4: T4, v5: T5, v6: T6) => R): Observable<R>;
        <T2>(v2: ObservableInput<T2>): Observable<[T, T2]>;
        <T2, T3>(v2: ObservableInput<T2>, v3: ObservableInput<T3>): Observable<[T, T2, T3]>;
        <T2, T3, T4>(v2: ObservableInput<T2>, v3: ObservableInput<T3>, v4: ObservableInput<T4>): Observable<[T, T2, T3, T4]>;
        <T2, T3, T4, T5>(v2: ObservableInput<T2>, v3: ObservableInput<T3>, v4: ObservableInput<T4>, v5: ObservableInput<T5>): Observable<[T, T2, T3, T4, T5]>;
        <T2, T3, T4, T5, T6>(v2: ObservableInput<T2>, v3: ObservableInput<T3>, v4: ObservableInput<T4>, v5: ObservableInput<T5>, v6: ObservableInput<T6>): Observable<[T, T2, T3, T4, T5, T6]>;
        <R>(...observables: Array<ObservableInput<any> | ((...values: Array<any>) => R)>): Observable<R>;
        <R>(array: ObservableInput<any>[]): Observable<R>;
        <R>(array: ObservableInput<any>[], project: (...values: Array<any>) => R): Observable<R>;
    }
    export function zipStatic<T>(v1: ObservableInput<T>): Observable<[T]>;
    export function zipStatic<T, T2>(v1: ObservableInput<T>, v2: ObservableInput<T2>): Observable<[T, T2]>;
    export function zipStatic<T, T2, T3>(v1: ObservableInput<T>, v2: ObservableInput<T2>, v3: ObservableInput<T3>): Observable<[T, T2, T3]>;
    export function zipStatic<T, T2, T3, T4>(v1: ObservableInput<T>, v2: ObservableInput<T2>, v3: ObservableInput<T3>, v4: ObservableInput<T4>): Observable<[T, T2, T3, T4]>;
    export function zipStatic<T, T2, T3, T4, T5>(v1: ObservableInput<T>, v2: ObservableInput<T2>, v3: ObservableInput<T3>, v4: ObservableInput<T4>, v5: ObservableInput<T5>): Observable<[T, T2, T3, T4, T5]>;
    export function zipStatic<T, T2, T3, T4, T5, T6>(v1: ObservableInput<T>, v2: ObservableInput<T2>, v3: ObservableInput<T3>, v4: ObservableInput<T4>, v5: ObservableInput<T5>, v6: ObservableInput<T6>): Observable<[T, T2, T3, T4, T5, T6]>;
    export function zipStatic<T, R>(v1: ObservableInput<T>, project: (v1: T) => R): Observable<R>;
    export function zipStatic<T, T2, R>(v1: ObservableInput<T>, v2: ObservableInput<T2>, project: (v1: T, v2: T2) => R): Observable<R>;
    export function zipStatic<T, T2, T3, R>(v1: ObservableInput<T>, v2: ObservableInput<T2>, v3: ObservableInput<T3>, project: (v1: T, v2: T2, v3: T3) => R): Observable<R>;
    export function zipStatic<T, T2, T3, T4, R>(v1: ObservableInput<T>, v2: ObservableInput<T2>, v3: ObservableInput<T3>, v4: ObservableInput<T4>, project: (v1: T, v2: T2, v3: T3, v4: T4) => R): Observable<R>;
    export function zipStatic<T, T2, T3, T4, T5, R>(v1: ObservableInput<T>, v2: ObservableInput<T2>, v3: ObservableInput<T3>, v4: ObservableInput<T4>, v5: ObservableInput<T5>, project: (v1: T, v2: T2, v3: T3, v4: T4, v5: T5) => R): Observable<R>;
    export function zipStatic<T, T2, T3, T4, T5, T6, R>(v1: ObservableInput<T>, v2: ObservableInput<T2>, v3: ObservableInput<T3>, v4: ObservableInput<T4>, v5: ObservableInput<T5>, v6: ObservableInput<T6>, project: (v1: T, v2: T2, v3: T3, v4: T4, v5: T5, v6: T6) => R): Observable<R>;
    export function zipStatic<R>(...observables: Array<ObservableInput<any> | ((...values: Array<any>) => R)>): Observable<R>;
    export function zipStatic<R>(array: ObservableInput<any>[]): Observable<R>;
    export function zipStatic<R>(array: ObservableInput<any>[], project: (...values: Array<any>) => R): Observable<R>;
    export class ZipOperator<T, R> implements Operator<T, R> {
        project: (...values: Array<any>) => R;
        constructor(project?: (...values: Array<any>) => R);
        call(subscriber: Subscriber<R>): Subscriber<T>;
    }
    export class ZipSubscriber<T, R> extends Subscriber<T> {
        private index;
        private values;
        private project;
        private iterators;
        private active;
        constructor(destination: Subscriber<R>, project?: (...values: Array<any>) => R, values?: any);
        protected _next(value: any): void;
        protected _complete(): void;
        notifyInactive(): void;
        checkIterators(): void;
        protected _tryProject(args: any[]): void;
    }
}
declare module "rxjs/add/observable/zip" {
    import { zipStatic } from "rxjs/operator/zip";
    module "rxjs/Observable" {
        namespace Observable {
            let zip: typeof zipStatic;
        }
    }
}
declare module "rxjs/operator/buffer" {
    import { Observable } from "rxjs/Observable";
    /**
     * Buffers the source Observable values until `closingNotifier` emits.
     *
     * <span class="informal">Collects values from the past as an array, and emits
     * that array only when another Observable emits.</span>
     *
     * <img src="./img/buffer.png" width="100%">
     *
     * Buffers the incoming Observable values until the given `closingNotifier`
     * Observable emits a value, at which point it emits the buffer on the output
     * Observable and starts a new buffer internally, awaiting the next time
     * `closingNotifier` emits.
     *
     * @example <caption>On every click, emit array of most recent interval events</caption>
     * var clicks = Rx.Observable.fromEvent(document, 'click');
     * var interval = Rx.Observable.interval(1000);
     * var buffered = interval.buffer(clicks);
     * buffered.subscribe(x => console.log(x));
     *
     * @see {@link bufferCount}
     * @see {@link bufferTime}
     * @see {@link bufferToggle}
     * @see {@link bufferWhen}
     * @see {@link window}
     *
     * @param {Observable<any>} closingNotifier An Observable that signals the
     * buffer to be emitted on the output Observable.
     * @return {Observable<T[]>} An Observable of buffers, which are arrays of
     * values.
     * @method buffer
     * @owner Observable
     */
    export function buffer<T>(closingNotifier: Observable<any>): Observable<T[]>;
    export interface BufferSignature<T> {
        (closingNotifier: Observable<any>): Observable<T[]>;
    }
}
declare module "rxjs/add/operator/buffer" {
    import { BufferSignature } from "rxjs/operator/buffer";
    module "rxjs/Observable" {
        interface Observable<T> {
            buffer: BufferSignature<T>;
        }
    }
}
declare module "rxjs/operator/bufferCount" {
    import { Observable } from "rxjs/Observable";
    /**
     * Buffers the source Observable values until the size hits the maximum
     * `bufferSize` given.
     *
     * <span class="informal">Collects values from the past as an array, and emits
     * that array only when its size reaches `bufferSize`.</span>
     *
     * <img src="./img/bufferCount.png" width="100%">
     *
     * Buffers a number of values from the source Observable by `bufferSize` then
     * emits the buffer and clears it, and starts a new buffer each
     * `startBufferEvery` values. If `startBufferEvery` is not provided or is
     * `null`, then new buffers are started immediately at the start of the source
     * and when each buffer closes and is emitted.
     *
     * @example <caption>Emit the last two click events as an array</caption>
     * var clicks = Rx.Observable.fromEvent(document, 'click');
     * var buffered = clicks.bufferCount(2);
     * buffered.subscribe(x => console.log(x));
     *
     * @example <caption>On every click, emit the last two click events as an array</caption>
     * var clicks = Rx.Observable.fromEvent(document, 'click');
     * var buffered = clicks.bufferCount(2, 1);
     * buffered.subscribe(x => console.log(x));
     *
     * @see {@link buffer}
     * @see {@link bufferTime}
     * @see {@link bufferToggle}
     * @see {@link bufferWhen}
     * @see {@link windowCount}
     *
     * @param {number} bufferSize The maximum size of the buffer emitted.
     * @param {number} [startBufferEvery] Interval at which to start a new buffer.
     * For example if `startBufferEvery` is `2`, then a new buffer will be started
     * on every other value from the source. A new buffer is started at the
     * beginning of the source by default.
     * @return {Observable<T[]>} An Observable of arrays of buffered values.
     * @method bufferCount
     * @owner Observable
     */
    export function bufferCount<T>(bufferSize: number, startBufferEvery?: number): Observable<T[]>;
    export interface BufferCountSignature<T> {
        (bufferSize: number, startBufferEvery?: number): Observable<T[]>;
    }
}
declare module "rxjs/add/operator/bufferCount" {
    import { BufferCountSignature } from "rxjs/operator/bufferCount";
    module "rxjs/Observable" {
        interface Observable<T> {
            bufferCount: BufferCountSignature<T>;
        }
    }
}
declare module "rxjs/operator/bufferTime" {
    import { Observable } from "rxjs/Observable";
    import { Scheduler } from "rxjs/Scheduler";
    /**
     * Buffers the source Observable values for a specific time period.
     *
     * <span class="informal">Collects values from the past as an array, and emits
     * those arrays periodically in time.</span>
     *
     * <img src="./img/bufferTime.png" width="100%">
     *
     * Buffers values from the source for a specific time duration `bufferTimeSpan`.
     * Unless the optional argument `bufferCreationInterval` is given, it emits and
     * resets the buffer every `bufferTimeSpan` milliseconds. If
     * `bufferCreationInterval` is given, this operator opens the buffer every
     * `bufferCreationInterval` milliseconds and closes (emits and resets) the
     * buffer every `bufferTimeSpan` milliseconds.
     *
     * @example <caption>Every second, emit an array of the recent click events</caption>
     * var clicks = Rx.Observable.fromEvent(document, 'click');
     * var buffered = clicks.bufferTime(1000);
     * buffered.subscribe(x => console.log(x));
     *
     * @example <caption>Every 5 seconds, emit the click events from the next 2 seconds</caption>
     * var clicks = Rx.Observable.fromEvent(document, 'click');
     * var buffered = clicks.bufferTime(2000, 5000);
     * buffered.subscribe(x => console.log(x));
     *
     * @see {@link buffer}
     * @see {@link bufferCount}
     * @see {@link bufferToggle}
     * @see {@link bufferWhen}
     * @see {@link windowTime}
     *
     * @param {number} bufferTimeSpan The amount of time to fill each buffer array.
     * @param {number} [bufferCreationInterval] The interval at which to start new
     * buffers.
     * @param {Scheduler} [scheduler=async] The scheduler on which to schedule the
     * intervals that determine buffer boundaries.
     * @return {Observable<T[]>} An observable of arrays of buffered values.
     * @method bufferTime
     * @owner Observable
     */
    export function bufferTime<T>(bufferTimeSpan: number, bufferCreationInterval?: number, scheduler?: Scheduler): Observable<T[]>;
    export interface BufferTimeSignature<T> {
        (bufferTimeSpan: number, bufferCreationInterval?: number, scheduler?: Scheduler): Observable<T[]>;
    }
}
declare module "rxjs/add/operator/bufferTime" {
    import { BufferTimeSignature } from "rxjs/operator/bufferTime";
    module "rxjs/Observable" {
        interface Observable<T> {
            bufferTime: BufferTimeSignature<T>;
        }
    }
}
declare module "rxjs/operator/bufferToggle" {
    import { Observable } from "rxjs/Observable";
    /**
     * Buffers the source Observable values starting from an emission from
     * `openings` and ending when the output of `closingSelector` emits.
     *
     * <span class="informal">Collects values from the past as an array. Starts
     * collecting only when `opening` emits, and calls the `closingSelector`
     * function to get an Observable that tells when to close the buffer.</span>
     *
     * <img src="./img/bufferToggle.png" width="100%">
     *
     * Buffers values from the source by opening the buffer via signals from an
     * Observable provided to `openings`, and closing and sending the buffers when
     * an Observable returned by the `closingSelector` function emits.
     *
     * @example <caption>Every other second, emit the click events from the next 500ms</caption>
     * var clicks = Rx.Observable.fromEvent(document, 'click');
     * var openings = Rx.Observable.interval(1000);
     * var buffered = clicks.bufferToggle(openings, i =>
     *   i % 2 ? Rx.Observable.interval(500) : Rx.Observable.empty()
     * );
     * buffered.subscribe(x => console.log(x));
     *
     * @see {@link buffer}
     * @see {@link bufferCount}
     * @see {@link bufferTime}
     * @see {@link bufferWhen}
     * @see {@link windowToggle}
     *
     * @param {Observable<O>} openings An observable of notifications to start new
     * buffers.
     * @param {function(value: O): Observable} closingSelector A function that takes
     * the value emitted by the `openings` observable and returns an Observable,
     * which, when it emits, signals that the associated buffer should be emitted
     * and cleared.
     * @return {Observable<T[]>} An observable of arrays of buffered values.
     * @method bufferToggle
     * @owner Observable
     */
    export function bufferToggle<T, O>(openings: Observable<O>, closingSelector: (value: O) => Observable<any>): Observable<T[]>;
    export interface BufferToggleSignature<T> {
        <O>(openings: Observable<O>, closingSelector: (value: O) => Observable<any>): Observable<T[]>;
    }
}
declare module "rxjs/add/operator/bufferToggle" {
    import { BufferToggleSignature } from "rxjs/operator/bufferToggle";
    module "rxjs/Observable" {
        interface Observable<T> {
            bufferToggle: BufferToggleSignature<T>;
        }
    }
}
declare module "rxjs/operator/bufferWhen" {
    import { Observable } from "rxjs/Observable";
    /**
     * Buffers the source Observable values, using a factory function of closing
     * Observables to determine when to close, emit, and reset the buffer.
     *
     * <span class="informal">Collects values from the past as an array. When it
     * starts collecting values, it calls a function that returns an Observable that
     * tells when to close the buffer and restart collecting.</span>
     *
     * <img src="./img/bufferWhen.png" width="100%">
     *
     * Opens a buffer immediately, then closes the buffer when the observable
     * returned by calling `closingSelector` function emits a value. When it closes
     * the buffer, it immediately opens a new buffer and repeats the process.
     *
     * @example <caption>Emit an array of the last clicks every [1-5] random seconds</caption>
     * var clicks = Rx.Observable.fromEvent(document, 'click');
     * var buffered = clicks.bufferWhen(() =>
     *   Rx.Observable.interval(1000 + Math.random() * 4000)
     * );
     * buffered.subscribe(x => console.log(x));
     *
     * @see {@link buffer}
     * @see {@link bufferCount}
     * @see {@link bufferTime}
     * @see {@link bufferToggle}
     * @see {@link windowWhen}
     *
     * @param {function(): Observable} closingSelector A function that takes no
     * arguments and returns an Observable that signals buffer closure.
     * @return {Observable<T[]>} An observable of arrays of buffered values.
     * @method bufferWhen
     * @owner Observable
     */
    export function bufferWhen<T>(closingSelector: () => Observable<any>): Observable<T[]>;
    export interface BufferWhenSignature<T> {
        (closingSelector: () => Observable<any>): Observable<T[]>;
    }
}
declare module "rxjs/add/operator/bufferWhen" {
    import { BufferWhenSignature } from "rxjs/operator/bufferWhen";
    module "rxjs/Observable" {
        interface Observable<T> {
            bufferWhen: BufferWhenSignature<T>;
        }
    }
}
declare module "rxjs/scheduler/queue" {
    import { QueueScheduler } from "rxjs/scheduler/QueueScheduler";
    export const queue: QueueScheduler;
}
declare module "rxjs/subject/ReplaySubject" {
    import { Subject } from "rxjs/Subject";
    import { Scheduler } from "rxjs/Scheduler";
    import { Subscriber } from "rxjs/Subscriber";
    import { Subscription } from "rxjs/Subscription";
    /**
     * @class ReplaySubject<T>
     */
    export class ReplaySubject<T> extends Subject<T> {
        private events;
        private scheduler;
        private bufferSize;
        private _windowTime;
        constructor(bufferSize?: number, windowTime?: number, scheduler?: Scheduler);
        protected _next(value: T): void;
        protected _subscribe(subscriber: Subscriber<T>): Subscription | Function | void;
        private _getNow();
        private _trimBufferThenGetEvents(now);
    }
}
declare module "rxjs/observable/ConnectableObservable" {
    import { Subject } from "rxjs/Subject";
    import { Observable } from "rxjs/Observable";
    import { Subscriber } from "rxjs/Subscriber";
    import { Subscription } from "rxjs/Subscription";
    /**
     * @class ConnectableObservable<T>
     */
    export class ConnectableObservable<T> extends Observable<T> {
        protected source: Observable<T>;
        protected subjectFactory: () => Subject<T>;
        protected subject: Subject<T>;
        protected subscription: Subscription;
        constructor(source: Observable<T>, subjectFactory: () => Subject<T>);
        protected _subscribe(subscriber: Subscriber<T>): Subscription;
        protected getSubject(): Subject<T>;
        connect(): Subscription;
        refCount(): Observable<T>;
        /**
         * This method is opened for `ConnectableSubscription`.
         * Not to call from others.
         */
        _closeSubscription(): void;
    }
}
declare module "rxjs/operator/multicast" {
    import { Subject } from "rxjs/Subject";
    import { ConnectableObservable } from "rxjs/observable/ConnectableObservable";
    /**
     * Returns an Observable that emits the results of invoking a specified selector on items
     * emitted by a ConnectableObservable that shares a single subscription to the underlying stream.
     *
     * <img src="./img/multicast.png" width="100%">
     *
     * @param {Function} selector - a function that can use the multicasted source stream
     * as many times as needed, without causing multiple subscriptions to the source stream.
     * Subscribers to the given source will receive all notifications of the source from the
     * time of the subscription forward.
     * @return {Observable} an Observable that emits the results of invoking the selector
     * on the items emitted by a `ConnectableObservable` that shares a single subscription to
     * the underlying stream.
     * @method multicast
     * @owner Observable
     */
    export function multicast<T>(subjectOrSubjectFactory: Subject<T> | (() => Subject<T>)): ConnectableObservable<T>;
    export type factoryOrValue<T> = T | (() => T);
    export interface MulticastSignature<T> {
        (subjectOrSubjectFactory: factoryOrValue<Subject<T>>): ConnectableObservable<T>;
    }
}
declare module "rxjs/operator/publishReplay" {
    import { Scheduler } from "rxjs/Scheduler";
    import { ConnectableObservable } from "rxjs/observable/ConnectableObservable";
    /**
     * @param bufferSize
     * @param windowTime
     * @param scheduler
     * @return {ConnectableObservable<T>}
     * @method publishReplay
     * @owner Observable
     */
    export function publishReplay<T>(bufferSize?: number, windowTime?: number, scheduler?: Scheduler): ConnectableObservable<T>;
    export interface PublishReplaySignature<T> {
        (bufferSize?: number, windowTime?: number, scheduler?: Scheduler): ConnectableObservable<T>;
    }
}
declare module "rxjs/operator/cache" {
    import { Observable } from "rxjs/Observable";
    import { Scheduler } from "rxjs/Scheduler";
    /**
     * @param bufferSize
     * @param windowTime
     * @param scheduler
     * @return {Observable<any>}
     * @method cache
     * @owner Observable
     */
    export function cache<T>(bufferSize?: number, windowTime?: number, scheduler?: Scheduler): Observable<T>;
    export interface CacheSignature<T> {
        (bufferSize?: number, windowTime?: number, scheduler?: Scheduler): Observable<T>;
    }
}
declare module "rxjs/add/operator/cache" {
    import { CacheSignature } from "rxjs/operator/cache";
    module "rxjs/Observable" {
        interface Observable<T> {
            cache: CacheSignature<T>;
        }
    }
}
declare module "rxjs/operator/catch" {
    import { Observable } from "rxjs/Observable";
    /**
     * Catches errors on the observable to be handled by returning a new observable or throwing an error.
     * @param {function} selector a function that takes as arguments `err`, which is the error, and `caught`, which
     *  is the source observable, in case you'd like to "retry" that observable by returning it again. Whatever observable
     *  is returned by the `selector` will be used to continue the observable chain.
     * @return {Observable} an observable that originates from either the source or the observable returned by the
     *  catch `selector` function.
     * @method catch
     * @owner Observable
     */
    export function _catch<T, R>(selector: (err: any, caught: Observable<T>) => Observable<R>): Observable<R>;
    export interface CatchSignature<T> {
        <R>(selector: (err: any, caught: Observable<T>) => Observable<R>): Observable<R>;
    }
}
declare module "rxjs/add/operator/catch" {
    import { CatchSignature } from "rxjs/operator/catch";
    module "rxjs/Observable" {
        interface Observable<T> {
            catch: CatchSignature<T>;
        }
    }
}
declare module "rxjs/operator/combineAll" {
    import { Observable } from "rxjs/Observable";
    /**
     * Takes an Observable of Observables, and collects all observables from it. Once the outer observable
     * completes, it subscribes to all collected observables and "combines" their values, such that:
     *  - every time an observable emits, the returned observable emits
     *  - when the returned observable emits, it emits all of the most recent values by:
     *    - if a `project` function is provided, it is called with each recent value from each observable in whatever order they arrived,
     *      and the result of the `project` function is what is emitted by the returned observable
     *    - if there is no `project` function, an array of all of the most recent values is emitted by the returned observable.
     * @param {function} [project] an optional function to map the most recent values from each observable into a new result. Takes each of the
     *   most recent values from each collected observable as arguments, in order.
     * @return {Observable} an observable of projected results or arrays of recent values.
     * @method combineAll
     * @owner Observable
     */
    export function combineAll<R>(project?: (...values: Array<any>) => R): Observable<R>;
    export interface CombineAllSignature<T> {
        (): Observable<T[]>;
        <R>(project?: (...values: Array<T>) => R): Observable<R>;
    }
}
declare module "rxjs/add/operator/combineAll" {
    import { CombineAllSignature } from "rxjs/operator/combineAll";
    module "rxjs/Observable" {
        interface Observable<T> {
            combineAll: CombineAllSignature<T>;
        }
    }
}
declare module "rxjs/add/operator/combineLatest" {
    import { CombineLatestSignature } from "rxjs/operator/combineLatest";
    module "rxjs/Observable" {
        interface Observable<T> {
            combineLatest: CombineLatestSignature<T>;
        }
    }
}
declare module "rxjs/add/operator/concat" {
    import { ConcatSignature } from "rxjs/operator/concat";
    module "rxjs/Observable" {
        interface Observable<T> {
            concat: ConcatSignature<T>;
        }
    }
}
declare module "rxjs/operator/concatAll" {
    /**
     * Joins every Observable emitted by the source (an Observable of Observables), in a serial
     * fashion. Subscribing to each one only when the previous one has completed, and merging
     * all of their values into the returned observable.
     *
     * __Warning:__ If the source Observable emits Observables quickly and endlessly, and the
     * Observables it emits generally complete slower than the source emits, you can run into
     * memory issues as the incoming observables collect in an unbounded buffer.
     *
     * @return {Observable} an observable of values merged from the incoming observables.
     * @method concatAll
     * @owner Observable
     */
    export function concatAll<T>(): T;
    export interface ConcatAllSignature<T> {
        (): T;
    }
}
declare module "rxjs/add/operator/concatAll" {
    import { ConcatAllSignature } from "rxjs/operator/concatAll";
    module "rxjs/Observable" {
        interface Observable<T> {
            concatAll: ConcatAllSignature<T>;
        }
    }
}
declare module "rxjs/operator/mergeMap" {
    import { Observable, ObservableInput } from "rxjs/Observable";
    import { Operator } from "rxjs/Operator";
    import { Subscriber } from "rxjs/Subscriber";
    import { Subscription } from "rxjs/Subscription";
    import { OuterSubscriber } from "rxjs/OuterSubscriber";
    import { InnerSubscriber } from "rxjs/InnerSubscriber";
    /**
     * Returns an Observable that emits items based on applying a function that you supply to each item emitted by the
     * source Observable, where that function returns an Observable, and then merging those resulting Observables and
     * emitting the results of this merger.
     *
     * <img src="./img/mergeMap.png" width="100%">
     *
     * @param {Function} a function that, when applied to an item emitted by the source Observable, returns an Observable.
     * @return {Observable} an Observable that emits the result of applying the transformation function to each item
     * emitted by the source Observable and merging the results of the Observables obtained from this transformation
     * @method mergeMap
     * @owner Observable
     */
    export function mergeMap<T, I, R>(project: (value: T, index: number) => ObservableInput<I>, resultSelector?: (outerValue: T, innerValue: I, outerIndex: number, innerIndex: number) => R | number, concurrent?: number): Observable<R>;
    export interface MergeMapSignature<T> {
        <R>(project: (value: T, index: number) => ObservableInput<R>, concurrent?: number): Observable<R>;
        <I, R>(project: (value: T, index: number) => ObservableInput<I>, resultSelector: (outerValue: T, innerValue: I, outerIndex: number, innerIndex: number) => R, concurrent?: number): Observable<R>;
    }
    export class MergeMapOperator<T, I, R> implements Operator<T, I> {
        private project;
        private resultSelector;
        private concurrent;
        constructor(project: (value: T, index: number) => ObservableInput<I>, resultSelector?: (outerValue: T, innerValue: I, outerIndex: number, innerIndex: number) => R, concurrent?: number);
        call(observer: Subscriber<I>): Subscriber<T>;
    }
    export class MergeMapSubscriber<T, I, R> extends OuterSubscriber<T, I> {
        private project;
        private resultSelector;
        private concurrent;
        private hasCompleted;
        private buffer;
        private active;
        protected index: number;
        constructor(destination: Subscriber<I>, project: (value: T, index: number) => ObservableInput<I>, resultSelector?: (outerValue: T, innerValue: I, outerIndex: number, innerIndex: number) => R, concurrent?: number);
        protected _next(value: any): void;
        protected _tryNext(value: any): void;
        private _innerSub(ish, value, index);
        protected _complete(): void;
        notifyNext(outerValue: T, innerValue: I, outerIndex: number, innerIndex: number, innerSub: InnerSubscriber<T, I>): void;
        _notifyResultSelector(outerValue: T, innerValue: I, outerIndex: number, innerIndex: number): void;
        notifyComplete(innerSub: Subscription): void;
    }
}
declare module "rxjs/operator/concatMap" {
    import { Observable, ObservableInput } from "rxjs/Observable";
    /**
     * Maps values from the source observable into new Observables, then merges them in a serialized fashion,
     * waiting for each one to complete before merging the next.
     *
     * __Warning:__ if incoming values arrive endlessly and faster than the observables they're being mapped
     * to can complete, it will result in memory issues as created observables amass in an unbounded buffer
     * waiting for their turn to be subscribed to.
     *
     * @param {function} project a function to map incoming values into Observables to be concatenated. accepts
     * the `value` and the `index` as arguments.
     * @param {function} [resultSelector] an optional result selector that is applied to values before they're
     * merged into the returned observable. The arguments passed to this function are:
     * - `outerValue`: the value that came from the source
     * - `innerValue`: the value that came from the projected Observable
     * - `outerIndex`: the "index" of the value that came from the source
     * - `innerIndex`: the "index" of the value from the projected Observable
     * @return {Observable} an observable of values merged from the projected Observables as they were subscribed to,
     * one at a time. Optionally, these values may have been projected from a passed `projectResult` argument.
     * @method concatMap
     * @owner Observable
     */
    export function concatMap<T, I, R>(project: (value: T, index: number) => ObservableInput<I>, resultSelector?: (outerValue: T, innerValue: I, outerIndex: number, innerIndex: number) => R): any;
    export interface ConcatMapSignature<T> {
        <R>(project: (value: T, index: number) => ObservableInput<R>): Observable<R>;
        <I, R>(project: (value: T, index: number) => ObservableInput<I>, resultSelector: (outerValue: T, innerValue: I, outerIndex: number, innerIndex: number) => R): Observable<R>;
    }
}
declare module "rxjs/add/operator/concatMap" {
    import { ConcatMapSignature } from "rxjs/operator/concatMap";
    module "rxjs/Observable" {
        interface Observable<T> {
            concatMap: ConcatMapSignature<T>;
        }
    }
}
declare module "rxjs/operator/mergeMapTo" {
    import { Observable, ObservableInput, SubscribableOrPromise } from "rxjs/Observable";
    import { Operator } from "rxjs/Operator";
    import { Subscriber } from "rxjs/Subscriber";
    import { Subscription } from "rxjs/Subscription";
    import { OuterSubscriber } from "rxjs/OuterSubscriber";
    import { InnerSubscriber } from "rxjs/InnerSubscriber";
    /**
     * @param observable
     * @param resultSelector
     * @param concurrent
     * @return {Observable<R>|WebSocketSubject<*>|Observable<*>}
     * @method mergeMapTo
     * @owner Observable
     */
    export function mergeMapTo<T, I, R>(observable: Observable<I>, resultSelector?: (outerValue: T, innerValue: I, outerIndex: number, innerIndex: number) => R | number, concurrent?: number): Observable<R>;
    export interface MergeMapToSignature<T> {
        <R>(observable: ObservableInput<R>, concurrent?: number): Observable<R>;
        <I, R>(observable: ObservableInput<I>, resultSelector: (outerValue: T, innerValue: I, outerIndex: number, innerIndex: number) => R, concurrent?: number): Observable<R>;
    }
    export class MergeMapToOperator<T, I, R> implements Operator<Observable<T>, R> {
        private ish;
        private resultSelector;
        private concurrent;
        constructor(ish: SubscribableOrPromise<I>, resultSelector?: (outerValue: T, innerValue: I, outerIndex: number, innerIndex: number) => R, concurrent?: number);
        call(observer: Subscriber<R>): Subscriber<any>;
    }
    export class MergeMapToSubscriber<T, I, R> extends OuterSubscriber<T, I> {
        private ish;
        private resultSelector;
        private concurrent;
        private hasCompleted;
        private buffer;
        private active;
        protected index: number;
        constructor(destination: Subscriber<R>, ish: SubscribableOrPromise<I>, resultSelector?: (outerValue: T, innerValue: I, outerIndex: number, innerIndex: number) => R, concurrent?: number);
        protected _next(value: any): void;
        private _innerSub(ish, destination, resultSelector, value, index);
        protected _complete(): void;
        notifyNext(outerValue: T, innerValue: I, outerIndex: number, innerIndex: number, innerSub: InnerSubscriber<T, I>): void;
        private trySelectResult(outerValue, innerValue, outerIndex, innerIndex);
        notifyError(err: any): void;
        notifyComplete(innerSub: Subscription): void;
    }
}
declare module "rxjs/operator/concatMapTo" {
    import { Observable, ObservableInput } from "rxjs/Observable";
    /**
     * Maps values from the source to a specific observable, and merges them together in a serialized fashion.
     *
     * @param {Observable} observable the observable to map each source value to
     * @param {function} [resultSelector] an optional result selector that is applied to values before they're
     * merged into the returned observable. The arguments passed to this function are:
     * - `outerValue`: the value that came from the source
     * - `innerValue`: the value that came from the projected Observable
     * - `outerIndex`: the "index" of the value that came from the source
     * - `innerIndex`: the "index" of the value from the projected Observable
     * @return {Observable} an observable of values merged together by joining the passed observable
     * with itself, one after the other, for each value emitted from the source.
     * @method concatMapTo
     * @owner Observable
     */
    export function concatMapTo<T, I, R>(observable: Observable<I>, resultSelector?: (outerValue: T, innerValue: I, outerIndex: number, innerIndex: number) => R): Observable<R>;
    export interface ConcatMapToSignature<T> {
        <R>(observable: ObservableInput<R>): Observable<R>;
        <I, R>(observable: ObservableInput<I>, resultSelector: (outerValue: T, innerValue: I, outerIndex: number, innerIndex: number) => R): Observable<R>;
    }
}
declare module "rxjs/add/operator/concatMapTo" {
    import { ConcatMapToSignature } from "rxjs/operator/concatMapTo";
    module "rxjs/Observable" {
        interface Observable<T> {
            concatMapTo: ConcatMapToSignature<T>;
        }
    }
}
declare module "rxjs/operator/count" {
    import { Observable } from "rxjs/Observable";
    /**
     * Returns an observable of a single number that represents the number of items that either:
     * Match a provided predicate function, _or_ if a predicate is not provided, the number
     * represents the total count of all items in the source observable. The count is emitted
     * by the returned observable when the source observable completes.
     * @param {function} [predicate] a boolean function to select what values are to be counted.
     * it is provided with arguments of:
     *   - `value`: the value from the source observable
     *   - `index`: the "index" of the value from the source observable
     *   - `source`: the source observable instance itself.
     * @return {Observable} an observable of one number that represents the count as described
     * above
     * @method count
     * @owner Observable
     */
    export function count<T>(predicate?: (value: T, index: number, source: Observable<T>) => boolean): Observable<number>;
    export interface CountSignature<T> {
        (predicate?: (value: T, index: number, source: Observable<T>) => boolean): Observable<number>;
    }
}
declare module "rxjs/add/operator/count" {
    import { CountSignature } from "rxjs/operator/count";
    module "rxjs/Observable" {
        interface Observable<T> {
            count: CountSignature<T>;
        }
    }
}
declare module "rxjs/operator/dematerialize" {
    import { Observable } from "rxjs/Observable";
    /**
     * Returns an Observable that transforms Notification objects into the items or notifications they represent.
     * @return {Observable} an Observable that emits items and notifications embedded in Notification objects emitted by the source Observable.
     * @method dematerialize
     * @owner Observable
     */
    export function dematerialize<T>(): Observable<any>;
    export interface DematerializeSignature<T> {
        <R>(): Observable<R>;
    }
}
declare module "rxjs/add/operator/dematerialize" {
    import { DematerializeSignature } from "rxjs/operator/dematerialize";
    module "rxjs/Observable" {
        interface Observable<T> {
            dematerialize: DematerializeSignature<T>;
        }
    }
}
declare module "rxjs/operator/debounce" {
    import { Observable, SubscribableOrPromise } from "rxjs/Observable";
    /**
     * Returns the source Observable delayed by the computed debounce duration,
     * with the duration lengthened if a new source item arrives before the delay
     * duration ends.
     * In practice, for each item emitted on the source, this operator holds the
     * latest item, waits for a silence as long as the `durationSelector` specifies,
     * and only then emits the latest source item on the result Observable.
     * @param {function} durationSelector function for computing the timeout duration for each item.
     * @return {Observable} an Observable the same as source Observable, but drops items.
     * @method debounce
     * @owner Observable
     */
    export function debounce<T>(durationSelector: (value: T) => SubscribableOrPromise<number>): Observable<T>;
    export interface DebounceSignature<T> {
        (durationSelector: (value: T) => SubscribableOrPromise<number>): Observable<T>;
    }
}
declare module "rxjs/add/operator/debounce" {
    import { DebounceSignature } from "rxjs/operator/debounce";
    module "rxjs/Observable" {
        interface Observable<T> {
            debounce: DebounceSignature<T>;
        }
    }
}
declare module "rxjs/operator/debounceTime" {
    import { Observable } from "rxjs/Observable";
    import { Scheduler } from "rxjs/Scheduler";
    /**
     * Returns the source Observable delayed by the computed debounce duration,
     * with the duration lengthened if a new source item arrives before the delay
     * duration ends.
     * In practice, for each item emitted on the source, this operator holds the
     * latest item, waits for a silence for the `dueTime` length, and only then
     * emits the latest source item on the result Observable.
     * Optionally takes a scheduler for manging timers.
     * @param {number} dueTime the timeout value for the window of time required to not drop the item.
     * @param {Scheduler} [scheduler] the Scheduler to use for managing the timers that handle the timeout for each item.
     * @return {Observable} an Observable the same as source Observable, but drops items.
     * @method debounceTime
     * @owner Observable
     */
    export function debounceTime<T>(dueTime: number, scheduler?: Scheduler): Observable<T>;
    export interface DebounceTimeSignature<T> {
        (dueTime: number, scheduler?: Scheduler): Observable<T>;
    }
}
declare module "rxjs/add/operator/debounceTime" {
    import { DebounceTimeSignature } from "rxjs/operator/debounceTime";
    module "rxjs/Observable" {
        interface Observable<T> {
            debounceTime: DebounceTimeSignature<T>;
        }
    }
}
declare module "rxjs/operator/defaultIfEmpty" {
    import { Observable } from "rxjs/Observable";
    /**
     * Returns an Observable that emits the elements of the source or a specified default value if empty.
     * @param {any} defaultValue the default value used if source is empty; defaults to null.
     * @return {Observable} an Observable of the items emitted by the where empty values are replaced by the specified default value or null.
     * @method defaultIfEmpty
     * @owner Observable
     */
    export function defaultIfEmpty<T, R>(defaultValue?: R): Observable<T | R>;
    export interface DefaultIfEmptySignature<T> {
        (defaultValue?: T): Observable<T>;
        <R>(defaultValue?: R): Observable<T | R>;
    }
}
declare module "rxjs/add/operator/defaultIfEmpty" {
    import { DefaultIfEmptySignature } from "rxjs/operator/defaultIfEmpty";
    module "rxjs/Observable" {
        interface Observable<T> {
            defaultIfEmpty: DefaultIfEmptySignature<T>;
        }
    }
}
declare module "rxjs/operator/delay" {
    import { Scheduler } from "rxjs/Scheduler";
    import { Observable } from "rxjs/Observable";
    /**
     * Delays the emission of items from the source Observable by a given timeout or
     * until a given Date.
     *
     * <span class="informal">Time order shifts each item by some specified amount of
     * milliseconds.</span>
     *
     * <img src="./img/delay.png" width="100%">
     *
     * If the delay argument is a Number, this operator time shifts the source
     * Observable by that amount of time expressed in milliseconds. The relative
     * time intervals between the values are preserved.
     *
     * If the delay argument is a Date, this operator time shifts the start of the
     * Observable execution until the given date occurs.
     *
     * @example <caption>Delay each click by one second</caption>
     * var clicks = Rx.Observable.fromEvent(document, 'click');
     * var delayedClicks = clicks.delay(1000); // each click emitted after 1 second
     * delayedClicks.subscribe(x => console.log(x));
     *
     * @example <caption>Delay all clicks until a future date happens</caption>
     * var clicks = Rx.Observable.fromEvent(document, 'click');
     * var date = new Date('March 15, 2050 12:00:00'); // in the future
     * var delayedClicks = clicks.delay(date); // click emitted only after that date
     * delayedClicks.subscribe(x => console.log(x));
     *
     * @see {@link debounceTime}
     * @see {@link delayWhen}
     *
     * @param {number|Date} delay The delay duration in milliseconds (a `number`) or
     * a `Date` until which the emission of the source items is delayed.
     * @param {Scheduler} [scheduler=async] The Scheduler to use for
     * managing the timers that handle the time-shift for each item.
     * @return {Observable} An Observable that delays the emissions of the source
     * Observable by the specified timeout or Date.
     * @method delay
     * @owner Observable
     */
    export function delay<T>(delay: number | Date, scheduler?: Scheduler): Observable<T>;
    export interface DelaySignature<T> {
        (delay: number | Date, scheduler?: Scheduler): Observable<T>;
    }
}
declare module "rxjs/add/operator/delay" {
    import { DelaySignature } from "rxjs/operator/delay";
    module "rxjs/Observable" {
        interface Observable<T> {
            delay: DelaySignature<T>;
        }
    }
}
declare module "rxjs/operator/delayWhen" {
    import { Observable } from "rxjs/Observable";
    /**
     * Returns an Observable that delays the emission of items from the source Observable
     * by a subscription delay and a delay selector function for each element.
     * @param {Function} selector function to retrieve a sequence indicating the delay for each given element.
     * @param {Observable} sequence indicating the delay for the subscription to the source.
     * @return {Observable} an Observable that delays the emissions of the source Observable by the specified timeout or Date.
     * @method delayWhen
     * @owner Observable
     */
    export function delayWhen<T>(delayDurationSelector: (value: T) => Observable<any>, subscriptionDelay?: Observable<any>): Observable<T>;
    export interface DelayWhenSignature<T> {
        (delayDurationSelector: (value: T) => Observable<any>, subscriptionDelay?: Observable<any>): Observable<T>;
    }
}
declare module "rxjs/add/operator/delayWhen" {
    import { DelayWhenSignature } from "rxjs/operator/delayWhen";
    module "rxjs/Observable" {
        interface Observable<T> {
            delayWhen: DelayWhenSignature<T>;
        }
    }
}
declare module "rxjs/operator/distinctUntilChanged" {
    import { Observable } from "rxjs/Observable";
    /**
     * Returns an Observable that emits all items emitted by the source Observable that are distinct by comparison from the previous item.
     * If a comparator function is provided, then it will be called for each item to test for whether or not that value should be emitted.
     * If a comparator function is not provided, an equality check is used by default.
     * @param {function} [compare] optional comparison function called to test if an item is distinct from the previous item in the source.
     * @return {Observable} an Observable that emits items from the source Observable with distinct values.
     * @method distinctUntilChanged
     * @owner Observable
     */
    export function distinctUntilChanged<T, K>(compare?: (x: K, y: K) => boolean, keySelector?: (x: T) => K): Observable<T>;
    export interface DistinctUntilChangedSignature<T> {
        (compare?: (x: T, y: T) => boolean): Observable<T>;
        <K>(compare: (x: K, y: K) => boolean, keySelector: (x: T) => K): Observable<T>;
    }
}
declare module "rxjs/add/operator/distinctUntilChanged" {
    import { DistinctUntilChangedSignature } from "rxjs/operator/distinctUntilChanged";
    module "rxjs/Observable" {
        interface Observable<T> {
            distinctUntilChanged: DistinctUntilChangedSignature<T>;
        }
    }
}
declare module "rxjs/operator/do" {
    import { Observable } from "rxjs/Observable";
    import { PartialObserver } from "rxjs/Observer";
    /**
     * Returns a mirrored Observable of the source Observable, but modified so that the provided Observer is called
     * for every item emitted by the source.
     * This operator is useful for debugging your observables for the correct values or performing other side effects.
     * @param {Observer|function} [nextOrObserver] a normal observer callback or callback for onNext.
     * @param {function} [error] callback for errors in the source.
     * @param {function} [complete] callback for the completion of the source.
     * @reurns {Observable} a mirrored Observable with the specified Observer or callback attached for each item.
     * @method do
     * @owner Observable
     */
    export function _do<T>(nextOrObserver?: PartialObserver<T> | ((x: T) => void), error?: (e: any) => void, complete?: () => void): Observable<T>;
    export interface DoSignature<T> {
        (next: (x: T) => void, error?: (e: any) => void, complete?: () => void): Observable<T>;
        (observer: PartialObserver<T>): Observable<T>;
    }
}
declare module "rxjs/add/operator/do" {
    import { DoSignature } from "rxjs/operator/do";
    module "rxjs/Observable" {
        interface Observable<T> {
            do: DoSignature<T>;
        }
    }
}
declare module "rxjs/operator/expand" {
    import { Observable } from "rxjs/Observable";
    import { Scheduler } from "rxjs/Scheduler";
    import { Operator } from "rxjs/Operator";
    import { Subscriber } from "rxjs/Subscriber";
    import { Subscription } from "rxjs/Subscription";
    import { OuterSubscriber } from "rxjs/OuterSubscriber";
    import { InnerSubscriber } from "rxjs/InnerSubscriber";
    /**
     * Returns an Observable where for each item in the source Observable, the supplied function is applied to each item,
     * resulting in a new value to then be applied again with the function.
     * @param {function} project the function for projecting the next emitted item of the Observable.
     * @param {number} [concurrent] the max number of observables that can be created concurrently. defaults to infinity.
     * @param {Scheduler} [scheduler] The Scheduler to use for managing the expansions.
     * @return {Observable} an Observable containing the expansions of the source Observable.
     * @method expand
     * @owner Observable
     */
    export function expand<T, R>(project: (value: T, index: number) => Observable<R>, concurrent?: number, scheduler?: Scheduler): Observable<R>;
    export interface ExpandSignature<T> {
        (project: (value: T, index: number) => Observable<T>, concurrent?: number, scheduler?: Scheduler): Observable<T>;
        <R>(project: (value: T, index: number) => Observable<R>, concurrent?: number, scheduler?: Scheduler): Observable<R>;
    }
    export class ExpandOperator<T, R> implements Operator<T, R> {
        private project;
        private concurrent;
        private scheduler;
        constructor(project: (value: T, index: number) => Observable<R>, concurrent: number, scheduler: Scheduler);
        call(subscriber: Subscriber<R>): Subscriber<T>;
    }
    export class ExpandSubscriber<T, R> extends OuterSubscriber<T, R> {
        private project;
        private concurrent;
        private scheduler;
        private index;
        private active;
        private hasCompleted;
        private buffer;
        constructor(destination: Subscriber<R>, project: (value: T, index: number) => Observable<R>, concurrent: number, scheduler: Scheduler);
        private static dispatch({subscriber, result, value, index});
        protected _next(value: any): void;
        private subscribeToProjection(result, value, index);
        protected _complete(): void;
        notifyNext(outerValue: T, innerValue: R, outerIndex: number, innerIndex: number, innerSub: InnerSubscriber<T, R>): void;
        notifyComplete(innerSub: Subscription): void;
    }
}
declare module "rxjs/add/operator/expand" {
    import { ExpandSignature } from "rxjs/operator/expand";
    module "rxjs/Observable" {
        interface Observable<T> {
            expand: ExpandSignature<T>;
        }
    }
}
declare module "rxjs/operator/filter" {
    import { Observable } from "rxjs/Observable";
    /**
     * Similar to the well-known `Array.prototype.filter` method, this operator filters values down to a set
     * allowed by a `select` function
     *
     * @param {Function} select a function that is used to select the resulting values
     *  if it returns `true`, the value is emitted, if `false` the value is not passed to the resulting observable
     * @param {any} [thisArg] an optional argument to determine the value of `this` in the `select` function
     * @return {Observable} an observable of values allowed by the select function
     * @method filter
     * @owner Observable
     */
    export function filter<T>(select: (value: T, index: number) => boolean, thisArg?: any): Observable<T>;
    export interface FilterSignature<T> {
        (select: (value: T, index: number) => boolean, thisArg?: any): Observable<T>;
    }
}
declare module "rxjs/add/operator/filter" {
    import { FilterSignature } from "rxjs/operator/filter";
    module "rxjs/Observable" {
        interface Observable<T> {
            filter: FilterSignature<T>;
        }
    }
}
declare module "rxjs/operator/finally" {
    import { Observable } from "rxjs/Observable";
    /**
     * Returns an Observable that mirrors the source Observable, but will call a specified function when
     * the source terminates on complete or error.
     * @param {function} finallySelector function to be called when source terminates.
     * @return {Observable} an Observable that mirrors the source, but will call the specified function on termination.
     * @method finally
     * @owner Observable
     */
    export function _finally<T>(finallySelector: () => void): Observable<T>;
    export interface FinallySignature<T> {
        <T>(finallySelector: () => void): Observable<T>;
    }
}
declare module "rxjs/add/operator/finally" {
    import { FinallySignature } from "rxjs/operator/finally";
    module "rxjs/Observable" {
        interface Observable<T> {
            finally: FinallySignature<T>;
        }
    }
}
declare module "rxjs/util/EmptyError" {
    export class EmptyError extends Error {
        constructor();
    }
}
declare module "rxjs/operator/first" {
    import { Observable } from "rxjs/Observable";
    /**
     * Returns an Observable that emits the first item of the source Observable that matches the specified condition.
     * Throws an error if matching element is not found.
     * @param {function} predicate function called with each item to test for condition matching.
     * @return {Observable} an Observable of the first item that matches the condition.
     * @method first
     * @owner Observable
     */
    export function first<T, R>(predicate?: (value: T, index: number, source: Observable<T>) => boolean, resultSelector?: (value: T, index: number) => R, defaultValue?: R): Observable<T | R>;
    export interface FirstSignature<T> {
        (predicate?: (value: T, index: number, source: Observable<T>) => boolean): Observable<T>;
        (predicate: (value: T, index: number, source: Observable<T>) => boolean, resultSelector: void, defaultValue?: T): Observable<T>;
        <R>(predicate?: (value: T, index: number, source: Observable<T>) => boolean, resultSelector?: (value: T, index: number) => R, defaultValue?: R): Observable<R>;
    }
}
declare module "rxjs/add/operator/first" {
    import { FirstSignature } from "rxjs/operator/first";
    module "rxjs/Observable" {
        interface Observable<T> {
            first: FirstSignature<T>;
        }
    }
}
declare module "rxjs/util/MapPolyfill" {
    export class MapPolyfill {
        size: number;
        private _values;
        private _keys;
        get(key: any): any;
        set(key: any, value: any): this;
        delete(key: any): boolean;
        clear(): void;
        forEach(cb: Function, thisArg: any): void;
    }
}
declare module "rxjs/util/Map" {
    export const Map: any;
}
declare module "rxjs/util/FastMap" {
    export class FastMap {
        private values;
        delete(key: string): boolean;
        set(key: string, value: any): FastMap;
        get(key: string): any;
        forEach(cb: (value: any, key: any) => void, thisArg?: any): void;
        clear(): void;
    }
}
declare module "rxjs/operator/groupBy" {
    import { Subscriber } from "rxjs/Subscriber";
    import { Subscription } from "rxjs/Subscription";
    import { Observable } from "rxjs/Observable";
    import { Subject } from "rxjs/Subject";
    /**
     * Groups the items emitted by an Observable according to a specified criterion,
     * and emits these grouped items as `GroupedObservables`, one
     * {@link GroupedObservable} per group.
     *
     * <img src="./img/groupBy.png" width="100%">
     *
     * @param {function(value: T): K} keySelector a function that extracts the key
     * for each item.
     * @param {function(value: T): R} [elementSelector] a function that extracts the
     * return element for each item.
     * @param {function(grouped: GroupedObservable<K,R>): Observable<any>} [durationSelector]
     * a function that returns an Observable to determine how long each group should
     * exist.
     * @return {Observable<GroupedObservable<K,R>>} an Observable that emits
     * GroupedObservables, each of which corresponds to a unique key value and each
     * of which emits those items from the source Observable that share that key
     * value.
     * @method groupBy
     * @owner Observable
     */
    export function groupBy<T, K, R>(keySelector: (value: T) => K, elementSelector?: (value: T) => R, durationSelector?: (grouped: GroupedObservable<K, R>) => Observable<any>): Observable<GroupedObservable<K, R>>;
    export interface GroupBySignature<T> {
        <K>(keySelector: (value: T) => K): Observable<GroupedObservable<K, T>>;
        <K>(keySelector: (value: T) => K, elementSelector: void, durationSelector: (grouped: GroupedObservable<K, T>) => Observable<any>): Observable<GroupedObservable<K, T>>;
        <K, R>(keySelector: (value: T) => K, elementSelector?: (value: T) => R, durationSelector?: (grouped: GroupedObservable<K, R>) => Observable<any>): Observable<GroupedObservable<K, R>>;
    }
    export interface RefCountSubscription {
        count: number;
        unsubscribe: () => void;
        isUnsubscribed: boolean;
        attemptedToUnsubscribe: boolean;
    }
    /**
     * An Observable representing values belonging to the same group represented by
     * a common key. The values emitted by a GroupedObservable come from the source
     * Observable. The common key is available as the field `key` on a
     * GroupedObservable instance.
     *
     * @class GroupedObservable<K, T>
     */
    export class GroupedObservable<K, T> extends Observable<T> {
        key: K;
        private groupSubject;
        private refCountSubscription;
        constructor(key: K, groupSubject: Subject<T>, refCountSubscription?: RefCountSubscription);
        protected _subscribe(subscriber: Subscriber<T>): Subscription;
    }
}
declare module "rxjs/add/operator/groupBy" {
    import { GroupBySignature } from "rxjs/operator/groupBy";
    module "rxjs/Observable" {
        interface Observable<T> {
            groupBy: GroupBySignature<T>;
        }
    }
}
declare module "rxjs/operator/ignoreElements" {
    import { Observable } from "rxjs/Observable";
    /**
     * Ignores all items emitted by the source Observable and only passes calls of `complete` or `error`.
     *
     * <img src="./img/ignoreElements.png" width="100%">
     *
     * @return {Observable} an empty Observable that only calls `complete`
     * or `error`, based on which one is called by the source Observable.
     * @method ignoreElements
     * @owner Observable
     */
    export function ignoreElements<T>(): Observable<T>;
    export interface IgnoreElementsSignature<T> {
        (): Observable<T>;
    }
}
declare module "rxjs/add/operator/ignoreElements" {
    import { IgnoreElementsSignature } from "rxjs/operator/ignoreElements";
    module "rxjs/Observable" {
        interface Observable<T> {
            ignoreElements: IgnoreElementsSignature<T>;
        }
    }
}
declare module "rxjs/operator/inspect" {
    import { Observable, SubscribableOrPromise } from "rxjs/Observable";
    /**
     * @param durationSelector
     * @return {Observable<R>|WebSocketSubject<T>|Observable<T>}
     * @method inspect
     * @owner Observable
     */
    export function inspect<T>(durationSelector: (value: T) => SubscribableOrPromise<any>): Observable<T>;
    export interface InspectSignature<T> {
        (durationSelector: (value: T) => SubscribableOrPromise<any>): Observable<T>;
    }
}
declare module "rxjs/add/operator/inspect" {
    import { InspectSignature } from "rxjs/operator/inspect";
    module "rxjs/Observable" {
        interface Observable<T> {
            inspect: InspectSignature<T>;
        }
    }
}
declare module "rxjs/operator/inspectTime" {
    import { Scheduler } from "rxjs/Scheduler";
    import { Observable } from "rxjs/Observable";
    /**
     * @param delay
     * @param scheduler
     * @return {Observable<R>|WebSocketSubject<T>|Observable<T>}
     * @method inspectTime
     * @owner Observable
     */
    export function inspectTime<T>(delay: number, scheduler?: Scheduler): Observable<T>;
    export interface InspectTimeSignature<T> {
        (delay: number, scheduler?: Scheduler): Observable<T>;
    }
}
declare module "rxjs/add/operator/inspectTime" {
    import { InspectTimeSignature } from "rxjs/operator/inspectTime";
    module "rxjs/Observable" {
        interface Observable<T> {
            inspectTime: InspectTimeSignature<T>;
        }
    }
}
declare module "rxjs/operator/last" {
    import { Observable } from "rxjs/Observable";
    /**
     * Returns an Observable that emits only the last item emitted by the source Observable.
     * It optionally takes a predicate function as a parameter, in which case, rather than emitting
     * the last item from the source Observable, the resulting Observable will emit the last item
     * from the source Observable that satisfies the predicate.
     *
     * <img src="./img/last.png" width="100%">
     *
     * @param {function} predicate - the condition any source emitted item has to satisfy.
     * @return {Observable} an Observable that emits only the last item satisfying the given condition
     * from the source, or an NoSuchElementException if no such items are emitted.
     * @throws - Throws if no items that match the predicate are emitted by the source Observable.
     * @method last
     * @owner Observable
     */
    export function last<T, R>(predicate?: (value: T, index: number, source: Observable<T>) => boolean, resultSelector?: (value: T, index: number) => R | void, defaultValue?: R): Observable<T | R>;
    export interface LastSignature<T> {
        (predicate?: (value: T, index: number, source: Observable<T>) => boolean): Observable<T>;
        (predicate: (value: T, index: number, source: Observable<T>) => boolean, resultSelector: void, defaultValue?: T): Observable<T>;
        <R>(predicate?: (value: T, index: number, source: Observable<T>) => boolean, resultSelector?: (value: T, index: number) => R, defaultValue?: R): Observable<R>;
    }
}
declare module "rxjs/add/operator/last" {
    import { LastSignature } from "rxjs/operator/last";
    module "rxjs/Observable" {
        interface Observable<T> {
            last: LastSignature<T>;
        }
    }
}
declare module "rxjs/operator/let" {
    import { Observable } from "rxjs/Observable";
    /**
     * @param func
     * @return {Observable<R>}
     * @method let
     * @owner Observable
     */
    export function letProto<T, R>(func: (selector: Observable<T>) => Observable<R>): Observable<R>;
    export interface LetSignature<T> {
        <R>(func: (selector: Observable<T>) => Observable<R>): Observable<R>;
    }
}
declare module "rxjs/add/operator/let" {
    import { LetSignature } from "rxjs/operator/let";
    module "rxjs/Observable" {
        interface Observable<T> {
            let: LetSignature<T>;
            letBind: LetSignature<T>;
        }
    }
}
declare module "rxjs/operator/every" {
    import { Observable } from "rxjs/Observable";
    /**
     * Returns an Observable that emits whether or not every item of the source satisfies the condition specified.
     * @param {function} predicate a function for determining if an item meets a specified condition.
     * @param {any} [thisArg] optional object to use for `this` in the callback
     * @return {Observable} an Observable of booleans that determines if all items of the source Observable meet the condition specified.
     * @method every
     * @owner Observable
     */
    export function every<T>(predicate: (value: T, index: number, source: Observable<T>) => boolean, thisArg?: any): Observable<boolean>;
    export interface EverySignature<T> {
        (predicate: (value: T, index: number, source: Observable<T>) => boolean, thisArg?: any): Observable<boolean>;
    }
}
declare module "rxjs/add/operator/every" {
    import { EverySignature } from "rxjs/operator/every";
    module "rxjs/Observable" {
        interface Observable<T> {
            every: EverySignature<T>;
        }
    }
}
declare module "rxjs/operator/map" {
    import { Observable } from "rxjs/Observable";
    /**
     * Similar to the well known `Array.prototype.map` function, this operator
     * applies a projection to each value and emits that projection in the returned observable
     *
     * <img src="./img/map.png" width="100%">
     *
     * @param {Function} project the function to create projection
     * @param {any} [thisArg] an optional argument to define what `this` is in the project function
     * @return {Observable} a observable of projected values
     * @method map
     * @owner Observable
     */
    export function map<T, R>(project: (value: T, index: number) => R, thisArg?: any): Observable<R>;
    export interface MapSignature<T> {
        <R>(project: (value: T, index: number) => R, thisArg?: any): Observable<R>;
    }
}
declare module "rxjs/add/operator/map" {
    import { MapSignature } from "rxjs/operator/map";
    module "rxjs/Observable" {
        interface Observable<T> {
            map: MapSignature<T>;
        }
    }
}
declare module "rxjs/operator/mapTo" {
    import { Observable } from "rxjs/Observable";
    /**
     * Maps every value to the same value every time.
     *
     * <img src="./img/mapTo.png" width="100%">
     *
     * @param {any} value the value to map each incoming value to
     * @return {Observable} an observable of the passed value that emits every time the source does
     * @method mapTo
     * @owner Observable
     */
    export function mapTo<T, R>(value: R): Observable<R>;
    export interface MapToSignature<T> {
        <R>(value: R): Observable<R>;
    }
}
declare module "rxjs/add/operator/mapTo" {
    import { MapToSignature } from "rxjs/operator/mapTo";
    module "rxjs/Observable" {
        interface Observable<T> {
            mapTo: MapToSignature<T>;
        }
    }
}
declare module "rxjs/operator/materialize" {
    import { Observable } from "rxjs/Observable";
    import { Notification } from "rxjs/Notification";
    /**
     * Returns an Observable that represents all of the emissions and notifications
     * from the source Observable into emissions marked with their original types
     * within a `Notification` objects.
     *
     * <img src="./img/materialize.png" width="100%">
     *
     * @scheduler materialize does not operate by default on a particular Scheduler.
     * @return {Observable} an Observable that emits items that are the result of
     * materializing the items and notifications of the source Observable.
     * @method materialize
     * @owner Observable
     */
    export function materialize<T>(): Observable<Notification<T>>;
    export interface MaterializeSignature<T> {
        (): Observable<Notification<T>>;
    }
}
declare module "rxjs/add/operator/materialize" {
    import { MaterializeSignature } from "rxjs/operator/materialize";
    module "rxjs/Observable" {
        interface Observable<T> {
            materialize: MaterializeSignature<T>;
        }
    }
}
declare module "rxjs/add/operator/merge" {
    import { MergeSignature } from "rxjs/operator/merge";
    module "rxjs/Observable" {
        interface Observable<T> {
            merge: MergeSignature<T>;
        }
    }
}
declare module "rxjs/add/operator/mergeAll" {
    import { MergeAllSignature } from "rxjs/operator/mergeAll";
    module "rxjs/Observable" {
        interface Observable<T> {
            mergeAll: MergeAllSignature<T>;
        }
    }
}
declare module "rxjs/add/operator/mergeMap" {
    import { MergeMapSignature } from "rxjs/operator/mergeMap";
    module "rxjs/Observable" {
        interface Observable<T> {
            flatMap: MergeMapSignature<T>;
            mergeMap: MergeMapSignature<T>;
        }
    }
}
declare module "rxjs/add/operator/mergeMapTo" {
    import { MergeMapToSignature } from "rxjs/operator/mergeMapTo";
    module "rxjs/Observable" {
        interface Observable<T> {
            flatMapTo: MergeMapToSignature<T>;
            mergeMapTo: MergeMapToSignature<T>;
        }
    }
}
declare module "rxjs/add/operator/multicast" {
    import { MulticastSignature } from "rxjs/operator/multicast";
    module "rxjs/Observable" {
        interface Observable<T> {
            multicast: MulticastSignature<T>;
        }
    }
}
declare module "rxjs/add/operator/observeOn" {
    import { ObserveOnSignature } from "rxjs/operator/observeOn";
    module "rxjs/Observable" {
        interface Observable<T> {
            observeOn: ObserveOnSignature<T>;
        }
    }
}
declare module "rxjs/util/not" {
    export function not(pred: Function, thisArg: any): Function;
}
declare module "rxjs/operator/partition" {
    import { Observable } from "rxjs/Observable";
    /**
     * @param predicate
     * @param thisArg
     * @return {Observable<T>[]}
     * @method partition
     * @owner Observable
     */
    export function partition<T>(predicate: (value: T) => boolean, thisArg?: any): [Observable<T>, Observable<T>];
    export interface PartitionSignature<T> {
        (predicate: (value: T) => boolean, thisArg?: any): [Observable<T>, Observable<T>];
    }
}
declare module "rxjs/add/operator/partition" {
    import { PartitionSignature } from "rxjs/operator/partition";
    module "rxjs/Observable" {
        interface Observable<T> {
            partition: PartitionSignature<T>;
        }
    }
}
declare module "rxjs/operator/pluck" {
    import { Observable } from "rxjs/Observable";
    /**
     * Retrieves the value of a specified nested property from all elements in
     * the Observable sequence. If a property can't be resolved, it will return
     * `undefined` for that value.
     *
     * @param {...args} properties the nested properties to pluck
     * @return {Observable} Returns a new Observable sequence of property values
     * @method pluck
     * @owner Observable
     */
    export function pluck<R>(...properties: string[]): Observable<R>;
    export interface PluckSignature<T> {
        <R>(...properties: string[]): Observable<R>;
    }
}
declare module "rxjs/add/operator/pluck" {
    import { PluckSignature } from "rxjs/operator/pluck";
    module "rxjs/Observable" {
        interface Observable<T> {
            pluck: PluckSignature<T>;
        }
    }
}
declare module "rxjs/operator/publish" {
    import { ConnectableObservable } from "rxjs/observable/ConnectableObservable";
    /**
     * Returns a ConnectableObservable, which is a variety of Observable that waits until its connect method is called
     * before it begins emitting items to those Observers that have subscribed to it.
     *
     * <img src="./img/publish.png" width="100%">
     *
     * @return a ConnectableObservable that upon connection causes the source Observable to emit items to its Observers.
     * @method publish
     * @owner Observable
     */
    export function publish<T>(): ConnectableObservable<T>;
    export interface PublishSignature<T> {
        (): ConnectableObservable<T>;
    }
}
declare module "rxjs/add/operator/publish" {
    import { PublishSignature } from "rxjs/operator/publish";
    module "rxjs/Observable" {
        interface Observable<T> {
            publish: PublishSignature<T>;
        }
    }
}
declare module "rxjs/subject/BehaviorSubject" {
    import { Subject } from "rxjs/Subject";
    import { Subscriber } from "rxjs/Subscriber";
    import { Subscription } from "rxjs/Subscription";
    /**
     * @class BehaviorSubject<T>
     */
    export class BehaviorSubject<T> extends Subject<T> {
        private _value;
        constructor(_value: T);
        getValue(): T;
        value: T;
        protected _subscribe(subscriber: Subscriber<T>): Subscription | Function | void;
        protected _next(value: T): void;
        protected _error(err: any): void;
    }
}
declare module "rxjs/operator/publishBehavior" {
    import { ConnectableObservable } from "rxjs/observable/ConnectableObservable";
    /**
     * @param value
     * @return {ConnectableObservable<T>}
     * @method publishBehavior
     * @owner Observable
     */
    export function publishBehavior<T>(value: T): ConnectableObservable<T>;
    export interface PublishBehaviorSignature<T> {
        (value: T): ConnectableObservable<T>;
    }
}
declare module "rxjs/add/operator/publishBehavior" {
    import { PublishBehaviorSignature } from "rxjs/operator/publishBehavior";
    module "rxjs/Observable" {
        interface Observable<T> {
            publishBehavior: PublishBehaviorSignature<T>;
        }
    }
}
declare module "rxjs/add/operator/publishReplay" {
    import { PublishReplaySignature } from "rxjs/operator/publishReplay";
    module "rxjs/Observable" {
        interface Observable<T> {
            publishReplay: PublishReplaySignature<T>;
        }
    }
}
declare module "rxjs/operator/publishLast" {
    import { ConnectableObservable } from "rxjs/observable/ConnectableObservable";
    /**
     * @return {ConnectableObservable<T>}
     * @method publishLast
     * @owner Observable
     */
    export function publishLast<T>(): ConnectableObservable<T>;
    export interface PublishLastSignature<T> {
        (): ConnectableObservable<T>;
    }
}
declare module "rxjs/add/operator/publishLast" {
    import { PublishLastSignature } from "rxjs/operator/publishLast";
    module "rxjs/Observable" {
        interface Observable<T> {
            publishLast: PublishLastSignature<T>;
        }
    }
}
declare module "rxjs/add/operator/race" {
    import { RaceSignature } from "rxjs/operator/race";
    module "rxjs/Observable" {
        interface Observable<T> {
            race: RaceSignature<T>;
        }
    }
}
declare module "rxjs/operator/reduce" {
    import { Observable } from "rxjs/Observable";
    import { Operator } from "rxjs/Operator";
    import { Subscriber } from "rxjs/Subscriber";
    /**
     * Returns an Observable that applies a specified accumulator function to the first item emitted by a source Observable,
     * then feeds the result of that function along with the second item emitted by the source Observable into the same
     * function, and so on until all items have been emitted by the source Observable, and emits the final result from
     * the final call to your function as its sole item.
     * This technique, which is called "reduce" here, is sometimes called "aggregate," "fold," "accumulate," "compress," or
     * "inject" in other programming contexts.
     *
     * <img src="./img/reduce.png" width="100%">
     *
     * @param {initialValue} the initial (seed) accumulator value
     * @param {accumulator} an accumulator function to be invoked on each item emitted by the source Observable, the
     * result of which will be used in the next accumulator call.
     * @return {Observable} an Observable that emits a single item that is the result of accumulating the output from the
     * items emitted by the source Observable.
     * @method reduce
     * @owner Observable
     */
    export function reduce<T, R>(project: (acc: R, value: T) => R, seed?: R): Observable<R>;
    export interface ReduceSignature<T> {
        <R>(project: (acc: R, value: T) => R, seed?: R): Observable<R>;
    }
    export class ReduceOperator<T, R> implements Operator<T, R> {
        private project;
        private seed;
        constructor(project: (acc: R, value: T) => R, seed?: R);
        call(subscriber: Subscriber<R>): Subscriber<T>;
    }
    export class ReduceSubscriber<T, R> extends Subscriber<T> {
        acc: T | R;
        hasSeed: boolean;
        hasValue: boolean;
        project: (acc: R, value: T) => R;
        constructor(destination: Subscriber<R>, project: (acc: R, value: T) => R, seed?: R);
        protected _next(value: T): void;
        private _tryReduce(value);
        protected _complete(): void;
    }
}
declare module "rxjs/add/operator/reduce" {
    import { ReduceSignature } from "rxjs/operator/reduce";
    module "rxjs/Observable" {
        interface Observable<T> {
            reduce: ReduceSignature<T>;
        }
    }
}
declare module "rxjs/operator/repeat" {
    import { Observable } from "rxjs/Observable";
    /**
     * Returns an Observable that repeats the stream of items emitted by the source Observable at most count times,
     * on a particular Scheduler.
     *
     * <img src="./img/repeat.png" width="100%">
     *
     * @param {Scheduler} [scheduler] the Scheduler to emit the items on.
     * @param {number} [count] the number of times the source Observable items are repeated, a count of 0 will yield
     * an empty Observable.
     * @return {Observable} an Observable that repeats the stream of items emitted by the source Observable at most
     * count times.
     * @method repeat
     * @owner Observable
     */
    export function repeat<T>(count?: number): Observable<T>;
    export interface RepeatSignature<T> {
        (count?: number): Observable<T>;
    }
}
declare module "rxjs/add/operator/repeat" {
    import { RepeatSignature } from "rxjs/operator/repeat";
    module "rxjs/Observable" {
        interface Observable<T> {
            repeat: RepeatSignature<T>;
        }
    }
}
declare module "rxjs/operator/retry" {
    import { Observable } from "rxjs/Observable";
    /**
     * Returns an Observable that mirrors the source Observable, resubscribing to it if it calls `error` and the
     * predicate returns true for that specific exception and retry count.
     * If the source Observable calls `error`, this method will resubscribe to the source Observable for a maximum of
     * count resubscriptions (given as a number parameter) rather than propagating the `error` call.
     *
     * <img src="./img/retry.png" width="100%">
     *
     * Any and all items emitted by the source Observable will be emitted by the resulting Observable, even those emitted
     * during failed subscriptions. For example, if an Observable fails at first but emits [1, 2] then succeeds the second
     * time and emits: [1, 2, 3, 4, 5] then the complete stream of emissions and notifications
     * would be: [1, 2, 1, 2, 3, 4, 5, `complete`].
     * @param {number} number of retry attempts before failing.
     * @return {Observable} the source Observable modified with the retry logic.
     * @method retry
     * @owner Observable
     */
    export function retry<T>(count?: number): Observable<T>;
    export interface RetrySignature<T> {
        (count?: number): Observable<T>;
    }
}
declare module "rxjs/add/operator/retry" {
    import { RetrySignature } from "rxjs/operator/retry";
    module "rxjs/Observable" {
        interface Observable<T> {
            retry: RetrySignature<T>;
        }
    }
}
declare module "rxjs/operator/retryWhen" {
    import { Observable } from "rxjs/Observable";
    /**
     * Returns an Observable that emits the same values as the source observable with the exception of an `error`.
     * An `error` will cause the emission of the Throwable that cause the error to the Observable returned from
     * notificationHandler. If that Observable calls onComplete or `error` then retry will call `complete` or `error`
     * on the child subscription. Otherwise, this Observable will resubscribe to the source observable, on a particular
     * Scheduler.
     *
     * <img src="./img/retryWhen.png" width="100%">
     *
     * @param {notificationHandler} receives an Observable of notifications with which a user can `complete` or `error`,
     * aborting the retry.
     * @param {scheduler} the Scheduler on which to subscribe to the source Observable.
     * @return {Observable} the source Observable modified with retry logic.
     * @method retryWhen
     * @owner Observable
     */
    export function retryWhen<T>(notifier: (errors: Observable<any>) => Observable<any>): Observable<T>;
    export interface RetryWhenSignature<T> {
        (notifier: (errors: Observable<any>) => Observable<any>): Observable<T>;
    }
}
declare module "rxjs/add/operator/retryWhen" {
    import { RetryWhenSignature } from "rxjs/operator/retryWhen";
    module "rxjs/Observable" {
        interface Observable<T> {
            retryWhen: RetryWhenSignature<T>;
        }
    }
}
declare module "rxjs/operator/sample" {
    import { Observable } from "rxjs/Observable";
    /**
     * Returns an Observable that, when the specified sampler Observable emits an item or completes, it then emits the most
     * recently emitted item (if any) emitted by the source Observable since the previous emission from the sampler
     * Observable.
     *
     * <img src="./img/sample.png" width="100%">
     *
     * @param {Observable} sampler - the Observable to use for sampling the source Observable.
     * @return {Observable<T>} an Observable that emits the results of sampling the items emitted by this Observable
     * whenever the sampler Observable emits an item or completes.
     * @method sample
     * @owner Observable
     */
    export function sample<T>(notifier: Observable<any>): Observable<T>;
    export interface SampleSignature<T> {
        (notifier: Observable<any>): Observable<T>;
    }
}
declare module "rxjs/add/operator/sample" {
    import { SampleSignature } from "rxjs/operator/sample";
    module "rxjs/Observable" {
        interface Observable<T> {
            sample: SampleSignature<T>;
        }
    }
}
declare module "rxjs/operator/sampleTime" {
    import { Observable } from "rxjs/Observable";
    import { Scheduler } from "rxjs/Scheduler";
    /**
     * @param delay
     * @param scheduler
     * @return {Observable<R>|WebSocketSubject<T>|Observable<T>}
     * @method sampleTime
     * @owner Observable
     */
    export function sampleTime<T>(delay: number, scheduler?: Scheduler): Observable<T>;
    export interface SampleTimeSignature<T> {
        (delay: number, scheduler?: Scheduler): Observable<T>;
    }
}
declare module "rxjs/add/operator/sampleTime" {
    import { SampleTimeSignature } from "rxjs/operator/sampleTime";
    module "rxjs/Observable" {
        interface Observable<T> {
            sampleTime: SampleTimeSignature<T>;
        }
    }
}
declare module "rxjs/operator/scan" {
    import { Observable } from "rxjs/Observable";
    /**
     * Returns an Observable that applies a specified accumulator function to each item emitted by the source Observable.
     * If a seed value is specified, then that value will be used as the initial value for the accumulator.
     * If no seed value is specified, the first item of the source is used as the seed.
     * @param {function} accumulator The accumulator function called on each item.
     *
     * <img src="./img/scan.png" width="100%">
     *
     * @param {any} [seed] The initial accumulator value.
     * @return {Obervable} An observable of the accumulated values.
     * @method scan
     * @owner Observable
     */
    export function scan<T, R>(accumulator: (acc: R, value: T) => R, seed?: T | R): Observable<R>;
    export interface ScanSignature<T> {
        <R>(accumulator: (acc: R, value: T) => R, seed?: T | R): Observable<R>;
    }
}
declare module "rxjs/add/operator/scan" {
    import { ScanSignature } from "rxjs/operator/scan";
    module "rxjs/Observable" {
        interface Observable<T> {
            scan: ScanSignature<T>;
        }
    }
}
declare module "rxjs/operator/share" {
    import { Observable } from "rxjs/Observable";
    /**
     * Returns a new Observable that multicasts (shares) the original Observable. As long as there is at least one
     * Subscriber this Observable will be subscribed and emitting data. When all subscribers have unsubscribed it will
     * unsubscribe from the source Observable. Because the Observable is multicasting it makes the stream `hot`.
     * This is an alias for .publish().refCount().
     *
     * <img src="./img/share.png" width="100%">
     *
     * @return {Observable<T>} an Observable that upon connection causes the source Observable to emit items to its Observers
     * @method share
     * @owner Observable
     */
    export function share<T>(): Observable<T>;
    export interface ShareSignature<T> {
        (): Observable<T>;
    }
}
declare module "rxjs/add/operator/share" {
    import { ShareSignature } from "rxjs/operator/share";
    module "rxjs/Observable" {
        interface Observable<T> {
            share: ShareSignature<T>;
        }
    }
}
declare module "rxjs/operator/single" {
    import { Observable } from "rxjs/Observable";
    /**
     * Returns an Observable that emits the single item emitted by the source Observable that matches a specified
     * predicate, if that Observable emits one such item. If the source Observable emits more than one such item or no
     * such items, notify of an IllegalArgumentException or NoSuchElementException respectively.
     *
     * <img src="./img/single.png" width="100%">
     *
     * @param {Function} a predicate function to evaluate items emitted by the source Observable.
     * @return {Observable<T>} an Observable that emits the single item emitted by the source Observable that matches
     * the predicate.
     .
     * @method single
     * @owner Observable
     */
    export function single<T>(predicate?: (value: T, index: number, source: Observable<T>) => boolean): Observable<T>;
    export interface SingleSignature<T> {
        (predicate?: (value: T, index: number, source: Observable<T>) => boolean): Observable<T>;
    }
}
declare module "rxjs/add/operator/single" {
    import { SingleSignature } from "rxjs/operator/single";
    module "rxjs/Observable" {
        interface Observable<T> {
            single: SingleSignature<T>;
        }
    }
}
declare module "rxjs/operator/skip" {
    import { Observable } from "rxjs/Observable";
    /**
     * Returns an Observable that skips `n` items emitted by an Observable.
     *
     * <img src="./img/skip.png" width="100%">
     *
     * @param {Number} the `n` of times, items emitted by source Observable should be skipped.
     * @return {Observable} an Observable that skips values emitted by the source Observable.
     *
     * @method skip
     * @owner Observable
     */
    export function skip<T>(total: number): Observable<T>;
    export interface SkipSignature<T> {
        (total: number): Observable<T>;
    }
}
declare module "rxjs/add/operator/skip" {
    import { SkipSignature } from "rxjs/operator/skip";
    module "rxjs/Observable" {
        interface Observable<T> {
            skip: SkipSignature<T>;
        }
    }
}
declare module "rxjs/operator/skipUntil" {
    import { Observable } from "rxjs/Observable";
    /**
     * Returns an Observable that skips items emitted by the source Observable until a second Observable emits an item.
     *
     * <img src="./img/skipUntil.png" width="100%">
     *
     * @param {Observable} the second Observable that has to emit an item before the source Observable's elements begin to
     * be mirrored by the resulting Observable.
     * @return {Observable<T>} an Observable that skips items from the source Observable until the second Observable emits
     * an item, then emits the remaining items.
     * @method skipUntil
     * @owner Observable
     */
    export function skipUntil<T>(notifier: Observable<any>): Observable<T>;
    export interface SkipUntilSignature<T> {
        (notifier: Observable<any>): Observable<T>;
    }
}
declare module "rxjs/add/operator/skipUntil" {
    import { SkipUntilSignature } from "rxjs/operator/skipUntil";
    module "rxjs/Observable" {
        interface Observable<T> {
            skipUntil: SkipUntilSignature<T>;
        }
    }
}
declare module "rxjs/operator/skipWhile" {
    import { Observable } from "rxjs/Observable";
    /**
     * Returns an Observable that skips all items emitted by the source Observable as long as a specified condition holds
     * true, but emits all further source items as soon as the condition becomes false.
     *
     * <img src="./img/skipWhile.png" width="100%">
     *
     * @param {Function} predicate - a function to test each item emitted from the source Observable.
     * @return {Observable<T>} an Observable that begins emitting items emitted by the source Observable when the
     * specified predicate becomes false.
     * @method skipWhile
     * @owner Observable
     */
    export function skipWhile<T>(predicate: (value: T, index: number) => boolean): Observable<T>;
    export interface SkipWhileSignature<T> {
        (predicate: (value: T, index: number) => boolean): Observable<T>;
    }
}
declare module "rxjs/add/operator/skipWhile" {
    import { SkipWhileSignature } from "rxjs/operator/skipWhile";
    module "rxjs/Observable" {
        interface Observable<T> {
            skipWhile: SkipWhileSignature<T>;
        }
    }
}
declare module "rxjs/operator/startWith" {
    import { Scheduler } from "rxjs/Scheduler";
    import { Observable } from "rxjs/Observable";
    /**
     * Returns an Observable that emits the items in a specified Iterable before it begins to emit items emitted by the
     * source Observable.
     *
     * <img src="./img/startWith.png" width="100%">
     *
     * @param {Values} an Iterable that contains the items you want the modified Observable to emit first.
     * @return {Observable} an Observable that emits the items in the specified Iterable and then emits the items
     * emitted by the source Observable.
     * @method startWith
     * @owner Observable
     */
    export function startWith<T>(...array: Array<T | Scheduler>): Observable<T>;
    export interface StartWithSignature<T> {
        (v1: T, scheduler?: Scheduler): Observable<T>;
        (v1: T, v2: T, scheduler?: Scheduler): Observable<T>;
        (v1: T, v2: T, v3: T, scheduler?: Scheduler): Observable<T>;
        (v1: T, v2: T, v3: T, v4: T, scheduler?: Scheduler): Observable<T>;
        (v1: T, v2: T, v3: T, v4: T, v5: T, scheduler?: Scheduler): Observable<T>;
        (v1: T, v2: T, v3: T, v4: T, v5: T, v6: T, scheduler?: Scheduler): Observable<T>;
        (...array: Array<T | Scheduler>): Observable<T>;
    }
}
declare module "rxjs/add/operator/startWith" {
    import { StartWithSignature } from "rxjs/operator/startWith";
    module "rxjs/Observable" {
        interface Observable<T> {
            startWith: StartWithSignature<T>;
        }
    }
}
declare module "rxjs/util/Immediate" {
    export class ImmediateDefinition {
        private root;
        setImmediate: (cb: () => void) => number;
        clearImmediate: (handle: number) => void;
        private identify(o);
        tasksByHandle: any;
        nextHandle: number;
        currentlyRunningATask: boolean;
        constructor(root: any);
        canUseProcessNextTick(): boolean;
        canUseMessageChannel(): boolean;
        canUseReadyStateChange(): boolean;
        canUsePostMessage(): boolean;
        partiallyApplied(handler: any, ...args: any[]): () => void;
        addFromSetImmediateArguments(args: any[]): number;
        createProcessNextTickSetImmediate(): () => any;
        createPostMessageSetImmediate(): () => any;
        runIfPresent(handle: any): void;
        createMessageChannelSetImmediate(): () => any;
        createReadyStateChangeSetImmediate(): () => any;
        createSetTimeoutSetImmediate(): () => any;
    }
    export const Immediate: ImmediateDefinition;
}
declare module "rxjs/scheduler/AsapAction" {
    import { Action } from "rxjs/scheduler/Action";
    import { FutureAction } from "rxjs/scheduler/FutureAction";
    export class AsapAction<T> extends FutureAction<T> {
        protected _schedule(state?: T, delay?: number): Action;
        protected _unsubscribe(): void;
    }
}
declare module "rxjs/scheduler/AsapScheduler" {
    import { Action } from "rxjs/scheduler/Action";
    import { Subscription } from "rxjs/Subscription";
    import { QueueScheduler } from "rxjs/scheduler/QueueScheduler";
    export class AsapScheduler extends QueueScheduler {
        scheduleNow<T>(work: (x?: T) => Subscription, state?: T): Action;
    }
}
declare module "rxjs/scheduler/asap" {
    import { AsapScheduler } from "rxjs/scheduler/AsapScheduler";
    export const asap: AsapScheduler;
}
declare module "rxjs/observable/SubscribeOnObservable" {
    import { Scheduler } from "rxjs/Scheduler";
    import { Subscriber } from "rxjs/Subscriber";
    import { Subscription } from "rxjs/Subscription";
    import { Observable } from "rxjs/Observable";
    /**
     * We need this JSDoc comment for affecting ESDoc.
     * @extends {Ignored}
     * @hide true
     */
    export class SubscribeOnObservable<T> extends Observable<T> {
        source: Observable<T>;
        private delayTime;
        private scheduler;
        static create<T>(source: Observable<T>, delay?: number, scheduler?: Scheduler): Observable<T>;
        static dispatch<T>({source, subscriber}: {
            source: any;
            subscriber: any;
        }): Subscription;
        constructor(source: Observable<T>, delayTime?: number, scheduler?: Scheduler);
        protected _subscribe(subscriber: Subscriber<T>): Subscription;
    }
}
declare module "rxjs/operator/subscribeOn" {
    import { Scheduler } from "rxjs/Scheduler";
    import { Observable } from "rxjs/Observable";
    /**
     * Asynchronously subscribes Observers to this Observable on the specified Scheduler.
     *
     * <img src="./img/subscribeOn.png" width="100%">
     *
     * @param {Scheduler} the Scheduler to perform subscription actions on.
     * @return {Observable<T>} the source Observable modified so that its subscriptions happen on the specified Scheduler
     .
     * @method subscribeOn
     * @owner Observable
     */
    export function subscribeOn<T>(scheduler: Scheduler, delay?: number): Observable<T>;
    export interface SubscribeOnSignature<T> {
        (scheduler: Scheduler, delay?: number): Observable<T>;
    }
}
declare module "rxjs/add/operator/subscribeOn" {
    import { SubscribeOnSignature } from "rxjs/operator/subscribeOn";
    module "rxjs/Observable" {
        interface Observable<T> {
            subscribeOn: SubscribeOnSignature<T>;
        }
    }
}
declare module "rxjs/operator/switch" {
    /**
     * Converts a higher-order Observable into a first-order Observable by only the
     * most recently emitted of those nested Observables.
     *
     * <span class="informal">Flattens an Observable-of-Observables by dropping the
     * previous nested Observable once a new one appears.</span>
     *
     * <img src="./img/switch.png" width="100%">
     *
     * `switch` subscribes to an Observable that emits Observables,
     * also known as a higher-order Observable. Each time it observes one of these
     * emitted nested Observables, the output Observable begins emitting the items
     * emitted by that nested Observable. So far, it behaves like {@link mergeAll}.
     * However, when a new nested Observable is emitted, `switch` stops emitting
     * items from the earlier-emitted nested Observable and begins emitting items
     * from the new one. It continues to behave like this for subsequent nested
     * Observables.
     *
     * @example <caption>Rerun an interval Observable on every click event</caption>
     * var clicks = Rx.Observable.fromEvent(document, 'click');
     * // Each click event is mapped to an Observable that ticks every second
     * var higherOrder = clicks.map((ev) => Rx.Observable.interval(1000));
     * var switched = higherOrder.switch();
     * // The outcome is that `switched` is essentially a timer that restarts
     * // on every click. The interval Observables from older clicks do not merge
     * // with the current interval Observable.
     * switched.subscribe(x => console.log(x));
     *
     * @see {@link combineAll}
     * @see {@link concatAll}
     * @see {@link exhaust}
     * @see {@link mergeAll}
     * @see {@link zipAll}
     *
     * @return {Observable<T>} An Observable that emits the items emitted by the
     * Observable most recently emitted by the source Observable.
     * @method switch
     * @name switch
     * @owner Observable
     */
    export function _switch<T>(): T;
    export interface SwitchSignature<T> {
        (): T;
    }
}
declare module "rxjs/add/operator/switch" {
    import { SwitchSignature } from "rxjs/operator/switch";
    module "rxjs/Observable" {
        interface Observable<T> {
            switch: SwitchSignature<T>;
        }
    }
}
declare module "rxjs/operator/switchMap" {
    import { Observable, ObservableInput } from "rxjs/Observable";
    /**
     * Returns a new Observable by applying a function that you supply to each item emitted by the source Observable that
     * returns an Observable, and then emitting the items emitted by the most recently emitted of these Observables.
     *
     * <img src="./img/switchMap.png" width="100%">
     *
     * @param {Observable} a function that, when applied to an item emitted by the source Observable, returns an Observable.
     * @return {Observable} an Observable that emits the items emitted by the Observable returned from applying func to
     * the most recently emitted item emitted by the source Observable.
     * @method switchMap
     * @owner Observable
     */
    export function switchMap<T, I, R>(project: (value: T, index: number) => ObservableInput<I>, resultSelector?: (outerValue: T, innerValue: I, outerIndex: number, innerIndex: number) => R): Observable<R>;
    export interface SwitchMapSignature<T> {
        <R>(project: (value: T, index: number) => ObservableInput<R>): Observable<R>;
        <I, R>(project: (value: T, index: number) => ObservableInput<I>, resultSelector: (outerValue: T, innerValue: I, outerIndex: number, innerIndex: number) => R): Observable<R>;
    }
}
declare module "rxjs/add/operator/switchMap" {
    import { SwitchMapSignature } from "rxjs/operator/switchMap";
    module "rxjs/Observable" {
        interface Observable<T> {
            switchMap: SwitchMapSignature<T>;
        }
    }
}
declare module "rxjs/operator/switchMapTo" {
    import { Observable, ObservableInput } from "rxjs/Observable";
    /**
     * @param observable
     * @param resultSelector
     * @return {Observable<R>|WebSocketSubject<T>|Observable<T>}
     * @method switchMapTo
     * @owner Observable
     */
    export function switchMapTo<T, I, R>(observable: Observable<I>, resultSelector?: (outerValue: T, innerValue: I, outerIndex: number, innerIndex: number) => R): Observable<R>;
    export interface SwitchMapToSignature<T> {
        <R>(observable: ObservableInput<R>): Observable<R>;
        <I, R>(observable: ObservableInput<I>, resultSelector: (outerValue: T, innerValue: I, outerIndex: number, innerIndex: number) => R): Observable<R>;
    }
}
declare module "rxjs/add/operator/switchMapTo" {
    import { SwitchMapToSignature } from "rxjs/operator/switchMapTo";
    module "rxjs/Observable" {
        interface Observable<T> {
            switchMapTo: SwitchMapToSignature<T>;
        }
    }
}
declare module "rxjs/util/ArgumentOutOfRangeError" {
    export class ArgumentOutOfRangeError extends Error {
        constructor();
    }
}
declare module "rxjs/operator/take" {
    import { Observable } from "rxjs/Observable";
    /**
     * @param total
     * @return {any}
     * @method take
     * @owner Observable
     */
    export function take<T>(total: number): Observable<T>;
    export interface TakeSignature<T> {
        (total: number): Observable<T>;
    }
}
declare module "rxjs/add/operator/take" {
    import { TakeSignature } from "rxjs/operator/take";
    module "rxjs/Observable" {
        interface Observable<T> {
            take: TakeSignature<T>;
        }
    }
}
declare module "rxjs/operator/takeLast" {
    import { Observable } from "rxjs/Observable";
    /**
     * @param total
     * @return {any}
     * @method takeLast
     * @owner Observable
     */
    export function takeLast<T>(total: number): Observable<T>;
    export interface TakeLastSignature<T> {
        (total: number): Observable<T>;
    }
}
declare module "rxjs/add/operator/takeLast" {
    import { TakeLastSignature } from "rxjs/operator/takeLast";
    module "rxjs/Observable" {
        interface Observable<T> {
            takeLast: TakeLastSignature<T>;
        }
    }
}
declare module "rxjs/operator/takeUntil" {
    import { Observable } from "rxjs/Observable";
    /**
     * @param notifier
     * @return {Observable<R>|WebSocketSubject<T>|Observable<T>}
     * @method takeUntil
     * @owner Observable
     */
    export function takeUntil<T>(notifier: Observable<any>): Observable<T>;
    export interface TakeUntilSignature<T> {
        (notifier: Observable<any>): Observable<T>;
    }
}
declare module "rxjs/add/operator/takeUntil" {
    import { TakeUntilSignature } from "rxjs/operator/takeUntil";
    module "rxjs/Observable" {
        interface Observable<T> {
            takeUntil: TakeUntilSignature<T>;
        }
    }
}
declare module "rxjs/operator/takeWhile" {
    import { Observable } from "rxjs/Observable";
    /**
     * @param predicate
     * @return {Observable<R>|WebSocketSubject<T>|Observable<T>}
     * @method takeWhile
     * @owner Observable
     */
    export function takeWhile<T>(predicate: (value: T, index: number) => boolean): Observable<T>;
    export interface TakeWhileSignature<T> {
        (predicate: (value: T, index: number) => boolean): Observable<T>;
    }
}
declare module "rxjs/add/operator/takeWhile" {
    import { TakeWhileSignature } from "rxjs/operator/takeWhile";
    module "rxjs/Observable" {
        interface Observable<T> {
            takeWhile: TakeWhileSignature<T>;
        }
    }
}
declare module "rxjs/operator/throttle" {
    import { Observable, SubscribableOrPromise } from "rxjs/Observable";
    /**
     * @param durationSelector
     * @return {Observable<R>|WebSocketSubject<T>|Observable<T>}
     * @method throttle
     * @owner Observable
     */
    export function throttle<T>(durationSelector: (value: T) => SubscribableOrPromise<number>): Observable<T>;
    export interface ThrottleSignature<T> {
        (durationSelector: (value: T) => SubscribableOrPromise<number>): Observable<T>;
    }
}
declare module "rxjs/add/operator/throttle" {
    import { ThrottleSignature } from "rxjs/operator/throttle";
    module "rxjs/Observable" {
        interface Observable<T> {
            throttle: ThrottleSignature<T>;
        }
    }
}
declare module "rxjs/operator/throttleTime" {
    import { Scheduler } from "rxjs/Scheduler";
    import { Observable } from "rxjs/Observable";
    /**
     * @param delay
     * @param scheduler
     * @return {Observable<R>|WebSocketSubject<T>|Observable<T>}
     * @method throttleTime
     * @owner Observable
     */
    export function throttleTime<T>(delay: number, scheduler?: Scheduler): Observable<T>;
    export interface ThrottleTimeSignature<T> {
        (dueTime: number, scheduler?: Scheduler): Observable<T>;
    }
}
declare module "rxjs/add/operator/throttleTime" {
    import { ThrottleTimeSignature } from "rxjs/operator/throttleTime";
    module "rxjs/Observable" {
        interface Observable<T> {
            throttleTime: ThrottleTimeSignature<T>;
        }
    }
}
declare module "rxjs/operator/timeout" {
    import { Scheduler } from "rxjs/Scheduler";
    import { Observable } from "rxjs/Observable";
    /**
     * @param due
     * @param errorToSend
     * @param scheduler
     * @return {Observable<R>|WebSocketSubject<T>|Observable<T>}
     * @method timeout
     * @owner Observable
     */
    export function timeout<T>(due: number | Date, errorToSend?: any, scheduler?: Scheduler): Observable<T>;
    export interface TimeoutSignature<T> {
        (due: number | Date, errorToSend?: any, scheduler?: Scheduler): Observable<T>;
    }
}
declare module "rxjs/add/operator/timeout" {
    import { TimeoutSignature } from "rxjs/operator/timeout";
    module "rxjs/Observable" {
        interface Observable<T> {
            timeout: TimeoutSignature<T>;
        }
    }
}
declare module "rxjs/operator/timeoutWith" {
    import { Scheduler } from "rxjs/Scheduler";
    import { Observable } from "rxjs/Observable";
    /**
     * @param due
     * @param withObservable
     * @param scheduler
     * @return {Observable<R>|WebSocketSubject<T>|Observable<T>}
     * @method timeoutWith
     * @owner Observable
     */
    export function timeoutWith<T, R>(due: number | Date, withObservable: Observable<R>, scheduler?: Scheduler): Observable<T | R>;
    export interface TimeoutWithSignature<T> {
        (due: number | Date, withObservable: Observable<T>, scheduler?: Scheduler): Observable<T>;
        <R>(due: number | Date, withObservable: Observable<R>, scheduler?: Scheduler): Observable<T | R>;
    }
}
declare module "rxjs/add/operator/timeoutWith" {
    import { TimeoutWithSignature } from "rxjs/operator/timeoutWith";
    module "rxjs/Observable" {
        interface Observable<T> {
            timeoutWith: TimeoutWithSignature<T>;
        }
    }
}
declare module "rxjs/operator/toArray" {
    import { Observable } from "rxjs/Observable";
    /**
     * @return {Observable<any[]>|WebSocketSubject<T>|Observable<T>}
     * @method toArray
     * @owner Observable
     */
    export function toArray<T>(): Observable<T[]>;
    export interface ToArraySignature<T> {
        (): Observable<T[]>;
    }
}
declare module "rxjs/add/operator/toArray" {
    import { ToArraySignature } from "rxjs/operator/toArray";
    module "rxjs/Observable" {
        interface Observable<T> {
            toArray: ToArraySignature<T>;
        }
    }
}
declare module "rxjs/operator/toPromise" {
    /**
     * @param PromiseCtor
     * @return {Promise<T>}
     * @method toPromise
     * @owner Observable
     */
    export function toPromise<T>(PromiseCtor?: typeof Promise): Promise<T>;
    export interface ToPromiseSignature<T> {
        (): Promise<T>;
        (PromiseCtor: typeof Promise): Promise<T>;
    }
}
declare module "rxjs/add/operator/toPromise" {
    import { ToPromiseSignature } from "rxjs/operator/toPromise";
    module "rxjs/Observable" {
        interface Observable<T> {
            toPromise: ToPromiseSignature<T>;
        }
    }
}
declare module "rxjs/operator/window" {
    import { Observable } from "rxjs/Observable";
    /**
     * @param closingNotifier
     * @return {Observable<Observable<any>>|WebSocketSubject<T>|Observable<T>}
     * @method window
     * @owner Observable
     */
    export function window<T>(closingNotifier: Observable<any>): Observable<Observable<T>>;
    export interface WindowSignature<T> {
        (closingNotifier: Observable<any>): Observable<Observable<T>>;
    }
}
declare module "rxjs/add/operator/window" {
    import { WindowSignature } from "rxjs/operator/window";
    module "rxjs/Observable" {
        interface Observable<T> {
            window: WindowSignature<T>;
        }
    }
}
declare module "rxjs/operator/windowCount" {
    import { Observable } from "rxjs/Observable";
    /**
     * @param windowSize
     * @param startWindowEvery
     * @return {Observable<Observable<any>>|WebSocketSubject<T>|Observable<T>}
     * @method windowCount
     * @owner Observable
     */
    export function windowCount<T>(windowSize: number, startWindowEvery?: number): Observable<Observable<T>>;
    export interface WindowCountSignature<T> {
        (windowSize: number, startWindowEvery?: number): Observable<Observable<T>>;
    }
}
declare module "rxjs/add/operator/windowCount" {
    import { WindowCountSignature } from "rxjs/operator/windowCount";
    module "rxjs/Observable" {
        interface Observable<T> {
            windowCount: WindowCountSignature<T>;
        }
    }
}
declare module "rxjs/operator/windowTime" {
    import { Observable } from "rxjs/Observable";
    import { Scheduler } from "rxjs/Scheduler";
    /**
     * @param windowTimeSpan
     * @param windowCreationInterval
     * @param scheduler
     * @return {Observable<Observable<any>>|WebSocketSubject<T>|Observable<T>}
     * @method windowTime
     * @owner Observable
     */
    export function windowTime<T>(windowTimeSpan: number, windowCreationInterval?: number, scheduler?: Scheduler): Observable<Observable<T>>;
    export interface WindowTimeSignature<T> {
        (windowTimeSpan: number, windowCreationInterval?: number, scheduler?: Scheduler): Observable<Observable<T>>;
    }
}
declare module "rxjs/add/operator/windowTime" {
    import { WindowTimeSignature } from "rxjs/operator/windowTime";
    module "rxjs/Observable" {
        interface Observable<T> {
            windowTime: WindowTimeSignature<T>;
        }
    }
}
declare module "rxjs/operator/windowToggle" {
    import { Observable } from "rxjs/Observable";
    /**
     * @param openings
     * @param closingSelector
     * @return {Observable<Observable<any>>|WebSocketSubject<T>|Observable<T>}
     * @method windowToggle
     * @owner Observable
     */
    export function windowToggle<T, O>(openings: Observable<O>, closingSelector: (openValue: O) => Observable<any>): Observable<Observable<T>>;
    export interface WindowToggleSignature<T> {
        <O>(openings: Observable<O>, closingSelector: (openValue: O) => Observable<any>): Observable<Observable<T>>;
    }
}
declare module "rxjs/add/operator/windowToggle" {
    import { WindowToggleSignature } from "rxjs/operator/windowToggle";
    module "rxjs/Observable" {
        interface Observable<T> {
            windowToggle: WindowToggleSignature<T>;
        }
    }
}
declare module "rxjs/operator/windowWhen" {
    import { Observable } from "rxjs/Observable";
    /**
     * @param closingSelector
     * @return {Observable<Observable<any>>|WebSocketSubject<T>|Observable<T>}
     * @method windowWhen
     * @owner Observable
     */
    export function windowWhen<T>(closingSelector: () => Observable<any>): Observable<Observable<T>>;
    export interface WindowWhenSignature<T> {
        (closingSelector: () => Observable<any>): Observable<Observable<T>>;
    }
}
declare module "rxjs/add/operator/windowWhen" {
    import { WindowWhenSignature } from "rxjs/operator/windowWhen";
    module "rxjs/Observable" {
        interface Observable<T> {
            windowWhen: WindowWhenSignature<T>;
        }
    }
}
declare module "rxjs/operator/withLatestFrom" {
    import { Observable, ObservableInput } from "rxjs/Observable";
    /**
     * @param {Observable} observables the observables to get the latest values from.
     * @param {Function} [project] optional projection function for merging values together. Receives all values in order
     *  of observables passed. (e.g. `a.withLatestFrom(b, c, (a1, b1, c1) => a1 + b1 + c1)`). If this is not passed, arrays
     *  will be returned.
     * @description merges each value from an observable with the latest values from the other passed observables.
     * All observables must emit at least one value before the resulting observable will emit
     *
     * #### example
     * ```
     * A.withLatestFrom(B, C)
     *
     *  A:     ----a-----------------b---------------c-----------|
     *  B:     ---d----------------e--------------f---------|
     *  C:     --x----------------y-------------z-------------|
     * result: ---([a,d,x])---------([b,e,y])--------([c,f,z])---|
     * ```
     * @method withLatestFrom
     * @owner Observable
     */
    export function withLatestFrom<T, R>(...args: Array<ObservableInput<any> | ((...values: Array<any>) => R)>): Observable<R>;
    export interface WithLatestFromSignature<T> {
        <R>(project: (v1: T) => R): Observable<R>;
        <T2, R>(v2: ObservableInput<T2>, project: (v1: T, v2: T2) => R): Observable<R>;
        <T2, T3, R>(v2: ObservableInput<T2>, v3: ObservableInput<T3>, project: (v1: T, v2: T2, v3: T3) => R): Observable<R>;
        <T2, T3, T4, R>(v2: ObservableInput<T2>, v3: ObservableInput<T3>, v4: ObservableInput<T4>, project: (v1: T, v2: T2, v3: T3, v4: T4) => R): Observable<R>;
        <T2, T3, T4, T5, R>(v2: ObservableInput<T2>, v3: ObservableInput<T3>, v4: ObservableInput<T4>, v5: ObservableInput<T5>, project: (v1: T, v2: T2, v3: T3, v4: T4, v5: T5) => R): Observable<R>;
        <T2, T3, T4, T5, T6, R>(v2: ObservableInput<T2>, v3: ObservableInput<T3>, v4: ObservableInput<T4>, v5: ObservableInput<T5>, v6: ObservableInput<T6>, project: (v1: T, v2: T2, v3: T3, v4: T4, v5: T5, v6: T6) => R): Observable<R>;
        <T2>(v2: ObservableInput<T2>): Observable<[T, T2]>;
        <T2, T3>(v2: ObservableInput<T2>, v3: ObservableInput<T3>): Observable<[T, T2, T3]>;
        <T2, T3, T4>(v2: ObservableInput<T2>, v3: ObservableInput<T3>, v4: ObservableInput<T4>): Observable<[T, T2, T3, T4]>;
        <T2, T3, T4, T5>(v2: ObservableInput<T2>, v3: ObservableInput<T3>, v4: ObservableInput<T4>, v5: ObservableInput<T5>): Observable<[T, T2, T3, T4, T5]>;
        <T2, T3, T4, T5, T6>(v2: ObservableInput<T2>, v3: ObservableInput<T3>, v4: ObservableInput<T4>, v5: ObservableInput<T5>, v6: ObservableInput<T6>): Observable<[T, T2, T3, T4, T5, T6]>;
        <R>(...observables: Array<ObservableInput<any> | ((...values: Array<any>) => R)>): Observable<R>;
        <R>(array: ObservableInput<any>[]): Observable<R>;
        <R>(array: ObservableInput<any>[], project: (...values: Array<any>) => R): Observable<R>;
    }
}
declare module "rxjs/add/operator/withLatestFrom" {
    import { WithLatestFromSignature } from "rxjs/operator/withLatestFrom";
    module "rxjs/Observable" {
        interface Observable<T> {
            withLatestFrom: WithLatestFromSignature<T>;
        }
    }
}
declare module "rxjs/add/operator/zip" {
    import { ZipSignature } from "rxjs/operator/zip";
    module "rxjs/Observable" {
        interface Observable<T> {
            zip: ZipSignature<T>;
        }
    }
}
declare module "rxjs/operator/zipAll" {
    import { Observable } from "rxjs/Observable";
    /**
     * @param project
     * @return {Observable<R>|WebSocketSubject<T>|Observable<T>}
     * @method zipAll
     * @owner Observable
     */
    export function zipAll<T, R>(project?: (...values: Array<any>) => R): Observable<R>;
    export interface ZipAllSignature<T> {
        (): Observable<T[]>;
        <R>(project?: (...values: Array<T>) => R): Observable<R>;
    }
}
declare module "rxjs/add/operator/zipAll" {
    import { ZipAllSignature } from "rxjs/operator/zipAll";
    module "rxjs/Observable" {
        interface Observable<T> {
            zipAll: ZipAllSignature<T>;
        }
    }
}
declare module "rxjs/Rx" { 
    export { Subject } from "rxjs/Subject";
    export { Observable } from "rxjs/Observable";
    import "rxjs/add/observable/bindCallback";
    import "rxjs/add/observable/bindNodeCallback";
    import "rxjs/add/observable/combineLatest";
    import "rxjs/add/observable/concat";
    import "rxjs/add/observable/defer";
    import "rxjs/add/observable/empty";
    import "rxjs/add/observable/forkJoin";
    import "rxjs/add/observable/from";
    import "rxjs/add/observable/fromArray";
    import "rxjs/add/observable/fromEvent";
    import "rxjs/add/observable/fromEventPattern";
    import "rxjs/add/observable/fromPromise";
    import "rxjs/add/observable/interval";
    import "rxjs/add/observable/merge";
    import "rxjs/add/observable/race";
    import "rxjs/add/observable/never";
    import "rxjs/add/observable/of";
    import "rxjs/add/observable/range";
    import "rxjs/add/observable/throw";
    import "rxjs/add/observable/timer";
    import "rxjs/add/observable/zip";
    import "rxjs/add/operator/buffer";
    import "rxjs/add/operator/bufferCount";
    import "rxjs/add/operator/bufferTime";
    import "rxjs/add/operator/bufferToggle";
    import "rxjs/add/operator/bufferWhen";
    import "rxjs/add/operator/cache";
    import "rxjs/add/operator/catch";
    import "rxjs/add/operator/combineAll";
    import "rxjs/add/operator/combineLatest";
    import "rxjs/add/operator/concat";
    import "rxjs/add/operator/concatAll";
    import "rxjs/add/operator/concatMap";
    import "rxjs/add/operator/concatMapTo";
    import "rxjs/add/operator/count";
    import "rxjs/add/operator/dematerialize";
    import "rxjs/add/operator/debounce";
    import "rxjs/add/operator/debounceTime";
    import "rxjs/add/operator/defaultIfEmpty";
    import "rxjs/add/operator/delay";
    import "rxjs/add/operator/delayWhen";
    import "rxjs/add/operator/distinctUntilChanged";
    import "rxjs/add/operator/do";
    import "rxjs/add/operator/expand";
    import "rxjs/add/operator/filter";
    import "rxjs/add/operator/finally";
    import "rxjs/add/operator/first";
    import "rxjs/add/operator/groupBy";
    import "rxjs/add/operator/ignoreElements";
    import "rxjs/add/operator/inspect";
    import "rxjs/add/operator/inspectTime";
    import "rxjs/add/operator/last";
    import "rxjs/add/operator/let";
    import "rxjs/add/operator/every";
    import "rxjs/add/operator/map";
    import "rxjs/add/operator/mapTo";
    import "rxjs/add/operator/materialize";
    import "rxjs/add/operator/merge";
    import "rxjs/add/operator/mergeAll";
    import "rxjs/add/operator/mergeMap";
    import "rxjs/add/operator/mergeMapTo";
    import "rxjs/add/operator/multicast";
    import "rxjs/add/operator/observeOn";
    import "rxjs/add/operator/partition";
    import "rxjs/add/operator/pluck";
    import "rxjs/add/operator/publish";
    import "rxjs/add/operator/publishBehavior";
    import "rxjs/add/operator/publishReplay";
    import "rxjs/add/operator/publishLast";
    import "rxjs/add/operator/race";
    import "rxjs/add/operator/reduce";
    import "rxjs/add/operator/repeat";
    import "rxjs/add/operator/retry";
    import "rxjs/add/operator/retryWhen";
    import "rxjs/add/operator/sample";
    import "rxjs/add/operator/sampleTime";
    import "rxjs/add/operator/scan";
    import "rxjs/add/operator/share";
    import "rxjs/add/operator/single";
    import "rxjs/add/operator/skip";
    import "rxjs/add/operator/skipUntil";
    import "rxjs/add/operator/skipWhile";
    import "rxjs/add/operator/startWith";
    import "rxjs/add/operator/subscribeOn";
    import "rxjs/add/operator/switch";
    import "rxjs/add/operator/switchMap";
    import "rxjs/add/operator/switchMapTo";
    import "rxjs/add/operator/take";
    import "rxjs/add/operator/takeLast";
    import "rxjs/add/operator/takeUntil";
    import "rxjs/add/operator/takeWhile";
    import "rxjs/add/operator/throttle";
    import "rxjs/add/operator/throttleTime";
    import "rxjs/add/operator/timeout";
    import "rxjs/add/operator/timeoutWith";
    import "rxjs/add/operator/toArray";
    import "rxjs/add/operator/toPromise";
    import "rxjs/add/operator/window";
    import "rxjs/add/operator/windowCount";
    import "rxjs/add/operator/windowTime";
    import "rxjs/add/operator/windowToggle";
    import "rxjs/add/operator/windowWhen";
    import "rxjs/add/operator/withLatestFrom";
    import "rxjs/add/operator/zip";
    import "rxjs/add/operator/zipAll";
    export { Operator } from "rxjs/Operator";
    export { Observer } from "rxjs/Observer";
    export { Subscription, UnsubscriptionError } from "rxjs/Subscription";
    export { Subscriber } from "rxjs/Subscriber";
    export { AsyncSubject } from "rxjs/subject/AsyncSubject";
    export { ReplaySubject } from "rxjs/subject/ReplaySubject";
    export { BehaviorSubject } from "rxjs/subject/BehaviorSubject";
    export { ConnectableObservable } from "rxjs/observable/ConnectableObservable";
    export { Notification } from "rxjs/Notification";
    export { EmptyError } from "rxjs/util/EmptyError";
    export { ArgumentOutOfRangeError } from "rxjs/util/ArgumentOutOfRangeError";
    export { ObjectUnsubscribedError } from "rxjs/util/ObjectUnsubscribedError";
    import { AsapScheduler } from "rxjs/scheduler/AsapScheduler";
    import { AsyncScheduler } from "rxjs/scheduler/AsyncScheduler";
    import { QueueScheduler } from "rxjs/scheduler/QueueScheduler";
    var Scheduler: {
        asap: AsapScheduler;
        async: AsyncScheduler;
        queue: QueueScheduler;
    };
    var Symbol: {
        rxSubscriber: any;
        observable: any;
        iterator: any;
    };
    export { Scheduler, Symbol };
}
declare module "rxjs/observable/dom/AjaxObservable" {
    import { Observable } from "rxjs/Observable";
    import { Subscriber } from "rxjs/Subscriber";
    import { Subscription } from "rxjs/Subscription";
    export interface AjaxRequest {
        url?: string;
        body?: any;
        user?: string;
        async?: boolean;
        method: string;
        headers?: Object;
        timeout?: number;
        password?: string;
        hasContent?: boolean;
        crossDomain?: boolean;
        createXHR?: () => XMLHttpRequest;
        progressSubscriber?: Subscriber<any>;
        resultSelector?: <T>(response: AjaxResponse) => T;
        responseType?: string;
    }
    export interface AjaxCreationMethod {
        <T>(urlOrRequest: string | AjaxRequest): Observable<T>;
        get<T>(url: string, resultSelector?: (response: AjaxResponse) => T, headers?: Object): Observable<T>;
        post<T>(url: string, body?: any, headers?: Object): Observable<T>;
        put<T>(url: string, body?: any, headers?: Object): Observable<T>;
        delete<T>(url: string, headers?: Object): Observable<T>;
        getJSON<T, R>(url: string, resultSelector?: (data: T) => R, headers?: Object): Observable<R>;
    }
    export function ajaxGet<T>(url: string, resultSelector?: (response: AjaxResponse) => T, headers?: Object): AjaxObservable<T>;
    export function ajaxPost<T>(url: string, body?: any, headers?: Object): Observable<T>;
    export function ajaxDelete<T>(url: string, headers?: Object): Observable<T>;
    export function ajaxPut<T>(url: string, body?: any, headers?: Object): Observable<T>;
    export function ajaxGetJSON<T, R>(url: string, resultSelector?: (data: T) => R, headers?: Object): Observable<R>;
    /**
     * We need this JSDoc comment for affecting ESDoc.
     * @extends {Ignored}
     * @hide true
     */
    export class AjaxObservable<T> extends Observable<T> {
        /**
         * Creates an observable for an Ajax request with either a request object with
         * url, headers, etc or a string for a URL.
         *
         * @example
         * source = Rx.Observable.ajax('/products');
         * source = Rx.Observable.ajax( url: 'products', method: 'GET' });
         *
         * @param {string|Object} request Can be one of the following:
         *   A string of the URL to make the Ajax call.
         *   An object with the following properties
         *   - url: URL of the request
         *   - body: The body of the request
         *   - method: Method of the request, such as GET, POST, PUT, PATCH, DELETE
         *   - async: Whether the request is async
         *   - headers: Optional headers
         *   - crossDomain: true if a cross domain request, else false
         *   - createXHR: a function to override if you need to use an alternate
         *   XMLHttpRequest implementation.
         *   - resultSelector: a function to use to alter the output value type of
         *   the Observable. Gets {@link AjaxResponse} as an argument.
         * @return {Observable} An observable sequence containing the XMLHttpRequest.
         * @static true
         * @name ajax
         * @owner Observable
        */
        static _create_stub(): void;
        static create: AjaxCreationMethod;
        private request;
        constructor(urlOrRequest: string | AjaxRequest);
        protected _subscribe(subscriber: Subscriber<T>): Subscription | Function | void;
    }
    export class AjaxSubscriber<T> extends Subscriber<Event> {
        request: AjaxRequest;
        private xhr;
        private resultSelector;
        private done;
        constructor(destination: Subscriber<T>, request: AjaxRequest);
        next(e: Event): void;
        private send();
        private serializeBody(body, contentType);
        private setHeaders(xhr, headers);
        private setupEvents(xhr, request);
        unsubscribe(): void;
    }
    /** A normalized AJAX response */
    export class AjaxResponse {
        originalEvent: Event;
        xhr: XMLHttpRequest;
        request: AjaxRequest;
        /** {number} the HTTP status code */
        status: number;
        /** {string|ArrayBuffer|Document|object|any} the response data */
        response: any;
        /** {string} the raw responseText */
        responseText: string;
        /** {string} the responsType (e.g. 'json', 'arraybuffer', or 'xml') */
        responseType: string;
        constructor(originalEvent: Event, xhr: XMLHttpRequest, request: AjaxRequest);
    }
    /** A normalized AJAX error */
    export class AjaxError extends Error {
        /** {XMLHttpRequest} the XHR instance associated with the error */
        xhr: XMLHttpRequest;
        /** {AjaxRequest} the AjaxRequest associated with the error */
        request: AjaxRequest;
        /** {number} the HTTP status code */
        status: number;
        constructor(message: string, xhr: XMLHttpRequest, request: AjaxRequest);
    }
    export class AjaxTimeoutError extends AjaxError {
        constructor(xhr: XMLHttpRequest, request: AjaxRequest);
    }
}
declare module "rxjs/add/observable/dom/ajax" {
    import { AjaxObservable } from "rxjs/observable/dom/AjaxObservable";
    module "rxjs/Observable" {
        namespace Observable {
            let ajax: typeof AjaxObservable.create;
        }
    }
}
declare module "rxjs/util/assign" {
    export const assign: (target: Object, ...sources: Array<Object>) => Object;
}
declare module "rxjs/observable/dom/WebSocketSubject" {
    import { Subject } from "rxjs/Subject";
    import { Subscriber } from "rxjs/Subscriber";
    import { Observable } from "rxjs/Observable";
    import { Operator } from "rxjs/Operator";
    import { Subscription } from "rxjs/Subscription";
    import { Observer } from "rxjs/Observer";
    export interface WebSocketSubjectConfig {
        url: string;
        protocol?: string | Array<string>;
        resultSelector?: <T>(e: MessageEvent) => T;
        openObserver?: Observer<Event>;
        closeObserver?: Observer<CloseEvent>;
        closingObserver?: Observer<void>;
        WebSocketCtor?: {
            new (url: string, protocol?: string | Array<string>): WebSocket;
        };
    }
    /**
     * We need this JSDoc comment for affecting ESDoc.
     * @extends {Ignored}
     * @hide true
     */
    export class WebSocketSubject<T> extends Subject<T> {
        url: string;
        protocol: string | Array<string>;
        socket: WebSocket;
        openObserver: Observer<Event>;
        closeObserver: Observer<CloseEvent>;
        closingObserver: Observer<void>;
        WebSocketCtor: {
            new (url: string, protocol?: string | Array<string>): WebSocket;
        };
        resultSelector(e: MessageEvent): any;
        /**
         * @param urlConfigOrSource
         * @return {WebSocketSubject}
         * @static true
         * @name webSocket
         * @owner Observable
         */
        static create<T>(urlConfigOrSource: string | WebSocketSubjectConfig): WebSocketSubject<T>;
        constructor(urlConfigOrSource: string | WebSocketSubjectConfig | Observable<T>, destination?: Observer<T>);
        lift<R>(operator: Operator<T, R>): WebSocketSubject<T>;
        multiplex(subMsg: () => any, unsubMsg: () => any, messageFilter: (value: T) => boolean): Observable<{}>;
        protected _unsubscribe(): void;
        protected _subscribe(subscriber: Subscriber<T>): Subscription;
    }
}
declare module "rxjs/add/observable/dom/webSocket" {
    import { WebSocketSubject } from "rxjs/observable/dom/WebSocketSubject";
    module "rxjs/Observable" {
        namespace Observable {
            let webSocket: typeof WebSocketSubject.create;
        }
    }
}
declare module "rxjs/util/AnimationFrame" {
    export class RequestAnimationFrameDefinition {
        cancelAnimationFrame: (handle: number) => void;
        requestAnimationFrame: (cb: () => void) => number;
        constructor(root: any);
    }
    export const AnimationFrame: RequestAnimationFrameDefinition;
}
declare module "rxjs/scheduler/AnimationFrameAction" {
    import { Action } from "rxjs/scheduler/Action";
    import { FutureAction } from "rxjs/scheduler/FutureAction";
    export class AnimationFrameAction<T> extends FutureAction<T> {
        protected _schedule(state?: T, delay?: number): Action;
        protected _unsubscribe(): void;
    }
}
declare module "rxjs/scheduler/AnimationFrameScheduler" {
    import { Action } from "rxjs/scheduler/Action";
    import { Subscription } from "rxjs/Subscription";
    import { QueueScheduler } from "rxjs/scheduler/QueueScheduler";
    export class AnimationFrameScheduler extends QueueScheduler {
        scheduleNow<T>(work: (x?: T) => Subscription, state?: T): Action;
    }
}
declare module "rxjs/scheduler/animationFrame" {
    import { AnimationFrameScheduler } from "rxjs/scheduler/AnimationFrameScheduler";
    export const animationFrame: AnimationFrameScheduler;
}
declare module "rxjs/Rx.DOM" {
    export * from "rxjs/Rx";
    import "rxjs/add/observable/dom/ajax";
    import "rxjs/add/observable/dom/webSocket";
    export { AjaxRequest, AjaxResponse, AjaxError, AjaxTimeoutError } from "rxjs/observable/dom/AjaxObservable";
    import { AsapScheduler } from "rxjs/scheduler/AsapScheduler";
    import { AsyncScheduler } from "rxjs/scheduler/AsyncScheduler";
    import { QueueScheduler } from "rxjs/scheduler/QueueScheduler";
    import { AnimationFrameScheduler } from "rxjs/scheduler/AnimationFrameScheduler";
    export var Scheduler: {
        asap: AsapScheduler;
        async: AsyncScheduler;
        queue: QueueScheduler;
        animationFrame: AnimationFrameScheduler;
    };
}
declare module "rxjs/add/observable/if" {
}
declare module "rxjs/observable/UsingObservable" {
    import { Observable } from "rxjs/Observable";
    import { Subscriber } from "rxjs/Subscriber";
    import { Subscription } from "rxjs/Subscription";
    /**
     * We need this JSDoc comment for affecting ESDoc.
     * @extends {Ignored}
     * @hide true
     */
    export class UsingObservable<T> extends Observable<T> {
        private resourceFactory;
        private observableFactory;
        static create<T>(resourceFactory: () => Subscription, observableFactory: (resource: Subscription) => Observable<T>): Observable<T>;
        constructor(resourceFactory: () => Subscription, observableFactory: (resource: Subscription) => Observable<T>);
        protected _subscribe(subscriber: Subscriber<T>): Subscription | Function | void;
    }
}
declare module "rxjs/add/observable/using" {
    import { UsingObservable } from "rxjs/observable/UsingObservable";
    module "rxjs/Observable" {
        namespace Observable {
            let using: typeof UsingObservable.create;
        }
    }
}
declare module "rxjs/operator/distinct" {
    import { Observable } from "rxjs/Observable";
    import { Subscriber } from "rxjs/Subscriber";
    import { OuterSubscriber } from "rxjs/OuterSubscriber";
    import { InnerSubscriber } from "rxjs/InnerSubscriber";
    /**
     * Returns an Observable that emits all items emitted by the source Observable that are distinct by comparison from previous items.
     * If a comparator function is provided, then it will be called for each item to test for whether or not that value should be emitted.
     * If a comparator function is not provided, an equality check is used by default.
     * As the internal HashSet of this operator grows larger and larger, care should be taken in the domain of inputs this operator may see.
     * An optional parameter is also provided such that an Observable can be provided to queue the internal HashSet to flush the values it holds.
     * @param {function} [compare] optional comparison function called to test if an item is distinct from previous items in the source.
     * @param {Observable} [flushes] optional Observable for flushing the internal HashSet of the operator.
     * @return {Observable} an Observable that emits items from the source Observable with distinct values.
     * @method distinct
     * @owner Observable
     */
    export function distinct<T>(compare?: (x: T, y: T) => boolean, flushes?: Observable<any>): Observable<T>;
    export interface DistinctSignature<T> {
        (compare?: (x: T, y: T) => boolean, flushes?: Observable<any>): Observable<T>;
    }
    export class DistinctSubscriber<T> extends OuterSubscriber<T, T> {
        private values;
        constructor(destination: Subscriber<T>, compare: (x: T, y: T) => boolean, flushes: Observable<any>);
        notifyNext(outerValue: T, innerValue: T, outerIndex: number, innerIndex: number, innerSub: InnerSubscriber<T, T>): void;
        notifyError(error: any, innerSub: InnerSubscriber<T, T>): void;
        protected _next(value: T): void;
        private compare(x, y);
    }
}
declare module "rxjs/add/operator/distinct" {
    import { DistinctSignature } from "rxjs/operator/distinct";
    module "rxjs/Observable" {
        interface Observable<T> {
            distinct: DistinctSignature<T>;
        }
    }
}
declare module "rxjs/operator/distinctKey" {
    import { Observable } from "rxjs/Observable";
    /**
     * Returns an Observable that emits all items emitted by the source Observable that are distinct by comparison from previous items,
     * using a property accessed by using the key provided to check if the two items are distinct.
     * If a comparator function is provided, then it will be called for each item to test for whether or not that value should be emitted.
     * If a comparator function is not provided, an equality check is used by default.
     * As the internal HashSet of this operator grows larger and larger, care should be taken in the domain of inputs this operator may see.
     * An optional parameter is also provided such that an Observable can be provided to queue the internal HashSet to flush the values it holds.
     * @param {string} key string key for object property lookup on each item.
     * @param {function} [compare] optional comparison function called to test if an item is distinct from previous items in the source.
     * @param {Observable} [flushes] optional Observable for flushing the internal HashSet of the operator.
     * @return {Observable} an Observable that emits items from the source Observable with distinct values.
     * @method distinctKey
     * @owner Observable
     */
    export function distinctKey<T>(key: string, compare?: (x: T, y: T) => boolean, flushes?: Observable<any>): Observable<T>;
    export interface DistinctKeySignature<T> {
        (key: string): Observable<T>;
        <K>(key: string, compare: (x: K, y: K) => boolean, flushes?: Observable<any>): Observable<T>;
    }
}
declare module "rxjs/add/operator/distinctKey" {
    import { DistinctKeySignature } from "rxjs/operator/distinctKey";
    module "rxjs/Observable" {
        interface Observable<T> {
            distinctKey: DistinctKeySignature<T>;
        }
    }
}
declare module "rxjs/operator/distinctUntilKeyChanged" {
    import { Observable } from "rxjs/Observable";
    /**
     * Returns an Observable that emits all items emitted by the source Observable that are distinct by comparison from the previous item,
     * using a property accessed by using the key provided to check if the two items are distinct.
     * If a comparator function is provided, then it will be called for each item to test for whether or not that value should be emitted.
     * If a comparator function is not provided, an equality check is used by default.
     * @param {string} key string key for object property lookup on each item.
     * @param {function} [compare] optional comparison function called to test if an item is distinct from the previous item in the source.
     * @return {Observable} an Observable that emits items from the source Observable with distinct values based on the key specified.
     * @method distinctUntilKeyChanged
     * @owner Observable
     */
    export function distinctUntilKeyChanged<T>(key: string, compare?: (x: T, y: T) => boolean): Observable<T>;
    export interface DistinctUntilKeyChangedSignature<T> {
        (key: string): Observable<T>;
        <K>(key: string, compare: (x: K, y: K) => boolean): Observable<T>;
    }
}
declare module "rxjs/add/operator/distinctUntilKeyChanged" {
    import { DistinctUntilKeyChangedSignature } from "rxjs/operator/distinctUntilKeyChanged";
    module "rxjs/Observable" {
        interface Observable<T> {
            distinctUntilKeyChanged: DistinctUntilKeyChangedSignature<T>;
        }
    }
}
declare module "rxjs/operator/elementAt" {
    import { Observable } from "rxjs/Observable";
    /**
     * Returns an Observable that emits the item at the specified index in the source Observable.
     * If default is given, missing indices will output this value on next; otherwise, outputs error.
     * @param {number} index the index of the value to be retrieved.
     * @param {any} [defaultValue] the default value returned for missing indices.
     * @return {Observable} an Observable that emits a single item, if it is found. Otherwise, will emit the default value if given.
     * @method elementAt
     * @owner Observable
     */
    export function elementAt<T>(index: number, defaultValue?: T): Observable<T>;
    export interface ElementAtSignature<T> {
        (index: number, defaultValue?: T): Observable<T>;
    }
}
declare module "rxjs/add/operator/elementAt" {
    import { ElementAtSignature } from "rxjs/operator/elementAt";
    module "rxjs/Observable" {
        interface Observable<T> {
            elementAt: ElementAtSignature<T>;
        }
    }
}
declare module "rxjs/operator/exhaust" {
    import { Observable } from "rxjs/Observable";
    /**
     * Returns an Observable that takes a source of observables and propagates the first observable exclusively
     * until it completes before subscribing to the next.
     * Items that come in before the first has exhausted will be dropped.
     * Similar to `concatAll`, but will not hold on to items that come in before the first is exhausted.
     * @return {Observable} an Observable which contains all of the items of the first Observable and following Observables in the source.
     * @method exhaust
     * @owner Observable
     */
    export function exhaust<T>(): Observable<T>;
    export interface SwitchFirstSignature<T> {
        (): T;
    }
}
declare module "rxjs/add/operator/exhaust" {
    import { SwitchFirstSignature } from "rxjs/operator/exhaust";
    module "rxjs/Observable" {
        interface Observable<T> {
            exhaust: SwitchFirstSignature<T>;
        }
    }
}
declare module "rxjs/operator/exhaustMap" {
    import { Observable, ObservableInput } from "rxjs/Observable";
    /**
     * Returns an Observable that applies the given function to each item of the source Observable
     * to create a new Observable, which are then concatenated together to produce a new Observable.
     * @param {function} project function called for each item of the source to produce a new Observable.
     * @param {function} [resultSelector] optional function for then selecting on each inner Observable.
     * @return {Observable} an Observable containing all the projected Observables of each item of the source concatenated together.
     * @method exhaustMap
     * @owner Observable
     */
    export function exhaustMap<T, I, R>(project: (value: T, index: number) => ObservableInput<I>, resultSelector?: (outerValue: T, innerValue: I, outerIndex: number, innerIndex: number) => R): Observable<R>;
    export interface SwitchFirstMapSignature<T> {
        <R>(project: (value: T, index: number) => ObservableInput<R>): Observable<R>;
        <I, R>(project: (value: T, index: number) => ObservableInput<I>, resultSelector: (outerValue: T, innerValue: I, outerIndex: number, innerIndex: number) => R): Observable<R>;
    }
}
declare module "rxjs/add/operator/exhaustMap" {
    import { SwitchFirstMapSignature } from "rxjs/operator/exhaustMap";
    module "rxjs/Observable" {
        interface Observable<T> {
            exhaustMap: SwitchFirstMapSignature<T>;
        }
    }
}
declare module "rxjs/operator/find" {
    import { Observable } from "rxjs/Observable";
    import { Operator } from "rxjs/Operator";
    import { Subscriber } from "rxjs/Subscriber";
    /**
     * Returns an Observable that searches for the first item in the source Observable that
     * matches the specified condition, and returns the first occurrence in the source.
     * @param {function} predicate function called with each item to test for condition matching.
     * @return {Observable} an Observable of the first item that matches the condition.
     * @method find
     * @owner Observable
     */
    export function find<T>(predicate: (value: T, index: number, source: Observable<T>) => boolean, thisArg?: any): Observable<T>;
    export interface FindSignature<T> {
        (predicate: (value: T, index: number, source: Observable<T>) => boolean, thisArg?: any): Observable<T>;
    }
    export class FindValueOperator<T> implements Operator<T, T> {
        private predicate;
        private source;
        private yieldIndex;
        private thisArg;
        constructor(predicate: (value: T, index: number, source: Observable<T>) => boolean, source: Observable<T>, yieldIndex: boolean, thisArg?: any);
        call(observer: Subscriber<T>): Subscriber<T>;
    }
    export class FindValueSubscriber<T> extends Subscriber<T> {
        private predicate;
        private source;
        private yieldIndex;
        private thisArg;
        private index;
        constructor(destination: Subscriber<T>, predicate: (value: T, index: number, source: Observable<T>) => boolean, source: Observable<T>, yieldIndex: boolean, thisArg?: any);
        private notifyComplete(value);
        protected _next(value: T): void;
        protected _complete(): void;
    }
}
declare module "rxjs/add/operator/find" {
    import { FindSignature } from "rxjs/operator/find";
    module "rxjs/Observable" {
        interface Observable<T> {
            find: FindSignature<T>;
        }
    }
}
declare module "rxjs/operator/findIndex" {
    import { Observable } from "rxjs/Observable";
    /**
     * Returns an Observable that searches for the first item in the source Observable that
     * matches the specified condition, and returns the the index of the item in the source.
     * @param {function} predicate function called with each item to test for condition matching.
     * @return {Observable} an Observable of the index of the first item that matches the condition.
     * @method findIndex
     * @owner Observable
     */
    export function findIndex<T>(predicate: (value: T, index: number, source: Observable<T>) => boolean, thisArg?: any): Observable<number>;
    export interface FindIndexSignature<T> {
        (predicate: (value: T, index: number, source: Observable<T>) => boolean, thisArg?: any): Observable<number>;
    }
}
declare module "rxjs/add/operator/findIndex" {
    import { FindIndexSignature } from "rxjs/operator/findIndex";
    module "rxjs/Observable" {
        interface Observable<T> {
            findIndex: FindIndexSignature<T>;
        }
    }
}
declare module "rxjs/operator/isEmpty" {
    import { Observable } from "rxjs/Observable";
    /**
     * If the source Observable is empty it returns an Observable that emits true, otherwise it emits false.
     *
     * <img src="./img/isEmpty.png" width="100%">
     *
     * @return {Observable} an Observable that emits a Boolean.
     * @method isEmpty
     * @owner Observable
     */
    export function isEmpty(): Observable<boolean>;
    export interface IsEmptySignature<T> {
        (): Observable<boolean>;
    }
}
declare module "rxjs/add/operator/isEmpty" {
    import { IsEmptySignature } from "rxjs/operator/isEmpty";
    module "rxjs/Observable" {
        interface Observable<T> {
            isEmpty: IsEmptySignature<T>;
        }
    }
}
declare module "rxjs/operator/max" {
    import { Observable } from "rxjs/Observable";
    /**
     * The Max operator operates on an Observable that emits numbers (or items that can be evaluated as numbers),
     * and when source Observable completes it emits a single item: the item with the largest number.
     *
     * <img src="./img/max.png" width="100%">
     *
     * @param {Function} optional comparer function that it will use instead of its default to compare the value of two
     * items.
     * @return {Observable} an Observable that emits item with the largest number.
     * @method max
     * @owner Observable
     */
    export function max<T>(comparer?: (x: T, y: T) => T): Observable<T>;
    export interface MaxSignature<T> {
        (comparer?: (x: T, y: T) => T): Observable<T>;
    }
}
declare module "rxjs/add/operator/max" {
    import { MaxSignature } from "rxjs/operator/max";
    module "rxjs/Observable" {
        interface Observable<T> {
            max: MaxSignature<T>;
        }
    }
}
declare module "rxjs/operator/mergeScan" {
    import { Operator } from "rxjs/Operator";
    import { Observable } from "rxjs/Observable";
    import { Subscriber } from "rxjs/Subscriber";
    import { Subscription } from "rxjs/Subscription";
    import { OuterSubscriber } from "rxjs/OuterSubscriber";
    import { InnerSubscriber } from "rxjs/InnerSubscriber";
    /**
     * @param project
     * @param seed
     * @param concurrent
     * @return {Observable<R>|WebSocketSubject<T>|Observable<T>}
     * @method mergeScan
     * @owner Observable
     */
    export function mergeScan<T, R>(project: (acc: R, value: T) => Observable<R>, seed: R, concurrent?: number): Observable<R>;
    export interface MergeScanSignature<T> {
        <R>(project: (acc: R, value: T) => Observable<R>, seed: R, concurrent?: number): Observable<R>;
    }
    export class MergeScanOperator<T, R> implements Operator<T, R> {
        private project;
        private seed;
        private concurrent;
        constructor(project: (acc: R, value: T) => Observable<R>, seed: R, concurrent: number);
        call(subscriber: Subscriber<R>): Subscriber<T>;
    }
    export class MergeScanSubscriber<T, R> extends OuterSubscriber<T, R> {
        private project;
        private acc;
        private concurrent;
        private hasValue;
        private hasCompleted;
        private buffer;
        private active;
        protected index: number;
        constructor(destination: Subscriber<R>, project: (acc: R, value: T) => Observable<R>, acc: R, concurrent: number);
        protected _next(value: any): void;
        private _innerSub(ish, value, index);
        protected _complete(): void;
        notifyNext(outerValue: T, innerValue: R, outerIndex: number, innerIndex: number, innerSub: InnerSubscriber<T, R>): void;
        notifyComplete(innerSub: Subscription): void;
    }
}
declare module "rxjs/add/operator/mergeScan" {
    import { MergeScanSignature } from "rxjs/operator/mergeScan";
    module "rxjs/Observable" {
        interface Observable<T> {
            mergeScan: MergeScanSignature<T>;
        }
    }
}
declare module "rxjs/operator/min" {
    import { Observable } from "rxjs/Observable";
    /**
     * The Min operator operates on an Observable that emits numbers (or items that can be evaluated as numbers),
     * and when source Observable completes it emits a single item: the item with the smallest number.
     *
     * <img src="./img/min.png" width="100%">
     *
     * @param {Function} optional comparer function that it will use instead of its default to compare the value of two items.
     * @return {Observable<R>} an Observable that emits item with the smallest number.
     * @method min
     * @owner Observable
     */
    export function min<T>(comparer?: (x: T, y: T) => T): Observable<T>;
    export interface MinSignature<T> {
        (comparer?: (x: T, y: T) => T): Observable<T>;
    }
}
declare module "rxjs/add/operator/min" {
    import { MinSignature } from "rxjs/operator/min";
    module "rxjs/Observable" {
        interface Observable<T> {
            min: MinSignature<T>;
        }
    }
}
declare module "rxjs/operator/pairwise" {
    import { Observable } from "rxjs/Observable";
    /**
     * Returns a new observable that triggers on the second and following inputs.
     * An input that triggers an event will return an pair of [(N - 1)th, Nth].
     * The (N-1)th is stored in the internal state until Nth input occurs.
     *
     * <img src="./img/pairwise.png" width="100%">
     *
     * @return {Observable<R>} an observable of pairs of values.
     * @method pairwise
     * @owner Observable
     */
    export function pairwise<T>(): Observable<[T, T]>;
    export interface PairwiseSignature<T> {
        (): Observable<[T, T]>;
    }
}
declare module "rxjs/add/operator/pairwise" {
    import { PairwiseSignature } from "rxjs/operator/pairwise";
    module "rxjs/Observable" {
        interface Observable<T> {
            pairwise: PairwiseSignature<T>;
        }
    }
}
declare module "rxjs/operator/timeInterval" {
    import { Observable } from "rxjs/Observable";
    import { Scheduler } from "rxjs/Scheduler";
    /**
     * @param scheduler
     * @return {Observable<TimeInterval<any>>|WebSocketSubject<T>|Observable<T>}
     * @method timeInterval
     * @owner Observable
     */
    export function timeInterval<T>(scheduler?: Scheduler): Observable<TimeInterval<T>>;
    export interface TimeIntervalSignature<T> {
        (scheduler?: Scheduler): Observable<TimeInterval<T>>;
    }
    export class TimeInterval<T> {
        value: T;
        interval: number;
        constructor(value: T, interval: number);
    }
}
declare module "rxjs/add/operator/timeInterval" {
    import { TimeIntervalSignature } from "rxjs/operator/timeInterval";
    module "rxjs/Observable" {
        interface Observable<T> {
            timeInterval: TimeIntervalSignature<T>;
        }
    }
}
declare module "rxjs/scheduler/VirtualTimeScheduler" {
    import { Scheduler } from "rxjs/Scheduler";
    import { Subscription } from "rxjs/Subscription";
    import { Action } from "rxjs/scheduler/Action";
    export class VirtualTimeScheduler implements Scheduler {
        actions: Action[];
        active: boolean;
        scheduledId: number;
        index: number;
        sorted: boolean;
        frame: number;
        maxFrames: number;
        protected static frameTimeFactor: number;
        now(): number;
        flush(): void;
        addAction<T>(action: Action): void;
        schedule<T>(work: (x?: T) => Subscription | void, delay?: number, state?: T): Subscription;
    }
}
declare module "rxjs/testing/TestMessage" {
    import { Notification } from "rxjs/Notification";
    export interface TestMessage {
        frame: number;
        notification: Notification<any>;
    }
}
declare module "rxjs/testing/SubscriptionLog" {
    export class SubscriptionLog {
        subscribedFrame: number;
        unsubscribedFrame: number;
        constructor(subscribedFrame: number, unsubscribedFrame?: number);
    }
}
declare module "rxjs/testing/SubscriptionLoggable" {
    import { Scheduler } from "rxjs/Scheduler";
    import { SubscriptionLog } from "rxjs/testing/SubscriptionLog";
    export class SubscriptionLoggable {
        subscriptions: SubscriptionLog[];
        scheduler: Scheduler;
        logSubscribedFrame(): number;
        logUnsubscribedFrame(index: number): void;
    }
}
declare module "rxjs/util/applyMixins" {
    export function applyMixins(derivedCtor: any, baseCtors: any[]): void;
}
declare module "rxjs/testing/ColdObservable" {
    import { Observable } from "rxjs/Observable";
    import { Scheduler } from "rxjs/Scheduler";
    import { TestMessage } from "rxjs/testing/TestMessage";
    import { SubscriptionLog } from "rxjs/testing/SubscriptionLog";
    import { SubscriptionLoggable } from "rxjs/testing/SubscriptionLoggable";
    import { Subscriber } from "rxjs/Subscriber";
    /**
     * We need this JSDoc comment for affecting ESDoc.
     * @ignore
     * @extends {Ignored}
     */
    export class ColdObservable<T> extends Observable<T> implements SubscriptionLoggable {
        messages: TestMessage[];
        subscriptions: SubscriptionLog[];
        scheduler: Scheduler;
        logSubscribedFrame: () => number;
        logUnsubscribedFrame: (index: number) => void;
        constructor(messages: TestMessage[], scheduler: Scheduler);
        scheduleMessages(subscriber: Subscriber<any>): void;
    }
}
declare module "rxjs/testing/HotObservable" {
    import { Subject } from "rxjs/Subject";
    import { Subscriber } from "rxjs/Subscriber";
    import { Subscription } from "rxjs/Subscription";
    import { Scheduler } from "rxjs/Scheduler";
    import { TestMessage } from "rxjs/testing/TestMessage";
    import { SubscriptionLog } from "rxjs/testing/SubscriptionLog";
    import { SubscriptionLoggable } from "rxjs/testing/SubscriptionLoggable";
    /**
     * We need this JSDoc comment for affecting ESDoc.
     * @ignore
     * @extends {Ignored}
     */
    export class HotObservable<T> extends Subject<T> implements SubscriptionLoggable {
        messages: TestMessage[];
        subscriptions: SubscriptionLog[];
        scheduler: Scheduler;
        logSubscribedFrame: () => number;
        logUnsubscribedFrame: (index: number) => void;
        constructor(messages: TestMessage[], scheduler: Scheduler);
        protected _subscribe(subscriber: Subscriber<any>): Subscription | Function | void;
        setup(): void;
    }
}
declare module "rxjs/testing/TestScheduler" {
    import { Observable } from "rxjs/Observable";
    import { VirtualTimeScheduler } from "rxjs/scheduler/VirtualTimeScheduler";
    import { Subject } from "rxjs/Subject";
    import { TestMessage } from "rxjs/testing/TestMessage";
    import { SubscriptionLog } from "rxjs/testing/SubscriptionLog";
    export type observableToBeFn = (marbles: string, values?: any, errorValue?: any) => void;
    export type subscriptionLogsToBeFn = (marbles: string | string[]) => void;
    export class TestScheduler extends VirtualTimeScheduler {
        assertDeepEqual: (actual: any, expected: any) => boolean | void;
        private hotObservables;
        private coldObservables;
        private flushTests;
        constructor(assertDeepEqual: (actual: any, expected: any) => boolean | void);
        createTime(marbles: string): number;
        createColdObservable<T>(marbles: string, values?: any, error?: any): Observable<T>;
        createHotObservable<T>(marbles: string, values?: any, error?: any): Subject<T>;
        private materializeInnerObservable(observable, outerFrame);
        expectObservable(observable: Observable<any>, unsubscriptionMarbles?: string): ({
            toBe: observableToBeFn;
        });
        expectSubscriptions(actualSubscriptionLogs: SubscriptionLog[]): ({
            toBe: subscriptionLogsToBeFn;
        });
        flush(): void;
        static parseMarblesAsSubscriptions(marbles: string): SubscriptionLog;
        static parseMarbles(marbles: string, values?: any, errorValue?: any, materializeInnerObservables?: boolean): TestMessage[];
    }
}
declare module "rxjs/Rx.KitchenSink" {
    export * from "rxjs/Rx";
    import "rxjs/add/observable/if";
    import "rxjs/add/observable/using";
    import "rxjs/add/operator/distinct";
    import "rxjs/add/operator/distinctKey";
    import "rxjs/add/operator/distinctUntilKeyChanged";
    import "rxjs/add/operator/elementAt";
    import "rxjs/add/operator/exhaust";
    import "rxjs/add/operator/exhaustMap";
    import "rxjs/add/operator/find";
    import "rxjs/add/operator/findIndex";
    import "rxjs/add/operator/isEmpty";
    import "rxjs/add/operator/max";
    import "rxjs/add/operator/mergeScan";
    import "rxjs/add/operator/min";
    import "rxjs/add/operator/pairwise";
    import "rxjs/add/operator/timeInterval";
    export { TimeInterval } from "rxjs/operator/timeInterval";
    export { TestScheduler } from "rxjs/testing/TestScheduler";
    export { VirtualTimeScheduler } from "rxjs/scheduler/VirtualTimeScheduler";
}
