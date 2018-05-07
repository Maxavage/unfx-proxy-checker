export class ProxyMethods {
    static primitive(content) {
        return content.match(new RegExp('[1-2]?[0-9]{1,3}[.][1-2]?[0-9]{1,3}[.][1-2]?[0-9]{1,3}[.][1-2]?[0-9]{1,3}[:][1-9]?[0-9]{1,5}', 'gi'));
    }
}