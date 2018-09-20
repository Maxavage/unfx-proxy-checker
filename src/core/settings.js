import { writeFile, readFileSync, existsSync } from 'fs';
import { SETTINGS_FILE_PATH, DEFAULT_SETTINGS } from '../constants/SettingsConstants';

export const saveSettings = setting => {
    writeFile(SETTINGS_FILE_PATH, JSON.stringify(setting, null, 4), () => null);
};

export const getSettings = () => {
    if (existsSync(SETTINGS_FILE_PATH)) {
        try {
            return JSON.parse(readFileSync(SETTINGS_FILE_PATH, 'utf8'));
        } catch (error) {
            return DEFAULT_SETTINGS;
        }
    }

    return DEFAULT_SETTINGS;
};
