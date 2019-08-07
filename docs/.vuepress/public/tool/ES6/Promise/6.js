var p = new Promise((resolve, reject) => {
    resolve(1);
});

var p2 = Promise.resolve(p);

console.log(p === p2);    //  true

//  Promise.resolve 会直接返回接收到的Promise