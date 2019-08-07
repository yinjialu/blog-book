var p = Promise.resolve(1);

p
    .catch(err => console.log(err))
    .then(v => {
    console.log('一');
    return new Promise((resolve, reject) => {
        // reject('err');
        resolve(3);
    }).catch(err => {
        console.log('二');
        console.log(err);
    })
}).then(v => {
    console.log(v || '四');
    return Promise.resolve(2);
}).then(v => {
    console.log('三');
    console.log(v);
}).catch(err => {
    console.log('五');
    console.log(err);
});