---
group: 自动化
toc: content
---

# nodejs 执行命令

## 执行操作

### 1. 使用 spawn 执行

```javascript
const { spawn } = require('child_process');
const child = spawn('ping', ['baidu.com']);

child.stdout.on('data', (data) => {
  console.log(`标准输出: ${data}`);
});

child.stderr.on('data', (data) => {
  console.error(`标准错误: ${data}`);
});

child.on('close', (code) => {
  console.log(`子进程退出，退出码 ${code}`);
});
```

方法 1.在进入一个目录后执行命令

```javascript
const child = spawn('ls', ['-l'], {
  cwd: '/path/to/directory',
});
```

方法 2.使用 sh 和 cd 及 && 的方式

```javascript
const child = spawn('sh', ['-c', 'cd /path/to/directory && ls -l'], {
  shell: true,
});
```

> shell: true 选项（让 spawn 也能执行 Shell 命令）

### 2. 使用 exec

```javascript
const { exec } = require('child_process');

exec('ls -l', { cwd: '/path/to/directory' }, (error, stdout, stderr) => {
  if (error) {
    console.error(`执行错误: ${error.message}`);
    return;
  }
  console.log(`标准输出:\n${stdout}`);
});
```

使用 cd 的方式进入目录执行

```javascript
const { exec } = require('child_process');

exec('cd /path/to/directory && ls -l', (error, stdout, stderr) => {
  if (error) {
    console.error(`执行错误: ${error.message}`);
    return;
  }
  console.log(`标准输出:\n${stdout}`);
});
```

> cd 进入的目录，不会保留在 cd 到的目录，下次 exec 还会在运行的目录

### 3. 使用 execFile 的方式

```javascript
const { execFile } = require('child_process');

execFile('/bin/ls', ['-l'], { cwd: '/' }, (error, stdout, stderr) => {
  if (error) {
    console.error(`执行错误: ${error.message}`);
    return;
  }
  console.log(`标准输出:\n${stdout}`);
});
```

> 适合运行二进制文件或 Shell 脚本

## 等待用户选择或输入

```javascript
const inquirer = require('inquirer');

/**
 * type: list单选，checkbox多选，input用户输入
 * config: [{message:提示标题,name:表单的name,choices:可供选择的项}]
 */
function askByCmd(type, config) {
  if (!['list', 'checkbox', 'input'].includes(type)) {
    console.error('仅支持的type的值为：', 'list,checkbox,input');
    return;
  }
  config = Array.isArray(config) ? config : [config];
  const options = config.map((item) => {
    const { message, name, choices = [], required = true } = item;
    if (type === 'input') {
      return { type, message, name, default: choices[0], required };
    } else {
      return { type, message, name, choices, required };
    }
  });
  return inquirer.prompt(options);
}

async function run() {
  const radioValue = await askByCmd('list', [
    {
      message: '选择一个选项',
      name: 'radioValue',
      choices: ['选项A', '选项B'],
    },
  ]);
  const checkboxValue = await askByCmd('checkbox', [
    {
      message: '选择一个或多个选项',
      name: 'checkboxValue',
      choices: ['选项A', '选项B'],
    },
  ]);
  const inputValue = await askByCmd('input', [
    { message: '请输入项目名', name: 'inputValue', choices: ['my-project'] },
  ]);

  console.log(radioValue, checkboxValue, inputValue, 'index.js::161行');
}

run();
```
