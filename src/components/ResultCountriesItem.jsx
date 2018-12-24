import React from 'react';

export default class ResultCountriesItem extends React.PureComponent {
    toggle = () => {
        const { toggle, name, active } = this.props;
        toggle(name, false, !active);
    };

    toggleAll = () => {
        const { toggle, name, active } = this.props;
        toggle(name, true, !active);
    };

    render = () => {
        const { name, active, count } = this.props;

        return (
            <div className={`item ${active ? 'active' : 'unactive'}`} onDoubleClick={this.toggleAll} onClick={this.toggle}>
                <span className="name" title={name}>
                    {name}
                </span>
                <span className="count">{count}</span>
            </div>
        );
    };
}
