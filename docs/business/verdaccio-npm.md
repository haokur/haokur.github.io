# verdaccio 搭建私有 npm 仓库

### 一、安装使用

1. 全局安装 verdaccio，npm install verdaccio -g
2. 全局安装 pm2，启动 verdaccio，npm install pm2 -g
3. 修改 verdaccio 配置文件，例如在 centos 上路径为 /root/.config/verdaccio/config.yaml，或者尝试运行 verdaccio

```yaml
storage: ./storage
plugins: ./plugins

web:
  title: alliswell-npm

auth:
  htpasswd:
    file: ./htpasswd
    max_users: -1

uplinks:
  npmjs:
    url: https://registry.npmmirror.com/

packages:
  '@haokur/*':
    access: $all
    publish: alliswell
    unpublish: $authenticated
    proxy: npmjs

  '**':
    access: $authenticated
    publish: $authenticated
    unpublish: $authenticated
    proxy: npmjs

server:
  keepAliveTimeout: 60000000000000

publish:
  allow_offline: true

max_body_size: 100mb

listen:
  - 0.0.0.0:8885

https:
  key: /xxxx/npm.haokur.com.key
  cert: /xxxxx/npm.haokur.com_bundle.crt

middlewares:
  audit:
    enabled: true

log: { type: stdout, format: pretty, level: http }
```

主要字段说明：

- packages，@haokur/\*，代表 npm install @haokur/cli 这种以 @haokur 开头的包的权限，常见的配置值有：`$all`（所有人包括未登录）, `$authenticated` 登录验证的用户，非 `$` 开头的，如 alliswell,root，代表登录的用户用户名
  - access，访问和下载权限
  - publish，发布权限
  - unpublish，删除仓库权限
- listen，verdaccio 应用对应启动在的端口号
- https，如果要使用 https 的仓库地址，则需要配置此项
  - key 对应腾讯云证书下载 nginx 版本的 key 结尾的文件
  - cert 对应腾讯云证书下载 nginx 版本的 crt 文件
- nginx 配置代理

```
location / {
    client_max_body_size 20m;
    autoindex off;
    proxy_store on;
    proxy_pass http://127.0.0.1:8885;
    index  index.html index.htm;
}
```

