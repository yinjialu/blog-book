# 深入理解 node stream

## stream 是什么

## 模式
* 对象模式
    * Node.js 创建的流默认运作在字符串和 `buffer` 上
    * 通过objectMode 把流实例切换到对象模式。
## 类型
* `Writable`
* `Readable`
* `Duplex`
* `Transform`
## hwm

## API
* `readableLength`
* `readableFlowing`
* `readableBuffer` : 可读流在内部缓冲器中存储的数据
* `readableHighWaterMark` : 获取配置的 `highWaterMark`

## 理解 Buffer

* 应用场景
    * 处理网络协议
    * 操作数据库
    * 处理图片
    * 接收上传文件
    * 处理大量二进制数据
    
* Buffer 是一个类数组对象，主要用来操作字节
* Buffer 占用的内存不通过 V8 分配，属于堆外内存
* Buffer 对象
    * 类数组，元素为16进制的两位数，即 0 到 255 的数值
    * 访问length 得到长度，通过下标访问元素
    * 构造对象接收一个数值，生成一个对应长度的 Buffer
    ```javascript
    var buffer = new Buffer(10);
    //  <Buffer 00 00 00 00 00 00 00 00 00 00>
    console.log(buffer[0])
    //  0
    ```
    * 访问刚初始化的 buffer 元素，值是0 （书上说是 0 ～ 255 的随机值，存疑）
    * 给元素赋值操作
    ```javascript
    buffer[1] = 100;
    console.log(buffer[1])
    //   100
    buffer[2] = -100;
    console.log(buffer[2]);
    //   156  （+256）
    buffer[3] = 300;
    console.log(buffer[3]);
    //   44   （-256）
    buffer[4] = 3.1415;
    console.log(buffer[4]);
    //   3    （取整）
    ```
* 内存分配
    * 在 C++ 层面申请内存，在JavaScript中分配内存  
    * slab 分配机制 -- 动态内存管理机制
        * 一块申请好的固定大小的内存区域
        * 3种状态
            * full: 完全分配状态
            * partial: 部分分配状态
            * empty: 没有被分配状态    
        * 分配指定大小的Buffer对象
        ```javascript
        new Buffer(size)
        ```
        * Node 以 8KB 为界限来判断 Buffer 是大对象还是小对象
        ```javascript
        Buffer.poolSize
        //    8192  (=== 8 * 1024)
        ```
        * 8KB 就是每个slab的大小，以它为单位进行内存的分配
        * 分配小的 Buffer 对象
            * 分配过程示意代码
            ```javascript
            var pool;  //  使用局部变量pool作为中间处理对象  
            function allocPool() {
                pool = new SlowBuffer(Buffer.poolSize); //  处于分配状态的 slab 单元都指向 pool
                pool.used = 0;
            }          
            //  当前 slab 处于 empty 状态
           
            new Buffer(1024);  //  构造一个小Buffer对象
            //  如果 pool未创建 或者 剩下的空间不够，就新建一个新的 slab 单元
            //  不能分配的剩余空间会造成浪费
            if (!pool || pool.length - pool.used < this.length) {
               allocPool();
            }
            
            //  剩余空间足够，使用剩余空间并更新slab 的分配状态
            this.parent = pool;   // 当前buffer对象的parent属性指向该slab
            this.offfset = pool.used;  // 并记录下从这个slab的哪个位置开始使用的
            pool.used += this.length;  // slab 自身也记录被使用了多少字节
            if(pool.used & 7) pool.used = (pool.used + 8) & ~7;
            //  当前 slab 处于 partial 状态
            ```
            * 同一个 slab 可能分配给多个 Buffer 对象使用，只有这些小Buffer对象在作用域释放并都可以回收时，slab 的8KB空间才会被回收
        * 分配大Buffer对象
            * 直接分配一个 SlowBuffer 对象作为slab单元
            ```javascript
            this.parent = new SlowBuffer(this.length);
            this.offset = 0;
            ```
        * 内存
            * 实例化的Buffer对象时JavaScript层面的，可以被v8的垃圾回收标记回收
            * 其内部的parent 属性指向的 SlowBuffer 对象是来自node中C++中的定义，其内存不在V8的堆中
