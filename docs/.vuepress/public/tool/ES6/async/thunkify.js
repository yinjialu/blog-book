var Thunk = function (fn) {
    return function () {
        var args = Array.prototype.slice.call(arguments);
        return function (cb) {
            args.push(cb);
            return fn.apply(this, args);
        }
    }
};

const ES6Thunk = function (fn) {
    return function (...args) {
        return function (cb) {
            return fn.call(this, ...args, cb);
        }
    }
};