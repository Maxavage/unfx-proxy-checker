import React from 'react';

class ProxyListItem extends React.PureComponent {
    constructor(props) {
        super(props);
    }

    getTypeClass(type) {
        return type[0].match(/http/) ? 'proxy-list-droplet http' : 'proxy-list-droplet socks';
    }

    render() {
        const {ip, port, type, anon, country, city, timeout, count, flag} = this.props;

        return(
            <div className={this.getTypeClass(type)}>
                <div className="count">{count}</div>
                <div className="ip">{ip}</div>
                <div className="port">{port}</div>
                <div className="type">{type.join(", ")}</div>
                <div className="anon">{anon}</div>
                <div className="country">
                    <div className={`ico ${flag} png`}></div>
                    <div className="name">{country}</div>
                    <div className="city" title={city}>{city}</div>
                </div>
                <div className="timeout">{timeout}</div>
            </div>
        );
    }
}

export default ProxyListItem;