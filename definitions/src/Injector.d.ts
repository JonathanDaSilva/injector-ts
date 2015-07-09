/// <reference path="../typings/bundle.d.ts" />
export default class Injector {
    _register: Map<Object, Object>;
    constructor();
    get(klass: any): Object;
    register(id: string, klass: Function): void;
    _getRegistred(id: string): Object;
}
