# TanStack Router Snippets (Visual Studio Code)

VS Code 中的 TanStack Router 日常代码片段：文件式路由、导航、search 参数、loader、router context、边界组件、TanStack Query 集成与 TanStack Start。

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

## 前缀清单

前缀遵循三种模式：

1. **API 名本身就是前缀**：`createFileRoute`、`useLoaderData`、`Link`。路由 API 的名字**就是**最终要写下的代码，中间没有翻译环节，无需先记一套映射。
2. **高频 API 另配短码**：`r` + API 首字母（`rl` = `Link`、`ruld` = `useLoaderData`）；名字本身以 route 或 router 开头的不再补这个 `r`（`rc` = `routeContext`）。两种形式挂在同一条片段上，短码是用熟之后的提速手段，而不是上手门槛。
3. **同族共用词干，变体在其后扩展**：`Link` / `LinkParams` / `LinkSearch`，以及 `fileRoute…`、`codeRoute…`、`start…`。打出词干就能在补全列表里摊开整族备选，不必回忆该用哪个后缀。

### router 装配

| 前缀                     | 缩写    | 插入内容                            |
| ------------------------ | ------- | ----------------------------------- |
| `routerEntry`            | `re`    | 应用入口：创建、注册并挂载 router   |
| `createRouter`           | `rcr`   | 由生成的路由树创建 router 实例      |
| `routerRegister`         | `rrr`   | `declare module` 类型注册           |
| `RouterProvider`         | `rp`    | 渲染 router 的组件                  |
| `routerVitePlugin`       |         | Vite 配置中的路由生成器             |
| `TanStackRouterDevtools` | `rtsrd` | 根路由组件内的开发者工具            |
| `routerImport`           | `ri`    | 导入 API，类型用 `routerTypeImport` |

### 路由定义

| 前缀                     | 缩写    | 插入内容                                               |
| ------------------------ | ------- | ------------------------------------------------------ |
| `createFileRoute`        | `rcfr`  | 文件式路由及其组件                                     |
| `routeModule`            | `rm`    | 完整路由模块：loader、组件、错误与等待状态             |
| `fileRouteParam`         | `rfrp`  | 动态段，并按其加载与读取                               |
| `fileRouteOptionalParam` |         | 可缺省的前导段                                         |
| `fileRouteSplat`         |         | splat 路由，读取 `_splat`                              |
| `fileRouteLayout`        | `rfrl`  | 带 `Outlet` 的布局路由                                 |
| `fileRoutePathless`      |         | 不产生 URL 段的分组布局                                |
| `createLazyFileRoute`    | `rclfr` | 组件拆分到 `.lazy` 文件                                |
| `createRootRoute`        | `rcrr`  | 根路由，类型化 context 用 `createRootRouteWithContext` |
| `rootDocument`           |         | 负责整份 HTML 文档的根路由                             |

### 代码式路由

| 前缀            | 缩写 | 插入内容                    |
| --------------- | ---- | --------------------------- |
| `codeRootRoute` |      | 手工组树的根路由            |
| `createRoute`   |      | 挂到父路由上的路由          |
| `codeRouteTree` |      | 用 `addChildren` 组装的树   |
| `codeRouteLazy` |      | 以 `.lazy` 拆分的代码式路由 |

### 导航

| 前缀             | 缩写   | 插入内容                                |
| ---------------- | ------ | --------------------------------------- |
| `Link`           | `rl`   | 跳转到某个路由                          |
| `LinkParams`     | `rlp`  | 跳转到带动态段的路由                    |
| `LinkSearch`     |        | 携带 search 参数跳转                    |
| `LinkActive`     | `rla`  | 激活时自带样式的 Link                   |
| `LinkPreload`    |        | 单个链接的预加载策略覆盖                |
| `linkOptions`    |        | 在 JSX 之外声明链接选项                 |
| `useNavigate`    | `run`  | 编程式导航，带动态段用 `navigateParams` |
| `Navigate`       | `rn`   | 渲染时导航                              |
| `redirect`       | `rr`   | 抛出重定向，并携带当前 href             |
| `useBlocker`     | `rub`  | 拦截导航并自行决定去留                  |
| `useRouterState` | `rurs` | 通过 selector 读取 router 状态          |
| `useCanGoBack`   |        | 后退，并给出兜底路由                    |

### search 参数

| 前缀               | 缩写  | 插入内容                                                |
| ------------------ | ----- | ------------------------------------------------------- |
| `validateSearch`   | `rvs` | search schema：Zod 版与普通函数版                       |
| `searchMiddleware` | `rsm` | `retainSearchParams` 与 `stripSearchParams`             |
| `useSearch`        | `rus` | 路由内 `Route.useSearch()` 与外部 `useSearch({ from })` |
| `useSearchSelect`  |       | 只订阅一个 search 字段                                  |
| `searchUpdater`    |       | 更新单个参数并保留其余的 `Link`                         |
| `navigateSearch`   |       | 同样的更新，以编程方式进行                              |

### 路径参数

