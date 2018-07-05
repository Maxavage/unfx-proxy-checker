const initialState = {
    items: [],
    filter: {
        protocols: 'all',
        anons: 'all',
        countries: 'all'
    }
};

const list = (state = initialState, action) => {
    switch (action.type) {
        case 'ADD_PROXY':
            return {
                ...state,
                items: action.list
            };
        case 'SET_FILTER':
            return {
                ...state,
                filter: {
                    protocols: action.params.protocols,
                    anons: action.params.anons,
                    countries: action.params.countries
                }
            };
        case 'CLEAR':
            return initialState;
        default:
            return state;
    }
};

export default list;
