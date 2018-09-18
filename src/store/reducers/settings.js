import { getSettings } from '../../core/settings';
import { CHANGE_SETTINGS, CHANGE_SETTINGS_JUDGE, ADD_SETTINGS_JUDGE, REMOVE_SETTINGS_JUDGE } from '../../constants/ActionTypes';

const initialSettings = getSettings();

const settings = (state = initialSettings, action) => {
    switch (action.type) {
        case CHANGE_SETTINGS:
            return {
                ...state,
                ...action.settings
            };
        case CHANGE_SETTINGS_JUDGE:
            return {
                ...state,
                judgesList: state.judgesList.map(item => {
                    if (item.url == action.url) {
                        return {
                            ...item,
                            ...action.settings
                        };
                    }

                    return item;
                })
            };
        case ADD_SETTINGS_JUDGE:
            if (state.judgesList.every(item => item.url != action.url)) {
                return {
                    ...state,
                    judgesList: [
                        ...state.judgesList,
                        {
                            url: action.url,
                            ssl: false,
                            validate: {
                                enabled: false,
                                value: ''
                            }
                        }
                    ]
                };
            }

            return state;
        case REMOVE_SETTINGS_JUDGE:
            return {
                ...state,
                judgesList: state.judgesList.filter(item => item.url != action.url)
            };
        default:
            return state;
    }
};

export default settings;
