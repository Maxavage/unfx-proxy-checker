import React from 'react';
import { connect } from 'react-redux';
import Export from './Export';

const CheckList = ({ show, counter, done, newChecking }) => {
    return (
        <div className="check-container">
            <div className={show ? 'popup-check-list open' : 'popup-check-list'}>
                <div className="popup-check-list-content">
                    <div className="check-list-text-content">
                        <div className={done ? 'counter-container done' : 'counter-container'}>
                            <div className="counter">
                                <div className={counter.http ? 'type http active' : 'type http'}>Http</div>
                                <div className="count">{counter.http}</div>
                            </div>
                            <div className="counter">
                                <div className={counter.https ? 'type http active' : 'type http'}>Https</div>
                                <div className="count">{counter.https}</div>
                            </div>
                            <div className="counter">
                                <div className={counter.socks4 ? 'type socks active' : 'type socks'}>Socks4</div>
                                <div className="count">{counter.socks4}</div>
                            </div>
                            <div className="counter">
                                <div className={counter.socks5 ? 'type socks active' : 'type socks'}>Socks5</div>
                                <div className="count">{counter.socks5}</div>
                            </div>
                            <div className="proxy-score">
                                <div className="score-bar" style={{ width: Math.floor((counter.done / counter.all) * 100) + '%' }} />
                            </div>
                            <h1 className="check-count">Checked proxies {counter.done} of {counter.all}</h1>
                        </div>
                        {done ? <Export newChecking={newChecking} /> : ''}
                    </div>
                </div>
            </div>
        </div>
    );
};

const mapStateToProps = state => ({
    counter: state.counter
});

export default connect(mapStateToProps)(CheckList);
