var p2 = Promise.resolve(43);
p2.then(r => {
    console.log(r);
    return 44;
}).then(r => {
    console.log('到这了');
    console.log(r);   //  44
    throw new Error('bug');
}).then(r => {     //  默认的处理函数会把错误重新抛出，沿着 Promise 链传下去，直到遇到 .catch()
    console.log('这里不会执行');
    console.log(r);
}).then(r => {
    console.log('这里不会执行');
    console.log(r);
}).catch(err => {
    console.log(err);
    return 45
});