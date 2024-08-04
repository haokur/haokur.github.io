// Command Interface with Logging
interface Command {
  execute(): void;
  log(): string; // 添加日志记录方法
}

class Light {
  turnOn() {
    console.log('开灯');
  }
}

// Concrete Command with Logging
class LightOnCommand implements Command {
  private light: Light;
  private timestamp: Date;

  constructor(light: Light) {
    this.light = light;
    this.timestamp = new Date();
  }

  execute() {
    this.light.turnOn();
  }

  log() {
    return `Light turned on at ${this.timestamp.toLocaleString()}`;
  }
}

// Invoker with Logging
class RemoteControl {
  private history: string[] = [];

  setCommand(command: Command) {
    command.execute();
    this.history.push(command.log()); // 记录日志
  }

  getHistory() {
    return this.history;
  }
}

// Usage
const light = new Light();
const lightOnCommand = new LightOnCommand(light);
const remoteControl = new RemoteControl();
remoteControl.setCommand(lightOnCommand);

console.log(remoteControl.getHistory()); // 打印日志记录
