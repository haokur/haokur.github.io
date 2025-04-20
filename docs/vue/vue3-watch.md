---
group: Vue3
title: Vue3 监听
order: 6
---

## watch

> 适用场景： 异步请求、复杂对比逻辑、表单监听，需要拿到旧值，控制监听源，懒触发（immediate 为 false）等

### 基本使用

```ts
watch(source, callback, options?)
```

- source: 可以是 ref、reactive 中的属性、getter 函数，或是数组（多源监听）
- callback: 数据变化时触发的回调 (newVal, oldVal) => {}
- options：
  - immediate: 是否立即执行一次
  - deep: 深度监听（用于对象）

❌ 不能使用 ref 的 value 值

- 直接对普通值进行 watch

```ts
const count = ref(0);
watch(count.value, (newVal, oldVal) => {
  console.log(newVal, oldVal, 'WatchTest.vue::14行');
});
```

- 不会报错，但没什么用，多个 ref 原值 getter

```ts
const price = ref(0);
const count = ref(0);
watch([() => count, () => price], (newVal, oldVal) => {
  console.log(newVal, oldVal, 'WatchTest.vue::36行');
});
```

✅ 可以使用的

- ref 的值

```ts
const count = ref(0);
watch(count, (newVal, oldVal) => {
  console.log(newVal, oldVal, 'WatchTest.vue::14行');
});
```

- ref 的 getter

```ts
const count = ref(0);
watch(
  () => count.value,
  (newVal, oldValue) => {
    console.log(newVal, oldValue, 'WatchTest.vue::18行');
  },
);
```

- 多个 ref

```ts
const price = ref(0);
const count = ref(0);
watch([count, price], (newVal, oldVal) => {
  console.log(newVal, oldVal, 'WatchTest.vue::29行');
});
```

> 这里 newVal，oldVal 也为对应 [count,price] 的顺序的值的数组

- 多个 ref 的 getter

```ts
const price = ref(0);
const count = ref(0);
watch([() => count.value, () => price.value], (newVal, oldVal) => {
  console.log(newVal, oldVal, 'WatchTest.vue::32行');
});
```

- 假如值是非基本类型，对值进行 watch

```ts
const useInfo = ref({ name: 'jack' });
watch(useInfo.value, (newVal, oldVal) => {
  // 但这里newVal和oldVal的值都是更改后的值
  console.log(
    JSON.stringify(newVal),
    JSON.stringify(oldVal),
    'WatchTest.vue::41行',
  );
});
setTimeout(() => {
  useInfo.value.name = 'bob';
}, 1000);
```

- reactive 的整体监听

```ts
const user = reactive({ name: 'jack' });
watch(user, (newVal, oldVal) => {
  console.log(newVal, oldVal, 'WatchTest.vue::49行');
});
setTimeout(() => {
  user.name = 'john';
}, 1000);
```

WARN：newVal 和 oldVal 都会是更改后的值

- reactive 的单个值监听，只能使用 getter

```ts
const user = reactive({ name: 'jack' });
watch(
  () => user.name,
  (newVal, oldVal) => {
    console.log(newVal, oldVal, 'WatchTest.vue::56行');
  },
);
```

- reactive 的多个 getter 监听

```ts
const useInfo = ref({ name: 'jack' });
const user = reactive({ name: 'jack' });
const user2 = reactive({ name: 'jack' });
watch(
  [() => user.name, () => user2.name, () => useInfo.value.name],
  (newVal, oldVal) => {
    console.log(newVal, oldVal, 'WatchTest.vue::62行');
  },
);
```

### 可用属性

- immediate，立即执行一次，默认为 false

```ts
const count = ref(10);
watch(
  count,
  (newVal, oldVal) => {
    // newVal = 10, oldVal = undefined
    console.log('立即执行一次:', newVal, oldVal);
  },
  { immediate: true },
);
```

- deep,深层次监听

```ts
const user3 = ref({ name: 'bob' });
setTimeout(() => {
  user3.value.name = 'john';
}, 1000);

// 浅层监听
watch(
  user3,
  (newVal, oldVal) => {
    // 更改user3.value.name不会触发
    console.log(newVal, oldVal, 'WatchTest.vue::81行');
  },
  { deep: false },
);

// 深层监听
watch(
  user3,
  (newVal, oldVal) => {
    // 更改user3.value.name会触发
    console.log(newVal, oldVal, 'WatchTest.vue::90行');
  },
  { deep: true },
);
```

- watch 执行的返回值，可用来取消监听

会在 newVal 大于 5 时，停止监听

```ts
const count = ref(0);
const changeCount = () => {
  count.value++;
};
const stop = watch(count, (newVal, _oldVal) => {
  if (newVal > 5) {
    stop();
  } else {
    console.log('stop not happen newVal is ', newVal, 'WatchTest.vue::99行');
  }
});
```

## watchEffect

> 自动收集依赖，立即执行
> 适用场景：自动响应副作用、快速状态同步、样式，不关心 oldValue 等

- 常规用法，带停止监听

```ts
const stopWatch = watchEffect(() => {
  console.log(count.value, 'WatchTest.vue::105行');
  if (count.value > 10) {
    stopWatch();
  }
}, {});
```

- 执行前带清理

```ts
watchEffect((cleanUp) => {
  console.log(count.value, 'WatchTest.vue::111行');
  const timer = setTimeout(() => {
    console.log('执行到定时器', 'WatchTest.vue::113行');
  }, 1000);
  cleanUp(() => {
    console.log('执行清理', 'WatchTest.vue::114行');
    clearTimeout(timer);
  });
}, {});
```

- 第二个参数

> flush：pre(默认)：DOM 更新前执行，post：DOM 渲染后执行，sync：同步执行，立即响应依赖变化，不等待微任务或 DOM 更新（⚠️ 危险可能死循环）

```ts
const stopWatch2 = watchEffect(
  () => {
    console.log(count.value, 'WatchTest.vue::105行');
    if (count.value > 10) {
      stopWatch2();
    }
  },
  {
    flush: 'post', // 副作用执行的时机 默认为pre
    onTrack(e) {
      console.log('追踪依赖:', e);
    },
    onTrigger(e) {
      console.log('依赖变更触发:', e);
    },
  },
);
```
