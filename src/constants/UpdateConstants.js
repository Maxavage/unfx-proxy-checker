const FETCH_LATEST_VERSION_API_PATH = 'https://api.openproxy.space/version/checker';

export const FETCH_CONFIG = {
    url: FETCH_LATEST_VERSION_API_PATH,
    json: true,
    timeout: 5000,
    headers: {
        'User-Agent': 'UNFX VERSION LOOKUP'
    }
};
