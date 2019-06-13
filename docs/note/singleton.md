# 单例模式

## 通过属性来实现单例模式

## 通过局部变量实现单例模式

## 通过代理实现单例模式

```javascript
var CreateDiv = function(html) {
    this.html = html;
    this.init();
};

CreateDiv.prototype.init = function() {
    var div = document.createElement('div');
    div.innerHTML = this.html;
    document.appendChild(div);
}

var ProxySingletonCreateDiv = (function() {
    var instance;
    return function(html) {
        if (!instance) {
            instance = new CreateDiv(html);
        }
        return instance;
    }
})();

var a = new ProxySingletonCreateDiv('sven1');
var b = new ProxySingletonCreateDiv('sven2');
console.log(a === b);   //   true
```

## JavaScript 的单例
单例的核心只需要一个示例，那么就不需要创建类，直接创建一个对象使用就可以了。

## 惰性单例
```javascript
var getSingle = function(fn) {
    var result;
    return function() {
        return result || (result = fn.apply(this, arguments));
    }
};

var createLoginLayer = function() {
    var div = document.createElement('div');
    div.innerHTML = '登录浮窗';
    div.style.display = 'none';
    document.body.appendChild(div);
    return div;
}

var createSingleLoginLayer = getSingle(createLoginLayer);

document.getElementById('loginBtn').onclick = function() {
    var loginLayer = createSingleLoginLayer();
    loginLayer.style.display = 'block';
}

var createSingleIframe = getSingle(function() {
    var iframe = document.createElement('iframe');
    document.body.appendChild(iframe);
    return iframe; 
});

document.getElementById('loginBtn').onclick = function() {
    var loginLayer = createSingleIframe();
    loginLayer.src = 'http://baidu.com'
}
```