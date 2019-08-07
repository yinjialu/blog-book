# 面试题

## 异步
<details>
<summary>回调：</summary>
</details>

<details>
<summary>事件监听：</summary>
</details>

<details>
<summary>发布订阅：</summary>
</details>

<details>
<summary>Promsie：</summary>

* Promise 解决了什么问题
  * 链式调用是怎么实现的？
    * .then() 和 .catch() 做了什么？
    * .then() 返回的 Promise 的决议值是怎么确定的？
  * 信任问题是怎么保障的？
    * .then() 注册的回调函数的的执行时机
      * microtasks 微任务队列  
      * miarotasks 宏任务队列
      * 每个宏任务都包含了一个微任务队列
      * 依据任务来源判断判断任务添加到哪个队列
        * 微任务来源
          * Process.nextTick
          * Promise
          * MutationObserver
          * Object.observe 
        * 宏任务来源
          * I/O 
          * setTimeout + setInterval + setImmediate
          * UI renderder
  * resolve() 决议接受到Promise会怎么处理
  * Promise.resolve() 是怎么实现的？
</details>

<details>
<summary>async await：</summary>

* 实现原理
  * 启动器
  * 生成器（状态机）
  * 遍历器 （调用生成器会生成一个遍历器）
  * 启动器会自动调用遍历器的 next 方法
  * yield 提供了暂停的功能，遍历器遇到 yield 就会暂停执行并返回返回 yield 后面的值，下一次执行 next(n) 传入的参数 `n` 会作为这个 yield 的返回值。
  * Generator 的关键在于通过异步任务的回调函数来执行遍历器的`next`方法
  * 对异步任务的处理
    * 转成 Promise 在.then() 中执行 next()
    * Thunk 将回调函数作为一个单独的参数传入 
</details>

## Vue
  
* v-model 封装组件

## JavaScript 模块机制

