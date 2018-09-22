import { combineReducers } from 'redux';
import settings from './settings';
import checking from './checking';
import input from './input';
import update from './update';
import result from './result';
import overlay from './overlay';

const mainReducer = combineReducers({
    settings,
    checking,
    input,
    result,
    overlay,
    update
});

export default mainReducer;
