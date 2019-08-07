# 预渲染

## 踩坑
* webpackJsonp is not defined

路由懒加载 ==> 打包后的静态文件
```html
<head>
    <script ></script>
    <link rel="shortcut icon" href="/favicon.ico">
    <link href="/static/css/app.d47b42f.css" rel="stylesheet">
    <script type="text/javascript" charset="utf-8" async="" src="/static/js/0.48c2a52.js"></script>
    <script type="text/javascript" charset="utf-8" async="" src="/static/js/7.d35cc78.js"></script>
</head>
```

同步加载组件 ==> 打包后的静态文件
```html
<head>
    <script ></script>
    <link rel="shortcut icon" href="/favicon.ico">
    <link href="/static/css/app.50ab476.css" rel="stylesheet">
</head>
```

参考：[Try not using any asynchronous import () calls.](https://github.com/chrisvfritz/prerender-spa-plugin/issues/172#issuecomment-379512965)

对要进行预渲染的路由不要异步加载组件
【注：据说npm i webpack@4.28.4可以支持路由懒加载】未验证


* 预渲染会怎么处理组件上的请求
* 预渲染如何选择server ==> 支持和webpack devServer.proxy 一样的的配置


1. 项目在开发环境采用 webpack proxy 转发，在测试/生产环境与 server 同源
2. 预渲染时前端找不到对应的 server
    1. 前端判断预渲染环境，在预渲染时不发送请求
    2. 前端判断预渲染环境，指定server
    
## [配置](https://github.com/chrisvfritz/prerender-spa-plugin#advanced-usage-webpackconfigjs)
```js
const PrerenderSPAPlugin = require('prerender-spa-plugin');
const Renderer = PrerenderSPAPlugin.PuppeteerRenderer;
const path = require('path');
new PrerenderSPAPlugin({
    staticDir: path.join(process.cwd(), 'dist'),  //  webpack 打包目录
    router: ['/', '/about'],  //  需要预渲染的路由
    renderer: new Renderer({
        injectProperty: '__PRERENDER_INJECTED',  //  环境变量
        inject: {
            env: 'prerender'
        },
        headless: false,  //  打开浏览器 方便 debugging 可以配合 renderAfterElementExists （设置一个不存在的 element） 暂停打包过程
    })
});
```
```js
// 业务代码
if (window.__PRERENDER_INJECTED && window.__PRERENDER_INJECTED.env === 'prerender') {
     console.log('预渲染');
} else {
    //   这里的逻辑在预渲染时就不会执行了
}
```

## 与 vue-router history 搭配

预渲染需要 vue-router 使用history模式 hash 模式下 hash 不会带到服务器，服务端无法识别

针对要预渲染的路由需要增加如下配置
```js
app.use(history({
    rewrites: [
        { from: '/about', to: '/about/index.html' }   //  需要预渲染的路由
    ]
}))
```
    
## 总结 预渲染 适合一些固定的静态展示页面，不适合功能页面。

## 预渲染 VS 客户端渲染 优点
* 弱网环境下首页白屏时间明显缩短

## 持续优化，预渲染出骨架屏