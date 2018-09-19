import { LOOKUP_URL } from './IpLookupConfigConstants';

export const SETTINGS_FILE_NAME = 'settings.unfx.json';

export const DEFAULT_SETTINGS = {
    threads: 350,
    timeout: 15000,
    retry: false,
    captureFullData: false,
    captureExtraData: false,
    swapJudges: true,
    judgesList: [
        {
            url: 'http://proxyjudge.info/',
            ssl: false,
            validate: {
                enabled: true,
                value: 'proxyjudge.info'
            }
        },
        {
            url: 'https://yandex.ru/company',
            ssl: true,
            validate: {
                enabled: true,
                value: 'yandex'
            }
        },
        {
            url: 'http://www.sbjudge3.com/azenv.php',
            ssl: false,
            validate: {
                enabled: true,
                value: 'sbjudge3.com'
            }
        },
        {
            url: 'http://proxyjudge.us/azenv.php',
            ssl: false,
            validate: {
                enabled: true,
                value: 'proxyjudge.us'
            }
        },
        {
            url: 'http://azenv.net/',
            ssl: false,
            validate: {
                enabled: true,
                value: 'azenv.net'
            }
        },
        {
            url: 'http://www.cooleasy.com/azenv.php',
            ssl: false,
            validate: {
                enabled: true,
                value: 'cooleasy.com'
            }
        },
        {
            url: 'http://www.proxy-listen.de/azenv.php',
            ssl: false,
            validate: {
                enabled: true,
                value: 'proxy-listen.de'
            }
        }
    ],
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
