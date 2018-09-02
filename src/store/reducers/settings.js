import { getSettings } from '../../core/settings';

const initialSettings = getSettings();

const settings = (state = initialSettings, action) => {
    switch (action.type) {
        case 'CHANGE':
            return {
                ...state,
                ...action.settings
            }
        default:
            return state;
    }
};

export default settings;
