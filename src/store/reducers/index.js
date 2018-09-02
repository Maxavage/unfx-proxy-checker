import { combineReducers } from 'redux';
import settings from './settings';
import checking from './checking';
import input from './input';
import update from './update';
import result from './result';
import ip from './ip';

const mainReducer = combineReducers({
    settings,
    checking,
    input,
    result,
    ip,
    update
});

export default mainReducer;
