/*
* 动态改变传入函数的this
* */

var obj1 = {
    name: 'sven',
    getName: function () {
        return this.name;
    }
};

var obj2 = {
    name: 'anne'
};

console.log(obj1.getName());     //  sven
console.log(obj1.getName.call(obj2));    //  anne



/*
* call -- 第一个参数是指定的this，后面的参数依次传入函数
* apply -- 第一个参数是指定的this，第二个参数是类数组对象，apply 会把类数组对象中的元素作为参数传递给被调用的函数
* */

var func = function (a, b, c) {
    console.log(this === global);   //  true   第一个参数传入 null 时，this 会指向默认的宿主对象
    console.log(arguments);   //   arguments 就是一个类数组对象，可以和apply搭配使用传参
    console.log(a, b, c);
};

func.apply(null, [1, 2, 3]);

func.call(null, 4, 5, 6);



/*
* 借用其他对象的方法
* */
console.log(Math.max.apply(null, [1, 2, 3, 4, 5]));    //  5

// 类数组对象借用数组的方法
(function () {
    Array.prototype.push.call(arguments, 3);    //  Array.prototype.push 要求对象可以存取属性，length 属性可读写
    console.log(arguments);    //  [Arguments] { '0': 1, '1': 2, '2': 3 }
    console.log(Array.prototype.slice.call(arguments));   //  [ 1, 2, 3 ]
})(1, 2);
