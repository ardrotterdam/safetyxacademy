# Status SafetyXAcademy — juni 2026

**Datum:** 16 juni 2026  
**Live:** [safetyxacademy.nl](https://safetyxacademy.nl) (Vercel, non-www)  
**Baseline:** [BASELINE-METRICS.md](BASELINE-METRICS.md) (GSC/GA4, 28 dagen t/m ~20 mei)  
**Vorige audit:** [AUDIT.md](AUDIT.md) (20 mei, pre-consolidatie)

---

## Samenvatting

De site draait als **één geconsolideerde V2-root**. Map `safetyxacademyV2/` is verwijderd (20 mei). Redirects, 410 Gone en kern-URL's werken live. Focus verschuift van migratie naar **opschoning + SEO/content**.

| Domein | Status |
|---|---|
| Technische consolidatie | ~90% — fase 4 (templates) open |
| Live site | ✅ Stabiel |
| SEO-baseline meting | ⏳ Eerste +4w check **17 jun 2026** |

---

## Consolidatievoortgang

| Fase | Status |
|:---:|---|
| 0 Docs | ✅ |
| 1 Utility, sitemap merge | ✅ |
| 2 Assets → `/images/` | ✅ |
| 3a V2 → root | ✅ |
| 3b V2-map weg | ✅ |
| 4 Privacy + lunch-landmarks V2-layout | ⚠️ Open |
| 5 Deploy | ✅ |
| 6 `safetyxacademyV2/*` redirects uit `vercel.json` | ✅ 16 jun 2026 |

---

## Live-check (16 jun 2026)

| URL | Resultaat |
|---|---|
| `/`, `/privacy.html`, `/blog/arbowet-wijziging-1-juli-2026/` | 200 |
| `/blog/nebosh-student-guide-rotterdam-lunch-landmarks/` | 200 |
| `/blog/veiligheidskundige-opleiding/` | 410 Gone |
| `/blog/...westplein-veerhaven.html` | 301 → lunch-landmarks |
| `/index.html` | 301 → `/` |
| `/safetyxacademy-og-image.png` | 200 |

---

## GSC-baseline (referentie)

| Metric | Waarde |
|---|---:|
| Clicks (28d) | 47 |
| Impressies | 1.012 |
| CTR | 4,64% |
| Gem. positie | 12,16 |

**Top-pagina's:** `/` (17 clicks), `/jobs.html` (12), `/blog/nebosh-vs-mkv.html` (5).  
**Nooit redirecten:** `/jobs.html`, `/blog/nebosh-vs-mkv.html`.

---

## Sinds baseline (mei–jun)

- Consolidatie + redirects (20 mei)
- `/over-ons.html` stub vervangen door V2-content
- Blog: geopolitieke-onrust (20 mei), arbowet 1 juli 2026 (11 jun)
- HSE ZZP: hero + interne links (11 jun)
- **16 jun:** sitemap, interne links, PHP-stubs, fase 6 V2-redirects verwijderd

---

## Open — dev

1. **Fase 4:** `privacy.html` en `blog/.../lunch-landmarks/` naar V2-template (`style-v3.css`)
2. ~~**Fase 6:** `safetyxacademyV2/*` redirects uit `vercel.json`~~ ✅
3. **`header.css` / `header.js`:** behouden tot fase 4 klaar (3 pagina's)
4. Docs bijwerken: `LIVE-STATUS.md`, `DECISIONS-NEEDED.md` (nog mei 2026)

---

## Open — marketing

1. GSC-export +4w (17 jun): `/over-ons.html`, sitewide clicks/404's
2. SERP-snippet `/nebosh-opleiding.html` (*nebosh igc*: pos. 5,5, 0 clicks)
3. Content-gaps: offshore ZZP, hvk salaris, hse opleiding, hse zzp
4. E-E-A-T: instructeurbio's, bronvermelding salaris/dagtarieven, testimonial-disclaimer

---

## Meetmomenten

| Datum | Actie |
|---|---|
| 20 mei 2026 | Baseline + consolidatie |
| **17 jun 2026** | GSC +4w na over-ons-fix |
| 15 jul 2026 | GSC +8w |

Gerelateerd: [PLAN-CONSOLIDATIE.md](PLAN-CONSOLIDATIE.md), [DECISIONS-NEEDED.md](DECISIONS-NEEDED.md), [DEPLOY-CHECKLIST.md](DEPLOY-CHECKLIST.md)
