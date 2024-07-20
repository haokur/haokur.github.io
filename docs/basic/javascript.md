# javascript 基础

### 1. 柯里化

有参数时存储参数，无参数时执行

```javascript
function currying(fn) {
  // 闭包收集存储参数变量
  var args = [];

  return function curryingWrapFn() {
    if (arguments.length === 0) {
      // 参数为0个，cost()(...args)
      return fn.apply(null, args);
    } else {
      // 有参数，args存储参数
      [].push.apply(args, arguments);
      // 返回当前函数，可继续执行的关键
      return arguments.callee;
    }
  };
}

function cost() {
  var money = 0;
  return function () {
    for (var i = 0; i < arguments.length; i++) {
      money += arguments[i];
    }
    return money;
  };
}

// curryingWrapFn, cost() 返回的是一个函数
const curryCost = currying(cost());

curryCost(100); // arguments.callee => curryingWrapFn => curryCost
curryCost(200)(300); // 同上
const result = curryCost(); // curryingWrapFn => arguments.length===0 => cost(100,200,300)
console.log(result); // 600
```
