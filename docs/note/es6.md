# ES6 新特性

## Iterator （遍历器）提供 for of 访问键值

* 为所有数据结构，提供了一种统一的访问机制
* 默认接口部署在数据结构的 `Symbol.iterator` 属性上
* 接口返回的遍历器对象包含了以下属性
    * `next` 必选 定义了 for of 遍历的顺序和结束条件
    * `return` 可选 如果for...of循环提前退出（通常是因为出错，或者有break语句），就会调用return方法
    * `throw` 可选
    
* 对象没有遍历器接口 `Symbol.iterator` 因为对象的属性没有顺序，可以自定义遍历顺序
* for in 遍历键名
* 只返回数字索引的属性
* 类数据对象可以直接借用数据的遍历器接口 `Symbol.iterator`

## Generator (状态机)（遍历器生成函数）

* function 和 函数名之间加 `*` 标记
* 返回一个遍历器对象
* 通过 `yield` 封装了多个状态 
* yield表达式后面的表达式，只有当调用next方法、内部指针指向该语句时才会执行
* 执行遍历器的 `next` 方法依次读取状态
* 遍历器生成函数
```js
var myIterable = {};
myIterable[Symbol.iterator] = function* () {
  yield 1;
  yield 2;
  yield 3;
};

[...myIterable] // [1, 2, 3]
```
* 返回的遍历器对象也有 `Symbol.iterator` 属性，执行后返回自身
```js
function* gen(){
  // some code
}

var g = gen();

g[Symbol.iterator]() === g
// true
```
* `next` 方法的参数会被当作上一个 `yield` 表达式的返回值
* `Reflect.ownKeys()` 返回一个由目标对象自身的属性键组成的数组
* ajax 的同步封装
```js
function* main() {
    var result = yield request('http://some.url');
    var resp = JSON.parse(result);
    console.log(resp.value);
}

function request(url) {
    makeAjaxCall(url, function(response) {
        it.next(response);   //  关键步骤 带上请求结果 继续执行下一步
    });
}

var it = main();
it.next();
```

## Generator 的异步应用

* Thunk函数 ==> 将参数放到一个临时函数中，再将这个临时函数传入函数体。
* js 的 Thunk函数 ==> 将多参数函数，替换成一个只接受回调函数作为参数的单函数参数。
[Thunkify](https://github.com/tj/node-thunkify)
```js
const Thunk = function(fn) {
    return function(...args) {
        return function(callback) {
            return fn.call(this, ...args, callback);
        }
    }
}
```

* Generator 的自动执行 ==> 在异步操作的回调函数里执行 g.next() 交还程序的执行权 参考 [co](https://github.com/tj/co)

## async

* Generator 函数的 `*` 号替换成 `async`，`yield` 替换成 `await`
* 内置执行器 （Generator + co）
* await 后面可以是 Promise 对象和原始类型的值 （会立即转成 resolved 的 Promise 对象）
* async 返回 Promise 对象

## Set

* 类似于数组的结构，成员唯一
* 在 Set 内部，两个NaN是相等
* 两个对象总是不相等的
* API:
    * add(value): 添加某个值，返回Set结构本身。
    * delete(value): 删除某个值，返回一个布尔值，表示删除是否成功。
    * has(value): 返回一个布尔值，表示该值是否为 Set 的成员。
    * clear(): 清除所有成员，没有返回值。

* Array.from方法可以将 Set 结构转为数组。
* 遍历操作：
    * keys(): 返回键名的遍历器
    * values(): 返回键值的遍历器
    * entries(): 返回键值对的遍历器
    * forEach(): 使用回调函数遍历每个成员

* Set的遍历顺序就是插入顺序。

## WeakSet

* WeakSet 的成员只能是对象，不能是其他值
* WeakSet 中的对象是弱引用，即垃圾回收机制不考虑 WeakSet 对该对象的引用，也就是说，如果其他对象都不再引用该对象，那么垃圾回收机制会自动回收该对象所占用的内存，不考虑该对象还存在于 WeakSet 之中。
* 不可遍历
* API:
    * add(value) 向WeakSet 实例添加一个新成员
    * delete(value) 清除WeakSet实例的指定成员
    * has(value) 返回一个布尔值，表示某个值是否存在

## Map

* 键的范围不限于字符串，各种类型的值都可以当做键
* Object 结构提供了 "字符串-值"的对应
* Map 结构提供了 "值-值" 的对应
* 接受数组作为参数，数组的成员是一个个表示键值对的数组。
* 只有对同一个对象的引用，Map 结构才将其视为同一个键
* API:
    * size 属性
    * set(key, value)  返回当前 Map 对象 - 链式写法
    * get(key)
    * has(key)
    * delete(key)
    * clear()

* 遍历方法：
    * keys():  返回键名的遍历器
    * values(): 返回键值的遍历器
    * entries(): 返回所有成员的遍历器
    * forEach(): 遍历 Map 的所有成员

* 遍历顺序就是插入顺序
* 扩展运算符(...) 将 Map 结构转为 数组结构
* 将数组传入 Map 结构函数，就可以转为 Map

## WeakMap

* 只接受对象作为键名
* WeakMap 的键名所指向的对象，不计入垃圾回收机制
* 用途：
    * DOM 节点作为键名

    * 部署私有属性