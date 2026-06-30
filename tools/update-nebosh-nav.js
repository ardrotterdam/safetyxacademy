#!/usr/bin/env node
/** Update NEBOSH nav dropdown across all sx-header HTML pages. */

const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');

const NL_DESKTOP = {
  default: ` <li class="sx-nav-dropdown">
 <button type="button" class="sx-nav-dropdown__toggle" aria-expanded="false" aria-haspopup="true" aria-controls="sx-nav-nebosh-menu" id="sx-nav-nebosh-btn">
 NEBOSH Opleiding <span class="sx-nav-dropdown__caret" aria-hidden="true">▾</span>
 </button>
 <ul id="sx-nav-nebosh-menu" class="sx-nav-dropdown__menu" role="list">
 <li><a href="/nebosh-opleiding.html">Klassikaal (met begeleiding)</a></li>
 <li><a href="/nebosh-igc.html">Online (zelfstudie)</a></li>
 </ul>
 </li>`,
  opleiding: ` <li class="sx-nav-dropdown is-open">
 <button type="button" class="sx-nav-dropdown__toggle" aria-expanded="true" aria-haspopup="true" aria-controls="sx-nav-nebosh-menu" id="sx-nav-nebosh-btn">
 NEBOSH Opleiding <span class="sx-nav-dropdown__caret" aria-hidden="true">▾</span>
 </button>
 <ul id="sx-nav-nebosh-menu" class="sx-nav-dropdown__menu" role="list">
 <li><a href="/nebosh-opleiding.html" aria-current="page">Klassikaal (met begeleiding)</a></li>
 <li><a href="/nebosh-igc.html">Online (zelfstudie)</a></li>
 </ul>
 </li>`,
  igc: ` <li class="sx-nav-dropdown is-open">
 <button type="button" class="sx-nav-dropdown__toggle" aria-expanded="true" aria-haspopup="true" aria-controls="sx-nav-nebosh-menu" id="sx-nav-nebosh-btn">
 NEBOSH Opleiding <span class="sx-nav-dropdown__caret" aria-hidden="true">▾</span>
 </button>
 <ul id="sx-nav-nebosh-menu" class="sx-nav-dropdown__menu" role="list">
 <li><a href="/nebosh-opleiding.html">Klassikaal (met begeleiding)</a></li>
 <li><a href="/nebosh-igc.html" aria-current="page">Online (zelfstudie)</a></li>
 </ul>
 </li>`,
};

const NL_MOBILE = {
  default: ` <li class="sx-nav-panel__dropdown">
 <button type="button" class="sx-nav-panel__subtoggle" aria-expanded="false" aria-controls="sx-nav-panel-nebosh" id="sx-nav-panel-nebosh-btn">
 NEBOSH Opleiding <span aria-hidden="true">▾</span>
 </button>
 <ul id="sx-nav-panel-nebosh" class="sx-nav-panel__submenu" hidden>
 <li><a href="/nebosh-opleiding.html">Klassikaal (met begeleiding)</a></li>
 <li><a href="/nebosh-igc.html">Online (zelfstudie)</a></li>
 </ul>
 </li>`,
  opleiding: ` <li class="sx-nav-panel__dropdown">
 <button type="button" class="sx-nav-panel__subtoggle" aria-expanded="true" aria-controls="sx-nav-panel-nebosh" id="sx-nav-panel-nebosh-btn">
 NEBOSH Opleiding <span aria-hidden="true">▾</span>
 </button>
 <ul id="sx-nav-panel-nebosh" class="sx-nav-panel__submenu">
 <li><a href="/nebosh-opleiding.html" aria-current="page">Klassikaal (met begeleiding)</a></li>
 <li><a href="/nebosh-igc.html">Online (zelfstudie)</a></li>
 </ul>
 </li>`,
  igc: ` <li class="sx-nav-panel__dropdown">
 <button type="button" class="sx-nav-panel__subtoggle" aria-expanded="true" aria-controls="sx-nav-panel-nebosh" id="sx-nav-panel-nebosh-btn">
 NEBOSH Opleiding <span aria-hidden="true">▾</span>
 </button>
 <ul id="sx-nav-panel-nebosh" class="sx-nav-panel__submenu">
 <li><a href="/nebosh-opleiding.html">Klassikaal (met begeleiding)</a></li>
 <li><a href="/nebosh-igc.html" aria-current="page">Online (zelfstudie)</a></li>
 </ul>
 </li>`,
};

const EN_DESKTOP = {
  default: ` <li class="sx-nav-dropdown">
 <button type="button" class="sx-nav-dropdown__toggle" aria-expanded="false" aria-haspopup="true" aria-controls="sx-nav-nebosh-menu" id="sx-nav-nebosh-btn">
 NEBOSH Training <span class="sx-nav-dropdown__caret" aria-hidden="true">▾</span>
 </button>
 <ul id="sx-nav-nebosh-menu" class="sx-nav-dropdown__menu" role="list">
 <li><a href="/en/nebosh-course.html">Classroom (with guidance)</a></li>
 <li><a href="/en/nebosh-igc.html">Online (self-study)</a></li>
 </ul>
 </li>`,
  course: ` <li class="sx-nav-dropdown is-open">
 <button type="button" class="sx-nav-dropdown__toggle" aria-expanded="true" aria-haspopup="true" aria-controls="sx-nav-nebosh-menu" id="sx-nav-nebosh-btn">
 NEBOSH Training <span class="sx-nav-dropdown__caret" aria-hidden="true">▾</span>
 </button>
 <ul id="sx-nav-nebosh-menu" class="sx-nav-dropdown__menu" role="list">
 <li><a href="/en/nebosh-course.html" aria-current="page">Classroom (with guidance)</a></li>
 <li><a href="/en/nebosh-igc.html">Online (self-study)</a></li>
 </ul>
 </li>`,
  igc: ` <li class="sx-nav-dropdown is-open">
 <button type="button" class="sx-nav-dropdown__toggle" aria-expanded="true" aria-haspopup="true" aria-controls="sx-nav-nebosh-menu" id="sx-nav-nebosh-btn">
 NEBOSH Training <span class="sx-nav-dropdown__caret" aria-hidden="true">▾</span>
 </button>
 <ul id="sx-nav-nebosh-menu" class="sx-nav-dropdown__menu" role="list">
 <li><a href="/en/nebosh-course.html">Classroom (with guidance)</a></li>
 <li><a href="/en/nebosh-igc.html" aria-current="page">Online (self-study)</a></li>
 </ul>
 </li>`,
};

