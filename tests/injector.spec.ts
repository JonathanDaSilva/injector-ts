/// <reference path="./../typings/bundle.d.ts"/>
import Inject   from './../src/Inject'
import Injector from './../src/Injector'

class Bar {}

@Inject(Bar)
class Test {
    _bar: Bar
    constructor(bar) {
        this._bar = bar
    }
}

describe("Injector: ", function() {
    var injector

    beforeEach(function() {
        injector = new Injector()
    })

    it("get: should return an instance of bar", function() {
        expect(injector.get(Bar)).toBeAnInstanceOf(Bar)
    })

    it("get: should return a new instance everytime", function() {
        var bar1 = injector.get(Bar)
        var bar2 = injector.get(Bar)
        expect(bar1).not.toBe(bar2)
    })

    it("get: should return a new instance everytime", function() {
        var bar1 = injector.get(Bar)
        var bar2 = injector.get(Bar)
        expect(bar1.__id).toBeAString()
        expect(bar2.__id).toBeAString()
        expect(bar1.__id).not.toBe(bar2.__id)
    })

    it("get: should return a new instance with the dependencies", function(){
        var test = injector.get(Test)
        expect(test._bar).toBeAnInstanceOf(Bar)
    })
})
