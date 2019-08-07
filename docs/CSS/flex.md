# flex 布局
## 语法
[Flex布局教程 阮一峰](http://www.ruanyifeng.com/blog/2015/07/flex-grammar.html)

* 弹性布局

`display: flex`

`display: inline-flex`

设为 Flex 布局后，子元素的 float, clear, vertical-align 属性将失效

* 采用 Flex 布局的元素，称为“容器”
* 它的所有子元素自动成为容器成员，称为“项目”

* 水平的主轴
* 垂直的交叉轴

* main start  主轴开始位子(与边框交叉点)
* main end   结束位置
* cross start  交叉轴开始位置
* cross end   结束位置

* main size  单个项目占据的主轴空间
* cross size  占据的交叉轴空间
### 容器的属性
* flex-direction  主轴的方向
    * row   主轴为水平方向，起点在左端
    * row-reverse  主轴为水平方向，起点在右端  
    * column  主轴为垂直方向，起点在上沿
    * column-reverse  主轴为垂直方向，起点在下沿
* flex-wrap    一条轴线排不下时，如何换行
    * nowrap    不换行
    * wrap     换行，第一行在上方
    * wrap-reverse   换行，在下方
* flex-flow   上面两个属性的简写形式
* justify-content   项目在主轴上的对齐方式
    * flex-start  左对齐
    * flex-end  右对齐
    * center  居中
    * space-between  两端对齐，项目之间的间隔相等
    * space-around  每个项目两侧的间隔相等，所以，项目之间的间隔比项目与边框的间隔大一倍
* align-items    项目在交叉轴上对齐方式
    * flex-start   交叉轴的起点对齐
    * flex-end  交叉轴的终点对齐
    * center   交叉轴的中点对齐
    * baseline  项目的第一行文字的基线对齐
    * stretch   若未设置高度或设为 auto, 将占满整个容器的高度
* align-content  多根轴线的对齐方式
    * flex-start 
    * flex-end
    * center
    * space-between
    * space-around
    * stretch
### 项目的属性
* order   定义项目的排列顺序。数值越小，排列越靠前，默认为 0
* flex-grow  定义项目放大比例  默认为0，即如果存在剩余空间，也不放大
* flex-shrink   定义项目的缩小比例，默认为 1，即如果空间不足，该项目将缩小
* flex-basis    分配多余空间之前，项目占据的主轴空间
* flex    前三个属性的简写  0 1 auto
* align-self  允许单个项目有与其他项目不一样的对齐方式，可覆盖 align-items 属性