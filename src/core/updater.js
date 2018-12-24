import rp from 'request-promise';
import { FETCH_CONFIG } from '../constants/UpdateConstants';
import { remote } from 'electron';

const {
    app: { getVersion }
} = remote;

export const currentVersion = getVersion();

export const getLatestVersionInfo = async () => {
    try {
        const releaseData = await rp.get(FETCH_CONFIG);
        const version = releaseData.tag_name.slice(1);

        return version > currentVersion ? { version, releaseData } : false;
    } catch (error) {
        return false;
    }
};
