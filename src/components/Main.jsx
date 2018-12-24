import React from 'react';
import Settings from './Settings';
import ProxyInput from '../containers/ProxyInput';
import Checking from '../containers/Checking';
import Overlay from '../containers/Overlay';
import Update from './Update';
import Footer from './Footer';
import Result from '../containers/Result';
import { start } from '../actions/CheckingActions';
import { connect } from 'react-redux';

import '../../public/styles/Main.postcss';
import '../../public/styles/Elements.postcss';

const Main = ({ start }) => (
    <div className="container">
        <div className="main-page-container">
            <div className="main-page-content">
                <Update />
                <Settings />
                <ProxyInput />
                <button className="button check-button" onClick={start}>Check</button>
                <Footer />
            </div>
        </div>
        <Result />
        <Checking />
        <Overlay />
    </div>
);

const mapDispatchToProps = {
    start
};

export default connect(null, mapDispatchToProps)(Main);
