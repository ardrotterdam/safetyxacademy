# Redirects TODO

Deze TODO's stonden eerder in vercel.json onder `_redirects_todo`. Verplaatst naar markdown omdat Vercel strict schema-validatie toepast en custom velden de build laat falen (deploy BZnwn7QLq, 20-5-2026).

---

## Rotterdam student-guide — één canonical

**Reden niet geactiveerd:** Kies één canonical voor de twee Rotterdam student-guide varianten (MIGRATION-PLAN stap 4). Optie A (aanbevolen in plan): directory-URL behouden, V2 `.html` redirecten.

| Source | Destination | Status |
|---|---|---|
| `/blog/nebosh-student-guide-rotterdam-westplein-veerhaven.html` | `/blog/nebosh-student-guide-rotterdam-lunch-landmarks/` | 301 |

**Alternatief:** Optie B — redirect `lunch-landmarks/` naar `westplein-veerhaven.html` als die URL al rankt.

---

## Dev/utility-pagina's

**Reden niet geactiveerd:** Dev/utility-pagina's uit V2 — blokkeren, noindex of verplaatsen buiten webroot.

| Source | Destination | Status |
|---|---|---|
| `/create-thumbnail-auto.html` | `/` | 301 |
| `/resize-exact.html` | `/` | 301 |
