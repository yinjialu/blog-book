/*
* 封装私有变量
* */

var mult = (function () {
    var cache = {};
    return function () {
        var args = Array.prototype.join.call(arguments, ',');
        if (args in cache) {
            return cache[args];
        }
        var a = 1;
        for (var i = 0, l = arguments.length; i < l; i++) {
            a = a * arguments[i];
        }
        return cache[args] = a;
    }
})();

/*
* 进一步提炼
* */

var mult2 = (function () {
    var cache = {};
    var calculate = function () {
        var a = 1;
        for (var i = 0, l = arguments.length; i < l; i++) {
            a = a * arguments[i];
        }
        return a;
    };
    return function () {
        var args = Array.prototype.join.call(arguments, ',');
        if (args in cache) {
            return cache[args];
        }
        return cache[args] = calculate.apply(null, arguments);
    }
})();

/*
* 闭包和面向对象
* */

//  必包写法
var extent = function () {
    var value = 0;
    return {
        call: function () {
            value++;
            console.log(value);
        }
    }
};

var extents = extent();
extents.call();
extents.call();
extents.call();


//  面向对象写法
var extent2 = {
    value: 0,
    call: function () {
        this.value++;
        console.log(this.value);
    }
};
extent2.call();
extent2.call();
extent2.call();

//  面向对象写法2
var Extent3 = function () {
    this.value = 0;
};

Extent3.prototype.call = function () {
    this.value++;
    console.log(this.value);
};

var extents3 = new Extent3();

extents3.call();
extents3.call();
extents3.call();
