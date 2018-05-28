import React from 'react';
import Export from './Export';

const CheckList = props => {
    const {list, show, counter, done, newChecking} = props;

    return(
        <div className="check-container">
            <div className={show ? "popup-check-list open" : "popup-check-list"}>
                <div className="popup-check-list-content">
                    <div className="check-list-text-content">
                        <div className={done ? "counter-container done" : "counter-container"}>
                            <div className="counter">
                                <div className="type http">Http</div>
                                <div className="count">{counter.http}</div>
                            </div>
                            <div className="counter">
                                <div className="type http">Https</div>
                                <div className="count">{counter.https}</div>
                            </div>
                            <div className="counter">
                                <div className="type socks">Socks4</div>
                                <div className="count">{counter.socks4}</div>
                            </div>
                            <div className="counter">
                                <div className="type socks">Socks5</div>
                                <div className="count">{counter.socks5}</div>
                            </div>
                            <div className="proxy-score"><div className="score-bar" style={{width: counter.done/counter.all * 100 + "%"}}></div></div>
                            <h1 className="check-count">Checked proxies {counter.done} of {counter.all}</h1>
                        </div>
                        {done ? <Export list={list} newChecking={newChecking} />: ""}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CheckList;