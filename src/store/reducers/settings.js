import { getSettings } from '../../core/settings';
import { CHANGE_SETTINGS } from '../../constants/ActionTypes';

const initialSettings = getSettings();

const settings = (state = initialSettings, action) => {
    switch (action.type) {
        case CHANGE_SETTINGS:
            return {
                ...state,
                ...action.settings
            }
        default:
            return state;
    }
};

export default settings;
