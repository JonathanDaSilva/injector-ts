/// <reference path="./../typings/bundle.d.ts"/>
var uuid = require('node-uuid');
var InjectorRegisterError_1 = require('./InjectorRegisterError');
var Injector = (function () {
    function Injector() {
        this._register = new Map();
        this._storage = new Map();
        this._singleton = new Set();
    }
    Injector.prototype.get = function (klass, id) {
        // Get from register
        if (this.isInRegister(klass)) {
            klass = this.getRegistred(klass);
            return this.get(klass);
        }
        // Singleton
        if (this._singleton.has(klass)) {
            id = '__singleton';
        }
        // Check getting from id
        if (id !== undefined &&
            this.has(klass, id)) {
            return this.getInstance(klass, id);
        }
        else {
            return this.createInstance(klass, id);
        }
    };
    Injector.prototype.has = function (klass, id) {
        return (this._storage.has(klass) &&
            this._storage.get(klass).has(id));
    };
    Injector.prototype.getInstance = function (klass, id) {
        return this._storage.get(klass).get(id);
    };
    Injector.prototype.createInstance = function (klass, id) {
        // Create Dependencies
        var deps = [];
        for (var _i = 0, _a = klass.__dependencies || []; _i < _a.length; _i++) {
            var dep = _a[_i];
            deps.push(this.get(dep));
        }
        // Create instance
        var inst = new (Function.prototype.bind.apply(klass, [null].concat(deps)));
        // Create of assign id
        if (id === undefined) {
            inst.__id = uuid.v4();
        }
        else {
            inst.__id = id;
        }
        // Store instance
        if (!this._storage.has(klass)) {
            this._storage.set(klass, new Map());
        }
        this._storage.get(klass).set(inst.__id, inst);
        return inst;
    };
    Injector.prototype.isInRegister = function (id) {
        return this._register.has(id);
    };
    Injector.prototype.register = function (id, klass) {
        if (this.isInRegister(id)) {
            throw new InjectorRegisterError_1.default();
        }
        this._register.set(id, klass);
    };
    Injector.prototype.getRegistred = function (id) {
        return this._register.get(id);
    };
    Injector.prototype.singleton = function (klass) {
        this._singleton.add(klass);
    };
    return Injector;
})();
exports.default = Injector;
