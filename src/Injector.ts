/// <reference path="./../typings/bundle.d.ts"/>
import * as uuid from 'node-uuid'

export default class Injector {
    get(klass) {
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
}
