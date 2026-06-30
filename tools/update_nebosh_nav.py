#!/usr/bin/env python3
"""Update NEBOSH Opleiding nav item to dropdown with NEBOSH International Certificate."""

from __future__ import annotations

import re
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent

NL_DESKTOP = {
    "default": """<li class="sx-nav-dropdown">
<button type="button" class="sx-nav-dropdown__toggle" aria-expanded="false" aria-haspopup="true" aria-controls="sx-nav-nebosh-menu" id="sx-nav-nebosh-btn">
NEBOSH Opleiding <span class="sx-nav-dropdown__caret" aria-hidden="true">▾</span>
</button>
<ul id="sx-nav-nebosh-menu" class="sx-nav-dropdown__menu" role="list">
<li><a href="/nebosh-igc.html">NEBOSH International Certificate</a></li>
</ul>
</li>""",
    "igc": """<li class="sx-nav-dropdown is-open">
<button type="button" class="sx-nav-dropdown__toggle" aria-expanded="true" aria-haspopup="true" aria-controls="sx-nav-nebosh-menu" id="sx-nav-nebosh-btn">
NEBOSH Opleiding <span class="sx-nav-dropdown__caret" aria-hidden="true">▾</span>
</button>
<ul id="sx-nav-nebosh-menu" class="sx-nav-dropdown__menu" role="list">
<li><a href="/nebosh-igc.html" aria-current="page">NEBOSH International Certificate</a></li>
</ul>
</li>""",
    "opleiding": """<li class="sx-nav-dropdown is-open">
<button type="button" class="sx-nav-dropdown__toggle" aria-expanded="true" aria-haspopup="true" aria-controls="sx-nav-nebosh-menu" id="sx-nav-nebosh-btn" aria-current="page">
NEBOSH Opleiding <span class="sx-nav-dropdown__caret" aria-hidden="true">▾</span>
</button>
<ul id="sx-nav-nebosh-menu" class="sx-nav-dropdown__menu" role="list">
<li><a href="/nebosh-igc.html">NEBOSH International Certificate</a></li>
</ul>
</li>""",
}

NL_MOBILE = {
    "default": """<li class="sx-nav-panel__dropdown">
<button type="button" class="sx-nav-panel__subtoggle" aria-expanded="false" aria-controls="sx-nav-panel-nebosh" id="sx-nav-panel-nebosh-btn">
NEBOSH Opleiding <span aria-hidden="true">▾</span>
</button>
<ul id="sx-nav-panel-nebosh" class="sx-nav-panel__submenu" hidden>
<li><a href="/nebosh-igc.html">NEBOSH International Certificate</a></li>
</ul>
</li>""",
    "igc": """<li class="sx-nav-panel__dropdown">
<button type="button" class="sx-nav-panel__subtoggle" aria-expanded="true" aria-controls="sx-nav-panel-nebosh" id="sx-nav-panel-nebosh-btn">
NEBOSH Opleiding <span aria-hidden="true">▾</span>
</button>
<ul id="sx-nav-panel-nebosh" class="sx-nav-panel__submenu">
<li><a href="/nebosh-igc.html" aria-current="page">NEBOSH International Certificate</a></li>
</ul>
</li>""",
    "opleiding": """<li class="sx-nav-panel__dropdown">
<button type="button" class="sx-nav-panel__subtoggle" aria-expanded="true" aria-controls="sx-nav-panel-nebosh" id="sx-nav-panel-nebosh-btn" aria-current="page">
NEBOSH Opleiding <span aria-hidden="true">▾</span>
</button>
<ul id="sx-nav-panel-nebosh" class="sx-nav-panel__submenu">
<li><a href="/nebosh-igc.html">NEBOSH International Certificate</a></li>
</ul>
</li>""",
}

EN_DESKTOP = {
    "default": """<li class="sx-nav-dropdown">
<button type="button" class="sx-nav-dropdown__toggle" aria-expanded="false" aria-haspopup="true" aria-controls="sx-nav-nebosh-menu" id="sx-nav-nebosh-btn">
NEBOSH Course <span class="sx-nav-dropdown__caret" aria-hidden="true">▾</span>
</button>
<ul id="sx-nav-nebosh-menu" class="sx-nav-dropdown__menu" role="list">
<li><a href="/en/nebosh-igc.html">NEBOSH International Certificate</a></li>
</ul>
</li>""",
    "igc": """<li class="sx-nav-dropdown is-open">
<button type="button" class="sx-nav-dropdown__toggle" aria-expanded="true" aria-haspopup="true" aria-controls="sx-nav-nebosh-menu" id="sx-nav-nebosh-btn">
NEBOSH Course <span class="sx-nav-dropdown__caret" aria-hidden="true">▾</span>
</button>
<ul id="sx-nav-nebosh-menu" class="sx-nav-dropdown__menu" role="list">
<li><a href="/en/nebosh-igc.html" aria-current="page">NEBOSH International Certificate</a></li>
</ul>
</li>""",
    "course": """<li class="sx-nav-dropdown is-open">
<button type="button" class="sx-nav-dropdown__toggle" aria-expanded="true" aria-haspopup="true" aria-controls="sx-nav-nebosh-menu" id="sx-nav-nebosh-btn" aria-current="page">
NEBOSH Course <span class="sx-nav-dropdown__caret" aria-hidden="true">▾</span>
</button>
<ul id="sx-nav-nebosh-menu" class="sx-nav-dropdown__menu" role="list">
<li><a href="/en/nebosh-igc.html">NEBOSH International Certificate</a></li>
</ul>
</li>""",
}

