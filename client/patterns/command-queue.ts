// Command Interface
interface Command {
  execute(): void;
  undo(): void; // 添加撤销方法
}

// Concrete Command
class LightOnCommand3 implements Command {
  private light: Light3;

  constructor(light: Light3) {
    this.light = light;
  }

  execute() {
    this.light.turnOn();
  }

  undo() {
    this.light.turnOff(); // 撤销操作，关灯
  }
}

// Receiver
class Light3 {
  private isOn: boolean = false;

  turnOn() {
    this.isOn = true;
    console.log('Light is on');
  }

  turnOff() {
    this.isOn = false;
    console.log('Light is off');
  }
}

// Invoker with Queue
class RemoteControl3 {
  private commandQueue: Command[] = [];

  queueCommand(command: Command) {
    this.commandQueue.push(command);
    command.execute();
  }

  executeQueue() {
    this.commandQueue.forEach((command) => command.execute());
    this.commandQueue = []; // 清空队列
  }
}

// Usage
const light3 = new Light3();
const lightOnCommand3 = new LightOnCommand3(light3);
const lightOffCommand = new LightOnCommand3(light3); // 假设有关灯的命令

const remoteControl3 = new RemoteControl3();
remoteControl3.queueCommand(lightOnCommand3);
remoteControl3.queueCommand(lightOffCommand);
remoteControl3.executeQueue(); // 依次执行队列中的命令
