# cached 

vue 的缓存函数

在很多的查询dom元素的过程中把当前的查询结果缓存起来，下次相同的查询可以直接使用缓存值

闭包的典型应用


```js
//  src/shared/util.js
function cached(fn) {
    const cache = Object.create(null);
    return function(str) {
        const hit = cache(str);
        return hit || (cache[str] = fn(str));
    }
}
```

应用

```js
//  src/platforms/web/entry-runtime-with-compiler.js
//  通过id查询DOM元素
const idToTemplate = cached(id => {
  const el = query(id)
  return el && el.innerHTML
})
```


