import React from 'react';
import Checkbox from './ui/Checkbox';

export default class BlacklistItem extends React.PureComponent {
    setActive = () => {
        const { setActive, active, title, path } = this.props;
        const activeState = path.length > 0 ? !active : false;

        setActive(title, activeState);
    };

    changePath = e => {
        const { changePath, setActive, title } = this.props;
        const activeState = e.target.value.length > 0 ? true : false;

        changePath(title, e.target.value);
        setActive(title, activeState);
    };

    selectPath = () => {
        const { selectPath, title } = this.props;
        selectPath(title);
    };

    remove = () => {
        const { remove, title } = this.props;
        remove(title);
    };

    render = () => {
        const { title, active, path } = this.props;

        return (
            <div className="item">
                <div className="title-remove">
                    <Checkbox id={`active-${title}`} name={`active-${title}`} checked={active} onChange={this.setActive} text={title} />
                    <button className="less" onClick={this.remove}>
                        Remove
                    </button>
                </div>
                <div className="path">
                    <input type="text" className="field" value={path} onChange={this.changePath} placeholder="URL or Select path" />
                    <button onClick={this.selectPath}>...</button>
                </div>
            </div>
        );
    };
}
