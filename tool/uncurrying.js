Function.prototype.uncurrying = function () {
    var self = this;
    return function () {
        var obj = Array.prototype.shift.call(arguments);
        return self.apply(obj, arguments);
    }
};

//  实现了对 Array.prototype.push 的取别名
var push = Array.prototype.push.uncurrying();

(function () {
    Array.prototype.push.call(arguments, 4);
    console.log(arguments);   //  [1,2,3,4]
})(1,2,3);

(function () {
    push.call(arguments, 4);
    console.log(arguments);  //  [1,2,3,4]
})(1,2,3);



Function.prototype.uncurrying2 = function () {
    var self = this;
    return function () {
        return Function.prototype.call.apply(self, arguments);
    }
};