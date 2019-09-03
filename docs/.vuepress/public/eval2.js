"use strict";
var a = 1;

function f() {
    var a = 3;
    return new Function('a++');
}

f()();

console.log(a);   //  2