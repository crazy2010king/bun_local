import { join } from "path";
import { getAllExamples } from "../shared/utils";

interface TestResult {
  category: string;
  name: string;
  passed: boolean;
  exitCode: number;
  duration: number;
}

async function runExampleTest(example: any): Promise<TestResult> {
  const start = Date.now();

  const testFile = join(example.path, "test.test.ts");
  const proc = Bun.spawn({
    cmd: [Bun.executablePath, "test", testFile],
    cwd: example.path,
    stdout: "ignore",
    stderr: "ignore",
  });

  const exitCode = await proc.exited;
  const duration = Date.now() - start;

  return {
    category: example.category,
    name: example.name,
    passed: exitCode === 0,
    exitCode,
    duration,
  };
}

async function main() {
  const examples = await getAllExamples();
  const testableExamples = examples.filter(e => e.hasTest);

  console.log(`🧪 开始运行所有示例测试 (共 ${testableExamples.length} 个)\n`);

  const results: TestResult[] = [];
  const failed: TestResult[] = [];

  for (const example of testableExamples) {
    process.stdout.write(`  测试 ${example.category}/${example.name}... `);
    const result = await runExampleTest(example);
    results.push(result);

    if (result.passed) {
      console.log(`✅ (${result.duration}ms)`);
    } else {
      console.log(`❌ (退出码: ${result.exitCode}, ${result.duration}ms)`);
      failed.push(result);
    }
  }

  console.log("\n" + "=".repeat(70));
  console.log(`📊 测试结果: ${results.length - failed.length}/${results.length} 个通过`);
  console.log(`⏱️  总耗时: ${results.reduce((sum, r) => sum + r.duration, 0)}ms`);

  if (failed.length > 0) {
    console.log("\n❌ 失败的测试:");
    for (const fail of failed) {
      console.log(`  - ${fail.category}/${fail.name} (退出码: ${fail.exitCode})`);
    }
    process.exit(1);
  } else {
    console.log("\n🎉 所有测试通过!");
    process.exit(0);
  }
}

main().catch(console.error);
