# axios 设置超时并重发请求

## 设置超时
```javascript
import axios from 'axios';
const instance = axios.create({
    timeout: 1000,    //  毫秒
})
```