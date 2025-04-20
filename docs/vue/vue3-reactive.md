---
group: Vue3
title: Vue3 响应式
order: 3
---

## 基本 API

### ref

```ts
import { ref } from 'vue';

interface IPerson {
  name: String;
  age: Number;
  scores?: any;
}

/**ref */
const refValue = ref<String>('hello world');
// ref类型判定
const isValueRef = isRef(refValue);

// shallowRef 浅层代理ref
const shallowRefValue = shallowRef<IPerson>({
  name: 'bob',
  age: 22,
});
// shallow 判定 + ref 判断 = shallowRef判定（官方未提供 isShallowRef 方法）
const isValueShallowRef = isShallow(shallowRefValue) && isRef(shallowRefValue);
const changeShallowRefValue = () => {
  shallowRefValue.value = { name: 'john', age: 25 }; // 修改响应式更新
  setTimeout(() => {
    shallowRefValue.value.age = 30; // 修改无响应式更新
  }, 100);
};

// 兼容获取ref的数据（自动解包拿出.value的内容）
const valueOfRef = unref(ref('hello world')); // hello world
const valueOfNormal = unref(100); // 100
// const valueOfObjectHasValue = unref({value:"xxx"}); // 报错
const valueOfReactive = unref(reactive({ name: 'xxx' })); // Proxy...
console.log(
  'valueOfRef is ',
  valueOfRef,
  ', valueOfNormal is ',
  valueOfNormal,
  ',valueOfReactive is ',
  valueOfReactive,
);
```

### reactive

```ts
interface IPerson {
  name: String;
  age: Number;
  scores?: any;
}

/**reactive */
const reactiveValue = reactive<IPerson>({
  name: 'jack',
  age: 20,
});
// reactive 类型判定
const isValueReactive = isReactive(reactiveValue); // true
const isValueProxy = isProxy(reactiveValue); // true

// shallowReactive 浅层代理object
const shallowReactiveValue = shallowReactive<IPerson>({
  name: 'bob',
  age: 23,
  scores: {
    math: 100,
  },
});
const changeShallowReactiveValue = () => {
  shallowReactiveValue.name = 'good boy'; // 响应式更新
  setTimeout(() => {
    shallowReactiveValue.scores.math = 60; // 不响应式更新
  }, 100);
};

// 转ref
const { name, scores } = toRefs(reactiveValue);
const age = toRef(reactiveValue, 'age');
```

### readonly

```ts
// 源数据
const obj = { name: 'xx', scores: { math: 100 } };
const refObj = ref({ name: 'xx', scores: { math: 100 } });
const reactiveObj = reactive({ name: 'xx', scores: { math: 100 } });

// readonly => 包装返回的数据全部锁定不能修改
const readonly4Obj = readonly(obj);
const readonly4Ref = readonly(refObj);
const readonly4Reactive = readonly(reactiveObj);

// 判定
const isValueReadonly = isReadonly(readonly4Obj);

console.log(
  { isValueReadonly, readonly4Obj, readonly4Ref, readonly4Reactive },
  'ReactiveDoc.vue::121行',
);

// 支持的操作，源数据并未被锁定为只读
obj.scores.math = 88;
refObj.value.scores.math = 88;
reactiveObj.scores.math = 88;

// 不支持的操作
readonly4Obj.name = 'jack'; // ❌
readonly4Ref.value.name = 'jack'; // ❌
readonly4Reactive.name = 'jack'; // ❌
readonly4Obj.scores.math = 88; // ❌
readonly4Ref.value.scores.math = 88; // ❌
readonly4Reactive.scores.math = 88; // ❌

// shallowReadonly => 包装返回的数据只有第一层被锁定不能修改
const shallowReadonly4Obj = shallowReadonly(obj);
const shallowReadonly4Ref = shallowReadonly(refObj);
const shallowReadonly4Reactive = shallowReadonly(reactiveObj);

// 判定
const isValueShallowReadonly =
  isShallow(shallowReadonly4Obj) && isReadonly(shallowReadonly4Obj);
console.log({ isValueShallowReadonly }, 'ReactiveDoc.vue::150行');

// shallowReadonly 支持的修改
shallowReadonly4Obj.scores.math = 88;
shallowReadonly4Ref.value.scores.math = 88;
shallowReadonly4Reactive.scores.math = 88;

// shallowReadonly 不支持的修改
shallowReadonly4Obj.name = 'jack'; // ❌
shallowReadonly4Ref.value = { name: 'jack', scores: { math: 88 } }; // ❌
shallowReadonly4Reactive.name = 'jack'; // ❌
```

