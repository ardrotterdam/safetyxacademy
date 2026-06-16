# SafetyXAcademy

Statische site voor [safetyxacademy.nl](https://safetyxacademy.nl): NEBOSH IGC-opleiding Rotterdam, HSE jobs/ZZP en blog.

## Productieversie

De live site draait op de **V2**-template (`safetyxacademyV2/` in de repo, gepubliceerd op root-URL's). Zie `LIVE-STATUS.md` en `PLAN-CONSOLIDATIE.md` voor de consolidatie naar één root-structuur.

- **Hosting:** Vercel (`vercel.json`, redirects non-www)
- **Styles:** `css/style-v3.css`, `js/main-v3.js`
- **Design:** `safetyxacademyV2/docs/SAFETYXAC-BLUEPRINT.md`

## Repo-structuur (kern)

| Pad | Doel |
|---|---|
| `safetyxacademyV2/` | Huidige productie-HTML/CSS/JS (tijdelijk tot fase 3b) |
| `blog/` | Root-only directory-blogposts (o.a. lunch-landmarks) |
| `vercel.json` | Redirects, security headers |
| `PLAN-CONSOLIDATIE.md` | Inventaris en uitvoeringsfasen |
| `BASELINE-METRICS.md` | GSC/GA4 nulmeting |
| `DECISIONS-NEEDED.md` | SEO/deploy-beslissingen |

## SEO & migratie (referentie)

- **GSC-baseline:** `BASELINE-METRICS.md` (28 dagen, mei 2026)
- **Actuele status:** `STATUS-JUNI-2026.md`
- **Niet redirecten:** `/jobs.html`, `/blog/nebosh-vs-mkv.html`
- **Interne linking:** De vroegere `README.MD` documenteerde een SEO internal-linking update (jobs/ZZP, sitemap, index-anchors). Die instructies zijn historisch; live jobs-content = V2 `jobs.html`.

## Lokaal / deploy

```bash
# Statische preview (voorbeeld)
npx serve safetyxacademyV2
# of na consolidatie fase 3a: npx serve .
```

Checklist vóór deploy: `DEPLOY-CHECKLIST.md`.

## Contact

info@safetyxacademy.nl
