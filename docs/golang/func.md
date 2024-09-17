# 函数

- 普通函数

```go
// 普通函数
func count(a int, b int) int {
    return a + b
}
count(1,2)
```

- 多返回值函数

```go
// 多返回值
func calc(a int , b int) (int,int){
    return a + b , a - b
}
calc(1,2)
```

- 可变参数个数

```go
// 可变参数个数
func sum(nums ...int) int {
    result := 0
    for _,val := range nums{
        result += val
    }
    return result
}
sum(1,2,3)
```

- 命名返回值

```go
// 命名返回值
func calc2(a int,b int)(plusResult int,reduceResult int){
    plusResult = a + b
    reduceResult = a -b
}
calc2(1,2)
```

- 匿名函数 - 常规

```go
// 匿名函数
type MyAction func(status int) int

funcMap := map[string]MyAction {
    "test": func(status int) int{ return status + 1 },
}

fmt.Println("funcMap[\"test\"](1)",funcMap["test"](1))

// 匿名函数自执行
func test(){
    func (name string){
        fmt.Println("hello ",name)
    }("Go")
}

test()
```

- 匿名函数 - 传递

```go
// 函数传递
// 函数传递-返回值
// 匿名函数-闭包-返回一个函数
type clousrAction func (addNum int) int
func createCounter () clousrAction {
    count := 0
    return func(addNum int) int {
        count += addNum
        return count
    }
}

myCounter := createCounter()
fmt.Println("myCounter(1)",myCounter(1))
fmt.Println("myCounter(1)",myCounter(1))

// 函数传递-参数
func sum(val int, fn clousrAction) int {
    result := fn(val)
    return result
}
fmt.Println(sum(2,myCounter))
```

- defer 延迟执行

```go
// 延迟执行 defer
// 保证了后面的核心逻辑即使panic，也能执行收尾工作，比如关闭文件操作等
// 先进后出

// 无提前返回
func test(){
    defer fmt.Println("收尾工作1")

    fmt.Println("核心逻辑执行")

    defer fmt.Println("收尾工作2") // 在前面返回时，并不能执行
}

test()

// 提前返回
fmt.Println("-------提前返回------------")
func test2(){
    defer fmt.Println("收尾工作1")

    visible := true

    if visible {
        fmt.Println("核心逻辑执行")
        return
    }

    defer fmt.Println("收尾工作2") // 在前面返回时，并不能执行
}

test2()
```

- 参数的值传递和引用传递

```go
// 参数值的值传递特性
type User struct {
	Name string
	Age  int
}

// 值拷贝
func changeAge(person User) {
	fmt.Println("changeAge func", person.Age)
	person.Age += 1
	fmt.Println("after changeAge person.Age += 1 ", person.Age)
}

// 引用传递
func changeAgeByInfer(person *User) {
	fmt.Println("changeAgeByInfer func", person.Age)
	person.Age += 1
	fmt.Println("after changeAgeByInfer person.Age += 1 ", person.Age)
}

func testFunc() {
	user1 := &User{
		Name: "Jack",
		Age:  18,
	}
	changeAge(*user1)
	fmt.Println("after changeAge func", user1.Age) // 18

	fmt.Println("---------")
	user2 := &User{
		Name: "Bob",
		Age:  18,
	}
	changeAgeByInfer(user2)
	fmt.Println("after changeAgeByInfer func", user2.Age) // 19
}

testFunc()
```

- struct 上实现方法

```go
// struct上实现方法
type User struct {
	Name string
	Age  int
}

func (user *User) sayHello(){
    fmt.Println(user.Name, "say hello")
}

u1 := &User{
    Name : "jack",
    Age : 18,
}

u1.sayHello()
```
