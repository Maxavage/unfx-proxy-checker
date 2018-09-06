import rp from 'request-promise';
import store from '../store';
import ProxyAgent from 'proxy-agent';
import { uniq } from '../misc/uniq';
import { lookup } from './country';
import { toggleOpen as toggleChecking, upCounterStatus } from '../actions/CheckingActions';
import { toggleOpen as toggleResult, addResult } from '../actions/ResultActions';

export default class Checker {
    constructor(proxies, options, ip, judges, checkProtocols) {
        this.checkProtocols = checkProtocols;
        this.doneLevel = checkProtocols.length;
        this.tempStates = {
            // for temporary check states
            // this.initTempState()
        };

        this.ip = ip;
        this.stopped = false;
        this.timeout = options.timeout;
        this.captureFullData = options.captureFullData;
        this.captureExtraData = options.captureExtraData;
        this.judges = judges;
        this.pool = {
            running: 0,
            limit: options.threads,
            queue: proxies
        };

        this.counter = this.initCounter();
        this.initialRequestConfig = {
            time: true,
            timeout: this.timeout,
            resolveWithFullResponse: true,
            url: this.judges.usual.url
        };

        this.retry = options.retry;

        this.checkAt = {
            http: async (proxy, retry) => {
                try {
                    const response = await rp.get(this.getRequestConfig({ agent: this.getAgentConfig('http://', proxy) }));
                    this.onResponse(response, proxy, 'http', 'usual');
                } catch (error) {
                    this.onError(error, proxy, 'http', retry);
                }
            },
            https: async (proxy, retry) => {
                try {
                    const response = await rp.get(this.getRequestConfig({ url: this.judges.ssl.url, agent: this.getAgentConfig('http://', proxy) }));
                    this.onResponse(response, proxy, 'https', 'ssl');
                } catch (error) {
                    this.onError(error, proxy, 'https', retry);
                }
            },
            socks4: async (proxy, retry) => {
                try {
                    const response = await rp.get(this.getRequestConfig({ agent: this.getAgentConfig('socks4://', proxy) }));
                    this.onResponse(response, proxy, 'socks4', 'usual');
                } catch (error) {
                    this.onError(error, proxy, 'socks4', retry);
                }
            },
            socks5: async (proxy, retry) => {
                try {
                    const response = await rp.get(this.getRequestConfig({ agent: this.getAgentConfig('socks5://', proxy) }));
                    this.onResponse(response, proxy, 'socks5', 'usual');
                } catch (error) {
                    this.onError(error, proxy, 'socks5', retry);
                }
            }
        };

        this.check = this.buildCheck(this.checkProtocols);

        this.upCounterStatus = setInterval(() => {
            store.dispatch(upCounterStatus(this.counter));
        }, 250);
    }

    initCounter() {
        let counter = {
            all: this.pool.queue.length,
            done: 0,
            protocols: {}
        };

        this.checkProtocols.forEach(protocol => (counter.protocols[protocol] = 0));

        return counter;
    }

    initTempState(proxy) {
        this.tempStates[proxy] = {
            timeouts: [],
            anons: [],
            doneLevel: 0,
            protocols: [],
            extra: false,
            data: null
        };
    }

    isIssetExtraMarks(body) {
        let marks = null;

        if (body.match(/keep-alive/i)) {
            marks = { ...marks, keepAlive: true };
        }

        if (body.match(/squid/i)) {
            marks = { ...marks, server: 'squid' };
        }

        if (body.match(/ubuntu/i)) {
            marks = { ...marks, os: 'ubuntu' };
        }

        if (body.match(/centos/i)) {
            marks = { ...marks, os: 'centos' };
        }

        if (body.match(/mikrotik/i)) {
            marks = { ...marks, server: 'mikrotik' };
        }

        if (body.match(/apache/i)) {
            marks = { ...marks, server: 'apache' };
        }

        if (body.match(/nginx/i)) {
            marks = { ...marks, server: 'nginx' };
        }

        return marks;
    }

    getAnon(body) {
        if (body.match(new RegExp(this.ip))) {
            return 'transparent';
        }

        if (body.match(/HTTP_VIA/)) {
            return 'anonymous';
        }

        return 'elite';
    }

    next() {
        this.pool.running--;
        this.run();
    }

