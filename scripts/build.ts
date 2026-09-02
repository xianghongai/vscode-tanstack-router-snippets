/**
 * 把 `src/` 下按模块拆分的片段源合并为单个 `.code-snippets` 文件，
 * 即 package.json 中 `contributes.snippets` 注册的那一个。
 *
 * 按模块拆分是为了让片段源可维护；而 VS Code 只读取注册的那一个文件，
 * 故有此合并步骤。每条片段投放到哪些语言由它自己的 `scope` 决定，
 * 与它落在哪个文件无关。
 *
 * 类型仅作文档用途——Node 会剥离类型，没有任何环节做类型检查。
 */
import 'dotenv/config';
import { globSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { basename, dirname } from 'node:path';
import pc from 'picocolors';

/** 一条 VS Code 片段定义，在其源文件中以名称为键。 */
type Snippet = {
  prefix: string | string[];
  body: string | string[];
  description?: string;
  /** 逗号分隔的语言 id。缺省时 VS Code 会让该片段对所有语言生效。 */
  scope?: string;
  isFileTemplate?: boolean;
};

/* ------------------------------------------------------------------ *
 * 输入与输出——两者都不含仓库名，可原样移植到其他片段仓库             *
 * ------------------------------------------------------------------ */

const sources = 'src/**/*.json';
const output = 'snippets/index.code-snippets';

/**
 * 从 `sources` 中排除的 glob，逗号分隔，取自环境变量 `SNIPPETS_EXCLUDE`。
 *
 * 若干目录只对部分工程成立：不用 TanStack Start 的项目不需要 `src/start/**`，
 * 只写文件式路由的项目不需要 `src/code-routes/**`。自建裁剪版时把排除项写进
 * `.env`（由 dotenv 加载，该文件已被 git 忽略），源码因此保持不变：
 *
 *     SNIPPETS_EXCLUDE=src/start/**,src/code-routes/**
 *
 * 也可只对单次构建生效：`SNIPPETS_EXCLUDE=... pnpm run build`，此时命令行传入
 * 的值优先于 `.env`。未设置时包含全部来源，这是发布版的形态。
 *
 * 必须用 `globSync` 的 `exclude` 选项：否定 glob（`'!src/start/**'`）无效，
 * 会被当作普通模式处理。
 */
const exclude = (process.env.SNIPPETS_EXCLUDE ?? '')
  .split(',')
  .map((pattern) => pattern.trim())
  .filter(Boolean);

/* ------------------------------------------------------------------ *
 * 通用逻辑                                                            *
 * ------------------------------------------------------------------ */

// 排序以固定合并顺序，从而保证产物可复现。
const files = globSync(sources, { exclude }).sort();

if (!files.length) {
  throw new Error(`No snippet sources matched ${sources}`);
}

const snippets: Record<string, Snippet> = {};
/** 名称 -> 首次定义它的文件，便于重名时同时指出冲突双方。 */
const origin = new Map<string, string>();
const collisions: string[] = [];
/** 缺少 `scope` 的片段会对所有语言生效，多半是漏写而非本意。 */
const unscoped: string[] = [];

/** 每个来源文件贡献的片段数，构建成功后逐行列出。 */
const contributions: Array<[file: string, count: number]> = [];

for (const file of files) {
  const contents = JSON.parse(readFileSync(file, 'utf8')) as Record<string, Snippet>;
  contributions.push([file, Object.keys(contents).length]);

  for (const [name, snippet] of Object.entries(contents)) {
    // VS Code 靠名称识别片段，`prefix` 只是触发词，因此前缀可以自由重复。
    // 真正的隐患是名称重复：下面的赋值会丢弃先前那条，片段就此静默消失。
    if (origin.has(name)) {
      collisions.push(`  "${name}"\n    ${origin.get(name)}\n    ${file}`);
    } else {
      origin.set(name, file);
    }

    if (!snippet.scope) {
      unscoped.push(`  "${name}"\n    ${file}`);
    }

    snippets[name] = snippet;
  }
}

if (collisions.length) {
  throw new Error(`Duplicate snippet name, these would be silently dropped:\n${collisions.join('\n')}`);
}

// 本仓库注册的是不带 `language` 的 `.code-snippets`，投放范围完全由 `scope` 决定；
// 漏写会让该片段出现在 Markdown、JSON 等任何语言里。
if (unscoped.length) {
  throw new Error(`Missing "scope", these would apply to every language:\n${unscoped.join('\n')}`);
}

mkdirSync(dirname(output), { recursive: true });
writeFileSync(output, `${JSON.stringify(snippets, null, 2)}\n`);

// 列出参与构建的来源，设置了 SNIPPETS_EXCLUDE 时可据此确认排除是否生效。
// 对齐按未着色的路径长度计算：ANSI 转义序列会让基于字符串长度的补白失真。
const width = Math.max(...contributions.map(([file]) => file.length));
for (const [file, count] of contributions) {
  const padding = ' '.repeat(width - file.length);
  const label = `${pc.dim(`${dirname(file)}/`)}${basename(file)}`;
  console.log(`  ${label}${padding}  ${pc.cyan(String(count).padStart(3))}`);
}

// 配置了排除时列出实际被排除的文件。模式写错会让这份清单为空而片段总数不变，
// 据此可立刻发现，而不是等到装上 VSIX 才察觉排除没生效。
// 不读取这些文件：既然已排除，一个内容损坏的来源也不该让构建失败。
if (exclude.length) {
  const included = new Set(files);
  console.log(pc.yellow(`excluded by SNIPPETS_EXCLUDE (${exclude.join(', ')}):`));
  for (const file of globSync(sources).sort()) {
    if (!included.has(file)) {
      console.log(pc.dim(`  ${file}`));
    }
  }
}

console.log(
  `${pc.green(output)}: ${pc.bold(String(origin.size))} snippets from ${pc.bold(String(files.length))} files`
);
