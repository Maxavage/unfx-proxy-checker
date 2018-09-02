import React from 'react';

const ResultItemData = data => (
    <div className="data">
    {
        Object.keys(data).map(protocol => 
            <div className="protocol" key={protocol}>
                <div className="type">{protocol}</div>
                <div className="timings">
                    {Object.keys(data[protocol].timings).map(timing => 
                        <div className="item" key={timing}>
                            <div className="key">{timing}</div>
                            <div className="value">{data[protocol].timings[timing]}</div>
                        </div>
                    )}
                </div>
                <div className="item anon">
                    <div className="key">Anonymity</div>
                    <div className="value">{data[protocol].anon}</div>
                </div>
                <div className="response">
                    <div className="status-message">Status message: {data[protocol].response.statusMessage} | Response body</div>
                    <textarea className="body" defaultValue={data[protocol].response.body}></textarea>
                    <div className="headers">
                        {Object.keys(data[protocol].response.headers).map(header => 
                            <div className="item" key={header}>
                                <div className="key">{header}</div>
                                <div className="value">{data[protocol].response.headers[header]}</div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        )
    }
    </div>
);

export default ResultItemData;
