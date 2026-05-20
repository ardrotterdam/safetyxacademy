# Deploy-checklist SafetyXAcademy

Stap-voor-stap handleiding om `vercel.json`, V2-migratie en redirects veilig uit te rollen.  
Gebaseerd op `LIVE-STATUS.md`, `AUDIT.md` en `MIGRATION-PLAN.md`.

---

## Vooraf

- [ ] Bevestig dat **V2 de productiebron** is (bestanden uit `safetyxacademyV2/` staan op root-paden in het deploy-artifact).
- [ ] Publiceer root-only migratiedoelen die nu **404** geven vóór of tegelijk met redirect-deploy:
  - `/privacy.html`
  - `/blog/veiligheidskundige-opleiding/`
  - `/blog/nebosh-student-guide-rotterdam-lunch-landmarks/`
  - V2-landingspagina's die nog niet live zijn (`/nebosh-quiz.html`, `/nebosh-ig1-oefenvragen.html`, enz.)
- [ ] Los open redirect-beslissingen op (zie `DECISIONS-NEEDED.md`) en voeg regels toe aan `vercel.json` → `redirects` zodra besloten is (student-guide canonical, utility-pagina's).

---

## 1. Lokaal testen

### Setup

```bash
npm i -g vercel
cd /pad/naar/safetyxacademy-1
vercel link          # koppel aan bestaand Vercel-project (eenmalig)
vercel dev           # lokale preview op http://localhost:3000
```

### Redirects controleren

Gebruik `curl -I` (PowerShell: `curl.exe -I`) en controleer **301** + `Location`-header:

| Test-URL | Verwachte `Location` |
|---|---|
| `http://localhost:3000/index.html` | `/` |
| `http://localhost:3000/blog/index.html` | `/blog/` |
| `http://localhost:3000/blog/index.php` | `/blog/` |
| `http://localhost:3000/aanmelden` | `/aanmelden.html` |
| `http://localhost:3000/safetyxacademyV2/nebosh-opleiding.html` | `/nebosh-opleiding.html` |
| `http://localhost:3000/blog/veiligheidskundige-opleiding/index.html` | `/blog/veiligheidskundige-opleiding/` |

### Security headers

```bash
curl.exe -I http://localhost:3000/
```

Verwacht o.a.:

- `X-Frame-Options: DENY`
- `X-Content-Type-Options: nosniff`
- `Referrer-Policy: strict-origin-when-cross-origin`

### Geen redirect-loops

- [ ] `/` → 200 (geen redirect)
- [ ] `/blog/` → 200
- [ ] `/aanmelden.html` → 200
- [ ] Doel-URL's na redirect laden content (geen keten van 2+ redirects)

---

## 2. Staging / preview deploy

```bash
vercel              # preview deployment (unieke *.vercel.app URL)
```

Of via Git: push naar feature branch → Vercel maakt automatisch een preview-URL.

### Op preview-URL verifiëren

- [ ] Homepage, opleiding, jobs, blogindex laden correct
- [ ] Alle redirects uit sectie 1 werken op preview-domein
- [ ] `www`-redirect kan alleen op productiedomein getest worden (host-match); controleer lokaal of na productie-deploy

---

## 3. Productie deploy

```bash
vercel --prod
```

Of merge naar main/production branch als CI/CD dat triggert.

### Direct na deploy (5–10 min)

- [ ] Vercel-dashboard: deployment **Ready**, geen build errors
- [ ] `https://safetyxacademy.nl/` laadt V2-homepage (title: *NEBOSH Opleiding Nederland | SafetyX Academy Rotterdam*)
- [ ] Geen onverwachte 404's op footerlinks (privacy, over ons, aanmelden)

---

## 4. Handmatige URL-verificatie (productie)

Voer uit met `curl.exe -I https://safetyxacademy.nl/...` of browser DevTools → Network.

### Redirects (301)

| URL | Verwacht |
|---|---|
| `https://www.safetyxacademy.nl/` | 301 → `https://safetyxacademy.nl/` |
| `https://safetyxacademy.nl/index.html` | 301 → `/` |
| `https://safetyxacademy.nl/blog/index.html` | 301 → `/blog/` |
| `https://safetyxacademy.nl/aanmelden` | 301 → `/aanmelden.html` |
| `https://safetyxacademy.nl/safetyxacademyV2/index.html` | 301 → `/` |

### Canonical doelen (200 na migratie)

| URL | Verwacht |
|---|---|
| `https://safetyxacademy.nl/` | 200, V2-homepage |
| `https://safetyxacademy.nl/nebosh-opleiding.html` | 200, V2 opleiding |
| `https://safetyxacademy.nl/jobs.html` | 200, V2 HSE jobs/ZZP (niet "Werken bij") |
| `https://safetyxacademy.nl/werken-bij.html` | 200, talent-pool |
| `https://safetyxacademy.nl/over-ons.html` | 200, echte V2-content (geen meta-refresh stub) |
| `https://safetyxacademy.nl/aanmelden.html` | 200, V2 wachtlijst |
| `https://safetyxacademy.nl/blog/` | 200, V2 blogindex |
| `https://safetyxacademy.nl/privacy.html` | 200 (was 404 vóór migratie) |
| `https://safetyxacademy.nl/blog/veiligheidskundige-opleiding/` | 200 (was 404) |
| `https://safetyxacademy.nl/nebosh-quiz.html` | 200 (indien gedeployed) |

### Blogartikelen (V2)

| URL | Verwacht |
|---|---|
| `/blog/wat-is-nebosh-igc.html` | 200 |
| `/blog/nebosh-vs-mkv.html` | 200 |
| `/blog/hse-zzp-dagtarieven-rotterdam-antwerpen.html` | 200 |
| `/blog/nebosh-student-guide-rotterdam-westplein-veerhaven.html` | 200 of 301 (na TODO-beslissing) |

### Security headers (steekproef)

```bash
curl.exe -I https://safetyxacademy.nl/
```

---

## 5. Na deploy (SEO & monitoring)

- [ ] Update `sitemap.xml` en `robots.txt` naar non-www canonicals (zie `MIGRATION-PLAN.md`)
- [ ] Verwijder `bedankt.html` / `bedankt-jobs.html` uit sitemap
- [ ] Google Search Console: URL-inspectie op `/`, `/nebosh-opleiding.html`, `/blog/`
- [ ] Controleer interne links (footer, nav, blogkaarten) — geen 404's
- [ ] Monitor 404-logging in Vercel Analytics gedurende 1–2 weken

---

## Rollback

Bij problemen:

1. Vercel-dashboard → **Deployments** → vorige stabiele deployment → **Promote to Production**
2. Of revert commit met `vercel.json` en `vercel --prod`

Documenteer welke TODO-redirects actief waren, zodat rollback geen verborgen ketens achterlaat.
