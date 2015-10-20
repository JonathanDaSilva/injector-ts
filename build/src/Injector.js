var Injector = (function () {
    function Injector() {
        this._register = new Map();
        this._mocks = new Map();
        this._singleton = new Map();
    }
    Injector.setMocker = function (mocker) {
        Injector._mocker = mocker;
    };
    Injector.prototype.get = function (klass) {
        klass = this.getRegistred(klass);
        if (this._mocks.has(klass)) {
            return this._mocks.get(klass);
        }
        if (this.isSingleton(klass)) {
            return this.getSingleton(klass);
        }
        return this.createInstance(klass);
    };
    Injector.prototype.default = function (id, klass) {
        this._register.set(id, klass);
    };
    Injector.prototype.when = function (klass) {
        return {
            give: function (mock) {
                this._mocks.set(klass, mock);
            }.bind(this)
        };
    };
    Injector.prototype.mockDependencies = function (klass) {
        for (var _i = 0, _a = klass.__dependencies; _i < _a.length; _i++) {
            var dep = _a[_i];
            dep = this.getRegistred(dep);
            this.when(dep).give(Injector._mocker(dep));
        }
    };
    Injector.prototype.isSingleton = function (klass) {
        return !!klass.__singleton;
    };
    Injector.prototype.getSingleton = function (klass) {
        if (this._singleton.has(klass)) {
            return this._singleton.get(klass);
        }
        else {
            var inst = this.createInstance(klass);
            this._singleton.set(klass, inst);
            return inst;
        }
    };
    Injector.prototype.createInstance = function (klass) {
        var deps = [];
        for (var _i = 0, _a = klass.__dependencies || []; _i < _a.length; _i++) {
            var dep = _a[_i];
            deps.push(this.get(dep));
        }
        var instance = new (Function.prototype.bind.apply(klass, [null].concat(deps)));
        instance._injector = this;
        return instance;
    };
    Injector.prototype.getRegistred = function (klass) {
        if (this._register.has(klass)) {
            klass = this._register.get(klass);
            return this.getRegistred(klass);
        }
        return klass;
    };
    return Injector;
})();
exports.Injector = Injector;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9JbmplY3Rvci50cyJdLCJuYW1lcyI6WyJJbmplY3RvciIsIkluamVjdG9yLmNvbnN0cnVjdG9yIiwiSW5qZWN0b3Iuc2V0TW9ja2VyIiwiSW5qZWN0b3IuZ2V0IiwiSW5qZWN0b3IuZGVmYXVsdCIsIkluamVjdG9yLndoZW4iLCJJbmplY3Rvci5tb2NrRGVwZW5kZW5jaWVzIiwiSW5qZWN0b3IuaXNTaW5nbGV0b24iLCJJbmplY3Rvci5nZXRTaW5nbGV0b24iLCJJbmplY3Rvci5jcmVhdGVJbnN0YW5jZSIsIkluamVjdG9yLmdldFJlZ2lzdHJlZCJdLCJtYXBwaW5ncyI6IkFBSUE7SUFBQUE7UUFHWUMsY0FBU0EsR0FBSUEsSUFBSUEsR0FBR0EsRUFBb0JBLENBQUFBO1FBQ3hDQSxXQUFNQSxHQUFPQSxJQUFJQSxHQUFHQSxFQUFvQkEsQ0FBQUE7UUFDeENBLGVBQVVBLEdBQUdBLElBQUlBLEdBQUdBLEVBQW9CQSxDQUFBQTtJQTRFcERBLENBQUNBO0lBMUVpQkQsa0JBQVNBLEdBQXZCQSxVQUF3QkEsTUFBTUE7UUFDMUJFLFFBQVFBLENBQUNBLE9BQU9BLEdBQUdBLE1BQU1BLENBQUFBO0lBQzdCQSxDQUFDQTtJQUVNRixzQkFBR0EsR0FBVkEsVUFBV0EsS0FBS0E7UUFFWkcsS0FBS0EsR0FBR0EsSUFBSUEsQ0FBQ0EsWUFBWUEsQ0FBQ0EsS0FBS0EsQ0FBQ0EsQ0FBQUE7UUFFaENBLEVBQUVBLENBQUFBLENBQUNBLElBQUlBLENBQUNBLE1BQU1BLENBQUNBLEdBQUdBLENBQUNBLEtBQUtBLENBQUNBLENBQUNBLENBQUNBLENBQUNBO1lBQ3hCQSxNQUFNQSxDQUFDQSxJQUFJQSxDQUFDQSxNQUFNQSxDQUFDQSxHQUFHQSxDQUFDQSxLQUFLQSxDQUFDQSxDQUFBQTtRQUNqQ0EsQ0FBQ0E7UUFFREEsRUFBRUEsQ0FBQUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsV0FBV0EsQ0FBQ0EsS0FBS0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7WUFDekJBLE1BQU1B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QSxDQUFDQSxTQUFTQSxHQUFHQSxJQUFJQSxDQUFBQTtRQUN6QkEsTUFBTUEsQ0FBQ0EsUUFBUUEsQ0FBQUE7SUFDbkJBLENBQUNBO0lBRU9ULCtCQUFZQSxHQUFwQkEsVUFBcUJBLEtBQUtBO1FBQ3RCVSxFQUFFQSxDQUFBQSxDQUFDQSxJQUFJQSxDQUFDQSxTQUFTQSxDQUFDQSxHQUFHQSxDQUFDQSxLQUFLQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQTtZQUMzQkEsS0FBS0EsR0FBR0EsSUFBSUEsQ0FBQ0EsU0FBU0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsS0FBS0EsQ0FBQ0EsQ0FBQUE7WUFDakNBLE1BQU1BLENBQUNBLElBQUlBLENBQUNBLFlBQVlBLENBQUNBLEtBQUtBLENBQUNBLENBQUFBO1FBQ25DQSxDQUFDQTtRQUNEQSxNQUFNQSxDQUFDQSxLQUFLQSxDQUFBQTtJQUNoQkEsQ0FBQ0E7SUFDTFYsZUFBQ0E7QUFBREEsQ0FqRkEsQUFpRkNBLElBQUE7QUFqRlksZ0JBQVEsV0FpRnBCLENBQUEiLCJmaWxlIjoic3JjL0luamVjdG9yLmpzIiwic291cmNlc0NvbnRlbnQiOltudWxsXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
