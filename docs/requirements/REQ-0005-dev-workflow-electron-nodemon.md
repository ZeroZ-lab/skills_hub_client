# REQ-0005 - Dev workflow：Electron 主进程自动重启（nodemon）

状态：Draft  
创建日期：2026-02-05  
关联 BDD：`docs/bdd/REQ-0005-dev-workflow-electron-nodemon.feature`

## 背景 / 问题

当前 `pnpm run dev` 的启动逻辑可能在主进程/预加载脚本尚未重新编译完成时就启动 Electron（`wait-on dist/main/index.js` 只判断“文件存在”，无法保证是最新产物）。这会导致渲染层已更新，但主进程仍是旧版本，从而出现：

- `ipcRenderer.invoke` 报错：`No handler registered for 'skillsHub:getState'`
- 主进程/预加载脚本变更后需要手动重启，影响开发效率与稳定性

## 目标

- 确保 `pnpm run dev` 启动时 Electron 一定使用**最新编译**的主进程/预加载产物。
- 当 `src/main` / `src/preload` / `src/shared` 发生变更并重新编译到 `dist/` 后，自动重启 Electron。
- 渲染层（Vite）变更仍走 HMR，不触发 Electron 重启。

## 非目标

- 不实现生产环境自动更新/热更新。
- 不引入复杂的 dev server 框架（保持脚本简单可维护）。

## 范围

### In Scope

- 新增 dev 依赖：`nodemon`（用于监听 `dist/main`、`dist/preload`、`dist/shared` 并重启 Electron）。
- 为保证 Electron 可运行，pnpm 需允许 `electron` 与 `esbuild` 的依赖安装脚本执行（在 `package.json` 中配置 `pnpm.onlyBuiltDependencies`）。
- 调整 `pnpm run dev`：
  - 先执行一次 `tsc -p tsconfig.node.json` 生成最新 `dist/` 产物
  - 再启动 watch（`tsc --watch`）与 Vite
  - 由 `nodemon` 托管 Electron 进程的启动与重启
- 文档化：在 REQ/BDD 中说明预期行为。

### Out of Scope

- 不对 Windows/macOS/Linux 的文件监听差异做深入优化（先使用 nodemon 的默认能力）。
- 不对重启时的状态迁移/保活做处理（重启即可）。

## 用户故事

- 作为开发者，我希望修改主进程/预加载脚本后 Electron 能自动重启，以便快速验证 IPC 与本地存储逻辑。
- 作为开发者，我希望渲染层仍可享受 HMR，而不因 UI 改动频繁触发 Electron 重启。

## 验收标准（与 BDD 对齐）

- [ ] `pnpm run dev` 启动后，不应出现 `No handler registered for 'skillsHub:getState'` 这类由 stale dist 导致的 IPC 报错。
- [ ] 修改 `src/main/**` 或 `src/preload/**` 并编译到 `dist/**` 后，Electron 会自动重启。
- [ ] 仅修改 `src/renderer/**` 时，Electron 不重启（Vite HMR 正常生效）。

## 风险与合规（如适用）

- 文件监听可能导致重启抖动；需通过 `delay` 等参数降低频繁重启的体验问题。

## 开放问题

- 是否需要增加“只在编译完成后重启”的更严格判定（例如监听特定产物）？先用 nodemon + delay 简化。

## 参考 / 链接

- nodemon
