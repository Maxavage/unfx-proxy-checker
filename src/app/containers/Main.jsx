import React from 'react';
import { connect } from 'react-redux';
import Settings from '../components/Settings';
import InputProxyList from '../components/InputProxyList';
import { ActionCheck } from '../actions/ActionCheck';
import CheckList from '../containers/CheckList';
import Update from '../components/Update';

class Main extends React.Component {
    constructor() {
        super();

        this.state = {
            list: '',
            showCheckList: false,
            done: false
        };

        this.settings = React.createRef();
    }

    onInputProxyEvent(e) {
        this.setState({ list: e.target.value });
    }

    dispatchOnStartChecking() {
        this.setState({ showCheckList: true });
    }

    dispatchOnDoneChecking() {
        this.setState({ done: true });
    }

    newChecking(clearEvent) {
        this.setState({ showCheckList: false, done: false }, clearEvent);
    }

    readFromTxtDispatch(text) {
        this.setState({ list: text });
    }

    render() {
        return (
            <div className="content">
                <Update />
                <Settings ref={this.settings} settings={this.props.settings} />
                <CheckList show={this.state.showCheckList} done={this.state.done} newChecking={this.newChecking.bind(this)} />
                <InputProxyList onInputEvent={this.onInputProxyEvent.bind(this)} content={this.state.list} load={this.readFromTxtDispatch.bind(this)} />
                <button className="button-two check-button" onClick={() => ActionCheck(this.state.list, this.settings.current.state, this.dispatchOnStartChecking.bind(this), this.dispatchOnDoneChecking.bind(this))}>Check</button>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    settings: state.settings
});

export default connect(mapStateToProps)(Main);
