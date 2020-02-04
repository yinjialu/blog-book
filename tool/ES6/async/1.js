const p1 = Promise.resolve(1);
const p2 = Promise.reject(2);

const f = async () => {
    let d1 = await p1;
    console.log(d1);   //  1
    try {
        let d2 = await p2;
        console.log(d2);
    } catch (e) {
        console.log(e);   //  2
    }
    let d2 = await new Promise((resolve, reject) => {
        resolve(3);
    }).then(v => {
        return 4
    });
    console.log(d2);   //  4
};

f();