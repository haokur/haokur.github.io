---
group: Vue3
title: Vue3 生命周期
order: 4
---

### onBeforeMount

组件挂载之前，DOM 尚未插入文档。

### onMounted

组件挂载到 DOM 后调用。

### onBeforeUpdate

数据更新后，DOM 更新前触发。

### onUpdated

数据变化导致组件更新后触发

### onErrorCaptured

Vue 执行的错误捕获

```ts
const dataValue = ref(0);

const makeMistake = () => {
  // @ts-ignore
  dataValue.value.name = 'xxx';
};
onErrorCaptured((err, instance, info) => {
  const { message, name, stack } = err;
  return false; // 阻止错误进一步传播
});
```

err 错误的结构大致如下：

```ts
{
    info:"native event handler",
    instance:Proxy,
    message:"Cannot create property 'name' on number '0'",
    stack:`
TypeError: Cannot create property 'name' on number '0'
at makeMistake (http://localhost:5173/vue3-example/src/components/LifeCycle.vue?t=1745137215633:49:28)
at callWithErrorHandling (http://localhost:5173/vue3-example/node_modules/.vite/deps/chunk-TEXZTZV4.js?v=2f7fd06c:2263:19)
at callWithAsyncErrorHandling (http://localhost:5173/vue3-example/node_modules/.vite/deps/chunk-TEXZTZV4.js?v=2f7fd06c:2270:17)
at HTMLButtonElement.invoker (http://localhost:5173/vue3-example/node_modules/.vite/deps/chunk-TEXZTZV4.js?v=2f7fd06c:11202:5)
`
}
```

### onActivated

当 keep-alive 组件被激活时调用。

### onDeactivated

当 keep-alive 组件被停用时调用。

### onBeforeUnmount

组件销毁前调用，适用于清理操作。

### onUnmounted

组件销毁后调用，适用于清理操作。
