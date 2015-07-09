var InjectorRegisterError = (function () {
    function InjectorRegisterError() {
        this.name = 'InjectorRegisterError';
        this.message = 'Impossible to register two time on the same id, you can precise the namespace for example Foo.Bar';
    }
    return InjectorRegisterError;
})();
exports.default = InjectorRegisterError;
