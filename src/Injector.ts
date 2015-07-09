/// <reference path="./../typings/bundle.d.ts"/>
import * as uuid             from 'node-uuid'
import InjectorRegisterError from './InjectorRegisterError'

export default class Injector {
    _register: Map<Object, Object>

    constructor() {
        this._register = new Map()
    }

    get(klass): Object {
        // Create Dependencies
        var deps = []
        for(var dep of klass.__dependencies || []) {
            // Get from register
            if(typeof dep === 'string') {
                dep = this._getRegistred(dep)
            }

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

    register(id: string, klass: Function): void {
        if(this._register.has(id)) {
            throw new InjectorRegisterError()
        }
        this._register.set(id, klass)
    }

    _getRegistred(id: string) {
        return this._register.get(id)
    }
}
