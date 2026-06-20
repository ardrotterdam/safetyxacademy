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
| **01** | `images/blog/nebosh-igc-gids-2026-hero-rotterdam-klaslokaal.webp` | Hero, OG/Twitter, blogkaart, Article schema | Kopie klaslokaal-foto | Zie **Slot 01 prompts** hieronder | 🔴 Hoog |
| **02** | `images/blog/nebosh-igc-gids-2026-ig2-haven-risk-assessment.webp` | Sectie IG1 & IG2 | Kopie IG2 haven-foto | HSE professional conducting risk assessment at Rotterdam port container terminal, clipboard tablet PPE orange hi-vis, overcast Dutch harbour, professional documentary style | 🔴 Hoog |
| **03** | `images/blog/nebosh-igc-gids-2026-blended-learning-online-klas.webp` | Sectie doorlooptijd (na kosten-tabel) | Kopie studenten groepsfoto | Split scene blended learning: laptop with online HSE module left, classroom Rotterdam right, same student journey, modern professional | 🟡 Middel |
| **04** | `images/blog/nebosh-igc-gids-2026-examen-open-book-engels.webp` | Sectie examen Engels/open book | Kopie industriële HSE-foto | Close-up open-book exam setup: NEBOSH study book English text, laptop online exam, highlighter notes, calm focused atmosphere, desk with helmet nearby | 🟡 Middel |
| **05** | `images/blog/nebosh-igc-gids-2026-carriere-benelux-haven.webp` | Sectie carrière / voor wie | Kopie ZZP haven-foto | HSE career path Benelux ports: professional overlooking Rotterdam and Antwerp harbour skyline, helmet euro symbol subtle, international career mood | 🟡 Middel |

### Slot 01 — hero prompts (kant-en-klaar)

**Output:** `images/blog/nebosh-igc-gids-2026-hero-rotterdam-klaslokaal.webp`  
**Formaat:** 16:9 landscape · **1731 × 909 px** (of 1920 × 1080 → crop) · WebP · streef &lt; 250 KB  
**Alt-tekst (behouden):** *NEBOSH IGC complete gids 2026: opleiding en klaslokaal in Rotterdam Veerhaven bij SafetyXAcademy*

#### Scene (wat moet in beeld)

- Modern **training room** met **5–8 volwassen studenten** (mix NL/BE, 25–45 jr), business casual + **helm op tafel**
- **Instructeur** voor whiteboard/screen met eenvoudig **HSE-diagram** (risk assessment flow, geen leesbare merknamen)
- Door raam subtiel **haven/water/industrie** (Rotterdam Veerhaven sfeer, geen Erasmusbrug als hero)
- **Kleuren:** donker navy omgeving `#0A0F1C`, warm tafellamp-licht, **oranje accent** `#FF6600` (hesje, marker, scherm-accent)
- **Stijl:** photorealistic editorial, documentary — geen stock-lach, geen sci-fi

#### Negative prompt (alle tools)

```
cartoon, illustration, 3d render, oversaturated, neon, fake smile, text overlay, watermark, logo, NEBOSH logo, readable brand names, American flag, wrong PPE, construction site chaos, crowd, blurry faces, low resolution, fisheye, drone only sky, empty classroom
```

#### Midjourney v6 (aanbevolen)

```
/imagine prompt: photorealistic editorial photo, NEBOSH HSE training classroom Rotterdam Netherlands, small professional group 6 adult students and one instructor, safety helmets on table, orange hi-vis accent #FF6600, dark navy walls #0A0F1C, warm window light from harbour side, whiteboard with simple risk assessment diagram no readable text, modern training room Veerhaven Rotterdam atmosphere, cinematic natural light, shallow depth of field, 35mm lens, professional corporate documentary style --ar 16:9 --style raw --v 6.1
```

Variant (meer haven door raam):

```
/imagine prompt: photorealistic HSE training session Rotterdam port district, instructor teaching safety management to small group max 8, orange safety vest accent, dark moody navy interior, large windows with subtle container cranes and water in background, helmets clipboards laptops, editorial photography, realistic Dutch professional setting --ar 16:9 --style raw --v 6.1
```

#### DALL·E 3 (ChatGPT)

```
Photorealistic wide-angle editorial photograph of a professional HSE safety training classroom in Rotterdam, Netherlands. Six diverse adult students (25–45) listen to an instructor near a whiteboard with a simple unreadable risk-assessment diagram. Safety helmets and clipboards on the table. Dark navy walls, warm natural window light, subtle harbour and industrial view outside. One student wears an orange hi-vis vest (safety orange accent). Documentary corporate style, not stock-photo cheesy. No logos, no readable text, no watermarks. Landscape 16:9.
```

#### Flux / SDXL (korte prompt)

```
photorealistic HSE training classroom Rotterdam, small group professional students, instructor whiteboard, orange hi-vis accent, dark navy room, harbour light through window, helmets on table, editorial documentary 35mm, 16:9
```

#### Na genereren

1. Crop **16:9**, export **WebP** (Squoosh of `cwebp -q 82`)
2. Overschrijf: `images/blog/nebosh-igc-gids-2026-hero-rotterdam-klaslokaal.webp`
3. Check preview: [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/) op artikel-URL (OG-image)
4. `git add` + push → Vercel deploy

---

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
| Veiligheidskundige salaris 2026 | `images/blog/veiligheidskundige-salaris-2026-hse-rotterdam.webp` (+ inline: `mvk-hvk-hse-manager-salaris-veiligheidskundige-2026.webp`, `zzp-veiligheidskundige-uurtarieven-dagtarieven-2026.webp`) |
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
