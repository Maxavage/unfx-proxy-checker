import { writeFile, readFileSync, existsSync } from 'fs';

const FILE_NAME = 'settings.unfx';
const DEFAULT_SETTING = {
    core: {
        threads: 350,
        timeout: 15000
    },
    judges: {
        usual: {
            url: 'http://proxyjudge.info/',
            validateString: '<h1>ProxyJudge.info</h1>'
        },
        ssl: {
            url: 'https://www.yandex.ru/',
            validateString: 'yandex.ru'
        }
    },
    checkProtocols: {
        http: true,
        https: true,
        socks4: true,
        socks5: true
    }
};

export const saveSettings = setting => {
    writeFile(FILE_NAME, JSON.stringify(setting), () => {});
};

export const getSettings = () => {
    if (existsSync(FILE_NAME)) {
        return JSON.parse(readFileSync(FILE_NAME, 'utf8'));
    }

    return DEFAULT_SETTING;
};
