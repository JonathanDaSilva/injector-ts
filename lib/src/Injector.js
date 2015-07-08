/// <reference path="./../typings/bundle.d.ts"/>
var uuid = require('node-uuid');
var Injector = (function () {
    function Injector() {
    }
    Injector.prototype.get = function (cls) {
        var inst = new cls;
        inst.__id = uuid.v4();
        return inst;
    };
    return Injector;
})();
exports.default = Injector;
