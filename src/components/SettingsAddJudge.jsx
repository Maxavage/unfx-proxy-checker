import React from 'react';
import { isURL } from '../misc/regexes';

export default class SettingsAddJudge extends React.PureComponent {
    state = {
        url: ''
    };

    changeUrl = e => this.setState({ url: e.target.value });

    addUrl = () => {
        if (this.state.url.length == 0 || !isURL(this.state.url)) {
            return;
        }

        const { addSettingsJudge } = this.props;
        addSettingsJudge(this.state.url);
    };

    render = () => (
        <div className="content">
            <input type="text" className="field" onChange={this.changeUrl} value={this.state.url} placeholder="Url:" />
            <button className="add-url-button" onClick={this.addUrl}>
                Add
            </button>
        </div>
    );
}
