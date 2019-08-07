# 异步与性能

## 回调函数的信任问题

回调函数由第三方模块执行，无法保证回调函数被执行的时机和次数

## Promise

控制反转，第三方模块通知任务何时结束，我们自己的代码决定下一步做什么。
Promise 提供了一个中立的协商机制
* .then() 注册的回调函数会异步调用
* .then() 注册的回调函数会添加到任务队列，在下一轮事件循环之前完成调用
* Promise 的 resole 或者 reject 一定会被调用，另外还可以通过 Promise.race() 设置超时
* Promise 决议只会被调用一次
* Promise 内部的错误会被捕获，并自动触发 reject
* Promise.resolve() 获取一个可信任的 Promise
* Promise.catch() 捕获错误
* Promise.catch() 中出现的错误怎么办
* .then() 的默认处理函数
```js
function resolveHandle(v) {
    return v;   //  把接受到的值传入下一个Promise
}
```
* .catch() 的默认处理函数
```js
function rejectHandle(err) {
    throw err  //  重新抛出错误  沿着Promise 链传下去
}
```