.DEFAULT_GOAL := help

PY ?= python3
PNPM ?= pnpm

.PHONY: help install dev build preview typecheck req check-docs

help: ## Show available targets
	@printf "%s\n" "Targets:" \
	"  install        Install JS deps (pnpm)" \
	"  dev            Run Electron+Vite dev" \
	"  build          Build app" \
	"  preview        Preview renderer build" \
	"  typecheck      Run TypeScript typecheck" \
	"  req            Create REQ + BDD skeleton (make req title='...')" \
	"  check-docs     Validate REQ <-> BDD <-> ledger consistency"

install: ## Install dependencies
	@$(PNPM) install

dev: ## Start dev mode
	@$(PNPM) run dev

build: ## Build production artifacts
	@$(PNPM) run build

preview: ## Preview renderer build
	@$(PNPM) run preview

typecheck: ## TypeScript typecheck
	@$(PNPM) run typecheck

req: ## Create requirement + BDD feature skeleton
	@if [ -z "$(title)" ]; then \
		echo "Usage: make req title=\"你的需求标题\""; \
		exit 2; \
	fi
	@$(PY) skills/doc-bdd-governance/scripts/new_requirement.py --title "$(title)" --repo .

check-docs: ## Validate docs/requirements + docs/bdd + ledger
	@$(PY) -c "from pathlib import Path; import sys; repo=Path('.'); req_dir=repo/'docs'/'requirements'; bdd_dir=repo/'docs'/'bdd'; ledger=req_dir/'ledger.md'; issues=[]; ledger_text=ledger.read_text(encoding='utf-8') if ledger.exists() else ''; issues += ([] if ledger.exists() else ['Missing: docs/requirements/ledger.md']); issues += ([] if req_dir.exists() else ['Missing dir: docs/requirements/']); issues += ([] if bdd_dir.exists() else ['Missing dir: docs/bdd/']); req_files=sorted(req_dir.glob('REQ-*.md')) if req_dir.exists() else []; bdd_files=sorted(bdd_dir.glob('REQ-*.feature')) if bdd_dir.exists() else []; issues += (['No REQ docs found under docs/requirements/'] if (req_dir.exists() and not req_files) else []); issues += [f\"Missing BDD feature for {rf.name}: expected {(bdd_dir/(rf.stem+'.feature')).as_posix()}\" for rf in req_files if not (bdd_dir/(rf.stem+'.feature')).exists()]; issues += [f\"Missing REQ doc for {bf.name}: expected {(req_dir/(bf.stem+'.md')).as_posix()}\" for bf in bdd_files if not (req_dir/(bf.stem+'.md')).exists()]; issues += [f\"REQ id not found in ledger: {rid} ({rf.as_posix()})\" for rf in req_files for rid in ['-'.join(rf.stem.split('-',2)[:2]).upper()] if ledger.exists() and rid.startswith('REQ-') and rid[4:].isdigit() and rid not in ledger_text]; sys.exit('Doc/BDD validation failed:\\n' + '\\n'.join('- '+i for i in issues)) if issues else print('Doc/BDD validation OK.')"
