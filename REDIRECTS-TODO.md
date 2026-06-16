# Redirects TODO

Deze TODO's stonden eerder in vercel.json onder `_redirects_todo`. Verplaatst naar markdown omdat Vercel strict schema-validatie toepast en custom velden de build laat falen (deploy BZnwn7QLq, 20-5-2026).

---

## ✅ Afgerond

| Source | Destination | Status |
|---|---|---|
| `/blog/nebosh-student-guide-rotterdam-westplein-veerhaven.html` | `/blog/nebosh-student-guide-rotterdam-lunch-landmarks/` | 301 — actief in `vercel.json` (16 jun 2026) |

---

## Open — dev/utility-pagina's

**Context:** Utility HTML is uit webroot verwijderd (fase 1). Redirects alleen nodig als oude URL's extern gelinkt zijn.

| Source | Destination | Status |
|---|---|---|
| `/create-thumbnail-auto.html` | `/` | Niet actief — bestand niet meer in repo |
| `/resize-exact.html` | `/` | Niet actief — bestand niet meer in repo |

**Actie:** Alleen activeren in `vercel.json` als GSC/crawl 404's op deze paden toont.
