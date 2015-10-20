export interface giveInterface {
    give(object: any): void;
}
export declare class Injector {
    private static _mocker;
    private _register;
    private _mocks;
    private _singleton;
    static setMocker(mocker: any): void;
    get(klass: any): Object;
    default(id: string, klass: Function): void;
    when(klass: any): giveInterface;
    mockDependencies(klass: any): void;
    private isSingleton(klass);
    private getSingleton(klass);
    private createInstance(klass);
    private getRegistred(klass);
}
