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
            sslJudgeValidateString: this.props.settings.judges.ssl.validateString,
            checkProtocols: this.props.settings.checkProtocols
        }
    }

    changeInput(e) {
        this.setState({[e.target.name]: e.target.value});
    }

    toggleProtocol(e) {
        this.setState({checkProtocols: {...this.state.checkProtocols, [e.target.name]: !this.state.checkProtocols[e.target.name]}});
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
                                <div className="col col-span-1">
                                    <h1 className="small">Protocols:</h1>
                                    <input type="checkbox" id="http-protocol" className="inp-cbx" style={{display: 'none'}} name="http" checked={this.state.checkProtocols.http} onChange={this.toggleProtocol.bind(this)}/>
                                    <label htmlFor="http-protocol" className="cbx">
                                        <span>
                                            <svg width="12px" height="10px" viewBox="0 0 12 10">
                                                <polyline points="1.5 6 4.5 9 10.5 1"></polyline>
                                            </svg>
                                        </span>
                                        <span>Http</span>
                                    </label>
                                    <input type="checkbox" id="https-protocol" className="inp-cbx" style={{display: 'none'}} name="https" checked={this.state.checkProtocols.https} onChange={this.toggleProtocol.bind(this)}/>
                                    <label htmlFor="https-protocol" className="cbx">
                                        <span>
                                            <svg width="12px" height="10px" viewBox="0 0 12 10">
                                                <polyline points="1.5 6 4.5 9 10.5 1"></polyline>
                                            </svg>
                                        </span>
                                        <span>Https</span>
                                    </label>
                                    <input type="checkbox" id="socks4-protocol" className="inp-cbx" style={{display: 'none'}} name="socks4" checked={this.state.checkProtocols.socks4} onChange={this.toggleProtocol.bind(this)}/>
                                    <label htmlFor="socks4-protocol" className="cbx">
                                        <span>
                                            <svg width="12px" height="10px" viewBox="0 0 12 10">
                                                <polyline points="1.5 6 4.5 9 10.5 1"></polyline>
                                            </svg>
                                        </span>
                                        <span>Socks4</span>
                                    </label>
                                    <input type="checkbox" id="socks5-protocol" className="inp-cbx" style={{display: 'none'}} name="socks5" checked={this.state.checkProtocols.socks5} onChange={this.toggleProtocol.bind(this)}/>
                                    <label htmlFor="socks5-protocol" className="cbx">
                                        <span>
                                            <svg width="12px" height="10px" viewBox="0 0 12 10">
                                                <polyline points="1.5 6 4.5 9 10.5 1"></polyline>
                                            </svg>
                                        </span>
                                        <span>Socks5</span>
                                    </label>
                                </div>
                            </div>
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