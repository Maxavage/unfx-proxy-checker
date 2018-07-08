import React from 'react';
import ReactDOM from 'react-dom';
import Main from './containers/Main';
import store from './store';
import { Provider } from 'react-redux';

const render = (Component) => {
    ReactDOM.render(
    <Provider store={store}>
        <Component />
    </Provider>, 
    document.querySelector('.container'));
}

render(Main);