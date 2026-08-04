# TokenTint 协作说明

## 项目概述

TokenTint 是一个 Chrome Manifest V3 取色与设计令牌工具，包含两个独立 npm 子项目：

- `extension/`：TypeScript + webpack 构建的 Chrome 扩展。
- `website/`：Next.js 14 + React 网站，包含页面、Creem checkout/webhook 和 license API。
- `docs/`：产品、架构、隐私、商店发布、支付配置、本地化和人工 QA 文档。

根目录没有统一的 `package.json`；命令必须在对应子目录执行。

## 目录边界

源文件与配置：

- `extension/src/`：扩展 TypeScript 源码；`extension/public/`：manifest、popup HTML、图标等构建输入；`extension/_locales/`：本地化源资源。
- `extension/webpack.config.js`、`extension/tsconfig.json`、`extension/package.json`：扩展构建和类型配置。
- `website/src/app/`：Next 页面和 API Route；`website/src/components/`：页面组件；`website/src/lib/`：Creem 与 license 逻辑。
- `website/next.config.js`、`website/tsconfig.json`、`website/package.json`：网站配置。
- `docs/`、`README.md`：项目约定和发布依据；修改行为或发布流程时同步相关文档。

生成物、依赖或发布素材：

- `extension/dist/`：webpack 构建输出（不可直接编辑）。
- `website/.next/`：Next 构建输出（不可直接编辑）。
- `extension/node_modules/`、`website/node_modules/`：依赖安装目录（不可直接编辑）。
- `extension/tokentint-v1.0.0/`：已导出的扩展包目录；`extension/tokentint-extension@1.0.0`：现有发布归档/文件。除非任务明确涉及发布包，否则修改 `src/` 和构建输入后重新构建，不手改归档内容。
- `extension/assets/`、`extension/store-assets/`：品牌和商店提交素材，不是运行时代码。

## 安装、构建与检查

扩展：

```bash
cd extension
npm install
npm run type-check
npm run build
```

开发监听使用 `npm run dev`；构建后在 Chrome 中加载 `extension/dist` 作为未打包扩展。

网站：

```bash
cd website
npm install
npm run lint
npm run build
npm run dev       # 本地开发
npm run start     # 启动已构建版本
```

仓库未配置自动化测试框架或测试脚本。涉及 UI、扩展权限、取色、导出、授权或支付时，按 `docs/MANUAL_QA_CHECKLIST.md` 及 `docs/CREEM_SETUP.md` 的沙箱流程做手工验证；不要声称运行了不存在的测试。

## 编码规范

- 遵循现有 TypeScript/React 风格；扩展保持 `tsconfig.json` 的 strict 类型检查和大小写一致性。
- 按现有边界组织代码：扩展 UI 在 `src/popup`，后台消息和浏览器能力在 `src/background`，共享逻辑在 `src/utils`；网站页面/API 在 `src/app`，服务端集成在 `src/lib`。
- 保持 MV3 的消息流和 `chrome.storage.local` 数据结构兼容；新增字段时考虑已有用户数据迁移。
- 本地化文案放入 `_locales/*/messages.json`，不要只在单一语言硬编码用户可见文本；遵循 `docs/LOCALIZATION_GUIDE.md`。
- 修改支付、授权、隐私或商店声明时，同时检查 `docs/PRIVACY_DATA_MAP.md`、架构文档及对应页面/提交清单。

## 安全、隐私与权限

- 不提交 `.env*`、私钥、API key、Creem webhook secret、license secret 或真实 activation token；密钥只通过 `website/.env.local` 或部署环境注入。
- 不在日志、错误响应或测试输出中打印 token、邮箱、支付载荷或密钥。webhook 必须继续校验签名、校验产品/订单字段并保持去重逻辑。
- 扩展只使用当前 manifest 声明的 `storage`、`activeTab`、`scripting`；不要添加 `tabs`、`<all_urls>`、`webRequest`、`cookies` 等扩大访问范围的权限，除非任务明确要求且同步更新隐私/商店材料。
- 保持颜色、项目、设置和权益数据本地存储、无同步、无分析/追踪；页面取色只能在用户主动操作时执行。
- 不引入 `eval`、远程代码加载或绕过授权校验的实现。支付页面、license endpoint 和 webhook 的变更必须用沙箱凭据端到端验证，生产密钥不可用于本地调试。

## 禁止事项

- 不直接编辑 `dist/`、`.next/`、`node_modules/` 或已导出归档来修复源码问题。
- 不删除或覆盖用户已有的未提交改动；当前已存在的 `extension/tokentint-v1.0.0/` 未跟踪目录应保留，除非用户明确要求处理它。
- 不新增未在 package scripts 中定义的命令作为项目事实；不凭空添加测试、数据库、认证系统或部署架构。
- 不把服务端密钥、购买数据或扩展本地数据发送到新的第三方服务。

## 完成标准

任务完成前应：

1. 只修改与任务相关的源文件/配置/文档，并检查 `git diff` 与 `git status`。
2. 扩展改动至少通过 `npm run type-check` 和 `npm run build`；网站改动至少通过 `npm run lint` 和 `npm run build`（若环境/既有代码导致失败，记录真实错误）。
3. 涉及 UI、扩展行为或发布的改动，按相关人工 QA/商店清单验证，并确认构建产物来自最新源码。
4. 涉及权限、个人数据、支付、license 或 webhook 的改动，复核隐私和安全约束，确认没有泄露敏感信息，并同步必要文档。
