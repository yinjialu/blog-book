const fn = new Promise(((resolve, reject) => {
    resolve(1);
}));

const asy1 = async () => {
    await fn
    return true;
};

const asy2 = async () => {
    return false;
}

const asy = async () => {
    let a1 = await asy1();   //  true
    let a2 = await asy2();   //  false
    return {
        a1, a2
    }
};

asy()
    .then(v => {
        console.log('v', v);
    })
    .catch(e => {
        console.log('e', e);
    });