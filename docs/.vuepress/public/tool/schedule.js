/*
* 任务队列
* */

console.log('start');

setTimeout(() => {
    console.log(1);
}, 0);

setTimeout(() => {
    console.log(2);
}, 1000);

setTimeout(() => {
    console.log(3);   //  3 比 2 先添加到任务队列
}, 500);

const p = new Promise((resolve, reject) => {
    console.log(4);    //  不属于异步任务，直接执行
    resolve(5);
});
p.then(res => {
    console.log(res || 5);    //  优先级比 setTimeout 高
});

const p2 = new Promise((resolve, reject) => {
    console.log(6);
    setTimeout(() => {
        resolve(7);
    }, 1000)
});
p2.then(res => {
    console.log(res || 7);
});

setTimeout(() => {
    setTimeout(() => {
        console.log(8);
    }, 0);
}, 0);

process.nextTick(() => {
    console.log(10);     //  比 Promise.then() 的优先级高
});

console.log('end');

/*
* 事件循环队列
* 任务队列  （挂在事件循环队列的每个 tick 之后的一个队列）（在下一次循环之前执行）
* */