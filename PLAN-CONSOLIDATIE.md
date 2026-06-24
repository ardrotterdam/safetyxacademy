# PLAN-CONSOLIDATIE — root vs safetyxacademyV2

**Datum:** 20 mei 2026  
**Status:** Beslissingen vastgelegd — **uitvoering in fasen** (goedkeuring per fase).  
**Doel:** Eén siteversie (V2 → root); map `safetyxacademyV2/` verdwijnt uit de repo.

## Bronnen

| Document | Gebruik |
|---|---|
| BASELINE-METRICS.md | GSC/GA4: clicks, impressies, posities → Behouden / geen redirect |
| DECISIONS-NEEDED.md | Afgeronde en open beslissingen |
| LIVE-STATUS.md | Wat nu live is vs repo-root |
| MIGRATION-PLAN.md | Strategie per template (waar geen harde GSC-data) |

## Scope inventaris

- **118 bestanden** onder versiebeheer (excl. .git/, .vercel/ lokaal genegeerd).
- Per **fysiek pad** in de repo één tabelrij.
- Kolom *Bestaat in root/V2*: counterpart met **zelfde relatief pad** (zonder safetyxacademyV2/).

## Actie-legendes

| Actie | Betekenis |
|---|---|
| **V2 → root** | V2-bestand wordt (bij uitvoering) gekopieerd naar het root-pad; overschrijft verouderde root waar van toepassing. |
| **Behouden** | Huidige root blijft leidend; geen V2-overschrijving (of al gesynchroniseerd). |
| **V2 → root, nieuwe naam** | Naar root maar ander doelpad (bv. images/, docs/, 	ools/). |
| **Verwijderen** | Bestand weg na merge; eventueel 301 in ercel.json. |
| **410 Gone** | URL bewust beëindigd (geen GSC-verkeer); via `vercel.json`. |

---

## Check-resultaten (20 mei 2026)

Uitgevoerd vóór consolidatie, conform werkwijze.

### Vraag 1 — GSC student-guide (28 dagen, `BASELINE-METRICS.md`)

| URL | Clicks | Impressies | In top-pagina's? |
|---|---:|---:|---|
| `/blog/nebosh-student-guide-rotterdam-westplein-veerhaven.html` | 0* | 0* | Nee |
| `/blog/nebosh-student-guide-rotterdam-lunch-landmarks/` | 0* | 0* | Nee |

\*Niet apart vermeld in de 28d-export; alleen `/`, `/jobs.html`, `/blog/nebosh-vs-mkv.html` en "overige" (13 clicks totaal). `DECISIONS-NEEDED.md`: westplein **niet** in top-pagina's.

**Besluit:** Gelijke stand → **`lunch-landmarks/` canonical** (tie-break). 301 westplein → directory; merge V2-layout + content.

### Vraag 3 — GSC root-only blogposts (28 dagen)

| URL | Clicks | Impressies | Live | Besluit |
|---|---:|---:|---|---|
| `/blog/veiligheidskundige-opleiding/` | 0* | 0* | 404 | **410 Gone** |
| `/blog/nebosh-student-guide-rotterdam-lunch-landmarks/` | 0* | 0* | 404 | **Migreren** (canonical student-guide) |

### Vraag 6 — `location-map-fixed.png`

Grep: **geen referenties** → **Verwijderen**.

### Vraag 7 — Losse root-webp's (grep)

| Bestand | Referenties | Actie |
|---|---|---|
| `nebosh-igc-training-rotterdam-students.webp` | `index.html`, `css/style.css` | → `images/` + refs |
| `nebosh-klaslokaal-studenten-rotterdam-safetyxacademy.webp` | `index.html` | → `images/` + refs |
| `safetyxacademy-kantoor-westplein-rotterdam-nebosh-training.webp` | `index.html` | → `images/` + refs |
| `safetyxacademy-og-image.png` | V2 OG-meta | Blijft in root |
| `nando-breure-founder.webp` | Geen | → `images/` |
| `nebosh-safety-team-mission-together-safer-world-rotterdam.webp` | Geen | → `images/` |

Eén atomaire commit voor verplaatsing + referenties.

### Vraag 8 — Privacy-template

Geen `safetyxacademyV2/privacy.html`. Wel volledige **`privacy.html` (root)**. Dev: V2-layout om bestaande tekst; geen nieuwe legal copy tenzij inhoudelijk verouderd.

---

