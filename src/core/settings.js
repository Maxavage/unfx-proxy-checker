import { writeFile, readFileSync, existsSync } from 'fs';
import { SETTINGS_FILE_NAME, DEFAULT_SETTINGS } from '../constants/SettingsConstants';

export const saveSettings = setting => {
    writeFile(SETTINGS_FILE_NAME, JSON.stringify(setting, null, 4), () => null);
};

export const getSettings = () => {
    if (existsSync(SETTINGS_FILE_NAME)) {
        try {
            return JSON.parse(readFileSync(SETTINGS_FILE_NAME, 'utf8'));
        } catch (error) {
            return DEFAULT_SETTINGS;
        }
    }

    return DEFAULT_SETTINGS;
};
