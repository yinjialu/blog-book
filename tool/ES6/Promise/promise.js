function YPromise (fn) {
    this.promiseStatus = 'pending';
    this.promiseValue = '';
    this.resolveHandle = v => v;   //  默认把值传给下一个Promise
    this.rejectHandle = err => {throw err};  //  重新抛出错误给下一个Promise
    this.resolveResult = '';
    this.rejectResult = '';
    this.thenResolve = () => {};
    this.catchResolve = () => {};
    const resolved = 'resolved';
    const rejected = 'rejected';
    const changePromiseStatus = (status) => {
        if (status === 'pending') {
            if ([resolved, rejected].indexOf(status) > -1) {
                this.promiseStatus = status;
                callback(status);
            } else {
                throw new Error('未知类型');
            }
        } else {
            callback(status);
        }
    };
    const callback = (status) => {
        if (status === resolved) {
            this.resolveResult = this.resolveHandle(this.promiseValue);
            this.thenResolve(this.resolveResult);
        } else {
            this.rejectResult = this.rejectHandle(this.promiseValue);
            this.catchResolve(this.rejectResult);
        }
    };
    const resolve = solve => {   //  被调用了两次，不知道原因
        if (this.promiseStatus === 'pending') {
            Promise.resolve(solve)     //   展开 resolve 接收到的参数，如果接收到 Promise.reject('err'), 会进入到 catch 的逻辑分支
                .then(v => {
                    this.promiseValue = v;
                    changePromiseStatus('resolved');
                })
                .catch(err => {
                    this.promiseValue = err;
                    changePromiseStatus('rejected');
                });
        } else {
            //  重复调用的处理逻辑
        }
    };
    const reject = ject => {
        if (this.promiseStatus === 'pending') {
            Promise.reject(ject).catch(err => {
                this.promiseValue = err;
                changePromiseStatus('rejected');
            })
        } else {
            //  重复调用的处理逻辑
        }
    };
    fn(resolve, resolve);
}

YPromise.prototype.then = function (fn1, fn2) {
    (typeof fn1 === 'function') && (this.resolveHandle = fn1);
    (typeof fn2 === 'function') && (this.rejectHandle = fn2);
    return new YPromise((resolve, reject) => {
        this.thenResolve = resolve;   //  保存下这个resolve 在 fn1 调用后再调用它
        // resolve(this.resolveResult);  //  需要验证它执行的时机（需要比 this.resolveHandle 后执行，怎么保证）
        //  需要和 this.resolveResult 关连起来
    });    //  以回调函数的结果返回一个新的 Promise  这个 return 的实现有点问题
};

YPromise.prototype.catch = function (fn) {
    (typeof fn === 'function') && (this.rejectHandle = fn);
    return new YPromise((resolve, reject) => {
        this.catchResolve = resolve;
        // resolve(this.rejectResult);
        //  需要和 this.rejectResult 关联起来
    });
};

// Promise.resolve = function (v) {
//     if (v instanceof Promise) {
//         return v;
//     } else {
//         return new Promise((resolve, reject) => {
//             resolve(v);    //  这里构成了循环依赖
//         })
//     }  //  还需要处理 thenable 类型
// };

// Promise.reject = function (v) {
//     return new Promise((resolve, reject) => {
//         reject(v);
//     });
// };

module.exports = YPromise;

var p = new YPromise((resolve, reject) => {
    resolve(1);
}).then(v => {
    console.log('一');
    console.log(v);
    return 2;
}).then(v => {
    console.log('二');
    console.log(v);   // 2
    return new YPromise((resolve, reject) => {
        setTimeout(() => {
            resolve(3)
        })
    })
}).then(v => {
    console.log('三');
    console.log(v);   // 3
});

// console.log(p);
// console.log(p instanceof YPromise);   //  true