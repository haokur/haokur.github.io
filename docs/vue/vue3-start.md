---
group: Vue3
order: 1
---

# Vue3 快速开始

### 创建方式一，使用 create-vite

```shell
npm create vite@latest my-vue-app
```

流程如下：

```
│
◇  Select a framework:
│  Vue
│
◆  Select a variant:
│  ○ TypeScript
│  ○ JavaScript
│  ● Official Vue Starter ↗ (npm create vue@latest)
│  ○ Nuxt ↗
└
```

> 可以创建简单的 Vue 应用，或 react 等其他应用，也可以使用方式二的官方推荐模板

### 创建方式二，使用官方推荐

```shell
npm create vue@latest
```

流程如下：

```
✔ Project name: … <your-project-name>
✔ Add TypeScript? … No / Yes
✔ Add JSX Support? … No / Yes
✔ Add Vue Router for Single Page Application development? … No / Yes
✔ Add Pinia for state management? … No / Yes
✔ Add Vitest for Unit testing? … No / Yes
✔ Add an End-to-End Testing Solution? … No / Cypress / Nightwatch / Playwright
✔ Add ESLint for code quality? … No / Yes
✔ Add Prettier for code formatting? … No / Yes
✔ Add Vue DevTools 7 extension for debugging? (experimental) … No / Yes

Scaffolding project in ./<your-project-name>...
Done.
```

> 其中安装了 DevTools，则自带已集成了 `@vue/devtools` 和 `vite-plugin-inspect`

#### 手动集成 DevTools

```shell
npm install vite-plugin-vue-devtools --save-dev
```

`vite.config.ts` 配置：

```ts
import { defineConfig } from 'vite';
import VueDevTools from 'vite-plugin-vue-devtools';

export default defineConfig({
  plugins: [VueDevTools()],
});
```

![效果图](https://static.haokur.com/github/vue-devtools.png)
