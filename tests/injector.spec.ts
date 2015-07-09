/// <reference path="./../typings/bundle.d.ts"/>
import Inject   from './../src/Inject'
import Injector from './../src/Injector'

class Bar {}

@Inject(Bar)
class Test1 {
    _bar: Bar
    constructor(bar: Bar) {
        this._bar = bar
    }
}

@Inject(Test1)
class Test2 {
    _test: Test1
    constructor(test: Test1) {
        this._test = test
    }
}

interface FooInterface {
    test();
}

class Foo implements FooInterface {
    test() {
    }
}

class FooMock implements FooInterface {
    test() {
    }
}

@Inject('FooInterface')
class Test3 {
    _foo: FooInterface
    constructor(foo: FooInterface) {
        this._foo = foo
    }
}

describe("Injector: ", function() {
    var injector

    beforeEach(function() {
        injector = new Injector()
    })

    it("should return an instance of bar", function() {
        expect(injector.get(Bar)).toBeAnInstanceOf(Bar)
    })

    it("should return a new instance everytime", function() {
        var bar1 = injector.get(Bar)
        var bar2 = injector.get(Bar)
        expect(bar1).not.toBe(bar2)
    })

    it("should put a new id on every object", function() {
        var bar1 = injector.get(Bar)
        var bar2 = injector.get(Bar)
        expect(bar1.__id).toBeAString()
        expect(bar2.__id).toBeAString()
        expect(bar1.__id).not.toBe(bar2.__id)
    })

    it("should return a new instance with the dependencies", function(){
        var test = injector.get(Test1)
        expect(test._bar).toBeAnInstanceOf(Bar)
    })

    it("should inject recursively", function(){
        var test = injector.get(Test2)
        expect(test._test).toBeAnInstanceOf(Test1)
        expect(test._test._bar).toBeAnInstanceOf(Bar)
    })

    it("should be able to return a register interface", function(){
        injector.register('FooInterface', Foo)
        expect(injector.get('FooInterface')).toBeAnInstanceOf(Foo)
    })

    it("should be able to inject with string id", function() {
        injector.register('FooInterface', Foo)
        var test = injector.get(Test3)
        expect(test._foo).toBeAnInstanceOf(Foo)
    })

    it("can't register two time on the same id", function() {
        expect(function(){
            injector.register('FooInterface', Foo)
            injector.register('FooInterface', Bar)
        }).toThrowAnError('InjectorRegisterError')
    })

    it("can register an object for mocking", function() {
        injector.register('FooInterface', Foo)
        injector.register(Foo, FooMock)

        expect(injector.get('FooInterface')).toBeAnInstanceOf(FooMock)

        var test = injector.get(Test3)
        expect(test._foo).toBeAnInstanceOf(FooMock)
    })

    it("can get an object with a specific id", function() {
        var bar1 = injector.get(Bar)
        var bar2 = injector.get(Bar, bar1.__id)

        expect(bar1).toBe(bar2)
    })

    it("can set a specific class to singleton", function() {
        injector.singleton(Bar)
        var bar1 = injector.get(Bar)
        var bar2 = injector.get(Bar)

        expect(bar1.__id).toBe('__singleton')
        expect(bar1).toBe(bar2)
    })
})
