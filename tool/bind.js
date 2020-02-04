Function.prototype.bind = function (context) {
    var self = this;
    return function () {
        return self.apply(context, arguments);
    }
};

var obj = {
    name: 'sven'
};

var func = function () {
    console.log(this.name);    //  sven
}.bind(obj);

func();

/*
* bind 会返回一个新函数
* 在 addEventListener 绑定的时候需要注意  bind 绑定过 this 的函数与原函数不一致。
* */

Function.prototype.bind2 = function () {
    var self = this;
    var context = [].shift.call(arguments);   //  取出数组第一项 this 保存下来
    var args = [].slice.call(arguments);      //  拷贝剩余参数
    return function () {
        return self.apply(context, [].concat.call(args, [].slice.call(arguments)));
    }
};

var obj2 = {
    name: 'sven'
};

var func2 = function (a, b, c, d) {
    console.log(this.name);
    console.log(a, b, c, d);
}.bind2(obj2, 1, 2);

func2(3, 4);
