import React from 'react';
import CountryItem from '../components/CountryItem';

class CountrySelect extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = this.props.items;
    }

    toggle(country) {
        this.setState({ [country]: { state: !this.state[country].state, count: this.state[country].count } }, () => {
            this.props.applyCountries(this.state);
        });
    }

    changeAll(state) {
        let snapState = this.state;

        for (const country in snapState) {
            snapState[country].state = state;
        }

        this.setState(snapState, () => {
            this.props.applyCountries(this.state);
        });
    }

    render() {
        return (
            <div className="country-select">
                <h2>Country</h2>
                {Object.keys(this.state)
                    .sort((a, b) => this.state[b].count - this.state[a].count)
                    .map((item, index) => (
                        <CountryItem
                            key={index}
                            selected={this.state[item].state}
                            toggle={this.toggle.bind(this)}
                            changeAll={this.changeAll.bind(this)}
                            count={this.state[item].count}
                            name={item}
                        />
                    ))}
            </div>
        );
    }
}

export default CountrySelect;
