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
// 默认就是引用类型
func changeSliceItem(slice []int) {
	slice[0] = 999
}

// 切片测试
/*
描述数组的片段结构：
1、指向数组的指针：[]int
2、切片的长度: len(slice)
3、切片的容量: cap(slice)
*/
func sliceTest() {
	var slice []int
	fmt.Println(slice, len(slice))
	slice = append(slice, 10)
	fmt.Println(slice)

	slice2 := []int{}
	fmt.Println(slice2, len(slice2))
	slice2 = append(slice2, 11)
	fmt.Println(slice2)

	slice3 := make([]int, 3, 5)
	fmt.Println(slice3, len(slice3)) // [0,0,0] 3
	slice3 = append(slice3, 12)
	fmt.Println(slice3)
	slice3 = append(slice3, 13, 14, 15, 16)
	// [0 0 0 12 13 14 15 16] 8 10，自动扩cap，通常是初始化时cap的两倍
	fmt.Println(slice3, len(slice3), cap(slice3))

	// 基本操作
	slice3[0] = 100
	slice3[1] = 200
	slice3[2] = 300
	fmt.Println(slice3[0])
	// 切割获取
	subSlice := slice3[2:3] // 左闭右开，if(index<3) return
	fmt.Println(subSlice)
	subSlice[0] = 888             // 更改子slice的值
	fmt.Println(subSlice, slice3) // 子slice和原slice都变化了
	changeSliceItem(slice3)
	fmt.Println(slice3) // [999 200 888 12 13 14 15 16]
	// 单边切割
	subSliceRight := slice3[3:]
	fmt.Println("subSliceRight", subSliceRight)
	subSliceLeft := slice3[:3]
	fmt.Println("subSliceLeft", subSliceLeft)

	// 多维切片
	matrixSlice := [][]int{
		{1, 2, 3},
		{4, 5, 6},
	}
	fmt.Println(matrixSlice, matrixSlice[1][1])

	// 只想要切出的小片，清空原slice，清理内存
	originSlice := make([]int, 3, 1000)
	fmt.Println(originSlice)
	subSlice2 := originSlice[:3]
	fmt.Println(subSlice2)
	originSlice = nil
	fmt.Println(originSlice, cap(originSlice), subSlice2) // 清空原slice，不会影响切割出来的slice

	// 切片复制
	src := []int{1, 2, 3}
	dst := make([]int, 3)
	copy(dst, src) // 操作的元素在前面，要拷贝的在后面
	fmt.Println(src, dst)

	// 零值切片，不给初始值时，是nil
	var zeroSlice []int
	fmt.Println(zeroSlice, zeroSlice == nil)
}
```
