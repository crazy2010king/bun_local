# Bun Local 示例集设计文档

## 项目概述
针对 x86_64 Ubuntu 22.04 + Intel i7-14700K 平台优化的 Bun 全功能示例集合，涵盖基础功能、API 使用、Web 标准、Node.js 兼容、框架集成等多个场景，提供统一的运行、测试、文档体系。

## 设计目标
1. **平台适配**：完全适配当前硬件平台，所有示例均可直接运行
2. **统一规范**：统一的目录结构、文档格式、代码风格
3. **易用性**：提供统一的运行脚本，降低学习成本
4. **可测试性**：每个示例都包含对应的测试用例，可批量验证
5. **可扩展性**：方便新增示例分类和具体示例

## 目录结构设计
```
local/
├── README.md                    # 总说明文档
├── LOCAL_DESIGN.md              # 本设计文档
├── package.json                 # 统一依赖管理
├── tsconfig.json                # 统一TypeScript配置
├── bunfig.toml                  # 统一Bun配置
├── scripts/                     # 统一运行脚本
│   ├── run.ts                   # 示例运行入口
│   ├── list.ts                  # 列出示例脚本
│   └── test-all.ts              # 批量测试脚本
├── examples/                    # 示例分类目录
│   ├── basic/                   # 基础功能示例
│   ├── api/                     # Bun API 示例
│   ├── web/                     # Web API 示例
│   ├── node-compat/             # Node.js 兼容示例
│   ├── framework/               # 框架集成示例
│   ├── cli/                     # CLI 功能示例
│   └── advanced/                # 高级功能示例
└── shared/                      # 共享工具和资源
    ├── utils.ts
    └── fixtures/
```

## 核心功能设计

### 1. 统一脚本系统
- **`example:list`**：递归扫描所有示例目录，显示示例分类、名称、状态（文档/可运行/测试）
- **`example:run <分类> <示例>`**：自动查找示例入口文件，设置运行环境，执行示例
- **`example:test`**：批量执行所有包含测试用例的示例，生成测试报告

### 2. 示例规范
每个示例必须包含：
1. **`index.ts`/`index.js`**：示例入口文件
2. **`README.md`**：完整的说明文档，遵循统一结构
3. **`test.test.ts`**：对应的测试用例，验证示例功能正确性

### 3. 文档规范
每个示例的README.md包含：
- 功能描述和使用场景
- 运行环境要求
- 快速开始命令
- 核心代码解析
- 预期输出示例
- Mermaid 流程图（可选）
- 相关文档链接
- 测试验证命令

## 技术栈
- **运行时**：Bun >= 1.0.30
- **语言**：TypeScript / JavaScript
- **测试框架**：Bun 内置测试运行器
- **文档**：Markdown + Mermaid 流程图

## 实施阶段
### 第一阶段：基础架构搭建（已完成）
- ✅ 创建local目录结构
- ✅ 编写根目录README.md
- ✅ 配置统一的package.json、tsconfig.json、bunfig.toml
- ✅ 实现统一运行脚本（list、run、test-all）
- ✅ 编写shared工具函数
- ✅ 实现第一个示例：basic/hello-world

### 第二阶段：基础示例移植（进行中）
- [ ] basic分类下的4个核心示例
- [ ] api分类下的7个核心API示例（HTTP、WebSocket、SQLite等）
- [ ] 每个示例包含完整文档和测试

### 第三阶段：扩展示例移植
- [ ] web分类下的4个Web API示例
- [ ] node-compat分类下的4个Node.js兼容示例
- [ ] framework分类下的5个框架集成示例
- [ ] cli分类下的4个CLI功能示例

### 第四阶段：高级示例和完善
- [ ] advanced分类下的4个高级功能示例
- [ ] 编写总览文档和使用指南
- [ ] 批量测试所有示例
- [ ] 优化文档和Mermaid图表
- [ ] 性能和兼容性验证

### 第五阶段：验收和优化
- [ ] 所有示例独立运行验证
- [ ] 所有测试用例通过
- [ ] 文档完整性检查
- [ ] 代码风格统一
- [ ] 最终验证和优化

## 验证标准
1. 运行`bun run example:list`能正确列出所有示例
2. 运行`bun run example:run <category> <example>`能正确运行指定示例
3. 运行`bun run example:test`能批量执行所有示例测试并全部通过
4. 每个示例目录下的README.md文档完整、准确
5. 所有示例在当前x86_64平台上正常运行

## 平台适配说明
当前适配平台：
- CPU: Intel i7-14700K (20核心，支持AVX2、SSE4.2、AES-NI)
- OS: Ubuntu 22.04 LTS (x86_64)
- Kernel: Linux 5.15.0-139-generic
- 支持所有Bun功能，包括FFI、WASM、SIMD优化、HTTP/3等
