# 输入相关

## type
    * type="tel"  电话输入表单，只能输入数字

## 避免键盘遮挡，可选方案
    * 表单获得焦点时键盘唤出，失去焦点的时候键盘隐藏
      * 监听 `focus` 和 `blur` 事件
        ```javascript
        const $input = document.getElementsByTagName('input');
        $input.forEach((i) => {
            i.addEventListener('focus', () => {
                document.body.style.paddingBottom = '50vh';
            });
            i.addEventListener('blur', () => {
                document.body.style.paddingBottom = '0';
            })
        })
        ```
    * scrollIntoView
      * 监听 `resize` ,获取到当前的焦点元素 **ios不会触发resize事件**
      * scrollIntoView 让焦点元素滚动到可视区域
        ```javascript
        window.addEventListener('resize', () => {
            let tagName = document.activeElement.tagName;
            tagName = tagName.toLowerCase();

            if (tagName === 'input' || tagName === 'textarea') {
                setTimeout(() => {
                    document.activeElement.scrollIntoView({ block: 'center' })
                }, 0)
            }
        })
        ```

## 进一步
    * ios android 以及 webview 的差异
    * h5 键盘弹出 表单自适应的兼容性方案总结
    * 可视区域刚好被键盘顶起。

## 参考
1. [activeElement](https://developer.mozilla.org/en-US/docs/Web/API/DocumentOrShadowRoot/activeElement)
2. [scrollIntoView](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/scrollIntoView)