import React from 'react';
import Checkbox from './ui/Checkbox';

export default class JudgesItem extends React.PureComponent {
    toggleSSL = () => {
        const { change, url, ssl } = this.props;
        change(url, { ssl: !ssl });
    };

    toggleValidate = () => {
        const { change, url, validate } = this.props;
        const enabledState = validate.value.length > 0 ? !validate.enabled : false;

        change(url, {
            validate: {
                ...validate,
                enabled: enabledState
            }
        });
    };

    changeValidateString = e => {
        const { change, url } = this.props;
        const enabledState = e.target.value.length > 0 ? true : false;

        change(url, {
            validate: {
                enabled: enabledState,
                value: e.target.value
            }
        });
    };

    remove = () => {
        const { remove, url } = this.props;
        remove(url);
    };

    render = () => {
        const { url, ssl, validate } = this.props;

        return (
            <div className="item">
                <div className="sides">
                    <div className="left">
                        <Checkbox id={`ssl-${url}`} name={`ssl-${url}`} checked={ssl} onChange={this.toggleSSL} text="SSL" />
                        <Checkbox id={`validate-${url}`} name={`validate-${url}`} checked={validate.enabled} onChange={this.toggleValidate} text="Validate" />
                    </div>
                    <div className="right">
                        <div className="url-remove">
                            <span>{url}</span>
                            <button className="less" onClick={this.remove}>
                                Remove
                            </button>
                        </div>
                        <input type="text" className="field" value={validate.value} onChange={this.changeValidateString} placeholder="Validate string (supports Regex)" />
                    </div>
                </div>
            </div>
        );
    };
}
