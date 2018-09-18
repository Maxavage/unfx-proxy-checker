import React from 'react';

export default class SettingsJudgeItem extends React.PureComponent {
    toggleSSL = () => {
        const { changeSettingsJudge, url, ssl } = this.props;
        changeSettingsJudge(url, { ssl: !ssl });
    };

    toggleValidate = () => {
        const { changeSettingsJudge, url, validate } = this.props;
        changeSettingsJudge(url, {
            validate: {
                ...validate,
                enabled: !validate.enabled
            }
        });
    };

    changeValidateString = e => {
        const { changeSettingsJudge, url, validate } = this.props;
        changeSettingsJudge(url, {
            validate: {
                ...validate,
                value: e.target.value
            }
        });
    };

    remove = () => {
        const { removeSettingsJudge, url } = this.props;
        removeSettingsJudge(url);
    };

    render = () => {
        const { url, ssl, validate } = this.props;

        return (
            <div className="item">
                <div className="top">
                    <div className="url">{url}</div>
                    <button className="less" onClick={this.remove}>
                        Remove
                    </button>
                </div>
                <div className="additional">
                    <input type="checkbox" id={`ssl-${url}`} className="inp-cbx" checked={ssl} onChange={this.toggleSSL} />
                    <label htmlFor={`ssl-${url}`} className="cbx">
                        <span>
                            <svg width="12px" height="10px" viewBox="0 0 12 10">
                                <polyline points="1.5 6 4.5 9 10.5 1" />
                            </svg>
                        </span>
                        <span>Only for SSL</span>
                    </label>
                    <input type="checkbox" id={`validate-${url}`} className="inp-cbx" checked={validate.enabled} onChange={this.toggleValidate} />
                    <label htmlFor={`validate-${url}`} className="cbx">
                        <span>
                            <svg width="12px" height="10px" viewBox="0 0 12 10">
                                <polyline points="1.5 6 4.5 9 10.5 1" />
                            </svg>
                        </span>
                        <span>Validate</span>
                    </label>
                    <input type="text" className="field" value={validate.value} onChange={this.changeValidateString} placeholder="Validate string (supports Regex)" />
                </div>
            </div>
        );
    };
}
