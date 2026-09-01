# TanStack Router Snippets (Visual Studio Code)

Everyday TanStack Router patterns for VS Code: file routes, navigation, search params, loaders, router context, boundaries, TanStack Query integration and TanStack Start.

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

[中文文档](./README_CN.md)

## Prefixes

Prefixes follow three patterns:

1. **The API name is the prefix** — `createFileRoute`, `useLoaderData`, `Link`. A router API's name _is_ the code you are about to write, so there is no mapping to memorize first.
2. **Frequent APIs also answer to a short alias** — `r` plus the API's initials (`rl` = `Link`, `ruld` = `useLoaderData`); a name already starting with route or router drops that `r` (`rc` = `routeContext`). Both forms sit on the same snippet, so the alias is a speed-up once you know it, never the way in.
3. **A family shares a stem, variants extend it** — `Link` / `LinkParams` / `LinkSearch`, `fileRoute…`, `codeRoute…`, `start…`. Type the stem and the completion list lays the whole family out; nothing has to be recalled from memory.

### Router setup

| Prefix                   | Alias   | Inserts                                                   |
| ------------------------ | ------- | --------------------------------------------------------- |
| `routerEntry`            | `re`    | Application entry — create, register and mount the router |
| `createRouter`           | `rcr`   | Router instance from the generated route tree             |
| `routerRegister`         | `rrr`   | `declare module` type registration                        |
| `RouterProvider`         | `rp`    | The component that renders the router                     |
| `routerVitePlugin`       |         | Route generator in a Vite config                          |
| `TanStackRouterDevtools` | `rtsrd` | Devtools inside the root route component                  |
| `routerImport`           | `ri`    | Import an API, `routerTypeImport` for a type              |

### Routes

| Prefix                   | Alias   | Inserts                                                      |
| ------------------------ | ------- | ------------------------------------------------------------ |
| `createFileRoute`        | `rcfr`  | File route and its component                                 |
| `routeModule`            | `rm`    | Full route module — loader, component, error, pending        |
| `fileRouteParam`         | `rfrp`  | Dynamic segment, loaded and read by it                       |
| `fileRouteOptionalParam` |         | Optional leading segment                                     |
| `fileRouteSplat`         |         | Splat route reading `_splat`                                 |
| `fileRouteLayout`        | `rfrl`  | Layout route with an `Outlet`                                |
| `fileRoutePathless`      |         | Pathless layout that adds no URL segment                     |
| `createLazyFileRoute`    | `rclfr` | Component split into a `.lazy` file                          |
| `createRootRoute`        | `rcrr`  | Root route, `createRootRouteWithContext` for a typed context |
| `rootDocument`           |         | Root route owning the HTML document                          |

### Code-based routes

| Prefix          | Alias | Inserts                             |
| --------------- | ----- | ----------------------------------- |
| `codeRootRoute` |       | Root of a hand-assembled tree       |
| `createRoute`   |       | Route attached to its parent        |
| `codeRouteTree` |       | Tree assembled with `addChildren`   |
| `codeRouteLazy` |       | Code-based route split with `.lazy` |

### Navigation

| Prefix           | Alias  | Inserts                                                  |
| ---------------- | ------ | -------------------------------------------------------- |
| `Link`           | `rl`   | Link to a route                                          |
| `LinkParams`     | `rlp`  | Link to a dynamic segment                                |
| `LinkSearch`     |        | Link carrying search params                              |
| `LinkActive`     | `rla`  | Link that styles itself while active                     |
| `LinkPreload`    |        | Per-link preloading override                             |
| `linkOptions`    |        | Link options declared outside JSX                        |
| `useNavigate`    | `run`  | Programmatic navigation, `navigateParams` with a segment |
| `Navigate`       | `rn`   | Navigate on render                                       |
| `redirect`       | `rr`   | Thrown redirect carrying the current href                |
| `useBlocker`     | `rub`  | Block navigation and resolve it yourself                 |
| `useRouterState` | `rurs` | Router state read through a selector                     |
| `useCanGoBack`   |        | Back, with a fallback route                              |

### Search params

| Prefix             | Alias | Inserts                                                         |
| ------------------ | ----- | --------------------------------------------------------------- |
| `validateSearch`   | `rvs` | Search schema — a Zod version and a plain-function version      |
| `searchMiddleware` | `rsm` | `retainSearchParams` and `stripSearchParams`                    |
| `useSearch`        | `rus` | In-route `Route.useSearch()` and external `useSearch({ from })` |
| `useSearchSelect`  |       | Subscribe to one search field                                   |
| `searchUpdater`    |       | `Link` that updates one param and keeps the rest                |
| `navigateSearch`   |       | The same update, programmatically                               |

### Path params

