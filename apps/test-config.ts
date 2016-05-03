import * as flux from '../react-framework/exports';
import * as testRF from './test-react-framework/app';
import * as rf1 from './test-react-framework/app1';
import * as rf2 from './test-react-framework/app2';
import * as rf3 from './test-react-framework/app3';
import * as rf4 from './test-react-framework/app4';
import * as rf5 from './test-react-framework/app5';
import * as rf6 from './test-react-framework/app6';
import * as rf7 from './test-react-framework/app7';
import * as semantic from './test-react-semantic/app';

export function init() {
  flux.Tests.tests = {
    rf01: { descr: 'Hallo world', storeAppClass: rf1.AppStore },
    rf02: { descr: 'Router par', storeAppClass: rf2.AppStore },
    rf03: { descr: 'Async route par', storeAppClass: rf3.AppStore },
    rf04: { descr: 'Component\'s $store', storeAppClass: rf4.AppStore },
    rf05: { descr: 'Sync and async action', storeAppClass: rf5.AppStore },
    rf06: { descr: 'Routing: subNavigate', storeAppClass: rf6.AppStore },
    rf07: { descr: 'Combined routing', storeAppClass: rf7.AppStore },
    //test1: { descr: 'Test React framework', storeAppClass: testRF.AppStore },
    //test2: { descr: 'Test React Semantic', storeAppClass: semantic.AppStore },
    //test2: { descr: 'Test React framework 2', storeAppClass: testRF.AppStore, resetServer: compl => setTimeout(() => compl(), 1000) }
  };
}