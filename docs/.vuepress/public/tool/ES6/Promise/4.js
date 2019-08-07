/*
* Promise.race() 应该避免接收到空数组
* */

var p4 = Promise.race([]);
//  一直是 pending
p4.then(r => {
    console.log('不会执行');
    console.log(r);
}).catch(err => {
    console.log('不会执行');
    console.log(err);
});