### raw

```ts
// toRaw => 获取Proxy代理的原值（不适用自定义的new Proxy的值）
const refData = ref({ name: 'xxx' });
const reactiveData = reactive({ name: 'xxx' });
const refRawData = toRaw(refData.value);
const reactiveRawData = toRaw(reactiveData);
console.log({ refRawData, reactiveRawData }, 'ReactiveDoc.vue::168行');

// markRaw => 添加标记__v_skip，在执行ref或reactive或跳过代理，即不会用Proxy来代理 rawObj
const rawObj = markRaw({ name: 'xxx' });
const refObjOfMark = ref(rawObj);
const reactiveObjOfMark = reactive(rawObj);
const changeReactiveObjOfMark = () => {
  reactiveObjOfMark.name = 'jack'; // 页面不响应更改
};
```

### isVNode

判读是否是虚拟 DOM

```ts
const vNode = h('div', []);
isVNode(vNode); // true
```

### customRef

自定义依赖收集和派发更新

```ts
// 示例实现input的v-model防抖更新
function useDebouncedRef(value: any, delay = 300) {
  let timeout: ReturnType<typeof setTimeout>;
  return customRef((track, trigger) => {
    return {
      get() {
        track();
        return value;
      },
      set(newValue) {
        clearTimeout(timeout);
        timeout = setTimeout(() => {
          value = newValue;
          trigger();
        }, delay);
      },
    };
  });
}
const keyword = useDebouncedRef('', 500);
watch(keyword, (oldValue, newValue) => {
  console.log(oldValue, newValue, 'CustomRef.vue::49行');
});
```

### computed

派生状态，计算可缓存可响应数据

- 基本使用

```ts
const count = ref(10);
const total = computed(() => count.value * 10);

// total.value = 200 ; // ❌
```

- 可写的 computed

```ts
const firstName = ref('jack');
const lastName = ref('Ma');

const fullName = computed({
  get: () => `${firstName.value} ${lastName.value}`,
  set: (val: string) => {
    const [first, last] = val.split(' ');
    firstName.value = first;
    lastName.value = last;
  },
});
fullName.value = 'Tony Stark'; // ✅
```

## 数据结构

- ref 返回值

```ts
RefImpl {
    Dep:{},
    __v_isRef:true,
    __v_isShallow:false,
    _rawValue: <传入的参数值>,
    _value:<value执行get后返回的值>,
    value: <定义了get函数，传入的参数是基本类型则get返回值是基本类型，是对象则返回的是reactive的结果Proxy>
}
```

> 传入基本类型走的 Object.defineProperty，传入对象使用的 reactive 的 Proxy 逻辑？

- shallowRef

```ts
RefImpl {
    Dep:{},
    __v_isRef:true,
    __v_isShallow:true, // here
    _rawValue: <传入的参数值>,
    _value:<value执行get后返回的值>,
    value: <定义了get函数，传入的参数是对象也不用Proxy包装>
}
```

- reactive 返回值

```ts
Proxy {
    [[Handler]]:MutableReactiveHandler {
        _isReadonly:false,
        _isShallow:false,
    },
    [[Target]]:Object, // 取值
    [[IsRevoked]]:false,
}
```

- shallowReactive

```ts
Proxy {
    [[Handler]]:MutableReactiveHandler {
        _isReadonly:false,
        _isShallow:true,
    },
    [[Target]]:Object, // 取值
    [[IsRevoked]]:false,
}
```

