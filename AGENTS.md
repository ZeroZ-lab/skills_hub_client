# AGENTS.md

本仓库当前以“项目文档/产品规格”为主（见 `docs/project-doc-v1.0.md`）。对本仓库进行修改时，请遵循以下约定，方便人类与自动化 Agent 协作。

## 目标

- 保持文档可读、可审计、可版本化
- 变更可追溯：小步提交、避免大段无关重排
- 方便后续逐步落地到代码实现（Repo A/Repo B 拆分策略不变）

## 文档规范

- 语言：默认中文；关键术语可在括号中保留英文（如 MCP、Skills、Manifest/Lock）。
- 结构：优先追加/增量修改；除非必要，不要大规模调整章节编号与标题。
- 兼容：Markdown 需在常见渲染器（GitHub、编辑器预览）下正常显示。
- 代码块：使用明确语言标识（如 `yaml`、`text`、`bash`）。
- 图示：优先使用 Mermaid（保持节点命名清晰）。

## 变更原则

- 聚焦：一次改动只解决一个问题（例如“补充市场 API”或“调整接管模式说明”）。
- 可回滚：避免同时做“内容更新 + 格式化重排”；如确需重排，单独提交。
- 不泄露敏感信息：不要把个人账号、密钥、内网域名/地址写入公开仓库；示例请使用占位符（如 `example.com`、`ORG`、`PROJECT`）。

## 需求落库与 BDD 驱动（强制）

- 所有开发需求必须落库到 `docs/requirements/`，并维护 `docs/requirements/ledger.md`（优先追加，避免重排）。
- 每条需求必须有可验收的 BDD：`docs/bdd/REQ-XXXX-<slug>.feature`（除非在 REQ 中明确说明原因）。
- 影响仓库协作/约束的规则变更必须同步到根目录 `AGENTS.md`。
- 影响产品/架构/数据模型的变更必须同步到 `docs/project-doc-v1.0.md`，必要时新增 ADR（建议目录：`docs/adr/`）。
- 提交信息或 PR 描述需引用 `REQ-XXXX`，确保实现可追溯。

（可选）用脚本生成骨架：`python3 skills/doc-bdd-governance/scripts/new_requirement.py --title "..."`。

## Git 远程操作（强制）

- 未经用户明确指令，不执行 `git push` / `git push --force` / 创建远程仓库 / 修改远程地址等操作。
- 默认策略：只提交到本地（`git commit`），等待用户确认后再推送到云端。

## 推荐工作流（面向自动化 Agent）

1. 先读 `README.md` 与 `docs/project-doc-v1.0.md`，确认变更目标与影响范围。
2. 只改必要文件；如果需要新增文档，放在 `docs/` 下，并在 `README.md` 增加入口。
3. 变更完成后，运行仓库已有的格式化/检查命令（如未来引入的 `markdownlint`），并在 PR/提交信息中说明。
