# 烽火陇原 THE ECHOES OF LONGYUAN

山河有信，精神不息。React + Vite + HashRouter 红色历史数字展馆。保留首页、专属开场、3D 历史卡片、48 个内容条目、地图、搜索、筛选、图片查看及青年寄语。

## 上传 GitHub

1. 打开这个文件夹，全选其中的文件和文件夹，上传到 GitHub 仓库根目录。不要把外层 longyuan-github-ready-20261111 文件夹再套进去。
2. 上传后，仓库首页应直接看到 package.json、src、scripts、public-assets.json.gz。
3. 本目录共 99 个文件，未包含 node_modules 和 dist。所有必要配置均是普通文件；.gitignore 只用于本地忽略生成目录，不影响构建。

## Cloudflare Pages

| 配置 | 填写 |
|---|---|
| Root directory | 留空 |
| Build command | npm run build |
| Build output directory | dist |

如果自行把整个项目套进仓库子目录，Root directory 就改为该子目录的实际名称。请使用 Pages 项目。未在本次操作中推送 GitHub 或发布 Cloudflare。

## 本地安装、运行与打包

使用 Node.js 20 或更高版本。进入含 package.json 的文件夹后执行：

```powershell
npm install
npm run dev
```

打包和本地检查：

```powershell
npm run build
npm run check
npm run preview
```

## 图片包与后续修改

- src/ 是可编辑的 React、CSS、数据和插画源文件，结构保持原项目。
- public-assets.json.gz 是 44 个 public 图片文件的压缩资源包，包含展示图片和原有已保存原件。没有删除图片。
- npm run dev 和 npm run build 会自动执行 Node 内置脚本，将资源包还原为 public/images/...，页面按原路径加载。构建不需要联网下载图片，不新增解压依赖。
- 如需手动查看原始文件，运行 npm run assets:restore。
- 修改解包后的 public 图片后，先运行 npm run assets:pack，再把更新后的 public-assets.json.gz 提交 GitHub。脚本保留已有本地修改，不会自动覆盖它们。
- GitHub Desktop 会忽略 node_modules、dist、public；源代码和资源包是提交对象。浏览器上传时选此原始交付文件夹即可，不要上传本地运行后生成的依赖目录。
- src/data/v2History.js、v2People.js、v2Museums.js 管理文字；collectedImages.js、v2Images.js 管理配图。素材出处见 IMAGE_SOURCES.md，史料出处见 HISTORY_SOURCES.md。

## 部署路径

Vite base 为 ./，HashRouter 保持不变。详情地址形如 /#/history/huining；刷新仍从根 index.html 加载。所有图片由 Cloudflare 随静态页面提供。
