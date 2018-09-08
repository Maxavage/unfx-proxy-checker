import { LOOKUP_URL } from './IpLookupConfigConstants';

export const SETTINGS_FILE_NAME = 'settings.unfx.json';

export const DEFAULT_SETTINGS = {
    threads: 350,
    timeout: 15000,
    retry: false,
    captureFullData: false,
    captureExtraData: false,
    usualJudge: 'http://pascal.hoez.free.fr/azenv.php',
    usualJudgeValidateString: 'pascal.hoez.free.fr',
    sslJudge: 'https://yandex.ru/company',
    sslJudgeValidateString: 'yandex',
    protocols: {
        http: true,
        https: true,
        socks4: true,
        socks5: true
    },
    ip: {
        current: '',
        lookupUrl: LOOKUP_URL
    }
};
