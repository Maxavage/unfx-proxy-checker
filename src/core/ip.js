import rp from 'request-promise';
import { LOOKUP_URL, LOOKUP_CONFIG } from '../constants/IpLookupConfigConstants';

export const getIP = url => {
    try {
        return rp.get({
            ...LOOKUP_CONFIG,
            url: url ? url : LOOKUP_URL
        });
    } catch (error) {
        throw new Error('Ip lookup fail. Try later.');
    }
};
