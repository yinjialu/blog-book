# eval() 和 new Function()

* eval()

    evaluates a string as a JavaScript expression within the current execution scope and can access local variables.
    eval 能够访问局部变量

* new Function()

    parses the JavaScript code stored in a string into a function object, which can then be called. It cannot access local variables because the code runs in a separate scope.
    new Function 不能访问局部变量
    
```js
//  node 环境下
var a = 1;
eval('(a = 2)');
console.log(a);   //  2

function f() {
    return new Function('return a = 3')
}

console.log(f()());   //  3
console.log(a);   //  2  局部变量没有改变
```

* 浏览器
    ```js
    var a = 1;
    var f = new Function('console.log(a)');  //  1
    f();
    ```
    
    ```js
    var a = 1;
    
    function f() {
        var a = 2;
        return new Function('console.log(a)');   //  1  访问的全局变量 a 
    }
    
    f()();
    ```
    
* node
    ```js
    var a = 1;
    var f = new Function('console.log(a)');  //  a is not defined
    f();
    ```
    
    ```js
    global.a = 1;   //  全局变量
    
    function f() {
        var a = 3;
        return new Function('a++');  //  访问到全局变量了
    }
    
    f()();
    
    console.log(a);   //  2
    ```

## 总结

1. eval 可以访问上下文的局部变量
2. new Function 只能访问自己的本地变量和全局变量，不能访问上下文环境的局部变量(new Function创建的函数一般在全局作用域中被创建)

参考：

[Are eval() and new Function() the same thing?](https://stackoverflow.com/questions/4599857/are-eval-and-new-function-the-same-thing)
[MDN: new Function](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Function)