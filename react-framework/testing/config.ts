import * as rx from 'rxjs/Rx';
import * as flux from '../flux';
import * as utils from '../../utils/low-utils';
import * as testRF from '../../apps/test-react-framework/app';

export class Test {
  constructor(public descr: string, public storeAppClass: flux.TStoreAppClass, public startUrl?: flux.TRouteActionPar, public resetServer?: (compl: utils.TCallback) => void) { }
}

export var tests: { [id: string]: Test; } = {
  test1: new Test('Test React framework', testRF.AppStore),
  test2: new Test('Test React framework 2', testRF.AppStore, null, compl => setTimeout(() => compl(), 1000))
}