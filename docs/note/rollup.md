# rollup

## 核心配置  

[完整参考](https://www.rollupjs.com/guide/zh#-core-functionality-)

格式(format -f/--output.format)
String 生成包的格式。 下列之一:

* amd – 异步模块定义，用于像RequireJS这样的模块加载器
* cjs – CommonJS，适用于 Node 和 Browserify/Webpack
* es – 将软件包保存为ES模块文件
* iife – 一个自动执行的功能，适合作为`<script>`标签。（如果要为应用程序创建一个捆绑包，您可能想要使用它，因为它会使文件大小变小。）
* umd – 通用模块定义，以amd，cjs 和 iife 为一体

## 问题

rollup 更适合用来构建库，构建应用程序需要的代码拆分，运行时态的动态导入还需要webpack