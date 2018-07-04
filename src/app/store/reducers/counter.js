const initialState = {
    all: 0,
    done: 0
    /**
     * http: 0,
     * https: 0,
     * socks4: 0,
     * socks5: 0
     */
};

const counter = (state = initialState, action) => {
    switch (action.type) {
        case 'UP_STATUS':
            return {...state, ...action.counter};
        default:
            return state;
    }
};

export default counter;