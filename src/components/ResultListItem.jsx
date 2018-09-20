import React from 'react';
import ResultItemData from './ResultItemData';

class ResultListItem extends React.PureComponent {
    state = {
        isDataOpened: false
    };

    toggleOpenData = e => {
        e.stopPropagation();

        if (!e.ctrlKey) {
            this.setState({ isDataOpened: !this.state.isDataOpened });
        }
    };

    getClass = protocols => `list-item ${protocols[0].match(/http/) ? 'http' : 'socks'}`;
}

export class ResultListItemWithSignatures extends ResultListItem {
    render = () => {
        const { ip, port, count, protocols, anons, country, timeout, extra, data } = this.props;

        return (
            <div className={this.getClass(protocols)}>
                <div className={`main-block ${data != null ? 'with-data' : 'no-data'}`} onClick={this.toggleOpenData}>
                    <div className="count">
                        <span>{count}</span>
                    </div>
                    <div className="ip-port">
                        {ip}:{port}
                    </div>
                    {extra ? (
                        <div className="extra">
                            {extra.keepAlive ? <span title="Connection: Keep-Alive">K-A</span> : null}
                            {extra.os ? <span title="OS">{extra.os}</span> : null}
                            {extra.server ? <span title="Server">{extra.server}</span> : null}
                        </div>
                    ) : (
                        <div className="extra" />
                    )}
                    <div className="protocols">
                        {protocols.map((protocol, index) => (
                            <span key={index}>{protocol}</span>
                        ))}
                    </div>
                    <div className="anons">
                        {anons.map((anon, index) => (
                            <span key={index}>{anon}</span>
                        ))}
                    </div>
                    <div className="country">
                        <div className={`ico ${country.flag} png`} />
                        <div className="name">{country.name}</div>
                        <div className="city" title={country.city}>
                            {country.city}
                        </div>
                    </div>
                    <div className="timeout">{timeout} ms</div>
                </div>
                {this.state.isDataOpened ? <ResultItemData {...data} /> : null}
            </div>
        );
    };
}

export class ResultListItemWithoutSignatures extends ResultListItem {
    render = () => {
        const { ip, port, count, protocols, anons, country, timeout, data } = this.props;

        return (
            <div className={this.getClass(protocols)}>
                <div className={`main-block ${data != null ? 'with-data' : 'no-data'}`} onClick={this.toggleOpenData}>
                    <div className="count">
                        <span>{count}</span>
                    </div>
                    <div className="ip">{ip}</div>
                    <div className="port">{port}</div>
                    <div className="protocols">
                        {protocols.map((protocol, index) => (
                            <span key={index}>{protocol}</span>
                        ))}
                    </div>
                    <div className="anons">
                        {anons.map((anon, index) => (
                            <span key={index}>{anon}</span>
                        ))}
                    </div>
                    <div className="country">
                        <div className={`ico ${country.flag} png`} />
                        <div className="name">{country.name}</div>
                        <div className="city" title={country.city}>
                            {country.city}
                        </div>
                    </div>
                    <div className="timeout">{timeout} ms</div>
                </div>
                {this.state.isDataOpened ? <ResultItemData {...data} /> : null}
            </div>
        );
    };
}
