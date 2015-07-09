if (typeof __decorate !== "function") __decorate = function (decorators, target, key, desc) {
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") return Reflect.decorate(decorators, target, key, desc);
    switch (arguments.length) {
        case 2: return decorators.reduceRight(function(o, d) { return (d && d(o)) || o; }, target);
        case 3: return decorators.reduceRight(function(o, d) { return (d && d(target, key)), void 0; }, void 0);
        case 4: return decorators.reduceRight(function(o, d) { return (d && d(target, key, o)) || o; }, desc);
    }
};
if (typeof __metadata !== "function") __metadata = function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
/// <reference path="./../typings/bundle.d.ts"/>
var Inject_1 = require('./../src/Inject');
var Injector_1 = require('./../src/Injector');
var Bar = (function () {
    function Bar() {
    }
    return Bar;
})();
var Test1 = (function () {
    function Test1(bar) {
        this._bar = bar;
    }
    Test1 = __decorate([
        Inject_1.default(Bar), 
        __metadata('design:paramtypes', [Bar])
    ], Test1);
    return Test1;
})();
var Test2 = (function () {
    function Test2(test) {
        this._test = test;
    }
    Test2 = __decorate([
        Inject_1.default(Test1), 
        __metadata('design:paramtypes', [Test1])
    ], Test2);
    return Test2;
})();
var Foo = (function () {
    function Foo() {
    }
    Foo.prototype.test = function () {
    };
    return Foo;
})();
var FooMock = (function () {
    function FooMock() {
    }
    FooMock.prototype.test = function () {
    };
    return FooMock;
})();
var Test3 = (function () {
    function Test3(foo) {
        this._foo = foo;
    }
    Test3 = __decorate([
        Inject_1.default('FooInterface'), 
        __metadata('design:paramtypes', [Object])
    ], Test3);
    return Test3;
})();
describe("Injector: ", function () {
    var injector;
    beforeEach(function () {
        injector = new Injector_1.default();
    });
    it("should return an instance of bar", function () {
        expect(injector.get(Bar)).toBeAnInstanceOf(Bar);
    });
    it("should return a new instance everytime", function () {
        var bar1 = injector.get(Bar);
        var bar2 = injector.get(Bar);
        expect(bar1).not.toBe(bar2);
    });
    it("should put a new id on every object", function () {
        var bar1 = injector.get(Bar);
        var bar2 = injector.get(Bar);
        expect(bar1.__id).toBeAString();
        expect(bar2.__id).toBeAString();
        expect(bar1.__id).not.toBe(bar2.__id);
    });
    it("should return a new instance with the dependencies", function () {
        var test = injector.get(Test1);
        expect(test._bar).toBeAnInstanceOf(Bar);
    });
    it("should inject recursively", function () {
        var test = injector.get(Test2);
        expect(test._test).toBeAnInstanceOf(Test1);
        expect(test._test._bar).toBeAnInstanceOf(Bar);
    });
    it("should be able to return a register interface", function () {
        injector.register('FooInterface', Foo);
        expect(injector.get('FooInterface')).toBeAnInstanceOf(Foo);
    });
    it("should be able to inject with string id", function () {
        injector.register('FooInterface', Foo);
        var test = injector.get(Test3);
        expect(test._foo).toBeAnInstanceOf(Foo);
    });
    it("can't register two time on the same id", function () {
        expect(function () {
            injector.register('FooInterface', Foo);
            injector.register('FooInterface', Bar);
        }).toThrowAnError('InjectorRegisterError');
    });
    it("can register an object for mocking", function () {
        injector.register('FooInterface', Foo);
        injector.register(Foo, FooMock);
        expect(injector.get('FooInterface')).toBeAnInstanceOf(FooMock);
        var test = injector.get(Test3);
        expect(test._foo).toBeAnInstanceOf(FooMock);
    });
    it("can get an object with a specific id", function () {
        var bar1 = injector.get(Bar);
        var bar2 = injector.get(Bar, bar1.__id);
        expect(bar1).toBe(bar2);
    });
    it("can set a specific class to singleton", function () {
        injector.singleton(Bar);
        var bar1 = injector.get(Bar);
        var bar2 = injector.get(Bar);
        expect(bar1.__id).toBe('__singleton');
        expect(bar1).toBe(bar2);
    });
});
