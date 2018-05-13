import {createStore} from 'redux';
import {getSettings} from './settings';

const initState = Object.assign({
    list: {},
    firstListState: {},
    count: {
        all: 0,
        done: 0,
        http: 0,
        https: 0,
        socks4: 0,
        socks5: 0
    }
}, 
{
    settings: getSettings()
});

let state = (state = initState, action) => {
    switch (action.type) {
        case 'UP_STATUS':
            return Object.assign({}, state, {count: action.count});
        case 'ADD_PROXY':
            return Object.assign({}, state, {list: action.list}, {firstListState: action.list});
        case 'FILTER':
            return Object.assign({}, state, {list: reduce(state.firstListState, action.params)});
        case 'CLEAR':
            return Object.assign({}, initState);
        default:
            return state
      }
}

const reduce = (list, params) => {
    let result = list;

    let reducers = {
        country: function(list, countries){
            for(var i = 0, results = {}; i < countries.length; i++){
                for(var key in list){
                    if(list[key].country == countries[i]){
                        results[key] = list[key];
                    }
                }
            }

            return results;
        },
        type: function(list, types){
            for(var i = 0, results = {}; i < types.length; i++){
                for(var key in list){
                    for(var is = 0; is < list[key].type.length; is++){
                        if(types[i] == list[key].type[is]){
                            results[key] = list[key];
                        }
                    }
                }
            }

            return results;
        },
        anonymity: function(list, anons){
            for(var i = 0, results = {}; i < anons.length; i++){
                for(var key in list){
                    if(list[key].anon.toLowerCase() == anons[i]){
                        results[key] = list[key];
                    }
                }
            }

            return results;
        }
    };

    result = reducers.country(result, params.country);
    result = reducers.type(result, params.type);
    result = reducers.anonymity(result, params.anon);
    return result;
}

let store = createStore(state);

export default store;
