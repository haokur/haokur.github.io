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

## 2、选择排序

核心：选择一个数，然后数组其他未排序的数一一和这个数比较，大小互换位置

```javascript
function selectSort(arr) {
  for (let i = 0; i < arr.length; i++) {
    for (let j = i + 1; j < arr.length; j++) {
      // 主要比较逻辑
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
```

## 3、插入排序

核心：将当前数字 a，从数字前一个位置，依次往前比较，如果比 a 大，则往后移一位，空位让给 a

```javascript
function insertSort(arr) {
  // 第一个数组边没有数，默认他的位置是ok的
  for (let i = 1; i < arr.length; i++) {
    // 取出要来与前面每个数比较的固定值
    const current = arr[i];

    // 暂存j，j是在比较过程中不断变化的，最后停在那个小于current的地方
    let j;
    // 当arr[j]大于等于current时，退出循环
    for (j = i - 1; j > -1 && arr[j] >= current; j--) {
      // 将大于current的后移
      arr[j + 1] = arr[j];
    }
    // 在小于current的地方的索引+1，放current的值
    arr[j + 1] = current;
  }
}
let arr = [3, 1, 7, 4, 88, 2, 6];
insertSort(arr);
console.log(arr);
```

## 4、快速排序

核心：递归二分法，从左取一个数，将组内其他数按他分组，小的在左，大的在右，然后它的左右两组又按同的分法，继续分组下去，直到不能拆分
而小的放左，大的放右使用双指针比较，换位置的方法

```javascript
function partial(arr, low, high) {
  // 可取第一个数，或者随机组内一个数避免极端情况
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
```
