/// <reference path="./../typings/bundle.d.ts"/>
import * as uuid             from 'node-uuid'
import InjectorRegisterError from './InjectorRegisterError'

export default class Injector {
    _register: Map<Object|string, Object>
    _storage:  Map<Object, Map<Object, Object>>

    constructor() {
        this._register = new Map()
        this._storage  = new Map<Object, Map<Object, Object>>()
    }

    get(klass, id?: string): Object {
        // Get from register
        if(this._isInRegister(klass)) {
            klass = this._getRegistred(klass)
            return this.get(klass)
        }
        // Check getting from id
        if(id === undefined) {
            return this._createInstance(klass)
        } else {
            return this._getInstance(klass, id)
        }
    }

    _getInstance(klass, id: string): Object {
        return this._storage.get(klass).get(id)
    }

    _createInstance(klass) {
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
        // Create Id
        inst.__id = uuid.v4()
        // Store instance
        if(!this._storage.has(klass)) {
            this._storage.set(klass, new Map())
        }
        this._storage.get(klass).set(inst.__id, inst)
        return inst
    }

    _isInRegister(id: string|Function) {
        return this._register.has(id)
    }

    register(id: string|Function, klass: Function): void {
        if(this._isInRegister(id)) {
            throw new InjectorRegisterError()
        }
        this._register.set(id, klass)
    }

    _getRegistred(id: string) {
        return this._register.get(id)
    }
}
