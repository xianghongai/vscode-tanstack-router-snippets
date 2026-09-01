# TanStack Router Snippets (Visual Studio Code)

VS Code 中的 TanStack Router 日常代码片段：文件式路由、导航、search 参数、路径参数、loader、router context、边界组件、TanStack Query 集成与 TanStack Start。

<p>
  <a href="https://github.com/xianghongai/vscode-tanstack-router-snippets">
    <img src="https://img.shields.io/github/repo-size/xianghongai/vscode-tanstack-router-snippets?color=4ac51c&style=plastic" alt="Repo Size">
  </a>
  <a href="https://marketplace.visualstudio.com/items?itemName=nicholashsiang.vscode-tanstack-router-snippets">
    <img src="https://vsmarketplacebadges.dev/version/nicholashsiang.vscode-tanstack-router-snippets.svg?style=plastic&color=4ac51c" alt="Visual Studio Marketplace Version">
  </a>
  <a href="https://marketplace.visualstudio.com/items?itemName=nicholashsiang.vscode-tanstack-router-snippets">
    <img src="https://vsmarketplacebadges.dev/downloads-short/nicholashsiang.vscode-tanstack-router-snippets.svg?style=plastic&color=4ac51c" alt="Downloads">
  </a>
  <a href="https://marketplace.visualstudio.com/items?itemName=nicholashsiang.vscode-tanstack-router-snippets">
    <img src="https://vsmarketplacebadges.dev/rating-short/nicholashsiang.vscode-tanstack-router-snippets.svg?style=plastic&color=4ac51c" alt="Rating">
  </a>
  <a href="https://github.com/xianghongai/vscode-tanstack-router-snippets/blob/HEAD/LICENSE">
    <img src="https://img.shields.io/github/license/xianghongai/vscode-tanstack-router-snippets?color=4ac51c&style=plastic" alt="License">
  </a>
</p>

[English](./README.md)

## 设计

**一条片段一个能力，一个 scope 决定投放语言。** 所有片段合并在单个 `.code-snippets` 文件中。某条片段出现在哪些语言，由它自己的 `scope` 字段决定，与它落在哪个文件无关。带类型注解或泛型的片段只在 TypeScript 语言模式下出现；带 JSX 的片段不会串到纯 JavaScript 或 TypeScript 模式。

**TypeScript 是主线。** 类型推导正是 TanStack Router 的目的——路由路径、params、search 字段与 loader 数据都由路由树推出——因此绝大多数片段按 TypeScript 工程的写法编写，只有入口文件另配 JavaScript 版本。

**片段源按模块拆分。** 每个能力域在 `src/` 下拥有一个目录，跨模块组合场景归 `src/recipes/`。构建按排序合并成唯一的贡献文件。片段以名称标识，因此名称重复会导致构建失败——否则后者会静默覆盖前者。

**前缀是主要发现入口，且允许重复。** 封装单个 API 的片段直接用该 API 的真名（`createFileRoute`、`useNavigate`、`useSearch`、`Link`、`notFound`、`createServerFn`）；场景类使用模块词干（`routerEntry`、`fileRouteLayout`、`loaderDeps`、`searchMiddleware`、`routeGuard`）。VS Code 靠前缀触发、靠名称识别片段，因此多条片段可以共用一个前缀，并列出现在候选中并以名称区分——`useSearch` 便同时提供路由内的 `Route.useSearch()` 与供外部组件使用的 `useSearch({ from })` 两种形态。

**文件式路由是主路径，代码式路由同样提供。** 多数片段假定使用路由生成器与 `routeTree.gen`。`src/code-routes/` 面向手工用 `createRoute` 与 `addChildren` 组树的工程，前缀为 `codeRootRoute`、`createRoute`、`codeRouteTree`、`codeRouteLazy`。

**导入与片段正文分离。** 碎片类片段只插入它本身相关的代码，所需导入写在描述里；完整文件模板自带 imports。可编辑占位符覆盖真正需要改名的部分——路由路径、组件、参数、loader 函数、query options——示例字段名保持字面量，以免 Tab 序列过长。重复出现的标识符是镜像，会联动更新。

