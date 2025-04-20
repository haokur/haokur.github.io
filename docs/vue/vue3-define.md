---
group: Vue3
title: Vue3 define
order: 8
---

## defineComponent

> 定义一个常规组件
> 使用场景：需要使用 jsx 在 js 中定义组件，普通组件、业务组件、组合式组件等

```vue
import { defineComponent, ref } from 'vue';

export const NormalComponent = defineComponent({
  name: 'NormalComponent',
  setup() {
    const count = ref(0);
    const handleClick = () => {
      count.value++;
    };
    return () => {
      <div>
        <div>{count}</div>
        <button onClick={handleClick}>点击count+1</button>
      </div>;
    };
  },
});
```

vite 默认不支持 jsx 的语法，需要安装依赖且配置环境

- 安装依赖：`npm install @vitejs/plugin-vue-jsx -D`
- 配置 vite.config.ts

```ts
import { defineConfig } from 'vite';
import vueJsx from '@vitejs/plugin-vue-jsx';

export default defineConfig({
  base: '/vue3-example',
  plugins: [vueJsx()],
});
```

## defineAsyncComponent

> 定义一个异步加载的组件
> 使用场景：页面组件、懒加载组件、弹窗、重组件等

- 懒加载路由页面

```ts
// router.ts
const DetailPage = defineAsyncComponent(
  () => import('@/pages/home/detail.vue'),
);

const routes = [
  {
    path: '/detail',
    component: DetailPage,
  },
];
```

- 加载状态 & 错误处理

```vue
import LoadingComp from './LoadingComp.vue'; import ErrorComp from
'./ErrorComp.vue'; export const AsyncComp = defineAsyncComponent({ loader: () =>
import('./HeavyComp.vue'), loadingComponent: LoadingComp, errorComponent:
ErrorComp, delay: 100, // 延迟 100ms 后显示加载组件 timeout: 10000, // 超过 10
秒未加载成功视为失败 });
```

## defineExpose

> 显式暴露 API 给父组件使用

- 子组件

```ts
import { ref } from 'vue';

const count = ref(0);
const increase = () => {
  count.value++;
};

defineExpose({
  increase,
});
```

- 父组件

```vue
<template>
  <DefineExpose ref="DefineExposeRef"></DefineExpose>
</template>
<script setup lang="ts">
import { shallowRef } from 'vue';

const DefineExposeRef = shallowRef();
const runExposeIncrease = () => {
  DefineExposeRef.value?.increase();
};
</script>
```

## defineEmits

- 子组件

```vue
<template>
  <button @click="sendUpdateInfo">通知父组件消息</button>
</template>
<script lang="ts" setup>
import { ref } from 'vue';

const count = ref(10);
const events = defineEmits(['update']);

const sendUpdateInfo = () => {
  events('update', count.value);
};
</script>
```

- 父组件

```vue
<template>
  <DefineEmitsComp @update="handleChildUpdate"></DefineEmitsComp>
</template>
<script lang="ts" setup>
const handleChildUpdate = (ev: number) => {
  console.log(ev);
};
</script>
```

## defineProps

> 用于定义组件的 props，并支持类型推导。
> defineProps 本质是编译时宏，它的类型参数 `<T>` 和你写进去的参数是分开的

- 最简单的

```ts
defineProps<{
  msg: string;
  count: number;
}>();
```

父组件中使用

```vue
<template>
  <DefinePropsComp :msg="'hello vue3'"></DefinePropsComp>
</template>
```

- 带默认值

```ts
defineProps({
  msg: {
    type: String,
    default: 'hello',
  },
});
```

- 使用 defineProps 和 withDefaults

```ts
const props = defineProps<{
  msg?: string;
}>();
withDefaults(props, {
  msg: 'hello from vue 3',
});
```

简化版本，即合并写

```ts
const props = withDefaults(
  defineProps<{
    msg?: string;
  }>(),
  {
    msg: 'hello',
  },
);
```

- ❌ 错误的写法

```ts
defineProps<{
  msg: string;
}>({
  msg: 'hello', // ❌
});
```

要结合类型和默认值，只能使用 defineProps+withDefaults

## defineSlots

- 子组件

```vue
<template>
  <div class="MyList">
    <ul>
      <li v-for="(item, index) in items" :key="index">
        <slot name="item" :item="item"></slot>
      </li>
    </ul>
  </div>
</template>
<script lang="ts" setup>
interface Item {
  id: number;
  name: string;
}

defineProps<{ items: Item[] }>();

const slots = defineSlots<{
  item?: (props: { item: Item }) => any;
}>();
</script>
```

- 父组件

```vue
<template>
  <MyList :items="data">
    <template #item="{ item }">
      <span>{{ item.name }}</span>
    </template>
  </MyList>
</template>
<script setup lang="ts">
const data = [
  {
    id: 1,
    name: 'xx',
  },
];
</script>
```

## defineModel

> 父组件传入一个值给子组件，子组件能直接操作这个值

- 最简单的

子组件

```vue
<template>
  <div class="DefineModelComp">
    <div>{{ model }}</div>
    <div>
      <button @click="changeModelValueInChild">changeModelValueInChild</button>
    </div>
  </div>
</template>
<script lang="ts" setup>
const model = defineModel<number>();

const changeModelValueInChild = () => {
  if (model.value) {
    model.value++;
  }
};
</script>
```

父组件

```vue
<template>
  <DefineModelComp v-model="counter"> </DefineModelComp>
</template>
```

> 这个 model 就等价于以前的 props.modelValue + emit('update:modelValue')

- 具名 v-model

父组件

```vue
<template>
  <CustomInput v-model:title="title" v-model:desc="desc" />
</template>
<script lang="ts" setup>
const title = ref('');
const desc = ref('');
</script>
```

子组件

```ts
const title = defineModel<string>('title');
const desc = defineModel<string>('desc');
```

## defineOptions

> 用于在 `<script setup>` 中设置原本只能通过 `export default {}` 声明的组件选项

```ts
defineOptions({
  name: 'DefineOptionsComp',
  inheritAttrs: false,
});
```

## defineCustomElement

> 把 Vue 写的组件注册成 <my-element> 这种标签，在任意 HTML 页面中使用，甚至不依赖 Vue 本身！

使用场景：

- 想要将 Vue 组件嵌入非 Vue 项目（比如 jQuery、原生页面、React 项目中）
- 想打包成独立组件库供外部引用（微前端场景）
- 用 Vue 开发并导出 Web Component 供别的项目嵌入

```vue
<!-- MyCounter.vue -->
<template>
  <button @click="count++">点击次数：{{ count }}</button>
</template>

<script setup lang="ts">
import { ref } from 'vue';
const count = ref(0);
</script>
```

用 defineCustomElement 转化

```ts
// main.ts
import { defineCustomElement } from 'vue';
import MyCounter from './MyCounter.ce.vue'; // 注意是 `.ce.vue`，推荐这样命名

const MyElement = defineCustomElement(MyCounter);

// 注册成浏览器自定义标签
customElements.define('my-counter', MyElement)``;
```

在 html 中使用

```html
<my-counter></my-counter>
```

使用 vite 构建打包出该组件

```ts
// vite.config.ts
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  plugins: [vue()],
  build: {
    lib: {
      entry: 'src/MyCounter.ce.vue',
      formats: ['es'],
    },
    rollupOptions: {
      external: ['vue'],
    },
  },
});
```
