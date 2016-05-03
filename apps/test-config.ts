import * as flux from '../react-framework/exports';
import * as testRF from './test-react-framework/app';
import * as rf1 from './test-react-framework/app1';
import * as rf2 from './test-react-framework/app2';
import * as rf3 from './test-react-framework/app3';
import * as rf4 from './test-react-framework/app4';
import * as rf5 from './test-react-framework/app5';
import * as rf6 from './test-react-framework/app6';
import * as semantic from './test-react-semantic/app';

export function init() {
  flux.Tests.tests = {
    rf1: { descr: 'RF 1', storeAppClass: rf1.AppStore },
    rf2: { descr: 'RF 2', storeAppClass: rf2.AppStore },
    rf3: { descr: 'RF 3', storeAppClass: rf3.AppStore },
    rf4: { descr: 'RF 4', storeAppClass: rf4.AppStore },
    rf5: { descr: 'RF 5', storeAppClass: rf5.AppStore },
    rf6: { descr: 'RF 6', storeAppClass: rf6.AppStore },
    //test1: { descr: 'Test React framework', storeAppClass: testRF.AppStore },
    //test2: { descr: 'Test React Semantic', storeAppClass: semantic.AppStore },
    //test2: { descr: 'Test React framework 2', storeAppClass: testRF.AppStore, resetServer: compl => setTimeout(() => compl(), 1000) }
  };
}