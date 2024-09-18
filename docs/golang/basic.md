# 基础

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

- map

```go
m := make(map[string]interface{})
fmt.Println(m) // 空对象

m2 := map[string]interface{}{
    "Name":"Jack",
}
fmt.Println(m2)

// 赋值
m["Name"] = "Alice"
m["Age"] = 19
fmt.Println(m)

// 取值
fmt.Println(m["Name"])
for k,v := range m {
    fmt.Println(k,v)
}
```

### 3. 数据转换

- 字符串转其他

```go
// 字符串转数字(int)
str := "123"
num,err := strconv.Atoi(str)
if err !=nil{
    fmt.Println("转换失败://",err)
}else {
    fmt.Println("123转数字://",num)
}

// 字符串转浮点数
str2 := "1.23"
floatNum ,err := strconv.ParseFloat(str2,64)
if err == nil {
    fmt.Println("1.23转换成浮点数://",floatNum)
}

// 字符串转切片
str3 := "hello"
bytes := []byte(str)
fmt.Println(bytes)

// 字符串转json
jsonStr := `{"key1":"value1","key2":"value2"}`
var data map[string]string
err := json.Unmarshal([]byte(jsonStr),&data)
if err != nil{
    fmt.Println("解析JSON失败",err)
} else {
    fmt.Println("转换后的JSON://",data)
    fmt.Println(data["key1"])
}
```

- 数字转其他

```go
// 转字符串
num := 123
str := fmt.Sprint(num)
fmt.Println(num)

// 转浮点
num2 := 123
floatNum := float64(num2)
fmt.Println(num2)

// 浮点数取整
floatNum2 := 1.23
fmt.Println(int(floatNum2))

// 浮点数保留小数位数
floatNum3 := 3.14159265358979323846
roundedNum := fmt.Sprintf("%.2f", floatNum3)
fmt.Println(roundedNum)
roundedNum2 := strconv.FormatFloat(floatNum3,'f',2,64)
fmt.Println(roundedNum2)
```

- slice 切片转其他

```go
// 切片转数组
slice := []int{1,2,3,4,5}
var array [5]int
for i,v := range slice {
    array[i] = v
}
fmt.Println("数组://",array)

// 切片转map
slice2 := []string{"key1","value1","key2","value2"}
m := make(map[string]string)
for i := 0; i < len(slice2); i += 2 {
   m[slice2[i]] = slice2[i+1]
}
fmt.Println("map:",m)
```

- map 转其他#

```go
// map转结构体
type Fruit struct {
    Name string
    Count int
}
m := map[string]int{
    "apple":5,
    "banana":3,
    "orange":7,
}

var fruits []Fruit
for key,value := range m {
    fruit := Fruit{Name:key,Count:value}
    fruits = append(fruits,fruit)
}
fmt.Println("结构体切片：",fruits)

// map转字符串
m := map[string]interface{}{
    "Name":"Alice",
    "Age":30,
    "email":"haokur@qq.com",
}
jsonStr,err := json.Marshal(m)
if err != nil{
    fmt.Println("转换失败://",err)
}
fmt.Println("JSON字符串：",getType(jsonStr), jsonStr,cap(jsonStr)) // 返回的是切片
fmt.Println("JSON字符串2：",string(jsonStr))
```

### 4. 分支

- if-else

```go
// if-else
score := 88

if score>90 {
    fmt.Println("优秀")
} else if score > 80 {
    fmt.Println("良好")
} else if score > 70 {
    fmt.Println("还行")
} else if score > 60 {
    fmt.Println("及格")
} else {
    fmt.Println("不及格")
}
```

- switch-case 常规

```go
// switch-case，搭配固定值的switch用法
// 不需要手动break，而要跳到下一个case需手动fallthrough
// 所以连写如  case 7: case 8: 并不像其他语言一样公用同一个逻辑，公用同一个逻辑，要并列在一行如： case 7,8:
func getStatus(status int) string{
    resultText := ""

    switch status {
    case 0:
        resultText = "待开始"
    case 1:
        resultText = "进行中"
    case 2:
        fmt.Println("2 和 3 一样，使用fallthrough跳到下一个")
        fallthrough
    case 3:
        resultText = "已结束"
    case 4,5,6:
        fmt.Println("不使用fallthrough，可使用并列的方式")
        resultText = "发生了错误"
    case 7:
    case 8:
        resultText = "结果是7或8"
    default:
        resultText = "无效的状态码"
    }


    return resultText
}

fmt.Println("result text for status 1 is ",getStatus(1))
fmt.Println("result text for status 2 and 3 is ",getStatus(2), getStatus(3))
fmt.Println("result text for status 4 and 5 is ",getStatus(4),getStatus(5))
fmt.Println("result text for status 7 is ",getStatus(7)) // 并不如预期，结果会是空
```

- switch-case 实现类似 if-else 的效果

