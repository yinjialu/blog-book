# 在组件外添加一个插槽
```vue
<portal to="destination">
  <p>This slot content will be rendered wherever the <portal-target> with name 'destination'
    is  located.</p>
</portal>

<portal-target name="destination">
  <!--
  This component can be located anywhere in your App.
  The slot content of the above portal component will be rendered here.
  -->
</portal-target>
```

参考：[protal-vue](https://github.com/LinusBorg/portal-vue)