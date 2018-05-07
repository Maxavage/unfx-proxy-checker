import Checker from '../core/checker';
import {uniq} from '../misc/uniq';
import {ProxyMethods} from '../misc/methods';
import check from "check-types";

const validateOpts = opts => {
    opts.threads = parseInt(opts.threads);
    opts.timeout = parseInt(opts.timeout);

    if(check.inRange(opts.threads, 1, 1000) && check.inRange(opts.timeout, 1000, 60000)){
        return opts;
    }
}

export const ActionCheck = (proxies, opts, dispatchStart, dispatchDone) => {
    const proxyList = uniq(ProxyMethods.primitive(proxies)),
          nextOpts = validateOpts(opts);
    
    if(!nextOpts){
        return;
    }

    if(proxyList.length > 0){
        dispatchStart();
        let checker = new Checker(proxyList, nextOpts);
        checker.check(dispatchDone);
    }
}