import rp from 'request-promise';
import { FETCH_CONFIG } from '../constants/UpdateConstants';
import { remote } from 'electron';

const { app: { getVersion } } = remote;

export const currentVersion = getVersion();

export const getLatestVersionInfo = async () => {
    const versionInfo = await rp.get(FETCH_CONFIG);

    if (versionInfo.latest > currentVersion) {
        return versionInfo;
    }

    return false;
};
