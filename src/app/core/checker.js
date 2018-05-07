import request from 'request';
import ProxyAgent from "proxy-agent";
import store from '../store';
import {getCountryByIP} from './country/main';
import {EventEmitter} from 'events';
EventEmitter.defaultMaxListeners = 0;

class Checker {
    constructor(proxies, opts) {
        this.status = {
            counter: {
                proxies: {
                    all: proxies.length,
                    done: 0,
                    http: 0,
                    https: 0,
                    socks4: 0,
                    socks5: 0
                }
            },
            list: {}
        }

        this.states = {
            // for temporary checking states
            // this.initProxyState()
        }

        this.timeout = opts.timeout;

        this.judges = {
            usual: {
                url: 'http://proxyjudge.info/',
                validateString: '<h1>ProxyJudge.info</h1>'
            },
            ssl: {
                url: 'https://judge.unforceproxy.ru/',
                validateString: '<p>Unforceproxy - Proxy judge</p>'
            }
        }

        this.pool = {
            running: 0,
            limit: opts.threads,
            queue: proxies
        }
    }

    getIp() {
        return new Promise((resolve, reject) => {
            request.get({url: 'https://ip.unforceproxy.ru/', timeout: this.timeout}, (err, res) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(res.body);
                }
            })
        })
    }

    initProxyState(proxy) {
        this.states[proxy] = {
            time: 0,
            anon: null,
            doneLevel: 0,
            type: []
        }
    }

    getAnon(text) {
        if(text.match(new RegExp(this.ip, 'g'))){
            return "Transparent";
        }

        if(text.match(new RegExp('HTTP_VIA', 'g'))){
            return "Anonymous";
        }

        return "Elite";
    }

    isMaxed() {
        return this.pool.running >= this.pool.limit;
    }

    next() {
        this.pool.running--;
        this.run();
    }

    validateResponse(body, judge) {
        return body.match(new RegExp(this.judges[judge].validateString, 'g'));
    }

    handleResponse(error, response, proxy, type, judge) {
        this.states[proxy].doneLevel++;
        if (!error && this.validateResponse(response.body, judge)) {
            this.states[proxy].time = response.elapsedTime;
            this.states[proxy].type.push(type);
            this.status.counter.proxies[type]++;
            this.states[proxy].anon = this.getAnon(response.body);
        }

        this.isDone(proxy);
    }

    checkHttp(proxy) {
        let httpAgent = new ProxyAgent("http://" + proxy);
        httpAgent.timeout = this.timeout;
        
        request.get({url: this.judges.usual.url, time: true, timeout: this.timeout, agent: httpAgent},
        (err, res) => {
            this.handleResponse(err, res, proxy, 'http', 'usual');
        });
    }

    checkHttps(proxy) {
        let httpsAgent = new ProxyAgent("http://" + proxy);
        httpsAgent.timeout = this.timeout;
        
        request.get({url: this.judges.ssl.url, time: true, strictSSL: true, timeout: this.timeout, agent: httpsAgent},
        (err, res) => {
            this.handleResponse(err, res, proxy, 'https', 'ssl');
        });
    }

    checkSocks4(proxy) {
        let socks4Agent = new ProxyAgent("socks4://" + proxy);
        socks4Agent.timeout = this.timeout;
        
        request.get({url: this.judges.usual.url, time: true, timeout: this.timeout, agent: socks4Agent},
        (err, res) => {
            this.handleResponse(err, res, proxy, 'socks4', 'usual');
        });
    }

    checkSocks5(proxy) {
        let socks5Agent = new ProxyAgent("socks5://" + proxy);
        socks5Agent.timeout = this.timeout;

        request.get({url: this.judges.usual.url, time: true, timeout: this.timeout, agent: socks5Agent},
        (err, res) => {
            this.handleResponse(err, res, proxy, 'socks5', 'usual');
        });
    }

    isDone(proxy) {
        if(this.states[proxy].doneLevel == 4){
            this.status.counter.proxies.done++;
            store.dispatch({type: 'UP_STATUS', count: this.status.counter.proxies});

            if(this.states[proxy].type.length > 0){
                const split = proxy.split(":");
                const country = getCountryByIP(split[0]);

                this.status.list[proxy] = {
                    ip: split[0],
                    port: split[1],
                    timeout: this.states[proxy].time,
                    anon: this.states[proxy].anon,
                    type: this.states[proxy].type,
                    country: country.name,
                    flag: country.flag
                }
            }

            if(this.status.counter.proxies.done == this.status.counter.proxies.all){
                store.dispatch({type: 'ADD_PROXY', list: this.status.list});
                this.dispatchDone();
            }else{
                this.next();
            }
        }
    }

    run() {
        if(this.isMaxed() || this.pool.queue.length == 0){
            return;
        }

        this.pool.running++;
        const proxy = this.pool.queue.shift();
        this.initProxyState(proxy);

        this.checkHttp(proxy);
        this.checkHttps(proxy);
        this.checkSocks4(proxy);
        this.checkSocks5(proxy);
    }

    async check(dispatchDone) {
        this.ip = await this.getIp();
        this.dispatchDone = dispatchDone;
        
        this.status.counter.proxies.all = this.pool.queue.length;
        store.dispatch({type: 'UP_STATUS', count: this.status.counter.proxies});
        let startPoolThreadsCount = this.pool.queue.length > this.pool.limit ? this.pool.limit : this.pool.queue.length;

        setTimeout(() => {
            for (let index = 0; index < startPoolThreadsCount; index++) {
                this.run();
            }
        }, 300);
    }
}

export default Checker;