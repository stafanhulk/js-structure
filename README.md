# JavaScript 数据结构与算法 Monorepo

一个使用 TypeScript 实现的数据结构和算法学习项目，采用 pnpm monorepo 架构。

## 📦 项目结构

```
js-structure/
├── packages/
│   ├── heap/               # 堆结构
├── package.json            # 根配置文件
├── pnpm-workspace.yaml     # pnpm workspace 配置
└── tsconfig.json           # TypeScript 配置
```

## 🚀 快速开始

### 环境要求

- Node.js >= 16.0.0
- pnpm >= 8.0.0

### 安装依赖

```bash
# 安装 pnpm (如果还没有安装)
npm install -g pnpm

# 安装项目依赖
pnpm install
```

### 开发命令

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

## 📚 子包说明

### @js-structure/utils

通用工具函数库，提供常用的辅助函数。

**主要功能：**
- `swap` - 交换数组元素
- `compare` - 比较两个值
- `randomInt` - 生成随机整数
- `deepClone` - 深拷贝对象

### @js-structure/data-structures

常见数据结构的 TypeScript 实现。

**包含数据结构：**
- `Stack` - 栈（后进先出）
- `Queue` - 队列（先进先出）
- `LinkedList` - 单向链表

### @js-structure/algorithms

常见算法的 TypeScript 实现。

**包含算法：**

**排序算法：**
- `bubbleSort` - 冒泡排序 O(n²)
- `quickSort` - 快速排序 O(n log n)
- `mergeSort` - 归并排序 O(n log n)

**搜索算法：**
- `linearSearch` - 线性搜索 O(n)
- `binarySearch` - 二分搜索 O(log n)

### @js-structure/examples

使用示例代码，演示如何使用数据结构和算法。

**运行示例：**

```bash
cd packages/examples
pnpm dev
```

## 💡 使用示例

### 在你的项目中使用

```typescript
// 导入数据结构
import { Stack, Queue, LinkedList } from '@js-structure/data-structures';

// 使用栈
const stack = new Stack<number>();
stack.push(1);
stack.push(2);
console.log(stack.pop()); // 2

// 导入算法
import { quickSort, binarySearch } from '@js-structure/algorithms';

// 使用排序算法
const arr = [5, 3, 8, 1, 9];
const sorted = quickSort(arr);
console.log(sorted); // [1, 3, 5, 8, 9]

// 使用搜索算法
const index = binarySearch(sorted, 5);
console.log(index); // 2
```

## 🛠️ 技术栈

- **语言**: TypeScript
- **包管理**: pnpm workspaces
- **构建工具**: tsup
- **代码规范**: ESLint + Prettier
- **运行时**: tsx (用于示例)

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

## 📄 许可证

[MIT](./LICENSE)

