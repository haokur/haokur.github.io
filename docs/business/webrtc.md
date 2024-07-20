# webrtc

### 一、预览

- [在线体验地址](https://haokur.github.io/webrtc-demos/)
- [websocket 的代码实现](https://github.com/haokur/koa-server/blob/main/src/controllers/webrtc-ws.controller.ts)
- [recorder 和 watcher 的代码实现](https://github.com/haokur/webrtc-demos)

### 二、recorder 端，将摄像头和录音机捕获的数据渲染到页面上

```html
<video id="local-video" autoplay playsinline></video>
```

注意其中的 autoplay ，不然视频会出不来

- playsinline，视频内嵌在页面上，而不是全屏播放

使用 js 获取到媒体

```javascript
let localStream;

navigator.mediaDevices
  .getUserMedia({ video: true, audio: true })
  .then((stream) => {
    const localVideo = document.getElementById('local-video');
    if (localVideo) {
      localVideo.srcObject = stream;
    }
    localStream = stream;
  });
```

以上就能将摄像头和录音机捕获的信息，实时渲染到 video 中了。

### 三、recorder 端，创建 peerConnection，生成 offer，添加 track

```javascript
const peerConnection = new RTCPeerConnection();

stream.getTracks().forEach((track) => {
  peerConnection.addTrack(track, stream);
});

// 生成offer
const offer = await peerConnection.createOffer({
  offerToReceiveAudio: 1,
  offerToReceiveVideo: 1,
});
// 设置本地 SDP
await peerConnection.setLocalDescription(offer);
// 发送 offer 给信令服务器（通常用websocket服务）
ws.send(
  JSON.stringify({ type: 'offer', offer: peerConnection.localDescription }),
);

// 监听信令服务器的消息（其他端回复的消息，offer的回复，candidate的回复
ws.onmessage = async (event) => {
  const message = JSON.parse(event.data);
  switch (message.type) {
    // 别的端接收到offer时的回答信息
    case 'answer':
      // 设置远程的 SDP
      await peerConnection.setRemoteDescription(
        new RTCSessionDescription(message.answer),
      );
      break;
    case 'candidate':
      // 处理远程的 ICE 候选
      await peerConnection.addIceCandidate(new RTCIceCandidate(candidate));
      break;
  }
};
```

### 四、watcher 端，监听 offer 信息（websocket）， candidate 信息（peerConnection），以及 track 事件（stream）

```javascript
let peerConnection;
ws.onmessage = async (event) => {
  const message = JSON.parse(event.data);
  switch (message.type) {
    case 'offer':
      // 创建 peer 连接
      peerConnection = new RTCPeerConnection();
      // 设置远程 SDP
      await peerConnection.setRemoteDescription(message.offer);
      // 创建对offer的answer SDP
      const answer = await peerConnection.createAnswer();
      // 本地存储answer SDP
      await peerConnection.setLocalDescription(answer);
      // 使用websocket答复给 recorder 端以 answer SDP
      ws.send(
        JSON.stringify({
          type: 'answer',
          answer: peerConnection.localDescription,
        }),
      );

      // 监听 ICE 候选信息(由peerConnection触发)，并发送给 recorder 端
      peerConnection.onicecandidate = (event) => {
        if (event.candidate) {
          ws.send(
            JSON.stringify({ type: 'candidate', candidate: event.candidate }),
          );
        }
      };

      // 监听远程流并将其添加到本地 video 元素中
      peerConnection.ontrack = (event) => {
        const remoteVideo = document.getElementById('remote-video');
        if (remoteVideo) {
          remoteVideo.srcObject = event.streams[0];
        }
      };
      break;
    default:
      break;
  }
};
```

以上就是简单的单向流的实现，其中主要通信流程是：

recorder 端生成 offer，通过 websocket（信令服务器），广播给其他 watcher，recorder 存储这个 offer 信息，并且监听信令服务器的 answer 和 candidate
watcher 收到 offer 消息，生成一个 answer，通过 websocket（信令服务器）传递给 recorder
recorder，watcher 存储这个 offer 信息和 answer 信息
recorder 接收到 watcher 的 answer 信息，存储为远程的信息，以上完成了 SDP 信息交换

watcher 端监听 onicecandidate 触发，得到 candidate 值，通过信令服务器转发给 recorder 端，recorder 设置 ICE 候选，完成了 ICE 候选通信对接