const EN_MOBILE = {
  default: ` <li class="sx-nav-panel__dropdown">
 <button type="button" class="sx-nav-panel__subtoggle" aria-expanded="false" aria-controls="sx-nav-panel-nebosh" id="sx-nav-panel-nebosh-btn">
 NEBOSH Training <span aria-hidden="true">▾</span>
 </button>
 <ul id="sx-nav-panel-nebosh" class="sx-nav-panel__submenu" hidden>
 <li><a href="/en/nebosh-course.html">Classroom (with guidance)</a></li>
 <li><a href="/en/nebosh-igc.html">Online (self-study)</a></li>
 </ul>
 </li>`,
  course: ` <li class="sx-nav-panel__dropdown">
 <button type="button" class="sx-nav-panel__subtoggle" aria-expanded="true" aria-controls="sx-nav-panel-nebosh" id="sx-nav-panel-nebosh-btn">
 NEBOSH Training <span aria-hidden="true">▾</span>
 </button>
 <ul id="sx-nav-panel-nebosh" class="sx-nav-panel__submenu">
 <li><a href="/en/nebosh-course.html" aria-current="page">Classroom (with guidance)</a></li>
 <li><a href="/en/nebosh-igc.html">Online (self-study)</a></li>
 </ul>
 </li>`,
  igc: ` <li class="sx-nav-panel__dropdown">
 <button type="button" class="sx-nav-panel__subtoggle" aria-expanded="true" aria-controls="sx-nav-panel-nebosh" id="sx-nav-panel-nebosh-btn">
 NEBOSH Training <span aria-hidden="true">▾</span>
 </button>
 <ul id="sx-nav-panel-nebosh" class="sx-nav-panel__submenu">
 <li><a href="/en/nebosh-course.html">Classroom (with guidance)</a></li>
 <li><a href="/en/nebosh-igc.html" aria-current="page">Online (self-study)</a></li>
 </ul>
 </li>`,
};

const DESKTOP_RE =
  / <li class="sx-nav-dropdown(?: is-open)?">\s*<button type="button" class="sx-nav-dropdown__toggle"[^>]*id="sx-nav-nebosh-btn"[^>]*>.*?<\/button>\s*<ul id="sx-nav-nebosh-menu" class="sx-nav-dropdown__menu" role="list">.*?<\/ul>\s*<\/li>/s;

const MOBILE_RE =
  / <li class="sx-nav-panel__dropdown">\s*<button type="button" class="sx-nav-panel__subtoggle"[^>]*id="sx-nav-panel-nebosh-btn"[^>]*>.*?<\/button>\s*<ul id="sx-nav-panel-nebosh" class="sx-nav-panel__submenu"(?: hidden)?>.*?<\/ul>\s*<\/li>/s;

function pageVariant(relPath) {
  const norm = relPath.replace(/\\/g, '/');
  if (norm === 'nebosh-igc.html') return 'igc';
  if (norm === 'nebosh-opleiding.html') return 'opleiding';
  if (norm === 'en/nebosh-igc.html') return 'igc';
  if (norm === 'en/nebosh-course.html') return 'course';
  return 'default';
}

function walkHtml(dir, files = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.name === 'node_modules' || entry.name === 'rotterdamshop' || entry.name === '.next') {
      continue;
    }
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walkHtml(full, files);
    } else if (entry.name.endsWith('.html')) {
      files.push(path.relative(ROOT, full));
    }
  }
  return files;
}

function updateFile(relPath) {
  const full = path.join(ROOT, relPath);
  let text = fs.readFileSync(full, 'utf8');
  if (!text.includes('sx-header')) return false;

  const variant = pageVariant(relPath);
  const en = relPath.replace(/\\/g, '/').startsWith('en/');
  const original = text;

  if (en) {
    text = text.replace(DESKTOP_RE, EN_DESKTOP[variant]);
    text = text.replace(MOBILE_RE, EN_MOBILE[variant]);
  } else {
    text = text.replace(DESKTOP_RE, NL_DESKTOP[variant]);
    text = text.replace(MOBILE_RE, NL_MOBILE[variant]);
  }

  if (text !== original) {
    fs.writeFileSync(full, text, 'utf8');
    return true;
  }
  return false;
}

const updated = [];
for (const file of walkHtml(ROOT)) {
  if (updateFile(file)) updated.push(file.replace(/\\/g, '/'));
}

console.log(`Updated ${updated.length} file(s):`);
for (const f of updated.sort()) {
  console.log(`  - ${f}`);
}
