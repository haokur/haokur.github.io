---
group: Vue3
title: Vue3 通信
order: 7
---

## provide/inject

> provide： 在上层组件中提供数据
> inject：在下层组件中注入数据

- 父组件中提供数据

```ts
import { provide, reactive, ref } from 'vue';

const appConfig = { mode: 'production' };
provide('appConfig', appConfig);
provide('appConfigRef', ref(appConfig));
provide('appConfigReactive', reactive(appConfig));
```

- 子组件中使用

```ts
import { inject } from 'vue';

const appConfig = inject('appConfig');
const appConfigRef = inject('appConfigRef');
const appConfigReactive = inject('appConfigReactive');

const unProvideValue = inject('no_exist_key');
console.log(unProvideValue); // undefined

// 默认值写法
const user = inject('user', ref({ name: 'default' }));
```
