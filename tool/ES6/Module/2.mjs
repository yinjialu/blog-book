import { a } from "./1.mjs";   //  编译阶段执行，在代码运行之前
import f1 from './3.mjs';
import * as m from "./1.mjs";   //  模块整体加载
import * as n from "./3.mjs";
console.log(m);   //  [Module] { Bar: [Function: bar], a: 1, b: 2, bar: [Function: bar] }
console.log(n);   //  [Module] { default: [Function: default], foo: [Function: foo] }
console.log(a);   //  1
setTimeout(() => {
    console.log(a);  //  100  动态更新了
}, 500);  

f1();