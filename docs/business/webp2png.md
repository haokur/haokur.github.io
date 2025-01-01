# webp 格式转 png

## 源码

- [electron-starter](https://github.com/haokur/electron-starter)

## 思路

> 以 electron 中集成 webp 功能为例

- 将 google 官方的 dwebp 库集成到 electron 的项目下
- renderer 层添加一个 drop 区域，拖拽文件进入区域，读取文件路径，发送信息给主进程
- 主进程收到消息，使用 child_process 的 exec 执行命令

## 实现

1. 从[google webp ](https://developers.google.com/speed/webp/docs/precompiled?hl=zh-cn) 下载对应的包，放到 static 目录下的 `src/main/static/libs/libwebp` 目录下，文件夹命名的方式为 `${平台}_${架构}`

2. 使用 element-plus 的组件，写拖拽区域

```html
<el-upload
  class="upload-demo"
  :auto-upload="false"
  drag
  multiple
  @change="handleChange"
  :show-file-list="false"
>
  <el-icon class="el-icon--upload"><upload-filled /></el-icon>
  <div class="el-upload__text">Drop file here or <em>click to upload</em></div>
</el-upload>
```

注意：其中虽然拖拽可能是一次性拖拽多个文件，但是 change 会回调多次，一个文件一次回调

3. 监听并发送消息给主进程

```ts
const handleChange = (ev) => {
  ipcHelperUtil.ipcRun('webp2Png', { path: ev.raw.path }, (config) => {
    console.log(config);
  });
};
```

4. 主进程接收到带 path 的消息，使用 path 的文件，转成 png

```ts
export async function webp2Png(config) {
  const { path: filePath } = config;

  // 平台：win32，darwin,linux
  const platform = process.platform;
  // 架构：arm，arm64，x64，ia32
  const arch = process.arch;

  // 获取处理程序路径
  const execName = platform === 'win32' ? 'dwebp.exe' : 'dwebp';
  const execProgramerPath = path.join(
    AppPath,
    `static/libs/libwebp/${platform}_${arch}/bin/${execName}`,
  );

  // 使用程序执行命令 dwebp input.webp -o output.png
  const fileBaseDir = path.dirname(filePath);
  const fileNameWithoutExt = path.basename(filePath, path.extname(filePath));
  const outDirPath = `${fileBaseDir}/png`;
  if (!fs.existsSync(outDirPath)) {
    fs.mkdirSync(outDirPath, { recursive: true });
  }
  const outFilePath = `${outDirPath}/${fileNameWithoutExt}.png`;
  const execCommand = `${execProgramerPath} "${filePath}" -o "${outFilePath}"`;
  console.log(execCommand, 'event-handlers.ts::126行');
  const result = await new Promise<any>((resolve) => {
    exec(execCommand, {}, (error, stdout, stderr) => {
      let _data = { result: false, resultPath: '' };
      if (error) {
        console.error(`脚本执行出错: ${error.message}`);
        resolve(_data);
        return;
      }
      if (stderr) {
        console.error(`脚本错误输出: ${stderr}`);
        resolve({ result: true, resultPath: outFilePath });
        return;
      }
      console.log(`脚本输出: ${stdout}`);
      resolve({ result: true, resultPath: outFilePath });
      return;
    });
  });
  return result;
}
```

## 总结

1. 主进程返回的时候，不止要返回结果，最好一并返回转码后的路径，方便前端可以用来打开所在文件夹（所以即使当前不考虑实现这个功能，对象形式的结果也是优于简单类型或是数组的）
2. 可以将阶段性的变量抽离，并命名，这样最后的拼接表达式会比较短，而且阶段性的命名利于分步调试打印，也便于返回对应字段结果，比如转码后返回的结果的 filePath

## 可能优化的点

- 当传入的文件是非 webp 格式的文件时，需要过滤掉不传给主进程进行转换
- 当前的通信方式还是略显不足，比如缺少发送一条指令，用 watch 持续性地监听执行的结果，比如这里如果要返回且显示转码的进度的话

## 扩展链接

- [google dwebp 文档](https://developers.google.com/speed/webp?hl=zh-cn)
- [google webp 下载地址](https://developers.google.com/speed/webp/docs/precompiled?hl=zh-cn)
