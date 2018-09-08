import { writeFile, readFileSync, existsSync } from 'fs';
import { SETTINGS_FILE_NAME, DEFAULT_SETTINGS } from '../constants/SettingsConstants';

export const saveSettings = setting => {
    writeFile(SETTINGS_FILE_NAME, JSON.stringify(setting, null, 4), () => null);
};

export const getSettings = () => {
    if (existsSync(SETTINGS_FILE_NAME)) {
        return JSON.parse(readFileSync(SETTINGS_FILE_NAME, 'utf8'));
    }

    return DEFAULT_SETTINGS;
};
