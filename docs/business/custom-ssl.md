### 一、创建 CA 密钥

```shell
# 生成 CA 私钥,回车后，输入密码和确认密码,例如123456 =》ca.key
openssl genpkey -algorithm RSA -out ca.key -aes256

# 生成 CA 证书，输入上一步的密码，输入对应提问的信息 => ca.crt
openssl req -x509 -new -nodes -key ca.key -sha256 -days 1024 -out ca.crt

# 问题类似下面
Country Name (2 letter code) []:CN
State or Province Name (full name) []:shenzhen
Locality Name (eg, city) []:shenzhen
Organization Name (eg, company) []:haokur
Organizational Unit Name (eg, section) []:haokur unit
Common Name (eg, fully qualified host name) []:127.0.0.1
Email Address []:haokur@qq.com
```

### 二、创建 server 端相关密钥

1. 新建 server.conf 写入以下内容

```shell
[req]
distinguished_name = req_distinguished_name
req_extensions = req_ext
prompt = no

[req_distinguished_name]
C = CN
ST = shenzhen
L = shenzhen
O = haokur
OU = haokur unit
CN = 127.0.0.1

[req_ext]
subjectAltName = @alt_names

[alt_names]
DNS.1 = localhost
```

2. 生成 server.key

```shell
openssl genpkey -algorithm RSA -out server.key
```

3. 使用 server.key 来生成 server.csr

```sh
openssl req -new -key server.key -out server.csr -config server.cnf
```

4. 使用，ca.key 和 server.csr 生成 server.crt

```sh
openssl x509 -req -in server.csr -CA ca.crt -CAkey ca.key -CAcreateserial -out server.crt -days 500 -sha256 -extfile server.cnf -extensions req_ext
```

> 需要输入密码，写入第一步 CA 的密钥，即例如：123456

### 三、生成 client 端的密钥

1. 生成 client.key

```sh
openssl genpkey -algorithm RSA -out client.key
```

2. 生成证书签名请求 client.csr，输入对应提问的信息 => client.csr

```sh
openssl req -new -key client.key -out client.csr
```

> 区别于前面几个，这里的问题会多一项：A challenge password，填入密码即可，如 1234567

3. 使用 CA 签名客户端证书，需要填入 CA 的密钥，如 123456

```sh
openssl x509 -req -in client.csr -CA ca.crt -CAkey ca.key -CAcreateserial -out client.crt -days 365 -sha256
```

以上，CA，客户端，服务端的密钥和证书都生成完毕。

### 四、go 启动 server 端和 client 端测试

1. 运行命令

```sh
# 服务端
go run server/server.go

# 客户端，发起请求
go run client/client.go
```

2. 仅使用 CA 或 CA 与 client 同时使用

- server.go

```golang
cfg := &tls.Config{
    MinVersion: tls.VersionTLS13,
    ClientAuth: tls.RequireAndVerifyClientCert, // 仅校验ca时，注释这行
    ClientCAs:  caCertPool,
}
```

- client.go

```golang
tlsConfig := &tls.Config{
    RootCAs:      caCertPool,
    Certificates: []tls.Certificate{clientCert}, // 仅传递CA时，注释这行
    MinVersion:   tls.VersionTLS13,
}
```

- electron 中使用

```javascript
import https from 'https';
import fs from 'fs';
import path from 'path';
import axios from 'axios';

const caCert = fs.readFileSync(path.join(process.cwd(), '../ssl/ca.crt'));
const clientCert = fs.readFileSync(
  path.join(process.cwd(), '../ssl/client.crt'),
);
const clientKey = fs.readFileSync(
  path.join(process.cwd(), '../ssl/client.key'),
);

const agent = new https.Agent({
  ca: caCert,
  cert: clientCert, // 只校验ca时，注释这两行
  key: clientKey, // 只校验ca时，注释这两行
  rejectUnauthorized: true,
});

const response = await axios.get(url, { httpsAgent: agent });
console.log(response);
console.log(response.data);
```

### 五、视频流

- renderer 里直接添加 video 标签，服务端使用 range 的方式 206 响应返回，视频能够边下边播，快进后退播放
- renderer 里配置请求地址，请求不能发送证书相关信息，可以将证书信息转为字符串发送再去校验，有点鸡肋
- 只有 main 进程里使用 axios 发送证书相关信息，main 进程可以使用证书的方式来请求视频流，但是要给 renderer 进程播放，需要先分片保存，再 renderer 请求主进程，主进程再返回分片信息，有点绕，过程多一层也就多一层消耗和复杂度，容易出 bug
- 折中处理方案一，全局的先非对称实现 AES 的 key 的交换，后续请求全使用对称 AES 加密，类似浏览器 https 流程，在视频请求时，也一并提交 AES 加密的用户验证信息
- 折中处理方案二，在请求视频地址时，先使用 https 交换获取临时的视频播放地址，然后再使用临时视频地址播放
- 加固方案：每次请求添加请求递增索引，每个请求有个唯一的 id，一个 sign 只能使用一次，请求时间戳 5 秒外失效

```sh
go run mock-https/main.go

cd electron && npm run dev
```

### 五、总结

- 客户端传递 CA 和 client.crt 给服务器端，服务器使用 CA 和 server.crt，匹配后正确响应，也可以只匹配 CA，但是就失去了意义，因为客户端保存有 CA，容易被解包拿到 CA 证书
- CA 证书使用密钥加密，而对应的 server.crt，是通过 CA 证书来签名生成，只有知道 CA 证书的密钥，才能使用 CA 证书来生成对应的 server.crt
- server.crt 只保存在服务端，不会暴露给 C 端，所以中间拦截者，没有 server.crt 不能正确解析请求体，是否也表示就不能伪造用户原样的数据代理发送给服务端？
- 是否有其他潜在被破解的风险？
- 每次请求都要传递对应证书，是否对请求体大小，请求时间有比较大的影响？
