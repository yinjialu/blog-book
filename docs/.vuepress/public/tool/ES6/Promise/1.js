/*
* Promise 中出现的错误会自动触发 reject 决议
* */

var p = new Promise((resolve, reject) => {
    throw new Error('bug');
});

console.log(p);

p.then(v => {
    console.log(v);
}).catch(err => {
    console.log('捕获到了');
    console.log(err); //  Error: bug
});