* Buffer 转换
    * 字符串转 Buffer
    ```javascript
    new Buffer(str, [encoding]);  //  默认 UTF-8编码
  
    //    一个Buffer对象可以存储不同编码类型的字符串转码的值
    buf.write(string, [offset], [length], [encoding]);
    //    每种编码所用的字节长度不同，将Buffer 反转回字符串时要谨慎处理
    ```  
    * Buffer 转字符串
    ```javascript
    buf.toString([encoding], [start], [end]);
    //   设置上面三个参数实现整体或局部的转换
    ``` 
    * Buffer 不支持的编码类型
    ```javascript
    Buffer.isEncoding(encoding);
    //    传入编码类型，若支持返回true,否砸返回 false
    ``` 
    对不支持的编码类型可以采用社区方案: `iconv` `iconv-lite` 
* Buffer 的拼接
    * 参考代码：
    ```javascript
    var fs = require('fs');
    var rs = fs.createReadStream('readme.md');
    var data = '';
    re.on('data', (chunk) => {
        data += chunk;  //  隐藏了 toString 操作
        //  data = data.toString() + chunk.toString();
    });
    res.on('end', () => {
        console.log(data);
    })
    ```   
    * 存在的问题
    ```javascript
    var rs = fs.createReadStream('readme.md', {highWaterMark: 11})
    //  限制了 Buffer 的长度为11
    //  一个中文字符在UTF-8 下占3个字节。单次输出的Buffer只能显示3个字符，剩下的两个字节以乱码的形式展示，第二个Buffer的第一个字节也不能形成文字，只能显示乱码
    ```
    对任意长度的Buffer，宽字节字符串都有被截断的情况，只不过Buffer的长度越大出现的概率越低。
    * 解决办法：
    ```javascript
    re.setEncoding('utf-8');
    //  无论如何设置编码，触发data事件的次数依旧相同
    //  可读流对象内置了一个 decoder 对象。decoder进行Buffer到字符串的解码
    ```
    * decoder 对象
    ```javascript
    var StringDecoder = require('string_decoder').StringDecoder;
    var decoder = new StringDecoder('utf-8');
  
    var buf1 = new Buffer([]);
  
    var buf2 = new Buffer([]);
    ```
    `StringDecoder` 在得到编码后，知道宽字节字符串在UTF-8 下以3个字节的方式存储，第一次读取剩下的字节会保留在 `StringDecoder` 实例内部。在下一次 write 时组合起来。
    只能处理 UTF-8 Base64 UCS-2/UTF-16LE 这3种编码
    
    * 正确拼接Buffer
        * 用一个数组存储接收到的所有 Buffer 并记录总长度
        * 调用  `Buffer.concat()` 生成一个合并的Buffer对象
        ```javascript
        var chunks = [];
        var size = 0;
        res.on('data', function(chunk) {
            chunks.push(chunk);
            size += chunk.length;
        });
        res.on('end', function() {
            var buf = Buffer.concat(chunks, size);
            var str = iconv.decode(buf, 'uft8');
            console.log(str);
        })
        ```
        * Buffer.concat() 实现方式
        ```javascript
        Buffer.concat = function(list, length) {
            if (!Array.isArray(list)) {      
                throw new Error('Usage: Buffer.concat(list, [length])');
            }
            
            if (list.length === 0) {
                return new Buffer(0);
            } else if (list.length === 1) {
                return list[0];
            }
            
            if (typeof length !== 'number') {
                length = 0;
                for (let i = 0; i < list.length; i++) {
                    let buf = list[i];
                    length += buf.length;
                }
            }
      
            var buffer = new Buffer(length);
            var pos = 0;
            for (let i = 0; i < list.length; i++) {
                let buf = list[i];
                buf.copy(buffer, pos);
                pos += buf.length;
            }
            return buffer;
        }
        ```
* Buffer 与性能
    * 在网络中传输都需要转换成Buffer，以进行二进制数据传输。
    * 通过预先转换静态内容为 Buffer 对象，可以有效地减少CPU的重复使用，节省服务器资源。
    * 文件读取
        * `fs.createReadStream()` 的工作方式是在内存中准备一段 Buffer，然后fs.read()读取时逐步从磁盘中将字节复制到Buffer中。
        完成一次读取时，则从这个Buffer中通过 `slice()` 方法取出部分数据作为一个小Buffer对象，再通过`data`事件传递给调用方。
        如果Buffer用完，则重新分配一个；如果还有剩余，则继续使用。
* 参考
    * 《深入浅出 Nodejs》 第6章 理解 Buffer

## 实例
