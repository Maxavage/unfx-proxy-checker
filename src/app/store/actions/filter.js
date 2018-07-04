const getProtocols = protocols => {
    const result = Object.keys(protocols).filter(item => protocols[item]);
    return result.length == 4 ? 'all' : result;
}

const getAnons = anons => {
    const result = Object.keys(anons).filter(item => anons[item]);
    return result.length == 3 ? 'all' : result;
}

const getCountries = countries => {
    const count = Object.keys(countries).length;
    const result = Object.keys(countries).filter(item => countries[item].state);
    return count == result.length ? 'all' : result;
}

export const filter = (options) => {
    const {protocols, anons, countries} = options;

    return {
        type: 'SET_FILTER',
        params: {
            protocols: getProtocols(protocols),
            anons: getAnons(anons),
            countries: getCountries(countries)
        }
    }
}