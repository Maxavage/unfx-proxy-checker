import React from 'react';
import Settings from '../containers/Settings';
import ProxyInput from '../containers/ProxyInput';
import Checking from '../containers/Checking';
import Judges from '../containers/Judges';
import Update from './Update';
import Footer from './Footer';
import Result from '../containers/Result';
import Ip from '../containers/Ip';
import { start } from '../actions/CheckingActions';
import { connect } from 'react-redux';

import '../../public/styles/Main.postcss';

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
        <Checking />
        <Result />
        <Ip />
        <Judges />
    </div>
);

const mapDispatchToProps = {
    start
};

export default connect(null, mapDispatchToProps)(Main);
