import { bar, a } from "./4.mjs";
console.log('a:', a);
bar();
export var b = 2;

export function foo(params) {
    console.log('foo');
}

export default 5;