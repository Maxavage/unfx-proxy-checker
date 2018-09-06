import React from 'react';
import { connect } from 'react-redux';

import '../../public/styles/IpLookup.postcss';

const Ip = ({ status }) => {
    const { isActive, currentIP, isLookupDone, isLookupSuccess } = status;

    return (
        <div className={`ip-lookup ${isActive ? 'opened' : ''}`}>
            <div className={`checking-status ${isLookupDone ? 'done' : 'processing'}`}>
                <div className="loader"><div></div><div></div></div>
                {
                    <div className="ip-address">
                    {
                        isLookupDone ? isLookupSuccess ?
                        `Your IP is: ${currentIP}`
                        : 'Ip lookup error. Please try change lookup address.'
                        : ''
                    }
                    </div>
                }
            </div>
        </div>
    );
};

const mapStateToProps = state => ({
    status: state.ip
})

export default connect(mapStateToProps)(Ip);
