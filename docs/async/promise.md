# Promise

## 回调函数的问题
1. 嵌套导致难以维护
2. 控制反转 导致出现的信任问题（重要）（第三方模块对回调函数执行的时机，回调函数执行的次数都不可控）

## Promise 解决了什么
1. 引入 Promise 中介机制，第三方模块负责通知 Promise 处理结果（决议Promise）。Promise 负责调用回调
2. Promise.then() 注册的回调会添加到任务队列，在当前事件循环队列之后（异步），下一轮事件循环之前执行
3. Promise 状态只能改变一次，外部不能改变其状态。（回调肯定会被执行且只执行一次）
4. Promise.then() 的默认处理函数
    ```js
    function resolveHandle(v) {
        return v;   //  把接受到的值传入下一个Promise
    }
    ```
5. Promise.catch() 的默认处理函数
   ```js
   function rejectHandle(err) {
       throw err  //  重新抛出错误  沿着Promise 链传下去
   }
   ```
6. Promise.resolve()  生成可信任的 Promise，接受到 Promise 时会直接返回接受到的Promise
7. Promise.then() 和 Promise.catch() 都会返回 新的Promise 支持链式调用
    ```js
    Promise.then = function(fn) {
        return Promise.resolve(fn())
    }
    ```
8. resolve 会展开 thenable  和 Promise.resolve 一样 
    
    参考：【你不知道的Javascript·中卷 3.4-术语，决议，完成以及拒绝】
    ```js
    var p = new Promise((resolve, reject) => {
       resolve(Promise.reject('bug'));    //  resolve 会直接返回接收到的 Promise
    })
    .then(v => {
       console.log('这里不会执行')
    })
    .catch(err => {
       console.log(err);   //  'bug'
    })
    ```
## Promise 带来的问题
1. 额外的性能开销  （可以接受）
2. .catch() 中出现的错误无法捕获
3. 无法取消
4. Promise 链怎么暂停？
5. Promise 链如何跨级传输数据？

## Promise 更进一步
1. 识别Promise 
    1. thenable 
2. 简单实现一个 Promise 

    <<< @/docs/.vuepress/public/tool/ES6/Promise/promise.js

## 已有方案
* [bluebird](https://github.com/petkaantonov/bluebird)
* [promise](https://github.com/then/promise)
* [q](http://github.com/kriskowal/q)
* [when](https://github.com/cujojs/when)
* [asynquence](https://github.com/getify/asynquence)
* [es6-promise](https://github.com/stefanpenner/es6-promise)

## 还未理解的
1. resolve 与 Promise.resolve 之间的关系