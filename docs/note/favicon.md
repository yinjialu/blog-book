# 设置网站状态栏图标

### 初级，快速配置一个可用的 favicon
* vue 工程
1. 在根目录添加 favicon.ico 文件
2. webpack.dev.conf.js
```javascript
new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'index.html',
            inject: true,
            favicon: './favicon.ico'
        })
```
favicon.ico 一般添加到根目录，也可以放在其他目录，对应修改webpack.dev.conf.js 配置路径即可，修改后需要重启


### 进阶用法
* 动态修改 favicon.ico
```javascript
(function(href) {
    var link = document.querySelector("link[rel*='icon']") || document.createElement('link');
    link.type = 'image/x-icon';
    link.rel = 'shortcut icon';
    link.href = href || 'http://www.stackoverflow.com/favicon.ico';
    document.getElementsByTagName('head')[0].appendChild(link);
})();
```

参考：
1. [Changing website favicon dynamically](https://stackoverflow.com/questions/260857/changing-website-favicon-dynamically)