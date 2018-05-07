import React from 'react';
import ReactDOM from 'react-dom';
import Main from './containers/Main';
import store from './store';
import {Provider} from 'react-redux';

class Index extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <Provider store={store}>
                <Main />
            </Provider>
        );
    }
}

ReactDOM.render(
    <Index />, 
    document.querySelector(".container")
);