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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9JbmplY3QudHMiXSwibmFtZXMiOlsiSW5qZWN0Il0sIm1hcHBpbmdzIjoiQUFBQTtJQUF1QkEsY0FBT0E7U0FBUEEsV0FBT0EsQ0FBUEEsc0JBQU9BLENBQVBBLElBQU9BO1FBQVBBLDZCQUFPQTs7SUFDMUJBLE1BQU1BLENBQUNBLFVBQUNBLE1BQU1BO1FBQ1ZBLE1BQU1BLENBQUNBLGNBQWNBLEdBQUdBLElBQUlBLENBQUFBO1FBQzVCQSxNQUFNQSxDQUFDQSxNQUFNQSxDQUFBQTtJQUNqQkEsQ0FBQ0EsQ0FBQUE7QUFDTEEsQ0FBQ0E7QUFMZSxjQUFNLFNBS3JCLENBQUEiLCJmaWxlIjoic3JjL0luamVjdC5qcyIsInNvdXJjZXNDb250ZW50IjpbbnVsbF0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
