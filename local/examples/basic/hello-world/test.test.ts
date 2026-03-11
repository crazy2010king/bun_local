import { expect, test } from "bun:test";
import { join } from "path";

test("hello-world example runs successfully", async () => {
  const proc = Bun.spawn({
    cmd: [process.execPath, "index.ts"],
    cwd: import.meta.dirname,
    env: {
      ...process.env,
      NODE_ENV: "test",
    },
    stdout: "pipe",
    stderr: "pipe",
  });

  const [stdout, stderr, exitCode] = await Promise.all([
    proc.stdout.text(),
    proc.stderr.text(),
    proc.exited,
  ]);

  expect(exitCode).toBe(0);
  expect(stderr).toBeEmpty();
  expect(stdout).toContain("Hello, Bun! 👋");
  expect(stdout).toContain("Bun 版本:");
  expect(stdout).toContain("运行平台: linux x64");
  expect(stdout).toContain("CPU 核心数:");
  expect(stdout).toContain("内存总量:");
});
