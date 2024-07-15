"use strict";(self.webpackChunknotes=self.webpackChunknotes||[]).push([[904],{95523:function(t,a,n){n.r(a),n.d(a,{demos:function(){return r}});var o=n(67294),e=n(37132),r={}},96624:function(t,a,n){n.r(a),n.d(a,{demos:function(){return r}});var o=n(67294),e=n(81005),r={}},74867:function(t,a,n){n.r(a),n.d(a,{demos:function(){return r}});var o=n(67294),e=n(92688),r={}},11171:function(t,a,n){n.r(a),n.d(a,{demos:function(){return r}});var o=n(67294),e=n(68537),r={}},67715:function(t,a,n){n.r(a),n.d(a,{demos:function(){return r}});var o=n(67294),e=n(43648),r={}},46926:function(t,a,n){n.r(a),n.d(a,{demos:function(){return r}});var o=n(67294),e=n(4299),r={}},90702:function(t,a,n){n.r(a),n.d(a,{demos:function(){return r}});var o=n(67294),e=n(94807),r={}},46983:function(t,a,n){n.r(a),n.d(a,{demos:function(){return r}});var o=n(67294),e=n(22695),r={}},57828:function(t,a,n){n.r(a),n.d(a,{demos:function(){return r}});var o=n(67294),e=n(37535),r={}},47537:function(t,a,n){n.r(a),n.d(a,{demos:function(){return r}});var o=n(67294),e=n(99920),r={}},48516:function(t,a,n){n.r(a),n.d(a,{demos:function(){return r}});var o=n(67294),e=n(79825),r={}},81206:function(t,a,n){n.r(a),n.d(a,{demos:function(){return r}});var o=n(67294),e=n(61831),r={}},87447:function(t,a,n){n.r(a),n.d(a,{texts:function(){return e}});var o=n(37132);const e=[{value:"\u6587\u4EF6\u5206\u7247\u4E0A\u4F20\u4E0B\u8F7D",paraId:0,tocIndex:0},{value:"verdaccio \u642D\u5EFA\u79C1\u6709 npm \u4ED3\u5E93",paraId:1,tocIndex:0}]},53350:function(t,a,n){n.r(a),n.d(a,{texts:function(){return e}});var o=n(81005);const e=[{value:"\u6E90\u7801\u5B9E\u73B0\uFF08koa\uFF09\uFF1A",paraId:0,tocIndex:1},{value:"koa-server/src/controllers/file.controller.ts",paraId:0,tocIndex:1},{value:"\u6E90\u7801\u5B9E\u73B0\uFF08Vue3\uFF09\uFF1A",paraId:0,tocIndex:1},{value:"client/pages/upload/upload.vue",paraId:0,tocIndex:1},{value:"\u5728\u7EBF DEMO\uFF1A",paraId:0,tocIndex:1},{value:"Vue3-client ",paraId:0,tocIndex:1},{value:"Vue3-client (haokur.github.io)",paraId:1,tocIndex:1},{value:"\u524D\u7AEF slice \u5207\u5272\uFF0C\u670D\u52A1\u7AEF\u5408\u5E76",paraId:2,tocIndex:2},{value:"\u6838\u5FC3\u5728\u4E8E\u524D\u7AEF\uFF0C\u544A\u8BC9\u540E\u7AEF\u5F53\u524D\u662F\u54EA\u4E00\u6BB5\uFF0C\u4EE5\u53CA\u8FD9\u4E00\u6BB5\u7684\u6570\u636E",paraId:3,tocIndex:2},{value:"Html \u4E2D\u6DFB\u52A0 input \u4E3A file \u7684\u63A7\u4EF6",paraId:4,tocIndex:2},{value:`<input type="file" @change="handleFileChange" />
`,paraId:5,tocIndex:2},{value:"js \u4E2D\u6DFB\u52A0\u5BF9 input \u7684 file \u53D8\u5316\u7684\u54CD\u5E94",paraId:6,tocIndex:2},{value:`const chunkSize = 1 * 1024 * 1024;

const chunkStatus = [];
const chunkFinished = [];
const handleFileChange = (ev) => {
  const file = ev.target.files[0];
  const fileSize = file.size;
  const fileName = file.name;

  // \u5207\u5272\u6210\u5757
  const totalChunk = Math.ceil(fileSize / chunkSize);
  const chunkStatus = Array.from({ length: totalChunk }, (_, index) => {
    return {
      index: index,
      start: index * chunkSize,
      end: Math.min((index + 1) * chunkSize, fileSize),
      status: 0,
    };
  });

  // \u6309\u5757\u63D0\u4EA4
  chunkStatus.forEach((item) => {
    const { start, end, index } = item;
    const formData = new FormData();
    const blob = file.slice(start, end);
    formData.append('file', blob);

    axios
      .post(
        \`upload?chunkIndex=\${index}&chunkTotal=\${totalChunk}&fileName=\${fileName}\`,
        formData,
      )
      .then((res) => {
        chunkFinishedCallback(res, item);
      });
  });

  // \u5355\u6B21\u8BF7\u6C42\u56DE\u8C03
  const chunkFinishedCallback = (res, item) => {
    chunkFinished.push(item);
    if (chunkFinished.length === chunkStatus.length) {
      console.log('\u5168\u90E8\u4E0A\u4F20\u5B8C\u6210', res.data.url);
    }
  };
};
`,paraId:7,tocIndex:2},{value:"\u4EE5\u4E0A\u662F\u524D\u7AEF\u5206\u7247\u4E0A\u4F20\u7684\u57FA\u7840\u5B9E\u73B0\uFF0C\u8FD8\u53EF\u4EE5\u4F18\u5316\u7684\u70B9\u662F\uFF1A",paraId:8,tocIndex:2},{value:"\u524D\u7AEF\u83B7\u53D6\u6587\u4EF6\u7684 MD5 \u503C\u4E14\u4F20\u9012\uFF0C\u5982\u679C\u5B58\u5728\u540C md5 \u7684\u6587\u4EF6\uFF0C\u8DF3\u8FC7\u4E0A\u4F20\u8FD4\u56DE\u5BF9\u5E94\u6587\u4EF6",paraId:9,tocIndex:2},{value:"\u5728\u4E0A\u4F20\u65F6\uFF0C\u5047\u5982\u5206\u7247\u8FC7\u591A\uFF0C\u5219\u9700\u8981\u7528\u4E2A\u961F\u5217\u63A7\u5236\u5E76\u53D1\u6570\u91CF",paraId:9,tocIndex:2},{value:"\u670D\u52A1\u7AEF\u63A5\u6536\uFF1A",paraId:10,tocIndex:2},{value:`const uploadMap = {};

uploadMap[fileName] = uploadMap[fileName] || new Set();

const { fileName, index, totalChunk } = params;
const stream = fs.writeSync(
  \`_temp/\${fileName}/\${index}.temp\`,
  ctx.request.files.file,
);
uploadMap[fileName].add(index);

// \u5982\u679C\u662F\u6700\u540E\u4E00\u5757,\u62FC\u63A5\uFF0C\u8FD4\u56DE\u62FC\u63A5\u540E\u5730\u5740
if (uploadMap[fileName].size === totalChunk - 1) {
  const writeStream = fs.createWriteStream(\`_temp/\${fileName}\`);
  for (var i = 0; i < totalChunk; i++) {
    const data = fs.readFileSync(\`_temp/\${fileName}/\${i}.temp\`);
    writeStream.write(data);
  }
  ctx.body = \`_temp/\${fileName}/\${i}.temp\`;
}
`,paraId:11,tocIndex:2},{value:"\u4EE5\u4E0A\u662F\u670D\u52A1\u7AEF\u7684\u7B80\u5316\u903B\u8F91\uFF0C\u521B\u5EFA\u5BF9\u5E94 fileName \u7684\u4E34\u65F6\u76EE\u5F55\uFF0C\u6309\u7D22\u5F15\u5206\u522B\u5B58\u50A8\u7247\u6BB5\uFF0C\u5F53\u7247\u6BB5\u6570\u548C\u603B\u6570\u76F8\u7B49\u65F6\uFF0C\u5219\u6309\u987A\u5E8F\u62FC\u63A5\uFF0C\u62FC\u63A5\u5B8C\u540E\u8FD4\u56DE\u6587\u4EF6\u5730\u5740\u3002",paraId:12,tocIndex:2},{value:"\u4F18\u5316\u70B9\uFF1A",paraId:13,tocIndex:2},{value:"\u5C06\u540C\u6B65\u8BFB\u53D6 readFileSync \u548C\u540C\u6B65\u5199\u5165 writeSync \u6539\u6210\u5F02\u6B65\u5904\u7406",paraId:14,tocIndex:2},{value:"\u5904\u7406\u524D\u7AEF\u7684 fileName \u8F93\u5165\uFF0C\u907F\u514D fileName \u4E2D\u7684 ../../ \u7684\u65B9\u5F0F\uFF0C\u64CD\u4F5C\u4E86\u5176\u4ED6\u4E0D\u5141\u8BB8\u64CD\u4F5C\u7684\u6587\u4EF6",paraId:14,tocIndex:2},{value:"\u524D\u7AEF\u6839\u636E\u6587\u4EF6 size \u548C chunkSize \u8BF7\u6C42\u670D\u52A1\u7AEF\u5207\u5272\uFF0C\u670D\u52A1\u7AEF\u5207\u5272\u8FD4\u56DE\uFF0C\u524D\u7AEF\u5408\u5E76",paraId:15,tocIndex:3},{value:"\u6838\u5FC3\u5728\u4E8E\u544A\u8BC9\u670D\u52A1\u7AEF\uFF0C\u524D\u7AEF\u9700\u8981\u54EA\u4E00\u6BB5\u7684\u6570\u636E",paraId:16,tocIndex:3},{value:"\u5148\u4F7F\u7528 Head \u7684\u8BF7\u6C42\u65B9\u5F0F\u83B7\u53D6\u5230\u6587\u4EF6\u7684 size \u5927\u5C0F\uFF0C\u518D\u6309 chunkSize \u5207\u5272 size \u5927\u5C0F\uFF0C\u5373\u6BCF\u6BB5\u5206\u7247\u7684\u5F00\u59CB\u4F4D\u7F6E\u548C\u7ED3\u675F\u4F4D\u7F6E\uFF0C\u5C06\u53C2\u6570\u62FC\u63A5\u8BF7\u6C42\u540E\u7AEF\uFF0C\u540E\u7AEF\u8FD4\u56DE\u5BF9\u5E94\u7247\u6BB5\u7684\u6570\u636E\uFF0C\u524D\u7AEF\u5224\u65AD\u6240\u6709\u7684\u7247\u6BB5\u96C6\u9F50\uFF0C\u5F00\u59CB\u62FC\u63A5\uFF0C\u5E76\u521B\u5EFA\u4E0B\u8F7D\u94FE\u63A5\u3002\u8FD9\u79CD\u65B9\u5F0F\u66F4\u52A0\u7075\u6D3B\uFF0C\u524D\u7AEF\u53EF\u4EE5\u81EA\u7531\u5207\u5272\uFF0C\u800C\u4E14\u65B9\u4FBF\u4E2D\u65AD\uFF0C\u91CD\u542F\u90E8\u5206\u7247\u6BB5\u7684\u4E0B\u8F7D\uFF0C\u53EF\u5E76\u53D1\u7247\u6BB5\u4E0B\u8F7D\u3002",paraId:17,tocIndex:3},{value:"\u524D\u7AEF\u5B9E\u73B0\uFF1A",paraId:18,tocIndex:3},{value:`const url = \`download?fileName=xxxxx.png\`;

// \u5148\u8BD5\u7528HEAD\u65B9\u5F0F\u4EC5\u83B7\u53D6\u6587\u4EF6\u5927\u5C0F
const response = await axios.head(url);
const contentLength: any = response.headers['content-length'] || '0';
const totalSize = parseInt(contentLength);

// \u6309size\u548CchunkSize\u8FDB\u884C\u5206\u6BB5
let prevEndSize = -1;
let index = 0;
let chunkRanges = [];
while (prevEndSize < totalSize) {
  const startSizeIndex = prevEndSize + 1;
  const endSizeIndex = prevEndSize + currentDownloadObj.chunkSize;
  chunkRanges.push({
    start: startSizeIndex,
    end: endSizeIndex,
    status: 0,
    index,
  });
  prevEndSize = endSizeIndex;
  index++;
}

// \u53D1\u8D77\u8BF7\u6C42\u4E0B\u8F7D
const chunksData = [];
chunkRanges.forEach((item, index) => {
  const response = axios
    .get(url, {
      headers: {
        Range: \`bytes=\${start}-\${end}\`,
      },
    })
    .then((res) => {
      chunksData[index] = res;
    });
});

// \u6BCF\u6B21\u8BF7\u6C42\u4E4B\u540E\u68C0\u67E5\u662F\u5426\u6570\u636E\u662F\u5426\u5DF2\u5B8C\u5907
const checkChunkData = () => {
  if (chunksData.length === chunkRanges.length) {
    // \u5F00\u59CB\u62FC\u63A5\u6570\u636E\uFF0C\u5E76\u751F\u6210\u94FE\u63A5
    const blob = new Blob(chunksData);
    const downloadUrl = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = downloadUrl;
    a.download = 'downloaded_file.png';
    document.body.appendChild(a);
    a.click();
    URL.revokeObjectURL(downloadUrl);
  }
};
`,paraId:19,tocIndex:3},{value:"\u540E\u7AEF\u5B9E\u73B0\uFF1A",paraId:20,tocIndex:3},{value:`async function FileDownload(params, ctx) {
  const { fileName } = params;
  const filePath = path.resolve(UPLOAD_DIR, \`\${fileName}\`);

  if (ctx.request.method === 'HEAD') {
    if (fs.existsSync(filePath)) {
      const { size } = fs.statSync(filePath);
      return {
        headers: {
          'Content-Length': size,
        },
      };
    } else {
      return '404';
    }
  } else {
    const { range } = ctx.request.header;

    const parts = range.replace(/bytes=/, '').split('-');
    const partialStart = parts[0];
    const partialEnd = parts[1];

    const start = parseInt(partialStart, 10);
    const end = parseInt(partialEnd, 10);

    const file = fs.createReadStream(filePath, { start, end });
    ctx.status = 206;

    return {
      headers: { 'Content-Type': 'application/octet-stream' },
      body: file,
      statusCode: 206,
    };
  }
}
`,paraId:21,tocIndex:3},{value:"\u5728\u5206\u7247\u7684\u65F6\u5019\uFF0C\u4F4D\u7F6E\u4E0D\u8981\u6709\u91CD\u53E0\uFF0C\u5982\u5207\u7247\u7684\u7247\u6BB5\u5E94\u8BE5\u662F [ [1,3],[4,6]] \uFF0C\u800C\u4E0D\u662F [[1,3],[3,5]]",paraId:22,tocIndex:4}]},6329:function(t,a,n){n.r(a),n.d(a,{texts:function(){return e}});var o=n(92688);const e=[{value:"\u5168\u5C40\u5B89\u88C5 verdaccio\uFF0Cnpm install verdaccio -g",paraId:0,tocIndex:1},{value:"\u5168\u5C40\u5B89\u88C5 pm2\uFF0C\u542F\u52A8 verdaccio\uFF0Cnpm install pm2 -g",paraId:0,tocIndex:1},{value:"\u4FEE\u6539 verdaccio \u914D\u7F6E\u6587\u4EF6\uFF0C\u4F8B\u5982\u5728 centos \u4E0A\u8DEF\u5F84\u4E3A /root/.config/verdaccio/config.yaml\uFF0C\u6216\u8005\u5C1D\u8BD5\u8FD0\u884C verdaccio",paraId:0,tocIndex:1},{value:`storage: ./storage
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
`,paraId:1,tocIndex:1},{value:"\u4E3B\u8981\u5B57\u6BB5\u8BF4\u660E\uFF1A",paraId:2,tocIndex:1},{value:"packages\uFF0C@haokur/*\uFF0C\u4EE3\u8868 npm install @haokur/cli \u8FD9\u79CD\u4EE5 @haokur \u5F00\u5934\u7684\u5305\u7684\u6743\u9650\uFF0C\u5E38\u89C1\u7684\u914D\u7F6E\u503C\u6709\uFF1A",paraId:3,tocIndex:1},{value:"$all",paraId:3,tocIndex:1},{value:"\uFF08\u6240\u6709\u4EBA\u5305\u62EC\u672A\u767B\u5F55\uFF09, ",paraId:3,tocIndex:1},{value:"$authenticated",paraId:3,tocIndex:1},{value:" \u767B\u5F55\u9A8C\u8BC1\u7684\u7528\u6237\uFF0C\u975E ",paraId:3,tocIndex:1},{value:"$",paraId:3,tocIndex:1},{value:` \u5F00\u5934\u7684\uFF0C\u5982 alliswell,root\uFF0C\u4EE3\u8868\u767B\u5F55\u7684\u7528\u6237\u7528\u6237\u540D
`,paraId:3,tocIndex:1},{value:"access\uFF0C\u8BBF\u95EE\u548C\u4E0B\u8F7D\u6743\u9650",paraId:4,tocIndex:1},{value:"publish\uFF0C\u53D1\u5E03\u6743\u9650",paraId:4,tocIndex:1},{value:"unpublish\uFF0C\u5220\u9664\u4ED3\u5E93\u6743\u9650",paraId:4,tocIndex:1},{value:"listen\uFF0Cverdaccio \u5E94\u7528\u5BF9\u5E94\u542F\u52A8\u5728\u7684\u7AEF\u53E3\u53F7",paraId:3,tocIndex:1},{value:`https\uFF0C\u5982\u679C\u8981\u4F7F\u7528 https \u7684\u4ED3\u5E93\u5730\u5740\uFF0C\u5219\u9700\u8981\u914D\u7F6E\u6B64\u9879
`,paraId:3,tocIndex:1},{value:"key \u5BF9\u5E94\u817E\u8BAF\u4E91\u8BC1\u4E66\u4E0B\u8F7D nginx \u7248\u672C\u7684 key \u7ED3\u5C3E\u7684\u6587\u4EF6",paraId:5,tocIndex:1},{value:"cert \u5BF9\u5E94\u817E\u8BAF\u4E91\u8BC1\u4E66\u4E0B\u8F7D nginx \u7248\u672C\u7684 crt \u6587\u4EF6",paraId:5,tocIndex:1},{value:"nginx \u914D\u7F6E\u4EE3\u7406",paraId:3,tocIndex:1},{value:`location / {
    client_max_body_size 20m;
    autoindex off;
    proxy_store on;
    proxy_pass http://127.0.0.1:8885;
    index  index.html index.htm;
}
`,paraId:6,tocIndex:1},{value:"\u91CD\u542F nginx",paraId:7,tocIndex:1},{value:"\u542F\u52A8\uFF1Apm2 start verdaccio",paraId:7,tocIndex:1},{value:"\u8F93\u5165\u5730\u5740\u5219\u53EF\u4EE5\u8BBF\u95EE\uFF0C\u4F8B\u5982\uFF0C",paraId:7,tocIndex:1},{value:"alliswell-npm (haokur.com)",paraId:7,tocIndex:1},{value:"verdaccio \u6DFB\u52A0\u7528\u6237\uFF0C\u6267\u884C\u547D\u4EE4",paraId:7,tocIndex:1},{value:`htpasswd -bc /root/.config/verdaccio/htpasswd <\u8D26\u53F7\u540D> <\u8D26\u53F7\u5BC6\u7801>

# \u4F8B\u5982
htpasswd -bc /root/.config/verdaccio/htpasswd alliswell 123456
`,paraId:8,tocIndex:1},{value:"\u6DFB\u52A0 npm \u4ED3\u5E93\u7BA1\u7406\u5DE5\u5177\uFF0C",paraId:9,tocIndex:1},{value:"npm install nrm -g",paraId:9,tocIndex:1},{value:"\u6DFB\u52A0 verdaccio \u5230\u4ED3\u5E93\u7BA1\u7406\u5217\u8868\u4E2D\uFF0C",paraId:9,tocIndex:1},{value:"nrm add verdaccio https://npm.haokur.com ",paraId:9,tocIndex:1},{value:"\u4F7F\u7528\u4E0A\u4E00\u6B65\u6DFB\u52A0\u7684 verdaccio \u6E90\uFF0C",paraId:9,tocIndex:1},{value:"nrm use verdaccio",paraId:9,tocIndex:1},{value:"verdaccio \u6E90\u767B\u5F55\uFF0C",paraId:9,tocIndex:1},{value:"npm login",paraId:9,tocIndex:1},{value:"\uFF0C\u8F93\u5165\u767B\u5F55\u7B2C 7 \u6B65\u6DFB\u52A0\u7684\u7528\u6237\uFF0C\u6DFB\u52A0\u5B8C\u6210\u540E\uFF0C\u5C31\u53EF\u4EE5\u5C06\u4ED3\u5E93\u6E90\u5207\u56DE\u53BB\u4E86\uFF0C\u5982 ",paraId:9,tocIndex:1},{value:"nrm use npm",paraId:9,tocIndex:1},{value:"\u65B0\u5EFA\u4E00\u4E2A\u9879\u76EE\u6587\u4EF6\u5939\uFF0C\u4F7F\u7528 ",paraId:9,tocIndex:1},{value:"npm init -y",paraId:9,tocIndex:1},{value:" \u521D\u59CB\u5316 ",paraId:9,tocIndex:1},{value:"package.json",paraId:9,tocIndex:1},{value:`{
  "name": "@haokur/cli",
  "version": "1.0.0",
  "main": "index.js",
  "private": "false"
}
`,paraId:10,tocIndex:1},{value:"\u5176\u4E2D\u8FD9\u4E09\u9879\u662F\u5FC5\u5907\u7684\uFF0Cname \u8868\u793A\u6700\u7EC8 publish \u5230 verdaccio \u7684\u540D\u79F0\u662F\u4EC0\u4E48\u6837\u7684\uFF0Cversion \u4EE3\u8868\u53D1\u5E03\u7684\u7248\u672C\u53F7\uFF0Cmain \u8868\u793A\u5305\u4E3B\u5165\u53E3\u3002",paraId:11,tocIndex:1},{value:'\u6CE8\u610F private \u7684\u9009\u9879\uFF0C\u5728\u4E0D\u9700\u8981 publish \u5230\u4ED3\u5E93\u7684\u5305\uFF0C\u8BBE\u7F6E private \u4E3A "true"\uFF0C\u907F\u514D\u4E0D\u5C0F\u5FC3\u53D1\u5E03\u4E86\u3002\u8FD8\u6709\u53EF\u4EE5\u5C06\u5176\u4ED6\u6E90\uFF0C\u5982 npm\uFF0Cyarn\uFF0C\u9000\u51FA\u767B\u5F55\uFF0C\u5982\u6B64\u5C31\u907F\u514D\u4E86\u628A\u4ED3\u5E93\u9519\u8BEF\u53D1\u9001\u5230\u7B2C\u4E09\u65B9\u4ED3\u5E93\u4E86\u3002',paraId:12,tocIndex:1},{value:"\u4ED3\u5E93\u4E0B\u65B0\u5EFA .npmrc \u6587\u4EF6\uFF0C\u5728\u9700\u8981\u5B89\u88C5\u548C\u4E0B\u8F7D\u79C1\u6709\u4ED3\u5E93\u7684\u5305\u65F6\u90FD\u80FD\u751F\u6548\uFF0C\u4E14\u4E0E npm \u7684\u5305\u4E0D\u4F1A\u51B2\u7A81\uFF0C\u4E0D\u9700\u8981\u9891\u7E41\u5207\u6362\u4ED3\u5E93\u6E90",paraId:13,tocIndex:1},{value:`@haokur:registry=https://npm.haokur.com
`,paraId:14,tocIndex:1},{value:"\u4EE5\u4E0A\u8BBE\u7F6E\uFF0C\u5728\u5B89\u88C5@haokur \u4E0B\u9762\u7684\u5305\u65F6\uFF0C\u5C31\u4E0D\u9700\u8981\u7C7B\u4F3C\u8FD9\u6837=\u300Bnpm install @haokur/cli --registry=",paraId:15,tocIndex:1},{value:"https://npm.haokur.com",paraId:15,tocIndex:1},{value:"\u53D1\u5E03\u4E00\u4E2A\u5305\uFF0C\u5728\u9879\u76EE\u76EE\u5F55\u4E0B\u8FD0\u884C",paraId:16,tocIndex:1},{value:`npm publish
`,paraId:17,tocIndex:1},{value:"\u5220\u9664\u4E00\u4E2A\u5305",paraId:18,tocIndex:1},{value:`npm unpublish <\u5305\u540D> -f
npm unpublish @haokur/main -f
`,paraId:19,tocIndex:1},{value:"\u5728\u5B9E\u9645\u9879\u76EE\u5F00\u53D1\u4E2D\uFF0C\u5BF9\u4E8E\u5305\u7BA1\u7406\u5DE5\u5177\u6709\u8FD9\u4E9B\u8981\u6C42",paraId:20,tocIndex:2},{value:"\u4E0D\u80FD\u4F7F\u7528 npm adduser --register ",paraId:21,tocIndex:2},{value:"https://npm.haokur.com",paraId:21,tocIndex:2},{value:" \u7684\u65B9\u5F0F\u968F\u610F\u6DFB\u52A0\u7528\u6237",paraId:21,tocIndex:2},{value:"\u5BF9\u4E8E web \u7248\u672C\uFF0C\u652F\u6301\u516C\u5F00\u5305\u7BA1\u7406\u4E0D\u9700\u8981\u767B\u5F55\u80FD\u67E5\u770B\uFF0C\u5BF9\u4E8E\u79C1\u6709\u5305\uFF0C\u7528\u6237\u767B\u5F55\u53EF\u67E5\u770B",paraId:21,tocIndex:2},{value:"\u5BF9\u4E8E\u79C1\u6709\u5305\uFF0C\u5728\u9879\u76EE\u4E2D\u80FD\u901A\u8FC7\u914D\u7F6E token \u7684\u65B9\u5F0F\uFF0C\u4E0D\u9700 npm login \u5373\u80FD\u5B89\u88C5\u79C1\u5305",paraId:21,tocIndex:2},{value:"\u5F00\u53D1\u81EA\u5B9A\u4E49\u63D2\u4EF6\u4EE3\u66FF htpass \u9274\u6743\uFF0C\u963B\u6B62 adduser",paraId:22,tocIndex:2},{value:"\u5176\u4E2D plugins \u5B9A\u4E49\u4E86\u63D2\u4EF6\u6240\u653E\u7684\u4F4D\u7F6E\uFF0Cverdaccio-custom-auth-plugin\uFF0C\u5373\u521A\u5B9A\u4E49\u63D2\u4EF6\u5185\u5BB9\uFF0C\u5BF9\u5E94\u7684\u662F\u63D2\u4EF6\u9879\u76EE\u6587\u4EF6\u5939\u4E0B\u7684 package.json \u91CC\u7684\u540D\u79F0\uFF0C\u63D2\u4EF6\u76EE\u5F55\u5927\u81F4\u5982\u4E0B",paraId:23,tocIndex:2},{value:`- verdaccio-custom-auth-plugin
- index.js
- package.json
`,paraId:24,tocIndex:2},{value:"package.json \u5185\u5BB9\u5927\u81F4\u5982\u4E0B\uFF1A",paraId:25,tocIndex:2},{value:`{
  "name": "verdaccio-custom-auth-plugin2",
  "version": "1.0.0",
  "main": "index.js"
}
`,paraId:26,tocIndex:2},{value:"\u63D2\u4EF6\u4E3B\u903B\u8F91\u5982\u4E0B\uFF1A",paraId:27,tocIndex:2},{value:`// verdaccio-custom-auth-plugin/index.js

// \u68C0\u9A8C\u7528\u6237
const checkUser = async (name, pwd) => {
  // \u8FD9\u91CC\u5217\u8868\u53EF\u4EE5\u4ECE\u670D\u52A1\u5668,\u6216redis\u91CC\uFF0C\u6216\u8005\u6587\u672C\u4E2D\u62C9\u53D6\u6570\u636E
  const users = [{ username: 'admin', password: 'password' }];
  return users.some(
    ({ username, password }) => username === name && pwd === password,
  );
};

module.exports = function (config, stuff) {
  return {
    /**\u7F51\u9875\u7248\u767B\u5F55\u4F1A\u8D70\u8FD9\u91CC */
    authenticate: async function (username, password, callback) {
      console.log('\u63D2\u4EF6\u7F51\u9875\u767B\u5F55/\u9A8C\u8BC1\u7528\u6237\u6743\u9650\u65F6\uFF1A', username, password);
      const isValid = await checkUser(username, password);
      return isValid
        ? callback(null, [username])
        : callback(new Error('Authentication failed'));
    },
    adduser: async function (username, password, callback) {
      console.log('\u63D2\u4EF6npm adduser\u548Cnpm login\uFF1A', username, password);
      // \u8FD9\u91CC\u76F4\u63A5\u963B\u65AD\u6CE8\u518C\uFF0C\u53EA\u80FD\u767B\u5F55\u5DF2\u5B58\u5728\u7684\u8D26\u53F7
      const isValid = await checkUser(username, password);
      return isValid
        ? callback(null, [username])
        : callback(new Error('User registration is not allowed'));
    },
  };
};
`,paraId:28,tocIndex:2},{value:"\u8BBE\u7F6E /root/.config/verdaccio/config.yaml \u914D\u7F6E\u6587\u4EF6\uFF0C\u5C06 auth \u4E0B\u7684 htpasswd \u5220\u9664\uFF0C\u6DFB\u52A0\u81EA\u5B9A\u4E49\u63D2\u4EF6\u9274\u6743\u65B9\u5F0F",paraId:29,tocIndex:2},{value:`plugins: /Users/haokur/code/verdaccio-plugins
auth:
  #htpasswd:
  #file: ./htpasswd
  #max_users: -1
  verdaccio-custom-auth-plugin:
  version: '^1.0.0'
`,paraId:30,tocIndex:2},{value:"\u5982\u4E0A\u4E00\u4E2A auth \u63D2\u4EF6\u5C31\u7B80\u5355\u5BF9\u63A5\u6210\u529F\u4E86\u3002\u4ED6\u9650\u5236\u4E86 adduser \u4E0D\u80FD\u4F7F\u7528\uFF0Clogin \u53EA\u80FD\u767B\u5F55\u5DF2\u63D0\u4F9B\u7684\u7528\u6237\u548C\u5BC6\u7801\u3002",paraId:31,tocIndex:2},{value:"\u5F00\u53D1\u81EA\u5B9A\u4E49\u4E2D\u95F4\u4EF6",paraId:32,tocIndex:2},{value:`- verdaccio-custom-middleware
- index.js
- package.json
`,paraId:33,tocIndex:2},{value:"package.json \u5982\u4E0B\uFF1A",paraId:34,tocIndex:2},{value:`{
  "name": "verdaccio-custom-middleware",
  "version": "1.0.0",
  "main": "index.js"
}
`,paraId:35,tocIndex:2},{value:"Index.js \u4EE3\u7801\u5982\u4E0B\uFF1A",paraId:36,tocIndex:2},{value:`module.exports = (config, stuff) => {
  return {
    register_middlewares(app, auth, storage) {
      app.use((req, res, next) => {
        console.log(req.url, req.headers, 'index.js::5\u884C');
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
`,paraId:37,tocIndex:2},{value:"\u5728 verdaccio \u7684\u914D\u7F6E\u6587\u4EF6\u4E2D\uFF0C\u6DFB\u52A0\u4E2D\u95F4\u4EF6\u914D\u7F6E",paraId:38,tocIndex:2},{value:`middlewares:
  verdaccio-custom-middleware:
    enabled: true
    package: /root/verdaccio/middlewares/verdaccio-custom-middleware/index.js
  audit:
    enabled: true
`,paraId:39,tocIndex:2},{value:"\u6CE8\u610F\u5176\u4E2D package \u8BBE\u7F6E\u4E86\u8DEF\u5F84\u4E0D\u4E00\u5B9A\u751F\u6548\uFF0C\u5047\u82E5\u62A5\u9519\u627E\u4E0D\u5230\u5305\uFF0C\u5219\u5728 verdaccio-custom-middleware \u6587\u4EF6\u5939\u4E0B\uFF0C",paraId:40,tocIndex:2},{value:"npm link .",paraId:40,tocIndex:2},{value:" \u672C\u5730\u5B89\u88C5\u4E00\u4E0B\u8FD9\u4E2A\u5305\u3002",paraId:40,tocIndex:2},{value:"\u67E5\u770B\u6253\u5370\u65E5\u5FD7\uFF0C\u53EF\u4EE5\u6293\u53D6\u5230\u8BF7\u6C42\u5934\u4E2D\u6570\u636E\uFF0C\u5927\u81F4\u5982\u4E0B\uFF1A",paraId:41,tocIndex:2},{value:`/@haokur%2fts-test {
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
`,paraId:42,tocIndex:2},{value:"\u5C06\u5176\u4E2D\u7684 authhorization \u7684\u503C xxxxxxxeRV2Zlvmw==\uFF0C\u590D\u5236\u51FA\u6765\uFF0C\u7C98\u8D34\u5230 .npmrc \u6587\u4EF6\u4E0B",paraId:43,tocIndex:2},{value:`package-lock=false
@haokur:registry=https://npm.haokur.com/
//npm.haokur.com/:_authToken=xxxxxxxeRV2Zlvmw==
`,paraId:44,tocIndex:2},{value:"\u8FD9\u6837\uFF0C\u5C31\u4E0D\u9700\u8981 npm login \uFF0C\u4E5F\u53EF\u4EE5\u4E0B\u8F7D\u4ED3\u5E93\u91CC\u7684\u5305\u4E86",paraId:45,tocIndex:2},{value:"\u4E8E\u662F\u53EF\u4EE5\u6309\u7167\u4EE5\u4E0B\u8BBE\u7F6E\u6743\u9650",paraId:46,tocIndex:2},{value:"@haokur/*\uFF0C\u8BBE\u7F6E\u4E3A\u516C\u5171\u5305\uFF0C\u4E0D\u767B\u5F55\u6CA1 token\uFF0C\u4E5F\u80FD\u8BBF\u95EE\u4E0B\u8F7D\uFF0C\u4F46\u662F\u672A\u767B\u5F55\u4E0D\u80FD publish",paraId:47,tocIndex:2},{value:"@haokur-private/*\uFF0C\u8BBE\u7F6E\u4E3A\u79C1\u6709\u5305\uFF0C\u672A\u767B\u5F55\u7528\u6237\u4E0D\u80FD\u67E5\u770B\u4E0B\u8F7D\uFF0C\u767B\u5F55\u7528\u6237\u4EC5\u53EF\u67E5\u770B\uFF0C\u4F46\u4E0D\u80FD publish",paraId:47,tocIndex:2},{value:"\u4E13\u95E8\u8BBE\u7F6E\u51E0\u4E2A\u8D26\u53F7\uFF0C\u80FD\u591F publish\uFF0C\u5373\u4F8B\u5982 admin\uFF0Csuperadmin\uFF0C\u8FD8\u6709\u4E00\u4E2A\u7ED9\u6D41\u6C34\u7EBF\u5982 codeup-robot\uFF0C\u501F\u7528\u4E2D\u95F4\u4EF6\u83B7\u53D6\u5230\u5BF9\u5E94\u8D26\u53F7\u7684 token\uFF0C\u53EF\u4EE5\u8003\u8651\u653E\u5230\u9879\u76EE\u7684 .npmrc \u4E2D\u8BBE\u7F6E",paraId:47,tocIndex:2},{value:"\u53EA\u8BBE\u7F6E superadmin\uFF0C\u6709\u6743\u9650\u5220\u9664\u5E93",paraId:47,tocIndex:2},{value:`packages:
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

`,paraId:48,tocIndex:2},{value:"\u6CE8\u610F\u591A\u4E2A\u8D26\u53F7\u4E4B\u95F4\uFF0C\u662F\u7528\u7A7A\u683C\u9694\u5F00\uFF0C\u4E0D\u662F\u9017\u53F7\u3002",paraId:49,tocIndex:2},{value:"\u8FDB\u4E00\u6B65\u7684\u5B89\u5168\u8BBE\u7F6E\uFF0C\u53EF\u4EE5\u5728\u4E2D\u95F4\u4EF6\u4E2D\uFF0C\u9650\u5236 IP,",paraId:50,tocIndex:2},{value:`// verdaccio-custom-middleware/index.js
module.exports = (config, stuff) => {
  return {
    register_middlewares(app, auth, storage) {
      app.use((req, res, next) => {
        console.log(req.url, req.headers, 'index.js::5\u884C');
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
`,paraId:51,tocIndex:2},{value:"\u66F4\u5F7B\u5E95\u4E00\u70B9\uFF0C\u5C31\u662F\u53EA\u90E8\u7F72\u5728\u5185\u7F51\uFF0C\u53EA\u6709\u5185\u7F51\u80FD\u591F\u8BBF\u95EE\u3002",paraId:52,tocIndex:2},{value:"\u5728\u767B\u5F55\u548C\u9000\u51FA\u79C1\u6709\u4ED3\u5E93\u65F6\uFF0C\u4F7F\u7528 npm login \u9700\u8981\u5E26\u4ED3\u5E93",paraId:53,tocIndex:3},{value:`npm login --registry https://npm.hoakur.com
npm logout --registry https://npm.hoakur.com
`,paraId:54,tocIndex:3},{value:".npmrc \u914D\u7F6E\u7684 token \u7684\u6743\u91CD\u662F\u8981\u5927\u4E8E npm login \u767B\u5F55\u7684\u7528\u6237\u7684",paraId:55,tocIndex:3}]},51446:function(t,a,n){n.r(a),n.d(a,{texts:function(){return e}});var o=n(68537);const e=[]},3190:function(t,a,n){n.r(a),n.d(a,{texts:function(){return e}});var o=n(43648);const e=[{value:"\u4EE3\u7801\u5B9E\u73B0\uFF08javascript\uFF09\uFF1A",paraId:0,tocIndex:0},{value:"haokur/algorithm",paraId:0,tocIndex:0},{value:"\u52A8\u6001\u6548\u679C\u9884\u89C8\uFF1A",paraId:0,tocIndex:0},{value:"haokur.github.io/algorithm",paraId:0,tocIndex:0}]},66301:function(t,a,n){n.r(a),n.d(a,{texts:function(){return e}});var o=n(4299);const e=[{value:"\u6838\u5FC3\uFF1A\u4E00\u6B21\u5FAA\u73AF\uFF0C\u524D\u540E\u4E24\u4E24\u6BD4\u8F83\uFF0C\u524D\u8005\u5927\u4E8E\u540E\u8005\uFF0C\u5219\u4E92\u6362\u4F4D\u7F6E\uFF0C\u6BCF\u6B21\u5FAA\u73AF\u5192\u6CE1\u4E00\u4E2A\u6700\u5927\u7684\u51FA\u6765",paraId:0,tocIndex:1},{value:`function bubblingSort(arr) {
  // \u8D70 i \u6B21 j \u7684\u904D\u5386
  for (let i = 0; i < arr.length; i++) {
    // j \u4E00\u8F6E\u904D\u5386\u786E\u5B9A\u4E00\u4E2A\u6700\u5927\u6570
    // i \u8F6E\u6B21 j\uFF0C\u786E\u5B9A i \u4E2A\u6570\uFF0C\u5219 j \u7684\u904D\u5386\u5C11 i \u6B21
    // \u518D-1 \u56E0\u4E3A\u6BD4\u8F83\u7684\u65B9\u6CD5\uFF0C\u4F7F\u7528\u4E86 j+1 \u7684\u4F4D\u7F6E
    for (let j = 0; j < arr.length - i - 1; j++) {
      // \u4E3B\u8981\u6BD4\u8F83\u903B\u8F91
      if (arr[j] > arr[j + 1]) {
        let temp = arr[j + 1];
        arr[j + 1] = arr[j];
        arr[j] = temp;
      }
    }
  }
}
let arr = [3, 1, 7, 4, 88, 2, 6];
bubblingSort(arr);
console.log(arr);
`,paraId:1,tocIndex:1},{value:"\u6838\u5FC3\uFF1A\u9009\u62E9\u4E00\u4E2A\u6570\uFF0C\u7136\u540E\u6570\u7EC4\u5176\u4ED6\u672A\u6392\u5E8F\u7684\u6570\u4E00\u4E00\u548C\u8FD9\u4E2A\u6570\u6BD4\u8F83\uFF0C\u5927\u5C0F\u4E92\u6362\u4F4D\u7F6E",paraId:2,tocIndex:2},{value:`function selectSort(arr) {
  for (let i = 0; i < arr.length; i++) {
    for (let j = i + 1; j < arr.length; j++) {
      // \u4E3B\u8981\u6BD4\u8F83\u903B\u8F91
      if (arr[j] < arr[i]) {
        const temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
      }
    }
  }
}
let arr = [3, 1, 7, 4, 88, 2, 6];
selectSort(arr);
console.log(arr);
`,paraId:3,tocIndex:2},{value:"\u6838\u5FC3\uFF1A\u5C06\u5F53\u524D\u6570\u5B57 a\uFF0C\u4ECE\u6570\u5B57\u524D\u4E00\u4E2A\u4F4D\u7F6E\uFF0C\u4F9D\u6B21\u5F80\u524D\u6BD4\u8F83\uFF0C\u5982\u679C\u6BD4 a \u5927\uFF0C\u5219\u5F80\u540E\u79FB\u4E00\u4F4D\uFF0C\u7A7A\u4F4D\u8BA9\u7ED9 a",paraId:4,tocIndex:3},{value:`function insertSort(arr) {
  // \u7B2C\u4E00\u4E2A\u6570\u7EC4\u8FB9\u6CA1\u6709\u6570\uFF0C\u9ED8\u8BA4\u4ED6\u7684\u4F4D\u7F6E\u662Fok\u7684
  for (let i = 1; i < arr.length; i++) {
    // \u53D6\u51FA\u8981\u6765\u4E0E\u524D\u9762\u6BCF\u4E2A\u6570\u6BD4\u8F83\u7684\u56FA\u5B9A\u503C
    const current = arr[i];

    // \u6682\u5B58j\uFF0Cj\u662F\u5728\u6BD4\u8F83\u8FC7\u7A0B\u4E2D\u4E0D\u65AD\u53D8\u5316\u7684\uFF0C\u6700\u540E\u505C\u5728\u90A3\u4E2A\u5C0F\u4E8Ecurrent\u7684\u5730\u65B9
    let j;
    // \u5F53arr[j]\u5927\u4E8E\u7B49\u4E8Ecurrent\u65F6\uFF0C\u9000\u51FA\u5FAA\u73AF
    for (j = i - 1; j > -1 && arr[j] >= current; j--) {
      // \u5C06\u5927\u4E8Ecurrent\u7684\u540E\u79FB
      arr[j + 1] = arr[j];
    }
    // \u5728\u5C0F\u4E8Ecurrent\u7684\u5730\u65B9\u7684\u7D22\u5F15+1\uFF0C\u653Ecurrent\u7684\u503C
    arr[j + 1] = current;
  }
}
let arr = [3, 1, 7, 4, 88, 2, 6];
insertSort(arr);
console.log(arr);
`,paraId:5,tocIndex:3},{value:"\u6838\u5FC3\uFF1A\u9012\u5F52\u4E8C\u5206\u6CD5\uFF0C\u4ECE\u5DE6\u53D6\u4E00\u4E2A\u6570\uFF0C\u5C06\u7EC4\u5185\u5176\u4ED6\u6570\u6309\u4ED6\u5206\u7EC4\uFF0C\u5C0F\u7684\u5728\u5DE6\uFF0C\u5927\u7684\u5728\u53F3\uFF0C\u7136\u540E\u5B83\u7684\u5DE6\u53F3\u4E24\u7EC4\u53C8\u6309\u540C\u7684\u5206\u6CD5\uFF0C\u7EE7\u7EED\u5206\u7EC4\u4E0B\u53BB\uFF0C\u76F4\u5230\u4E0D\u80FD\u62C6\u5206",paraId:6,tocIndex:4},{value:`
\u800C\u5C0F\u7684\u653E\u5DE6\uFF0C\u5927\u7684\u653E\u53F3\u4F7F\u7528\u53CC\u6307\u9488\u6BD4\u8F83\uFF0C\u6362\u4F4D\u7F6E\u7684\u65B9\u6CD5`,paraId:6,tocIndex:4},{value:`function partial(arr, low, high) {
  // \u53EF\u53D6\u7B2C\u4E00\u4E2A\u6570\uFF0C\u6216\u8005\u968F\u673A\u7EC4\u5185\u4E00\u4E2A\u6570\u907F\u514D\u6781\u7AEF\u60C5\u51B5
  let current = arr[low];

  while (high > low) {
    while (high > low && arr[high] >= current) high--;
    arr[low] = arr[high];
    while (high > low && arr[low] <= current) low++;
    arr[high] = arr[low];
  }

  arr[low] = current;
  return low;
}

function quickSort(arr, low, high) {
  low ??= 0;
  high ??= arr.length - 1;

  if (high > low) {
    let _splitIndex = partial(arr, low, high);
    quickSort(arr, low, _splitIndex - 1);
    quickSort(arr, _splitIndex + 1, high);
  }
}
let arr = [3, 1, 7, 4, 88, 2, 6];
quickSort(arr);
console.log(arr);
`,paraId:7,tocIndex:4}]},16514:function(t,a,n){n.r(a),n.d(a,{texts:function(){return e}});var o=n(94807);const e=[]},56076:function(t,a,n){n.r(a),n.d(a,{texts:function(){return e}});var o=n(22695);const e=[{value:"v18+",paraId:0,tocIndex:0}]},61770:function(t,a,n){n.r(a),n.d(a,{texts:function(){return e}});var o=n(37535);const e=[]},75373:function(t,a,n){n.r(a),n.d(a,{texts:function(){return e}});var o=n(99920);const e=[{value:"Vue2 and Vue3",paraId:0,tocIndex:0}]},2347:function(t,a,n){n.r(a),n.d(a,{texts:function(){return e}});var o=n(79825);const e=[{value:"Vue2",paraId:0,tocIndex:0}]},73728:function(t,a,n){n.r(a),n.d(a,{texts:function(){return e}});var o=n(61831);const e=[{value:"Vue3",paraId:0,tocIndex:0}]}}]);