4. 重启 nginx
5. 启动：pm2 start verdaccio
6. 输入地址则可以访问，例如，[alliswell-npm (haokur.com)](https://npm.haokur.com/)
7. verdaccio 添加用户，执行命令

```shell
htpasswd -bc /root/.config/verdaccio/htpasswd <账号名> <账号密码>

# 例如
htpasswd -bc /root/.config/verdaccio/htpasswd alliswell 123456
```

8. 添加 npm 仓库管理工具，`npm install nrm -g`
9. 添加 verdaccio 到仓库管理列表中，`nrm add verdaccio https://npm.haokur.com `
10. 使用上一步添加的 verdaccio 源，`nrm use verdaccio`
11. verdaccio 源登录，`npm login`，输入登录第 7 步添加的用户，添加完成后，就可以将仓库源切回去了，如 `nrm use npm`
12. 新建一个项目文件夹，使用 `npm init -y` 初始化 `package.json`

```json
{
  "name": "@haokur/cli",
  "version": "1.0.0",
  "main": "index.js",
  "private": "false"
}
```

其中这三项是必备的，name 表示最终 publish 到 verdaccio 的名称是什么样的，version 代表发布的版本号，main 表示包主入口。

注意 private 的选项，在不需要 publish 到仓库的包，设置 private 为 "true"，避免不小心发布了。还有可以将其他源，如 npm，yarn，退出登录，如此就避免了把仓库错误发送到第三方仓库了。

13. 仓库下新建 .npmrc 文件，在需要安装和下载私有仓库的包时都能生效，且与 npm 的包不会冲突，不需要频繁切换仓库源

```
@haokur:registry=https://npm.haokur.com
```

以上设置，在安装@haokur 下面的包时，就不需要类似这样=》npm install @haokur/cli --registry=https://npm.haokur.com

14. 发布一个包，在项目目录下运行

```
npm publish
```

15. 删除一个包

```
npm unpublish <包名> -f
npm unpublish @haokur/main -f
```

### 二、扩展

在实际项目开发中，对于包管理工具有这些要求

- 不能使用 npm adduser --register <https://npm.haokur.com> 的方式随意添加用户
- 对于 web 版本，支持公开包管理不需要登录能查看，对于私有包，用户登录可查看
- 对于私有包，在项目中能通过配置 token 的方式，不需 npm login 即能安装私包

1. 开发自定义插件代替 htpass 鉴权，阻止 adduser

其中 plugins 定义了插件所放的位置，verdaccio-custom-auth-plugin，即刚定义插件内容，对应的是插件项目文件夹下的 package.json 里的名称，插件目录大致如下

```
- verdaccio-custom-auth-plugin
- index.js
- package.json
```

package.json 内容大致如下：

```json
{
  "name": "verdaccio-custom-auth-plugin2",
  "version": "1.0.0",
  "main": "index.js"
}
```

插件主逻辑如下：

```javascript
// verdaccio-custom-auth-plugin/index.js

// 检验用户
const checkUser = async (name, pwd) => {
  // 这里列表可以从服务器,或redis里，或者文本中拉取数据
  const users = [{ username: 'admin', password: 'password' }];
  return users.some(
    ({ username, password }) => username === name && pwd === password,
  );
};

module.exports = function (config, stuff) {
  return {
    /**网页版登录会走这里 */
    authenticate: async function (username, password, callback) {
      console.log('插件网页登录/验证用户权限时：', username, password);
      const isValid = await checkUser(username, password);
      return isValid
        ? callback(null, [username])
        : callback(new Error('Authentication failed'));
    },
    adduser: async function (username, password, callback) {
      console.log('插件npm adduser和npm login：', username, password);
      // 这里直接阻断注册，只能登录已存在的账号
      const isValid = await checkUser(username, password);
      return isValid
        ? callback(null, [username])
        : callback(new Error('User registration is not allowed'));
    },
  };
};
```

设置 /root/.config/verdaccio/config.yaml 配置文件，将 auth 下的 htpasswd 删除，添加自定义插件鉴权方式

```yaml
plugins: /Users/haokur/code/verdaccio-plugins
auth:
  #htpasswd:
  #file: ./htpasswd
  #max_users: -1
  verdaccio-custom-auth-plugin:
  version: '^1.0.0'
```

如上一个 auth 插件就简单对接成功了。他限制了 adduser 不能使用，login 只能登录已提供的用户和密码。

2. 开发自定义中间件

```
- verdaccio-custom-middleware
- index.js
- package.json
```

package.json 如下：

```json
{
  "name": "verdaccio-custom-middleware",
  "version": "1.0.0",
  "main": "index.js"
}
```

Index.js 代码如下：

```javascript
module.exports = (config, stuff) => {
  return {
    register_middlewares(app, auth, storage) {
      app.use((req, res, next) => {
        console.log(req.url, req.headers, 'index.js::5行');
        next();
        // const authHeader = req.headers['authorization'];
        // if (!authHeader) {
        //     res.status(403).json({ error: 'No auth token provided' });
        //     return;
        // }
        // const token = authHeader.split(' ')[1];
        // if (token === 'your-expected-token') {
        //     next();
        // } else {
        //     res.status(403).json({ error: 'Invalid auth token' });
        // }
      });
    },
  };
};
```

在 verdaccio 的配置文件中，添加中间件配置

```
middlewares:
  verdaccio-custom-middleware:
    enabled: true
    package: /root/verdaccio/middlewares/verdaccio-custom-middleware/index.js
  audit:
    enabled: true
```

注意其中 package 设置了路径不一定生效，假若报错找不到包，则在 verdaccio-custom-middleware 文件夹下，`npm link .` 本地安装一下这个包。

查看打印日志，可以抓取到请求头中数据，大致如下：

```
/@haokur%2fts-test {
  'user-agent': 'npm/9.5.0 node/v16.18.1 darwin x64 workspaces/false',
  'npm-auth-type': 'web',
  'npm-command': 'publish',
  authorization: 'Bearer xxxxxxxeRV2Zlvmw==',
  'content-type': 'application/json',
  accept: '*/*',
  'content-length': '2599',
  'accept-encoding': 'gzip,deflate',
  host: 'localhost:4873',
  connection: 'keep-alive'
}
```

将其中的 authhorization 的值 xxxxxxxeRV2Zlvmw==，复制出来，粘贴到 .npmrc 文件下

```
package-lock=false
@haokur:registry=https://npm.haokur.com/
//npm.haokur.com/:_authToken=xxxxxxxeRV2Zlvmw==
```

这样，就不需要 npm login ，也可以下载仓库里的包了

于是可以按照以下设置权限

- @haokur/\*，设置为公共包，不登录没 token，也能访问下载，但是未登录不能 publish
- @haokur-private/\*，设置为私有包，未登录用户不能查看下载，登录用户仅可查看，但不能 publish
- 专门设置几个账号，能够 publish，即例如 admin，superadmin，还有一个给流水线如 codeup-robot，借用中间件获取到对应账号的 token，可以考虑放到项目的 .npmrc 中设置
- 只设置 superadmin，有权限删除库

```
packages:
  '@haokur/*':
    access: $all
    publish: admin superadmin codeup-robot
    unpublish: superadmin
    proxy: npmjs

  '@haokur-private/*':
    access: $authenticated
    publish: admin superadmin codeup-robot
    unpublish: superadmin
    proxy: npmjs

```

注意多个账号之间，是用空格隔开，不是逗号。

进一步的安全设置，可以在中间件中，限制 IP,

```javascript
// verdaccio-custom-middleware/index.js
module.exports = (config, stuff) => {
  return {
    register_middlewares(app, auth, storage) {
      app.use((req, res, next) => {
        console.log(req.url, req.headers, 'index.js::5行');
        const allowIps = ['10.10.10.10'];
        const referIp = req.headers['x-real-ip'];
        if (allowIps.includes) {
          next();
        } else {
          res.status(403).json({ error: 'Access forbidden' });
        }
      });
    },
  };
};
```

更彻底一点，就是只部署在内网，只有内网能够访问。

### 三、注意

- 在登录和退出私有仓库时，使用 npm login 需要带仓库

```
npm login --registry https://npm.hoakur.com
npm logout --registry https://npm.hoakur.com
```

- .npmrc 配置的 token 的权重是要大于 npm login 登录的用户的
- 如果 https 提示 `ERR_SSL_VERSION_OR_CIPHER_MISMATCH`，则排查顺序可为：
  - verdaccio 是否成功启动
  - https 证书是否过期
  - 重新启动 verdaccio
  - 重新启动 nginx
  - 重新下载 https 证书
  - 换一个新的 https 证书，重启 nginx 和 verdaccio
  - 检验 nginx 和 verdaccio 中配置的证书是否一致
  - 注释自定义 plugin 和 middleware，重启 verdaccio
  - 是否 middleware 未本地安装，使用 npm link . 一下
