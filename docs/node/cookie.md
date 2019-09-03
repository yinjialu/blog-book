# cookie

服务端设置 cookie 发送给客户端，客户端以后的每次请求都会带上该cookie

？客户端修改 cookie 有什么用处
1. 登录与退出登录

? sessionId 与 cookie
1. sessionId 由服务端生成，加密后存储在客户端

## node express 设置 cookie

* cookie-parser
```javascript
const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
app.use(cookieParser());
app.use('/', (req, res, next) => {
    console.log(req.cookies);   //  获取 cookie
    var cookie = req.cookies.userName;
    if (!cookie) {
        const option = {
            maxAge: 900000,
            httpOnly: false,   //  true: 通过js脚本无法读取到这个 cookie 信息，防止 xss 攻击
        }; //  配置 cookie 属性
        res.cookie('userName', 'yinjialu', { httpOnly: false });
        console.log('cookie created successfully');
    } else {
        console.log('cookie exists', cookie);
    }
    next();
});
```

* writeHead
```js
res.writeHead(200, {
    'Set-Cookie': ['user=userName'],
});
```

## sessionId
`express-session` 生成的 `sessionId` 存在 cookie 的 `connect.sid` 中

`connect.sid` ==> `'s:' + sessionid + '.' + sessionid.sha256(secret).base64()`
[secret](https://www.npmjs.com/package/express-session#secret) 是服务端配置 session 时的配置项 secret  (This is the secret used to sign the session ID cookie)

## node res 设置 cookie
```javascript
res.writeHead(200, {
    'Set-Cookie': [`user=userName; maxAge: ${24 * 60 * 60 * 1000}`],
    //  `; ` 连接属性
});
res.end('userName');
```
```javascript
res.setHeader('Set-Cookie', [`user=userName; maxAge: ${24 * 60 * 60 * 1000}`]);
```
查看 response Headers
`set-cookie: user=userName; maxAge: 86400000`

查看 request Headers
`Cookie: user=userName;`

## 适合存储在 cookie 中的数据类型
1. sessionId
2. 登录状态

## 工具函数
```javascript
var CookieUtil = {
    get: function(name) {
        var cookieName = encodeURIComponent(name) + '=',
            cookieStart = document.cookie.indexOf(cookieName),
            cookieValue = null;
        if (cookieStart > -1) {
            var cookieEnd = document.cookie.indexOf(';', cookieStart);
            if (cookieEnd === -1) {
                cookieEnd = document.cookie.length;
            }
            cookieValue = decodeURIComponent(document.cookie.substring(cookieStart + cookieName.length, cookieEnd));
        }
        return cookieValue;
    },
    set: function(name, value, expires, path, domain, secure) {
        var cookieText = encodeURIComponent(name) + '=' + encodeURIComponent(value);
        if (expires instanceof Date) {
            cookieText += '; expires=' + expires.toGMTString();
        }
        if (path) {
            cookieText += '; path=' + path;
        }
        if (domain) {
            cookieText += '; domain=' + domain;
        }
        if (secure) {
            cookieText += '; secure';
        }
        document.cookie = cookieText;
    },
    unset: function(name, path, domain, secure) {
        this.set(name, '', new Date(0), path, domain, secure);
    }
};
```

## cookie 属性

* domain => 指定可访问Cookie的主机名 ("name=value;domain=.google.com";这样，所有.google.com下的主机都可以访问该Cookie)
* path => 指定可访问Cookie的目录 默认 /
* expires => 有效期
* maxAge => 过期时间
* httpOnly => js脚本(document.cookie) 读取不到  防止XSS攻击。
* secure => https连接才会传到服务器进行验证

参考：
1. 《Javascript高级程序设计》第23章 23.3.1 Cookie