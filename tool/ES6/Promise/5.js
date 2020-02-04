/*
* Promise.all()  Promise.race() 使用示例，Promise的状态是不能从外部改变的
* 所以 Promise.race() 第一个 子Promise返回后其他Promise不会被取消
* */

var p5 = Promise.resolve(1);
p5.then(r => console.log(r)).catch(err => console.log(err));

var p6 = Promise.resolve(2);
p6.then(r => console.log(r)).catch(err => console.log(err));

var p7 = Promise.resolve(3);
p7.then(r => console.log(r)).catch(err => console.log(err));

var p8 = Promise.all([p5, p6, p7]).then(r => console.log(r)).catch(err => console.log(err));

var p9 = Promise.race([p5, p6, p7]).then(r => console.log('race: ' + r)).catch(err => console.log(err));