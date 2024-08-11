# MSE 媒体源扩展

> Media Source Extensions API，媒体源扩展 API（MSE），支持使用 fetch 拉取数据 buffer 进行分片的音频或视频的加载和播放。
> 当前已知的支持的 mp4 格式是 DASH，对普通的视频可以使用 ffmpeg 进行转码

### 示例预览

- web 侧代码：<a href="https://github.com/haokur/test/tree/main/web" target="_blank">haokur/test/tree/main/web</a>
- serve 侧代码：<a href="https://github.com/haokur/test/tree/main/koa-serve" target="_blank">haokur/test/tree/main/koa-serve</a>

### 前端视频分片传输使用 Media Source

1. new MediaSource 实例化 =》 mediaSourceInstance
2. 将 mediaSourceInstance 使用 URL.createObjectURL 转 blob 地址，video 的 src 设置为这个 blob 地址
3. mediaSourceInstance 监听 sourceopen , 回调事件使用 addSourceBuffer 生成 sourceBuffer,sourceBuffer 监听 updateend 和 error 事件
4. updateend 事件处理在一个分片 buffer 加载成功后的回调，可以继续加载下一片 buffer，直到分片 buffer 全部加载完毕，mediaSourceInstance.endOfStream() 关闭数据流

### 抽离封装 MediaSource 类

```typescript
export class MediaSourcePlayer {
  videoUrl;
  blobUrl: string = '';
  start = 0;
  chunkIndex = 0;
  chunkSize = 1 * 1024 * 1024;
  videoType = '';
  mediaSource;
  sourceBuffer;
  fileSize = 0;
  isAllLoaded = false;
  onError;
  onEnd;

  constructor(options) {
    const defaultType = 'video/mp4; codecs="avc1.42E01E, mp4a.40.2"';
    const {
      videoUrl,
      chunkSize = 1 * 1024 * 1024,
      type = defaultType,
      onError,
      onEnd,
      onUpdateEnd,
    } = options;
    this.videoUrl = videoUrl;
    this.chunkSize = chunkSize;
    this.videoType = type;
    this.onError =
      onError ||
      ((err) => {
        console.log(err);
      });
    this.onEnd = onEnd || this.end;
    this.onUpdateEnd = onUpdateEnd || this.onUpdateEnd;
    this.init();
  }

  init() {
    this.mediaSource = new MediaSource();
    this.blobUrl = URL.createObjectURL(this.mediaSource);

    this.mediaSource.addEventListener('sourceopen', async () => {
      this.sourceBuffer = this.mediaSource.addSourceBuffer(this.videoType);

      this.sourceBuffer.addEventListener('updateend', () => {
        this.onUpdateEnd();
      });
      this.sourceBuffer.addEventListener('error', this.onError);
    });
  }

  run() {
    this.insertSourceByChunkIndex(this.chunkIndex);
  }

  end() {
    this.mediaSource.endOfStream();
  }

  async onUpdateEnd() {
    if (this.isAllLoaded) {
      return this.onEnd();
    }
    await this.insertNextSlice();
  }

  async insertNextSlice() {
    if (this.isAllLoaded) {
      return this.onEnd();
    }
    this.chunkIndex++;
    await this.insertSourceByChunkIndex(this.chunkIndex);
  }

  // 根据chunkSize获取开始和结束位置,从0开始
  getRangByChunkIndex(index) {
    console.log('加载资源索引://///', index, 'index.html::128行');
    return [index * this.chunkSize, (index + 1) * this.chunkSize - 1];
  }

  // 插入
  async insertSourceByChunkIndex(chunkIndex) {
    const [start, end] = this.getRangByChunkIndex(chunkIndex);
    const data = await this.fetchSliceData(start, end);
    this.appendBuffer(data);
  }

  // 插入切片播放内容
  async loadAndInsertSlicePlaySource(start, end) {
    const buffer = await this.fetchSliceData(start, end);
    this.appendBuffer(buffer);
  }

  async fetchSliceData(start, end) {
    if (this.isAllLoaded) return;
    let response;
    let contentLength;
    if (typeof this.videoUrl === 'string') {
      response = await fetch(this.videoUrl, {
        headers: { Range: `bytes=${start}-${end}` },
      });
      contentLength = response.headers.get('Content-Length');
    } else if (typeof this.videoUrl === 'function') {
      response = await this.videoUrl({
        headers: { Range: `bytes=${start}-${end}` },
      });
      contentLength = response.headers['content-length'];
    }
    if (!contentLength || +contentLength < this.chunkSize) {
      this.isAllLoaded = true;
    }
    const data = response.data || (await response.arrayBuffer());
    return data;
  }

  appendBuffer(data) {
    this.sourceBuffer.appendBuffer(data);
  }
}
```

