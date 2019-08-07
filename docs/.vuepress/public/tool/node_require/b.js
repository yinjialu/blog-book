/* eslint-disable no-console */
console.log('b starting');
exports.done = false;
var a = require('./a.js');  // ---> 2
// console.log(a);  ---> {done:false}
console.log('in b, a.done = %j', a.done); // ---> 3
exports.done = true;
console.log('b done');