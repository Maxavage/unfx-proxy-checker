import request from 'request';
import ProxyAgent from "proxy-agent";
import store from '../store';
import {getCountryByIP} from './country/main';
import {EventEmitter} from 'events';
EventEmitter.defaultMaxListeners = 0;

class Checker {
    constructor(proxies, options, judges) {
        this.state = {
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

        this.tempStates = {
            // for temporary check states
            // this.initProxyState()
        }

        this.timeout = options.timeout;
        this.judges = judges;

        this.pool = {
            running: 0,
            limit: options.threads,
            queue: proxies
        }
    }

    getIp() {
        return new Promise((resolve, reject) => {
            request.get({url: 'https://api.openproxy.space/ip', timeout: this.timeout, headers: {'User-Agent': 'UNFX IP LOOKUP'}}, 
            (err, res) => {
                err ? reject(err) : resolve(res.body);
            })
        })
    }

    initProxyState(proxy) {
        this.tempStates[proxy] = {
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
        this.tempStates[proxy].doneLevel++;
        if (!error && this.validateResponse(response.body, judge)) {
            this.tempStates[proxy].time = response.elapsedTime;
            this.tempStates[proxy].type.push(type);
            this.state.counter.proxies[type]++;
            this.tempStates[proxy].anon = this.getAnon(response.body);
        }

        this.isDone(proxy);
    }

    getAgentConfig(scheme, proxy) {
        let agent = new ProxyAgent(scheme + proxy);
        agent.timeout = this.timeout;
        return agent;
    }

    checkHttp(proxy) {
        request.get({
            url: this.judges.usual.url, 
            time: true, 
            timeout: this.timeout, 
            agent: this.getAgentConfig("http://", proxy)
        },
        (err, res) => {
            this.handleResponse(err, res, proxy, 'http', 'usual');
        });
    }

    checkHttps(proxy) {
        request.get({
            url: this.judges.ssl.url, 
            time: true, 
            strictSSL: true, 
            timeout: this.timeout, 
            agent: this.getAgentConfig("http://", proxy)
        },
        (err, res) => {
            this.handleResponse(err, res, proxy, 'https', 'ssl');
        });
    }

    checkSocks4(proxy) {
        request.get({
            url: this.judges.usual.url, 
            time: true, 
            timeout: this.timeout, 
            agent: this.getAgentConfig("socks4://", proxy)
        },
        (err, res) => {
            this.handleResponse(err, res, proxy, 'socks4', 'usual');
        });
    }

    checkSocks5(proxy) {
        request.get({
            url: this.judges.usual.url, 
            time: true, 
            timeout: this.timeout, 
            agent: this.getAgentConfig("socks5://", proxy)
        },
        (err, res) => {
            this.handleResponse(err, res, proxy, 'socks5', 'usual');
        });
    }

    isDone(proxy) {
        store.dispatch({type: 'UP_STATUS', count: this.state.counter.proxies});
        
        if(this.tempStates[proxy].doneLevel == 4){
            this.state.counter.proxies.done++;

            if(this.tempStates[proxy].type.length > 0){
                const split = proxy.split(":");
                const country = getCountryByIP(split[0]);

                this.state.list[proxy] = {
                    ip: split[0],
                    port: split[1],
                    timeout: this.tempStates[proxy].time,
                    anon: this.tempStates[proxy].anon,
                    type: this.tempStates[proxy].type,
                    country: country.name,
                    flag: country.flag
                }
            }

            delete this.tempStates[proxy];

            if(this.state.counter.proxies.done == this.state.counter.proxies.all){
                store.dispatch({type: 'ADD_PROXY', list: this.state.list});
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
        try {
            this.ip = await this.getIp();
        } catch (error) {
            alert("Ip lookup fail. Try later.");
            dispatchDone();
            return;
        }
        
        this.dispatchDone = dispatchDone;
        
        this.state.counter.proxies.all = this.pool.queue.length;
        store.dispatch({type: 'UP_STATUS', count: this.state.counter.proxies});
        let startPoolThreadsCount = this.pool.queue.length > this.pool.limit ? this.pool.limit : this.pool.queue.length;

        setTimeout(() => {
            for (let index = 0; index < startPoolThreadsCount; index++) {
                this.run();
            }
        }, 300);
    }
}

export default Checker;