import React from 'react';
import Counter from '../components/Counter';
import { connect } from 'react-redux';
import { stop } from '../actions/CheckingActions';

import '../../public/styles/Checking.postcss';

const Checking = props => (
    <div className={`checking-page ${props.state.isOpened ? 'opened' : ''}`}>
        <Counter { ...props.state.counter } />
        <button onClick={props.stop}>Stop</button>
    </div>
);

const mapStateToProps = state => ({
    state: state.checking
});

const mapDispatchToProps = {
    stop
};

export default connect(mapStateToProps, mapDispatchToProps)(Checking);
