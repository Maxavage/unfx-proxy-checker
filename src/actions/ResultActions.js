import { getFilteredProxies } from '../store/selectors/getFilteredProxies';
import { writeFile } from 'fs';
import { remote } from 'electron';
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

    if (!savePath) {
        return;
    }

    writeFile(savePath, getFilteredProxies(getState()).map(item => `${item.ip}:${item.port}`).join('\r\n'), err => {});
};

export const toggleOpen = () => ({
    type: 'TOGGLE_OPEN'
});

export const close = () => ({
    type: 'RESULT_CLOSE'
});

const createCountries = items => {
    let countries = {};

    items.forEach(item => {
        if (countries[item.country.name] == undefined) {
            countries[item.country.name] = {
                state: true,
                count: 1
            };
        } else {
            countries[item.country.name].count++;
        }
    });

    return countries;
};

export const addResult = (items, extra) => ({
    type: 'ADD_RESULT',
    items,
    countries: createCountries(items),
    extra
});

export const toggleAnon = e => ({
    type: 'TOGGLE_ANON',
    anon: e.target.name
});

export const toggleProtocol = e => ({
    type: 'TOGGLE_PROTOCOL',
    protocol: e.target.name
});

export const toggleExtra = e => ({
    type: 'TOGGLE_EXTRA',
    extra: e.target.name
});

export const onSearchInput = e => ({
    type: 'SET_SEARCH',
    value: e.target.value
});

export const toggleCountry = (country, all) => (dispatch, getState) => {
    const { countries } = getState().result;
    const state = countries[country].state;

    if (all) {
        for (let country in countries) {
            countries[country].state = !state;
        }
    } else {
        countries[country].state = !state;
    }

    dispatch({
        type: 'TOGGLE_COUNTRY',
        countries 
    });
};

export const loadMore = () => ({
    type: 'LOAD_MORE'
});
