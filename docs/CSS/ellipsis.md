# 文本超出隐藏并显示省略号

```css
overflow: hidden;   //  超出文本隐藏
text-overflow: ellipsis;  //  溢出显示省略号
white-space: nowrap;  //  溢出不换行
```

展示多行
```css
overflow: hidden;
text-overflow: ellipsis;
display:-webkit-box; //作为弹性伸缩盒子模型显示
-webkit-box-orient:vertical; //设置伸缩盒子的子元素排列方式--从上到下垂直排列
-webkit-line-clamp:2; //显示的行
```