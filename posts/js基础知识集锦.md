## 前端面试进阶之-基础知识篇

1. 输入URL到页面渲染流程？

> 非IP地址DNS查询IP =》通过IP访问服务器 =》 建立连接 =》请求加载资源=》资源解析，下载html，样式和脚本=》生成DOM树和CSSOM树 =》渲染

2. 从渲染流程说说优化？

> - DNS 查询，选好的DNS服务商；使用CDN，解析到离请求者最近的服务器的IP
> - 服务器配置高性能好，带宽足
> - keep-alive 等策略实现 TCP 通道可复用，减少三次握手的次数
> - 加载资源，更少的请求，更小的请求，更小的大小，突破浏览器并发
>   - 更少的请求，雪碧图合并小图片，代码合并，浏览器资源缓存，一些图片转 base64
>   - 更小的请求，cookieless，少设置cookie，用localstorage等本地存储代替，或者将资源放到另外一个没设置cookie域名下。
>   - 更小的大小，代码压缩，去除无用的多余代码，图片压缩，gzip压缩文件
> - 资源解析
>   - css 在 head 中引入，不使用 @import 导入样式
>   - js 在 body 最末尾引入，不堵塞DOM解析
>   - 避免资源 404，图片空 src

3. js 中的数据类型？

> js 中类型分为基本类型和引用类型。基本类型数据不可改变，在给变量赋新的值时，不是改变了原值，而是用新值替换了旧值。
>
> - 基本类型，string，number，boolean，null，undefined，symbol
>
> 其中 string，number，boolean 在对其进行方法调用和操作时，都会临时生成包装对象，操作后销毁。
>
> - 应用类型，在修改和传递时，都是对引用值的操作，指向堆内存的中一块地址。

4. js 中一切皆对象？

> 不完全是，string，number，boolean ，symbol 有对应的包装对象， typeof null 等于 object，undefined 比较特殊没有包装对象，typeof undefined 也不等于 object，其余引用类型都是对象。

5. 面向过程和面向对象编程的区别？

> - 面向过程是一种以过程为中心的编程思想。分析出解决问题所需要的步骤，然后一二三四按步骤一一实现。从细节处思考问题。
> - 面向对象是一种以事物为中心的编程思想。把事物给对象化，对象包括属性和方法。面向对象编程中也可以包括面向过程。从宏观方面思考问题。

6. js 的变量提升？

> js 代码在执行前，会有个预编译的过程，该过程会收集所有的 var 声明和函数声明，var 声明的变量值为 undefined，function 声明的值可以直接使用。执行函数时，也会有变量提升，顺序规则是，var a  =>  a =1 => function a(){}

```js
function a(a){
  console.log(a)
  var a = 20;
}

function b(b){
  console.log(b);
  var b = 20;
  function b(){
    console.log('this is b');
  }
}

a(10); // 10
b(10); // function b
```

7. 执行上下文（Execution Context执行环境）？

> 代码执行时，都是在执行上下文(或执行环境)中运行。执行环境提供了代码运行的环境依赖。
>
> 执行上下文总在每次代码（全局代码和方法）执行时重新生成。执行上下文包括：
>
> - this 指向
> - VO/AO
>   - 局部变量
>   - 参数表
>   - 局部函数

8. this 的指向？

> 指向方法的调用者，也就是方法调用时前面的点是谁；如果没有，则在严格模式下是 `undefined` ，非严格模式下为全局对象，在浏览器中为 `window` ；箭头函数的 `this` 沿用外层的 `this` 指向。
>
> 可以使用 `call` ，`apply` ，`bind` 显性强行改变 `this` 的指向。三者第一个参数都为要把 `this` 指向的对象，为 `null` 且非严格模式时，指向 `window`；
>
> `apply` 的第二个参数为数组
>
> `call` 的第二个，和第三个以及之后的为其他要传入的参数
>
> `bind` 的参数和 `call` 类似
>
> `apply` 和 `call` 是执行一个函数，`bind` 是返回一个新的函数

9. 作用域链？

> 作用域链定义了变量查找值的规则，而函数的作用域链，由伴随着函数执行当前生成的执行上下文的 VO 和方法创建时生成的


















