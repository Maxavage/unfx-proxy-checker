import { writeFile, readFileSync, existsSync } from 'fs';
import { SETTINGS_FILE_PATH, MERGED_DEFAULT_SETTINGS } from '../constants/SettingsConstants';

export const saveSettings = setting => {
    writeFile(SETTINGS_FILE_PATH, JSON.stringify(setting, null, 4), () => null);
};

const getSettings = () => {
    if (existsSync(SETTINGS_FILE_PATH)) {
        try {
            return JSON.parse(readFileSync(SETTINGS_FILE_PATH, 'utf8'));
        } catch (error) {
            return MERGED_DEFAULT_SETTINGS;
        }
    }
    
    return MERGED_DEFAULT_SETTINGS;
};

export const initial = getSettings();