EN_MOBILE = {
    "default": """<li class="sx-nav-panel__dropdown">
<button type="button" class="sx-nav-panel__subtoggle" aria-expanded="false" aria-controls="sx-nav-panel-nebosh" id="sx-nav-panel-nebosh-btn">
NEBOSH Course <span aria-hidden="true">▾</span>
</button>
<ul id="sx-nav-panel-nebosh" class="sx-nav-panel__submenu" hidden>
<li><a href="/en/nebosh-igc.html">NEBOSH International Certificate</a></li>
</ul>
</li>""",
    "igc": """<li class="sx-nav-panel__dropdown">
<button type="button" class="sx-nav-panel__subtoggle" aria-expanded="true" aria-controls="sx-nav-panel-nebosh" id="sx-nav-panel-nebosh-btn">
NEBOSH Course <span aria-hidden="true">▾</span>
</button>
<ul id="sx-nav-panel-nebosh" class="sx-nav-panel__submenu">
<li><a href="/en/nebosh-igc.html" aria-current="page">NEBOSH International Certificate</a></li>
</ul>
</li>""",
    "course": """<li class="sx-nav-panel__dropdown">
<button type="button" class="sx-nav-panel__subtoggle" aria-expanded="true" aria-controls="sx-nav-panel-nebosh" id="sx-nav-panel-nebosh-btn" aria-current="page">
NEBOSH Course <span aria-hidden="true">▾</span>
</button>
<ul id="sx-nav-panel-nebosh" class="sx-nav-panel__submenu">
<li><a href="/en/nebosh-igc.html">NEBOSH International Certificate</a></li>
</ul>
</li>""",
}

NL_LINK = re.compile(
    r'<li><a href="(?:\.\./)*(?:\.\./)?nebosh-opleiding\.html"(?: aria-current="page")?>NEBOSH Opleiding</a></li>'
)
EN_LINK = re.compile(
    r'<li><a href="/en/nebosh-course\.html"(?: aria-current="page")?>NEBOSH Course</a></li>'
)


def page_variant(rel_path: str) -> str:
    norm = rel_path.replace("\\", "/")
    if norm == "nebosh-igc.html":
        return "igc"
    if norm == "nebosh-opleiding.html":
        return "opleiding"
    if norm == "en/nebosh-igc.html":
        return "igc"
    if norm == "en/nebosh-course.html":
        return "course"
    return "default"


def is_en_page(rel_path: str) -> bool:
    return rel_path.replace("\\", "/").startswith("en/")


def update_file(path: Path) -> bool:
    rel = str(path.relative_to(ROOT))
    if "sx-header" not in path.read_text(encoding="utf-8"):
        return False

    variant = page_variant(rel)
    en = is_en_page(rel)
    text = path.read_text(encoding="utf-8")
    original = text

    if en:
        text = EN_LINK.sub(EN_DESKTOP[variant], text, count=1)
        # Mobile panel: second occurrence
        text = EN_LINK.sub(EN_MOBILE[variant], text, count=1)
    else:
        text = NL_LINK.sub(NL_DESKTOP[variant], text, count=1)
        text = NL_LINK.sub(NL_MOBILE[variant], text, count=1)

    if text != original:
        path.write_text(text, encoding="utf-8")
        return True
    return False


def update_legacy_header() -> bool:
    path = ROOT / "includes" / "header.html"
    if not path.exists():
        return False
    text = path.read_text(encoding="utf-8")
    insert = """            <li>
              <a href="/nebosh-igc.html" class="nav-link">NEBOSH International Certificate</a>
            </li>
"""
    needle = '              <a href="/nebosh-opleiding.html" class="nav-link">NEBOSH Opleiding</a>\n            </li>\n'
    replacement = '              <a href="/nebosh-opleiding.html" class="nav-link">NEBOSH Opleiding</a>\n            </li>\n' + insert
    if insert.strip() in text:
        return False
    new_text = text.replace(needle, replacement)
    if new_text == text:
        return False
    path.write_text(new_text, encoding="utf-8")
    return True


def main() -> None:
    updated = []
    for path in ROOT.rglob("*.html"):
        if "rotterdamshop" in path.parts:
            continue
        if update_file(path):
            updated.append(path.relative_to(ROOT))

    if update_legacy_header():
        updated.append(Path("includes/header.html"))

    print(f"Updated {len(updated)} file(s):")
    for p in sorted(updated):
        print(f"  - {p}")


if __name__ == "__main__":
    main()
