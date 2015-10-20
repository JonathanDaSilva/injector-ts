import * as chai from 'chai'
var expect = chai.expect

import {Singleton} from './../src/Singleton'
import {Inject}    from './../src/Inject'
import {Injector}  from './../src/Injector'

class Bar {}

@Inject(Bar)
class Test1 {
    public _bar: Bar
    constructor(bar: Bar) {
        this._bar = bar
    }
}

@Inject(Test1)
class Test2 {
    public _test: Test1
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
    public _foo: FooInterface
    constructor(foo: FooInterface) {
        this._foo = foo
    }
}

@Singleton()
class FooSingleton { }

describe("Injector: ", function() {
    var injector

    beforeEach(function() {
        injector = new Injector()
    })

    it("should return an instance of bar", function() {
        expect(injector.get(Bar)).instanceof(Bar)
    })

    it("should return a new instance everytime", function() {
        var bar1 = injector.get(Bar)
        var bar2 = injector.get(Bar)
        expect(bar1).not.to.equal(bar2)
    })

    it("should return a new instance with the dependencies", function(){
        var test = injector.get(Test1)
        expect(test._bar).instanceof(Bar)
    })

    it("should inject himself into _injector", function(){
        var test = injector.get(Test1)
        expect(test._injector).to.equal(injector)
    })

    it("should inject recursively", function(){
        var test = injector.get(Test2)
        expect(test._test).instanceof(Test1)
        expect(test._test._bar).instanceof(Bar)
    })

    it("should be able to return a register interface", function(){
        injector.default('FooInterface', Foo)
        expect(injector.get('FooInterface')).instanceof(Foo)
    })

    it("should be able to inject with string id", function() {
        injector.default('FooInterface', Foo)
        var test = injector.get(Test3)
        expect(test._foo).instanceof(Foo)
    })

    it("can set a specific class to singleton", function() {
        var foo1 = injector.get(FooSingleton)
        var foo2 = injector.get(FooSingleton)

        expect(foo1).to.equal(foo2)
    })

    it("can give mock", function(){
        var mock = {}
        injector.when(Foo).give(mock)

        expect(injector.get(Foo)).to.equal(mock)
    })

    it("can mock automaticaly dependencies", function(){
        var mock = {}
        Injector.setMocker(function() { return mock })

        injector.mockDependencies(Test1)
        var inst = injector.get(Test1)
        expect(inst._bar).to.equal(mock)
    })

    it("can mock automaticaly interface dependencies", function(){
        Injector.setMocker(function(klass) { return typeof klass })

        injector.default('FooInterface', Foo)
        injector.mockDependencies(Test3)
        var inst = injector.get(Test3)
        expect(inst._foo).to.equal('function')
    })
})
