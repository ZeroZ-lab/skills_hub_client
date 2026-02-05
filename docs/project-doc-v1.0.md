# Skills 客户端 + 企业市场（MCP/Skills）完整项目文档（V1.0）

> 版本：V1.0  
> 更新时间：2026-02-05

## 1. 项目定位

打造一套“**本地可用 + 企业可管**”的能力管理系统：

- 面向个人/团队：通过桌面客户端统一管理 Skills 与 MCP
- 面向企业：通过私有市场实现分发、审批、审计、合规与策略治理

> 核心理念：把“散落的 Markdown/配置文件”升级为“可版本化、可审计、可回滚”的能力资产。

---

## 2. 目标与非目标

### 2.1 目标（Goals）

1. 支持 Skills 与 MCP 的统一管理（安装/启停/升级/回滚）
2. 支持角色与项目双层配置（Profile + Project）
3. 支持多 Agent/CLI（Codex / Claude Code / Gemini 等）
4. 支持外部市场 + 私有市场双源接入
5. 保证项目可复现（Manifest + Lock）
6. 兼容三端（macOS / Windows / Linux）

### 2.2 非目标（Non-Goals）

1. 不做大模型推理平台
2. 不做通用 CI/CD 平台
3. 不尝试拦截所有第三方工具的文件直读行为（通过接管/释放与生成层规避）

---

## 3. 双仓策略（核心决策）

```text
Repo A: skills-desktop (开源)
  - 本地管理客户端（Electron）
  - Skills/MCP 管理、项目同步、版本锁定、诊断

Repo B: skills-market-enterprise (企业版)
  - 私有市场、组织治理、审批、RBAC/SSO、审计、合规
```

### 3.1 为什么拆两仓

- **演进解耦**：开发者体验与企业治理节奏不同
- **商业清晰**：开源拉生态，企业版卖治理与服务
- **工程稳态**：客户端不被企业逻辑污染，企业端不受桌面端发布节奏拖累

---

## 4. 用户与场景

### 4.1 用户角色

- 个人开发者：本地管理 skills、按项目隔离
- 团队技术负责人：统一 profile 与项目规范
- 企业平台管理员：治理市场、策略、审批、审计
- 安全/合规人员：审查来源、签名、SBOM、漏洞

### 4.2 核心场景

1. 首次使用：扫描本机已有 skills/mcp 并导入
2. 项目接管：将项目纳入客户端管理，生成 manifest/lock
3. 角色切换：会计/法务/开发等 profile 快速切换
4. 多 Agent 控制：按 Agent 配置 skills 来源目录与可用策略
5. 企业分发：从私有市场安装受控版本并审计

---

## 5. 配置分层模型（VS Code 类比）

```text
User Layer (个人)
  └─ 全局默认 profile / 本机路径 / 常用 MCP

Workspace Layer (项目)
  └─ 项目 manifest / 项目 lock / 项目 mcp

Enterprise Layer (组织)
  └─ 市场策略 / 准入规则 / 审批与审计

优先级：Session Override > Project > Enterprise Profile > User Default
```

---

## 6. 接管与释放（Takeover / Eject）

### 6.1 设计动机

第三方 Agent 常直接读取文件，无法完全依赖“运行时拦截”。因此采用“**生成受控目标目录**”策略。

### 6.2 接管模式（Takeover）

- 客户端作为唯一控制面，维护真实状态
- 根据策略生成“**可被 Agent 读取的目标目录**”（只包含已启用 skills）
- 第三方工具读到的是“渲染结果”，非原始全集

### 6.3 释放模式（Eject）

- 一键导出到项目原生结构
- 取消接管，不再依赖客户端即可运行
- 保留导出快照与回滚点

---

## 7. 客户端（Repo A）产品设计

### 7.1 信息架构（推荐左右布局）

```text
左侧导航
  首页 Dashboard
  Skills
  MCP Servers
  Projects
  Profiles
  Market
  Doctor
  Logs

右侧主面板
  列表 / 详情 / Diff 预览 / 操作
```

### 7.2 首页（Dashboard）

应显示：

1. 当前激活 Profile
2. 最近项目
3. 待处理事项（更新、冲突、审批）
4. 市场连接状态（外部/私有）
5. 快捷动作（安装、同步、接管、回滚）

### 7.3 关键页面功能

- **Skills**：安装、启停、版本切换、来源、变更记录
- **MCP Servers**：连接测试、能力发现（tools/resources/prompts）、健康状态
- **Projects**：项目扫描、接管/释放、同步模式、manifest/lock 管理
- **Profiles**：角色配置集管理与一键切换
- **Market**：多源市场接入、搜索、安装、版本通道
- **Doctor**：冲突、失效路径、协议不兼容、修复建议
- **Logs**：调用日志、失败归因、审计追踪

