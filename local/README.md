# Bun Local 示例集

针对 **x86_64 Ubuntu 22.04 + Intel i7-14700K** 平台优化的 Bun 全功能示例集合，涵盖基础功能、API 使用、Web 标准、Node.js 兼容、框架集成等多个场景。

## 运行环境

- ✅ Bun 版本 >= 1.0.30
- ✅ 操作系统: Ubuntu 22.04 LTS (x86_64)
- ✅ CPU: Intel i7-14700K (支持 AVX2、SSE4.2 等指令集)
- ✅ 所有 Bun 功能均可正常运行

## 快速开始

### 1. 列出所有示例
```bash
bun run example:list
```

### 2. 运行指定示例
```bash
# 格式: bun run example:run <分类> <示例名称>
bun run example:run basic hello-world
```

### 3. 批量测试所有示例
```bash
bun run example:test
```

## 示例分类

| 分类 | 描述 | 示例数量 |
|------|------|----------|
| [basic](./examples/basic/) | 基础功能示例 | 4 |
| [api](./examples/api/) | Bun 原生 API 示例 | 7 |
| [web](./examples/web/) | Web API 兼容示例 | 4 |
| [node-compat](./examples/node-compat/) | Node.js 兼容性示例 | 4 |
| [framework](./examples/framework/) | 前端/后端框架集成示例 | 5 |
| [cli](./examples/cli/) | CLI 工具功能示例 | 4 |
| [advanced](./examples/advanced/) | 高级功能示例 | 4 |

## 目录结构

```
local/
├── README.md                    # 总说明文档
├── package.json                 # 统一依赖管理
├── tsconfig.json                # 统一 TypeScript 配置
├── bunfig.toml                  # 统一 Bun 配置
├── scripts/                     # 统一运行脚本
├── examples/                    # 示例分类目录
└── shared/                      # 共享工具和资源
```

## 贡献规范

1. 每个示例必须包含完整的 `README.md` 文档
2. 每个示例必须包含对应的测试用例
3. 代码风格遵循项目统一规范
4. 优先使用 Bun 原生 API 而不是 Node.js 兼容 API

## 相关文档

- [Bun 官方文档](https://bun.sh/docs)
- [Bun GitHub 仓库](https://github.com/oven-sh/bun)
