# Grid 栅格

基本要素

浮动和清除浮动

```html
<div class="row">
    <div class="col col-6"></div>
    <div class="col col-6"></div>
    <div class="col col-6"></div>
    <div class="col col-6"></div>
    <div class="col col-6"></div>
</div>
```

```css
.row {
    height: auto;
}

.row:before {  
    content: "";
    display: table;
}

.row:after {
    clear:both;
}

.col {
    float: left;
}

.col-6 {
    width: 50%;
}

```