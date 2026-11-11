# GitHub 上传版验收 · 2026-11-11

## 交付结构

- 99 个文件，package.json 位于根目录；包含完整 React 源码、package-lock.json、Vite 配置、图片资源包和来源记录。
- 44 个 public 文件归入 public-assets.json.gz，包含展示照片及已保存原件。src/assets 的插画和图形保持普通文件。
- npm run dev / npm run build 自动解包；脚本只用 Node 内置模块。资源包内逐文件 SHA-256 校验，现有本地修改不被自动覆盖。
- 上传文件夹未包含 node_modules、dist、Git 历史、个人配置、临时图片或工作记录。
- 面向访客的待授权／申请授权提示及相应任务说明已去除，图像来源、作者署名与已有 CC 许可链接保留。图片未删除、未去水印。

## 实际测试

在独立副本 work/github-upload-check-20261111 中执行，保持交付文件夹整洁：

1. npm install --no-audit --no-fund：成功安装 66 个包。
2. npm run build：prebuild 自动还原 44/44 个文件，Vite 5.4.21 成功处理 116 个模块。
3. npm run check：48 条记录、18 份重点档案、2 组名录、出处关联、相关路由、本地图片字节、相对资源路径及 9 张首页卡片目标均通过。
4. npm run preview -- --host 127.0.0.1 --port 4191 --strictPort：实际启动成功。最初尝试的 4190 端口被 fetch 的端口限制阻止，已改用 4191。
5. 44 个 public 文件逐个 HTTP 200，响应 SHA-256 与源项目、压缩包完全一致。入口 HTML、JS、CSS 同样 HTTP 200 并与 dist 字节一致。
6. 生成 dist/index.html、dist/assets 与 dist/images；JS 331.73 kB（gzip 127.78 kB），CSS 101.41 kB（gzip 22.65 kB）。
7. 上传版与同步更新的原工作项目构建出的 JS 完全一致；构建产物中无待授权／申请授权提示。
8. 重复 npm run assets:restore 不覆盖已存在资源；npm run assets:pack 重新压缩后，44 个路径及哈希完全相同。

## 部署配置与测试边界

Cloudflare Pages：Root directory 留空；Build command 为 npm run build；Build output directory 为 dist。Vite base 仍为 ./，HashRouter 不变。

本轮测试了本地安装、构建、资源包还原、重新打包和生产资源服务；没有声称在 Cloudflare 服务器执行过构建。本轮未推送 GitHub、未更改线上项目，也未重复上一批全站视觉与浏览器交互检查。
