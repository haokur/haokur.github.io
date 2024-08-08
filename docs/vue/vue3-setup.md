---
group: Vue3
---

# Vue3 setup

### 使用 vite-plugin-inspect

```sh
npm install vite-plugin-inspect --save-dev
```

vite.config.js

```javascript
import { defineConfig } from 'vite';
import VitePluginInspect from 'vite-plugin-inspect';
export default defineConfig({
  plugins: [VitePluginInspect()],
});
```

在用 vite 启动项目时，会额外启动一个服务（\_\_inspect）

```
➜  Local:   http://localhost:5173/
➜  Inspect: http://localhost:5173/__inspect/
```

### 一、option 写法

```javascript
import { onMounted, ref } from 'vue';
export default {
  setup(props, { expose }) {
    onMounted(() => {
      console.log('xxxx', 'option-setup.vue::8行');
    });
    const value = ref('hello world');
    const showModal = () => {};
    expose({ showModal }); // 定义导出父组件通过ref获取的内容
    return {
      value,
      showModal,
    };
  },
};
```

vite 运行时编译的结果

```javascript
import { onMounted, ref } from 'vue';
const _sfc_main = {
  setup(props, { expose }) {
    onMounted(() => {
      console.log('xxxx', 'option-setup.vue::8行');
    });
    const value = ref('hello world');
    const showModal = () => {};
    expose({ showModal });
    return {
      value,
      showModal,
    };
  },
};
```

> 运行时编译结果，基本与原写法一致

### 二、script-setup 写法

```html
<script lang="ts" setup>
  import { onMounted } from 'vue';

  const PI = 3.14;
  const showModal = () => {};

  defineExpose({ showModal });

  onMounted(() => {
    console.log(111, 'script-setup.vue::7行');
  });
</script>
```

vite 运行时编译结果

```javascript
import { onMounted } from 'vue';
const PI = 3.14;
const _sfc_main = /* @__PURE__ */ _defineComponent({
  __name: 'script-setup',
  setup(__props, { expose: __expose }) {
    const showModal = () => {};
    __expose({ showModal });
    onMounted(() => {
      console.log(111, 'script-setup.vue::7\u884C');
    });
    const __returned__ = { PI, showModal };
    Object.defineProperty(__returned__, '__isScriptSetup', {
      enumerable: false,
      value: true,
    });
    return __returned__;
  },
});
```

1. 将 script 里的内容，编译成类似 option 的写法
2. 自动添加 \_\_name
3. defineExpose 宏转为 **expose,若未 defineExpose，会自动导出空 **expose()
4. 将定义的方法和值（\_\_returned\_\_）返回
