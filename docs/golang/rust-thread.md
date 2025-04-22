---
group: Rust
title: thread多线程
order: 5
---

## 开一个线程

```rs
fn test_basic_thread() {
    let handle = thread::spawn(|| {
        thread::sleep(Duration::from_millis(1000));
        println!("thread running");
    });

    println!("main running");
    handle.join().unwrap(); // 等待handle线程执行结束，再往下执行
    println!("main running after wait thread all run finished");
}
```

执行结果：

```text
main running
thread running
main running after wait thread all run finished
```

## 开多个线程

```rs
fn test_multi_thread() {
    let mut handles = vec![];
    for i in 0..5 {
        let handle = thread::spawn(move || {
            thread::sleep(Duration::from_millis(1000));
            println!("thread running {}", i);
        });
        handles.push(handle);
    }
    println!("main running");
    // 等待上面所有线程执行完
    for handle in handles {
        handle.join().unwrap();
    }
    println!("main running after wait thread all run finished");
}
```

执行结果：

```text
main running
thread running 2
thread running 4
thread running 3
thread running 1
thread running 0
main running after wait thread all run finished
```

> 其中各个线程先后执行顺序可能有差异

## 线程间数据共享

### `Arc<Mutex<T>>`

- `Arc<T>`，Atomic Reference Counted，原子引用计数，用于在多个线程间共享所有权（Thread-safe 的 Rc）
- `Mutex<T>`，Mutual Exclusion，互斥锁，确保某一时刻只有一个线程能访问数据

```rs
fn test_thread_arc_mutex() {
    let counter = Arc::new(Mutex::new(0));
    let mut handles = vec![];
    for _ in 0..5 {
        let counter = Arc::clone(&counter);

        let handle = thread::spawn(move || {
            let mut num = counter.lock().unwrap();
            *num += 1;
        });

        handles.push(handle);
    }
    for handle in handles {
        handle.join().unwrap();
    }
    println!("结果：{}", *counter.lock().unwrap());
}
```

- 使用 `Mutex::new` 创建一个可以上锁（互斥锁）访问的对象；使用值时调用 `值.lock().unwrap()`
- 使用 `Arc::new` 创建一个原子引用计数智能指针；使用值时调用 `Arc::clone`
- `Arc<Mutex<T>>` 多线程共享可变数据的常用组合

### `Arc<RwLock<T>>`

- 同一时间可多个读，有一个写的时候，其他线程的读写都停止等待这个写完
- 当有一个写线程加锁时，会阻塞所有读/写线程，直到它释放
- 场景：读多写少

```rs
fn test_thread_arc_rwlock() {
    let data = Arc::new(RwLock::new(vec!["初始化数据".to_string()]));

    let mut handles = vec![];

    // 启动多个读线程
    for i in 0..5 {
        let data = Arc::clone(&data);
        let handle = thread::spawn(move || {
            for _ in 0..=3 {
                let r = data.read().unwrap();
                println!("[读取线程{i}] 数据内容:{:?}", *r);
                thread::sleep(Duration::from_millis(100));
            }
        });
        handles.push(handle);
    }

    // 一个写线程，写数据
    {
        let data = Arc::clone(&data);
        let handle = thread::spawn(move || {
            thread::sleep(Duration::from_millis(250));
            let mut w = data.write().unwrap();
            println!("[写线程]正在写入...");
            thread::sleep(Duration::from_millis(100));
            w.push("写入数据".to_string());
            println!("[写线程]写入完成...");
        });
        handles.push(handle);
    }

    for handle in handles {
        handle.join().unwrap();
    }
}
```

### mpsc 配合

> `multi-producer, single-consumer`,通道是线程间通信（message passing）的经典方式。它很适合在多线程或异步任务中，将数据从多个来源集中发送到一个处理线程。

- mpsc 是 Rust 提供的 多生产者、单消费者通信通道
- 使用方式有点像管道（pipe）：你把数据“发送”进去，另一边“接收”；
- 多个发送端可以 clone()，但接收端只能有一个

开一个线程，循环读取消息，直到主进程退出

```rust
fn test_mpsc_rx_thread() {
    helpers::logger::init_logger();

    let (tx, rx) = mpsc::channel();

    thread::spawn(move || {
        while let Ok(msg) = rx.recv() {
            info!("{}", format!("[监听线程] 收到消息:{}", msg));
        }
    });

    for i in 0..3 {
        tx.send(format!("消息: {}", i)).unwrap();
        thread::sleep(Duration::from_millis(1000));
    }

    // 模拟结束
    let handle = thread::spawn(|| {
        thread::sleep(Duration::from_millis(5000));
    });
    handle.join().unwrap();

    info!("主线程发送完毕");
}
```

直接打印在控制台，可能会最后一次性输出，使用 info! 打印日志能看出在 log 文件中打印时序符合预期
