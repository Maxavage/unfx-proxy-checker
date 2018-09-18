import { EventEmitter } from 'events';
import Checker from './checker';

EventEmitter.defaultMaxListeners = 0;

export default class Core {
    static checker;

    static stop() {
        this.checker.stop();
    }
    
    static start(proxies, options, judges, checkProtocols, ip) {
        this.checker = new Checker(proxies, options, ip, judges, checkProtocols);
        this.checker.start();
    }
}
