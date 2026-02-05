---
name: doc-bdd-governance
description: Documentation/BDD-driven development governance. Use when you need to (1) update or enforce repo-wide development rules in AGENTS.md, (2) capture every development requirement into versioned docs under docs/, (3) write/maintain Gherkin BDD specs (.feature) as acceptance criteria, or (4) keep project documents in sync with implementation (diff-friendly, auditable, rollbackable).
---

# Doc/BDD Governance

将“开发要求必须落库”落到可执行的工作流：**先写文档/BDD，再写实现**，并确保每次变更都能在仓库中审计与回滚。

## 默认约定（仓库内）

- 需求库：`docs/requirements/`
  - 账本：`docs/requirements/ledger.md`
  - 单条需求：`docs/requirements/REQ-XXXX-<slug>.md`
- BDD：`docs/bdd/`
  - 用 Gherkin：`docs/bdd/REQ-XXXX-<slug>.feature`
- 架构/策略变更（可选）：`docs/adr/ADR-XXXX-<slug>.md`
- 项目总文档：`docs/project-doc-v1.0.md`（宏观方向/模型/里程碑）
- 仓库协作规则：根目录 `AGENTS.md`（强约束、默认工作流、禁止项）

如果仓库缺少上述目录/文件，允许自动创建，但不要覆盖已有内容。

## 工作流（每次开发都要过）

1. **澄清变更是什么**：用 1-3 句写清“要解决什么问题/用户价值/非目标”。
2. **需求落库**：新增或更新 1 条 `REQ-XXXX` 需求文档。
3. **写 BDD 验收标准**：在 `.feature` 中写可验收的场景（Given/When/Then）。
4. **实现与回归**：实现只针对 BDD/验收标准；避免“顺手改一堆”。
5. **同步治理文档**：
   - 影响协作流程/约束：更新 `AGENTS.md`
   - 影响产品/架构/模型：更新 `docs/project-doc-v1.0.md` 或写 ADR
6. **提交前自检**：代码变更必须能追溯到 REQ + BDD（在 commit message/PR 描述里引用）。

## 快捷命令

用脚本生成需求与 BDD 骨架（在仓库根目录执行）：

```bash
python3 skills/doc-bdd-governance/scripts/new_requirement.py --title "一句话需求标题"
```

脚本会：

- 生成 `docs/requirements/REQ-XXXX-<slug>.md`
- 生成 `docs/bdd/REQ-XXXX-<slug>.feature`
- 追加/创建 `docs/requirements/ledger.md`

## 输出质量门槛（最低）

- REQ 文档必须包含：背景、目标/非目标、范围、验收标准、风险/开放问题
- `.feature` 至少 2 个场景：主流程 + 失败/边界
- 如引入新规则（命名、目录、禁用项、审批/审计要求），必须进 `AGENTS.md`

