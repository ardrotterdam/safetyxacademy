#!/usr/bin/env python3
"""Copy safetyxacademyV2 files to root with path/canonical fixes. Used for fase 3a."""
from pathlib import Path
import shutil
import sys

ROOT = Path(__file__).resolve().parents[1]
V2 = ROOT / "safetyxacademyV2"

SKIP = {
    "jobs.html",
    "sitemap.xml",
    "vercel.json",
    "README.md",
    "README.MD",
    "css/style.css",
    "js/header.js",
}


def transform(content: str) -> tuple[str, list[str]]:
    notes = []
    content = content.replace("https://www.safetyxacademy.nl/", "https://safetyxacademy.nl/")
    for i, line in enumerate(content.splitlines(), 1):
        if "safetyxacademyV2" in line and "<!--" not in line.split("safetyxacademyV2")[0][-10:]:
            if line.strip().startswith("<!--"):
                continue
            notes.append(f"line {i}: safetyxacademyV2 mention")
    return content, notes


def copy_one(relpath: str) -> list[str]:
    if relpath in SKIP:
        return [f"SKIP {relpath}"]
    src = V2 / relpath
    dst = ROOT / relpath
    if not src.is_file():
        return [f"MISSING {relpath}"]
    if src.suffix in {".html", ".css", ".js"}:
        content, notes = transform(src.read_text(encoding="utf-8"))
        dst.parent.mkdir(parents=True, exist_ok=True)
        dst.write_text(content, encoding="utf-8")
        return notes
    dst.parent.mkdir(parents=True, exist_ok=True)
    shutil.copy2(src, dst)
    return []


def main(files: list[str]) -> int:
    all_notes = []
    for f in files:
        n = copy_one(f)
        if n:
            all_notes.append((f, n))
    for f, n in all_notes:
        if n and not str(n[0]).startswith("SKIP"):
            print(f"{f}: {n}")
    return 0


if __name__ == "__main__":
    main(sys.argv[1:])
