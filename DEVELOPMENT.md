# 开发文档

## 开发命令

```bash
# 构建所有包
pnpm build

# 并行启动所有包的开发模式
pnpm dev

# 运行测试
pnpm test

# 代码检查
pnpm lint

# 代码格式化
pnpm format

# 清理所有构建产物和依赖
pnpm clean
```

## 📦 项目结构

```
js-structure/
├── packages/
│   ├── heap/               # 堆结构
├── package.json            # 根配置文件
├── pnpm-workspace.yaml     # pnpm workspace 配置
└── tsconfig.json           # TypeScript 配置
```

## 📖 Monorepo 优势

- ✅ **代码共享**：子包之间可以轻松共享代码
- ✅ **统一管理**：统一的依赖管理和构建流程
- ✅ **版本控制**：所有包保持版本同步
- ✅ **开发效率**：修改即生效，无需发布到 npm
- ✅ **类型安全**：TypeScript 跨包类型检查

## 🔧 开发指南

### 添加新的子包

1. 在 `packages/` 目录下创建新目录
2. 添加 `package.json` 文件
3. 包名必须以 `@js-structure/` 开头
4. 运行 `pnpm install` 更新依赖

### 子包之间的依赖

在子包的 `package.json` 中使用 `workspace:*` 协议：

```json
{
  "dependencies": {
    "@js-structure/utils": "workspace:*"
  }
}
```

### 单独操作某个子包

```bash
# 进入子包目录
cd packages/data-structures

# 构建当前包
pnpm build

# 添加依赖到当前包
pnpm add lodash
```

## 📝 代码规范

项目使用 ESLint 和 Prettier 进行代码规范检查和格式化。

- 使用 2 空格缩进
- 使用单引号
- 语句末尾加分号
- 行尾使用 LF
- 最大行宽 100 字符

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！
