# REQ-0004 - 本地状态存储与 IPC API（最小可用）

状态：Draft  
创建日期：2026-02-05  
关联 BDD：`docs/bdd/REQ-0004-ipc-api.feature`

## 背景 / 问题

渲染进程需要展示并操作“Skills/Projects/Profiles/MCP”等状态，但 Electron 默认隔离渲染层与 Node 能力。缺少统一的 IPC API 与本地状态存储会导致：

- UI 只能依赖硬编码占位数据，无法持续演进
- 后续接入 SQLite/审计/策略时缺少边界与迁移路径

## 目标

- 提供一个最小可用的本地状态存储（JSON 文件，位于 Electron `userData` 目录），用于保存客户端核心状态（如 profiles 与 active profile）。
- 提供一个最小 IPC API（`ipcMain.handle` + `ipcRenderer.invoke`），通过 preload 暴露到 `window.skillsHub`，供渲染层安全访问。
- 渲染层以 IPC 读取的状态渲染“当前 Profile”（替换硬编码占位）。

## 非目标

- 不实现 SQLite 数据库（后续 REQ 推进）。
- 不实现企业市场 API、审批、审计上报等联网能力。
- 不提供任意文件系统访问接口（仅提供明确的状态读写方法）。

## 范围

### In Scope

- 定义 `AppState` 类型与默认值（包含 `profiles`、`activeProfileId`，其他域可留空数组占位）。
- 主进程实现：加载/保存 JSON state；提供 `getState`、`setActiveProfile` IPC handler。
- 预加载脚本暴露：`window.skillsHub.getState()`、`window.skillsHub.setActiveProfile(profileId)`。
- 渲染层使用：Dashboard/TopBar 展示 active profile（从 state 读取）。

### Out of Scope

- 复杂的 CRUD（skills/projects/mcp 的完整增删改查）。
- 事件订阅（push 更新）机制；本阶段采用拉取/刷新模式。

## 用户故事

- 作为用户，我希望客户端能记住并展示我当前激活的 Profile，以便按角色切换配置集。
- 作为开发者，我希望有稳定的 IPC 边界与本地状态存储，以便后续无痛迁移到 SQLite 并扩展更多实体。

## 验收标准（与 BDD 对齐）

- [ ] 渲染层可通过 `window.skillsHub.getState()` 获取 `AppState`（包含默认 profiles 与 active profile）。
- [ ] 调用 `window.skillsHub.setActiveProfile(id)` 后，重新获取 state 能反映变更且持久化（重启后仍生效）。
- [ ] UI 顶部栏/仪表盘展示的 active profile 来自 state，而非硬编码。

## 风险与合规（如适用）

- IPC API 需遵循最小暴露原则：只暴露必要方法，避免任意命令执行/任意文件读写。

## 开放问题

- 状态文件的 schema versioning 与迁移策略：先用 `version` 字段占位，后续引入迁移函数。

## 参考 / 链接

- Electron IPC：`ipcMain.handle` / `ipcRenderer.invoke`
