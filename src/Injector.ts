/// <reference path="./../typings/bundle.d.ts"/>
import * as uuid from 'node-uuid'

export default class Injector {
    get(cls) {
        var inst = new cls
        inst.__id = uuid.v4()
        return inst
    }
}
