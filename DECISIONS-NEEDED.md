# Beslissingen vóór / na migratie

Laatst bijgewerkt: 20 mei 2026  
Bronnen: `AUDIT.md`, `MIGRATION-PLAN.md`, `LIVE-STATUS.md`, `BASELINE-METRICS.md` (GSC + GA4, 28 dagen).

Legenda: 🔴 = blokkeert SEO/deploy · ⚠️ = beslissing gewenst · ✅ = afgerond · 📋 = marketing/content (geen dev)

---

## ✅ Afgerond op basis van GSC (28 dagen)

### MVK/MKV-URL — geen redirect, geen rename

| Veld | Waarde |
|---|---|
| **Beslissing** | ✅ URL `/blog/nebosh-vs-mkv.html` ongewijzigd laten. Geen 301 naar `nebosh-vs-mvk.html` of andere spelling. |
| **GSC-bewijs** | Pagina rankt op **positie 5** met **5 clicks / 113 impressies**. Geen enkele query in GSC bevat `mvk` of `mkv vs nebosh`. |
| **Actie dev** | Verwijder TODO uit `vercel.json` → `_redirects_todo` (MVK/MKV-regel). Niet activeren. |
| **Actie marketing** | Optioneel later: content-test (title/H1 rond MVK) **los van URL** — alleen als nieuwe zoekdata dat rechtvaardigt. |

### `/jobs.html` — permanent behouden, nooit redirecten naar werken-bij

| Veld | Waarde |
|---|---|
| **Beslissing** | ✅ **Do not redirect.** `/jobs.html` blijft de live HSE jobs & ZZP-pagina in elk deploy-artifact. |
| **GSC-bewijs** | **#2 ranked pagina:** 12 clicks, 331 impressies, gem. positie **16**. |
| **Actie dev** | Verwijder TODO uit `vercel.json` → `_redirects_todo` (`jobs.html` → `werken-bij.html`). Markeer in deploy-docs: **NOOIT** deze redirect activeren. |
| **Context** | `MIGRATION-PLAN.md` en oude root-`jobs.html` ("Werken bij") zijn verouderd; live draait al V2 jobs/ZZP op `/jobs.html` (`LIVE-STATUS.md`). Werken-bij-intent hoort op `/werken-bij.html`. |

---

## 🔴 Dev-prioriteit (data-onderbouwd)

### `/over-ons.html` — meta-refresh stub vervangen

| Veld | Waarde |
|---|---|
| **Prioriteit** | 🔴 (was ⚠️ in audit) |
| **GSC-bewijs** | Positie **30,7**, **31 impressies**, **0 clicks** — zwakke SERP-performance; meta-refresh/JS-redirect in repo-root `over-ons.html` is een crawl/signaal-risico. |
| **Live vs repo** | Live toont al V2-content (`LIVE-STATUS.md`); root-bestand `over-ons.html` in repo is nog een **noindex + meta-refresh** stub naar zichzelf. |
| **Beslissing** | Publiceer `safetyxacademyV2/over-ons.html` op root `/over-ons.html` bij deploy. Geen meta-refresh. Server-side 301 alleen voor **afwijkende bron-URL's** (indien die bestaan), via `vercel.json` — niet een redirect naar dezelfde URL. |
| **Eigenaar** | Dev |
| **Acceptatie** | `curl -I` → 200, geen `Refresh`-header; `robots` indexeerbaar; Organization/AboutPage-schema uit V2. |

---

## 📋 Marketing (geen dev-blokker)

### SERP-snippet `/nebosh-opleiding.html`

| Veld | Waarde |
|---|---|
| **Signaal** | Query **"nebosh igc"**: positie **5,5**, **23 impressies**, **0 clicks** — ranking oké, CTR laag. |
| **Beslissing** | Title + meta description herschrijven (A/B in GSC na wijziging). Geen URL- of redirect-wijziging. |
| **Eigenaar** | Marketing |

### Content-gap — impressies zonder clicks (content-backlog)

Queries met zichtbaarheid maar geen klikken in de 28d GSC-export. Geen technische migratie nodig; wel content/landingpagina's of interne links versterken.

| Query (GSC) | Impressies (indicatief) | Voorgestelde richting |
|---|---:|---|
| offshore vacatures zzp | hoog in top-6 | Jobs/offshore-cluster; link vanaf `/jobs.html` en `/nebosh-offshore.html` |
| hvk salaris zzp | hoog in top-6 | Blog/salaris — eventueel kruislink naar NEBOSH-prijsvergelijking (niet MVK-URL wijzigen) |
| hse opleiding | hoog in top-6 | Versterk `/nebosh-opleiding.html` + blog hub veiligheidskundige opleiding |
| nebosh igc | 23 impr, 0 clicks | Zie SERP-snippet hierboven |
| offshore werk zonder diploma | hoog in top-6 | FAQ/blog: instap offshore zonder diploma + NEBOSH-pad |
| hse zzp | hoog in top-6 | `/jobs.html` + blog HSE ZZP dagtarieven |

**Eigenaar:** Marketing · **Tracking:** vergelijk CTR/impressies in `BASELINE-METRICS.md` na 4–8 weken.

---

## ⚠️ Nog open (geen GSC-wijziging in deze ronde)

### Rotterdam student-guide — één canonical

| Optie | Route | Opmerking |
|---|---|---|
| A (plan-default) | 301 `westplein-veerhaven.html` → `lunch-landmarks/` | Directory-URL behouden; merge V2-layout in directory-post vóór redirect. |
| B | 301 `lunch-landmarks/` → `westplein-veerhaven.html` | Alleen als GSC toont dat `.html` al rankt (nu niet in top-pagina's). |

**Actie:** Kies A of B → verplaats regel uit `vercel.json` `_redirects_todo` naar `redirects`.

### Dev/utility-pagina's

| URL | Opties |
|---|---|
| `/create-thumbnail-auto.html`, `/resize-exact.html` | 301 naar `/`, noindex, of buiten webroot |

**Actie:** Besluit + eventueel activeren uit `_redirects_todo`.

### Root-only blogposts (404 live)

| URL | Status live |
|---|---|
| `/blog/veiligheidskundige-opleiding/` | 404 |
| `/blog/nebosh-student-guide-rotterdam-lunch-landmarks/` | 404 |
| `/privacy.html` | 404 |

**Actie:** Publiceer vóór of tegelijk met redirect-deploy (`DEPLOY-CHECKLIST.md`).

### Overige technische redirects (geen beslissing, wel uitvoering)

| Redirect | Status |
|---|---|
| `www` → non-www | ✅ In `vercel.json` `redirects` |
| `/index.html` → `/` | ✅ Actief |
| `/blog/index.html` → `/blog/` | ✅ Actief |
| `/aanmelden` → `/aanmelden.html` | ✅ Actief |
| `/safetyxacademyV2/*` → root | ✅ Actief |

---

## Samenvatting voor deploy-gate

| Item | Status |
|---|---|
| MVK/MKV redirect | ✅ Niet doen |
| `jobs.html` → `werken-bij.html` | ✅ **Do not redirect** |
| `over-ons.html` stub/meta-refresh | 🔴 Vervangen vóór volgende deploy |
| `nebosh-opleiding` SERP | 📋 Marketing |
| Content-gap top-6 queries | 📋 Marketing backlog |
| Student-guide canonical | ⚠️ Open |
| Utility-pagina's | ⚠️ Open |

Zie `BASELINE-METRICS.md` voor het volledige nulmeting-dashboard (GSC + GA4).
