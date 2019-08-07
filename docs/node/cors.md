# node 配置 cors 支持跨域请求

1. `npm install --save cors`

2. 配置
    ```js
    const express = require('express');
    const app = express();
    const cors = require('cors');
    app.use(cors());
    ```
3. 更多配置方式参考：[npm:cors](https://www.npmjs.com/package/cors)

4. Response Headers  `Access-Control-Allow-Origin: *` 参考 [MDN:HTTP访问控制](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Access_control_CORS)
    
5. 取消跨域支持后，客户端不清缓存还能继续访问（不知道原因）