import { join } from "path";
import { readdir, lstat } from "fs/promises";

export const EXAMPLES_ROOT = join(import.meta.dirname, "../examples");

export interface ExampleInfo {
  category: string;
  name: string;
  path: string;
  hasReadme: boolean;
  hasIndex: boolean;
  hasTest: boolean;
}

/**
 * 递归获取所有示例
 */
export async function getAllExamples(): Promise<ExampleInfo[]> {
  const examples: ExampleInfo[] = [];
  const categories = await readdir(EXAMPLES_ROOT);

  for (const category of categories) {
    const categoryPath = join(EXAMPLES_ROOT, category);
    const stat = await lstat(categoryPath);
    if (!stat.isDirectory()) continue;

    const exampleDirs = await readdir(categoryPath);
    for (const exampleName of exampleDirs) {
      const examplePath = join(categoryPath, exampleName);
      const exampleStat = await lstat(examplePath);
      if (!exampleStat.isDirectory()) continue;

      const [files] = await Promise.all([
        readdir(examplePath),
      ]);

      examples.push({
        category,
        name: exampleName,
        path: examplePath,
        hasReadme: files.includes("README.md"),
        hasIndex: files.includes("index.ts") || files.includes("index.js"),
        hasTest: files.some(f => f.endsWith(".test.ts") || f.endsWith(".test.js")),
      });
    }
  }

  return examples.sort((a, b) => {
    if (a.category !== b.category) return a.category.localeCompare(b.category);
    return a.name.localeCompare(b.name);
  });
}

/**
 * 获取指定分类和名称的示例
 */
export async function getExample(category: string, name: string): Promise<ExampleInfo | null> {
  const examples = await getAllExamples();
  return examples.find(e => e.category === category && e.name === name) || null;
}

/**
 * 格式化字节大小
 */
export function formatBytes(bytes: number): string {
  if (bytes === 0) return "0 B";
  const k = 1024;
  const sizes = ["B", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
}
