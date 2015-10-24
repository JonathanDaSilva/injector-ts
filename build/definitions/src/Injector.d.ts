export interface giveInterface {
    give(object: any): void;
}
export declare class Injector {
    private static _mocker;
    private _register;
    private _mocks;
    private _singleton;
    static setMocker(mocker: any): void;
    get<T>(klass: any): T;
    default(id: string, klass: Function): void;
    when(klass: any): giveInterface;
    mockDependencies(klass: any): void;
    private isSingleton(klass);
    private getSingleton<T>(klass);
    private createInstance<T>(klass);
    private getRegistred(klass);
}
