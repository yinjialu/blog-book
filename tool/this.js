var obj = {
    a: 1,
    getA: function () {
        console.log(this === obj);
        console.log(this.a);
    }
};

obj.getA();
/*
* 作为对象的方法被调用，this 指向该对象
* this === obj   //  true
* this.a    //  1
* */



global.a = 'global_a';
const getA = obj.getA;
getA();

/*
* 作为普通函数调用，this指向全局对象，浏览器中是window，node 中是 global
* this === obj   //  false
* this === global  //  true
* this.a === global.a //  true
* */



global.b = 'global_b';
var obj2 = {
    b: 2,
    getB: function () {
        "use strict"
        console.log(this === obj2);
        // console.log(this.b);
    }
};
const getB = obj2.getB;
getB();

/*
* ECMAScript5 的 strict 模式下，this不会指向全局对象，而是undefined
* console.log(this.b); 会报错 TypeError: Cannot read property 'b' of undefined
* */


var MyClass = function () {
    this.name = 'sven';
};

var obj3 = new MyClass();
console.log(obj3.name);   //  sven

/*
* 通过构造函数创建的实例，this会指向这个实例
* */



var MyClass2 = function () {
    this.name = 'sven';
    return {
        name: 'anne'
    }
};

MyClass2.prototype.getName = function () {
    return this.name;
};

var obj4 = new MyClass2();
console.log(obj4.name);  //  anne
// console.log(obj4.getName());   //  TypeError: obj4.getName is not a function
console.log(Object.getPrototypeOf(obj4) === MyClass2.prototype);   //  false

/*
* MyClass2 显示返回了一个对象，obj4就是这个对象，不再是我们期待的this实例。
* */


var MyClass3 = function () {
    this.name = 'sven';
    return 'anne';    //  返回一个非对象类型的数据会被忽视   试试返回 new String('anne')
};

var obj5 = new MyClass3();
console.log(obj5);
console.log(obj5.name);