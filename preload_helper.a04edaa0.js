!function(){"use strict";var t="/".replace(/([^/])$/,"$1/"),e=location.pathname,n=e.startsWith(t)&&decodeURI("/".concat(e.slice(t.length)));if(n){var a=document,c=a.head,r=a.createElement.bind(a),i=function(t,e,n){var a,c=e.r[t]||(null===(a=Object.entries(e.r).find((function(e){var n=e[0];return new RegExp("^".concat(n.replace(/\/:[^/]+/g,"/[^/]+").replace("/*","/.+"),"$")).test(t)})))||void 0===a?void 0:a[1]);return null==c?void 0:c.map((function(t){var a=e.f[t][1],c=e.f[t][0];return{type:c.split(".").pop(),url:"".concat(n.publicPath).concat(c),attrs:[["data-".concat(e.b),"".concat(e.p,":").concat(a)]]}}))}(n,{"p":"notes","b":"webpack","f":[["docs__business__jupyter-lab.md.a40fdb19.async.js",7],["nm__dumi__dist__client__pages__Demo__index.578aa5c0.chunk.css",9],["nm__dumi__dist__client__pages__Demo__index.81348c51.async.js",9],["nm__dumi__dist__client__pages__404.8b85f2d9.chunk.css",65],["nm__dumi__dist__client__pages__404.ee1d1e60.async.js",65],["docs__leetcode__other.md.347412a9.async.js",76],["Foo__index.md.8907fe6c.async.js",81],["docs__basic__index.md.afde156d.async.js",83],["docs__nodejs__koa.md.4eea1b09.async.js",113],["docs__golang__index.md.0b335046.async.js",198],["docs__golang__basic.md.87aa52a1.async.js",218],["docs__business__slice-download-upload.md.69ccbd01.async.js",228],["docs__business__webrtc.md.43780ec3.async.js",248],["docs__basic__design-patterns.md.085d8dd1.async.js",274],["docs__vue__index.md.8dbe3c1f.async.js",305],["docs__vue__vue3-vs-vue2.md.0b1b938d.async.js",320],["docs__vue__vue2.md.6f7a7fdd.async.js",322],["docs__business__ffmpeg.md.c514eeed.async.js",333],["docs__business__font-indexdb.md.1daa885c.async.js",394],["docs__business__verdaccio-npm.md.02299a09.async.js",465],["docs__basic__typescript.md.d4148784.async.js",485],["index.md.dc904d24.async.js",506],["nm__dumi__theme-default__layouts__DocLayout__index.9a86d34d.async.js",519],["docs__business__electron-ipc.md.6f2a114e.async.js",521],["docs__basic__javascript.md.631c7fdc.async.js",525],["docs__react__index.md.fd0b5cef.async.js",563],["docs__leetcode__sort.md.b9291ebd.async.js",613],["docs__business__async-queue.md.54461e81.async.js",623],["Bar__index.md.0ed825d0.async.js",653],["776.e8c51481.chunk.css",776],["776.630e39af.async.js",776],["docs__business__media-source.md.91c74379.async.js",793],["docs__nodejs__index.md.ab9acb84.async.js",801],["docs__business__index.md.53bf3fc4.async.js",839],["docs__vue__vue3.md.71d51797.async.js",850],["docs__vue__vue3-setup.md.043a4041.async.js",916],["dumi__tmp-production__dumi__theme__ContextWrapper.d874ce87.async.js",923],["docs__business__custom-ssl.md.c8682198.async.js",927],["docs__index.md.6be01d96.async.js",935],["docs__business__docker-usage.md.96606426.async.js",947],["docs__leetcode__index.md.c83e0a2d.async.js",948],["docs__business__excalidraw-custom.md.7811544e.async.js",988]],"r":{"/*":[3,4,22,29,30,36],"/":[38,22,29,30,36],"/business":[33,22,29,30,36],"/leetcode":[40,22,29,30,36],"/golang":[9,22,29,30,36],"/nodejs":[32,22,29,30,36],"/basic":[7,22,29,30,36],"/react":[25,22,29,30,36],"/vue":[14,22,29,30,36],"/components":[21,22,29,30,36],"/~demos/:id":[1,2,36],"/business/slice-download-upload":[11,22,29,30,36],"/business/excalidraw-custom":[41,22,29,30,36],"/business/verdaccio-npm":[19,22,29,30,36],"/basic/design-patterns":[13,22,29,30,36],"/business/docker-usage":[39,22,29,30,36],"/business/electron-ipc":[23,22,29,30,36],"/business/font-indexdb":[18,22,29,30,36],"/business/media-source":[31,22,29,30,36],"/business/async-queue":[27,22,29,30,36],"/business/jupyter-lab":[0,22,29,30,36],"/business/custom-ssl":[37,22,29,30,36],"/basic/javascript":[24,22,29,30,36],"/basic/typescript":[20,22,29,30,36],"/vue/vue3-vs-vue2":[15,22,29,30,36],"/business/ffmpeg":[17,22,29,30,36],"/business/webrtc":[12,22,29,30,36],"/leetcode/other":[5,22,29,30,36],"/vue/vue3-setup":[35,22,29,30,36],"/leetcode/sort":[26,22,29,30,36],"/golang/basic":[10,22,29,30,36],"/nodejs/koa":[8,22,29,30,36],"/vue/vue2":[16,22,29,30,36],"/vue/vue3":[34,22,29,30,36],"/components/bar":[28,22,29,30,36],"/components/foo":[6,22,29,30,36]}},{publicPath:"/"});null==i||i.forEach((function(t){var e,n=t.type,a=t.url;if("js"===n)(e=r("script")).src=a,e.async=!0;else{if("css"!==n)return;(e=r("link")).href=a,e.rel="preload",e.as="style"}t.attrs.forEach((function(t){e.setAttribute(t[0],t[1]||"")})),c.appendChild(e)}))}}();