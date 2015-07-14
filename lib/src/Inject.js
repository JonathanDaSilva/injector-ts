function Inject() {
    var deps = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        deps[_i - 0] = arguments[_i];
    }
    return function (target) {
        target.__dependencies = deps;
        return target;
    };
}
exports.Inject = Inject;
