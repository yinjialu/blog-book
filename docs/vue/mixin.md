# mixin 混入

## 基础用法
```vue
<script >
    const mixin = {
        beforeCreate: function () {
            // console.log(this);
            console.log('混入对象的钩子被调用');
        },
        methods: {
            checkMixin: function () {
                console.log('checkMixin');
            },
        },
        mounted() {
            console.log('mixin混入的mounted');
        },
    }
    export default {
        name: 'mixin-demo',
        mixins: [],
        mounted() {
            this.checkMixin();
        },
    }
</script>
```

## 合并策略

可以通过`Vue.config.optionMergeStrategies` 查看各项的配置策略

* 生命周期钩子 合并为一个数组，混入对象的钩子先调用
如：Vue.config.optionMergeStrategies.mounted
```
mergeHook (
  parentVal,
  childVal
) {
  return childVal
    ? parentVal
      ? parentVal.concat(childVal)
      : Array.isArray(childVal)
        ? childVal
        : [childVal]
    : parentVal
}
```

* 数据对象 data 递归合并，发生冲突时组件数据优先
* methods, components, directives 会合并为同一个对象，键名冲突时取组件对象的键值对

## 更多用法

混入 beforeCreate 取消原组件的 mounted
```js
const mixin = {
    beforeCreate: function () {
        console.log('混入对象的钩子被调用');
        this.$options.mounted = () => {};   //  重置了组件的 mounted 钩子
    },
    methods: {
        checkMixin: function () {
            console.log('checkMixin');
        },
    },
    mounted() {
        console.log('mixin混入的mounted');   //  这里就不会生效了，组件原有的 mounted 也不会生效
    },
};
```