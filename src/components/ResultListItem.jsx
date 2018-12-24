import React from 'react';
import ResultItemData from './ResultItemData';

export default class ResultListItem extends React.PureComponent {
    state = {
        isDataOpened: false
    };

    toggleOpenData = e => {
        e.stopPropagation();

        if (!e.ctrlKey) {
            this.setState({ isDataOpened: !this.state.isDataOpened });
        }
    };

    getClass = protocols => (protocols[0].match(/http/) ? 'http' : 'socks');

    render = () => {
        const { ip, port, protocols, anon, country, timeout, keepAlive, extra, data, blacklist } = this.props;

        return (
            <div className={`list-item ${this.getClass(protocols)}`}>
                <div className={`main-block ${data.length > 0 ? 'with-data' : 'no-data'}`} onClick={this.toggleOpenData}>
                    <div className="count">
                        <span />
                    </div>
                    <div className="ip">{ip}</div>
                    <div className="port">{port}</div>
                    <div className="protocols">
                        {protocols.map(protocol => (
                            <span key={protocol}>{protocol}</span>
                        ))}
                    </div>
                    <div className="anon">
                        <span>{anon}</span>
                    </div>
                    <div className="country">
                        <div className="ico-wrap">
                            <div className={`ico ${country.flag} png`} />
                        </div>
                        <div className="merged">
                            <div className="name">{country.name}</div>
                            <div className="city" title={country.city}>
                                {country.city}
                            </div>
                        </div>
                    </div>
                    <div className="blacklists">
                        {blacklist && (
                            <div className="counts" title={blacklist.join('\n')}>
                                {blacklist.length}
                            </div>
                        )}
                    </div>
                    <div className="k-a">
                        {keepAlive && (
                            <span title="Connection: Keep-Alive">
                                K-A
                            </span>
                        )}
                    </div>
                    <div className="extra">
                        {extra &&
                            extra.map(item => (
                                <span key={item.title} title={`${item.title}: ${item.description}`}>
                                    {item.title.slice(0, 1)}
                                </span>
                            ))}
                    </div>
                    <div className="timeout">{timeout}</div>
                </div>
                {this.state.isDataOpened && <ResultItemData data={data} />}
            </div>
        );
    };
}
