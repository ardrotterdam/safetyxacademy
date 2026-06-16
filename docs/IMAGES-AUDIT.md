# Images audit — SafetyXAcademy

**Laatst bijgewerkt:** 16 juni 2026  
**Doel:** overzicht welke afbeeldingen custom gegenereerd moeten worden voor traffic/CTR, en waar ze in de site horen.

## Waarom images matter voor traffic

| Effect | Impact |
|---|---|
| **Blogkaart / social share (OG)** | Hogere CTR vanuit Google Discover, LinkedIn, WhatsApp — mensen klikken op beeld + titel |
| **Dwell time** | Goede visuals houden lezers langer op pagina (indirect SEO-signaal) |
| **E-E-A-T** | Realistische HSE/Rotterdam-beelden ogen professioneler dan generieke stock |
| **Rich results** | `og:image` + Article schema met unieke afbeelding = betere previews |

Images vervangen **geen** goede titel/keyword-match, maar ze versterken clicks en shares — vooral op mobiel (68% van jullie GSC-clicks).

**Technische eisen (alle blog hero’s):**
- Formaat: **WebP** (fallback niet nodig; site is modern)
- Hero / OG: **1200 × 675 px** (16:9) of **1731 × 909** zoals arbowet-post
- Inline artikel: min. **1200 px breed**, consistent 16:9
- Alt-tekst: beschrijvend + keyword waar natuurlijk (geen stuffing)
- Bestandsnaam: kebab-case, beschrijvend (zie tabel)

---

## Prioriteit 1 — NEBOSH IGC complete gids 2026

Artikel: `/blog/nebosh-igc-complete-gids-2026/`  
HTML: `blog/nebosh-igc-complete-gids-2026/index.html`  
Blogkaart: `blog/index.html`

> **Status nu:** elke slot heeft een **tijdelijke kopie** van een bestaande site-afbeelding (zelfde bestandsnaam als target). Vervang 1-op-1 wanneer je custom visuals hebt — geen HTML-wijziging nodig behalve `width`/`height` als aspect ratio afwijkt.

| ID | Bestand (target) | Waar gebruikt | Huidige placeholder | Generatie-prompt (richting) | Prioriteit |
|:---:|---|---|---|---|---|
| **01** | `images/blog/nebosh-igc-gids-2026-hero-rotterdam-klaslokaal.webp` | Hero, OG/Twitter, blogkaart, Article schema | Kopie klaslokaal-foto | Photorealistic HSE training classroom Rotterdam Veerhaven, small group max 10, instructor with yellow safety helmet teaching NEBOSH, modern dark navy brand tone, orange accent #FF6600, cinematic light, no logos | 🔴 Hoog |
| **02** | `images/blog/nebosh-igc-gids-2026-ig2-haven-risk-assessment.webp` | Sectie IG1 & IG2 | Kopie IG2 haven-foto | HSE professional conducting risk assessment at Rotterdam port container terminal, clipboard tablet PPE orange hi-vis, overcast Dutch harbour, professional documentary style | 🔴 Hoog |
| **03** | `images/blog/nebosh-igc-gids-2026-blended-learning-online-klas.webp` | Sectie doorlooptijd (na kosten-tabel) | Kopie studenten groepsfoto | Split scene blended learning: laptop with online HSE module left, classroom Rotterdam right, same student journey, modern professional | 🟡 Middel |
| **04** | `images/blog/nebosh-igc-gids-2026-examen-open-book-engels.webp` | Sectie examen Engels/open book | Kopie industriële HSE-foto | Close-up open-book exam setup: NEBOSH study book English text, laptop online exam, highlighter notes, calm focused atmosphere, desk with helmet nearby | 🟡 Middel |
| **05** | `images/blog/nebosh-igc-gids-2026-carriere-benelux-haven.webp` | Sectie carrière / voor wie | Kopie ZZP haven-foto | HSE career path Benelux ports: professional overlooking Rotterdam and Antwerp harbour skyline, helmet euro symbol subtle, international career mood | 🟡 Middel |

### HTML-slots in artikel (volgorde)

1. **Hero** — direct onder header (`blog-featured-image`)
2. **IG2** — na bulletlijst IG1/IG2
3. **Blended learning** — na kosten-tabel, vóór doorlooptijd
4. **Examen** — na bulletlijst examen, vóór “Voor wie”
5. **Carrière** — na “Waar NEBOSH IGC volgen”, vóór FAQ

### Na genereren — checklist

- [ ] WebP geëxporteerd, gecomprimeerd (streef &lt; 250 KB hero, &lt; 180 KB inline)
- [ ] Bestand op exact pad gezet (overschrijf placeholder)
- [ ] Alt-tekst in HTML gecontroleerd
- [ ] `width` en `height` in HTML kloppen met echt bestand (CLS voorkomen)
- [ ] GSC URL inspectie + cache refresh na deploy
- [ ] LinkedIn post met nieuwe hero voor social traffic

---

## Prioriteit 2 — Volgende blogartikelen (backlog)

Voor geplande traffic-posts; nog **geen** placeholders in repo.

| Gepland artikel | Voorgestelde hero-bestandsnaam | Beeldidee |
|---|---|---|
| Offshore vacatures ZZP 2026 | `images/blog/offshore-zzp-vacatures-hse-2026-hero.webp` | HSE contractor on offshore platform, North Sea mood, PPE |
| HVK/MVK salaris ZZP 2026 | `images/blog/hvk-mvk-salaris-zzp-2026-hero.webp` | Calculator + helmet + euro, Nederlandse industrie |
| Offshore werken zonder diploma | `images/blog/offshore-instap-zonder-diploma-2026-hero.webp` | Young worker offshore stairs, training path narrative |

---

## Site-breed — bestaande images OK

Deze pagina’s hebben al dedicated blog images; alleen vervangen als kwaliteit onder maat is:

| Pagina | Bestand |
|---|---|
| Arbowet 2026 | `images/blog/arbowet-wijziging-2026-raadpleging-werknemers.webp` (+ 2 inline) |
| Geopolitiek HSE | `images/blog/safetyx-academy-hse-geopolitical-risk-rotterdam-port.webp` |
| HSE ZZP dagtarieven | `images/blog/hse-zzp-dagtarieven-haven-rotterdam-antwerpen.webp` |
| NEBOSH vs MVK | `images/blog/nebosh-vs-mvk-jonge-hse-professionals-haven-containerterminal.webp` |
| Wat is NEBOSH IGC | `images/blog/nebosh-igc-opleiding-veiligheidskundigen-hse-internationale-industrie.webp` |

---

## Stijlrichtlijnen (consistent merk)

- **Setting:** Rotterdam haven, Veerhaven, industrie, offshore — geen generiek kantoor
- **PPE:** helm, hi-vis, veiligheidsbril waar passend
- **Kleuren:** donker navy `#0A0F1C`, accent orange `#FF6600`, geen felle AI-neon
- **Mensen:** divers, professioneel, geen stock-lachbollen
- **Geen:** verkeerde vlaggen, fake NEBOSH-logo’s, onleesbare tekst in beeld

Gerelateerd: [STATUS-JUNI-2026.md](../STATUS-JUNI-2026.md)
