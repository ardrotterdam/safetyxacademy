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

// All sx-header pages use NEBOSH dropdown with two subitems
const htmlFiles = walkHtml(ROOT).filter((f) => {
  const content = read(f);
  return content.includes('id="sx-header"');
});

for (const file of htmlFiles) {
  const content = read(file);
  const isEn = file.startsWith('en/');
  const label = isEn ? 'NEBOSH Training' : 'NEBOSH Opleiding';
  const classroomHref = isEn ? '/en/nebosh-course.html' : '/nebosh-opleiding.html';
  const onlineHref = isEn ? '/en/nebosh-igc.html' : '/nebosh-igc.html';
  const classroomLabel = isEn ? 'Classroom (with guidance)' : 'Klassikaal (met begeleiding)';
  const onlineLabel = isEn ? 'Online (self-study)' : 'Online (zelfstudie)';

  if (!content.includes('id="sx-nav-nebosh-menu"')) {
    errors.push(`${file}: missing NEBOSH dropdown menu`);
  }
  if (!content.includes('id="sx-nav-nebosh-btn"') || !content.includes(label)) {
    errors.push(`${file}: missing NEBOSH dropdown toggle (${label})`);
  }
  if (!content.includes(`href="${classroomHref}"`) || !content.includes(classroomLabel)) {
    errors.push(`${file}: missing ${classroomLabel} link`);
  }
  if (!content.includes(`href="${onlineHref}"`) || !content.includes(onlineLabel)) {
    errors.push(`${file}: missing ${onlineLabel} link`);
  }
  const neboshMenus = [
    ...content.matchAll(/id="sx-nav-nebosh-menu"[\s\S]*?<\/ul>/g),
    ...content.matchAll(/id="sx-nav-panel-nebosh"[\s\S]*?<\/ul>/g),
  ];
  for (const match of neboshMenus) {
    if (match[0].includes('NEBOSH International Certificate')) {
      errors.push(`${file}: still uses old NEBOSH International Certificate nav item`);
      break;
    }
  }
  if (content.includes('href="nebosh-opleiding.html">NEBOSH Opleiding</a></li>')) {
    errors.push(`${file}: still uses flat NEBOSH Opleiding link in nav`);
  }
  if (content.includes('href="/en/nebosh-course.html">NEBOSH Course</a></li>')) {
    errors.push(`${file}: still uses flat NEBOSH Course link in nav`);
  }
  if (content.includes('NEBOSH Course <span class="sx-nav-dropdown__caret"')) {
    errors.push(`${file}: still uses old NEBOSH Course dropdown label (expected NEBOSH Training)`);
  }
  if (!content.includes('id="sx-nav-jobs-menu"')) {
    errors.push(`${file}: missing Jobs dropdown menu`);
  }
  if (!content.includes('id="sx-nav-jobs-btn"')) {
    errors.push(`${file}: missing Jobs dropdown toggle`);
  }
  const jobsLabel = isEn ? 'Contracting assignments' : 'ZZP-opdrachten';
  const workAtLabel = isEn ? 'Work at SafetyX' : 'Werken bij SafetyX';
  if (!content.includes(jobsLabel) || !content.includes(workAtLabel)) {
    errors.push(`${file}: missing Jobs dropdown subitems (${jobsLabel}, ${workAtLabel})`);
  }
}

// Active state on landing pages
const nlOpleiding = read('nebosh-opleiding.html');
if (!nlOpleiding.includes('href="/nebosh-opleiding.html" aria-current="page">Klassikaal (met begeleiding)')) {
  errors.push('nebosh-opleiding.html: missing aria-current on Klassikaal nav item');
}

const nlIgc = read('nebosh-igc.html');
if (!nlIgc.includes('href="/nebosh-igc.html" aria-current="page">Online (zelfstudie)')) {
  errors.push('nebosh-igc.html: missing aria-current on Online nav item');
}
if (!nlIgc.includes('href="/en/nebosh-igc.html" hreflang="en"')) {
  errors.push('nebosh-igc.html: missing EN language switch link');
}

const enCourse = read('en/nebosh-course.html');
if (!enCourse.includes('href="/en/nebosh-course.html" aria-current="page">Classroom (with guidance)')) {
  errors.push('en/nebosh-course.html: missing aria-current on Classroom nav item');
}

const enIgc = read('en/nebosh-igc.html');
if (!enIgc.includes('href="/en/nebosh-igc.html" aria-current="page">Online (self-study)')) {
  errors.push('en/nebosh-igc.html: missing aria-current on Online nav item');
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
