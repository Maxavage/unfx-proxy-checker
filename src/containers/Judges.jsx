import React from 'react';
import { connect } from 'react-redux';
import { change, add, remove, toggleOption } from '../actions/JudgesActions';
import JudgesItem from '../components/JudgesItem';
import JudgesAddNew from '../components/JudgesAddNew';

const Judges = ({ items, swap, change, add, remove, toggleOption }) => (
    <>
        <div className="block middle">
            <h1 className="title">Currently active:</h1>
            <div className="content no-flex">
                <div className="judges-list">
                    <div className="items">
                        {items.map(item => (
                            <JudgesItem {...item} key={item.url} change={change} remove={remove} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
        <div className="block middle">
            <h1 className="title">Extra:</h1>
            <div className="content no-flex">
                <input type="checkbox" id="swap" className="inp-cbx" name="swap" checked={swap} onChange={toggleOption} />
                <label htmlFor="swap" className="cbx">
                    <span>
                        <svg width="12px" height="10px" viewBox="0 0 12 10">
                            <polyline points="1.5 6 4.5 9 10.5 1" />
                        </svg>
                    </span>
                    <span>Swap</span>
                </label>
            </div>
            <h1 className="title">Add new Judge:</h1>
            <JudgesAddNew add={add} />
        </div>
    </>
);

const mapStateToProps = state => ({
    ...state.judges
});

const mapDispatchToProps = {
    change,
    add,
    remove,
    toggleOption
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Judges);