## Vastgelegde beslissingen (user input)

| # | Beslissing |
|---:|---|
| 1 | `lunch-landmarks/` canonical; 301 westplein |
| 2 | Utility HTML **weg** uit webroot |
| 3 | `veiligheidskundige-opleiding/` → **410**; `lunch-landmarks/` → **migreren** |
| 4 | `sitemap-blog.xml` → merge in `sitemap.xml` |
| 5 | Eén `README.md` in root |
| 6 | `location-map-fixed.png` → verwijderen |
| 7 | Root-webp's → `images/` (atomaire commit) |
| 8 | Root privacy-tekst + V2-layout |
| 9 | V2 overschrijft `index.html` |
| 10 | `safetyxacademyV2/*` redirects weg **ná** live check (aparte commit) |

---

## Uitvoeringsvolgorde (goedkeuring per fase)

| Fase | Inhoud | Jouw gate |
|:---:|---|---|
| **0** | Docs bijwerken; backup-check | Akkoord start |
| **1** | Utility weg, sitemap merge, README merge, location-map weg | Review diff (4 commits) |
| **2** | Assets → `images/` (atomaire commit) | Grep 0 oude paden |
| **3a** | V2-bestanden → root kopiëren; **`safetyxacademyV2/` blijft** als fallback | Preview-deploy OK; live check `/`, `/jobs.html`, `/over-ons.html`, `/nebosh-opleiding.html` zonder regressie |
| **3b** | Map `safetyxacademyV2/` verwijderen + `vercel.json` 301/410 (nog **niet** `safetyxacademyV2/*`-redirects weg) | Opnieuw preview-deploy OK |
| **4** | Blog canonical + privacy V2-layout | curl/preview |
| **5** | Deploy + live check | Jij: live OK |
| **6** | Verwijder `safetyxacademyV2/*` uit `vercel.json` (aparte commit) | Afgerond |

### Aanscherpingen planning (20 mei 2026)

**A. Fase 3 gesplitst (3a / 3b)**  
- **3a:** Copy V2 → root; map `safetyxacademyV2/` blijft staan. Gate: preview-deploy + geen regressie op kern-URL's.  
- **3b:** Map verwijderen + vercel 301/410. Gate: opnieuw preview-deploy OK.

**B. Rollback fase 5**  
Bij gebroken pagina's of failed deploy: **git revert** van de merge-commits in **omgekeerde volgorde**, redeploy, daarna oorzaak analyseren voor re-attempt.

**C. Fase 4 vs fase 1**  
Geen technische afhankelijkheid — fase 4 *kan* parallel aan fase 1. **Default: sequentieel** (voor overzicht in review), tenzij expliciet anders aangegeven.

Detail-checklists per fase: `DEPLOY-CHECKLIST.md`.

---

## Inventaristabel

