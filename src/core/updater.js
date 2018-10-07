import rp from 'request-promise';
import { FETCH_CONFIG } from '../constants/UpdateConstants';
import { remote } from 'electron';

const { app: { getVersion } } = remote;

export const currentVersion = getVersion();

export const getLatestVersionInfo = async () => {
    const releaseData = await rp.get(FETCH_CONFIG);
    const version = releaseData.tag_name.slice(1);
    
    if (version > currentVersion) {
        return {
            version,
            releaseData
        };
    }

    return false;
};
