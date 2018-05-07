import store from '../store';

export const ActionNewChecking = (dispatch) => {
    store.dispatch({type: 'CLEAR'});
    dispatch();
}