| Prefix        | Alias  | Inserts                                                         |
| ------------- | ------ | --------------------------------------------------------------- |
| `useParams`   | `rup`  | In-route `Route.useParams()` and external `useParams({ from })` |
| `getRouteApi` | `rgra` | Outside component bound once to a route                         |
| `routeParams` |        | `parse` and `stringify` for a param                             |

### Data loading

| Prefix             | Alias  | Inserts                                     |
| ------------------ | ------ | ------------------------------------------- |
| `routeLoader`      | `rrl`  | Loader with an abort signal                 |
| `loaderDeps`       | `rld`  | Loader keyed on search params               |
| `loaderStaleTime`  |        | `staleTime`, `gcTime`, `shouldReload`       |
| `beforeLoad`       | `rbl`  | Hook running before the loader and children |
| `useLoaderData`    | `ruld` | Loader result, `useLoaderDeps` for its key  |
| `loaderDeferred`   |        | Await the first paint, defer the rest       |
| `Await`            |        | Render a deferred promise under `Suspense`  |
| `routerInvalidate` |        | Re-run every matched loader                 |

### Router context

| Prefix                 | Alias  | Inserts                                          |
| ---------------------- | ------ | ------------------------------------------------ |
| `routeContext`         | `rc`   | Value added to the context in `beforeLoad`       |
| `useRouteContext`      | `rurc` | One value read out of the context                |
| `routerRuntimeContext` |        | Context declared at creation, supplied at render |

### Boundaries

| Prefix              | Alias  | Inserts                                           |
| ------------------- | ------ | ------------------------------------------------- |
| `errorComponent`    | `rec`  | Error state with a `reset` button                 |
| `pendingComponent`  | `rpc`  | Pending state with `pendingMs` and `pendingMinMs` |
| `notFoundComponent` | `rnfc` | Not-found state of one route                      |
| `notFound`          | `rnf`  | `throw notFound()` from a loader                  |
| `routeBoundaries`   |        | All three attached as route options               |

### TanStack Query

| Prefix               | Alias  | Inserts                                          |
| -------------------- | ------ | ------------------------------------------------ |
| `ensureQueryData`    | `reqd` | Loader filling the query cache                   |
| `queryPrefetch`      |        | Slow query started, fast one awaited             |
| `queryRoute`         | `rqr`  | Loader plus `useSuspenseQuery` on the same query |
| `queryClientContext` |        | `queryClient` typed onto the router context      |
| `routerSsrQuery`     |        | Per-request router and query client, SSR wired   |

### TanStack Start

| Prefix               | Alias  | Inserts                                                                |
| -------------------- | ------ | ---------------------------------------------------------------------- |
| `createServerFn`     | `rcsf` | Server function                                                        |
| `serverFnValidator`  | `rsfv` | Server function with a validator                                       |
| `createServerOnlyFn` |        | Helper kept out of the client bundle                                   |
| `createIsomorphicFn` |        | Server and client implementations of one function                      |
| `useServerFn`        | `rusf` | Call a server function from a component                                |
| `createMiddleware`   |        | Middleware shared across server functions                              |
| `startServerRoute`   | `rssr` | HTTP handlers in a route file, `startServerRouteParams` with a segment |
| `createServerEntry`  |        | Server entry wrapping the default handler                              |
| `startImport`        |        | Import a TanStack Start API                                            |

### Recipes

| Prefix                  | Alias | Inserts                                                 |
| ----------------------- | ----- | ------------------------------------------------------- |
| `routeGuard`            | `rg`  | Authenticated pathless layout redirecting with the href |
| `routeLoginRedirect`    |       | Login route returning the visitor to that href          |
| `routePagination`       | `rrp` | Page number in the URL, through `loaderDeps` to a query |
| `routeFormSubmit`       | `rfs` | Server-validated submission, redirect and invalidate    |
| `routePendingIndicator` |       | One indicator for any in-flight navigation              |

## References

- [VS Code snippet format and scopes](https://code.visualstudio.com/docs/editing/userdefinedsnippets)
- [TanStack Router routing concepts](https://tanstack.com/router/latest/docs/framework/react/routing/routing-concepts)
- [TanStack Router search params](https://tanstack.com/router/latest/docs/framework/react/guide/search-params)
- [TanStack Router data loading](https://tanstack.com/router/latest/docs/framework/react/guide/data-loading)
- [TanStack Router router context](https://tanstack.com/router/latest/docs/framework/react/guide/router-context)
- [TanStack Router with TanStack Query](https://tanstack.com/router/latest/docs/framework/react/integrations/query)
- [TanStack Start server functions](https://tanstack.com/start/latest/docs/framework/react/guide/server-functions)

MIT licensed. See LICENSE.
