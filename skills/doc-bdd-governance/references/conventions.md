# Repo conventions (Doc/BDD governance)

## Paths

- `AGENTS.md`: repo-level development rules and guardrails (authoritative).
- `docs/project-doc-v1.0.md`: product/architecture overview and evolution plan.
- `docs/requirements/ledger.md`: requirement ledger (append-only preferred).
- `docs/requirements/REQ-XXXX-<slug>.md`: single requirement detail.
- `docs/bdd/REQ-XXXX-<slug>.feature`: BDD acceptance criteria (Gherkin).
- `docs/adr/ADR-XXXX-<slug>.md` (optional): architecture decision records.

## Naming

- REQ id: `REQ-0001` increasing.
- ADR id: `ADR-0001` increasing.
- slug: kebab-case (ascii), keep short.

## Minimal workflow rules

1. Code changes must reference REQ id (commit message/PR).
2. Every REQ must have BDD feature (unless explicitly justified in REQ).
3. Repo-wide process/rule changes must land in `AGENTS.md`.

