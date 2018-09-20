import Core from '../core';
import Judges from '../core/judges';
import check from 'check-types';
import { uniq } from '../misc/uniq';
import { findProxies, isURL, isIP } from '../misc/regexes';
import { saveSettings } from '../core/settings';
import { IpLookup } from './IpLookupActions';
import { UP_COUNTER_STATUS, TOGGLE_CHECKING_OPEN } from '../constants/ActionTypes';

const validateOptions = options => {
    options.threads = parseInt(options.threads);
    options.timeout = parseInt(options.timeout);

    if (check.inRange(options.threads, 1, 500) && check.inRange(options.timeout, 1000, 60000)) {
        return options;
    }

    throw new Error('Min threads 1, Max 500. Min timeout 1000, Max 60000');
};

const validateJudges = (judges, targetProtocols) => {
    if (targetProtocols.includes('https') && !judges.some(item => item.ssl)) {
        throw new Error('You have no judges for HTTPS');
    }

    if (targetProtocols.some(protocol => ['http', 'socks4', 'socks5'].includes(protocol)) && !judges.some(item => !item.ssl)) {
        throw new Error('You have no judges for HTTP/SOCKS4/SOCKS5');
    }

    if (judges.every(item => isURL(item.url))) {
        return judges;
    }

    throw new Error('Judge URL is not correct');
};

const validateProtocols = protocols => {
    const enabledProtocols = Object.keys(protocols).filter(protocol => protocols[protocol]);

    if (enabledProtocols.length > 0) {
        return enabledProtocols;
    }

    throw new Error('Select protocols');
};

const parseInputProxies = list => {
    try {
        return uniq(findProxies(list));
    } catch (error) {
        throw new Error('No proxies found');
    }
};

export const start = () => async (dispatch, getState) => {
    try {
        const { settings, input, judges, ip } = getState();

        if (judges.locked || ip.locked) {
            return;
        }

        const options = validateOptions({
            threads: settings.threads,
            timeout: settings.timeout,
            retry: settings.retry,
            captureExtraData: settings.captureExtraData,
            captureFullData: settings.captureFullData,
            swapJudges: settings.swapJudges
        });

        const protocols = validateProtocols(settings.protocols);
        const judgesList = validateJudges(settings.judgesList, protocols);
        const proxies = parseInputProxies(input);
        const initJudges = await new Judges({ swap: options.swapJudges, items: judgesList }, protocols);
        const chainCheck = ip => Core.start(proxies, options, initJudges, protocols, ip);

        if (isIP(settings.ip.current)) {
            chainCheck(settings.ip.current);
        } else {
            dispatch(IpLookup(chainCheck));
        }

        saveSettings({
            ...settings,
            ip: {
                lookupUrl: settings.ip.lookupUrl
            }
        });
    } catch (error) {
        alert(error);
    }
};

export const stop = () => () => Core.stop();

export const toggleOpen = () => ({
    type: TOGGLE_CHECKING_OPEN
});

export const upCounterStatus = counter => ({
    type: UP_COUNTER_STATUS,
    counter
});
