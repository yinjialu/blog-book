const fn = async () => {
    let a = await Promise.resolve(1);
    console.log(a);   //  1
    let b = '';
    try {
        await Promise.reject('err');
    } catch (e) {
        b = e;
    }
    console.log(b);   //  err
    return {
        a,
        b
    };
};

fn().then(v => console.log(v));   //  { a: 1, b: 'err' }

//  async 返回的是一个Promise