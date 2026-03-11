import { getAllExamples } from "../shared/utils";

async function main() {
  const examples = await getAllExamples();

  console.log("📦 Bun Local 示例列表\n");

  let currentCategory = "";
  for (const example of examples) {
    if (example.category !== currentCategory) {
      currentCategory = example.category;
      console.log(`## ${currentCategory}/`);
    }

    const status = [];
    if (example.hasReadme) status.push("📖");
    if (example.hasIndex) status.push("✅");
    if (example.hasTest) status.push("🧪");

    console.log(`  - ${example.name} ${status.join(" ")}`);
  }

  console.log("\n📝 说明:");
  console.log("  📖 - 包含文档");
  console.log("  ✅ - 可直接运行");
  console.log("  🧪 - 包含测试用例");
  console.log("\n🚀 运行示例: bun run example:run <分类> <示例名称>");
}

main().catch(console.error);
