# v-model 指令

## 示例：
```vue
<!--MyInput.vue-->
<template>
    <div>
        <input type="text" :value="text" @input="handleInput"/>
    </div>
</template>

<script>
    export default {
        name: 'myinput',
        props: {
            value: {
                type: String,
                default: '',
            }
        },
        watch: {
            value(val) {
                console.log(2);
                this.text = val;
            },
            text(val) {
                console.log(1);
                this.$emit('input', val);
            }
        },
        data() {
            return {
                text: this.value,
            }
        },
        methods: {
            handleInput(e) {
                this.text = e.target.value;
                // this.$emit('input', e.target.value);
            }
        }
    }
</script>

```
```vue
<!--使用示例-->
<template>
    <div>
        <MyInput v-model="value"></MyInput>
    </div>
</template>

<script >
    import MyInput from './MyInput.vue';
    export default {
        name: 'demo',
        data() {
            return {
                value: ''
            }
        },
        components: {
            MyInput
        }
    }
</script>
```

v-model 会默认使用 `value` 和 `input`