使用示例：

```typescript
const playMediaSourceVideo = () => {
  const sliceMediaSourcePlayer = new MediaSourcePlayer({
    // videoUrl: 'https://localhost:9000/video',
    videoUrl: async (config) => {
      // @ts-ignore (define in dts)
      const res = await window.api.https({
        hostname: 'localhost', // 注意这里，前面不要加https
        port: 9099, // 默认 HTTPS 端口
        path: '/video', // 请求路径
        method: 'GET', // 请求方法
        headers: config.headers,
      });
      return res;
    },
    async onUpdateEnd() {
      console.log('自定义单分片加载完毕回调');
      // 加载下一个分片
      await sliceMediaSourcePlayer.insertNextSlice();
    },
    async onEnd() {
      console.log('所有分片加载完毕回调');
      await sliceMediaSourcePlayer.end();
    },
  });
  const video = document.getElementById('video-player') as HTMLVideoElement;
  video.src = sliceMediaSourcePlayer.blobUrl;
  sliceMediaSourcePlayer.run();
};
```

- blobUrl，MediaSourcePlayer 实例化后生成的用于视频播放的 blob 地址
- videoUrl，可为一个提供数据的接口地址，也可为一个具体的请求数据的方法，返回 `{data:bufferData,headers:{}}`
- onUpdateEnd，为单片处理完后的回调，可以用来执行下一段分片的加载，不定义则默认是加载下一个分片，直到所有分片加载完毕
- onEnd，所有分片加载完毕的回调，不定义则默认是关闭视频流（endOfStream），不能继续添加视频分片流
- run，是开始加载第一片（chunkIndex=0）视频数据流
- insertNextSlice，基于当前最后一片的索引，加载下一片分片
- chunkSize，单个分片的大小，默认为 1024\*1024（1M）

### ffmpeg 转码 DASH

```sh
ffmpeg -i input.mp4 -c:v libx264 -c:a aac -movflags +frag_keyframe+empty_moov+default_base_moof -f mp4 output_dash.mp4
```

参数说明：

```
-i input.mp4: 输入的 MP4 文件。

-c:v libx264: 使用 H.264 编码器进行视频编码。

-c:a aac: 使用 AAC 编码器进行音频编码。

-movflags +frag_keyframe+empty_moov+default_base_moof:

+frag_keyframe: 在关键帧处创建片段，确保每个片段以关键帧开始。
+empty_moov: 在文件开头生成一个空的 moov 块，这对于流媒体播放非常重要。
+default_base_moof: 使用默认的 moof 基准，这有助于确保片段正确排列。
-f mp4: 指定输出格式为 MP4。

output_dash.mp4: 输出的 MP4 文件名。
```

### 注意

- 分片的 start 是 0 开始的，文件的 size 大小是从 1 开始的，所以分片的 end 的最大值，应该是 fileSize-1；分片的 start 是 0，end 则是 1024\*1024-1=1048575
- 随意打乱顺序加载和插入 buffer 数据，并不能实现播放
- 在分片全部加载完毕后，需要使用 end 来触发 endOfStream 的执行，才会正常显示视频时间，和播放完毕之后不会还有一个加载提示器

### 扩展资料

- <a href="https://developer.mozilla.org/zh-CN/docs/Web/API/Media_Source_Extensions_API" target="_blank">MDN MSE API 解析</a>
- <a href="https://developer.mozilla.org/en-US/docs/Web/API/Media_Source_Extensions_API/Transcoding_assets_for_MSE" target="_blank">资源转码以支持 MSE</a>
