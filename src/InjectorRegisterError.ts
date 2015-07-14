export class InjectorRegisterError implements Error {
    name: string
    message: string
    constructor() {
        this.name    = 'InjectorRegisterError'
        this.message = 'Impossible to register two time on the same id, you can precise the namespace for example Foo.Bar'
    }
}