```go
// switch-case，搭配空switch的用法，类似if-else
func getStatusByCondition(score int){
    switch {
        case score > 90:
            fmt.Println("优秀")
        case score > 80:
            fmt.Println("良好")
        case score > 70:
            fmt.Println("一般")
        case score > 60:
            fmt.Println("及格")
        default:
            fmt.Println("不及格")
    }
}
fmt.Println("score 88 is")
getStatusByCondition(88)

fmt.Println("score 55 is")
getStatusByCondition(55)
```

- 转映射的方式

```go
// 大多“固定值-匹配处理方法”的分支都可以转成映射的方式
// 即 case 是等于的情形
func getStatusByMap(status int) string{
    statusMap := map[int]string{
        0 : "待开始",
        1 : "进行中",
        2 : "已结束",
        3 : "已结束",
    }
    if result,exists := statusMap[status]; exists{
        return result
    } else {
        return "无效的状态码"
    }
}

fmt.Println("result text for status 1 is ",getStatusByMap(1))
fmt.Println("result text for status 2 and 3 is ",getStatusByMap(2), getStatusByMap(3))
fmt.Println("result text for status 4 and 5 is ",getStatusByMap(4),getStatusByMap(5))
fmt.Println("result text for status 7 is ",getStatusByMap(7)) // 并不如预期，结果会是空
```

- 使用映射来匹配 action 执行操作

```go
type ActionFunc func(status int) string

func runAction(action string, status int) string {
    actionMap := map[string]ActionFunc{
        "start":func(status int) string {
            return "start"
        },
        "pause":func(status int) string {
            return "pause"
        },
        "stop":func(status int) string {
            return "stop"
        },
    }
    if actionFunc , exist := actionMap[action]; exist {
        return actionFunc(status)
    } else {
        fmt.Println(action, "action not found")
        return "not found"
    }
}

fmt.Println("runAction(\"start\",1) 执行的结果：",runAction("start",1))
fmt.Println("runAction(\"end\",1) 执行的结果：",runAction("end",1))
```

### 5. 遍历

- 普通，数组/切片遍历

```go
// 没有while，do-while，只有for，都用for模拟
// 基本遍历
for i := 0; i < 5; i ++ {
    fmt.Println(i)
}

// 数组,slice遍历
arr := [5]int{11,22,33,44,55}
fmt.Println("普通for循环")
for i := 0; i < len(arr); i ++ {
    fmt.Println(i,arr[i])
}

fmt.Println("使用range")
for index,value := range arr {
    fmt.Println(index,value)
}

// map的遍历
userJson := map[string]interface{}{
    "Name":"Jack",
    "Age" : 18,
}
for key , value := range userJson {
    fmt.Println("userJson key is ", key, " value is ",value)
}
```

- 字符串的遍历

```go
// 字符串的遍历有些特殊
str := "Hello Go语言"
fmt.Println(len(str))

// Unicode 字符的序列
fmt.Println("普通遍历字符串，遇到中文索引不如预期://")
for index , value := range str {
    fmt.Println(index, value,string(value)) // “语”在8的位置，“言”在11的位置
}

// 使用rune切片来遍历
runes := []rune(str)
fmt.Println("使用rune转换后来遍历字符串://")
for index ,value := range runes {
    fmt.Println(index,value,string(value))
}
```

- 模拟 while 循环，do-while，无限循环

```go
// while 循环
count := 0
for count < 5 {
    count ++
    fmt.Println(count)
}

// do-while循环
count2 := 0
for {
    fmt.Println(count2)
    count2 ++

    if count2 >= 5{
        break // 使用break或return跳出死循环
    }
}

// 无限循环
for {
  // 一直执行， 直到break或return
}
```

### 6. 其他

- 指针

```go
num := 10
pNum := &num
fmt.Println("num的指针/地址：", pNum)
fmt.Println("*pNum：",*pNum)

// 函数里的参数只能是 *xx，不能是&xx，当参数是*xx，则传入的需要是一个指针
func count(i *int){
    (*i)++
}
count(pNum)
fmt.Println("after count num is",num)
```

```
num的指针/地址： 0xc000676000
*pNum： 10
after count num is 11
```

- type 的使用

```go
// 定义结构体
type Person struct {
    Name string
    Age int
}
p := Person{Name:"Alice",Age:30}
fmt.Println(p)

// 定义接口
type Speaker interface {
    Speak() string
}
type Dog struct{}
func (d Dog) Speak()string {
    return "Woof!"
}
var s Speaker = Dog{}
fmt.Println(s.Speak())

// 基于基本类型创建新的类型
type Age int
func (a Age) isAdult() bool{
    return a >= 18
}
var myAge Age = 20
fmt.Println(myAge.isAdult())

// 类型别名
type MyString = string
var s2 MyString = "hello go"
fmt.Println(s2)

// 函数类型
type Adder func(int,int) int
funcMap := map[string]Adder {
    "add1":func (x,y int) int{
        return x + y
    },
}
fmt.Println("add1",funcMap["add1"](1,2))
```
