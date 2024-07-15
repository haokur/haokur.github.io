"use strict";(self.webpackChunknotes=self.webpackChunknotes||[]).push([[904],{95523:function(a,t,n){n.r(t),n.d(t,{demos:function(){return r}});var o=n(67294),e=n(37132),r={}},96624:function(a,t,n){n.r(t),n.d(t,{demos:function(){return r}});var o=n(67294),e=n(81005),r={}},11171:function(a,t,n){n.r(t),n.d(t,{demos:function(){return r}});var o=n(67294),e=n(68537),r={}},67715:function(a,t,n){n.r(t),n.d(t,{demos:function(){return r}});var o=n(67294),e=n(43648),r={}},46926:function(a,t,n){n.r(t),n.d(t,{demos:function(){return r}});var o=n(67294),e=n(4299),r={}},90702:function(a,t,n){n.r(t),n.d(t,{demos:function(){return r}});var o=n(67294),e=n(94807),r={}},46983:function(a,t,n){n.r(t),n.d(t,{demos:function(){return r}});var o=n(67294),e=n(22695),r={}},57828:function(a,t,n){n.r(t),n.d(t,{demos:function(){return r}});var o=n(67294),e=n(37535),r={}},47537:function(a,t,n){n.r(t),n.d(t,{demos:function(){return r}});var o=n(67294),e=n(99920),r={}},48516:function(a,t,n){n.r(t),n.d(t,{demos:function(){return r}});var o=n(67294),e=n(79825),r={}},81206:function(a,t,n){n.r(t),n.d(t,{demos:function(){return r}});var o=n(67294),e=n(61831),r={}},87447:function(a,t,n){n.r(t),n.d(t,{texts:function(){return e}});var o=n(37132);const e=[{value:"\u6587\u4EF6\u5206\u7247\u4E0A\u4F20\u4E0B\u8F7D",paraId:0,tocIndex:0}]},53350:function(a,t,n){n.r(t),n.d(t,{texts:function(){return e}});var o=n(81005);const e=[{value:"\u6E90\u7801\u5B9E\u73B0\uFF08koa\uFF09\uFF1A",paraId:0,tocIndex:1},{value:"koa-server/src/controllers/file.controller.ts",paraId:0,tocIndex:1},{value:"\u6E90\u7801\u5B9E\u73B0\uFF08Vue3\uFF09\uFF1A",paraId:0,tocIndex:1},{value:"client/pages/upload/upload.vue",paraId:0,tocIndex:1},{value:"\u5728\u7EBF DEMO\uFF1A",paraId:0,tocIndex:1},{value:"Vue3-client ",paraId:0,tocIndex:1},{value:"Vue3-client (haokur.github.io)",paraId:1,tocIndex:1},{value:"\u524D\u7AEF slice \u5207\u5272\uFF0C\u670D\u52A1\u7AEF\u5408\u5E76",paraId:2,tocIndex:2},{value:"\u6838\u5FC3\u5728\u4E8E\u524D\u7AEF\uFF0C\u544A\u8BC9\u540E\u7AEF\u5F53\u524D\u662F\u54EA\u4E00\u6BB5\uFF0C\u4EE5\u53CA\u8FD9\u4E00\u6BB5\u7684\u6570\u636E",paraId:3,tocIndex:2},{value:"Html \u4E2D\u6DFB\u52A0 input \u4E3A file \u7684\u63A7\u4EF6",paraId:4,tocIndex:2},{value:`<input type="file" @change="handleFileChange" />
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
`,paraId:21,tocIndex:3},{value:"\u5728\u5206\u7247\u7684\u65F6\u5019\uFF0C\u4F4D\u7F6E\u4E0D\u8981\u6709\u91CD\u53E0\uFF0C\u5982\u5207\u7247\u7684\u7247\u6BB5\u5E94\u8BE5\u662F [ [1,3],[4,6]] \uFF0C\u800C\u4E0D\u662F [[1,3],[3,5]]",paraId:22,tocIndex:4}]},51446:function(a,t,n){n.r(t),n.d(t,{texts:function(){return e}});var o=n(68537);const e=[]},3190:function(a,t,n){n.r(t),n.d(t,{texts:function(){return e}});var o=n(43648);const e=[{value:"\u4EE3\u7801\u5B9E\u73B0\uFF08javascript\uFF09\uFF1A",paraId:0,tocIndex:0},{value:"haokur/algorithm",paraId:0,tocIndex:0},{value:"\u52A8\u6001\u6548\u679C\u9884\u89C8\uFF1A",paraId:0,tocIndex:0},{value:"haokur.github.io/algorithm",paraId:0,tocIndex:0}]},66301:function(a,t,n){n.r(t),n.d(t,{texts:function(){return e}});var o=n(4299);const e=[{value:"\u6838\u5FC3\uFF1A\u4E00\u6B21\u5FAA\u73AF\uFF0C\u524D\u540E\u4E24\u4E24\u6BD4\u8F83\uFF0C\u524D\u8005\u5927\u4E8E\u540E\u8005\uFF0C\u5219\u4E92\u6362\u4F4D\u7F6E\uFF0C\u6BCF\u6B21\u5FAA\u73AF\u5192\u6CE1\u4E00\u4E2A\u6700\u5927\u7684\u51FA\u6765",paraId:0,tocIndex:1},{value:`function bubblingSort(arr) {
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
`,paraId:7,tocIndex:4}]},16514:function(a,t,n){n.r(t),n.d(t,{texts:function(){return e}});var o=n(94807);const e=[]},56076:function(a,t,n){n.r(t),n.d(t,{texts:function(){return e}});var o=n(22695);const e=[{value:"v18+",paraId:0,tocIndex:0}]},61770:function(a,t,n){n.r(t),n.d(t,{texts:function(){return e}});var o=n(37535);const e=[]},75373:function(a,t,n){n.r(t),n.d(t,{texts:function(){return e}});var o=n(99920);const e=[{value:"Vue2 and Vue3",paraId:0,tocIndex:0}]},2347:function(a,t,n){n.r(t),n.d(t,{texts:function(){return e}});var o=n(79825);const e=[{value:"Vue2",paraId:0,tocIndex:0}]},73728:function(a,t,n){n.r(t),n.d(t,{texts:function(){return e}});var o=n(61831);const e=[{value:"Vue3",paraId:0,tocIndex:0}]}}]);
