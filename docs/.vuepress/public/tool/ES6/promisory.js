//  回调函数向 Promise 迁移

if (!Promise.wrap) {
    Promise.wrap = function (fn) {
        return function () {
            var args = [].slice.call(arguments);
            return new Promise((resolve, reject) => {
                fn.apply(null, args.concat((err, v) => {   //  这就是原来的回调函数  通过 Promise决议
                    if (err) {
                        reject(err);
                    } else {
                        resolve(v);
                    }
                }))
            })
        }
    }
}

//  使用示例
// var request = Promise.wrap(ajax);
// request('http://some.url').then().catch();