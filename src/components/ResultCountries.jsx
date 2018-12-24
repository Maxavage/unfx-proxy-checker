import React from 'react';
import ResultCountriesItem from './ResultCountriesItem';

const ResultCountries = ({ items, show, toggle, hideCountries, activeCount }) => {
    const progressStyle = {
        width: Math.floor((activeCount / items.length) * 100) + '%'
    };

    return (
        <div className={`countries-items ${show ? 'show' : ''}`}>
            <div className="close" onClick={hideCountries} />
            <div className="items-container">
                <div className="active-count">
                    <div className="shadow" style={progressStyle} />
                    <div className="count-text">
                        Selected {activeCount} of {items.length}
                    </div>
                </div>
                <div className="items-wrapper">
                    <div className="items">
                        {items.map(item => (
                            <ResultCountriesItem {...item} toggle={toggle} key={item.name} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ResultCountries;
