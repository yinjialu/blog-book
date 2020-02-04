const fn1 = () => {
    return new Promise((resolve, reject) => {
        resolve(1);
    });
};

const fn2 = () => {
    return new Promise((resolve, reject) => {
        reject(1);
    });
};

const fn3 = async () => {
    const res1 = await fn1().catch(e => {
        console.log(e);
    });
    console.log('res1', res1);

    const res2 = await fn2().catch(e => {
        console.log(e);  //  1
    });
    console.log('res2', res2);
};

fn3();
