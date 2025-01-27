---
group: 自动化
toc: content
---

# playwright 使用

> 以 python 使用为例

## 代码与实践

- 源码 DEMO：[haokur/python-test/playwright-test.py](https://github.com/haokur/python-test/blob/main/playwright-test.py)

## 安装 python3

- [python 程序下载地址](https://www.python.org/downloads/)
- mac 上安装时,默认目录在：`/Library/Frameworks/Python.framework/Versions/`（可以使用 `which python` 查看安装位置）,可能不存在 pip 和 python，但存在 pip3 和 python3，则使用 cp 的方式复制粘贴出 pip 和 python

## 安装 playwright

```shell
pip install playwright
playwright install
```

## 场景实例

### 1.获取浏览器 cookie

> python 程序打开一个网页，持续读取 cookie 值，监听网页关闭，执行后续操作

```python
from playwright.async_api import async_playwright
import asyncio

cookies = []
async def main():
    # 启动 Playwright
    async with async_playwright() as p:
        # 启动浏览器（非无头模式）
        browser = await p.chromium.launch(headless=False)
        context = await browser.new_context()

        # 打开一个标签页
        page = await context.new_page()
        await page.goto("https://baidu.com")

        # 定义页面关闭的事件处理函数
        future = asyncio.get_running_loop().create_future()

        # 用于控制轮询的标志位
        stop_polling = False

        # 定义轮询获取 Cookie 的任务
        async def poll_cookies():
            global cookies
            while not stop_polling:
                cookies = await context.cookies()
                await asyncio.sleep(1)  # 每秒轮询一次

        asyncio.create_task(poll_cookies())

        async def on_page_close():
            await browser.close()  # 关闭浏览器
            print("监听到页面关闭，获取到的Cookie是:", cookies)
            future.set_result(None)  # 完成 Future，允许程序退出

        # 注册关闭事件监听器
        page.on("close", lambda: asyncio.create_task(on_page_close()))

        # 等待页面关闭事件完成
        await future

# 运行异步主函数
asyncio.run(main())
```
