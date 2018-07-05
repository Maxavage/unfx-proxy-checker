import { createSelector } from 'reselect';

const getList = state => state.list.items;
const getOptions = state => state.list.filter;

const filter = (list, options) => {
    const { protocols, anons, countries } = options;

    return list
        .filter(item => protocols == 'all' || arrayContainsArray(protocols, item.protocols))
        .filter(item => anons == 'all' || arrayContainsArray(anons, item.anons))
        .filter(item => countries == 'all' || countries.includes(item.country.name));
};

const arrayContainsArray = (superset, subset) => {
    if (0 === subset.length) {
        return false;
    }

    return subset.every(value => superset.indexOf(value) >= 0);
};

export const getVisibleProxies = createSelector([getList, getOptions], (list, options) => {
    return filter(list, options);
});
