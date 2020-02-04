/*
每个模块只能使用一个 export default
*/
//  import f1 from "./3.mjs";
export default function (params) {   //  匿名函数和具名函数都会当作匿名函数输出，import 时可以任意指定名字
    console.log('default');
}  //  输出一个叫 default 的变量

export function foo(params) {   //  import { foo } from "./3.mjs";    需要{}
    console.log('foo');
}