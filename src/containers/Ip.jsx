import React from 'react';
import { connect } from 'react-redux';
import { changeOption } from '../actions/IpActions';
import { IpLookup } from '../actions/OverlayIpActions';

const Ip = ({ lookupUrl, current, changeOption, IpLookup }) => (
    <>
        <div className="block small">
            <h1 className="title">Ip address lookup:</h1>
            <div className="content">
                <input type="text" name="lookupUrl" className="field" onChange={changeOption} value={lookupUrl} />
            </div>
        </div>
        <div className="block middle">
            <h1 className="title">Your ip is:</h1>
            <div className="content">
                <input type="text" name="current" className="field" onChange={changeOption} value={current} />
                <button className="ip-lookup-button" onClick={IpLookup}>
                    Check
                </button>
            </div>
        </div>
    </>
);

const mapStateToProps = state => ({
    ...state.ip
});

const mapDispatchToProps = {
    changeOption,
    IpLookup
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Ip);
