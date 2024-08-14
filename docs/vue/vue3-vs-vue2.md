# Vue3🤝Vue2

## 容器的差异

### Vue2.0 容器组件

```html
<template>
  <view>
    <div>数量（count）：{{count}}</div>
    <div>
      <label for="">单价（price）：</label>
      <input type="text" v-model="price" />
    </div>
    <div id="totalPrice">总价格（totalPrice）：{{totalPrice}}</div>
    <button @click="handleCountIncrease">count+1</button>
    <HelloTest
      ref="helloTestRef"
      v-bind="cptPropsData"
      @changeContent="handleContentChange"
    ></HelloTest>
  </view>
</template>
<script>
  import HelloTest from '../components/HelloTest.vue';

  export default {
    components: {
      HelloTest,
    },
    data() {
      return {
        count: 0,
        price: 10,
        config: Object.freeze({
          a: 1,
        }),
        x: 0,
        obj: {
          count: 0,
        },
        url: 'https://test-dps-api.trendingstar.tech/prod/get?vid=f3b7ad576fdf2dd7daee476179dcfb85',
        responseData: '',
        cptPropsData: {
          title: '组件内容标题',
          content: '组件内容内容',
        },
      };
    },
    computed: {
      totalPrice() {
        return this.count * this.price;
      },
    },
    watch: {
      x(newX, oldX) {
        console.log(`x is ${newX}`);
      },
      obj: {
        handler(newValue, oldValue) {
          console.log(newValue, oldValue);
        },
        deep: true,
      },
      url: {
        handler: async (newValue) => {
          const res = await fetch(newValue);
          console.log(res);
        },
        immediate: true,
      },
    },
    // 生命周期
    mounted() {
      const helloTestRef = this.$refs.helloTestRef;
      this.$nextTick(() => {
        console.log(helloTestRef, 'helloTestRef-----');
      });
    },
    beforeMount() {},
    // 等等等
    methods: {
      handleCountIncrease() {
        this.count++;
        this.$nextTick(() => {
          console.log(
            '总价格：',
            document.getElementById('totalPrice').innerHTML,
          );
        });
      },

      handleContentChange(content) {
        console.log('从子组件接收到的内容', content);
        this.cptPropsData.content = content;
      },
    },
  };
</script>
```

### Vue3.0 容器组件

```html
<template>
  <view>
    <div>数量（count）：{{ count }}</div>
    <div>
      <label for="">单价（price）：</label>
      <input type="text" v-model="price" />
    </div>
    <div id="totalPrice">总价格（totalPrice）：{{ totalPrice }}</div>
    <button @click="handleCountIncrease">count+1</button>
    <HelloTest
      ref="helloTestRef"
      v-bind="cptPropsData"
      @changeContent="handleContentChange"
    ></HelloTest>
  </view>
</template>
<script setup lang="ts">
  import axios from 'axios';

  import { useRoute } from 'vue-router';

  import {
    reactive,
    ref,
    computed,
    watch,
    watchEffect,
    nextTick,
    onBeforeMount,
    onMounted,
    onBeforeUpdate,
    onUpdated,
    onActivated,
    onDeactivated,
    onErrorCaptured,
    onBeforeUnmount,
    onUnmounted,
  } from 'vue';

  // 引入组件，并使用
  import HelloTest from '../components/HelloTest.vue';

  // 定义响应data
  interface IData {
    count: Number;
    year?: number;
  }

  const data: IData = reactive({
    count: 0,
  });

  const count = ref(0);
  count.value++;

  const price = ref(10);

  // 定义非响应data，类似于 freeze
  const config = { a: 1 };

  // 计算属性
  const totalPrice = computed(() => {
    return count.value * price.value;
  });

  // 监听watch
  // 常规watch
  const x = ref(0);
  watch(x, (newX) => {
    console.log(`x is ${newX}`);
  });

  // 对象deep watch
  const obj = reactive({
    count: 0,
  });
  watch(
    obj,
    (newValue, oldValue) => {
      console.log(newValue, oldValue);
    },
    {
      deep: true,
    },
  );

  // watchEffect => 自动初始化调用一次
  // 先请求一遍，并且监听url的变化
  const url = ref('https://');
  const responseData = ref({});
  watchEffect(async () => {
    const res = await fetch(url.value);
    responseData.value = await res.json();
  });

  // 方法methods
  const handleCountIncrease = () => {
    count.value++;
    nextTick(() => {
      console.log('总价格：', document.getElementById('totalPrice').innerHTML);
    });
  };

  // 生命周期
  onBeforeMount((...args) => {
    console.log('onBeforeMount---', args);
  });
  onMounted((...args) => {
    console.log('onMounted---', args);

    const route = useRoute();
    let { vid } = route.query;
    if (vid) {
      let reqUrl = `https://test-dps-api.trendingstar.tech/prod/get?vid=${vid}`;
      axios.get(reqUrl, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
    }
  });

  onBeforeUpdate((...args) => {
    console.log('onBeforeUpdate---', args);
  });
  onUpdated((...args) => {
    console.log('onUpdated---', args);
  });
  onActivated((...args) => {
    console.log('onActivated---', args);
  });
  onDeactivated((...args) => {
    console.log('onDeactivated---', args);
  });
  onErrorCaptured((...args) => {
    console.log('onErrorCaptured---', args);
  });
  onBeforeUnmount((...args) => {
    console.log('onBeforeUnmount---', args);
  });
  onUnmounted((...args) => {
    console.log('onUnmounted---', args);
  });

  // ref获取DOM的用法
  const helloTestRef = ref(null);

  nextTick(() => {
    console.log(helloTestRef, 'helloTestRef-----');
  });

  // 监听子组件的事件
  const cptPropsData = reactive({
    title: '组件内容标题',
    content: '组件内容内容',
  });
  const handleContentChange = (content) => {
    console.log('从子组件接收到的内容', content);
    cptPropsData.content = content;
  };
