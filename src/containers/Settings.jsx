import React from 'react';
import { connect } from 'react-redux';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { changeSettings } from '../actions/SettingsActions';
import { IpLookup } from '../actions/IpLookupActions';

import '../../public/styles/Settings.postcss';

const Settings = ({ changeSettings, IpLookup, settings }) => {
    const changeInput = e => {
        changeSettings({ [e.target.name]: e.target.value });
    }

    const toggleCheckbox = e => {
        changeSettings({ [e.target.name]: e.target.checked });
    }

    const toggleProtocol = e => {
        changeSettings({ protocols: { ...settings.protocols, [e.target.name]: e.target.checked } });
    }

    const changeIp = e => {
        changeSettings({ ip: { ...settings.ip, [e.target.name]: e.target.value } });
    }

    const { protocols, threads, timeout, retry, ip, captureFullData, captureExtraData, ...judges } = settings;

    return (
        <div className="settings no-select">
            <Tabs>
                <TabList>
                    <Tab>Core</Tab>
                    <Tab>Judges</Tab>
                    <Tab>Ip</Tab>
                </TabList>
                <TabPanel>
                    <div className="block middle">
                        <h1 className="title">Protocols:</h1>
                        <div className="content no-flex">
                            <input type="checkbox" id="http-protocol" className="inp-cbx" name="http" checked={protocols.http} onChange={toggleProtocol} />
                            <label htmlFor="http-protocol" className="cbx">
                                <span>
                                    <svg width="12px" height="10px" viewBox="0 0 12 10">
                                        <polyline points="1.5 6 4.5 9 10.5 1"></polyline>
                                    </svg>
                                </span>
                                <span>Http</span>
                            </label>
                            <input type="checkbox" id="https-protocol" className="inp-cbx" name="https" checked={protocols.https} onChange={toggleProtocol} />
                            <label htmlFor="https-protocol" className="cbx">
                                <span>
                                    <svg width="12px" height="10px" viewBox="0 0 12 10">
                                        <polyline points="1.5 6 4.5 9 10.5 1"></polyline>
                                    </svg>
                                </span>
                                <span>Https</span>
                            </label>
                            <input type="checkbox" id="socks4-protocol" className="inp-cbx" name="socks4" checked={protocols.socks4} onChange={toggleProtocol} />
                            <label htmlFor="socks4-protocol" className="cbx">
                                <span>
                                    <svg width="12px" height="10px" viewBox="0 0 12 10">
                                        <polyline points="1.5 6 4.5 9 10.5 1"></polyline>
                                    </svg>
                                </span>
                                <span>Socks4</span>
                            </label>
                            <input type="checkbox" id="socks5-protocol" className="inp-cbx" name="socks5" checked={protocols.socks5} onChange={toggleProtocol} />
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
                    <div className="block middle">
                        <h1 className="title">Data capturing:</h1>
                        <div className="content no-flex">
                            <input type="checkbox" id="captureFullData" className="inp-cbx" name="captureFullData" checked={captureFullData} onChange={toggleCheckbox} />
                            <label htmlFor="captureFullData" className="cbx">
                                <span>
                                    <svg width="12px" height="10px" viewBox="0 0 12 10">
                                        <polyline points="1.5 6 4.5 9 10.5 1"></polyline>
                                    </svg>
                                </span>
                                <span>Capture full data</span>
                            </label>
                            <input type="checkbox" id="captureExtraData" className="inp-cbx" name="captureExtraData" checked={captureExtraData} onChange={toggleCheckbox} />
                            <label htmlFor="captureExtraData" className="cbx">
                                <span>
                                    <svg width="12px" height="10px" viewBox="0 0 12 10">
                                        <polyline points="1.5 6 4.5 9 10.5 1"></polyline>
                                    </svg>
                                </span>
                                <span>Capture extra data</span>
                            </label>
                        </div>
                    </div>
                    <div className="block small">
                        <h1 className="title">Threads:</h1>
                        <div className="content">
                            <input type="text" name="threads" className="field" onChange={changeInput} value={threads} />
                        </div>
                    </div>
                    <div className="block small">
                        <h1 className="title">Timeout:</h1>
                        <div className="content">
                            <input type="text" name="timeout" className="field" onChange={changeInput} value={timeout} />
                        </div>
                    </div>
                    <div className="block small">
                        <h1 className="title">Misc:</h1>
                        <div className="content no-flex">
                            <input type="checkbox" id="retry" className="inp-cbx" name="retry" checked={retry} onChange={toggleCheckbox} />
                            <label htmlFor="retry" className="cbx">
                                <span>
                                    <svg width="12px" height="10px" viewBox="0 0 12 10">
                                        <polyline points="1.5 6 4.5 9 10.5 1"></polyline>
                                    </svg>
                                </span>
                                <span>Retry</span>
                            </label>
                        </div>
                    </div>
                </TabPanel>
                <TabPanel>
                    <div className="block small">
                        <h1 className="title">Judge:</h1>
                        <div className="content">
                            <input type="text" name="usualJudge" className="field" onChange={changeInput} value={judges.usualJudge} />
                        </div>
                    </div>
                    <div className="block small">
                        <h1 className="title">Validate string:</h1>
                        <div className="content">
                            <input type="text" name="usualJudgeValidateString" className="field" onChange={changeInput} value={judges.usualJudgeValidateString} />
                        </div>
                    </div>
                    <div className="block small">
                        <h1 className="title">Ssl judge:</h1>
                        <div className="content">
                            <input type="text" name="sslJudge" className="field" onChange={changeInput} value={judges.sslJudge} />
                        </div>
                    </div>
                    <div className="block small">
                        <h1 className="title">Validate string:</h1>
                        <div className="content">
                            <input type="text" name="sslJudgeValidateString" className="field" onChange={changeInput} value={judges.sslJudgeValidateString} />
                        </div>
                    </div>
                </TabPanel>
                <TabPanel>
                    <div className="block small">
                        <h1 className="title">Ip address lookup:</h1>
                        <div className="content">
                            <input type="text" name="lookupUrl" className="field" onChange={changeIp} value={ip.lookupUrl} />
                        </div>
                    </div>
                    <div className="block middle">
                        <h1 className="title">Your ip is:</h1>
                        <div className="content">
                            <input type="text" name="current" className="field" onChange={changeIp} value={ip.current} />
                            <button className="ip-lookup-button" onClick={IpLookup}>Check</button>  
                        </div>
                    </div>
                </TabPanel>
            </Tabs>
        </div>
    );
}

const mapStateToProps = state => ({
    settings: state.settings
});

const mapDispatchToProps = {
    changeSettings,
    IpLookup
};

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
