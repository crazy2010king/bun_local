import { join } from "path";
import { getExample } from "../shared/utils";

async function main() {
  const args = process.argv.slice(2);

  if (args.length < 2) {
    console.error("❌ 使用方法: bun run example:run <分类> <示例名称>");
    console.error("💡 示例: bun run example:run basic hello-world");
    process.exit(1);
  }

  const [category, name] = args;
  const example = await getExample(category, name);

  if (!example) {
    console.error(`❌ 未找到示例: ${category}/${name}`);
    process.exit(1);
  }

  if (!example.hasIndex) {
    console.error(`❌ 示例 ${category}/${name} 没有可运行的入口文件 (index.ts/index.js)`);
    process.exit(1);
  }

  console.log(`🚀 运行示例: ${category}/${name}\n`);
  console.log("=".repeat(50));

  const entryFile = join(example.path, "index.ts");
  const proc = Bun.spawn({
    cmd: [process.execPath, entryFile],
    cwd: example.path,
    env: {
      ...process.env,
      NODE_ENV: "development",
    },
    stdout: "inherit",
    stderr: "inherit",
  });

  const exitCode = await proc.exited;
  console.log("\n" + "=".repeat(50));

  if (exitCode === 0) {
    console.log("✅ 示例运行成功");
  } else {
    console.log(`❌ 示例运行失败，退出码: ${exitCode}`);
    process.exit(exitCode);
  }
}

main().catch(console.error);
