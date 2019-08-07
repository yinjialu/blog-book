//  面向切面编程
/*
* 把一个函数动态织入到另外一个函数
* */

Function.prototype.before = function (beforefn) {
    var _self = this;
    return function () {
        beforefn.apply(this, arguments);
        return _self.apply(this, arguments);
    }
};

Function.prototype.after = function (afterfn) {
    var _self = this;
    return function () {
        var ret = _self.apply(this, arguments);
        afterfn.apply(this, arguments);
        return ret;
    }
};

var func = function () {
    console.log(2);
};

func = func.before(function () {
    console.log(1);
}).after(function () {
    console.log(3);
});

func();

//  1
//  2
//  3