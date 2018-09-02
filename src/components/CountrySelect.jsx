import React from 'react';

const CountrySelect = ({ items, toggle }) => (
    <div className="country-select">
        {Object.keys(items)
            .sort((a, b) => items[b].count - items[a].count)
            .map((item, index) => (
                <div
                    key={index}
                    className={items[item].state ? 'country-item enable' : 'country-item'} 
                    onClick={() => toggle(item)} 
                    name={item} 
                    onDoubleClick={() => toggle(item, true)} 
                >
                    <div className="name">{item}</div>
                    <div className="count">{items[item].count}</div>
                </div>
            ))}
    </div>
);

export default CountrySelect;
