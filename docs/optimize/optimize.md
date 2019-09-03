# 持续优化

## 减少 bundle 体积

* 延迟加载
    * [参考：Vue 性能优化：如何实现延迟加载和代码拆分？](https://www.infoq.cn/article/9ihyy7HW00ij8suTh*zN)
    
    要想知道网站实际使用了多少 JavaScript 代码，我们可以转到 devtools -> cmd + shift + p -> type coverage -> 单击“record”，然后应该能够看到实际使用了多少下载的代码。

* 启用 Gzip 压缩
   * [compression](https://github.com/expressjs/compression)  需要验证


## 缓存