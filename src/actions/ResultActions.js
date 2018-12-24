import { getFilteredProxies } from '../store/selectors/getFilteredProxies';
import { writeFile } from 'fs';
import { sort } from 'js-flock';
import { remote } from 'electron';
import {
    SHOW_RESULT,
    TOGGLE_ANON,
    TOGGLE_PROTOCOL,
    TOGGLE_COUNTRY,
    TOGGLE_MISC,
    SET_SEARCH,
    LOAD_MORE,
    RESULT_CLOSE,
    TOGGLE_BLACKLIST,
    SET_COUNTRIES_SHOW,
    SET_MAX_TIMEOUT,
    CHANGE_PORTS_INPUT,
    SET_PORTS_ALLOW,
    RESULT_SORT
} from '../constants/ActionTypes';
import { otherChanges } from './CheckingActions';
import { wait } from '../misc/wait';

const { dialog } = remote;

export const save = () => (dispatch, getState) => {
    let savePath = dialog.showSaveDialog({
        filters: [
            {
                name: 'Text Files',
                extensions: ['txt']
            }
        ]
    });

    if (savePath) {
        writeFile(
            savePath,
            getFilteredProxies(getState())
                .map(item => `${item.ip}:${item.port}`)
                .join('\r\n'),
            () => null
        );
    }
};

export const close = () => ({
    type: RESULT_CLOSE
});

const createCountries = items => {
    let countries = {};
    const res = [];

    items.forEach(item => {
        countries[item.country.name] = (countries[item.country.name] || 0) + 1;
    });

    Object.keys(countries).forEach(item => {
        res.push({
            active: true,
            name: item,
            count: countries[item]
        });
    });

    return sort(res).desc(item => item.count);
};

const createTimeoutRanges = items => {
    const timeouts = items.map(item => item.timeout);

    if (!timeouts.length) {
        return false;
    }

    const ranges = {
        from: Math.min(...timeouts),
        to: Math.max(...timeouts)
    };

    return {
        ranges,
        max: ranges.to
    };
};

export const showResult = result => async dispatch => {
    dispatch({
        type: SHOW_RESULT,
        items: result.items,
        countries: createCountries(result.items),
        inBlacklists: result.inBlacklists,
        timeout: createTimeoutRanges(result.items)
    });

    await wait(300);
    dispatch(otherChanges({ opened: false }));
    await wait(300);
    dispatch(otherChanges({ preparing: false }));
};

export const toggleBlacklist = title => ({
    type: TOGGLE_BLACKLIST,
    title
});

export const toggleAnon = e => ({
    type: TOGGLE_ANON,
    anon: e.target.name
});

export const setCountriesShow = show => ({
    type: SET_COUNTRIES_SHOW,
    show
});

export const hideCountries = () => ({
    type: SET_COUNTRIES_SHOW,
    show: false
});

export const toggleProtocol = e => ({
    type: TOGGLE_PROTOCOL,
    protocol: e.target.name
});

export const toggleMisc = e => ({
    type: TOGGLE_MISC,
    misc: e.target.name
});

export const setMaxTimeout = e => ({
    type: SET_MAX_TIMEOUT,
    timeout: e.target.value
});

export const onSearchInput = e => ({
    type: SET_SEARCH,
    value: e.target.value
});

export const toggleCountry = (name, all, state) => ({
    type: TOGGLE_COUNTRY,
    name,
    all,
    state
});

export const loadMore = () => ({
    type: LOAD_MORE
});

export const changePortsInput = e => ({
    type: CHANGE_PORTS_INPUT,
    input: e.target.value
});

const setPortsAllow = allow => ({
    type: SET_PORTS_ALLOW,
    allow
});

export const allowPorts = () => setPortsAllow(true);
export const disallowPorts = () => setPortsAllow(false);

export const sortResults = by => ({
    type: RESULT_SORT,
    by
});