### 7.4 客户端技术栈与主题规范

- 语言与框架：TypeScript + Electron，前端基于 Vite 构建
- UI 与样式：shadcn/ui 组件体系 + Tailwind CSS
- 国际化：内置 i18n（至少中文与英文），支持后续扩展
- 主题模式：支持亮色/暗黑两种显示模式
- 主题色：允许用户自定义主色（Primary Color），并在组件层统一生效
- 图标：统一使用 Lucide 图标库（Lucide Icons）

---

## 8. Agent/CLI 兼容策略（可配置而非写死）

### 8.1 Agent 适配表

每个 Agent 配置：

- skills 读取目录
- mcp 配置文件路径
- 是否支持接管模式
- 同步触发方式（手动/自动）

示例：

```yaml
agents:
  - id: codex
    skillPath: ~/.codex/skills
    mcpConfigPath: ~/.codex/mcp.json
    managed: true
  - id: claude-code
    skillPath: ~/.claude/skills
    mcpConfigPath: ~/.claude/mcp.json
    managed: true
  - id: gemini
    skillPath: ~/.gemini/skills
    mcpConfigPath: ~/.gemini/mcp.json
    managed: true
```

### 8.2 开关策略

- 按 Agent 开关（允许/禁用）
- 按项目开关
- 按技能开关（`enabled: true/false`）

---

## 9. Skills 同步模型（重点）

### 9.1 两种模式并存

1. **snapshot/copy（默认）**

   - 优点：跨平台稳、可复现、易审计
   - 缺点：开发态迭代慢
2. **symlink/dev-mode（可选）**

   - 优点：开发联动快
   - 缺点：跨平台复杂、路径脆弱

### 9.2 三端兼容建议

- macOS/Linux：支持 symlink
- Windows：优先 copy，必要时使用 junction（并提供降级）
- 统一提供：`dry-run`、路径校验、失效检测、自动修复

### 9.3 项目文件规范

```text
<project>/.ai/
  skill-manifest.yaml
  skill-lock.yaml
  mcp.project.yaml
  policy.project.yaml (optional)
```

`skill-manifest.yaml` 示例：

```yaml
version: 1
profile: dev
skills:
  - id: rag-retrieval
    source: enterprise
    version: ^1.4.0
    mode: snapshot
    enabled: true
  - id: local-debug-helper
    source: personal
    version: local
    mode: symlink
    enabled: false
agents:
  codex: true
  claude-code: true
  gemini: false
```

`skill-lock.yaml` 示例：

```yaml
version: 1
resolvedAt: 2026-02-05T00:00:00Z
skills:
  - id: rag-retrieval
    resolvedVersion: 1.4.2
    digest: sha256:xxxx
    sourceRef: enterprise://org/repo/rag-retrieval@1.4.2
```

---

## 10. MCP 管理模型

### 10.1 传输与演进

- 初期支持：`stdio` + `SSE`
- 演进目标：`streamable-http`（并发与资源更优）

### 10.2 运行时流程

```text
Register Server -> Connect -> initialize -> initialized
-> Capability Discovery(tools/resources/prompts)
-> Policy Gate -> Invoke -> Logging/Audit
```

### 10.3 Server 描述示例

```yaml
id: io.company.weather
name: Weather MCP
transport: streamable-http
url: https://mcp.company.com/weather
scope: project
enabled: true
policy:
  riskLevel: medium
  approvalRequired:
    - tool_call:write*
```

---

## 11. 市场设计（外部 + 私有）

### 11.1 多源接入

- 外部市场：官方/公共 Registry（发现与对比）
- 私有市场：企业上架、策略分发、审批治理

### 11.2 私有市场能力

1. 包发布（Skill/MCP package）
2. 元数据校验（schema、签名、SBOM、依赖）
3. 风险评分与准入
4. 版本通道（canary/stable/deprecated）
5. 安装审批与审计

### 11.3 下载与安装流程

```text
Search -> Select Version -> Verify Signature -> Policy Check
-> Install (copy/symlink) -> Lock Update -> Audit Log
```

---

## 12. 企业版（Repo B）架构

```text
API Gateway
  ├─ Registry Service
  ├─ Policy Service
  ├─ Approval Service
  ├─ IAM Adapter (OIDC/SAML/LDAP)
  ├─ Audit Service
  └─ Scan & Sign Service
```

### 12.1 最小 API 集（示意）

- `GET /catalog/skills`
- `GET /catalog/mcp-servers`
- `POST /install-requests`
- `POST /approvals/{id}/decision`
- `POST /audit/events`
- `GET /policies/effective`

