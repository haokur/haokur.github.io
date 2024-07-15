# 文件分片上传下载

### 预览体验

- 源码实现（koa）：<a href="https://github.com/haokur/koa-server/blob/main/src/controllers/file.controller.ts" target="_blank">koa-server/src/controllers/file.controller.ts</a>
- 源码实现（Vue3）：<a href="https://github.com/haokur/koa-server/blob/main/client/pages/upload/upload.vue" target="_blank">client/pages/upload/upload.vue</a>
- 在线 DEMO：<a href="https://haokur.github.io/koa-server/#/upload" target="_blank">Vue3-client </a>
  [Vue3-client (haokur.github.io)]()

### 上传

> 前端 slice 切割，服务端合并
>
> 核心在于前端，告诉后端当前是哪一段，以及这一段的数据

Html 中添加 input 为 file 的控件

```html
<input type="file" @change="handleFileChange" />
```

js 中添加对 input 的 file 变化的响应

```javascript
const chunkSize = 1 * 1024 * 1024;

const chunkStatus = [];
const chunkFinished = [];
const handleFileChange = (ev) => {
  const file = ev.target.files[0];
  const fileSize = file.size;
  const fileName = file.name;

  // 切割成块
  const totalChunk = Math.ceil(fileSize / chunkSize);
  const chunkStatus = Array.from({ length: totalChunk }, (_, index) => {
    return {
      index: index,
      start: index * chunkSize,
      end: Math.min((index + 1) * chunkSize, fileSize),
      status: 0,
    };
  });

  // 按块提交
  chunkStatus.forEach((item) => {
    const { start, end, index } = item;
    const formData = new FormData();
    const blob = file.slice(start, end);
    formData.append('file', blob);

    axios
      .post(
        `upload?chunkIndex=${index}&chunkTotal=${totalChunk}&fileName=${fileName}`,
        formData,
      )
      .then((res) => {
        chunkFinishedCallback(res, item);
      });
  });

  // 单次请求回调
  const chunkFinishedCallback = (res, item) => {
    chunkFinished.push(item);
    if (chunkFinished.length === chunkStatus.length) {
      console.log('全部上传完成', res.data.url);
    }
  };
};
```

以上是前端分片上传的基础实现，还可以优化的点是：

- 前端获取文件的 MD5 值且传递，如果存在同 md5 的文件，跳过上传返回对应文件
- 在上传时，假如分片过多，则需要用个队列控制并发数量

服务端接收：

```typescript
const uploadMap = {};

uploadMap[fileName] = uploadMap[fileName] || new Set();

const { fileName, index, totalChunk } = params;
const stream = fs.writeSync(
  `_temp/${fileName}/${index}.temp`,
  ctx.request.files.file,
);
uploadMap[fileName].add(index);

// 如果是最后一块,拼接，返回拼接后地址
if (uploadMap[fileName].size === totalChunk - 1) {
  const writeStream = fs.createWriteStream(`_temp/${fileName}`);
  for (var i = 0; i < totalChunk; i++) {
    const data = fs.readFileSync(`_temp/${fileName}/${i}.temp`);
    writeStream.write(data);
  }
  ctx.body = `_temp/${fileName}/${i}.temp`;
}
```

以上是服务端的简化逻辑，创建对应 fileName 的临时目录，按索引分别存储片段，当片段数和总数相等时，则按顺序拼接，拼接完后返回文件地址。

优化点：

- 将同步读取 readFileSync 和同步写入 writeSync 改成异步处理
- 处理前端的 fileName 输入，避免 fileName 中的 ../../ 的方式，操作了其他不允许操作的文件

### 下载

> 前端根据文件 size 和 chunkSize 请求服务端切割，服务端切割返回，前端合并
>
> 核心在于告诉服务端，前端需要哪一段的数据

先使用 Head 的请求方式获取到文件的 size 大小，再按 chunkSize 切割 size 大小，即每段分片的开始位置和结束位置，将参数拼接请求后端，后端返回对应片段的数据，前端判断所有的片段集齐，开始拼接，并创建下载链接。这种方式更加灵活，前端可以自由切割，而且方便中断，重启部分片段的下载，可并发片段下载。

前端实现：

```typescript
const url = `download?fileName=xxxxx.png`;

// 先试用HEAD方式仅获取文件大小
const response = await axios.head(url);
const contentLength: any = response.headers['content-length'] || '0';
const totalSize = parseInt(contentLength);

// 按size和chunkSize进行分段
let prevEndSize = -1;
let index = 0;
let chunkRanges = [];
while (prevEndSize < totalSize) {
  const startSizeIndex = prevEndSize + 1;
  const endSizeIndex = prevEndSize + currentDownloadObj.chunkSize;
  chunkRanges.push({
    start: startSizeIndex,
    end: endSizeIndex,
    status: 0,
    index,
  });
  prevEndSize = endSizeIndex;
  index++;
}

// 发起请求下载
const chunksData = [];
chunkRanges.forEach((item, index) => {
  const response = axios
    .get(url, {
      headers: {
        Range: `bytes=${start}-${end}`,
      },
    })
    .then((res) => {
      chunksData[index] = res;
    });
});

// 每次请求之后检查是否数据是否已完备
const checkChunkData = () => {
  if (chunksData.length === chunkRanges.length) {
    // 开始拼接数据，并生成链接
    const blob = new Blob(chunksData);
    const downloadUrl = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = downloadUrl;
    a.download = 'downloaded_file.png';
    document.body.appendChild(a);
    a.click();
    URL.revokeObjectURL(downloadUrl);
  }
};
```

后端实现：

```typescript
async function FileDownload(params, ctx) {
  const { fileName } = params;
  const filePath = path.resolve(UPLOAD_DIR, `${fileName}`);

  if (ctx.request.method === 'HEAD') {
    if (fs.existsSync(filePath)) {
      const { size } = fs.statSync(filePath);
      return {
        headers: {
          'Content-Length': size,
        },
      };
    } else {
      return '404';
    }
  } else {
    const { range } = ctx.request.header;

    const parts = range.replace(/bytes=/, '').split('-');
    const partialStart = parts[0];
    const partialEnd = parts[1];

    const start = parseInt(partialStart, 10);
    const end = parseInt(partialEnd, 10);

    const file = fs.createReadStream(filePath, { start, end });
    ctx.status = 206;

    return {
      headers: { 'Content-Type': 'application/octet-stream' },
      body: file,
      statusCode: 206,
    };
  }
}
```

### 注意点

在分片的时候，位置不要有重叠，如切片的片段应该是 [ [1,3],[4,6]] ，而不是 [[1,3],[3,5]]
