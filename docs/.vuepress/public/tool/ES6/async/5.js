function *foo(url) {
    try {
        console.log('requesting:', url);
        var TMP1 = request(url);    //  request 是一个支持 Promise 的工具
        var val = yield TMP1;
        console.log(val);
    } catch (e) {
        console.log('Oops:' + e);
        return false;
    }
}

//  ES5 翻译
function foo(url) {
    var state, val;
    function process(v) {
        switch (state) {
            case 1:
                console.log('requesting:' + url);
                return request(url);
            case 2:
                val = v;
                console.log(val);
                return;
            case 3:
                var err = v;
                console.log('Oops:' + err);
                return false;
        }
    }
    return {
        next: function (v) {
            if (!state) {
                state = 1;
                return {
                    done: false,
                    value: process()
                }
            } else if (state === 1) {
                state = 2;
                return {
                    done: true,
                    value: process(v)
                }
            } else {
                return {
                    done: true,
                    value: undefined
                }
            }
        },
        throw: function (e) {
            if (state === 1) {
                state = 3;
                return {
                    done: true,
                    value: process(e)
                };
            } else {
                throw e;
            }
        }
    }
}