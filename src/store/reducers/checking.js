import { UP_COUNTER_STATUS, TOGGLE_CHECKING_OPEN } from '../../constants/ActionTypes';

const initialState = {
    isOpened: false,
    counter: {
        all: 0,
        done: 0,
        protocols: {
            /**
             * http: 0,
             * https: 0,
             * socks4: 0,
             * socks5: 0
             */
        }
    }
};

const checking = (state = initialState, action) => {
    switch (action.type) {
        case UP_COUNTER_STATUS:
            return {
                ...state,
                counter: action.counter
            };
        case TOGGLE_CHECKING_OPEN:
            return {
                ...state,
                isOpened: !state.isOpened
            };
        default:
            return state;
    }
};

export default checking;
