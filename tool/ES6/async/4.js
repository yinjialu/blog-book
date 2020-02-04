function *foo() {
    try {
        yield 'B';
    } catch (e) {
        console.log('error caught inside *foo():', e);
    }

    yield 'C';
    throw 'D';
}

function *bar() {
    yield 'A';
    try {
        yield *foo();
    } catch (e) {
        console.log('error caught inside *bar():', e);
    }

    yield 'E';
    yield *baz();
    yield 'G'; // 这里不会执行了
}

function *baz() {
    throw 'F';
}

var it = bar();

console.log('outside:', it.next().value);   // outside: A
console.log('outside:', it.next(1).value);  // outside: B
console.log('outside:', it.throw(2).value); // throw 触发了foo内部的catch
// error caught inside *foo(): 2
// outside: C
console.log('outside:', it.next(3).value);
// error caught inside *bar(): D
// outside: E
try {
    console.log('outside:', it.next(4).value);
} catch (e) {
    console.log('error caught outside:', e); // error caught outside: F
}