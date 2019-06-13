# socket 推送消息

在一些长链接任务场景中，因为 http 的超时限制，需要socket 配合通知任务进度

socket 与 express 共享 session 来识别客户端

## 服务端实现

```javascript
const express = require('express');
const app = express();

const session = require('express-session')({
    secret: '1234565',
});
app.use(session);

const server = app.listen(3000, function() {
    const host = server.address().address;
    const port = server.address().port;
    console.log('访问地址 http://%s:%s', host, port);
})

const io = require('socket.io')(server);
const sharedsession = require('express-socket.io-session');
const socketCollection = {};   //  管理socket实例
io.use(sharedsession(session));   //  共享session

io.on('connection', function(socket) {
    console.log('socket connected');
    console.log(socket.handshake.sessionID);
    socketCollection[socket.handshake.sessionID] = socket;
    
    socket.emit('welcome');
    
    socket.on('disconnect', reason => {
        console.log(reason);
        //  具体原因说明参考 https://socket.io/docs/server-api/#Event-%E2%80%98disconnect%E2%80%99
        //  不用担心，socket.io 会自动重连
    });
    socket.on('onbeforeunload', () => {
        //  前端监听 window.onbeforeunload 通知服务端用户断开连接。
        delete socketCollection[socket.handshake.sessionID];
    })
})
```

## 客户端实现
```javascript
import io from 'socket.io-client';
let socket = io('localhost:3000');  //  部署在同域名下时(测试环境和生产环境)应该是 socket = io();

socket.on('connect', () => {
    //  连接成功
})

socket.on('disconnect', reason => {
    //  连接断开
    if (reason === 'io server disconnect') {
        socket.connect();  //  尝试重连
    }
})

socket.on('reconnect', attrmptNumber => {
    //  重连成功
    //  attrmptNumber  尝试重连的次数
    //  另外还可以监听 reconnect_error  reconnect_failed
})

//  用户离开或者关闭页面
window.onbeforeunload = function() {
    socket.emit('onbeforeunload');
}
```

## 注：
1. socket连接比http连接先创建时，两者的sessionId不一致。

（独立前端工程在开发环境）

2. 当用户刷新浏览器重新连接时会生成新的sessionId。
3. vue 工程可以配合 vue-socket.io 使用
```javascript
import VueSocketIO from 'vue-socket.io';
Vue.use(
    new VueSocketIO({
        debug: true,
        connection: socket
    })
)
```

```vue
<template><div></div></template>
<script >
export default {
    name: 'socket-demo',
    data() {return {}},
    methods: {},
    socket: {
        welcome() {
            console.log('连接成功')
        }
    }
}
</script>

```