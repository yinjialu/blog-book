function sw(n) {
    switch (n) {
        case 1:
            console.log('1: ' + n);
            break;
        case [2, 3].indexOf(n) > -1:
            console.log('2/3');
            //   这里的逻辑执行不到
            break;
        default:
            console.log('无匹配内容');
            break;
    }
}

sw(1);
sw(2);
sw(3);
sw(4);

/*
* switch 比较值时使用全等操作符  ===
* */

function swi(n) {
    switch (true) {   //  传递给 switch 的是 true
        case n === 1:
            console.log('1: ' + n);
            break;
        case [2, 3].indexOf(n) > -1:
            console.log('2/3');
            break;
        default:
            console.log('无匹配内容');
            break;
    }
}

swi(1);
swi(2);
swi(3);
swi(4);