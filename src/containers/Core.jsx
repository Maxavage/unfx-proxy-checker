import React from 'react';
import { connect } from 'react-redux';
import { changeOption, toggleOption, toggleProtocol } from '../actions/CoreActions';

const Core = ({ protocols, captureFullData, captureExtraData, threads, timeout, retry, changeOption, toggleOption, toggleProtocol }) => (
    <>
        <div className="block middle">
            <h1 className="title">Protocols:</h1>
            <div className="content no-flex">
                <input type="checkbox" id="http-protocol" className="inp-cbx" name="http" checked={protocols.http} onChange={toggleProtocol} />
                <label htmlFor="http-protocol" className="cbx">
                    <span>
                        <svg width="12px" height="10px" viewBox="0 0 12 10">
                            <polyline points="1.5 6 4.5 9 10.5 1" />
                        </svg>
                    </span>
                    <span>Http</span>
                </label>
                <input type="checkbox" id="https-protocol" className="inp-cbx" name="https" checked={protocols.https} onChange={toggleProtocol} />
                <label htmlFor="https-protocol" className="cbx">
                    <span>
                        <svg width="12px" height="10px" viewBox="0 0 12 10">
                            <polyline points="1.5 6 4.5 9 10.5 1" />
                        </svg>
                    </span>
                    <span>Https</span>
                </label>
                <input type="checkbox" id="socks4-protocol" className="inp-cbx" name="socks4" checked={protocols.socks4} onChange={toggleProtocol} />
                <label htmlFor="socks4-protocol" className="cbx">
                    <span>
                        <svg width="12px" height="10px" viewBox="0 0 12 10">
                            <polyline points="1.5 6 4.5 9 10.5 1" />
                        </svg>
                    </span>
                    <span>Socks4</span>
                </label>
                <input type="checkbox" id="socks5-protocol" className="inp-cbx" name="socks5" checked={protocols.socks5} onChange={toggleProtocol} />
                <label htmlFor="socks5-protocol" className="cbx">
                    <span>
                        <svg width="12px" height="10px" viewBox="0 0 12 10">
                            <polyline points="1.5 6 4.5 9 10.5 1" />
                        </svg>
                    </span>
                    <span>Socks5</span>
                </label>
            </div>
        </div>
        <div className="block middle">
            <h1 className="title">Data capturing:</h1>
            <div className="content no-flex">
                <input type="checkbox" id="captureFullData" className="inp-cbx" name="captureFullData" checked={captureFullData} onChange={toggleOption} />
                <label htmlFor="captureFullData" className="cbx">
                    <span>
                        <svg width="12px" height="10px" viewBox="0 0 12 10">
                            <polyline points="1.5 6 4.5 9 10.5 1" />
                        </svg>
                    </span>
                    <span>Capture full data</span>
                </label>
                <input type="checkbox" id="captureExtraData" className="inp-cbx" name="captureExtraData" checked={captureExtraData} onChange={toggleOption} />
                <label htmlFor="captureExtraData" className="cbx">
                    <span>
                        <svg width="12px" height="10px" viewBox="0 0 12 10">
                            <polyline points="1.5 6 4.5 9 10.5 1" />
                        </svg>
                    </span>
                    <span>Capture extra data</span>
                </label>
            </div>
        </div>
        <div className="block small">
            <h1 className="title">Threads:</h1>
            <div className="content">
                <input type="text" name="threads" className="field" onChange={changeOption} value={threads} />
            </div>
        </div>
        <div className="block small">
            <h1 className="title">Timeout:</h1>
            <div className="content">
                <input type="text" name="timeout" className="field" onChange={changeOption} value={timeout} />
            </div>
        </div>
        <div className="block small">
            <h1 className="title">Misc:</h1>
            <div className="content no-flex">
                <input type="checkbox" id="retry" className="inp-cbx" name="retry" checked={retry} onChange={toggleOption} />
                <label htmlFor="retry" className="cbx">
                    <span>
                        <svg width="12px" height="10px" viewBox="0 0 12 10">
                            <polyline points="1.5 6 4.5 9 10.5 1" />
                        </svg>
                    </span>
                    <span>Retry</span>
                </label>
            </div>
        </div>
    </>
);

const mapStateToProps = state => ({
    ...state.core
});

const mapDispatchToProps = {
    changeOption,
    toggleOption,
    toggleProtocol
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Core);
