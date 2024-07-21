# 设计模式

### 一、基本概念

- 封装：封装变化
- 继承：继承通用属性和方法
- 多态：同一个接口方法，不同的实现，黑猫白猫，能抓老鼠的就是猫
- 闭包：函数执行完其相应的执行环境需要被释放，而返回了该函数，函数并未消亡，其执行环境也被一起留存了下来，不会被垃圾回收释放
- 作用域：变量查找范围规则，有全局作用域，函数作用域，let，const 块级作用域
- 作用域链：变量的由最近作用域到最远作用域（全局作用域）的变量查找规则
- 原型：对象上的 prototype 属性对象，其 constructor 的值对应为对象本身
- 原型链：对象在查找变量和方法时，当前对象上没有，则通过 \_\_proto** 查找到上一层的 prototype 上，没查到就再拼一层 \_\_proto** 直到查找 null 停止，最终未找到，返回 undefined
- 设计模式核心：将变的和不变的拆离开

### 二、单例模式

常用场景：

- 数据库，redis 连接，创建根元素

实现：

- 若没执行过，则执行且保存结果
- 若执行过（结果缓存有值），调用时，直接返回上次缓存的结果

```javascript
// 通用获取单例，高阶函数+闭包
function getSingle(callback) {
  let singleInstance;

  return function () {
    if (singleInstance !== undefined) return singleInstance;
    singleInstance = callback.apply(null, arguments) || null;
    return singleInstance;
  };
}

function doSomething() {
  return {
    name: 'jack',
    age: Date.now(),
  };
}

function getDatabase() {
  return {
    port: '3306',
    user: 'root',
  };
}

function getNothing() {
  console.log('执行getNothing', 'singleton.js::29行');
}

const singleDoSomething = getSingle(doSomething);
const result1 = singleDoSomething();
const result2 = singleDoSomething();
console.log(result1 === result2); // true

const singleGetDatabase = getSingle(getDatabase);
const database1 = singleGetDatabase();
const database2 = singleGetDatabase();
console.log(database1 === database2); // true

const singleNothing = getSingle(getNothing);
const nothingResult1 = singleNothing();
const nothingResult2 = singleNothing();
console.log(nothingResult1, nothingResult2); // null null
```

- 定义一个通用获取单例函数，传入函数，返回一个创建函数，或者创建的结果，传入的函数在程序生命周期里只会执行一次
- doSomething 如果没有返回值，则会在 getSingle 中置为 null，也保证了没有返回值的函数执行，其也只会执行一遍
- 以上的实现，主要将单例模型和实际执行的操作，拆分了开，使得 getSingle 更加通用，使得传入的函数更加灵活多样

### 三、策略模式

> 定义一系列的算法（执行方法，回调），把他们一个个封装起来，挂载在一个对象上，使用时可以通过 key 去匹配执行

常用场景：

- 计算年终奖金，规则校验

实现：

```javascript
// 一系列算法，挂载在对象上
const calculateMoneyStrategy = {
  S: (salary) => salary * 6,
  A: (salary) => salary * 4,
  B: (salary) => salary * 2,
  C: (salary) => salary * 1,
};

// 通过key匹配算法，执行
const employee1Money = 10000 + calculateMoneyStrategy['S'](10000);
const employee2Money = 8000 + calculateMoneyStrategy['C'](8000);

console.log(employee1Money, employee2Money); // 70000 16000
```

### 四、代理模式

本来真实的 A 到 B 之间，第三方 C 来 "赚差价"

可以将 C 看成是中间传话的，这个 C 可以加一些自己的想法和控制，收到 A 的请求，加工或原封不动传达给 B，收到 B 的响应，又传回给 A

常见场景：

- DOM 事件委托，本来 button 绑定响应的事件，委托给 document 处理
- VPN
- 中间人送花表白，媒婆
- 兼容多平台时的跨平台方法调用，如 uniapp，taro 的平台方法调用 uni.showToast()
- Vue3 中的 proxy 的使用

```javascript
const doSomething = (params) => {};

const proxyDoSomething = (params) => {
  params.b = 2;

  let result = doSomething(params);

  result.c = 3;
  return result;
};

proxyDomSomething({ a: 1 });
```

### 五、迭代器模式

顺序访问聚合对象里的各个元素。js 中内置的 for in ，for of，forEach，都算

略

### 六、发布订阅模式

> 实际生活案例：粉丝关注偶像，偶像更新动态，所有粉丝收到通知，粉丝可以脱粉取关

- 广泛应用于异步编程场景中
- 取代对象之间硬编码的方式（耦合调用函数方式）
- 适用场景，一对多，可能后续还会增加这个多的时候
- 时间上的解耦，对象之间的解耦

特点：

- 时间上的解耦，对象之间的解耦
- 一对多，可能后续还会增加这个多的时候
- 取代对象之间硬编码的方式，比如登录成功后，在请求回调里执行的一系列刷新操作

常用场景：

- document 的点击事件，移除事件，addEventListener，removeEventListener
- 在完成一些事件，需要广播多个模块配合完成时，如登录成功后，各个组件刷新状态
- Vue 中，响应式数据变更后，对应的响应式变化操作
- 线程之间的交互，如 js 主线程和 webworker 线程，electron 的 main 进程和 renderer 进程

实现考虑的点：

- 维护一个订阅表数据
- 发布事件消息，订阅表遍历执行订阅的函数
- 支持仅订阅一次，订阅执行完后自动取消
- 同一个回调方法，过滤重复订阅
- 支持取消订阅单个，取消订阅所有

```javascript
const EventCenter = {
  listeners: {},
  on(eventName, callback) {
    if (!this.listeners[eventName]) {
      this.listeners[eventName] = [];
    }
    if (this.listeners[eventName].includes(callback)) return;
    this.listeners[eventName].push(callback);
  },
  once(eventName, callback) {
    const onceCallbackWrapper = (...args) => {
      callback(...args);
      this.off(eventName, onceCallbackWrapper);
    };
    this.on(eventName, onceCallbackWrapper);
  },
  emit(eventName, ...args) {
    const eventCallbacks = this.listeners[eventName];
    if (!Array.isArray(eventCallbacks)) return;
    eventCallbacks.forEach((cb) => cb.apply(null, args));
  },
  off(eventName, callback) {
    if (this.listeners[eventName]) {
      this.listeners[eventName] = this.listeners[eventName].filter(
        (cb) => cb !== callback,
      );
    }
  },
  clear() {
    this.listeners = {};
  },
};

EventCenter.on('sayHello', (userName) => {
  console.log('hello', userName);
});
EventCenter.on('sayHello', (userName) => {
  console.log('hi', userName);
});
const callback = () => {
  console.log('good');
};
EventCenter.on('sayGood', callback);
EventCenter.on('sayGood', callback);
EventCenter.once('sayGood', () => {
  console.log('once sayGood running');
});

EventCenter.emit('sayHello', 'jack');
EventCenter.emit('sayGood', 'jack');

EventCenter.off('sayGood', callback); // 退订
EventCenter.emit('sayGood', 'bob'); // 没有打印good，因为上一步已退订

EventCenter.clear();

EventCenter.emit('sayHello', 'over');
EventCenter.emit('sayGood', 'over');
```

以上，实现 once 使用到了一个函数来包装原本的函数，在包装内部做了执行后的立即取消订阅操作。

### 七、命令模式
