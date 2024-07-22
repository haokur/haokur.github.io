// 灯
class Light {
  lightStatus: 'on' | 'off' = 'on';

  toggle() {
    this.lightStatus = this.lightStatus === 'on' ? 'off' : 'on';
    console.log('灯的状态：', this.lightStatus);
  }
}

// 通用开关-execute
interface ICommand {
  execute(): void;
}
// 灯的开关
class lightCommand implements ICommand {
  private light: Light;

  constructor(light: Light) {
    this.light = light;
  }

  execute(): void {
    this.light.toggle();
  }
}

// 人
class User {
  private command: ICommand | null = null;

  setCommand(command: ICommand) {
    this.command = command;
  }

  pressButton() {
    if (this.command) {
      this.command.execute();
    } else {
      throw '找不到command';
    }
  }
}

const user = new User();
const light = new Light();
user.setCommand(new lightCommand(light));
user.pressButton();
