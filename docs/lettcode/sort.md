# 排序

## 1、冒泡排序

核心：一次循环，前后两两比较，前者大于后者，则互换位置，每次循环冒泡一个最大的出来

```javascript
function bubblingSort(arr) {
  // 走 i 次 j 的遍历
  for (let i = 0; i < arr.length; i++) {
    // j 一轮遍历确定一个最大数
    // i 轮次 j，确定 i 个数，则 j 的遍历少 i 次
    // 再-1 因为比较的方法，使用了 j+1 的位置
    for (let j = 0; j < arr.length - i - 1; j++) {
      // 主要比较逻辑
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
```

## 选择排序
