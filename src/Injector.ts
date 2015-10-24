export interface giveInterface {
    give(object): void
}

export class Injector {
    private static _mocker

    private _register  = new Map<string, Function>()
    private _mocks     = new Map<Function, any>()
    private _singleton = new Map<Function, any>()

    public static setMocker(mocker) {
        Injector._mocker = mocker
    }

    public get<T>(klass): T {
        // Interface
        klass = this.getRegistred(klass)
        // Mocks
        if(this._mocks.has(klass)) {
            return this._mocks.get(klass)
        }
        // Singleton
        if(this.isSingleton(klass)) {
            return this.getSingleton<T>(klass)
        }
        // Instatiate Class
        return this.createInstance<T>(klass)
    }

    public default(id: string, klass: Function): void {
        this._register.set(id, klass)
    }

    public when(klass): giveInterface {
        return {
            give: function(mock) {
                this._mocks.set(klass, mock)
            }.bind(this)
        }
    }

    public mockDependencies(klass): void {
        for(var dep of klass.__dependencies) {
            dep = this.getRegistred(dep)
            this.when(dep).give(Injector._mocker(dep))
        }
    }

    private isSingleton(klass): boolean {
        return !!klass.__singleton
    }

    private getSingleton<T>(klass): T {
        if(this._singleton.has(klass)) {
            return this._singleton.get(klass)
        } else {
            var inst = this.createInstance<T>(klass)
            this._singleton.set(klass, inst)
            return inst
        }
    }

    private createInstance<T>(klass): T {
        // Create Dependencies
        var deps = []
        for(var dep of klass.__dependencies || []) {
            deps.push(this.get(dep))
        }
        // Create instance
        var instance = new (Function.prototype.bind.apply(
            klass,
            [null].concat(deps)
        ))
        instance._injector = this
        return instance
    }

    private getRegistred(klass): Function {
        if(this._register.has(klass)) {
            klass = this._register.get(klass)
            return this.getRegistred(klass)
        }
        return klass
    }
}
