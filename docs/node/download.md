# node 文件下载服务

## server 处理下载请求
```javascript
const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

router.get('/:logName', (req, res) => {
    const logName = req.params.logName;
    const filePath = path.join(process.cwd(), '/log', logName);
    fs.exists(filePath, function (exists) {
        if (exists) {
            const status = fs.statSync(filePath);
            if (status.isFile()) {
                const readStream = fs.createReadStream(filePath);
                readStream.pipe(res);
            } else {
                res.status(404).end();
            }
        } else {
            res.status(404).end();
        }
    });
})

module.exports = router;
```

## express.static 提供静态文件
```javascript
const express = require('express');
const app = express();
app.use('/log', express.static(path.join(process.cwd(), 'log')));
```