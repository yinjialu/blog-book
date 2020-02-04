/* eslint-disable no-console */
console.log('main starting');
var b = require('./b.js');
var a = require('./a.js'); // --> 0
console.log('in main, a.done=%j, b.done=%j', a.done, b.done);