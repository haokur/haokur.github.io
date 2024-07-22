# 其他算法

## 1.最长递增子序列

推演逻辑：

1. 当 arr 只有一个数时，他自身就是最长的子序列，所以跳过第一个数
2. 定义一个二维数组，存放子序列拼接结果 result，由第一步，就有 [[arr[0]]]
3. 从第二个数的位置开始遍历，取一个数 current，与 result 的每一项的最后一个数比较，假如 current 的数大于数组的最后一项，则可以拼接，即存在这种情景，即 result 是[[1],[1,2],[1,2,7]],遇到 current=3，数组最后一项拼不上，但是碰到 [1,2],能拼接上了，那么就把 [1,2] 的下一项修改 [1,2,7]=>[1,2,3],退出循环，此时的 result 为 [[1],[1,2],[1,2,3]]；如果找到最开始的项，也拼不上，那么它就是所有结果里最小的，他就独自在 result 的第一项，即 result[0] = [current]
4. 最后返回 result 的最后一项

result 的演变过程：

```
4=> [[4]]
5=> [[4], [4, 5]]
1=> [[1], [4, 5]]
2=> [[1], [1, 2]]
7=> [[1], [1, 2], [1, 2, 7]]
3=> [[1], [1, 2], [1, 2, 3]]
6=> [[1], [1, 2], [1, 2, 3], [1, 2, 3, 6]]
9=> [[1], [1, 2], [1, 2, 3], [1, 2, 3, 6], [1, 2, 3, 6, 9]]
```

实现代码：

```javascript
function getLis(arr) {
  if (!arr || !arr.length) return [];
  const result = [[arr[0]]];

  for (var i = 1; i < arr.length; i++) {
    _update(arr[i]);
  }

  function _update(current) {
    for (var j = result.length - 1; j > -1; j--) {
      let _arr = result[j];
      if (current > _arr[_arr.length - 1]) {
        // result.push([..._arr, current]);
        result[j + 1] = [..._arr, current];
        return;
      }
    }
    result[0] = [current];
  }
  return result[result.length - 1];
}

var arr = [4, 5, 1, 2, 7, 3, 6, 9];
console.log(getLis(arr)); // [1, 2, 3, 6, 9]
```
