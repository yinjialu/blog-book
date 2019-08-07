var p3 = new Promise((resolve, reject) => {
    resolve(Promise.reject('bug'));  //  resolve 同 Promise.resolve 会将接受到的 Promise 返回
});

p3
    .then(r => {
        console.log('不会执行');
        console.log(r);
    })
    .catch(err => {
        console.log('运行到这了');
        console.log(err);
        throw new Error('出错了');
    });

var p11 = new Promise((resolve, reject) => {
    reject(Promise.resolve(1));    //  reject 不会展开
}).then(r => {
    console.log('这里不会运行');
}).catch(err => {
    console.log('到这了');
    console.log(err);   //  Promise { 1 }
});

var p12 = new Promise((resolve, reject) => {
    resolve(1);
}).then(r => {
    console.log(r);
    return Promise.reject('P12: bug');
}).catch(err => {
    console.log(err);   //  P12: bug
});


//  关于 resolve 内部实现的猜测
const resolve = function(solve) {       //  resolve 内部使用 Promise.resolve 对接收到的参数进行一次处理
    Promise.resolve(solve     //   展开 resolve 接收到的参数，如果接收到 Promise.reject('err'), 会进入到 catch 的逻辑分支
        .then(v => {
            changePromiseStatus('resolved');
        })
        .catch(err => {
            changePromiseStatus('rejected');
        }));
};