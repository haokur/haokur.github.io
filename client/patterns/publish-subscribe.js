/**事件中心 */
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
