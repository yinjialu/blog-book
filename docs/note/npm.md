# 区分 dependencies 和 devDependencies

## npm 解释
* `dependencies`: These packages are required by your application in production
* `devDependencies`: These packages are only needed for development and testing

## 安装方式
* `npm install <package_name>` 将添加依赖到 `dependencies`
* `npm install <package_name> --save` 将添加依赖到 `dependencies`
* `npm install <package_name> --save-dev` 将添加依赖到 `devDependencies`

## 判断安装方式
* 只在开发环境下需要的依赖 放在 `devDependencies` 下面

## 只安装 `dependencies` 下的依赖
`npm install --production`

## 注意
* 工程 `A` 作为一个 `npm` 包发布
    1. `A` 中有 `dependencies：lodash` 和 `devDependencies：moment`
    2. `npm install`
    3. 如果项目其他地方没有引入依赖 `lodash` `A` 的 `node_modules` 下面会有 `lodash`
    4. `moment` 不会出现在 `A` 的 `node_modules` 中

* 一个要打包成静态资源的前端工程
    * 所有依赖会在打包时引入到静态文件中
    * 所有前端依赖都可以放在 `devDependencies` 中
    * 解释：
        * webpack 打包会从 `dependencies` 和 `devDependencies` 中去寻找依赖。
    
## 参考
* [npm: Specifying Dependencies](https://www.npmjs.com.cn/getting-started/using-a-package.json/#specifying-dependencies)
* [菜鸟问题：axios到底是装在devDependencies中还是装在dependencies中](https://segmentfault.com/q/1010000015688464)
* [开发组件库时 Vue 应该放哪儿：devDependencies or peerDependencies？](https://jingsam.github.io/2016/11/01/peerDependencies-in-Vue-components.html)