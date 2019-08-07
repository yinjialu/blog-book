Promise.reject('err').catch(e => {
    console.log(e);   //  err
}).then(v => {
    console.log(v);  // undefined
    return 2;
}).then(v => {
    console.log(v);   // 2
    return Promise.reject('bug').catch(e => {
        console.log(e);   //  bug
    })
}).then(v => {
    console.log(v);   // undefined
    return 3;
}).then(v => {
    console.log(v);   //  3
}).catch(e => {
    console.log('不会来这里');
    console.log(e);
})