</script>
```

## 组件的差异

### Vue2.0 子组件

```html
<template>
  <div>
    <div>HelloTest组件:</div>
    <div>{{title}}-{{content}}</div>
    <div>
      <button @click="handleClick">子组件触发事件传达到父组件</button>
    </div>
  </div>
</template>
<script>
  export default {
    props: {
      title: { type: String, default: '' },
      content: String,
    },
    mounted() {
      console.log(this.title, this.content);
    },
    methods: {
      handleClick() {
        // 提交事件到父组件
        this.$emit('changeContent', '子组件的内容');
      },
    },
  };
</script>
```

### Vue3.0 子组件

```html
<template>
  <div>
    <div>HelloTest组件:</div>
    <div>{{title}}-{{content}}</div>
    <div>
      <button @click="handleClick">子组件触发事件传达到父组件</button>
    </div>
  </div>
</template>
<script setup lang="ts">
  import { defineEmits, defineProps, onMounted } from 'vue';

  // 接收数据
  const props = defineProps({
    title: { type: String, required: true },
    content: String,
  });

  // 提交事件到父组件
  const emits = defineEmits(['changeContent']);
  const handleClick = () => {
    emits('changeContent', '子组件的内容');
  };

  onMounted(() => {
    console.log(props.title, props.content);
  });
</script>
```

## 小模块对比

### 启动

#### Vue2 启动

```javascript
import Vue from 'vue';
import App from './App.vue';

new Vue({
  el: '#app',
  render: (h) => h(App),
});
```

#### Vue3 启动

```javascript
import { createApp } from 'vue';

import App from './App.vue';

createApp(App).mount('#app');
```

### 生命周期

> Vue3 的生命周期都需要显式地从*vue*中导入

| Vue2 周期     | Vue2 周期说明                                          | Vue3 对应周期   | Vue3 周期说明 |
| ------------- | ------------------------------------------------------ | --------------- | ------------- |
| beforeCreate  | Vue 开始实例化，除了 this 啥都没                       | setup           |               |
| created       | Vue 实例化完成，已经代理了数据 (data) 和方法 (methods) | setup           |               |
| beforeMount   | 模板编译完成未挂载，模板编译阶段                       | onBeforeMount   |               |
| mounted       | 模板挂载 ok，模板编译完成, 且挂载, $el 开始有值        | onMounted       |               |
| beforeUpdate  | 数据开始更新前                                         | onBeforeUpdate  |               |
| updated       | 更新完成                                               | onUpdated       |               |
| beforeDestory | 开始销毁之前, Vue 实例还存在                           | onBeforeUnmount |               |
| destoryed     | 销毁后, Vue 实例已不在                                 | onUnmounted     |               |

#### Vue2 生命周期

```javascript
export defualt {
	beforeCreated(){},
	created(){},
	beforeMounted(){},
	mounted(){},
}
```

#### Vue3 生命周期

```html
<script lang="ts" setup>
  import { onMounted } from 'vue';

  onMounted(() => {
    console.log('appliaction is mounted!');
  });
</script>
```

### 响应式数据

#### Vue2 响应式数据

- props，组件接收父组件传入数据
- data，组件自己的数据
- computed，可依据 props 和 data 的计算属性

```javascript
export default {
  props: {
    title: {
      type: string,
      defualt: 'hello',
    },
  },
  data() {
    return {
      name: 'world',
      userInfo: {
        name: 'jack',
        age: 18,
        gender: 'boy',
      },
    };
  },
  compunted: {
    fullGreet() {
      return `${this.title} ${this.name}`;
    },
  },
};
```

#### Vue3 响应式数据

```typescript
import { ref, reactive, computed } from 'vue';

const props = defineProps({
  title: { type: String, require: true, defualt: 'hello' }, // 注意这里String的S需要为大写
});
const name = ref('world');
const fullGreet = computed(() => {
  return `${props.title} ${name.value}`;
});

console.log(name.value); // 简单类型取值，要加.value
console.log(fullGreet.value); // computed包装的数据获取，要加.value

const userInfo = reactive({
  name: 'jack',
  age: 18,
  gender: 'boy',
});

// ComputedRefImpl
const fullUserInfo = computed(() => {
  return { ...userInfo, job: 'web developer' };
});

console.log(userInfo.name); // 对象类型，取值是直接取
console.log(fullUserInfo.value, fullUserInfo.value.name);
```

> 注意 computed 方法返回的都是 ComputedRefImpl 类型，不管方法内部 return 的是简单类型（string，number），还是对象类型（{}），都需要通过 .value 后取值。
