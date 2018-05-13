import React from 'react';
import {Tab, Tabs, TabList, TabPanel} from 'react-tabs';

class Settings extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            threads: this.props.settings.core.threads,
            timeout: this.props.settings.core.timeout,
            usualJudge: this.props.settings.judges.usual.url,
            sslJudge: this.props.settings.judges.ssl.url,
            usualJudgeValidateString: this.props.settings.judges.usual.validateString,
            sslJudgeValidateString: this.props.settings.judges.ssl.validateString
        }
    }

    changeInput(e) {
        this.setState({[e.target.name]: e.target.value});
    }

    render() {
        return(
            <div className="settings no-select">
                <Tabs>
                    <TabList>
                        <Tab>Core</Tab>
                        <Tab>Judges</Tab>
                    </TabList>
                    <TabPanel>
                        <div className="inputs">
                            <div className="row">
                                <div className="col col-span-2">
                                    <div className="input-box big">
                                        <h1>Threads:</h1>
                                        <input type="text" name="threads" onChange={this.changeInput.bind(this)} value={this.state.threads} />
                                    </div>
                                </div>
                                <div className="col col-span-2">
                                    <div className="input-box big">
                                        <h1>Timeout:</h1>
                                        <input type="text" name="timeout" onChange={this.changeInput.bind(this)} value={this.state.timeout} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </TabPanel>
                    <TabPanel>
                        <div className="inputs">
                            <div className="row">
                                <div className="col col-span-2">
                                    <div className="input-box big">
                                        <h1>Judge:</h1>
                                        <input type="text" name="usualJudge" onChange={this.changeInput.bind(this)} value={this.state.usualJudge} />
                                        <h1>Validate string:</h1>
                                        <input type="text" name="usualJudgeValidateString" onChange={this.changeInput.bind(this)} value={this.state.usualJudgeValidateString} />
                                    </div>
                                </div>
                                <div className="col col-span-2">
                                    <div className="input-box big">
                                        <h1>Ssl judge:</h1>
                                        <input type="text" name="sslJudge" onChange={this.changeInput.bind(this)} value={this.state.sslJudge} />
                                        <h1>Validate string:</h1>
                                        <input type="text" name="sslJudgeValidateString" onChange={this.changeInput.bind(this)} value={this.state.sslJudgeValidateString} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </TabPanel>
                </Tabs>
            </div>
        );
    }
}

export default Settings;