| Pad | Bestaat in root | Bestaat in V2 | Actie | Reden |
|---|---|---|---|---|
| .gitignore | Ja | Nee | Behouden | Repo-config. |
| .vscode/settings.json | Ja | Nee | Behouden | Editor-config. |
| AUDIT.md | Ja | Nee | Behouden | Migratiedocumentatie. |
| BASELINE-METRICS.md | Ja | Nee | Behouden | GSC/GA4-baseline; ijkpunt post-migratie. |
| CNAME | Ja | Nee | Behouden | Domeinconfig safetyxacademy.nl. |
| DECISIONS-NEEDED.md | Ja | Nee | Behouden | Beslissingenlog. |
| DEPLOY-CHECKLIST.md | Ja | Nee | Behouden | Deploy-gate. |
| LIVE-STATUS.md | Ja | Nee | Behouden | Live-audit (20 mei 2026). |
| MIGRATION-PLAN.md | Ja | Nee | Behouden | Strategie; afvinken na consolidatie. |
| README.MD | Ja | Ja | V2 → root | Samenvoegen met V2-README → één README.md; daarna README.MD weg. |
| REDIRECTS-TODO.md | Ja | Nee | Behouden | Open redirects tot besluiten genomen. |
| aanmelden.html | Ja | Ja | V2 → root | Live = V2. vercel.json: /aanmelden → .html. |
| bedankt.html | Ja | Ja | V2 → root | noindex bedankt; V2-layout. |
| blog/index.html | Ja | Ja | V2 → root | Live bloghub = V2. 301 index.html → /blog/. |
| blog/index.php | Ja | Nee | Verwijderen | Geen PHP op Vercel; 301 in vercel.json. |
| blog/nebosh-student-guide-rotterdam-lunch-landmarks/index.html | Ja | Nee | V2 → root | Canonical (GSC-tie); migreer naar V2-blogtemplate; publiceer. |
| blog/nebosh-student-guide-rotterdam-lunch-landmarks/index.php | Ja | Nee | Verwijderen | 301 naar directory (vercel.json). |
| blog/veiligheidskundige-opleiding/index.html | Ja | Nee | 410 Gone | GSC 0/0; 410 via vercel.json; geen migratie. |
| blog/veiligheidskundige-opleiding/index.php | Ja | Nee | Verwijderen | 301 naar directory (vercel.json). |
| css/header.css | Ja | Nee | Verwijderen | Oude root-header-CSS. |
| css/style.css | Ja | Ja | Verwijderen | V2-legacy; niet live. |
| favicon-192.png | Ja | Ja | V2 → root | Idem. |
| favicon-32.png | Ja | Ja | V2 → root | Idem. |
| favicon-512.png | Ja | Ja | V2 → root | Idem. |
| favicon-svg.svg | Ja | Ja | V2 → root | Favicon-set harmoniseren. |
| googlea9eb476bc6025f6e.html | Ja | Nee | Behouden | GSC-verificatie. |
| images/blog/nebosh-student-erasmusbrug-rotterdam-westplein-veiligheidsopleiding.webp | Ja | Ja | V2 → root | Gedeeld pad; V2 leidend bij verschil. |
| images/blog/veiligheidskundige-opleiding-industriele-inspectie.webp | Ja | Ja | V2 → root | Gedeeld blog-asset. |
| images/blog/veiligheidskundige-opleiding-nebosh-mkv.webp | Ja | Nee | Behouden | WebP (q80, 31,5 KB) als hero van blog/veiligheidskundige-opleiding/. Oude .jpg mag na verificatie weg. |
| includes/header.html | Ja | Ja | V2 → root | V2-nav; root fetch-include verouderd. |
| index.html | Ja | Ja | V2 → root | Live = V2 (LIVE-STATUS). GSC #1 homepage (17 clicks). Root = oude template. |
| jobs.html | Ja | Ja | V2 → root | DECISIONS: nooit → werken-bij. GSC #2: 12 clicks, 331 impr. |
| js/header.js | Ja | Ja | Verwijderen | Fetch-header oude root; niet in V2-flow. |
| js/web3forms-handler.js | Ja | Ja | V2 → root | Formulierhandler; V2 leidend. |
| location-map-fixed.png | Ja | Nee | Verwijderen | Geen grep-referenties in repo. |
| nando-breure-founder.webp | Ja | Nee | V2 → root, nieuwe naam | Consolideer naar images/nando-breure-founder.webp (V2-structuur). |
| nebosh-igc-training-rotterdam-students.webp | Ja | Nee | V2 → root, nieuwe naam | → images/nebosh-igc-training-rotterdam-students.webp |
| nebosh-klaslokaal-studenten-rotterdam-safetyxacademy.webp | Ja | Nee | V2 → root, nieuwe naam | → images/nebosh-klaslokaal-studenten-rotterdam-safetyxacademy.webp |
| nebosh-safety-team-mission-together-safer-world-rotterdam.webp | Ja | Nee | V2 → root, nieuwe naam | → images/nebosh-safety-team-mission-together-safer-world-rotterdam.webp |
| over-ons.html | Ja | Ja | Behouden | Root = al V2-content (20 mei). GSC 31 impr/0 clicks — meet +4/+8w. Sync met V2 indien drift. |
| privacy.html | Ja | Nee | Behouden | Root-tekst leidend; wrap in V2-layout (geen V2-privacytemplate). Live 404 tot deploy. |
| robots.txt | Ja | Ja | V2 → root | Eén robots.txt na merge. |
| safetyxacademy-kantoor-westplein-rotterdam-nebosh-training.webp | Ja | Nee | V2 → root, nieuwe naam | → images/safetyxacademy-kantoor-westplein-rotterdam-nebosh-training.webp |
| safetyxacademy-og-image.png | Ja | Nee | Behouden | OG-image; V2-paginas linken hierheen. |
| safetyxacademyV2/GA_GTM_AUDIT_REPORT.md | Nee | Ja | Verwijderen | Na copy naar `docs/GA_GTM_AUDIT_REPORT.md`: bron in safetyxacademyV2/ verdwijnt met map. |
| safetyxacademyV2/README.md | Ja | Ja | Verwijderen | Na merge naar README.md in root. |
| safetyxacademyV2/SLIMBUITENLAND_MOBILE_MENU_IMPLEMENTATION.md | Nee | Ja | Verwijderen | Na copy naar `docs/SLIMBUITENLAND_MOBILE_MENU_IMPLEMENTATION.md`: bron in safetyxacademyV2/ verdwijnt met map. |
| safetyxacademyV2/aanmelden.html | Ja | Ja | Verwijderen | Na copy naar aanmelden.html: bronbestand in safetyxacademyV2/ verdwijnt met hele map. |
| safetyxacademyV2/bedankt-jobs.html | Nee | Ja | Verwijderen | Na copy naar bedankt-jobs.html: bronbestand in safetyxacademyV2/ verdwijnt met hele map. |
| safetyxacademyV2/bedankt.html | Ja | Ja | Verwijderen | Na copy naar bedankt.html: bronbestand in safetyxacademyV2/ verdwijnt met hele map. |
| safetyxacademyV2/blog/hse-zzp-dagtarieven-rotterdam-antwerpen.html | Nee | Ja | Verwijderen | Na copy naar blog/hse-zzp-dagtarieven-rotterdam-antwerpen.html: bronbestand in safetyxacademyV2/ verdwijnt met hele map. |
| safetyxacademyV2/blog/index.html | Ja | Ja | Verwijderen | Na copy naar blog/index.html: bronbestand in safetyxacademyV2/ verdwijnt met hele map. |
| safetyxacademyV2/blog/nebosh-student-guide-rotterdam-westplein-veerhaven.html | Nee | Ja | Verwijderen | Na copy: 301 → lunch-landmarks/; bron in V2-map weg. |
| safetyxacademyV2/blog/nebosh-vs-mkv.html | Nee | Ja | Verwijderen | Na copy naar blog/nebosh-vs-mkv.html: bronbestand in safetyxacademyV2/ verdwijnt met hele map. |
| safetyxacademyV2/blog/wat-is-nebosh-igc.html | Nee | Ja | Verwijderen | Na copy naar blog/wat-is-nebosh-igc.html: bronbestand in safetyxacademyV2/ verdwijnt met hele map. |
| safetyxacademyV2/create-thumbnail-auto.html | Nee | Ja | Verwijderen | Utility; niet in webroot (fase 1). |
| safetyxacademyV2/css/style-v3.css | Nee | Ja | Verwijderen | Na copy naar css/style-v3.css: bronbestand in safetyxacademyV2/ verdwijnt met hele map. |
| safetyxacademyV2/css/style.css | Ja | Ja | Verwijderen | V2-legacy css/style.css; niet naar productie. |
| safetyxacademyV2/docs/SAFETYXAC-BLUEPRINT.md | Nee | Ja | Verwijderen | Na copy naar docs/SAFETYXAC-BLUEPRINT.md: bronbestand in safetyxacademyV2/ verdwijnt met hele map. |
| safetyxacademyV2/favicon-192.png | Ja | Ja | Verwijderen | Na copy naar favicon-192.png: bronbestand in safetyxacademyV2/ verdwijnt met hele map. |
| safetyxacademyV2/favicon-32.png | Ja | Ja | Verwijderen | Na copy naar favicon-32.png: bronbestand in safetyxacademyV2/ verdwijnt met hele map. |
| safetyxacademyV2/favicon-512.png | Ja | Ja | Verwijderen | Na copy naar favicon-512.png: bronbestand in safetyxacademyV2/ verdwijnt met hele map. |
| safetyxacademyV2/favicon-svg.svg | Ja | Ja | Verwijderen | Na copy naar favicon-svg.svg: bronbestand in safetyxacademyV2/ verdwijnt met hele map. |
| safetyxacademyV2/images/blog/hse-zzp-dagtarieven-rotterdam-antwerpen-helm-euro.webp | Nee | Ja | Verwijderen | Na copy naar `images/blog/...`: bron in safetyxacademyV2/ verdwijnt met map. |
| safetyxacademyV2/images/blog/nebosh-igc-opleiding-veiligheidskundigen-hse-internationale-industrie.webp | Nee | Ja | Verwijderen | Na copy naar `images/blog/...`: bron in safetyxacademyV2/ verdwijnt met map. |
| safetyxacademyV2/images/blog/nebosh-student-erasmusbrug-rotterdam-westplein-veiligheidsopleiding.webp | Ja | Ja | Verwijderen | Na copy naar images/blog/nebosh-student-erasmusbrug-rotterdam-westplein-veiligheidsopleiding.webp: bronbestand in safetyxacademyV2/ verdwijnt met hele map. |
| safetyxacademyV2/images/blog/nebosh-vs-mvk-jonge-hse-professionals-haven-containerterminal.webp | Nee | Ja | Verwijderen | Na copy naar `images/blog/...`: bron in safetyxacademyV2/ verdwijnt met map. |
| safetyxacademyV2/images/blog/veiligheidskundige-opleiding-industriele-inspectie.webp | Ja | Ja | Verwijderen | Na copy naar images/blog/veiligheidskundige-opleiding-industriele-inspectie.webp: bronbestand in safetyxacademyV2/ verdwijnt met hele map. |
| safetyxacademyV2/images/blog/veiligheidskundige-thumbnail.webp | Nee | Ja | Verwijderen | Na copy naar `images/blog/...`: bron in safetyxacademyV2/ verdwijnt met map. |
| safetyxacademyV2/images/hero-remotion.mp4 | Nee | Ja | Verwijderen | Na copy naar `images/hero-remotion.mp4`: bron in safetyxacademyV2/ verdwijnt met map. |
| safetyxacademyV2/images/nando-breure-founder.webp | Nee | Ja | Verwijderen | Na copy naar `images/nando-breure-founder.webp`: bron in safetyxacademyV2/ verdwijnt met map. |
| safetyxacademyV2/images/nebosh-ig2-risk-assessment-haven-rotterdam.webp | Nee | Ja | Verwijderen | Na copy naar `images/...`: bron in safetyxacademyV2/ verdwijnt met map. |
| safetyxacademyV2/images/nebosh-igc-klaslokaal-rotterdam-instructeur.webp | Nee | Ja | Verwijderen | Na copy naar `images/...`: bron in safetyxacademyV2/ verdwijnt met map. |
| safetyxacademyV2/images/nebosh-igc-training-rotterdam-students.webp | Nee | Ja | Verwijderen | Na copy naar `images/...`: bron in safetyxacademyV2/ verdwijnt met map. |
| safetyxacademyV2/images/nebosh-klaslokaal-studenten-rotterdam-safetyxacademy.webp | Nee | Ja | Verwijderen | Na copy naar `images/...`: bron in safetyxacademyV2/ verdwijnt met map. |
| safetyxacademyV2/images/nebosh-offshore-safety-training-oil-rig.webp | Nee | Ja | Verwijderen | Na copy naar `images/...`: bron in safetyxacademyV2/ verdwijnt met map. |
| safetyxacademyV2/images/nebosh-safety-team-mission-together-safer-world-rotterdam.webp | Nee | Ja | Verwijderen | Na copy naar `images/...`: bron in safetyxacademyV2/ verdwijnt met map. |
| safetyxacademyV2/images/offshore-werk-op-hoogte-rope-access-veiligheidsharnas.webp | Nee | Ja | Verwijderen | Na copy naar `images/...`: bron in safetyxacademyV2/ verdwijnt met map. |
| safetyxacademyV2/images/safetyxacademy-kantoor-westplein-rotterdam-nebosh-training.webp | Nee | Ja | Verwijderen | Na copy naar `images/...`: bron in safetyxacademyV2/ verdwijnt met map. |
| safetyxacademyV2/includes/header.html | Ja | Ja | Verwijderen | Na copy naar includes/header.html: bronbestand in safetyxacademyV2/ verdwijnt met hele map. |
| safetyxacademyV2/index.html | Ja | Ja | Verwijderen | Na copy naar index.html: bronbestand in safetyxacademyV2/ verdwijnt met hele map. |
| safetyxacademyV2/jobs.html | Ja | Ja | Verwijderen | Na copy naar jobs.html: bronbestand in safetyxacademyV2/ verdwijnt met hele map. |
| safetyxacademyV2/js/hamburger.js | Nee | Ja | Verwijderen | Na copy naar js/hamburger.js: bronbestand in safetyxacademyV2/ verdwijnt met hele map. |
| safetyxacademyV2/js/header.js | Ja | Ja | Verwijderen | V2-legacy js/header.js; niet naar productie. |
| safetyxacademyV2/js/main-v3.js | Nee | Ja | Verwijderen | Na copy naar js/main-v3.js: bronbestand in safetyxacademyV2/ verdwijnt met hele map. |
| safetyxacademyV2/js/menu-scroll.js | Nee | Ja | Verwijderen | Na copy naar js/menu-scroll.js: bronbestand in safetyxacademyV2/ verdwijnt met hele map. |
| safetyxacademyV2/js/nav.js | Nee | Ja | Verwijderen | Na copy naar js/nav.js: bronbestand in safetyxacademyV2/ verdwijnt met hele map. |
| safetyxacademyV2/js/slimbuitenland-menu.js | Nee | Ja | Verwijderen | Na copy naar js/slimbuitenland-menu.js: bronbestand in safetyxacademyV2/ verdwijnt met hele map. |
| safetyxacademyV2/js/web3forms-handler.js | Ja | Ja | Verwijderen | Na copy naar js/web3forms-handler.js: bronbestand in safetyxacademyV2/ verdwijnt met hele map. |
| safetyxacademyV2/make-thumbnail.ps1 | Nee | Ja | Verwijderen | Na copy naar `tools/make-thumbnail.ps1`: bron in safetyxacademyV2/ verdwijnt met map. |
| safetyxacademyV2/nebosh-benelux-ports.html | Nee | Ja | Verwijderen | Na copy naar nebosh-benelux-ports.html: bronbestand in safetyxacademyV2/ verdwijnt met hele map. |
| safetyxacademyV2/nebosh-ig1-oefenvragen.html | Nee | Ja | Verwijderen | Na copy naar nebosh-ig1-oefenvragen.html: bronbestand in safetyxacademyV2/ verdwijnt met hele map. |
| safetyxacademyV2/nebosh-ig2-risk-assessment.html | Nee | Ja | Verwijderen | Na copy naar nebosh-ig2-risk-assessment.html: bronbestand in safetyxacademyV2/ verdwijnt met hele map. |
| safetyxacademyV2/nebosh-offshore.html | Nee | Ja | Verwijderen | Na copy naar nebosh-offshore.html: bronbestand in safetyxacademyV2/ verdwijnt met hele map. |
| safetyxacademyV2/nebosh-opleiding.html | Nee | Ja | Verwijderen | Na copy naar nebosh-opleiding.html: bronbestand in safetyxacademyV2/ verdwijnt met hele map. |
| safetyxacademyV2/nebosh-quiz.html | Nee | Ja | Verwijderen | Na copy naar nebosh-quiz.html: bronbestand in safetyxacademyV2/ verdwijnt met hele map. |
| safetyxacademyV2/optimize-offshore-image.ps1 | Nee | Ja | Verwijderen | Na copy naar `tools/optimize-offshore-image.ps1`: bron in safetyxacademyV2/ verdwijnt met map. |
| safetyxacademyV2/over-ons.html | Ja | Ja | Verwijderen | Dubbel/stub in V2-map; root over-ons.html is leidend: Root = al V2-content (20 mei). GSC 31 impr/0 clicks — meet +4/+8w. Sync met V2 indien drift. |
| safetyxacademyV2/remotion/.gitignore | Nee | Ja | Verwijderen | Na copy naar remotion/.gitignore: bronbestand in safetyxacademyV2/ verdwijnt met hele map. |
| safetyxacademyV2/remotion/README.md | Nee | Ja | Verwijderen | Na copy naar remotion/README.md: bronbestand in safetyxacademyV2/ verdwijnt met hele map. |
| safetyxacademyV2/remotion/package-lock.json | Nee | Ja | Verwijderen | Na copy naar remotion/package-lock.json: bronbestand in safetyxacademyV2/ verdwijnt met hele map. |
| safetyxacademyV2/remotion/package.json | Nee | Ja | Verwijderen | Na copy naar remotion/package.json: bronbestand in safetyxacademyV2/ verdwijnt met hele map. |
| safetyxacademyV2/remotion/remotion.config.ts | Nee | Ja | Verwijderen | Na copy naar remotion/remotion.config.ts: bronbestand in safetyxacademyV2/ verdwijnt met hele map. |
| safetyxacademyV2/remotion/src/HeroLoop.tsx | Nee | Ja | Verwijderen | Na copy naar remotion/src/HeroLoop.tsx: bronbestand in safetyxacademyV2/ verdwijnt met hele map. |
| safetyxacademyV2/remotion/src/Root.tsx | Nee | Ja | Verwijderen | Na copy naar remotion/src/Root.tsx: bronbestand in safetyxacademyV2/ verdwijnt met hele map. |
| safetyxacademyV2/remotion/src/index.ts | Nee | Ja | Verwijderen | Na copy naar remotion/src/index.ts: bronbestand in safetyxacademyV2/ verdwijnt met hele map. |
| safetyxacademyV2/remotion/tsconfig.json | Nee | Ja | Verwijderen | Na copy naar remotion/tsconfig.json: bronbestand in safetyxacademyV2/ verdwijnt met hele map. |
| safetyxacademyV2/resize-exact.html | Nee | Ja | Verwijderen | Utility; niet in webroot (fase 1). |
| safetyxacademyV2/resize-exact.ps1 | Nee | Ja | Verwijderen | Na copy naar `tools/resize-exact.ps1`: bron in safetyxacademyV2/ verdwijnt met map. |
| safetyxacademyV2/robots.txt | Ja | Ja | Verwijderen | Na copy naar robots.txt: bronbestand in safetyxacademyV2/ verdwijnt met hele map. |
| safetyxacademyV2/sitemap.xml | Ja | Ja | Verwijderen | Na copy naar sitemap.xml: bronbestand in safetyxacademyV2/ verdwijnt met hele map. |
| safetyxacademyV2/tools/_fix_quiz_en_spans.py | Nee | Ja | Verwijderen | Na copy naar tools/_fix_quiz_en_spans.py: bronbestand in safetyxacademyV2/ verdwijnt met hele map. |
| safetyxacademyV2/tools/_nl_site_sweep.py | Nee | Ja | Verwijderen | Na copy naar tools/_nl_site_sweep.py: bronbestand in safetyxacademyV2/ verdwijnt met hele map. |
| safetyxacademyV2/tools/_nl_sweep_report.json | Nee | Ja | Verwijderen | Na copy naar tools/_nl_sweep_report.json: bronbestand in safetyxacademyV2/ verdwijnt met hele map. |
| safetyxacademyV2/werken-bij.html | Nee | Ja | Verwijderen | Na copy naar werken-bij.html: bronbestand in safetyxacademyV2/ verdwijnt met hele map. |
| sitemap-blog.xml | Ja | Nee | Verwijderen | Merge URLs in sitemap.xml (fase 1); daarna weg. |
| sitemap.xml | Ja | Ja | V2 → root | Live sitemap = V2-structuur (non-www). Root-sitemap verouderd (www, ankers). |
| vercel.json | Ja | Nee | Behouden | Actieve redirects; na merge /safetyxacademyV2/*-regels verwijderen. |

---

## Samenvatting per actie-categorie

Telling op **fysieke bestanden** in de repo (118 rijen). Bestanden onder `safetyxacademyV2/` die naar root worden gekopieerd staan in de tabel als **Verwijderen** (bron verdwijnt met de map).

| Actie | Aantal bestanden |
|---|---:|
| Verwijderen | 72 |
| V2 → root | 21 |
| Behouden | 17 |
| V2 → root, nieuwe naam | 5 |
| 410 Gone | 1 |
| Beslissing nodig | 0 |
| **Totaal** | **118** |

### Productie-effect (unieke doelpaden na consolidatie)

| Actie | ~Aantal | Toelichting |
|---|---:|---|
| V2 → root | 38 | HTML/CSS/JS/assets van V2 naar bestaand root-pad |
| V2 → root, nieuwe naam | 23 | o.a. `images/`, `docs/`, `tools/`, `remotion/` |
| Behouden | 17 | Migratiedocs, CNAME, privacy, over-ons, root-only blog, enz. |
| Verwijderen | 12 | Verouderde root (`css/style.css`, `js/header.js`, PHP, dubbele assets) |
| 410 Gone | 1 | `/blog/veiligheidskundige-opleiding/` |
| Map `safetyxacademyV2/` | 1 | Hele map weg (71 bestanden) |

**Totaal bestanden in inventaris:** 118

---

## Openstaande vragen

**Status: alle 10 beantwoord** (20 mei 2026). Zie *Check-resultaten* en *Vastgelegde beslissingen*.

**Volgende stap:** Geef akkoord per fase (0–6). Bijvoorbeeld: **“akkoord fase 1”** om te starten met opschoning (utility, sitemap, README, location-map).
