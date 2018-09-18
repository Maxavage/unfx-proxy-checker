import { JUDGES_CHANGE_STATE, JUDGE_CHANGE_PING_STATE } from '../../constants/ActionTypes';

const initialState = {
    isActive: false,
    locked: false,
    items: []
};

const judges = (state = initialState, action) => {
    switch (action.type) {
        case JUDGES_CHANGE_STATE:
            return {
                ...state,
                ...action.state
            };
        case JUDGE_CHANGE_PING_STATE:
            return {
                ...state,
                items: state.items.map(item => {
                    if (item.url == action.url) {
                        return {
                            ...item,
                            ...action.state
                        };
                    }

                    return item;
                })
            };
        default:
            return state;
    }
};

export default judges;
