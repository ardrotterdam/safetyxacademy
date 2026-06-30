#!/usr/bin/env python3
"""Normalize indentation of NEBOSH nav dropdown blocks."""

from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent

REPLACEMENTS = [
    (
        """ <li class="sx-nav-dropdown">
<button type="button" class="sx-nav-dropdown__toggle" aria-expanded="false" aria-haspopup="true" aria-controls="sx-nav-nebosh-menu" id="sx-nav-nebosh-btn">
NEBOSH Opleiding <span class="sx-nav-dropdown__caret" aria-hidden="true">▾</span>
</button>
<ul id="sx-nav-nebosh-menu" class="sx-nav-dropdown__menu" role="list">
<li><a href="/nebosh-igc.html">NEBOSH International Certificate</a></li>
</ul>
</li>""",
        """ <li class="sx-nav-dropdown">
 <button type="button" class="sx-nav-dropdown__toggle" aria-expanded="false" aria-haspopup="true" aria-controls="sx-nav-nebosh-menu" id="sx-nav-nebosh-btn">
 NEBOSH Opleiding <span class="sx-nav-dropdown__caret" aria-hidden="true">▾</span>
 </button>
 <ul id="sx-nav-nebosh-menu" class="sx-nav-dropdown__menu" role="list">
 <li><a href="/nebosh-igc.html">NEBOSH International Certificate</a></li>
 </ul>
 </li>""",
    ),
    (
        """ <li class="sx-nav-dropdown is-open">
<button type="button" class="sx-nav-dropdown__toggle" aria-expanded="true" aria-haspopup="true" aria-controls="sx-nav-nebosh-menu" id="sx-nav-nebosh-btn">
NEBOSH Opleiding <span class="sx-nav-dropdown__caret" aria-hidden="true">▾</span>
</button>
<ul id="sx-nav-nebosh-menu" class="sx-nav-dropdown__menu" role="list">
<li><a href="/nebosh-igc.html" aria-current="page">NEBOSH International Certificate</a></li>
</ul>
</li>""",
        """ <li class="sx-nav-dropdown is-open">
 <button type="button" class="sx-nav-dropdown__toggle" aria-expanded="true" aria-haspopup="true" aria-controls="sx-nav-nebosh-menu" id="sx-nav-nebosh-btn">
 NEBOSH Opleiding <span class="sx-nav-dropdown__caret" aria-hidden="true">▾</span>
 </button>
 <ul id="sx-nav-nebosh-menu" class="sx-nav-dropdown__menu" role="list">
 <li><a href="/nebosh-igc.html" aria-current="page">NEBOSH International Certificate</a></li>
 </ul>
 </li>""",
    ),
    (
        """ <li class="sx-nav-dropdown is-open">
<button type="button" class="sx-nav-dropdown__toggle" aria-expanded="true" aria-haspopup="true" aria-controls="sx-nav-nebosh-menu" id="sx-nav-nebosh-btn" aria-current="page">
NEBOSH Opleiding <span class="sx-nav-dropdown__caret" aria-hidden="true">▾</span>
</button>
<ul id="sx-nav-nebosh-menu" class="sx-nav-dropdown__menu" role="list">
<li><a href="/nebosh-igc.html">NEBOSH International Certificate</a></li>
</ul>
</li>""",
        """ <li class="sx-nav-dropdown is-open">
 <button type="button" class="sx-nav-dropdown__toggle" aria-expanded="true" aria-haspopup="true" aria-controls="sx-nav-nebosh-menu" id="sx-nav-nebosh-btn" aria-current="page">
 NEBOSH Opleiding <span class="sx-nav-dropdown__caret" aria-hidden="true">▾</span>
 </button>
 <ul id="sx-nav-nebosh-menu" class="sx-nav-dropdown__menu" role="list">
 <li><a href="/nebosh-igc.html">NEBOSH International Certificate</a></li>
 </ul>
 </li>""",
    ),
    (
        """ <li class="sx-nav-panel__dropdown">
<button type="button" class="sx-nav-panel__subtoggle" aria-expanded="false" aria-controls="sx-nav-panel-nebosh" id="sx-nav-panel-nebosh-btn">
NEBOSH Opleiding <span aria-hidden="true">▾</span>
</button>
<ul id="sx-nav-panel-nebosh" class="sx-nav-panel__submenu" hidden>
<li><a href="/nebosh-igc.html">NEBOSH International Certificate</a></li>
</ul>
</li>""",
        """ <li class="sx-nav-panel__dropdown">
 <button type="button" class="sx-nav-panel__subtoggle" aria-expanded="false" aria-controls="sx-nav-panel-nebosh" id="sx-nav-panel-nebosh-btn">
 NEBOSH Opleiding <span aria-hidden="true">▾</span>
 </button>
 <ul id="sx-nav-panel-nebosh" class="sx-nav-panel__submenu" hidden>
 <li><a href="/nebosh-igc.html">NEBOSH International Certificate</a></li>
 </ul>
 </li>""",
    ),
    (
        """ <li class="sx-nav-panel__dropdown">
<button type="button" class="sx-nav-panel__subtoggle" aria-expanded="true" aria-controls="sx-nav-panel-nebosh" id="sx-nav-panel-nebosh-btn">
NEBOSH Opleiding <span aria-hidden="true">▾</span>
</button>
<ul id="sx-nav-panel-nebosh" class="sx-nav-panel__submenu">
<li><a href="/nebosh-igc.html" aria-current="page">NEBOSH International Certificate</a></li>
</ul>
</li>""",
        """ <li class="sx-nav-panel__dropdown">
 <button type="button" class="sx-nav-panel__subtoggle" aria-expanded="true" aria-controls="sx-nav-panel-nebosh" id="sx-nav-panel-nebosh-btn">
 NEBOSH Opleiding <span aria-hidden="true">▾</span>
 </button>
 <ul id="sx-nav-panel-nebosh" class="sx-nav-panel__submenu">
 <li><a href="/nebosh-igc.html" aria-current="page">NEBOSH International Certificate</a></li>
 </ul>
 </li>""",
    ),
    (
        """ <li class="sx-nav-panel__dropdown">
<button type="button" class="sx-nav-panel__subtoggle" aria-expanded="true" aria-controls="sx-nav-panel-nebosh" id="sx-nav-panel-nebosh-btn" aria-current="page">
NEBOSH Opleiding <span aria-hidden="true">▾</span>
</button>
<ul id="sx-nav-panel-nebosh" class="sx-nav-panel__submenu">
<li><a href="/nebosh-igc.html">NEBOSH International Certificate</a></li>
</ul>
</li>""",
        """ <li class="sx-nav-panel__dropdown">
 <button type="button" class="sx-nav-panel__subtoggle" aria-expanded="true" aria-controls="sx-nav-panel-nebosh" id="sx-nav-panel-nebosh-btn" aria-current="page">
 NEBOSH Opleiding <span aria-hidden="true">▾</span>
 </button>
 <ul id="sx-nav-panel-nebosh" class="sx-nav-panel__submenu">
 <li><a href="/nebosh-igc.html">NEBOSH International Certificate</a></li>
 </ul>
 </li>""",
    ),
    # EN variants
    (
        """ <li class="sx-nav-dropdown">
<button type="button" class="sx-nav-dropdown__toggle" aria-expanded="false" aria-haspopup="true" aria-controls="sx-nav-nebosh-menu" id="sx-nav-nebosh-btn">
NEBOSH Course <span class="sx-nav-dropdown__caret" aria-hidden="true">▾</span>
</button>
<ul id="sx-nav-nebosh-menu" class="sx-nav-dropdown__menu" role="list">
<li><a href="/en/nebosh-igc.html">NEBOSH International Certificate</a></li>
</ul>
</li>""",
        """ <li class="sx-nav-dropdown">
 <button type="button" class="sx-nav-dropdown__toggle" aria-expanded="false" aria-haspopup="true" aria-controls="sx-nav-nebosh-menu" id="sx-nav-nebosh-btn">
 NEBOSH Course <span class="sx-nav-dropdown__caret" aria-hidden="true">▾</span>
 </button>
 <ul id="sx-nav-nebosh-menu" class="sx-nav-dropdown__menu" role="list">
 <li><a href="/en/nebosh-igc.html">NEBOSH International Certificate</a></li>
 </ul>
 </li>""",
    ),
    (
        """ <li class="sx-nav-dropdown is-open">
<button type="button" class="sx-nav-dropdown__toggle" aria-expanded="true" aria-haspopup="true" aria-controls="sx-nav-nebosh-menu" id="sx-nav-nebosh-btn">
NEBOSH Course <span class="sx-nav-dropdown__caret" aria-hidden="true">▾</span>
</button>
<ul id="sx-nav-nebosh-menu" class="sx-nav-dropdown__menu" role="list">
<li><a href="/en/nebosh-igc.html" aria-current="page">NEBOSH International Certificate</a></li>
</ul>
</li>""",
        """ <li class="sx-nav-dropdown is-open">
 <button type="button" class="sx-nav-dropdown__toggle" aria-expanded="true" aria-haspopup="true" aria-controls="sx-nav-nebosh-menu" id="sx-nav-nebosh-btn">
 NEBOSH Course <span class="sx-nav-dropdown__caret" aria-hidden="true">▾</span>
 </button>
 <ul id="sx-nav-nebosh-menu" class="sx-nav-dropdown__menu" role="list">
 <li><a href="/en/nebosh-igc.html" aria-current="page">NEBOSH International Certificate</a></li>
 </ul>
 </li>""",
    ),
    (
        """ <li class="sx-nav-dropdown is-open">
<button type="button" class="sx-nav-dropdown__toggle" aria-expanded="true" aria-haspopup="true" aria-controls="sx-nav-nebosh-menu" id="sx-nav-nebosh-btn" aria-current="page">
NEBOSH Course <span class="sx-nav-dropdown__caret" aria-hidden="true">▾</span>
</button>
<ul id="sx-nav-nebosh-menu" class="sx-nav-dropdown__menu" role="list">
<li><a href="/en/nebosh-igc.html">NEBOSH International Certificate</a></li>
</ul>
</li>""",
        """ <li class="sx-nav-dropdown is-open">
 <button type="button" class="sx-nav-dropdown__toggle" aria-expanded="true" aria-haspopup="true" aria-controls="sx-nav-nebosh-menu" id="sx-nav-nebosh-btn" aria-current="page">
 NEBOSH Course <span class="sx-nav-dropdown__caret" aria-hidden="true">▾</span>
 </button>
 <ul id="sx-nav-nebosh-menu" class="sx-nav-dropdown__menu" role="list">
 <li><a href="/en/nebosh-igc.html">NEBOSH International Certificate</a></li>
 </ul>
 </li>""",
    ),
    (
        """ <li class="sx-nav-panel__dropdown">
<button type="button" class="sx-nav-panel__subtoggle" aria-expanded="false" aria-controls="sx-nav-panel-nebosh" id="sx-nav-panel-nebosh-btn">
NEBOSH Course <span aria-hidden="true">▾</span>
</button>
<ul id="sx-nav-panel-nebosh" class="sx-nav-panel__submenu" hidden>
<li><a href="/en/nebosh-igc.html">NEBOSH International Certificate</a></li>
</ul>
</li>""",
        """ <li class="sx-nav-panel__dropdown">
 <button type="button" class="sx-nav-panel__subtoggle" aria-expanded="false" aria-controls="sx-nav-panel-nebosh" id="sx-nav-panel-nebosh-btn">
 NEBOSH Course <span aria-hidden="true">▾</span>
 </button>
 <ul id="sx-nav-panel-nebosh" class="sx-nav-panel__submenu" hidden>
 <li><a href="/en/nebosh-igc.html">NEBOSH International Certificate</a></li>
 </ul>
 </li>""",
    ),
    (
        """ <li class="sx-nav-panel__dropdown">
<button type="button" class="sx-nav-panel__subtoggle" aria-expanded="true" aria-controls="sx-nav-panel-nebosh" id="sx-nav-panel-nebosh-btn">
NEBOSH Course <span aria-hidden="true">▾</span>
</button>
<ul id="sx-nav-panel-nebosh" class="sx-nav-panel__submenu">
<li><a href="/en/nebosh-igc.html" aria-current="page">NEBOSH International Certificate</a></li>
</ul>
</li>""",
        """ <li class="sx-nav-panel__dropdown">
 <button type="button" class="sx-nav-panel__subtoggle" aria-expanded="true" aria-controls="sx-nav-panel-nebosh" id="sx-nav-panel-nebosh-btn">
 NEBOSH Course <span aria-hidden="true">▾</span>
 </button>
 <ul id="sx-nav-panel-nebosh" class="sx-nav-panel__submenu">
 <li><a href="/en/nebosh-igc.html" aria-current="page">NEBOSH International Certificate</a></li>
 </ul>
 </li>""",
    ),
    (
        """ <li class="sx-nav-panel__dropdown">
<button type="button" class="sx-nav-panel__subtoggle" aria-expanded="true" aria-controls="sx-nav-panel-nebosh" id="sx-nav-panel-nebosh-btn" aria-current="page">
NEBOSH Course <span aria-hidden="true">▾</span>
</button>
<ul id="sx-nav-panel-nebosh" class="sx-nav-panel__submenu">
<li><a href="/en/nebosh-igc.html">NEBOSH International Certificate</a></li>
</ul>
</li>""",
        """ <li class="sx-nav-panel__dropdown">
 <button type="button" class="sx-nav-panel__subtoggle" aria-expanded="true" aria-controls="sx-nav-panel-nebosh" id="sx-nav-panel-nebosh-btn" aria-current="page">
 NEBOSH Course <span aria-hidden="true">▾</span>
 </button>
 <ul id="sx-nav-panel-nebosh" class="sx-nav-panel__submenu">
 <li><a href="/en/nebosh-igc.html">NEBOSH International Certificate</a></li>
 </ul>
 </li>""",
    ),
]


def main() -> None:
    count = 0
    for path in ROOT.rglob("*.html"):
        if "rotterdamshop" in path.parts:
            continue
        text = path.read_text(encoding="utf-8")
        original = text
        for old, new in REPLACEMENTS:
            text = text.replace(old, new)
        if text != original:
            path.write_text(text, encoding="utf-8")
            count += 1
    print(f"Fixed indentation in {count} file(s)")


if __name__ == "__main__":
    main()
