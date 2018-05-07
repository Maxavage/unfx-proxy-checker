import React from 'react';

class ProxyListItem extends React.PureComponent {
    constructor(props) {
        super(props);
    }

    getTypeClass(type) {
        if(type.join().match(/http/gi)){
            return 'proxy-list-droplet http';
        }

        return 'proxy-list-droplet socks';
    }

    render() {
        const {ip, port, type, anon, country, timeout, count, flag} = this.props;

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
                </div>
                <div className="timeout">{timeout}</div>
            </div>
        );
    }
}

export default ProxyListItem;