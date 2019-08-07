# em

em 作为 font-size 的单位时，其代表父元素的字体大小，em 作为其他属性单位时，代表自身字体大小

## rem
* 作用于根元素，相对于原始大小（16px）
* 作用于非根元素，相对于根元素字体大小

让 html 字体大小一直等于屏幕宽度的百分之一

```
document.documentElement.style.fontSize = document.documentElement.clientWidth / 100 + 'px';
```

## vw
视口宽度的 1/100

## vh
视口高度的 1/100