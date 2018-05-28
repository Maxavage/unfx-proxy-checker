import store from '../store';

const typeToArray = params => {
    let result = [];

    for(const key in params) {
        if(params[key]){
            result.push(key);
        }
    }

    return result;
}

const anonToArray = typeToArray;

const countryToArray = params => {
    let result = [];

    for(const key in params) {
        if(params[key].state){
            result.push(key);
        }
    }

    return result;
}

export const ActionFilter = params => {
    const {type, anon, countries} = params;
    store.dispatch({type: 'FILTER', params: {type: typeToArray(type), country: countryToArray(countries), anon: anonToArray(anon)}});
}