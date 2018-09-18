import { CHANGE_SETTINGS, CHANGE_SETTINGS_JUDGE, ADD_SETTINGS_JUDGE, REMOVE_SETTINGS_JUDGE } from '../constants/ActionTypes';

export const changeSettings = settings => ({
    type: CHANGE_SETTINGS,
    settings
});

export const changeSettingsJudge = (url, settings) => ({
    type: CHANGE_SETTINGS_JUDGE,
    url,
    settings
});

export const addSettingsJudge = url => ({
    type: ADD_SETTINGS_JUDGE,
    url
});

export const removeSettingsJudge = url => ({
    type: REMOVE_SETTINGS_JUDGE,
    url
});
