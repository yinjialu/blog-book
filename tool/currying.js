var cost = (function () {
    var args = [];
    return function () {
        if (arguments.length === 0) {
            var money = 0;
            for (var i = 0, l = args.length; i < l; i++) {
                money += args[i];
            }
            return money;
        } else {
            [].push.apply(args, arguments);
        }
    }
})();

cost(100);
cost(200);
cost(300);  //  通过闭包内部的变量保存了这些状态
cost();  //  只有最后一次才进行求值操作



var currying = function (fn) {
    var args = [];
    return function () {
        if (arguments.length === 0) {
            return fn.apply(this, args);
        } else {
            [].push.apply(args, arguments);
            return arguments.callee;
        }
    }
};

var costfun = (function () {
    var money = 0;
    return function () {
        for (var i = 0, l = arguments.length; i < l; i++) {
            money += arguments[i];
        }
        return money;
    }
})();

var cost2 = currying(costfun);

cost2(100);
cost2(200);
cost2(300);
console.log(cost2());