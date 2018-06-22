import rp from 'request-promise';
import {remote} from 'electron';
const {app} = remote;
const FETCH_CURRENT_VERSION_URL = 'https://api.openproxy.space/version/checker';

export default class Updater {
    constructor() {
        this.currentVersion = app.getVersion();
    }

    getLatestVersion() {
        return rp.get({url: FETCH_CURRENT_VERSION_URL, json: true, timeout: 15000, headers: {'User-Agent': 'UNFX VERSION LOOKUP'}});
    }

    async checkAtAvailable() {
        try {
            const version = await this.getLatestVersion();

            if (version.latest > this.currentVersion) {
                return {
                    status: true,
                    latestVersion: version.latest,
                    updateDescription: version.description,
                    updateFeatures: version.features,
                    downloads: version.downloads
                };
            }

            return {
                status: false,
                latestVersion: this.currentVersion
            };
        } catch (error) {
            return {
                status: false,
                latestVersion: this.currentVersion
            };
        }
    }
}