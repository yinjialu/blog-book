function *bar() {
    console.log('inside *bar():', yield 'A');
    console.log('inside *bar():', yield *['B', 'C', 'D']);
    console.log('inside *bar():', yield 'E');
    return 'F';
}

var it = bar();

console.log('outside:', it.next().value);   //outside: A
console.log('outside:', it.next(1).value);
// inside *bar(): 1
// outside: B
console.log('outside:', it.next(2).value);  //outside: C
console.log('outside:', it.next(3).value);  //outside: D
console.log('outside:', it.next(4).value);
// inside *bar(): undefined
// outside: E
console.log('outside:', it.next(5).value);
// inside *bar(): 5
// outside: F