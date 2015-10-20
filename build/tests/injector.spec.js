var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") return Reflect.decorate(decorators, target, key, desc);
    switch (arguments.length) {
        case 2: return decorators.reduceRight(function(o, d) { return (d && d(o)) || o; }, target);
        case 3: return decorators.reduceRight(function(o, d) { return (d && d(target, key)), void 0; }, void 0);
        case 4: return decorators.reduceRight(function(o, d) { return (d && d(target, key, o)) || o; }, desc);
    }
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var chai = require('chai');
var expect = chai.expect;
var Singleton_1 = require('./../src/Singleton');
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
        Inject_1.Inject(Bar), 
        __metadata('design:paramtypes', [Bar])
    ], Test1);
    return Test1;
})();
var Test2 = (function () {
    function Test2(test) {
        this._test = test;
    }
    Test2 = __decorate([
        Inject_1.Inject(Test1), 
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
        Inject_1.Inject('FooInterface'), 
        __metadata('design:paramtypes', [Object])
    ], Test3);
    return Test3;
})();
var FooSingleton = (function () {
    function FooSingleton() {
    }
    FooSingleton = __decorate([
        Singleton_1.Singleton(), 
        __metadata('design:paramtypes', [])
    ], FooSingleton);
    return FooSingleton;
})();
describe("Injector: ", function () {
    var injector;
    beforeEach(function () {
        injector = new Injector_1.Injector();
    });
    it("should return an instance of bar", function () {
        expect(injector.get(Bar)).instanceof(Bar);
    });
    it("should return a new instance everytime", function () {
        var bar1 = injector.get(Bar);
        var bar2 = injector.get(Bar);
        expect(bar1).not.to.equal(bar2);
    });
    it("should return a new instance with the dependencies", function () {
        var test = injector.get(Test1);
        expect(test._bar).instanceof(Bar);
    });
    it("should inject himself into _injector", function () {
        var test = injector.get(Test1);
        expect(test._injector).to.equal(injector);
    });
    it("should inject recursively", function () {
        var test = injector.get(Test2);
        expect(test._test).instanceof(Test1);
        expect(test._test._bar).instanceof(Bar);
    });
    it("should be able to return a register interface", function () {
        injector.default('FooInterface', Foo);
        expect(injector.get('FooInterface')).instanceof(Foo);
    });
    it("should be able to inject with string id", function () {
        injector.default('FooInterface', Foo);
        var test = injector.get(Test3);
        expect(test._foo).instanceof(Foo);
    });
    it("can set a specific class to singleton", function () {
        var foo1 = injector.get(FooSingleton);
        var foo2 = injector.get(FooSingleton);
        expect(foo1).to.equal(foo2);
    });
    it("can give mock", function () {
        var mock = {};
        injector.when(Foo).give(mock);
        expect(injector.get(Foo)).to.equal(mock);
    });
    it("can mock automaticaly dependencies", function () {
        var mock = {};
        Injector_1.Injector.setMocker(function () { return mock; });
        injector.mockDependencies(Test1);
        var inst = injector.get(Test1);
        expect(inst._bar).to.equal(mock);
    });
    it("can mock automaticaly interface dependencies", function () {
        Injector_1.Injector.setMocker(function (klass) { return typeof klass; });
        injector.default('FooInterface', Foo);
        injector.mockDependencies(Test3);
        var inst = injector.get(Test3);
        expect(inst._foo).to.equal('function');
    });
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRlc3RzL2luamVjdG9yLnNwZWMudHMiXSwibmFtZXMiOlsiQmFyIiwiQmFyLmNvbnN0cnVjdG9yIiwiVGVzdDEiLCJUZXN0MS5jb25zdHJ1Y3RvciIsIlRlc3QyIiwiVGVzdDIuY29uc3RydWN0b3IiLCJGb28iLCJGb28uY29uc3RydWN0b3IiLCJGb28udGVzdCIsIkZvb01vY2siLCJGb29Nb2NrLmNvbnN0cnVjdG9yIiwiRm9vTW9jay50ZXN0IiwiVGVzdDMiLCJUZXN0My5jb25zdHJ1Y3RvciIsIkZvb1NpbmdsZXRvbiIsIkZvb1NpbmdsZXRvbi5jb25zdHJ1Y3RvciJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQSxJQUFZLElBQUksV0FBTSxNQUN0QixDQUFDLENBRDJCO0FBQzVCLElBQUksTUFBTSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUE7QUFFeEIsMEJBQXdCLG9CQUN4QixDQUFDLENBRDJDO0FBQzVDLHVCQUF3QixpQkFDeEIsQ0FBQyxDQUR3QztBQUN6Qyx5QkFBd0IsbUJBRXhCLENBQUMsQ0FGMEM7QUFFM0M7SUFBQUE7SUFBV0MsQ0FBQ0E7SUFBREQsVUFBQ0E7QUFBREEsQ0FBWCxBQUFZQSxJQUFBO0FBRVo7SUFHSUUsZUFBWUEsR0FBUUE7UUFDaEJDLElBQUlBLENBQUNBLElBQUlBLEdBQUdBLEdBQUdBLENBQUFBO0lBQ25CQSxDQUFDQTtJQUxMRDtRQUFDQSxlQUFNQSxDQUFDQSxHQUFHQSxDQUFDQTs7Y0FNWEE7SUFBREEsWUFBQ0E7QUFBREEsQ0FOQSxBQU1DQSxJQUFBO0FBRUQ7SUFHSUUsZUFBWUEsSUFBV0E7UUFDbkJDLElBQUlBLENBQUNBLEtBQUtBLEdBQUdBLElBQUlBLENBQUFBO0lBQ3JCQSxDQUFDQTtJQUxMRDtRQUFDQSxlQUFNQSxDQUFDQSxLQUFLQSxDQUFDQTs7Y0FNYkE7SUFBREEsWUFBQ0E7QUFBREEsQ0FOQSxBQU1DQSxJQUFBO0FBTUQ7SUFBQUU7SUFHQUMsQ0FBQ0E7SUFGR0Qsa0JBQUlBLEdBQUpBO0lBQ0FFLENBQUNBO0lBQ0xGLFVBQUNBO0FBQURBLENBSEEsQUFHQ0EsSUFBQTtBQUVEO0lBQUFHO0lBR0FDLENBQUNBO0lBRkdELHNCQUFJQSxHQUFKQTtJQUNBRSxDQUFDQTtJQUNMRixjQUFDQTtBQUFEQSxDQUhBLEFBR0NBLElBQUE7QUFFRDtJQUdJRyxlQUFZQSxHQUFpQkE7UUFDekJDLElBQUlBLENBQUNBLElBQUlBLEdBQUdBLEdBQUdBLENBQUFBO0lBQ25CQSxDQUFDQTtJQUxMRDtRQUFDQSxlQUFNQSxDQUFDQSxjQUFjQSxDQUFDQTs7Y0FNdEJBO0lBQURBLFlBQUNBO0FBQURBLENBTkEsQUFNQ0EsSUFBQTtBQUVEO0lBQUFFO0lBQ3FCQyxDQUFDQTtJQUR0QkQ7UUFBQ0EscUJBQVNBLEVBQUVBOztxQkFDVUE7SUFBREEsbUJBQUNBO0FBQURBLENBRHJCLEFBQ3NCQSxJQUFBO0FBRXRCLFFBQVEsQ0FBQyxZQUFZLEVBQUU7SUFDbkIsSUFBSSxRQUFRLENBQUE7SUFFWixVQUFVLENBQUM7UUFDUCxRQUFRLEdBQUcsSUFBSSxtQkFBUSxFQUFFLENBQUE7SUFDN0IsQ0FBQyxDQUFDLENBQUE7SUFFRixFQUFFLENBQUMsa0NBQWtDLEVBQUU7UUFDbkMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLENBQUE7SUFDN0MsQ0FBQyxDQUFDLENBQUE7SUFFRixFQUFFLENBQUMsd0NBQXdDLEVBQUU7UUFDekMsSUFBSSxJQUFJLEdBQUcsUUFBUSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQTtRQUM1QixJQUFJLElBQUksR0FBRyxRQUFRLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFBO1FBQzVCLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQTtJQUNuQyxDQUFDLENBQUMsQ0FBQTtJQUVGLEVBQUUsQ0FBQyxvREFBb0QsRUFBRTtRQUNyRCxJQUFJLElBQUksR0FBRyxRQUFRLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFBO1FBQzlCLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxDQUFBO0lBQ3JDLENBQUMsQ0FBQyxDQUFBO0lBRUYsRUFBRSxDQUFDLHNDQUFzQyxFQUFFO1FBQ3ZDLElBQUksSUFBSSxHQUFHLFFBQVEsQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUE7UUFDOUIsTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFBO0lBQzdDLENBQUMsQ0FBQyxDQUFBO0lBRUYsRUFBRSxDQUFDLDJCQUEyQixFQUFFO1FBQzVCLElBQUksSUFBSSxHQUFHLFFBQVEsQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUE7UUFDOUIsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLENBQUE7UUFDcEMsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxDQUFBO0lBQzNDLENBQUMsQ0FBQyxDQUFBO0lBRUYsRUFBRSxDQUFDLCtDQUErQyxFQUFFO1FBQ2hELFFBQVEsQ0FBQyxPQUFPLENBQUMsY0FBYyxFQUFFLEdBQUcsQ0FBQyxDQUFBO1FBQ3JDLE1BQU0sQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxDQUFBO0lBQ3hELENBQUMsQ0FBQyxDQUFBO0lBRUYsRUFBRSxDQUFDLHlDQUF5QyxFQUFFO1FBQzFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsY0FBYyxFQUFFLEdBQUcsQ0FBQyxDQUFBO1FBQ3JDLElBQUksSUFBSSxHQUFHLFFBQVEsQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUE7UUFDOUIsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLENBQUE7SUFDckMsQ0FBQyxDQUFDLENBQUE7SUFFRixFQUFFLENBQUMsdUNBQXVDLEVBQUU7UUFDeEMsSUFBSSxJQUFJLEdBQUcsUUFBUSxDQUFDLEdBQUcsQ0FBQyxZQUFZLENBQUMsQ0FBQTtRQUNyQyxJQUFJLElBQUksR0FBRyxRQUFRLENBQUMsR0FBRyxDQUFDLFlBQVksQ0FBQyxDQUFBO1FBRXJDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFBO0lBQy9CLENBQUMsQ0FBQyxDQUFBO0lBRUYsRUFBRSxDQUFDLGVBQWUsRUFBRTtRQUNoQixJQUFJLElBQUksR0FBRyxFQUFFLENBQUE7UUFDYixRQUFRLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQTtRQUU3QixNQUFNLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUE7SUFDNUMsQ0FBQyxDQUFDLENBQUE7SUFFRixFQUFFLENBQUMsb0NBQW9DLEVBQUU7UUFDckMsSUFBSSxJQUFJLEdBQUcsRUFBRSxDQUFBO1FBQ2IsbUJBQVEsQ0FBQyxTQUFTLENBQUMsY0FBYSxNQUFNLENBQUMsSUFBSSxDQUFBLENBQUMsQ0FBQyxDQUFDLENBQUE7UUFFOUMsUUFBUSxDQUFDLGdCQUFnQixDQUFDLEtBQUssQ0FBQyxDQUFBO1FBQ2hDLElBQUksSUFBSSxHQUFHLFFBQVEsQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUE7UUFDOUIsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFBO0lBQ3BDLENBQUMsQ0FBQyxDQUFBO0lBRUYsRUFBRSxDQUFDLDhDQUE4QyxFQUFFO1FBQy9DLG1CQUFRLENBQUMsU0FBUyxDQUFDLFVBQVMsS0FBSyxJQUFJLE1BQU0sQ0FBQyxPQUFPLEtBQUssQ0FBQSxDQUFDLENBQUMsQ0FBQyxDQUFBO1FBRTNELFFBQVEsQ0FBQyxPQUFPLENBQUMsY0FBYyxFQUFFLEdBQUcsQ0FBQyxDQUFBO1FBQ3JDLFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyxLQUFLLENBQUMsQ0FBQTtRQUNoQyxJQUFJLElBQUksR0FBRyxRQUFRLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFBO1FBQzlCLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsQ0FBQTtJQUMxQyxDQUFDLENBQUMsQ0FBQTtBQUNOLENBQUMsQ0FBQyxDQUFBIiwiZmlsZSI6InRlc3RzL2luamVjdG9yLnNwZWMuanMiLCJzb3VyY2VzQ29udGVudCI6W251bGxdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
