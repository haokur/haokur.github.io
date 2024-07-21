# ffmpeg 的使用

### 名词解释

- HLS（HTTP Live Streaming），HTTP 实时流媒体，使用 .m3u8 索引文件和 .ts 文件（苹果公司）
- RTMP（Real-Time Messaging Protocol）,实时流媒体传输协议（ Adobe Flash 中传输音频、视频和数据。它使用 TCP 进行传输，支持低延迟的实时流媒体传输）
- RTSP（Real-Time Streaming Protocol），网络控制协议，用于控制多媒体服务器发送流媒体数据。它通常与 RTP（Real-Time Transport Protocol）结合使用，RTP 用于实际传输音频和视频数据
- DASH（Dynamic Adaptive Streaming over HTTP），由 MPEG 开发的一种动态自适应流媒体传输协议，支持多种编解码器和容器格式，能够在不同的带宽和设备条件下动态调整视频质量

### 下载使用

- mac 下载 https://evermeet.cx/ffmpeg/ffmpeg-7.0.1.7z
- 解压后，将 ffmpeg 可执行文件，复制到 /usr/local/ffmpeg 文件夹（没有这个文件夹则新建一个）下
- 配置环境变量，vi ~/.zshrc
- 添加命令 export PATH=/usr/local/ffmpeg/:$PATH
- 使命令行生效，source ~/.zshrc
- 测试是否成功，在命令行输入 ffmpeg help
- window,linux 同理，下载后配置环境变量

### 一、常用 API 操作

1. 将视频按帧提取图片

```shell
ffmpeg -i test.mp4 -vf "fps=1" test/thumbnail_%04d.png
```

- -i 表示后一个值，是输入的资源
- -vf
- fps=1，表示一帧截取一张图片，60 秒视频则是 60 张图片，fps=2，则是 1 秒 2 张，fps=0.5，则是 2 秒 1 张，即 fps=图片数/总视频时长
- thumbnail\_%04d.png：输出图像文件名模式。%04d 表示用四位数字表示的序号。

假如想要提取帧图片以时间戳命名，则可以使用以下命令

```shell
ffmpeg -i input_video.mp4 -vf "fps=1" -strftime 1 output_%H%M%S.png
```

- %H%M%S 表示时分秒

2. 剥离视频和音频

剥离音频

```shell
ffmpeg -i test.mp4 -vn -acodec copy output_audio.aac
```

- -vn，表示不包含视频流。
- -acodec copy，表示音频编解码器选择复制原始编解码器

剥离视频

```shell
ffmpeg -i test.mp4 -an -vcodec copy output_video.mp4
```

- -an，表示不包含音频流
- -vcodec copy，表示视频编解码器选择复制原始编解码器

3. 视频格式转换

如 flv 转 mp4

```shell
ffmpeg -i input.flv -c:v copy -c:a aac -strict experimental output.mp4
```

- i input.flv：指定输入文件名为 input.flv，这是您要转换的 FLV 文件。
- c:v copy：表示视频流进行直接拷贝，即不重新编码视频流，保持原始编码方式。
- c:a aac -strict experimental：表示音频流使用 AAC 编码，并设置编码为实验性质，确保兼容性。
- output.mp4：指定输出文件名为 output.mp4，这是转换后的 MP4 文件。

mp4 转 flv

```shell
ffmpeg -i output_000.mp4 -c:v copy -c:a copy output.flv
```

4. 将文件转为 m3u8

```shell
ffmpeg -i where.mp4 -c:v libx264 -c:a aac -hls_time 10 -hls_list_size 6 -hls_flags delete_segments your_output.m3u8
```

- -c:v libx264，视频编码
- -c:a aac，音频编码
- -hls_time 10，单个分片的时长，这里意思是 10 秒一个分片（.ts 文件）
- -hls_list_size 6，分片数量，这里指分 6 片（要么通过总时长/单分片时长，计算出片数，要么可以不设置）
- -hls_flags delete_segments: 可选，指定在生成 .m3u8 文件时删除旧的分片文件。

生成的 your_output.m3u8 文件大致如下

```text
#EXTM3U
#EXT-X-VERSION:3
#EXT-X-TARGETDURATION:62
#EXT-X-MEDIA-SEQUENCE:0
#EXTINF:61.680000,
your_output0.ts
#EXTINF:59.240000,
your_output1.ts
#EXTINF:59.560000,
your_output2.ts
#EXTINF:25.880000,
your_output3.ts
#EXT-X-ENDLIST
```

使用 video.js 播放 m3u8 文件

```html
<!DOCTYPE html>
<html lang="">
  <head>
    <link
      href="https://unpkg.com/video.js/dist/video-js.css"
      rel="stylesheet"
    />
    <script src="https://unpkg.com/video.js/dist/video.js"></script>
  </head>
  <body>
    <video
      class="video-js vjs-default-skin vjs-big-play-centered"
      controls
      preload="auto"
      width="540"
      height="354"
      data-setup="{}"
    >
      <source
        src="./sources/test/your_output.m3u8"
        type="application/x-mpegURL"
      />
    </video>
  </body>
</html>
```

5. 将大视频切割成多个小视频

```shell
ffmpeg -i input.mp4 -c:v copy -c:a copy -map 0 -f segment -segment_time 30 -reset_timestamps 1 -g 30 output_%03d.mp4
```

- -c:v copy -c:a copy：表示视频流和音频流的编码格式保持原样复制，不重新编码
- -map 0：表示映射输入文件的所有流到输出文件
- -f segment：指定输出格式为分段文件，告诉 FFmpeg 将输出切割为多个片段
- -segment_time 30：设置每个分段的时长为 30 秒
- -reset_timestamps 1：重置时间戳，确保每个分段的时间戳从零开始，避免时间戳在分段之间不连续的问题
- -g 30：设置关键帧（GOP）的间隔为 30 帧。关键帧是视频流中可以单独解码的帧，设置合适的关键帧间隔可以确保分段之间的视频帧完整性和兼容性

6. 使用 MP4Box 打包成 DASH 格式

```shell
mp4box -dash 10000 -frag 1000 -rap -segment-name segment_.m4s -out dash_output.mpd keiyomi.mp4
```

### 链接

- [ffmpeg 官网下载](https://evermeet.cx/ffmpeg/)
- [测试视频下载地址](https://download.blender.org/demo/movies/BBB/)
- [video.js 官网](https://videojs.com/)
- [hls.js](https://github.com/video-dev/hls.js/)
- [flv.js](https://github.com/bilibili/flv.js)
- [dash.js 官网](https://reference.dashif.org/dash.js/latest/samples/index.html#GettingStarted)
- [GPAC 软件下载](https://gpac.io/downloads/gpac-nightly-builds/)
