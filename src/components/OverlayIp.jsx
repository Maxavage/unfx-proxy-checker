import React from 'react';

import '../../public/styles/IpLookup.postcss';

const OverlayIp = ({ isActive, currentIP, isLookupDone, isLookupSuccess }) => (
    <div className={`ip-lookup ${isActive ? 'opened' : ''}`}>
        <div className={`checking-status ${isLookupDone ? 'done' : 'processing'}`}>
            <div className="loader">
                <div />
                <div />
            </div>
            {<div className="ip-address">{isLookupDone ? (isLookupSuccess ? `Your IP is: ${currentIP}` : 'Ip lookup error. Please try change lookup address.') : ''}</div>}
        </div>
    </div>
);

export default OverlayIp;
