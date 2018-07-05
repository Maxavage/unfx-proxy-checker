import mainReducer from './reducers/';
import { createStore } from 'redux';

const store = createStore(mainReducer);

export default store;
