import { getIP } from '../core/ip';
import { changeSettings } from './SettingsActions';
import { wait } from '../misc/wait';
import { isIP } from '../misc/regexes';
import { CHANGE_IP_LOOKUP_STATUS, CHANGE_IP_LOOKUP_TO_INITIAL } from '../constants/ActionTypes';

export const changeIpLookupStatus = status => ({
    type: CHANGE_IP_LOOKUP_STATUS,
    status
});

export const toInitialState = () => ({
    type: CHANGE_IP_LOOKUP_TO_INITIAL
});

export const IpLookup = chainEvent => async (dispatch, getState) => {
    const { settings, ip } = getState();
    
    if (ip.locked) {
        return;
    }

    dispatch(changeIpLookupStatus({ isActive: true, locked: true }));

    const onError = async () => {
        await wait(500);
        dispatch(
            changeIpLookupStatus({
                isLookupDone: true,
                isLookupSuccess: false
            })
        );

        await wait(3000);
        dispatch(changeIpLookupStatus({ isActive: false }));
        await wait(500);
        dispatch(toInitialState());
    };

    try {
        const response = await getIP(settings.ip.lookupUrl);

        if (isIP(response)) {
            await wait(500);
            dispatch(
                changeIpLookupStatus({
                    currentIP: response,
                    isLookupDone: true,
                    isLookupSuccess: true
                })
            );

            dispatch(changeSettings({ ip: { ...settings.ip, current: response } }));

            await wait(1000);
            dispatch(changeIpLookupStatus({ isActive: false }));

            if (chainEvent) {
                chainEvent(response);
            }

            await wait(500);
            dispatch(toInitialState());
        } else {
            onError();
        }
    } catch (error) {
        onError();
    }
};
