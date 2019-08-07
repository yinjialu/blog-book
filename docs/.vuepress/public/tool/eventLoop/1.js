console.log(1);
setTimeout(() => {
    console.log(2);
    setTimeout(() => {
        console.log(3);
    }, 0);
}, 0);

Promise.resolve(1).then(() => {
    console.log(4);
}).then(() => {
    console.log(5);
}).then(() => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(6);
        }, 0);
    })
}).then(() => {
    console.log(6);
})

process.nextTick(function (params) {
    console.log(8);
    process.nextTick(function (params) {
        console.log(9);
    })
})

console.log(7);

// 1
// 7
// 4
// 5
// 2
// 3
// 6