async function f1(params) {
    let d =  await Promise.reject('bug');
    console.log(d);   //  不会执行  抛出错误
}

// f1();

async function f2(params) {
    let d = await Promise.reject('err').catch(e => {
        console.log(e);   //  err
        return 'bugKey'
    })
    console.log(d);   //  bugKey
    return d;
}

// f2();

async function f3(params) {
    let d = await f2();
    console.log(d);  //  bugKey
}

f3();