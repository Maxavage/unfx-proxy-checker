import Checker from '../core/checker';
import {uniq} from '../misc/uniq';
import {ProxyMethods, UrlMethods} from '../misc/methods';
import check from 'check-types';
import {saveSettings} from '../settings';

const validateCoreOpts = opts => {
    opts.threads = parseInt(opts.threads);
    opts.timeout = parseInt(opts.timeout);

    if (check.inRange(opts.threads, 1, 1000) && check.inRange(opts.timeout, 1000, 60000)) {
        return opts;
    }

    throw new Error("Min threads 1, Max 1000. Min timeout 1000, Max 60000");
}

const validateJudgeOpts = opts => {
    if (UrlMethods.primitive(opts.usual.url) && UrlMethods.primitive(opts.ssl.url)) {
        return opts;
    }
    
    throw new Error("Judge must be is a URL");
}

const parseInputProxyList = list => {
    try {
        return uniq(ProxyMethods.primitive(list));
    } catch (error) {
        throw new Error("No proxies found");
    }
}

export const ActionCheck = (list, opts, dispatchStart, dispatchDone) => {
    try {
        let proxyList = parseInputProxyList(list),
            coreOpts = validateCoreOpts({
                threads: opts.threads, 
                timeout: opts.timeout
            }),
            judgeOpts = validateJudgeOpts({
                usual: {
                    url: opts.usualJudge,
                    validateString: opts.usualJudgeValidateString
                },
                ssl: {
                    url: opts.sslJudge,
                    validateString: opts.sslJudgeValidateString
                }
            });

        dispatchStart();
        const checker = new Checker(proxyList, coreOpts, judgeOpts);
        checker.check(dispatchDone);

        saveSettings(Object.assign({core: coreOpts, judges: judgeOpts}));
    } catch (error) {
        alert(error);
    }
}