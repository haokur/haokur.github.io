# 使用 indexdb 存储字体

在遇到字体文件较大时，避免重复加载以及懒加载应用字体，使用 indexdb 存储，每次优先从 indexdb 中读取，生成 blob 的路径，动态生成样式插入到页面应用字体。

## 代码实现

```typescript
const REMOTE_FONT_URL = 'https://haokur.com/fonts'; // 示例font的存储根地址

// 加载字体到indexdb
function loadFontUsingFontFace(fontName: string, fontUrl: string) {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open('fontDB', 1);

    request.onupgradeneeded = function (event: any) {
      const db: any = event?.target?.result;
      if (!db.objectStoreNames.contains('fonts')) {
        db.createObjectStore('fonts');
      }
    };

    request.onsuccess = function (event: any) {
      const db = event.target.result;
      const transaction = db.transaction(['fonts'], 'readonly');
      const objectStore = transaction.objectStore('fonts');
      const fontRequest = objectStore.get(fontName);

      fontRequest.onsuccess = function (event: any) {
        const fontData = event.target.result;

        if (fontData) {
          resolve(fontData);
        } else {
          fetch(fontUrl)
            .then((response) => response.arrayBuffer())
            .then((fontArrayBuffer) => {
              const transaction = db.transaction(['fonts'], 'readwrite');
              const objectStore = transaction.objectStore('fonts');
              objectStore.put(fontArrayBuffer, fontName);
              resolve(fontArrayBuffer);
            })
            .catch((error) => reject(error));
        }
      };

      fontRequest.onerror = function (event: any) {
        console.error('Error querying IndexedDB:', event.target.errorCode);
        reject(event.target.errorCode);
      };
    };

    request.onerror = function (event: any) {
      console.error('IndexedDB error:', event.target.errorCode);
      reject(event.target.errorCode);
    };
  });
}

function applyFont(fontName: string, fontUrl: string, customStyle = '') {
  loadFontUsingFontFace(fontName, fontUrl)
    .then((fontData: any) => {
      // 将字体数据转换为 Blob URL
      const fontBlob = new Blob([fontData], { type: 'font/woff2' });
      const fontBlobUrl = URL.createObjectURL(fontBlob);

      // 使用 @font-face 定义字体
      const style = document.createElement('style');
      style.textContent = `
            @font-face {
                font-family: '${fontName}';
                src: url(${fontBlobUrl}) format('woff2');
                font-display: swap;
                ${customStyle}
            }
        `;
      document.head.appendChild(style);

      // 应用 font-family 到文档
      document.body.style.fontFamily = `'${fontName}', sans-serif`;
    })
    .catch((error) => console.error('Font loading error:', error));
}

function runLoadFont() {
  const fonts = [
    {
      name: 'HandleDrawCn',
      url: `${REMOTE_FONT_URL}/QingSongShouXieTi-1.ttf`,
    },
    { name: 'Virgil', url: `${REMOTE_FONT_URL}/Virgil.woff2` },
    { name: 'Cascadia', url: `${REMOTE_FONT_URL}/Cascadia.woff2` },
    {
      name: 'Assistant',
      url: `${REMOTE_FONT_URL}/Assistant-Regular.woff2`,
    },
  ];
  fonts.forEach((item: any) => {
    const { name, url, customStyle = '' } = item;
    applyFont(name, url, customStyle);
  });
}
```

## 参考

- excalidraw 自定义字体实现