**职责边界保持独立。** router 管 URL 及其 params 与 search，TanStack Query 管服务端状态。`src/query/` 只覆盖两者之间的接缝：在 loader 中填充查询缓存、把 `queryClient` 挂到 router context、装配 SSR 脱水。TanStack Query 自身 API 的片段在 [React Ecosystem Snippets](https://github.com/xianghongai/vscode-react-ecosystem-snippets)，React Router v7 在 [React Router Snippets](https://github.com/xianghongai/vscode-react-router-snippets)。

**没有运行时。** 该扩展只贡献片段：没有扩展宿主代码、没有激活事件、不安装依赖、不探测项目、不采集数据。片段按语言模式提供候选，不会因项目是否安装某个库而自动启停。

## 使用

通过 **Extensions → Install from VSIX…** 安装，然后在 JavaScript、JavaScript React、TypeScript 或 TypeScript React 语言模式下打开文件。

输入 API 名或模块词干，从补全列表中选择，也可通过 **Insert Snippet** 浏览。按 **Tab** 在编辑点之间移动，最终光标停在继续书写的位置。若希望直接按前缀 Tab 展开，可在个人设置中开启 `editor.tabCompletion`。

完整文件模板——应用入口、路由模块、根文档与各组合场景——也可通过 **Snippets: Fill File with Snippet** 插入。

有三处约定需要知晓：

- **路由路径是占位符，真正决定它的是生成器。** 片段插入的 `/posts/$postId` 一类路径是可编辑文本；在文件式工程中，路由生成器会按文件位置改写该实参，因此文件名才是路由的实际来源。
- **读取路由状态有两种形态。** 在路由模块内部使用它导出的 `Route`：`Route.useSearch()`、`Route.useParams()`、`Route.useLoaderData()`；在模块之外的组件中，或给独立 Hook 传 `from`，或用 `getRouteApi` 一次绑定。两种形态都已提供，共用同一批前缀。
- **`./service` 是应用接入点。** 完整场景片段从相对路径 `./service` 导入请求函数与 query options。请用自身的请求层实现该模块，或直接修改路径与导出名——两者都是可编辑占位符。示例不约定 HTTP 客户端、API 域名、路径别名或 UI 组件库。

## 模块

扩展本身不依赖下列包，在应用中按需安装即可。版本为已验证的大版本组合，并不宣称覆盖全部历史小版本。

| 模块        | 安装                                                               |
| ----------- | ------------------------------------------------------------------ |
| 路由        | `@tanstack/react-router@1`                                         |
| 路由生成    | `@tanstack/router-plugin@1`，适用于 Vite、Rspack、webpack、esbuild |
| 开发者工具  | `@tanstack/react-router-devtools@1`                                |
| search 校验 | `zod@4`，或任意其他 Standard Schema 校验器                         |
| 服务端状态  | `@tanstack/react-query@5`                                          |
| 服务端渲染  | `@tanstack/react-router-ssr-query@1`，配合 TanStack Query          |
| 全栈        | `@tanstack/react-start@1`                                          |

验证目标为 React 19。TypeScript 工程还需匹配的 React 类型包。

`validateSearch` 直接接受任何 Standard Schema 校验器，因此 Zod 只是其中一种选择而非必需，普通校验函数的写法同样已覆盖。`src/start/` 的片段假定使用 TanStack Start 构建，扩展的其余部分不作此假定。

从源码自建，环境变量 `SNIPPETS_EXCLUDE` 可调整目录排除来源，如设为 `src/start/**,src/code-routes/**` 即只打包文件式、纯客户端的那部分。写进已被 git 忽略的 `.env`，该选择便不进入源码树；命令行传入的值优先于该文件。

## 官方依据

- [VS Code 片段格式与 scope](https://code.visualstudio.com/docs/editing/userdefinedsnippets)
- [TanStack Router 路由概念](https://tanstack.com/router/latest/docs/framework/react/routing/routing-concepts)
- [TanStack Router search 参数](https://tanstack.com/router/latest/docs/framework/react/guide/search-params)
- [TanStack Router 数据加载](https://tanstack.com/router/latest/docs/framework/react/guide/data-loading)
- [TanStack Router router context](https://tanstack.com/router/latest/docs/framework/react/guide/router-context)
- [TanStack Router 与 TanStack Query 集成](https://tanstack.com/router/latest/docs/framework/react/integrations/query)
- [TanStack Start server functions](https://tanstack.com/start/latest/docs/framework/react/guide/server-functions)

MIT 许可，见 LICENSE。
