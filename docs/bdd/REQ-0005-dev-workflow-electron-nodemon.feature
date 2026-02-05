# language: zh-CN
功能: REQ-0005 Dev workflow：Electron 主进程自动重启（nodemon）

  背景:
    假设 我使用 pnpm run dev 启动 Electron + Vite 开发环境

  场景: 启动时使用最新 main/preload 产物
    当 我执行 pnpm run dev
    那么 Electron 应使用最新编译的 dist/main 与 dist/preload 产物启动
    并且 不应出现 "No handler registered for 'skillsHub:getState'" 的 IPC 报错

  场景: 主进程或预加载脚本变更触发自动重启
    假设 Electron 正在运行
    当 我修改 src/main 或 src/preload 并触发编译生成新的 dist 产物
    那么 Electron 应自动重启以加载新的主进程/预加载逻辑

  场景: 仅渲染层变更不触发 Electron 重启
    假设 Electron 正在运行
    当 我仅修改 src/renderer 下的文件
    那么 Electron 不应重启
    并且 渲染层应通过 Vite HMR 生效
