import core from '../core';
import check from 'check-types';
import { uniq } from '../misc/uniq';
import { findProxies, isURL, isIP } from '../misc/regexes';
import { saveSettings } from '../core/settings';
import { IpLookup } from './IpLookupActions';

const validateOptions = options => {
    options.threads = parseInt(options.threads);
    options.timeout = parseInt(options.timeout);

    if (check.inRange(options.threads, 1, 500) && check.inRange(options.timeout, 1000, 60000)) {
        return options;
    }

    throw new Error('Min threads 1, Max 500. Min timeout 1000, Max 60000');
};

const validateJudges = judges => {
    if (isURL(judges.usual.url) && isURL(judges.ssl.url)) {
        return judges;
    }

    throw new Error('Judge must be is a URL');
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
        const { settings, input } = getState();

        const options = validateOptions({
            threads: settings.threads,
            timeout: settings.timeout,
            retry: settings.retry,
            captureExtraData: settings.captureExtraData,
            captureFullData: settings.captureFullData
        });

        const judges = validateJudges({
            usual: {
                url: settings.usualJudge,
                validateString: settings.usualJudgeValidateString
            },
            ssl: {
                url: settings.sslJudge,
                validateString: settings.sslJudgeValidateString
            }
        });

        const protocols = validateProtocols(settings.protocols);

        const chainCheck = ip => {
            core.start(parseInputProxies(input), options, judges, protocols, ip);
        };

        if (isIP(settings.ip.current)) {
            chainCheck(settings.ip.current);
        } else {
            dispatch(IpLookup(chainCheck.bind(this)));
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

export const stop = () => () => {
    core.stop();
};

export const toggleOpen = () => ({
    type: 'TOGGLE_CHECKING_OPEN'
});

export const upCounterStatus = counter => ({
    type: 'UP_COUNTER_STATUS',
    counter
});