---

## 13. 数据模型（建议）

### 客户端本地（SQLite）

- `skills`
- `skill_versions`
- `projects`
- `project_skills`
- `mcp_servers`
- `mcp_capabilities`
- `profiles`
- `locks`
- `runs`
- `events`

### 企业端（PostgreSQL）

- `orgs`, `users`, `roles`, `memberships`
- `packages`, `package_versions`, `channels`
- `policies`, `approval_flows`, `approval_records`
- `install_records`, `audit_events`
- `sbom_records`, `signature_records`, `vuln_findings`

---

## 14. 首次引导（Onboarding）

1. 扫描本机常见目录（可选）
2. 识别已有 skills/mcp 配置
3. 显示“可导入项”清单
4. 一键导入并生成 profile
5. 选择是否开启接管模式
6. 为当前项目生成 manifest/lock

> 目标：让用户 5 分钟内完成从“散养文件”到“受控资产”的迁移。

---

## 15. 安全与合规

1. 最小权限原则：按 Agent、项目、技能、工具四层控制
2. 高风险操作二次确认（写文件、执行命令、外发请求）
3. 密钥仅存系统 Keychain，不入仓
4. 端到端审计：安装/升级/调用/回滚全记录
5. 包签名与 SBOM 验证（企业模式）

---

## 16. 非功能需求（NFR）

- 启动时间 < 3s（冷启动目标）
- 1000+ skills 列表操作可用
- 同步失败可自动回滚
- 多端路径兼容率 > 99%
- 关键操作可观测（日志+指标+追踪）

---

## 17. 里程碑计划（12 周）

### Phase 1（1-4 周）：开源 MVP

- 客户端基础页面：Dashboard / Skills / MCP / Projects / Doctor
- manifest/sync/lock/diff 跑通
- 首次扫描导入向导

### Phase 2（5-8 周）：企业 Alpha

- 私有市场最小 API
- SSO + RBAC + 审批 + 审计闭环
- 客户端 Connected Mode

### Phase 3（9-12 周）：试点与稳定

- canary/stable 通道
- 签名/SBOM/漏洞扫描接入
- 两家企业 PoC

---

## 18. 风险清单与应对

| 风险 | 表现 | 应对 |
| --- | --- | --- |
| 第三方 Agent 直读文件 | 禁用失效 | 接管模式输出受控目录 + Eject 机制 |
| symlink 跨平台不稳定 | Windows/权限异常 | 默认 snapshot，symlink 仅 dev-mode |
| 配置漂移 | 团队环境不一致 | 强制 lock + diff + doctor |
| 企业合规门槛高 | 上线慢 | 先最小合规（签名/审计），再渐进增强 |
| 多市场质量参差 | 安装风险 | 风险评分 + 准入策略 + 审批流 |

---

## 19. 商业化路径（全开源前提）

全开源仍可盈利，核心不是卖代码，而是卖“确定性”：

1. 托管服务（Cloud / Managed Private）
2. 企业支持与 SLA
3. 合规能力包（签名、扫描、审计报表）
4. 实施与定制服务
5. 培训与认证

---

## 20. 验收标准（Definition of Done）

1. 新项目可在 3 分钟内完成接管并生成 lock
2. 任意技能升级有 diff 预览与可回滚
3. MCP server 连接、能力发现、调用日志可视化完整
4. 同一项目在三端可复现
5. 企业版可完成“安装审批 + 审计追踪”闭环

---

## 21. 附录：建议默认配置

`~/.skills-desktop/config.yaml`

```yaml
defaultMode: snapshot
profiles:
  - id: dev
  - id: accountant
  - id: legal
marketSources:
  - id: official
    type: external
    enabled: true
  - id: enterprise
    type: private
    enabled: true
agentDefaults:
  codex: true
  claude-code: true
  gemini: true
```

---

## 22. 一句话总结

这个项目的本质不是“管理几个 markdown 文件”，而是构建一条 **Skills/MCP 能力供应链**：

**可发现、可安装、可治理、可审计、可回滚、可规模化流转。**

---

## 23. 工程演进约定（文档/BDD 驱动）

为保证“可版本化、可审计、可回滚”，本项目采用 **文档或 BDD 驱动**的演进方式：

- 所有开发需求必须落库到 `docs/requirements/`，并维护 `docs/requirements/ledger.md`。
- 每条需求默认配套 Gherkin `.feature` 作为验收标准：`docs/bdd/REQ-XXXX-<slug>.feature`。
- 影响协作流程/约束的规则变更必须同步到根目录 `AGENTS.md`。
- 影响产品/架构/模型的变更必须同步到本文档（或新增 ADR）。
