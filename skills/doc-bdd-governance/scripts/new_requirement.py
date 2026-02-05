#!/usr/bin/env python3
from __future__ import annotations

import argparse
import datetime as dt
import os
import re
from pathlib import Path


REQ_ID_RE = re.compile(r"\bREQ-(\d{4})\b")


def slugify(text: str) -> str:
    text = text.strip().lower()
    text = re.sub(r"[^a-z0-9]+", "-", text)
    text = re.sub(r"-{2,}", "-", text).strip("-")
    return text or "requirement"


def read_text(path: Path) -> str:
    return path.read_text(encoding="utf-8")


def write_text(path: Path, content: str) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(content, encoding="utf-8")


def next_req_id(ledger_text: str) -> str:
    nums = [int(m.group(1)) for m in REQ_ID_RE.finditer(ledger_text)]
    n = (max(nums) + 1) if nums else 1
    return f"REQ-{n:04d}"


def load_template(script_dir: Path, rel: str) -> str:
    template_path = (script_dir / ".." / rel).resolve()
    return read_text(template_path)


def ensure_ledger(ledger_path: Path) -> None:
    if ledger_path.exists():
        return
    header = (
        "# Requirements Ledger\n\n"
        "| ID | Title | Status | Created | Links |\n"
        "| --- | --- | --- | --- | --- |\n"
    )
    write_text(ledger_path, header)


def append_ledger_row(ledger_path: Path, req_id: str, title: str, created: str, req_rel: str, feature_rel: str) -> None:
    text = read_text(ledger_path)
    row = f"| {req_id} | {title} | Draft | {created} | `{req_rel}` / `{feature_rel}` |\n"
    if req_id in text:
        return
    write_text(ledger_path, text + row)


def main() -> int:
    parser = argparse.ArgumentParser(description="Create a REQ doc + BDD feature skeleton and update the ledger.")
    parser.add_argument("--title", required=True, help="Requirement title (one line).")
    parser.add_argument("--repo", default=".", help="Repo root path (default: current directory).")
    parser.add_argument("--slug", default="", help="Optional slug for filenames (kebab-case).")
    parser.add_argument("--req-id", default="", help="Optional explicit REQ id (e.g. REQ-0007).")
    args = parser.parse_args()

    repo = Path(args.repo).resolve()
    script_dir = Path(__file__).resolve().parent

    created = dt.date.today().isoformat()
    title = args.title.strip()
    slug = slugify(args.slug or title)

    requirements_dir = repo / "docs" / "requirements"
    bdd_dir = repo / "docs" / "bdd"
    ledger_path = requirements_dir / "ledger.md"

    ensure_ledger(ledger_path)
    ledger_text = read_text(ledger_path)

    req_id = args.req_id.strip().upper() or next_req_id(ledger_text)
    if not re.fullmatch(r"REQ-\d{4}", req_id):
        raise SystemExit(f"Invalid --req-id: {req_id} (expected REQ-0001)")

    req_filename = f"{req_id}-{slug}.md"
    feature_filename = f"{req_id}-{slug}.feature"

    req_path = requirements_dir / req_filename
    feature_path = bdd_dir / feature_filename

    if not req_path.exists():
        req_tpl = load_template(script_dir, "assets/requirement-template.md")
        req_content = (
            req_tpl.replace("{{REQ_ID}}", req_id)
            .replace("{{TITLE}}", title)
            .replace("{{DATE}}", created)
            .replace("{{SLUG}}", slug)
        )
        write_text(req_path, req_content)

    if not feature_path.exists():
        feat_tpl = load_template(script_dir, "assets/feature-template.feature")
        feat_content = (
            feat_tpl.replace("{{REQ_ID}}", req_id)
            .replace("{{TITLE}}", title)
            .replace("{{SLUG}}", slug)
        )
        write_text(feature_path, feat_content)

    req_rel = os.path.relpath(req_path, repo)
    feature_rel = os.path.relpath(feature_path, repo)
    append_ledger_row(ledger_path, req_id, title, created, req_rel, feature_rel)

    agents_path = repo / "AGENTS.md"
    if not agents_path.exists():
        print("Note: AGENTS.md not found at repo root; consider adding repo rules.")

    print(f"Created/updated:\n- {os.path.relpath(ledger_path, repo)}\n- {req_rel}\n- {feature_rel}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())

