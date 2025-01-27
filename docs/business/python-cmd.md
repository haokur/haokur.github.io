---
group: 自动化
toc: content
---

# python 执行命令

> python 在 vscode 中格式化可以安装 `Black Formatter`插件

## 一、优雅处理退出

### 1. 最简单的 try-expect-finally

```python
def run_main():
    input("按任意键盘退出~")

try:
    run_main()
except KeyboardInterrupt:
    print("程序被用户手动中断")
finally:
    print("程序结束统一处理")
```

### 2.使用信号处理

```python
import signal
import sys

def handle_exit(signum,frame):
    print("\n收到信号{}，程序退出...".format(signum))
    sys.exit(0)

signal.signal(signal.SIGINT, handle_exit)  # 捕获 Ctrl+C
signal.signal(signal.SIGTERM, handle_exit)  # 捕获终止信号

input("使用ctrl+C退出程序!\n")
```

> 注意，在捕获了 `signal`，需要再处理函数 `handle_exit` 中主动调用`sys.exit`，否则不会退出
> 在绑定的方法 `handle_exit`里的传入的参数为两个参数，不能省掉第二个参数 `frame` > `handle_exit` 的定义和绑定需要在运行的命令之前

## 二、执行命令

### 1.运行系统命令

```python
import subprocess

command = "ls"
try:
    subprocess.run(command, shell=True)
except Exception as e:
    print(f"执行命令时出错: {e}")
```

将输出捕获，手动处理或输出，如下：

> 主要是添加一个 `capture_output=True`

```python
import subprocess

# 执行系统命令
command = "ls"
try:
    result = subprocess.run(command, shell=True, capture_output=True, text=True)
    if result.stderr:
        print("错误输出:")
        print(result.stderr)
    else:
        print("命令输出:")
        print(result.stdout)
except Exception as e:
    print(f"执行命令时出错: {e}")
```

### 2.打开新的命令行界面执行

```python
import os
import platform

system_name = platform.system()
is_windows_system = system_name == "Windows"
is_mac_system = system_name == "Darwin"
is_linux_system = system_name == "Linux"

def run_cmd_by_new_windows(cmd):
    if is_windows_system:
        print("打开新窗口运行命令,待补充")
    elif is_mac_system:
        # AppleScript 命令
        script = f"""
        tell application "Terminal"
            activate
            do script "{cmd}"
        end tell
        """
        os.system(f"osascript -e '{script}'")
    else:
        print("其他系统")

run_cmd_by_new_windows("ls")
```
