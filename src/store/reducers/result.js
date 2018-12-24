import {
    SHOW_RESULT,
    TOGGLE_ANON,
    TOGGLE_PROTOCOL,
    TOGGLE_COUNTRY,
    TOGGLE_MISC,
    SET_SEARCH,
    LOAD_MORE,
    RESULT_CLOSE,
    TOGGLE_BLACKLIST,
    SET_COUNTRIES_SHOW,
    SET_MAX_TIMEOUT,
    CHANGE_PORTS_INPUT,
    SET_PORTS_ALLOW,
    RESULT_SORT
} from '../../constants/ActionTypes';

const initialState = {
    isOpened: false,
    items: [],
    misc: {
        onlyKeepAlive: false
    },
    timeout: {
        ranges: {
            from: 0,
            to: 0
        },
        max: 0
    },
    ports: {
        input: '',
        allow: true
    },
    inBlacklists: [],
    countries: {
        show: false,
        items: []
    },
    sorting: {
        reverse: false,
        by: 'timeout'
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

const result = (state = initialState, action) => {
    switch (action.type) {
        case SHOW_RESULT:
            return {
                ...state,
                isOpened: true,
                items: action.items,
                countries: {
                    show: state.countries.show,
                    items: action.countries
                },
                inBlacklists: action.inBlacklists,
                timeout: action.timeout ? action.timeout : initialState.timeout
            };
        case CHANGE_PORTS_INPUT:
            return {
                ...state,
                countOfResults: 25,
                ports: {
                    ...state.ports,
                    input: action.input
                }
            };
        case RESULT_SORT:
            return {
                ...state,
                countOfResults: 25,
                sorting: {
                    reverse: !state.sorting.reverse,
                    by: action.by
                }
            };
        case SET_PORTS_ALLOW:
            return {
                ...state,
                countOfResults: 25,
                ports: {
                    ...state.ports,
                    allow: action.allow
                }
            };
        case TOGGLE_ANON:
            return {
                ...state,
                countOfResults: 25,
                anons: {
                    ...state.anons,
                    [action.anon]: !state.anons[action.anon]
                }
            };
        case TOGGLE_PROTOCOL:
            return {
                ...state,
                countOfResults: 25,
                protocols: {
                    ...state.protocols,
                    [action.protocol]: !state.protocols[action.protocol]
                }
            };
        case TOGGLE_COUNTRY:
            if (action.all) {
                return {
                    ...state,
                    countOfResults: 25,
                    countries: {
                        show: state.countries.show,
                        items: state.countries.items.map(item => {
                            return {
                                ...item,
                                active: action.state
                            };
                        })
                    }
                };
            }

            return {
                ...state,
                countOfResults: 25,
                countries: {
                    show: state.countries.show,
                    items: state.countries.items.map(item => {
                        if (item.name == action.name) {
                            return {
                                ...item,
                                active: action.state
                            };
                        }

                        return item;
                    })
                }
            };
        case SET_COUNTRIES_SHOW:
            return {
                ...state,
                countries: {
                    ...state.countries,
                    show: typeof action.show === 'boolean' ? action.show : !state.countries.show
                }
            };
        case SET_MAX_TIMEOUT:
            return {
                ...state,
                countOfResults: 25,
                timeout: {
                    ...state.timeout,
                    max: action.timeout
                }
            };
        case TOGGLE_MISC:
            return {
                ...state,
                countOfResults: 25,
                misc: {
                    ...state.misc,
                    [action.misc]: !state.misc[action.misc]
                }
            };
        case SET_SEARCH:
            return {
                ...state,
                countOfResults: 25,
                search: action.value
            };
        case LOAD_MORE:
            return {
                ...state,
                countOfResults: state.countOfResults + 25
            };
        case RESULT_CLOSE:
            return initialState;
        case TOGGLE_BLACKLIST:
            return {
                ...state,
                countOfResults: 25,
                inBlacklists: state.inBlacklists.map(item => {
                    if (item.title == action.title) {
                        return {
                            ...item,
                            active: !item.active
                        };
                    }

                    return item;
                })
            };
        default:
            return state;
    }
};

export default result;
