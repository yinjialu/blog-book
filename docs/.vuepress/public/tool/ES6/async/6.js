async function f1() {
    const a = await Promise.resolve(1);
    console.log(a);   //  1
    try {
        const b = await Promise.reject('bug');
        console.log('b:', b);
    } catch (e) {
        console.log(e);   // bug
    }
    return 3;
}

// f1();

async function f2() {
    const a = await f1();
    console.log(a);
    const b = await 4;
    console.log(b);
    const c = await (function () {
        return 5;
    })();
    console.log(c);
}

f2();