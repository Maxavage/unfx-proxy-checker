import {combineReducers} from 'redux';
import settings from './settings';
import counter from './counter';
import list from './list';

const mainReducer = combineReducers({
    settings,
    counter,
    list
});

export default mainReducer;