// Command Interface
interface Command {
  execute(): void;
  undo(): void; // 添加撤销方法
}

// Concrete Command
class LightOnCommand implements Command {
  private light: Light2;

  constructor(light: Light2) {
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
class Light2 {
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

// Invoker with Undo Capability
class RemoteControl {
  private history: Command[] = [];

  setCommand(command: Command) {
    this.history.push(command);
    command.execute();
  }

  undo() {
    if (this.history.length > 0) {
      const lastCommand = this.history.pop();
      if (lastCommand) {
        lastCommand.undo();
      }
    } else {
      console.log('Nothing to undo');
    }
  }
}

// Usage
const light2 = new Light2();
const lightOnCommand = new LightOnCommand(light2);
const remoteControl = new RemoteControl();
remoteControl.setCommand(lightOnCommand); // 打开灯
remoteControl.undo(); // 关闭灯，撤销操作
