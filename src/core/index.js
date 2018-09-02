import { EventEmitter } from 'events';
import Checker from './checker';

EventEmitter.defaultMaxListeners = 0;

class Core {
    constructor() {
        this.checker;
    }

    stop() {
        this.checker.stop();
    }

    start(proxies, options, judges, checkProtocols, ip) {
        this.checker = new Checker(proxies, options, ip, judges, checkProtocols);
        this.checker.start();
    }
}

const core = new Core();

export default core;
