#!/usr/bin/env node
/**
 * Static site build check: nav integration, sitemap, and key page invariants.
 */

const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const errors = [];

function read(rel) {
  return fs.readFileSync(path.join(ROOT, rel), 'utf8');
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
      files.push(path.relative(ROOT, full).replace(/\\/g, '/'));
    }
  }
  return files;
}

// Sitemap includes nebosh-igc pages
const sitemap = read('sitemap.xml');
for (const url of ['https://safetyxacademy.nl/nebosh-igc.html', 'https://safetyxacademy.nl/en/nebosh-igc.html']) {
  if (!sitemap.includes(url)) {
    errors.push(`sitemap.xml missing ${url}`);
  }
}

// All sx-header pages use NEBOSH dropdown
const htmlFiles = walkHtml(ROOT).filter((f) => {
  const content = read(f);
  return content.includes('id="sx-header"');
});

for (const file of htmlFiles) {
  const content = read(file);
  const isEn = file.startsWith('en/');
  const label = isEn ? 'NEBOSH Course' : 'NEBOSH Opleiding';
  const igcHref = isEn ? '/en/nebosh-igc.html' : '/nebosh-igc.html';

  if (!content.includes('id="sx-nav-nebosh-menu"')) {
    errors.push(`${file}: missing NEBOSH dropdown menu`);
  }
  if (!content.includes('id="sx-nav-nebosh-btn"') || !content.includes(label)) {
    errors.push(`${file}: missing NEBOSH dropdown toggle (${label})`);
  }
  if (!content.includes(`href="${igcHref}"`) || !content.includes('NEBOSH International Certificate')) {
    errors.push(`${file}: missing NEBOSH International Certificate link`);
  }
  if (content.includes('href="nebosh-opleiding.html">NEBOSH Opleiding</a></li>')) {
    errors.push(`${file}: still uses flat NEBOSH Opleiding link in nav`);
  }
  if (content.includes('href="/en/nebosh-course.html">NEBOSH Course</a></li>')) {
    errors.push(`${file}: still uses flat NEBOSH Course link in nav`);
  }
}

// Active state on landing pages
const nlIgc = read('nebosh-igc.html');
if (!nlIgc.includes('href="/nebosh-igc.html" aria-current="page">NEBOSH International Certificate')) {
  errors.push('nebosh-igc.html: missing aria-current on nav item');
}
if (!nlIgc.includes('href="/en/nebosh-igc.html" hreflang="en"')) {
  errors.push('nebosh-igc.html: missing EN language switch link');
}

const enIgc = read('en/nebosh-igc.html');
if (!enIgc.includes('href="/en/nebosh-igc.html" aria-current="page">NEBOSH International Certificate')) {
  errors.push('en/nebosh-igc.html: missing aria-current on nav item');
}
if (!enIgc.includes('href="/nebosh-igc.html" hreflang="nl"')) {
  errors.push('en/nebosh-igc.html: missing NL language switch link');
}

if (errors.length) {
  console.error('Build check failed:\n');
  for (const err of errors) {
    console.error(`  ✗ ${err}`);
  }
  process.exit(1);
}

console.log(`Build check passed (${htmlFiles.length} sx-header pages, sitemap OK).`);
