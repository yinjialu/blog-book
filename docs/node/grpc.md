# grpc

## 基本封装

```js
const grpc = require('grpc');
const protoLoader = require('@grpc/proto-loader');
const protoPath = '';  //  proto 文件路径
const packageName = '';  //   proto 文件的 package 对应字段
const serverName = '';   //  proto 文件 service 对应的字段
const host = '';   //  服务 host
const port = '';   //  服务 端口
const packageDefinition = protoLoader.loadSync(
    protoPath,
    {
        keepCase: true,
        longs: String,
        enums: String,
        defaults: true,
        oneofs: true,
    });
const protoPackage = grpc.loadPackageDefinition(packageDefinition)[packageName];
const protoClient = protoPackage[serverName](host + ':' + port, grpc.credentials.createInsecure());
```

```js
//  使用
const method = '';  //  方法名
protoClient[method](request, (err, response) => {});
```

## 常见错误码

* 4 超时
* 14 连接失败
* 12 detail: 'Method not found:'