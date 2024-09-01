# electron 通信和更新

## 源码

- [electron-starter](https://github.com/haokur/electron-starter)

## 通信使用

![通信过程](https://static.haokur.com/github/electron-message.png)

主要从 on，emit，off 的方式转化为回调方式的方式，自动 off 关闭监听，使调用流程更线性直观

```typescript
import ipcHelperUtil from '../utils/ipc-helper.util';

// 单次执行并结束
function handleOpenDevtool() {
  ipcHelperUtil.ipcRun('toggleDevTools', {}, (result) => {
    console.log(result, '切换成功');
  });
}

// 执行并持续监听消息响应
function watchAutoUpdateInfo() {
  ipcHelperUtil.ipcWatch('watchAutoUpdateInfo', {}, (res) => {
    const { event, data } = res;
    console.log(res, 'Home.vue::64行');
  });
}

// src/renderer/events/event-handler.ts 提供方法 main 进程直接调用
export function showNotice(result) {
  ElMessage(result);
}
```

## 实现核心

一个动作一条信息，给一个 actionId，通过这个 actionId 来定位绑定到初始化时的回调方法，main 进程处理也会携带这个 actionId 进行处理，以及响应返回，全程以 actionId 为匹配关系，而不是 ipc 的 event，而这个过程封装在 renderer 的 emit 和 main 的 ipc 的 on 监听中

- renderer 进程

```typescript
function ipcRun(action: EventAction, options = {}, callback?) {
  if (!isInitFlag) _initEventListener();
  const actionId = uuidv4();
  listenerMap[actionId] = (...args) => {
    callback && callback(...args);
    return true; // 返回true，用来标识可以删除事件，仅监听一次
  };
  $electron.$emit(action, { ...options, actionId });
}
```

- main 进程

```typescript
// 监听从preload传递的消息
ipcMain.on('preload', async (event, action, options) => {
  if (!action) {
    throw '请传入action参数';
  }
  if (action && eventHandlerFuncs[action]) {
    try {
      const senderWebContents = event.sender;
      const senderWindow = BrowserWindow.fromWebContents(senderWebContents);
      let result = await eventHandlerFuncs[action](options, senderWindow);
      senderWebContents.send('replyRenderer', {
        action,
        result: data,
        actionId: options.actionId,
      });
    } catch (error) {
      console.log(error);
    }
  } else {
    throw `action为${action},未找到该action的方法,请检查`;
  }
});
```

## 下载更新

### 主进程提供四个方法

```typescript
export function watchAutoUpdateInfo() {
  return (send) => {
    initVersionUpdater(send);
  };
}

// 检查更新
export function checkUpdateInfo() {
  checkAppVersion();
}

// 确认下载更新
export function downloadLatestApp() {
  downloadAppNow();
}

// 安装更新
export function installLatestApp() {
  installAppNow();
}
```

### renderer 使用 ipcWatch 监听更新消息

```typescript
function watchAutoUpdateInfo() {
  ipcHelperUtil.ipcWatch('watchAutoUpdateInfo', {}, (res) => {
    const { event, data } = res;
    switch (event) {
      case 'update-available':
        console.log('有更新可用');
        break;
      case 'download-progress':
        console.log('更新下载的进度条更新');
        break;
      case 'update-downloaded':
        console.log('更新包下载完毕');
        break;
      default:
        break;
    }
  });
}

// 检查是否有最新的安装包
function checkUpdate() {
  ipcHelperUtil.ipcRun('checkUpdateInfo');
}

// 开始下载安装包
function downloadUpdateNow() {
  ipcHelperUtil.ipcRun('downloadLatestApp');
}

// 开始安装安装包
function installLatestApp() {
  ipcHelperUtil.ipcRun('installLatestApp');
}

onMounted(() => {
  watchAutoUpdateInfo();
});
```

注意点：

- 初始化时，要设置自动下载为 false，否则会自动下载

```typescript
const updaterFeedUrl = isDevelopment
  ? 'http://192.168.1.103:8081/'
  : 'https://xxxxx/';

autoUpdater.setFeedURL(updaterFeedUrl);
autoUpdater.autoDownload = false;
```

- autoUpdater 的事件监听只需要初始化一次，回应的消息会是多条，需要 renderer 使用 ipcWatch 持续监听
- mac 的自动更新安装，需要签名，没签名的不能自动安装
