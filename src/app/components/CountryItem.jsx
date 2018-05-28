import React from 'react';

const CountryItem = props => {
    const {selected, count, name, toggle, changeAll} = props;

    return(
        <div className={selected ? "country-item enable" : "country-item"} onClick={() => toggle(name)} onDoubleClick={() => changeAll(!selected)}>
            <div className="name">{name}</div>
            <div className="count">{count}</div>
        </div>
    );
}

export default CountryItem;