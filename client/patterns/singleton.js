/**单例模式 */

// 通用获取单例，高阶函数
function getSingle(callback) {
  let singleInstance;

  return function () {
    if (singleInstance !== undefined) return singleInstance;
    singleInstance = callback.apply(null, arguments) || null;
    return singleInstance;
  };
}

function doSomething() {
  console.log('执行doSomething', 'singleton.js::22行');
  return {
    name: 'jack',
    age: Date.now(),
  };
}

function getDatabase() {
  console.log('执行getDatabase', 'singleton.js::22行');
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
