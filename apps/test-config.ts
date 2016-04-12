import * as flux from '../react-framework/exports';
import * as testRF from './test-react-framework/app';

export function init() {
  flux.Tests.tests = {
    test1: { descr: 'Test React framework', storeAppClass: testRF.AppStore },
    test2: { descr: 'Test React framework 2', storeAppClass: testRF.AppStore, resetServer: compl => setTimeout(() => compl(), 1000) }
  };
}