- readonly

```ts
readonly(ref(0));

Proxy(RefImpl) {
    [[Handler]]:ReadonlyReactiveHandler {
        _isReadonly:true,
        _isShallow:false,
    },
    [[Target]]:RefImpl{
        __v_isRef:true,
        __v_isShallow:false,
        _rawValue:0,
        _value:0,
        value:(...)getter=>0
    },
    [[IsRevoked]]:false,
}

readonly(reactive({math:{scores:100}}));
Proxy(Object){
    [[Handler]]:ReadonlyReactiveHandler{
        _isReadonly:true,
        _isShallow:false,
    },
    [[Target]]:Proxy(Object){
        [[Handler]]:ReadonlyReactiveHandler{
            _isReadonly:false,
            _isShallow:false,
        },
        [[Target]]:Object, // 不是Proxy不响应了
        [[IsRevoked]]:false,
    },
    [[IsRevoked]]:false,
}
```

- shallowReadonly

```ts
const obj = { scores: { math: 99 } };
const f = shallowReadonly(obj);

Proxy(RefImpl) {
    [[Handler]]:ReadonlyReactiveHandler {
        _isReadonly:true,
        _isShallow:true,
    },
    [[Target]]:Object{
        scores:{
            math:99
        }
    },
    [[IsRevoked]]:false,
}
```

- computed

```ts
const count = ref(10);
const total = computed(() => count.value * 10);
ComputedRefImpl {
    dep:Dep{},
    deps:Link{},
    depsTail:Link{},
    effect:ComputedRefImpl,
    flags:4,
    fn:Function,
    globalVersion:7,
    isSSR:false,
    next:undefined,
    setter:undefined,
    __v_isReadonly:true,
    __v_isRef:true,
    _value:100,
    value:getter，
}

const fullName = computed({
  get: () => `${firstName.value} ${lastName.value}`,
  set: (val: string) => {
    const [first, last] = val.split(" ");
    firstName.value = first;
    lastName.value = last;
  },
});
ComputedRefImpl {
    dep:Dep{},
    deps:Link{},
    depsTail:Link{},
    effect:ComputedRefImpl,
    flags:16,
    fn:Function,
    globalVersion:6,
    isSSR:false,
    next:undefined,
    setter:undefined,
    __v_isReadonly:false, // here
    __v_isRef:true,
    _value:100,
    value:getter，
}
```

- shallowRef，仅代理.value 层，只有修改.value 的值是响应式，修改.value.[props]= xx 页面不响应
- shallowReactive，仅代理第一层，深层次不做响应式更新
- readonly，禁止修改任意层，当参数非响应式数据，则内部所有数据不可改，不可改即无需响应更新
- shallowReadonly，禁止修改第一层，当参数非响应式数据，深层次可写但不响应

## 使用场景

### shallowRef

- 持有 DOM 元素或组件实例

```vue
<template>
  <div ref="elRef">111</div>
  <div ref="elShallowRef">222</div>
</template>
<script lang="ts" setup>
import { ref, shallowRef } from 'vue';

const elRef = ref<HTMLElement | null>(null);
const elShallowRef = shallowRef<HTMLElement | null>(null);

// ref 和 shallowRef 效果基本一致，shallowRef 更语义化一些
</script>
```

- 避免深层嵌套结构引起的性能开销

```ts
const bigObject = {
  hugeList: [...Array(1000).keys()],
};
const configRef = shallowRef(bigObject);

// 只追踪 configRef.value 的改变，不追踪 hugeList 的变化
```

- 与第三方库对象（不可 Proxy 化）结合

```ts
import * as echarts from 'echarts';
const chartInstance = shallowRef<echarts.EChartsType | null>(null);

onMounted(() => {
  chartInstance.value = echarts.init(document.getElementById('main'));
});
```

- 完全手动控制“触发响应”

```ts
import { shallowRef, triggerRef } from 'vue';

const state = shallowRef({ count: 0 });

function updateInner() {
  state.value.count++; // 修改内部属性
  triggerRef(state); // 手动触发视图更新
}
```

