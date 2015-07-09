/// <reference path="./../typings/bundle.d.ts"/>
import * as uuid             from 'node-uuid'
import InjectorRegisterError from './InjectorRegisterError'

export default class Injector {
    _register: Map<Object, Object>

    constructor() {
        this._register = new Map()
    }

    get(klass): Object {
        // Get from register
        if(this._isInRegister(klass)) {
            klass = this._getRegistred(klass)
            return this.get(klass)
        }
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
        inst.__id = uuid.v4()
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
