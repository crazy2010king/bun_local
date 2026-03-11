console.log("Hello, Bun! 👋");
console.log(`Bun 版本: ${Bun.version}`);
console.log(`运行平台: ${process.platform} ${process.arch}`);
console.log(`CPU 核心数: ${navigator.hardwareConcurrency}`);
if (Bun.totalMemory) {
  console.log(`内存总量: ${(Bun.totalMemory / 1024 / 1024 / 1024).toFixed(2)} GB`);
} else {
  console.log(`内存总量: ${(process.memoryUsage().heapTotal / 1024 / 1024).toFixed(2)} MB (Heap)`);
}