> 只关心对象引用是否改变，不需要追踪对象内部属性变化

### shallowReactive

- 大数据结构不深层响应

```ts
import { shallowReactive } from 'vue';

const state = shallowReactive({
  a: 1,
  nested: { hugeList: [...Array(1000).keys()] },
});

state.a = 100; // ✅ 会触发响应
state.nested.hugeList = [...Array(5000).keys()]; // ❌ 不会触发响应（nested 不是响应式的）
```

- 第三方库对象封装，比如 ECharts、MapBox 的 config，不需要递归监听

```ts
import { shallowReactive } from 'vue';

const chartOptions = shallowReactive({
  tooltip: { trigger: 'axis' },
  xAxis: { type: 'category' },
  series: [{ data: [1, 2, 3] }],
});

// 替换整体才会响应更新
function updateSeries() {
  chartOptions.series = [{ data: [4, 5, 6] }]; // ✅ 有效
}

// 修改内部属性不会响应
chartOptions.series[0].data.push(7); // ❌ 页面不会响应
```

- 搭配 markRaw，使值更明确不会进入代理

```ts
import { shallowReactive, markRaw } from 'vue';

const chatInstance = markRaw(initChart());

const state = shallowReactive({
  chartInstance: chatInstance,
});

const state2 = shallowReactive({
  chartInstance: initChart(),
});
// 以上state，state2看起来效果一致,都不会深层响应initChart的返回值
// 只是markRaw更语义化一点，明确chatInstance在后面都不会被响应化
```

> shallowReactive 适合 数据结构复杂 / 你只想追踪最外层变化 的场景，性能更优，适用于第三方库数据、只需浅层更新的配置项等。

### readonly

- 防止状态修改

```ts
import { readonly } from 'vue';

const readonlyConfig = readonly({
  apiUrl: 'https://example.com',
  version: '1.0.0',
});

// 下面的操作会导致警告，不会实际修改 readonlyConfig
readonlyConfig.apiUrl = 'https://new-url.com'; // 会抛出警告
```

- 封装数据避免外部修改,导出 readonlyState

```ts
const state = reactive({
  count: 0,
});

export const readonlyState = readonly(state);

// 外部无法修改 count
readonlyState.count = 5; // 会抛出警告
```

- readonly 保护父组件数据

```ts
const sharedData = reactive({ message: 'Hello World' });

// 子组件只读共享数据
const readonlyData = readonly(sharedData);
```

### shallowReadonly

- 顶层 key 保护，嵌套属性值可更改，避免新增其他 key 或删除 顶层 key

```ts
import { reactive, shallowReadonly } from 'vue';

const state = reactive({
  config: {
    apiUrl: 'https://example.com',
    timeout: 3000,
  },
  counter: 0,
});

// 只读外层属性，内部对象（config）仍然是响应式的
const readonlyState = shallowReadonly(state);

// 外层属性不能修改
readonlyState.counter = 5; // 会抛出警告

// 内部对象仍然可以修改
readonlyState.config.apiUrl = 'https://new-url.com'; // 可以正常修改
```

- 数字转响应式数据使用 ref
- 对象转响应式数据使用 reactive
- 依赖其他响应数据变化，需要缓存的使用 computed
- 解包 reactive 的数据，且需要保持解包后的数据也是响应式，与原 reactive 保持同步，批量多个使用 toRefs，单个使用 toRef
- 组件传递数据时，禁止修改任何数据使用 readonly
- 组件传递数据时，禁止修改第一层数据，shallowReadonly
- 内部深层数据不需要响应式时，使用 shallowRef 或 shallowReactive
- 明确标记一个对象，以后都不能作为响应式数据源，使用 markRaw 标记(\_\_v_skip)
- toRaw 取出 Vue 包装的响应式数据 Proxy 的真实值，用于 electron 传递给主进程，或数据发送给后端等，相当但性能高于 JSON.stringify
- 不确定会传入一个 ref 包装的值还是一个简单值，使用 unref
