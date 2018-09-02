import { createSelector } from 'reselect';

const getItems = state => state.result.items;

const isKeepAlive = state => state.result.extra.keepAlive;

const getProtocols = state => {
    const protocols = state.result.protocols;
    const result = Object.keys(protocols).filter(item => protocols[item]);
    
    return result.length == 4 ? 'all' : result;
};

const getAnons = state => {
    const anons = state.result.anons;
    const result = Object.keys(anons).filter(item => anons[item]);
    
    return result.length == 3 ? 'all' : result;
};

const getCountries = state => {
    const countries = state.result.countries;
    const count = Object.keys(countries).length;
    const result = Object.keys(countries).filter(item => countries[item].state);

    return count == result.length ? 'all' : result;
};

const getSearch = state => {
    const input = state.result.search;

    return input.length > 0 ? input.toLowerCase().split(/[\s,]+/).filter(item => item.length > 0) : 'all';
};

const filter = (items, protocols, anons, countries, search, isKeepAlive) => {
    let next = items.filter(
        item =>
            search == 'all' ||
            arrayContainsArray(item.ip, search) ||
            arrayContainsArray(item.port, search) ||
            arrayContainsArray(item.extra.os, search) ||
            arrayContainsArray(item.extra.server, search) ||
            arrayContainsArray(item.country.name.toLowerCase(), search) ||
            arrayContainsArray(item.country.city.toLowerCase(), search)
    )
    .filter(item => protocols == 'all' || arrayContainsArray(protocols, item.protocols))
    .filter(item => anons == 'all' || arrayContainsArray(anons, item.anons))
    .filter(item => countries == 'all' || countries.includes(item.country.name));

    if (isKeepAlive) {
        next = next.filter(item => item.extra.keepAlive);
    }

    return next;
};

const arrayContainsArray = (superset, subset) => {
    if (0 === subset.length || !superset) {
        return false;
    }

    return subset.some(value => superset.indexOf(value) !== -1);
};

export const getFilteredProxies = createSelector(getItems, getProtocols, getAnons, getCountries, getSearch, isKeepAlive, filter);
