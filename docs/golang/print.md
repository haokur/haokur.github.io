# 打印

- Print，不换行打印

```go
fmt.Print("hello")
fmt.Print("world")
```

- Println，带换行打印

```go
fmt.Println("hello world")
fmt.Println("hello world")
```

- Printf，格式化输出，常用的 %d 十进制整数，%f 浮点数，%s 字符串

```go
fmt.Printf("her name is %s, her age is %d,her weight is %f","jack",18,55.66)
```

- 带时间戳的打印

```go
log.Print("this is log message.")
log.Println("this is a log message with newline.")
log.Printf("her name is %s, her age is %d,her weight is %f","jack",18,55.66)
```

- 生成格式化的字符串，不打印

```go
str := fmt.Sprintf("Hello %s!","golang")
fmt.Println(str)
```

- 输出到文件

```go
file,_ := os.Create("output.txt")
defer file.Close()
fmt.Fprintln(file,"hello,file")
```
