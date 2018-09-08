import { CHANGE_SETTINGS } from '../constants/ActionTypes';

export const changeSettings = settings => ({
    type: CHANGE_SETTINGS,
    settings
});
