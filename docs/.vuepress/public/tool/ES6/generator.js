function getY(x) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve((3 * x) - 1);
        }, 100);
    });
}

function foo(bar, baz) {
    var x = bar * baz;
    return [
        Promise.resolve(x),
        getY(x),
    ];
}

Promise.all(foo(10, 20)).then(msgs => {
    var x = msgs[0];
    var y = msgs[1];
    console.log(x, y);
    console.log(...msgs);
});

function spread(fn) {
    return Function.apply.bind(fn, null);
}

console.log(spread((x, y) => console.log(x, y)));

Promise.all(foo(10, 20)).then(spread((x, y) => console.log(x, y)));