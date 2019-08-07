var p = Promise.resolve(1);
console.log(p);

var p2 = new Promise((resolve, reject) => {
    resolve(2);
});

var p3 = p2.then(r => {
    return p;   //   可以返回一个包含异步任务的Promise
});
console.log(p3);

var p4 = p3.then(r => {    //  p3.then() 与 p.then() 的表现是一致的
    console.log('p3');
    console.log(r);   //  1
});

p.then(r => {
    console.log('p');
    console.log(r);   //  1
});

console.log(p === p3);   //  false p3 与 p 不是同一个Promise

/*
*  .then() 返回的 Promise 与 回调函数的返回值是什么关系？
*  .then() 返回的 Promise 会在 回调函数被执行的时候决议
*  .then() 返回的 Promise 的 resolve 在回调函数执行后执行，回调函数的返回值是 resolve 的参数
* */


p.then(r => {
    console.log(r);   //  1
    return r   //  同步任务
}).then(r => {
    console.log(r);   //  1
});