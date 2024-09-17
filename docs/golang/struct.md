# 结构体

### 基本使用

```go
type User struct {
	Name string
	Age  int
}

func testStruct() {

	// 实例化方法1 - 直接初始化
	u1 := User{Name: "jack", Age: 18}
	fmt.Println(u1) // {jack 18}
	u1.Name = "Bob"
	fmt.Println("after change u1 Name,u1 Name is", u1.Name) // BOb

	// 实例化方法2 - 零值初始化
	u2 := User{}
	fmt.Println(u2) // { 0}
	u2.Name = "Bob"
	fmt.Println("after change u2 Name,u2 Name is", u2.Name) // BOb

	// 实例化方法3 - New 零值初始化
	u3 := new(User)
	fmt.Println(u3) // 返回的是结构体的指针，类型为 *User , &{ 0}
	u3.Name = "Bob"
	fmt.Println("after change u3 Name,u3 Name is", u3.Name) // BOb

	// 实例化方法4 - 类似new，零值初始化并获取指针
	u4 := &User{}
	fmt.Println(u4) // &{ 0}
	u4.Name = "Bob"
	fmt.Println("after change u4 Name,u4 Name is", u4.Name) // BOb

	// 实例化方法4 - 类似new，初始化并获取指针，并初始化
	u5 := &User{Name: "jack", Age: 18}
	fmt.Println(u5) // &{jack 18}
	u5.Name = "Bob"
	fmt.Println("after change u5 Name,u5 Name is", u5.Name) // BOb
}

testStruct()
```

引用的操作，操作时会指向值的操作，所以在对引用的操作，和直接对引用对应的值的操作，其效果是一致的，只有在函数传递时，会有区别，因为 go 中的函数值传递为值的拷贝传递，拷贝的值如果是一个引用地址，那最后函数内部拿到的还是原始的引用，如果是值，就会拷贝值，与原数据分离无关联了。

### 值拷贝 VS 引用拷贝

```go

type User struct {
	Name string
	Age  int
}

func changeAge(person User) {
	fmt.Println("changeAge func", person.Age)
	person.Age += 1
	fmt.Println("after changeAge person.Age += 1 ", person.Age)
}

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

	fmt.Println("---------")
	user2.sayHello()
}

testFunc()
```

### 嵌套结构体

```go
// 嵌套结构体
type Address struct {
    Name string
    City string
    Country string
}

// 匿名嵌套，将Address的属性，直接扩展到Employee上,可直接通过Employee访问Address内属性，而不带Address字段（带也可以访问）
type Employee struct{
    Name string
    Age int
    Address
}

emp1 := &Employee{
    Name:"jack",
    Age : 18,
    Address:Address{
        Name:"address Name",
        City:"shenzhen",
        Country:"China",
    },
}
fmt.Println(emp1.City,emp1.Address.City)

// 当内外名重叠时，匿名嵌套的结构体不会覆盖外面的属性，要访问嵌套内部的属性，只能通过嵌套的名称深层获取
fmt.Println(emp1.Name,emp1.Address.Name)

// 非匿名嵌套，只能通过嵌套的名称获取嵌套的属性
type Employee2 struct{
    Name string
    Age int
    Address Address
}
emp2 := &Employee2{
    Name:"jack",
    Age : 18,
    Address:Address{
        Name:"address Name",
        City:"shenzhen",
        Country:"China",
    },
}
fmt.Println(emp2.Address.City) // emp2.City的获取方式会报错
```

### 方法与结构体的结合

```go
// 方法与结构体的结合
type User struct{
    Name string
    Age int
}

func (u *User)sayHello(){
    fmt.Println(u.Name, "say hello to you")
}

u1 := &User {
    Name :"jack",
    Age : 18,
}
u1.sayHello()
```
