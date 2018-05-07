import React from 'react';
import {connect} from 'react-redux';
import Settings from '../components/Settings';
import InputProxyList from '../components/InputProxyList';
import {ActionCheck} from '../actions/ActionCheck';
import CheckList from '../containers/CheckList';

class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            list: "",
            showCheckList: true,
            done: true,
            settings: {
                threads: 500,
                timeout: 15000
            }
        }
    }

    onInputProxyEvent(e) {
        this.setState({list: e.target.value});
    }

    dispatchOnStartChecking() {
        this.setState({showCheckList: true});
    }

    dispatchOnDoneChecking() {
        this.setState({done: true});
    }

    onInputThreads(e) {
        this.setState({settings:{threads: e.target.value, timeout: this.state.settings.timeout}});
    }

    onInputTimeout(e) {
        this.setState({settings:{threads: this.state.settings.threads, timeout: e.target.value}});
    }

    newChecking() {
        this.setState({showCheckList: false, done: false});
    }

    readFromTxtDispatch(text) {
        this.setState({list: text});
    }

    render() {
        return(
            <div className="content">
                <Settings state={this.state.settings} onInputThreads={this.onInputThreads.bind(this)} onInputTimeout={this.onInputTimeout.bind(this)} />
                <CheckList list={this.props.state.list} counter={this.props.state.count} show={this.state.showCheckList} done={this.state.done} newChecking={this.newChecking.bind(this)}/>
                <InputProxyList onInputEvent={this.onInputProxyEvent.bind(this)} content={this.state.list} load={this.readFromTxtDispatch.bind(this)} />
                <button className="button-two check-button" onClick={() => ActionCheck(this.state.list, {threads: this.state.settings.threads, timeout: this.state.settings.timeout}, this.dispatchOnStartChecking.bind(this), this.dispatchOnDoneChecking.bind(this))}>Check</button>
            </div>
        );
    }
}

export default connect(state => {return {state: state}})(Main);