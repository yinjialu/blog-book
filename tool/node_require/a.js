/* eslint-disable no-console */
console.log('a starting');
exports.done = false;
var b = require('./b.js'); // ---> 1
console.log('in a, b.done = %j', b.done);
exports.done = true;
console.log('a done') // ---> 4