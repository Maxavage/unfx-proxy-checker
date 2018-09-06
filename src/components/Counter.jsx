import React from 'react';

import '../../public/styles/Counter.postcss';

const Counter = ({ all, done, protocols }) => {
    const progressStyle = {
        width: Math.floor((done / all) * 100) + '%'
    };

    return (
        <div className="counter-container">
            <div className="protocol">
                <div className={`type http ${protocols.http ? 'active' : ''}`}>Http</div>
                <div className="count">{protocols.http}</div>
            </div>
            <div className="protocol">
                <div className={`type http ${protocols.https ? 'active' : ''}`}>Https</div>
                <div className="count">{protocols.https}</div>
            </div>
            <div className="protocol">
                <div className={`type socks ${protocols.socks4 ? 'active' : ''}`}>Socks4</div>
                <div className="count">{protocols.socks4}</div>
            </div>
            <div className="protocol">
                <div className={`type socks ${protocols.socks5 ? 'active' : ''}`}>Socks5</div>
                <div className="count">{protocols.socks5}</div>
            </div>
            <div className="progress">
                <div className="bar" style={progressStyle} />
            </div>
            <h1>
                Checked proxies {done} of {all}
            </h1>
        </div>
    );
};

export default Counter;
