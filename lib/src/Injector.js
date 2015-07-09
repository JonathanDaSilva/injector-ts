/// <reference path="./../typings/bundle.d.ts"/>
var uuid = require('node-uuid');
var InjectorRegisterError_1 = require('./InjectorRegisterError');
var Injector = (function () {
    function Injector() {
        this._register = new Map();
    }
    Injector.prototype.get = function (klass) {
        // Create Dependencies
        var deps = [];
        for (var _i = 0, _a = klass.__dependencies || []; _i < _a.length; _i++) {
            var dep = _a[_i];
            // Get from register
            if (typeof dep === 'string') {
                dep = this._getRegistred(dep);
            }
            deps.push(this.get(dep));
        }
        // Create instance
        var inst = new (Function.prototype.bind.apply(klass, [null].concat(deps)));
        inst.__id = uuid.v4();
        return inst;
    };
    Injector.prototype.register = function (id, klass) {
        if (this._register.has(id)) {
            throw new InjectorRegisterError_1.default();
        }
        this._register.set(id, klass);
    };
    Injector.prototype._getRegistred = function (id) {
        return this._register.get(id);
    };
    return Injector;
})();
exports.default = Injector;
