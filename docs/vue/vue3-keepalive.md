---
group: Vue3
title: Vue3 keepAlive
order: 5
---

## 普通组件中使用

- keep-alive 只缓存组件实例，不会缓存组件外部的 DOM。
- 被包裹的组件必须是动态组件，用 `<component :is="xxx" />` 或 `<router-view />`
- 被缓存的组件必须有 name 属性，否则 include / exclude 无法识别。
- 如果你希望完全销毁组件，需移除 `<keep-alive>` 或重置 key
- 与 `<router-view>` 结合使用时，Vue Router 支持 meta.keepAlive = true 配合使用。

```vue
<template>
  <div class="KeepAliveTest">
    <button
      v-for="(item, index) in cptList"
      :key="index"
      @click="current = item.key"
    >
      页面 {{ item.key }}
    </button>
    <keep-alive :include="['PageA', 'B']" :exclude="['C']" max="3">
      <component :is="currentCpt.component" />
    </keep-alive>
  </div>
</template>
<script lang="ts" setup>
import { computed, ref } from 'vue';
import A from './A.vue';
import B from './B.vue';
import C from './C.vue';

const current = ref('A');
const cptList = [
  { key: 'A', component: A },
  { key: 'B', component: B },
  { key: 'C', component: C },
];
const currentCpt = computed(() => {
  return cptList.find((item) => item.key === current.value)!;
});
</script>
```

> 可选属性，include,exclude 分别为数组，数组元素组件的 name 值，max 参数为最大可保持激活缓存的组件数量
> 其中的 `PageA` 是因为可以在组件内自定义 `name` 值

```ts
defineOptions({
  name: 'PageA',
});
```

## 搭配路由使用

- 定义路由配置

```ts
import Detail from '@/pages/home/detail.vue';
import Home from '@/pages/home/home.vue';
import List from '@/pages/home/list.vue';
import {
  createRouter,
  createWebHashHistory,
  type RouteRecordRaw,
} from 'vue-router';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      keepAlive: false,
    },
  },
  {
    path: '/list',
    name: 'PageList',
    component: List,
    meta: {
      keepAlive: true,
    },
  },
  {
    path: '/detail',
    name: 'PageDetail',
    component: Detail,
    meta: {
      keepAlive: false,
    },
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
```

- 定义 App.vue 中 router-view 配置

```vue
<template>
  <div class="App">
    <div>
      <button @click="jumpTo('/')">跳转Home页面</button>
      <button @click="jumpTo('/list')">跳转List页面</button>
      <button @click="jumpTo('/detail')">跳转Detail页面</button>
    </div>

    <router-view v-slot="{ Component, route }">
      <keep-alive max="3">
        <component v-if="route.meta.keepAlive" :is="Component" />
      </keep-alive>
      <component v-if="!route.meta.keepAlive" :is="Component" />
    </router-view>
  </div>
</template>
<script lang="ts" setup>
import { useRouter } from 'vue-router';

const router = useRouter();
const jumpTo = (pagePath: string) => {
  router.push({
    path: pagePath,
  });
};
</script>
```
