/// <reference path="./../typings/bundle.d.ts"/>
import * as uuid             from 'node-uuid'
import InjectorRegisterError from './InjectorRegisterError'

export default class Injector {
    private _register  = new Map<Function|string, Function>()
    private _storage   = new Map<Function, Map<string, Object>>()
    private _singleton = new Set<Function>()

    public get(klass, id?: string): Object {
        // Get from register
        if(this.isInRegister(klass)) {
            klass = this.getRegistred(klass)
            return this.get(klass)
        }
        // Singleton
        if(this._singleton.has(klass)) {
            id = '__singleton'
        }
        // Check getting from id
        if(
            id !== undefined &&
            this.has(klass, id)
        ) {
            return this.getInstance(klass, id)
        } else {
            return this.createInstance(klass, id)
        }
    }

    public has(klass: Function, id: string): boolean {
        return (
            this._storage.has(klass) &&
            this._storage.get(klass).has(id)
        )
    }

    private getInstance(klass, id: string): Object {
        return this._storage.get(klass).get(id)
    }

    private createInstance(klass, id?: string): Object {
        // Create Dependencies
        var deps = []
        for(var dep of klass.__dependencies || []) {
            deps.push(this.get(dep))
        }
        // Create instance
        var inst = new (Function.prototype.bind.apply(
            klass,
            [null].concat(deps)
        ))
        // Create of assign id
        if(id === undefined) {
            inst.__id = uuid.v4()
        } else {
            inst.__id = id
        }
        // Store instance
        if(!this._storage.has(klass)) {
            this._storage.set(klass, new Map<string, Object>())
        }
        this._storage.get(klass).set(inst.__id, inst)
        return inst
    }

    private isInRegister(id: string|Function): boolean {
        return this._register.has(id)
    }

    public register(id: string|Function, klass: Function): void {
        if(this.isInRegister(id)) {
            throw new InjectorRegisterError()
        }
        this._register.set(id, klass)
    }

    private getRegistred(id: string|Function): Function {
        return this._register.get(id)
    }

    public singleton(klass: Function): void {
        this._singleton.add(klass)
    }
}
