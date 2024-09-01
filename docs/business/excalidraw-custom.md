# excalidraw 二次开发

![界面预览](https://static.haokur.com/github/excalidraw1.png)

开启禅模式后，界面只有一个当前缩放比例的控制器（这个其实也可以去掉）

## 调整功能清单

- 支持中文字体
- 支持服务端保存文件
- 读取远端文件列表，搜索和创建新文件，编辑文件，更新文件
- 使用快捷键，将页面多余元素，全部隐藏,清爽

## 调整文件清单

- excalidraw-app/index.scss
- packages/excalidraw/components/SceneFileListDialog.tsx
- excalidraw-app/helpers.ts
- packages/excalidraw/components/app.tsx
- excalidraw-app/data/index.ts
- excalidraw-app/app.tsx
- .env.development 和 .env.production
- packages/excalidraw/constants.ts
- packages/excalidraw/fonts/index.ts
- packages/excalidraw/fonts/metadata.ts

## 调整步骤

1. 拉取远程代码

```sh
git clone https://github.com/excalidraw/excalidraw
```

2. 配置环境变量

- .env.development
- .env.production

```
VITE_APP_BACKEND_V2_GET_URL=http://localhost:8008/excalidraw/
VITE_APP_BACKEND_V2_POST_URL=http://localhost:8008/excalidraw/
VITE_APP_BACKEND_V2_TOKEN=xxxxx
```

3. 修改文件读取和保存逻辑

- excalidraw-app/app.tsx 中初始化读取场景，initializeScene 方法

```typescript
const initializeScene = async () => {
  // 读取hash中的id参数
  const id = getUrlHashValueByKey('id') || searchParams.get('id');

  // ...其他代码
  if (isExternalScene) {
    if (id) {
      // 其中第二个参数private_key，无意义，只是不改参数传递逻辑
      scene = await loadScene(id, `private_key`, localDataState);
      scene.scrollToContent = true;
    }
  }
  // ...其他代码
};
```

- excalidraw-app/data/index.ts 改写 loadScene 和 importFromBackend 方法

```typescript
const importFromBackend = async (
  id: string,
  decryptionKey: string,
): Promise<ImportedDataState> => {
  const data = await getBackendItemData(id);
  return data;
};

export const loadScene = async (
  id: string | null,
  privateKey: string | null,
  localDataState: ImportedDataState | undefined | null,
) => {
  let data;
  if (id != null && privateKey != null) {
    data = restore(
      await importFromBackend(id, privateKey),
      localDataState?.appState,
      localDataState?.elements,
      { repairBindings: true, refreshDimensions: false },
    );
  } else {
    data = restore(localDataState || null, null, null, {
      repairBindings: true,
    });
  }

  return {
    elements: data.elements,
    appState: data.appState,
    files: data.files,
  };
};
```

- 拦截 ctrl+S 的监听，发送当前数据到自己的后台服务

- packages/excalidraw/components/app.tsx 拦截 onKeyDown 事件

```typescript
private onKeyDown = withBatchedUpdates((event: React.KeyboardEvent KeyboardEvent) => {
    if (isInterceptSuccess(event, this)) {
        return false;
    }
);
```

- excalidraw-app/helpers.ts

```typescript
// 拦截快捷键
const isInterceptSuccess = (
  event: React.KeyboardEvent | KeyboardEvent,
  self: any,
) => {
  const customKeysMap: any = {
    b: () => {
      self.setState({ openDialog: { name: 'switchScene' } });
    },
    e: () => {
      self.setState({ openDialog: 'imageExport' });
    },
    Dead: () => {
      self.setState({ openDialog: 'newScene' });
    },
    s: async () => {
      const elements = self.scene.elements;
      const availableElements = elements.filter((item: any) => !item.isDeleted);
      const name = getUrlHashValueByKey('id');
      let message = '';
      try {
        await updateBackendItemData(
          name,
          JSON5.stringify({
            elements: availableElements,
            appState: {
              viewBackgroundColor: '#ffffff',
              name,
            },
          }),
        );
        message = `${name}保存成功`;
      } catch (error) {
        message = `${name}保存失败`;
      }
      self.setToast({
        message,
        closable: false,
        duration: 1500,
      });
    },
  };
  if (Object.keys(customKeysMap).includes(event.key)) {
    if (event.ctrlKey || event.metaKey || event.altKey) {
      customKeysMap[event.key]();
      event.preventDefault();
      event.stopPropagation();
      return true;
    }
  }
  return false;
};
```

后台判断是否存在对应 id 的数据，没有则新增，有则更新

- 仿 packages/excalidraw/components/CommandPalette/CommandPalette.tsx 文件新建远程服务器文件列表 packages/excalidraw/components/SceneFileListDialog.tsx

```typescript
import React, { useEffect, useMemo, useRef, useState } from 'react';
// ....其他引入
import {
  createBackendItemData,
  fmtDate,
  getBackendListData,
  goPageByScene,
} from '../helpers';

export type ExportCB = (
  elements: readonly NonDeletedExcalidrawElement[],
  scale?: number,
) => void;

export const SceneFileListDialog = ({
  elements,
  appState,
  files,
  actionManager,
  exportOpts,
  canvas,
  setAppState,
}: {
  elements: readonly NonDeletedExcalidrawElement[];
  appState: UIAppState;
  files: BinaryFiles;
  actionManager: ActionManager;
  exportOpts: ExportOpts;
  canvas: HTMLCanvasElement;
  setAppState: React.Component<any, UIAppState>['setState'];
}) => {
  const handleClose = React.useCallback(() => {
    setAppState({ openDialog: null });
    setFileKeyword('');
  }, [setAppState]);

  const [fileKeyword, setFileKeyword] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const [fileList, setFileList] = useState<ISceneFileItem[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  const getFileList = async () => {
    const _fileList: any = await getBackendListData();
    setIsLoaded(true);
    setFileList(_fileList);
  };

  const filteredList = useMemo(() => {
    if (!fileKeyword) {
      return fileList;
    }
    return fileList.filter((item) => item.name.includes(fileKeyword));
  }, [fileList, fileKeyword]);

  useEffect(() => {
    if (appState.openDialog?.name === 'switchScene') {
      getFileList();
    }
  }, [appState.openDialog]);

  const handleFileItemClick = (item: ISceneFileItem) => {
    goPageByScene(item.id);
  };

  // 格式化时间
  const formatTime = (item: ISceneFileItem) => {
    const _time = item.update_at || item.create_at;
    return fmtDate(_time);
  };

  // 新增
  const createSceneFile = async () => {
    const result = await createBackendItemData(fileKeyword);
    goPageByScene(result.data.insertId);
  };

  return (
    <>
      {appState.openDialog?.name === 'switchScene' && (
        <Dialog
          onCloseRequest={() => handleClose()}
          closeOnClickOutside
          title={false}
          size={720}
          autofocus
          className="command-palette-dialog"
        >
          <TextField
            value={fileKeyword}
            placeholder={'输入文件名关键字'}
            onChange={(value) => {
              setFileKeyword(value);
            }}
            selectOnRender
            ref={inputRef}
          />
          <ul className="file-list">
            {filteredList.map((item) => {
              return (
                <li
                  className="file-item"
                  key={item.id}
                  onClick={() => handleFileItemClick(item)}
                >
                  <div>{`${item.id} - ${item.name}`}</div>
                  <div>{formatTime(item)}</div>
                </li>
              );
            })}
          </ul>
          {!filteredList.length && isLoaded && (
            <button type="button" className="add-btn" onClick={createSceneFile}>
              暂无记录，点击新增
            </button>
          )}
        </Dialog>
      )}
    </>
  );
};
```

可以根据文件名称搜索文件，不存在对应文件，则会出现新建按钮，如果存在，则点击可以切换

- excalidraw-app/index.scss 样式修改，隐藏元素

```scss
// 自定义样式
.encrypted-icon {
  &.tooltip {
    display: none;
  }
}
.layer-ui__wrapper__footer-right {
  &.zen-mode-transition {
    display: none;
  }
}
.top-right-ui {
  .excalidraw-button {
    display: none;
  }
}
.undo-redo-buttons {
  display: none;
}
.shapes-section {
  transform: translate(-1000px);
  visibility: hidden;
}
.undo-button-container {
  display: none;
}
.redo-button-container {
  display: none;
}

.App-menu_top__left {
  &.zen-mode {
    transform: translate(-200px);
    transition: transform 0.3s;
  }
}
```

## 字体支持中文

- packages/excalidraw/constants.ts

```typescript
export const FONT_FAMILY = {
  // Virgil: 1,
  'Virgil,HandleDrawCn': 1,
};

export const DEFAULT_FONT_FAMILY: FontFamilyValues =
  FONT_FAMILY['Virgil,HandleDrawCn'];
```

- packages/excalidraw/fonts/index.ts 和 packages/excalidraw/fonts/metadata.ts 中对应 Virgil 的取值都改成 "Virgil,HandleDrawCn"

## 调整后的效果图

![搜索](https://static.haokur.com/github/excalidraw2.png)
![新建](https://static.haokur.com/github/excalidraw3.png)

## 源码地址

- [原 excalidraw 地址](https://github.com/excalidraw/excalidraw)
- [源码地址（需要访问权限）](https://gitee.com/haokur/excalidraw-clean)
