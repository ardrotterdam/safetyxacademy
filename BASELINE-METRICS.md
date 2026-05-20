# Baseline-metrics — nulmeting vóór migratie-impact

Meetperiode: **28 dagen** (eindigend ca. 20 mei 2026)  
Domein: `https://safetyxacademy.nl` (non-www, primair in GSC)  
Doel: ijkpunt om post-migratie (redirects, sitemap, deploy V2-root) effect te meten.

Vergelijk na **4 en 8 weken** dezelfde KPI's. Wijzigingen in GSC lopen typisch 2–4 weken achter op deploy.

---

## Google Search Console (28 dagen)

### Sitewide

| Metric | Waarde |
|---|---:|
| Clicks | 47 |
| Impressies | 1 012 |
| CTR | 4,64% |
| Gemiddelde positie | 12,16 |

### Top-pagina's (clicks)

| Pagina | Clicks | Impressies | Gem. pos. | Opmerking |
|---|---:|---:|---:|---|
| `/` (homepage) | 17 | — | — | #1 traffic-pagina |
| `/jobs.html` | 12 | 331 | 16 | #2 traffic-pagina — **niet redirecten** |
| `/blog/nebosh-vs-mkv.html` | 5 | 113 | 5 | Sterke long-tail; URL behouden |
| Overige pagina's | 13 | — | — | Samen resterend verkeer |

### Top-queries (clicks)

| Query | Clicks | Gem. pos. | Opmerking |
|---|---:|---:|---|
| nebosh | 3 | 10 | Belangrijkste branded/commercial query |
| Overige | 44 | — | Long-tail en jobs/HSE-varianten |

### Apparaat-split (clicks, GSC)

| Apparaat | Clicks | Aandeel |
|---|---:|---:|
| Mobiel | 32 | 68% |
| Desktop | 15 | 32% |
| **Totaal** | **47** | 100% |

### Pagina's met zwakke CTR (impressies, geen clicks)

| Pagina / signaal | Impressies | Clicks | Gem. pos. | Actie |
|---|---:|---:|---:|---|
| `/over-ons.html` | 31 | 0 | 30,7 | ✅ Content vervangen 20 mei 2026 — meet +4/+8 weken |
| `/nebosh-opleiding.html` (query *nebosh igc*) | 23 | 0 | 5,5 | 📋 Marketing: title/description |

### Content-gap — queries met impressies, geen clicks

Backlog marketing (geen URL-wijziging in baseline):

1. offshore vacatures zzp  
2. hvk salaris zzp  
3. hse opleiding  
4. nebosh igc  
5. offshore werk zonder diploma  
6. hse zzp  

---

## Google Analytics 4 (28 dagen)

| Metric | Waarde |
|---|---:|
| Users | 106 |
| Organic Google (users/sessies) | 45 |
| Gem. engagement time | 79 s |
| Events | 767 |

*Noteer property-ID en exacte segmentdefinitie in GA4 bij herhaling van deze meting.*

---

## Post-migratie KPI's om te volgen

| KPI | Baseline | Doel na migratie (richting) |
|---|---:|---|
| GSC clicks (28d) | 47 | ≥ baseline; geen dip >20% na redirects |
| GSC impressies | 1 012 | Stabiel of omhoog |
| Gem. positie | 12,16 | Niet verslechteren op top-10 URL's |
| CTR sitewide | 4,64% | Omhoog na snippet-fix opleiding |
| `/jobs.html` clicks | 12 | Behouden (geen redirect naar werken-bij) |
| `/` clicks | 17 | Behouden |
| `/over-ons.html` clicks | 0 | >0 na stub-fix |
| GA4 organic users | 45 | ≥ baseline |
| 404's in GSC / crawl | — | Geen nieuwe 404 op sitemap-URL's |

---

## Wijzigingsdatums

| Wijziging | Datum | Meetnotitie |
|---|---|---|
| `/over-ons.html` content-vervanging | 2026-05-20 | Baseline voor vergelijking: **31 impr, 0 clicks, pos 30,7** (GSC 22 apr — 19 mei 2026). Eerste meetmoment: **+4 weken** (ca. 17 jun 2026). Tweede meetmoment: **+8 weken** (ca. 15 jul 2026). |

---

## Meetmomenten

| Datum | Actie |
|---|---|
| 20 mei 2026 | ✅ Nulmeting vastgelegd (dit document) |
| 20 mei 2026 | ✅ `/over-ons.html` stub → V2-content in root (zie Wijzigingsdatums) |
| ca. 17 jun 2026 (+4w) | GSC + GA4 export; vergelijk `/over-ons.html` met baseline |
| ca. 15 jul 2026 (+8w) | Zelfde; evalueer content-backlog CTR |

Gerelateerd: `DECISIONS-NEEDED.md`, `MIGRATION-PLAN.md`, `DEPLOY-CHECKLIST.md`.
