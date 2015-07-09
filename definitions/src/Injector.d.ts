/// <reference path="../typings/bundle.d.ts" />
export default class Injector {
    private _register;
    private _storage;
    private _singleton;
    get(klass: any, id?: string): Object;
    has(klass: Function, id: string): boolean;
    private getInstance(klass, id);
    private createInstance(klass, id?);
    private isInRegister(id);
    register(id: string | Function, klass: Function): void;
    private getRegistred(id);
    singleton(klass: Function): void;
}
