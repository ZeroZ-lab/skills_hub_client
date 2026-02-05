# language: zh-CN
功能: REQ-0004 本地状态存储与 IPC API（最小可用）

  背景:
    假设 渲染层通过 preload 暴露的 window.skillsHub 调用 IPC

  场景: 获取默认 AppState
    当 我调用 window.skillsHub.getState()
    那么 我应得到包含 profiles 与 activeProfileId 的 AppState
    并且 activeProfileId 应对应一个存在的 profile

  场景: 切换 active profile 并持久化
    假设 当前 activeProfileId 为 "dev"
    当 我调用 window.skillsHub.setActiveProfile("legal")
    那么 我再次调用 window.skillsHub.getState() 时 activeProfileId 应为 "legal"
    当 我重启客户端后再次调用 window.skillsHub.getState()
    那么 activeProfileId 仍应为 "legal"

  场景: UI 展示来自 state 的 active profile
    当 我打开 Dashboard 或顶部栏
    那么 我应看到 active profile 展示为当前 state 中的 activeProfileId
