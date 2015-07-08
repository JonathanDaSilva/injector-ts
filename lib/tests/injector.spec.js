var Injector_1 = require('./../src/Injector');
var Bar = (function () {
    function Bar() {
    }
    return Bar;
})();
describe("Injector: ", function () {
    var injector;
    beforeEach(function () {
        injector = new Injector_1.default();
    });
    it("get: should return an instance of bar", function () {
        expect(injector.get(Bar)).toBeAnInstanceOf(Bar);
        expect('').toBeAnInstanceOf(Bar);
    });
    it("get: should return a new instance everytime", function () {
        var bar1 = injector.get(Bar);
        var bar2 = injector.get(Bar);
        expect(bar1).not.toBe(bar2);
    });
    it("get: should return a new instance everytime", function () {
        var bar1 = injector.get(Bar);
        var bar2 = injector.get(Bar);
        expect(bar1.__id).toBeOfType('string');
        expect(bar2.__id).toBeOfType('string');
        expect(bar1.__id).not.toBe(bar2.__id);
    });
});
