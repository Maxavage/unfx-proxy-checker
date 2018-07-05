import React from 'react';
import { ActionLoadFromTxt } from '../actions/ActionLoadFromTxt';

class InputProxyList extends React.Component {
    shouldComponentUpdate(nextProps, nextState) {
        return this.props.content != nextProps.content;
    }

    render() {
        const { onInputEvent, content, load } = this.props;

        return(
            <div className="input-proxy-list">
                <h1 className="small">Proxy:</h1>
                <button className="button-two load-button" onClick={() => ActionLoadFromTxt(load)}>Load from txt</button>
                <textarea name="list" autoComplete="off" autoCorrect="off" autoCapitalize="off" spellCheck="false" className="textarea-one" cols="30" rows="10" onInput={onInputEvent} value={content}></textarea>
            </div>
        );
    }
}

export default InputProxyList;