    validateResponse(body, judge) {
        return body.match(new RegExp(this.judges[judge].validateString), 'g');
    }

    onResponse(response, proxy, protocol, judge) {
        if (this.stopped) {
            return;
        }

        if (this.validateResponse(response.body, judge)) {
            const anon = this.getAnon(response.body);

            if (this.captureExtraData) {
                const extra = this.isIssetExtraMarks(response.body);

                if (extra) {
                    this.tempStates[proxy].extra = extra;
                }
            }

            this.tempStates[proxy].timeouts.push(response.elapsedTime);
            this.tempStates[proxy].protocols.push(protocol);
            this.tempStates[proxy].anons.push(anon);

            if (this.captureFullData) {
                this.tempStates[proxy].data = {
                    ...this.tempStates[proxy].data,
                    [protocol]: {
                        timings: response.timings,
                        anon: anon,
                        response: {
                            statusMessage: response.statusMessage,
                            body: response.body,
                            headers: response.headers
                        }
                    }
                };
            }

            this.counter.protocols[protocol]++;
        }

        this.tempStates[proxy].doneLevel++;
        this.isDone(proxy);
    }

    onError(error, proxy, protocol, retry) {
        if (this.stopped) {
            return;
        }

        if (!retry && this.retry) {
            return this.checkAt[protocol](proxy, true);
        }

        this.tempStates[proxy].doneLevel++;
        this.isDone(proxy);
    }

    getAgentConfig(scheme, proxy) {
        let agent = new ProxyAgent(scheme + proxy);
        agent.timeout = this.timeout;

        return agent;
    }

    getRequestConfig(mergeConfig) {
        return {
            ...this.initialRequestConfig,
            ...mergeConfig
        };
    }

    buildCheck(protocols) {
        if (protocols.length == 1) {
            return this.checkAt[protocols[0]];
        }

        if (protocols.length == 4) {
            const all = proxy => {
                this.checkAt.http(proxy);
                this.checkAt.https(proxy);
                this.checkAt.socks4(proxy);
                this.checkAt.socks5(proxy);
            };

            return all;
        }

        const other = proxy => {
            protocols.forEach(protocol => {
                this.checkAt[protocol](proxy);
            });
        };

        return other;
    }

    getResult() {
        const result = [];

        const calcTimeout = timeouts => {
            if (timeouts.length > 1) {
                return timeouts.reduce((a, b) => a + b) / timeouts.length;
            }

            return timeouts[0];
        };

        const getAnon = anons => (anons.length > 1 ? uniq(anons) : anons);

        for (let proxy in this.tempStates) {
            if (this.tempStates[proxy].protocols.length > 0) {
                const split = proxy.split(':');

                result.push({
                    ip: split[0],
                    port: split[1],
                    timeout: calcTimeout(this.tempStates[proxy].timeouts),
                    anons: getAnon(this.tempStates[proxy].anons),
                    protocols: this.tempStates[proxy].protocols,
                    country: lookup(split[0]),
                    extra: this.tempStates[proxy].extra,
                    data: this.tempStates[proxy].data
                });
            }
        }

        delete this.tempStates;
        return result;
    }

    isDone(proxy) {
        if (this.tempStates[proxy].doneLevel == this.doneLevel) {
            this.counter.done++;

            if (this.counter.done == this.counter.all) {
                this.dispatchResult();
            } else {
                this.next();
            }
        }
    }

    run() {
        if (!this.pool.queue.length) {
            return;
        }

        this.pool.running++;
        const proxy = this.pool.queue.pop();
        this.initTempState(proxy);
        this.check(proxy);
    }

    dispatchResult() {
        store.dispatch(addResult(this.getResult(), { isEnabled: this.captureExtraData, showSignatures: this.captureExtraData }));
        store.dispatch(toggleChecking());
        store.dispatch(toggleResult());
        clearInterval(this.upCounterStatus);
    }

    stop() {
        this.stopped = true;
        this.dispatchResult();
    }

    start() {
        store.dispatch(upCounterStatus(this.counter));
        store.dispatch(toggleChecking());

        const startPoolThreadsCount = this.pool.queue.length > this.pool.limit ? this.pool.limit : this.pool.queue.length;

        setTimeout(() => {
            for (let index = 0; index < startPoolThreadsCount; index++) {
                this.run();
            }
        }, 300);
    }
}
