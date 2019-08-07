export var a = 1;
setTimeout(() => a = 100, 500);

export function bar(params) {
    console.log('bar');
}

export { bar as Bar }  //  重命名

var b = 2;
export { b };