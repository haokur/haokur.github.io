# golang 基础

### 1. 变量声明

```go
// 常量
const (
	PI        = 3.14
	YEAR_DAYS = 365
)

func type2Test() {
    // var
    var a int
    var s string
    var b bool
    var arr [5]int
    var slice []int
    var json1 map[string]interface{}
    fmt.Println("var empty init:///", a, s, b, arr, slice, json1)

    // :=，只能在方法内使用
    aa := 1
    bb := "hello"
    cc := false
    arr2 := [5]int{1, 2, 3}
    slice2 := []int{1, 2, 3, 4}
    json2 := map[string]interface{}{
            "Name": "jack",
    }
    fmt.Println("init with value:///", aa, bb, cc, arr2, slice2, json2)

    // make，切片，json对象，channel
    slice3 := make([]int, 5)
    slice4 := make([]int, 5, 8)
    json3 := make(map[string]interface{})
    fmt.Println("declare value with make:///", slice3, slice4, json3)
}
```

### 2. 数据操作

- 数组

```go
func changeArrItem(arr [3]int) {
	arr[0] = 100
	fmt.Println("changeArrItem方法内:///", arr)
}

func changeArrItemByPoint(arr *[3]int) {
	arr[0] = 100
}

// 数组测试
func arrTest() {
	// 数组声明
	var arr1 []int
	arr2 := [4]int{1, 2, 3, 4}
	arr3 := [...]int{1, 2, 3, 4, 5}
	arr4 := [...]int{0: 1, 10: 11}
	fmt.Println(arr1, arr2, arr3, arr4)

	// 数组元素访问
	fmt.Println(arr4[10])
	// fmt.Println(arr4[11]) // 越界访问，报错
	arr4[10] = 20
	fmt.Println(arr4[10])

	// 数组的遍历
	// range
	for index, value := range arr4 {
		fmt.Printf("数组遍历://索引是[%d],值是[%d]\n", index, value)
	}
	// for i,len(arr4)=》获取数组长度
	for i := 0; i < len(arr4); i++ {
		fmt.Println(i, arr4[i])
	}

	// 多维数组
	arr5 := [2][3]int{
		{1, 2, 3},
		{4, 5, 6},
	}
	fmt.Println(arr5[1][2]) // 6
	arr5[1][1] = 10
	fmt.Println(arr5)

	arr6 := [3]int{1, 2, 3}
	changeArrItem(arr6)
	fmt.Println(arr6) // [1,2,3]并没有因为changeArrItem而改变ß

	changeArrItemByPoint(&arr6)
	fmt.Println(arr6) // [100,2,3] 传递的引用，所以changeArrItemByPoint改变了arr6
}
```

- 切片

```go

```
