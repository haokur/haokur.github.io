# Js 异步队列并发

### 一、预览体验

- 源码实现（koa）：[koa-server/client/classes/MultiChannel.ts at main · haokur/koa-server (github.com)](https://github.com/haokur/koa-server/blob/main/client/classes/MultiChannel.ts)
- 在线 DEMO：[Vue3-client (haokur.github.io)](https://haokur.github.io/koa-server/#/slice-worker)

> javascript 是单线程，但是在一些场景下如发送请求，如使用 web-worker，可以实现类并发效果，同时发送多个请求，或者同时处理动作

### 二、webWorker 的使用

宿主使用 new Worker 的方式来创建一个 js 执行线程，可传入本地的路径或远程 http 的路径的 js 文件。宿主和 worker 通信，发消息都使用 postMessage，收消息使用 onmessage

考虑到宿主与子线程之间的交互，通常为，宿主发起一个指令，子线程收到指令，然后执行完对应指令操作，然后 postMessage 告知宿主，这个过程是一个链路，且通常每个环节仅进行一次，那么为了操作方便，可以使用发布订阅的模式封装一层，让宿主调用 worker 的过程，看起来就像一个普通的异步请求

使用如下：

```typescript
const workerHelper = new WorkerHelper('./test-worker.js');

async function handleClick() {
  let result = await workerHelper.postMesage({
    action: 'sliceFile',
    data: {
      start: 0,
      end: 1024,
      file: file,
    },
  });
  console.log(result); // 为子线程 test-worker.js 执行后的结果
}
```

则 WorkerHelper 的实现如下：

```typescript
function generateUniqueId() {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

export class WorkerHelper {
  resolves;
  worker: Worker;

  constructor(workUrl) {
    this.worker = new Worker(workUrl);

    this.worker.onmessage = this.handleMessage.bind(this);
    this.worker.onerror = this.handlerError.bind(this);

    this.resolves = new Map();
  }

  handleMessage(ev) {
    const { _id, payload } = ev.data;
    if (this.resolves.has(_id)) {
      const resolve = this.resolves.get(_id);
      resolve(payload);
      this.resolves.delete(_id);
    }
  }

  handlerError(error) {
    console.log('webworker error', error);
  }

  postMessage(payload) {
    return new Promise((resolve) => {
      const _id = generateUniqueId();
      const _data = { _id, payload };
      this.worker.postMessage(_data);
      this.resolves.set(_id, resolve);
    });
  }
}
```

注意，在需要打包的项目中，WorkerHelper 传入的地址，可能会因为打包而出现找不到对应的文件的问题

解决方案可以有，例如在 vite 的项目中，设置 build 下的 copyPublicDir 的值为 true，则会将 public 文件夹的文件，都复制到打包目录的根目录，至于引入时的路径在开发和生产打包后会有区别，则可以在环境变量里配置开发和生产不同的地址查找方式

### 三、并发异步队列

比如在对文件进行分片上传下载时，需要同时发送多个分片，在分片传输完成后，立马补上下一个分片文件提交，即比如设置同时最多 8 个请求，文件分片有 20 个，那么当 8 个中有一个分片是上传完成，那么就从剩下 12 个里面，取一个新的分片补上，8 个请求满载到整个文件全部上传完成。

```typescript
/**单个通道的状态 */
enum ChannelStatus {
  Free = 0,
  Running = 1,
  Finished = 2,
}

/**单个通道 */
interface IChannelItem {
  index: number;
  status: ChannelStatus;
  channelInstance: any;
}

/**单个任务的状态 */
enum TaskStatus {
  Wait = 0,
  Running = 1,
  Finished = 2,
}
/**单个任务 */
interface ITask {
  task: any;
  callback: (...args: any[]) => Promise<any>;
  status: TaskStatus;
}

interface ITaskCallback<T> {
  (task: T, channel: IChannelItem): Promise<void>;
}

/**多管道并发 */
export class MultiChannel {
  channels: IChannelItem[] = [];
  tasks: ITask[] = [];
  channelMaxNum = 0;
  channelInit: any;
  private finishCallback: any;
  private isPause = false; // 暂停状态

  constructor(channelMaxNum, channelInit?) {
    this.channelMaxNum = channelMaxNum;
    this.channelInit = channelInit;
  }

  // 设置整个完成的回调
  onFinished(callback) {
    this.finishCallback = callback;
    return this;
  }

  addTask<T>(task: T, callback: ITaskCallback<T>) {
    this.tasks.push({
      task,
      callback,
      status: TaskStatus.Wait,
    });
    return this;
  }

  // 添加多个任务，在各个channel中，自动填充
  addManyTask<T>(tasks: T[], callback: ITaskCallback<T>) {
    this.tasks = tasks.map((task) => {
      return {
        task,
        callback,
        status: TaskStatus.Wait,
      };
    });
    return this;
  }

  // 检查通道，是否可以再创建
  private checkChannel() {
    // 如果通道数已经到了上限，直接返回
    const channelLength = this.channels.length;
    if (channelLength >= this.channelMaxNum) return;
    // 如果通道数小于任务数，看是否能够再创建通道
    if (this.channels.length < this.tasks.length) {
      const availableChannelNum = Math.min(
        this.tasks.length,
        this.channelMaxNum,
      );
      for (let i = this.channels.length; i < availableChannelNum; i++) {
        this.channels.push({
          index: i,
          status: ChannelStatus.Free,
          channelInstance: this.channelInit ? this.channelInit() : null,
        });
      }
    }
  }

  private runTask() {
    if (this.isPause) return;
    this.checkChannel();
    // 如果任务执行全部执行完成，即所有的通道都为空闲，且任务为空，则返回
    if (
      !this.tasks.length &&
      this.channels.every((item) => item.status === ChannelStatus.Free)
    ) {
      this.finishCallback && this.finishCallback();
    }

    // 启用通道执行任务
    this.channels.forEach((channel) => {
      // 当这个渠道的状态为可用，则取出任务执行
      if (channel.status === ChannelStatus.Free && this.tasks.length) {
        channel.status = ChannelStatus.Running;

        const currentTask = this.tasks.shift() as ITask;
        const { callback, task } = currentTask;
        currentTask.status = TaskStatus.Running;
        // console.log(`通道${channel.index}处理${currentTask.index}的数据`, 'MultiChannel.ts::100行');

        callback(task, channel).then(() => {
          channel.status = ChannelStatus.Free;
          currentTask.status = TaskStatus.Finished;

          this.runTask();
        });
      }
    });
  }

  // 开始执行
  run() {
    this.isPause = false;
    this.runTask();
    return this;
  }

  // 暂停执行
  pause() {
    this.isPause = true;
    return this;
  }

  // 清除
  clear() {
    this.isPause = true;
    this.tasks = [];
    this.channels = [];
    return this;
  }
}
```

其中主要逻辑核心在于：

- addTask，添加任务，第二个参数是任务的回调即任务真正的执行时调用的方法，即对于每一个添加的任务，其回调都是可以不一样的
- addTaskMany，任务合集可以用 addTaskMany 一次性添加，使用这个方法添加任务时，添加的任务的回调都是同一个方法，任务参数会不同
- runTask，执行时，首先去获取当前工作中和将要工作的任务组成队列，然后遍历整个队列， 对于等待执行的任务，开始执行。直到其中一个任务成功，继续回调 runTask，组成新的要运行的队列，直到队列为空

注意：

以上队列完成的先后顺序是不固定的，所以索引应该在传入的 tasks 列表中维护，runTask 中将整个数据传递给 callback，callback 从整个数据里拿这个索引值以编排队列执行的结果的顺序。

使用时

```typescript
const wait = async (duration) => {
  return new Promise<void>((resolve, reject) => {
    setTimeout(() => {
      resolve();
    }, duration);
  });
};
const queue = new MultiChannel(4, () => {});
queue.addManyTask(
  [
    { start: 1, end: 10, index: 0 },
    { start: 11, end: 20, index: 1 },
    { start: 11, end: 20, index: 2 },
    { start: 11, end: 20, index: 3 },
    { start: 11, end: 20, index: 4 },
    { start: 11, end: 20, index: 5 },
  ],
  async (data, channel) => {
    console.log(data, 'index.vue::30行');
    await wait(3000);
  },
);
queue.run();
queue
  .pause()
  .addTask({ start: 99, end: 111, index: 6 }, async (...args) => {
    console.log(args, 'index.vue::45行');
  })
  .run();
```

如上，在 run 时会执行任务，虽然后面紧跟着 pause，pause 不会阻止已经发出的请求或执行的任务，只能阻止未发生的任务，然后可以调用 addTask 或者 addManyTask 在任务队列后面添加任务

由于分片需要消耗性能，需要等待时间，特别是文件较多较大时，使用 slice 会阻塞渲染进程，可以考虑使用 webworker 来进行 slice，而 slice 的数量可能远大于 webworker 数量。可以考虑多开几个 webworker 来，而开多少个 webworker 由 channelMaxNum 来决定，而用 channelInit 来实例化管理的把守着，这个把守着会传入到任务执行时。

channelInit 参数就类似于，比如入城有 8 个入口，

不设置 channelInit 时，就是无人把守的城门口，每个人可以挑拣哪个是没人的城门口进入；

而设置了 channelInit 时，则是有人把守的城门，每个人进入哪个城门是有不同的人把守，这个把守的人和入城的人，配合完成入城的任务。

这里比如把门的是 webworker，那么可以就如下：

```typescript
const channel = new MultiChannel(workerNum, () => {
  return new WorkerHelper(`${$env.workerBaseUrl}/slice-helper.js`);
})
  .onFinished(() => {
    channel.clear();
  })
  .addManyTask(allTasks, async (taskData, channel) => {
    const instance = channel.channelInstance;
    const { start, end } = taskData;
    let result = await instance.postMessage({
      action: 'sliceFile',
      file: file,
      start,
      end,
    });
    chunkDataArr.push(result);
  })
  .run();
```
