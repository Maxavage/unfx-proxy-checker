const initialState = {
    isOpened: false,
    items: [],
    extra: {
        isEnabled: false,
        keepAlive: false,
        showSignatures: true
    },
    countries: {

    },
    anons: {
        transparent: true,
        anonymous: true,
        elite: true
    },
    protocols: {
        http: true,
        https: true,
        socks4: true,
        socks5: true
    },
    countOfResults: 25,
    search: ''
};

const list = (state = initialState, action) => {
    switch (action.type) {
        case 'ADD_RESULT':
            return {
                ...state,
                items: action.items,
                countries: action.countries,
                extra: {
                    ...state.extra,
                    ...action.extra
                }
            };

        case 'TOGGLE_ANON':
            return {
                ...state,
                countOfResults: 25,
                anons: {
                    ...state.anons,
                    [action.anon]: !state.anons[action.anon]
                }
            };

        case 'TOGGLE_PROTOCOL':
            return {
                ...state,
                countOfResults: 25,
                protocols: {
                    ...state.protocols,
                    [action.protocol]: !state.protocols[action.protocol]
                }
            };
            
        case 'TOGGLE_COUNTRY':
            return {
                ...state,
                countOfResults: 25,
                countries: action.countries
            };

        case 'TOGGLE_EXTRA':
            return {
                ...state,
                countOfResults: 25,
                extra: {
                    ...state.extra,
                    [action.extra]: !state.extra[action.extra]
                }
            };

        case 'SET_SEARCH': 
            return {
                ...state,
                countOfResults: 25,
                search: action.value
            };

        case 'LOAD_MORE':
            return {
                ...state,
                countOfResults: state.countOfResults + 25
            };

        case 'RESULT_CLOSE':
            return initialState;
        
        case 'TOGGLE_OPEN':
            return {
                ...state,
                isOpened: !state.isOpened
            };

        default:
            return state;
    }
};

export default list;
