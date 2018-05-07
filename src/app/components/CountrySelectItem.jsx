import React from 'react';

class CountrySelectItem extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            enable: true
        }
    }

    toggle() {
        this.setState({enable: !this.state.enable});
        this.props.toggle(this.props.name);
    }

    render() {
        const {count, name} = this.props;

        return(
            <div className={this.state.enable ? "country-item enable" : "country-item"} onClick={this.toggle.bind(this)}>
                <div className="name">{name}</div>
                <div className="count">{count}</div>
            </div>
        );
    }
}

export default CountrySelectItem;