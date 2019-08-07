# vue 路由 HTML5 History 模式

## vue-router
```javascript
import Vue from 'vue';
import Router from 'vue-router';
Vue.use(Router);
export default new Router({
    mode: 'history',
    routes: [],
})
```

## 开发环境 webpack.dev.conf.js
 
 [devServer.historyApiFallback](https://www.webpackjs.com/configuration/dev-server/#devserver-historyapifallback)

* 简单设置
```
devServer: {
    historyApiFallback: true
    ···
}
```

* 更多设置
```
devServer: {
    historyApiFallback: {
        rewrites: [
            { from: /.*/, to: path.posix.join(config.dev.assetsPublicPath, 'index.html')}
        ]
    }
}
```

## 生产和测试环境
```js
const env = process.env.NODE_ENV || 'production';
const path = require('path');
if (env !== 'development') {
    app.use('/*', (req, res) => {
        res.sendFile(path.join(process.cwd(), '/dist/index.html'));
    })
}
```

使用 [connect-history-api-fallback](https://github.com/bripkens/connect-history-api-fallback)

`npm install --save connect-history-api-fallback`
```js
const env = process.env.NODE_ENV || 'production';
const history = require('connect-history-api-fallback');
if (env !== 'development') {
    app.use(history({
        verbose: true, //  打开log
    }));    //  一定要在 express.static 之前
    //  默认重定向到 /index.html
    app.use(express.static('./dist'));
}
```

注：webpack 的 devServer.historyApiFallback 配置也是依赖 `connect-history-api-fallback`

## 踩坑
1. 开发环境下，同时配置 `historyApiFallback` 和 `proxy` 可能存在冲突
    ```
    '/forceUpdate': {
        target: 'http://localhost:5910',
        changeOrigin: true
    }
    ```
    `/forceUpdate` 对应的路由刷新会 404
    
    ```
    '/game': {
            target: 'http://localhost:5910',
            changeOrigin: true
        },
    ```
    `/gameOrder` 对应的路由刷新也会 404 ，也冲突了

