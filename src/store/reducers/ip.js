const initialState = {
    isActive: false,
    currentIP: '',
    isLookupDone: false,
    isLookupSuccess: false,
    locked: false
};

const ip = (state = initialState, action) => {
    switch (action.type) {
        case 'CHANGE_IP_LOOKUP_STATUS':
            return {
                ...state,
                ...action.status
            };
        case 'CHANGE_IP_LOOKUP_TO_INITIAL':
            return initialState;
        default:
            return state;
    }
};

export default ip;