| 前缀          | 缩写   | 插入内容                                                |
| ------------- | ------ | ------------------------------------------------------- |
| `useParams`   | `rup`  | 路由内 `Route.useParams()` 与外部 `useParams({ from })` |
| `getRouteApi` | `rgra` | 一次绑定到某个路由的外部组件                            |
| `routeParams` |        | 参数的 `parse` 与 `stringify`                           |

### 数据加载

| 前缀               | 缩写   | 插入内容                                |
| ------------------ | ------ | --------------------------------------- |
| `routeLoader`      | `rrl`  | 带中止信号的 loader                     |
| `loaderDeps`       | `rld`  | 依赖 search 参数的 loader               |
| `loaderStaleTime`  |        | `staleTime`、`gcTime`、`shouldReload`   |
| `beforeLoad`       | `rbl`  | 在 loader 与子路由之前执行的钩子        |
| `useLoaderData`    | `ruld` | loader 结果，其依赖键用 `useLoaderDeps` |
| `loaderDeferred`   |        | 只 await 首屏所需，其余延后             |
| `Await`            |        | 在 `Suspense` 下渲染延后的 promise      |
| `routerInvalidate` |        | 重新执行所有已匹配的 loader             |

### router context

| 前缀                   | 缩写   | 插入内容                            |
| ---------------------- | ------ | ----------------------------------- |
| `routeContext`         | `rc`   | 在 `beforeLoad` 中补充的 context 值 |
| `useRouteContext`      | `rurc` | 从 context 中读取单个值             |
| `routerRuntimeContext` |        | 创建时声明、渲染时注入的 context    |

### 边界组件

| 前缀                | 缩写   | 插入内容                                  |
| ------------------- | ------ | ----------------------------------------- |
| `errorComponent`    | `rec`  | 带 `reset` 按钮的错误状态                 |
| `pendingComponent`  | `rpc`  | 带 `pendingMs`、`pendingMinMs` 的等待状态 |
| `notFoundComponent` | `rnfc` | 单个路由的 not-found 状态                 |
| `notFound`          | `rnf`  | 在 loader 中 `throw notFound()`           |
| `routeBoundaries`   |        | 三者一并作为路由选项挂上                  |

### TanStack Query

| 前缀                 | 缩写   | 插入内容                                      |
| -------------------- | ------ | --------------------------------------------- |
| `ensureQueryData`    | `reqd` | 填充查询缓存的 loader                         |
| `queryPrefetch`      |        | 启动较慢的查询，await 较快的那个              |
| `queryRoute`         | `rqr`  | loader 与 `useSuspenseQuery` 共用同一个查询   |
| `queryClientContext` |        | 把 `queryClient` 类型化到 router context 上   |
| `routerSsrQuery`     |        | 每请求一套 router 与 query client，并接通 SSR |

### TanStack Start

| 前缀                 | 缩写   | 插入内容                                                       |
| -------------------- | ------ | -------------------------------------------------------------- |
| `createServerFn`     | `rcsf` | server function                                                |
| `serverFnValidator`  | `rsfv` | 带校验的 server function                                       |
| `createServerOnlyFn` |        | 不进入客户端产物的工具函数                                     |
| `createIsomorphicFn` |        | 同一函数的服务端与客户端实现                                   |
| `useServerFn`        | `rusf` | 在组件中调用 server function                                   |
| `createMiddleware`   |        | 多个 server function 共用的中间件                              |
| `startServerRoute`   | `rssr` | 路由文件中的 HTTP handler，带动态段用 `startServerRouteParams` |
| `createServerEntry`  |        | 包裹默认 handler 的服务端入口                                  |
| `startImport`        |        | 导入 TanStack Start API                                        |

### 组合场景

| 前缀                    | 缩写  | 插入内容                               |
| ----------------------- | ----- | -------------------------------------- |
| `routeGuard`            | `rg`  | 携带 href 重定向的鉴权无路径布局       |
| `routeLoginRedirect`    |       | 把访问者送回该 href 的登录路由         |
| `routePagination`       | `rrp` | 页码存于 URL，经 `loaderDeps` 传到查询 |
| `routeFormSubmit`       | `rfs` | 服务端校验的提交、重定向与失效刷新     |
| `routePendingIndicator` |       | 统一的导航进行中指示器                 |

## 官方依据

- [VS Code 片段格式与 scope](https://code.visualstudio.com/docs/editing/userdefinedsnippets)
- [TanStack Router 路由概念](https://tanstack.com/router/latest/docs/framework/react/routing/routing-concepts)
- [TanStack Router search 参数](https://tanstack.com/router/latest/docs/framework/react/guide/search-params)
- [TanStack Router 数据加载](https://tanstack.com/router/latest/docs/framework/react/guide/data-loading)
- [TanStack Router router context](https://tanstack.com/router/latest/docs/framework/react/guide/router-context)
- [TanStack Router 与 TanStack Query 集成](https://tanstack.com/router/latest/docs/framework/react/integrations/query)
- [TanStack Start server functions](https://tanstack.com/start/latest/docs/framework/react/guide/server-functions)

MIT 许可，见 LICENSE。
