var p = Promise.resolve(1,2);  //  2 会被忽略

p
    .then(v => {
        console.log(v);
    })
    .catch();

var p2 = Promise.resolve([1,2]);
p2.then(v => {
    console.log(...v);
});

var f = (a, b) => {
    console.log(a, b);
};

f.apply(null, [3,4]);

var p3 = new Promise((resolve, reject) => {
    resolve.apply(null, [5,6]);
}).then((a, b) => {
    console.log(a);
    console.log(b);
});