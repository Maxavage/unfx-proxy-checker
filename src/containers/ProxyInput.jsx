import React from 'react';
import { connect } from 'react-redux';
import { changeValue, loadFromTxt } from '../actions/InputActions';

import '../../public/styles/ProxyInput.postcss';

class ProxyInput extends React.Component {
    shouldComponentUpdate = nextProps => this.props.input != nextProps.input;

    lines = content => content.split(/\r\n|\r|\n/).length.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");

    listSize = str => {
        let size = str.length;

        for (let i = str.length - 1; i >= 0; i--) {
            const code = str.charCodeAt(i);
            if (code > 0x7f && code <= 0x7ff) size++;
            else if (code > 0x7ff && code <= 0xffff) size += 2;
            if (code >= 0xdc00 && code <= 0xdfff) i--;
        }

        const result = size / 1024;

        if (result >= 1024) {
            return `${(result / 1024).toFixed(2)} MB`;
        } else {
            return `${result.toFixed(2)} KB`;
        }
    }

    onInputEvent = e => {
        const { changeValue } = this.props;
        changeValue(e.target.value);
    }

    render = ({ input, loadFromTxt } = this.props) => (
        <div className="proxy-input">
            <span>
                <button onClick={loadFromTxt}>
                    Load from txt
                </button>
            </span>
            <div className="metrics">
                <div className="lines">Lines: {this.lines(input)}</div>
                <div className="size">Size: {this.listSize(input)}</div>
            </div>
            <textarea name="input" autoComplete="off" autoCorrect="off" autoCapitalize="off" spellCheck="false" cols="30" rows="10" onInput={this.onInputEvent} value={input} />
        </div>
    );
}

const mapStateToProps = state => ({
    input: state.input
});

const mapDispatchToProps = {
    changeValue,
    loadFromTxt
};

export default connect(mapStateToProps, mapDispatchToProps)(ProxyInput);