import React from 'react';

class ProxyListItem extends React.PureComponent {
    constructor(props) {
        super(props);
    }

    getClass(protocols) {
        return protocols[0].match(/http/) ? 'proxy-list-droplet http' : 'proxy-list-droplet socks';
    }

    getTimeout(timeouts) {
        return timeouts.reduce((a, b) => a + b) / timeouts.length;
    }

    render() {
        const { ip, port, protocols, anons, country, timeouts, count } = this.props;

        return (
            <div className={this.getClass(protocols)}>
                <div className="count" title={count}>{count}</div>
                <div className="ip">{ip}</div>
                <div className="port">{port}</div>
                <div className="protocols">
                {
                    protocols.map((protocol, index) => <div className="protocol" key={index}>{protocol}</div>)
                }
                </div>
                <div className="anons">
                {
                    anons.map((anon, index) => <div className="anon" key={index}>{anon}</div>)
                }
                </div>
                <div className="country">
                    <div className={`ico ${country.flag} png`}></div>
                    <div className="name">{country.name}</div>
                    <div className="city" title={country.city}>{country.city}</div>
                </div>
                <div className="timeout">{this.getTimeout(timeouts)}</div>
            </div>
        );
    }
}

export default ProxyListItem;