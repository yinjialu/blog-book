# 移动端适配

## 为移动端和前端分别编写前端工程，在server端判断请求来自移动端还是PC端，响应不同的页面

读取请求头部的 `User-Agent` 信息

```js
function isMobile(userAgent) {
    return /iPhone|iPad|Android/i.test(userAgent);
}

//  request.headers.[user-agent]  ==> userAgent
```

## 客户端判断当前所处环境，然后加载对应组件

`navigator.userAgent`  用户代理字符串

## 媒体查询

