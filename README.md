# TanStack Router Snippets (Visual Studio Code)

Everyday TanStack Router code patterns for VS Code: file routes, navigation, search params, path params, loaders, router context, boundaries, TanStack Query integration and TanStack Start.

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

## Design

**One capability per snippet, one scope per language.** All snippets ship in a single `.code-snippets` file. Which languages a snippet reaches is decided by its own `scope` field, not by the file it lives in. A body carrying type annotations or generics is offered only in TypeScript language modes, and a body carrying JSX never appears in plain JavaScript or TypeScript.

**TypeScript is the main line.** Inference is what TanStack Router is for — route paths, params, search fields and loader data are all typed from the route tree — so most snippets are written the way a TypeScript project writes them, and only the entry file has a separate JavaScript twin.

**Sources are split by module.** Each capability owns a directory under `src/`, and `src/recipes/` owns the cross-module examples. The build merges them in sorted order into the single contributed file. A snippet is identified by its name, so a repeated name fails the build — the later definition would otherwise silently replace the earlier one.

**Prefixes are the discovery path, and they may repeat.** A snippet that wraps one API uses that API's real name (`createFileRoute`, `useNavigate`, `useSearch`, `Link`, `notFound`, `createServerFn`); a scenario uses a module stem (`routerEntry`, `fileRouteLayout`, `loaderDeps`, `searchMiddleware`, `routeGuard`). Because VS Code triggers on prefix but identifies a snippet by name, several snippets may share a prefix and are offered side by side, labelled by name — that is how `useSearch` offers both the in-route `Route.useSearch()` form and the `useSearch({ from })` form for components elsewhere.

**File-based routing is the main path; code-based routing ships too.** Most snippets assume the route generator and a `routeTree.gen` file. `src/code-routes/` covers the projects that assemble a tree by hand with `createRoute` and `addChildren`, under `codeRootRoute`, `createRoute`, `codeRouteTree` and `codeRouteLazy`.

**Imports are separate from fragments.** A fragment inserts only the code it is about and names its required imports in its description; a complete file template carries its own imports. Editable placeholders cover what you actually rename — route path, component, param, loader function, query options — while illustrative field names stay literal so the Tab sequence stays short. Repeated identifiers are mirrors and update together.

**Responsibilities stay separate.** The router owns the URL, its params and its search; TanStack Query owns server state. The `src/query/` snippets are only the seam between them — filling the query cache from a loader, putting a `queryClient` on the router context, wiring SSR dehydration. Snippets for TanStack Query's own API live in [React Ecosystem Snippets](https://github.com/xianghongai/vscode-react-ecosystem-snippets), and React Router v7 lives in [React Router Snippets](https://github.com/xianghongai/vscode-react-router-snippets).

**No runtime.** The extension contributes snippets and nothing else — no extension-host code, no activation events, no dependency installation, no project detection, no telemetry. Snippets are offered by language mode, never gated on which libraries your project happens to have installed.

## Usage

Install the VSIX through **Extensions → Install from VSIX…**, then open a file in a JavaScript, JavaScript React, TypeScript or TypeScript React language mode.

Type an API name or a module stem and pick from the completion list, or use **Insert Snippet** to browse. Press **Tab** to move through the editing points; the final cursor lands where you continue writing. Enable `editor.tabCompletion` in your settings if you prefer expanding a prefix directly with Tab.

Complete file templates — the application entry, a route module, the root document, and the recipes — are also reachable through **Snippets: Fill File with Snippet**.

Three conventions are worth knowing:

- **Route paths are placeholders, and the generator owns them.** A snippet inserts a path such as `/posts/$postId` as editable text. In a file-based project the route generator rewrites that argument to match the file's location, so the file name is what actually decides the route.
- **Reading route state has two forms.** Inside a route module, use the `Route` it exports: `Route.useSearch()`, `Route.useParams()`, `Route.useLoaderData()`. From a component elsewhere, either pass `from` to the standalone hook or bind once with `getRouteApi`. Both forms ship, under the same prefixes.
- **`./service` is the integration boundary.** File recipes import their request functions and query options from a relative `./service` module. Create it with your own request layer, or edit the path and the exported name — both are editable placeholders. No HTTP client, API host, path alias or UI library is prescribed.

## Modules

The extension carries no runtime dependency on these packages; install in your application only the ones you use. Versions below are the tested major-version families, not a claim about every historical minor release.

| Module            | Install                                                           |
| ----------------- | ----------------------------------------------------------------- |
| Router            | `@tanstack/react-router@1`                                        |
| Route generation  | `@tanstack/router-plugin@1`, for Vite, Rspack, webpack or esbuild |
| Devtools          | `@tanstack/react-router-devtools@1`                               |
| Search validation | `zod@4`, or any other Standard Schema validator                   |
| Server state      | `@tanstack/react-query@5`                                         |
| Server rendering  | `@tanstack/react-router-ssr-query@1`, with TanStack Query         |
| Full-stack        | `@tanstack/react-start@1`                                         |

React 19 is the tested target. TypeScript projects also need the matching React type packages.

`validateSearch` accepts any Standard Schema validator directly, so Zod is one option rather than a requirement — a plain validating function is covered too. The `src/start/` snippets assume a TanStack Start build; the rest of the extension does not.

When building from source, you can set `SNIPPETS_EXCLUDE` to exclude whole directories from the source. For instance, `SNIPPETS_EXCLUDE=src/start/**,src/code-routes/**` bundles a file-based, client-only subset. Put it in a gitignored `.env` so the choice stays out of the source tree; a value passed on the command line wins over the file.

## References

- [VS Code snippet format and scopes](https://code.visualstudio.com/docs/editing/userdefinedsnippets)
- [TanStack Router routing concepts](https://tanstack.com/router/latest/docs/framework/react/routing/routing-concepts)
- [TanStack Router search params](https://tanstack.com/router/latest/docs/framework/react/guide/search-params)
- [TanStack Router data loading](https://tanstack.com/router/latest/docs/framework/react/guide/data-loading)
- [TanStack Router router context](https://tanstack.com/router/latest/docs/framework/react/guide/router-context)
- [TanStack Router with TanStack Query](https://tanstack.com/router/latest/docs/framework/react/integrations/query)
- [TanStack Start server functions](https://tanstack.com/start/latest/docs/framework/react/guide/server-functions)

MIT licensed. See LICENSE.
