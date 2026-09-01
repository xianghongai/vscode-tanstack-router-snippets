/**
 * 展开每条片段，检查展开结果在其声明的每种语言中语法合法。
 *
 * 这里不判断代码做了什么，只确认 body 是合法的片段语法、且展开后能被解析。
 * 片段面向已声明的依赖版本与日常场景，不在此重复论证这些约定。
 *
 * 类型仅作文档用途——Vitest 会剥离类型，没有任何环节做类型检查。
 */
import { globSync, readFileSync } from 'node:fs';
import { parse } from '@babel/parser';
import { expect, test } from 'vitest';

type Snippet = { body: string | string[]; scope: string };

/** 解析各语言展开结果所需的 Babel 插件。 */
const plugins: Record<string, string[]> = {
  javascript: [],
  javascriptreact: ['jsx'],
  typescript: ['typescript'],
  typescriptreact: ['typescript', 'jsx'],
};

/**
 * 把占位符解析为默认值，即片段刚插入编辑器时呈现的样子。
 *
 * `${n:default}` 取其默认值，`${n}` 镜像重复同一个默认值，裸 tabstop 不留下内容。
 * 反斜杠转义原样还原，使片段正文里的 JS 模板串插值保持字面量。
 */
function expand(text: string): string {
  const defaults = new Map<string, string>();

  for (const [, index, value] of text.matchAll(/(?<!\\)\$\{(\d+):([^}]*)\}/g)) {
    defaults.set(index, value);
  }

  return text.replace(
    /\\(.)|\$\{(\d+):([^}]*)\}|\$\{(\d+)\}|\$(\d+)/g,
    (_match, escaped?: string, withDefault?: string, value?: string, mirror?: string) => {
      if (escaped !== undefined) {
        return escaped;
      }
      if (withDefault !== undefined) {
        return value as string;
      }
      return mirror === undefined ? '' : (defaults.get(mirror) ?? '');
    }
  );
}

const snippets = globSync('src/**/*.json')
  .sort()
  .flatMap((file) =>
    Object.entries(JSON.parse(readFileSync(file, 'utf8')) as Record<string, Snippet>).map(([name, snippet]) => ({
      file,
      name,
      snippet,
    }))
  );

test('sources were found', () => {
  expect(snippets.length).toBeGreaterThan(0);
});

for (const { file, name, snippet } of snippets) {
  const body = Array.isArray(snippet.body) ? snippet.body.join('\n') : snippet.body;

  for (const language of snippet.scope.split(',').map((item) => item.trim())) {
    test(`${name} [${language}]`, () => {
      const code = expand(body);
      // 片段多数是待插入的碎片：可能是对象里的一个属性，也可能是函数体内的语句，
      // 单独放在顶层并不合法。依次尝试三种上下文，任一解析通过即算合法；
      // 但始终使用该语言自身的语法，避免 TypeScript 或 JSX 混进不支持它们的 scope。
      const contexts = [code, `const object = {\n${code}\n};`, `function fn() {\n${code}\n}`];
      let failure: Error | undefined;

      for (const source of contexts) {
        try {
          parse(source, { sourceType: 'module', plugins: plugins[language] as never });
          return;
        } catch (error) {
          failure ??= error as Error;
        }
      }

      throw new Error(`${file}: ${(failure as Error).message}`);
    });
  }
}
