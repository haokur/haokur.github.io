"use strict";(self.webpackChunknotes=self.webpackChunknotes||[]).push([[904],{11171:function(t,r,n){n.r(r),n.d(r,{demos:function(){return _}});var u=n(67294),o=n(68537),_={}},67715:function(t,r,n){n.r(r),n.d(r,{demos:function(){return _}});var u=n(67294),o=n(43648),_={}},46926:function(t,r,n){n.r(r),n.d(r,{demos:function(){return _}});var u=n(67294),o=n(4299),_={}},46983:function(t,r,n){n.r(r),n.d(r,{demos:function(){return _}});var u=n(67294),o=n(22695),_={}},57828:function(t,r,n){n.r(r),n.d(r,{demos:function(){return _}});var u=n(67294),o=n(37535),_={}},47537:function(t,r,n){n.r(r),n.d(r,{demos:function(){return _}});var u=n(67294),o=n(99920),_={}},48516:function(t,r,n){n.r(r),n.d(r,{demos:function(){return _}});var u=n(67294),o=n(79825),_={}},81206:function(t,r,n){n.r(r),n.d(r,{demos:function(){return _}});var u=n(67294),o=n(61831),_={}},51446:function(t,r,n){n.r(r),n.d(r,{texts:function(){return o}});var u=n(68537);const o=[]},3190:function(t,r,n){n.r(r),n.d(r,{texts:function(){return o}});var u=n(43648);const o=[{value:"\u4F7F\u7528 javascript",paraId:0,tocIndex:0}]},66301:function(t,r,n){n.r(r),n.d(r,{texts:function(){return o}});var u=n(4299);const o=[{value:"\u6838\u5FC3\uFF1A\u4E00\u6B21\u5FAA\u73AF\uFF0C\u524D\u540E\u4E24\u4E24\u6BD4\u8F83\uFF0C\u524D\u8005\u5927\u4E8E\u540E\u8005\uFF0C\u5219\u4E92\u6362\u4F4D\u7F6E\uFF0C\u6BCF\u6B21\u5FAA\u73AF\u5192\u6CE1\u4E00\u4E2A\u6700\u5927\u7684\u51FA\u6765",paraId:0,tocIndex:1},{value:`function bubblingSort(arr) {
  // \u8D70 i \u6B21 j \u7684\u904D\u5386
  for (let i = 0; i < arr.length; i++) {
    // j \u4E00\u8F6E\u904D\u5386\u786E\u5B9A\u4E00\u4E2A\u6700\u5927\u6570
    // i \u8F6E\u6B21 j\uFF0C\u786E\u5B9A i \u4E2A\u6570\uFF0C\u5219 j \u7684\u904D\u5386\u5C11 i \u6B21
    // \u518D-1 \u56E0\u4E3A\u6BD4\u8F83\u7684\u65B9\u6CD5\uFF0C\u4F7F\u7528\u4E86 j+1 \u7684\u4F4D\u7F6E
    for (let j = 0; j < arr.length - i - 1; j++) {
      // \u4E3B\u8981\u6BD4\u8F83\u903B\u8F91
      if (arr[j] > arr[j + 1]) {
        let temp = arr[j + 1];
        arr[j + 1] = arr[j];
        arr[j] = temp;
      }
    }
  }
}
let arr = [3, 1, 7, 4, 88, 2, 6];
bubblingSort(arr);
console.log(arr);
`,paraId:1,tocIndex:1},{value:"\u6838\u5FC3\uFF1A\u9009\u62E9\u4E00\u4E2A\u6570\uFF0C\u7136\u540E\u6570\u7EC4\u5176\u4ED6\u672A\u6392\u5E8F\u7684\u6570\u4E00\u4E00\u548C\u8FD9\u4E2A\u6570\u6BD4\u8F83\uFF0C\u5927\u5C0F\u4E92\u6362\u4F4D\u7F6E",paraId:2,tocIndex:2},{value:`function selectSort(arr) {
  for (let i = 0; i < arr.length; i++) {
    for (let j = i + 1; j < arr.length; j++) {
      // \u4E3B\u8981\u6BD4\u8F83\u903B\u8F91
      if (arr[j] < arr[i]) {
        const temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
      }
    }
  }
}
let arr = [3, 1, 7, 4, 88, 2, 6];
selectSort(arr);
console.log(arr);
`,paraId:3,tocIndex:2},{value:"\u6838\u5FC3\uFF1A\u5C06\u5F53\u524D\u6570\u5B57 a\uFF0C\u4ECE\u6570\u5B57\u524D\u4E00\u4E2A\u4F4D\u7F6E\uFF0C\u4F9D\u6B21\u5F80\u524D\u6BD4\u8F83\uFF0C\u5982\u679C\u6BD4 a \u5927\uFF0C\u5219\u5F80\u540E\u79FB\u4E00\u4F4D\uFF0C\u7A7A\u4F4D\u8BA9\u7ED9 a",paraId:4,tocIndex:3},{value:`function insertSort(arr) {
  // \u7B2C\u4E00\u4E2A\u6570\u7EC4\u8FB9\u6CA1\u6709\u6570\uFF0C\u9ED8\u8BA4\u4ED6\u7684\u4F4D\u7F6E\u662Fok\u7684
  for (let i = 1; i < arr.length; i++) {
    // \u53D6\u51FA\u8981\u6765\u4E0E\u524D\u9762\u6BCF\u4E2A\u6570\u6BD4\u8F83\u7684\u56FA\u5B9A\u503C
    const current = arr[i];

    // \u6682\u5B58j\uFF0Cj\u662F\u5728\u6BD4\u8F83\u8FC7\u7A0B\u4E2D\u4E0D\u65AD\u53D8\u5316\u7684\uFF0C\u6700\u540E\u505C\u5728\u90A3\u4E2A\u5C0F\u4E8Ecurrent\u7684\u5730\u65B9
    let j;
    // \u5F53arr[j]\u5927\u4E8E\u7B49\u4E8Ecurrent\u65F6\uFF0C\u9000\u51FA\u5FAA\u73AF
    for (j = i - 1; j > -1 && arr[j] >= current; j--) {
      // \u5C06\u5927\u4E8Ecurrent\u7684\u540E\u79FB
      arr[j + 1] = arr[j];
    }
    // \u5728\u5C0F\u4E8Ecurrent\u7684\u5730\u65B9\u7684\u7D22\u5F15+1\uFF0C\u653Ecurrent\u7684\u503C
    arr[j + 1] = current;
  }
}
let arr = [3, 1, 7, 4, 88, 2, 6];
insertSort(arr);
console.log(arr);
`,paraId:5,tocIndex:3},{value:"\u6838\u5FC3\uFF1A\u9012\u5F52\u4E8C\u5206\u6CD5\uFF0C\u4ECE\u5DE6\u53D6\u4E00\u4E2A\u6570\uFF0C\u5C06\u7EC4\u5185\u5176\u4ED6\u6570\u6309\u4ED6\u5206\u7EC4\uFF0C\u5C0F\u7684\u5728\u5DE6\uFF0C\u5927\u7684\u5728\u53F3\uFF0C\u7136\u540E\u5B83\u7684\u5DE6\u53F3\u4E24\u7EC4\u53C8\u6309\u540C\u7684\u5206\u6CD5\uFF0C\u7EE7\u7EED\u5206\u7EC4\u4E0B\u53BB\uFF0C\u76F4\u5230\u4E0D\u80FD\u62C6\u5206",paraId:6,tocIndex:4},{value:`
\u800C\u5C0F\u7684\u653E\u5DE6\uFF0C\u5927\u7684\u653E\u53F3\u4F7F\u7528\u53CC\u6307\u9488\u6BD4\u8F83\uFF0C\u6362\u4F4D\u7F6E\u7684\u65B9\u6CD5`,paraId:6,tocIndex:4},{value:`function partial(arr, low, high) {
  // \u53EF\u53D6\u7B2C\u4E00\u4E2A\u6570\uFF0C\u6216\u8005\u968F\u673A\u7EC4\u5185\u4E00\u4E2A\u6570\u907F\u514D\u6781\u7AEF\u60C5\u51B5
  let current = arr[low];

  while (high > low) {
    while (high > low && arr[high] >= current) high--;
    arr[low] = arr[high];
    while (high > low && arr[low] <= current) low++;
    arr[high] = arr[low];
  }

  arr[low] = current;
  return low;
}

function quickSort(arr, low, high) {
  low ??= 0;
  high ??= arr.length - 1;

  if (high > low) {
    let _splitIndex = partial(arr, low, high);
    quickSort(arr, low, _splitIndex - 1);
    quickSort(arr, _splitIndex + 1, high);
  }
}
let arr = [3, 1, 7, 4, 88, 2, 6];
quickSort(arr);
console.log(arr);
`,paraId:7,tocIndex:4}]},56076:function(t,r,n){n.r(r),n.d(r,{texts:function(){return o}});var u=n(22695);const o=[{value:"v18+",paraId:0,tocIndex:0}]},61770:function(t,r,n){n.r(r),n.d(r,{texts:function(){return o}});var u=n(37535);const o=[]},75373:function(t,r,n){n.r(r),n.d(r,{texts:function(){return o}});var u=n(99920);const o=[{value:"Vue2 and Vue3",paraId:0,tocIndex:0}]},2347:function(t,r,n){n.r(r),n.d(r,{texts:function(){return o}});var u=n(79825);const o=[{value:"Vue2",paraId:0,tocIndex:0}]},73728:function(t,r,n){n.r(r),n.d(r,{texts:function(){return o}});var u=n(61831);const o=[{value:"Vue3",paraId:0,tocIndex:0}]}}]);
