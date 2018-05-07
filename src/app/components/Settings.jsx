import React from 'react';

class Settings extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <div className="settings">
                <div className="string-two">Settings:</div>
                <div className="inputs">
                    <div className="input-box">
                        <h1>Threads:</h1>
                        <input type="text" onInput={this.props.onInputThreads} defaultValue={this.props.state.threads} />
                    </div>
                    <div className="input-box">
                        <h1>Timeout:</h1>
                        <input type="text" onInput={this.props.onInputTimeout} defaultValue={this.props.state.timeout} />
                    </div>
                </div>
            </div>
        );
    }
}

export default Settings;