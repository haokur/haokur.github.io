# Koa 基本使用

### 预览

- Koa 应用整体架构：<a href="https://github.com/haokur/koa-server" target="_blank">haokur/koa-server</a>
- Koa 应用的自定义证书 https 服务实践：<a href="https://github.com/haokur/test/tree/main/koa-serve" target="_blank">haokur/test/koa-serve</a>

### Koa 基本服务及启动

#### 普通 http 服务

```javascript
const Koa = require('koa');
const path = require('path');
const KoaStatic = require('koa-static');
const cors = require('@koa/cors');
const KoaRoute = require('@koa/router');
const fs = require('fs');

const app = new Koa();
const router = new KoaRoute();

// 配置 CORS 允许跨域请求
app.use(
  cors({
    origin: '*', // 允许所有域名访问，建议根据需要配置为特定的域名
    allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowHeaders: ['Content-Type', 'Authorization', 'Accept'],
    credentials: true, // 如果需要允许携带凭据（如 Cookie），则设置为 true
    secureContext: false,
  }),
);

app.use(KoaStatic(path.resolve(__dirname, '../assets')));

router.get('/', async (ctx) => {
  ctx.body = 'hello index';
});
router.get('/video', async (ctx) => {
  ctx.body = 'hello video';
});

app.use(router.routes()).use(router.allowedMethods());

app.listen(9090, () => {
  console.log('server run http://localhost:9090');
});
```

#### 自建证书的 https 服务

```javascript
const Koa = require('koa');

const KoaStatic = require('koa-static');
const cors = require('@koa/cors');
const KoaRoute = require('@koa/router');

const https = require('https'); // 这里
const fs = require('fs');
const path = require('path');

const app = new Koa();
const router = new KoaRoute();

// SSL 证书配置
const sslOptions = {
  key: fs.readFileSync(path.resolve(__dirname, '../ssl/server.key')),
  cert: fs.readFileSync(path.resolve(__dirname, '../ssl/server.crt')),
  ca: fs.readFileSync(path.resolve(__dirname, '../ssl/ca.crt')),
};

app.use(
  cors({
    origin: '*', // 允许来自所有来源的请求，如果需要限制来源可以指定特定域名
    allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // 允许的HTTP方法
    allowHeaders: ['Content-Type', 'Authorization', 'Accept'], // 允许的HTTP头
    credentials: true, // 是否允许发送Cookie
  }),
);

app.use(KoaStatic(path.resolve(__dirname, '../assets')));

router.get('/', async (ctx) => {
  ctx.body = 'hello index';
});
router.get('/video', async (ctx) => {
  ctx.body = 'hello video';
});

app.use(router.routes()).use(router.allowedMethods());

// HTTPS 服务器
https.createServer(sslOptions, app.callback()).listen(9099, () => {
  console.log('Koa server is running on https://localhost:9099');
});
```

> 本地访问自建证书的 https 请求时，可以忽略警告，或者如果在 mac 上可以双击 ca.crt，然后在钥匙串访问->证书，中找对应用的 ca 证书，->显示简介 -> 信任 -> 使用证书 -> 始终信任
