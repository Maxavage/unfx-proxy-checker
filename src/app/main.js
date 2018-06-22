import React from 'react';
import ReactDOM from 'react-dom';
import Main from './containers/Main';
import Footer from './components/Footer';
import store from './store';
import {Provider} from 'react-redux';

class Index extends React.Component {
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

ReactDOM.render(
    <Footer />, 
    document.querySelector(".footer")
);