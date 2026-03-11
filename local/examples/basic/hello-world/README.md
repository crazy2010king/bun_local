# Hello World 示例

## 功能描述
最简单的 Bun 示例，展示如何运行 TypeScript 文件并访问 Bun 运行时的基础信息。

## 运行环境要求
- Bun 版本 >= 1.0.0
- 无额外依赖

## 快速开始
```bash
# 运行示例
bun run index.ts
```

## 代码解析
```typescript
// 打印欢迎信息
console.log("Hello, Bun! 👋");

// 打印Bun版本号
console.log(`Bun 版本: ${Bun.version}`);

// 打印运行平台信息
console.log(`运行平台: ${process.platform} ${process.arch}`);

// 打印CPU核心数
console.log(`CPU 核心数: ${navigator.hardwareConcurrency}`);

// 打印系统总内存
console.log(`内存总量: ${(Bun.totalMemory() / 1024 / 1024 / 1024).toFixed(2)} GB`);
```

## 预期输出
```
Hello, Bun! 👋
Bun 版本: 1.0.x
运行平台: linux x64
CPU 核心数: 20
内存总量: 31.xx GB
```

## Mermaid 流程图
```mermaid
flowchart LR
    A[启动Bun进程] --> B[加载index.ts]
    B --> C[执行console.log输出信息]
    C --> D[访问Bun运行时API获取系统信息]
    D --> E[输出结果到控制台]
    E --> F[进程退出]
```

## 相关文档
- [Bun 官方文档 - 快速开始](https://bun.sh/docs/quickstart)
- [Bun 全局 API](https://bun.sh/docs/api/globals)

## 测试验证
```bash
# 运行示例测试
bun test test.test.ts
```
