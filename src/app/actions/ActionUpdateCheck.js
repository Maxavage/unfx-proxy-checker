import Updater from '../updater';

export const ActionUpdateCheck = async (dispatch, close) => {
    const updater = new Updater();
    const details = await updater.checkAtAvailable();

    setTimeout(() => {
        if (details.status) {
            dispatch({
                updateIsAvailable: details.status,
                latestVersion: details.latestVersion,
                isChecking: false,
                updateDescription: details.updateDescription,
                updateFeatures: details.updateFeatures,
                downloads: details.downloads
            });
        } else {
            close();
        }
    }, 1500);
};
