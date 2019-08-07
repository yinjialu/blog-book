var a = [1, 3, 5, 7, 9];
var it = a[Symbol.iterator]();

console.log(it.next().value);
console.log(it.next().value);
console.log(it.next().value);
console.log(it.next().value);
console.log(it.next().value);
console.log(it.next().value);

console.log(it);