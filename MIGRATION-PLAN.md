# Migratieplan root vs `safetyxacademyV2`

Doel: één productieversie overhouden met consistente canonicals, redirects en sitemap. Uitgangspunt op basis van `AUDIT.md`: `safetyxacademyV2` heeft meestal de sterkere SEO-basis; root bevat enkele unieke blogartikelen en oudere landingspagina-content die selectief gemerged moet worden.

Aanbevolen canonical-standaard: `https://safetyxacademy.nl/...` zonder `www`. Gebruik `.html` voor bestaande statische hoofdpagina's en trailing slash voor directory-blogposts die nu al zo bestaan.

## Hoofdpagina's en commerciële templates

| Template / doel-URL | Root-versie | V2-versie | Betere SEO-basis | Unieke content root | Unieke content V2 | Aanbevolen consolidatie-strategie |
|---|---|---|---|---|---|---|
| Homepage `/` | `index.html`: goede commerciële NEBOSH/MKV-copy, maar oude startdatum in metadata, twee H1's en minder schema. | `safetyxacademyV2/index.html`: sterke metadata, één H1, Organization/Course/LocalBusiness schema, betere semantiek en navigatie. | V2 | Prijsvergelijking NEBOSH vs MKV, extra FAQ/contactsectie, sommige conversiegerichte claims. | Heldere propositie "Studeer lokaal. Werk wereldwijd", LocalBusiness schema, sectorblokken, betere trust/local content. | Zet V2 homepage op root `/`. Merge alleen bruikbare root-copy over prijsvergelijking/FAQ na factcheck. Verwijder dubbele H1-rootvariant. Canonical blijft `https://safetyxacademy.nl/`. |
| NEBOSH opleiding `/nebosh-opleiding.html` | Geen echte root-equivalent; root-homepage bevat opleidingsecties. | `safetyxacademyV2/nebosh-opleiding.html`: sterke hoofdlandingspagina met Course, FAQPage en BreadcrumbList schema. | V2 | Root-homepage bevat extra commerciële prijsvergelijking en trainingslocatie-copy. | Volledige opleidingpagina: doelgroep, programma, investering, vergelijking, FAQ, CTA. | Publiceer V2 als canonical. Merge root-prijsvergelijking alleen als de claims actueel en onderbouwd zijn. Voeg Twitter tags toe. |
| Aanmelden `/aanmelden.html` | `aanmelden.html`: oudere interessepagina, canonical naar `https://www.safetyxacademy.nl/aanmelden`, start januari 2026. | `safetyxacademyV2/aanmelden.html`: wachtlijst 2026, canonical naar `/aanmelden.html`, OG en schema. | V2 | Mogelijk bestaande formulier-copy en oude footerlinks. | Betere NEBOSH/Rotterdam-positionering, actuelere wachtlijsttaal, schema. | Publiceer V2 op `/aanmelden.html`. 301 van `/aanmelden` naar `/aanmelden.html` of kies juist extensionless en pas alle canonicals aan. Verwijder januari-2026 root-copy. |
| Jobs & ZZP `/jobs.html` | `jobs.html`: inhoudelijk "Werken bij", niet Jobs/ZZP; conflicteert met sitemap. | `safetyxacademyV2/jobs.html`: juiste HSE jobs/ZZP-pagina met tarieven, havens, offshore en CTA's. | V2 | Root heeft talent-pool/werken-bij content, maar staat op verkeerde URL. | Volledige HSE jobs/ZZP content, WebPage schema, interne links naar opleiding. | Publiceer V2 op `/jobs.html`. Verplaats root `jobs.html`-content naar `/werken-bij.html` alleen als die nog waarde heeft. Update sitemap. |
| Werken bij `/werken-bij.html` | Root-content staat foutief op `jobs.html`. | `safetyxacademyV2/werken-bij.html`: juiste URL, title/description en OG. | V2 | Root `jobs.html` kan oudere talent-poolcopy bevatten. | Actuele talent-poolpagina met lancering september 2026. | Publiceer V2 op `/werken-bij.html`. Merge bruikbare root-talent-poolcopy. 301 eventuele oude `/jobs.html`-werken-bij intent is niet nodig als `/jobs.html` jobs wordt; linkbronnen naar werken-bij handmatig aanpassen. |
| Over ons `/over-ons.html` | ✅ **Gepubliceerd in root** (20 mei 2026): `over-ons.html` = kopie van V2; geen meta-refresh, geen `noindex`. Was: noindex-stub. | `safetyxacademyV2/over-ons.html`: bronbestand (identiek na copy). | V2 | — | Missie, visie, doelgroep, startende status, adres/KVK/LinkedIn. | **Afgerond.** URL ongewijzigd: `https://safetyxacademy.nl/over-ons.html`. Geen redirect. |
| Privacy `/privacy.html` | `privacy.html`: volledige privacyverklaring met headings, maar geen canonical/OG en oudere styling. | Geen V2-equivalent; V2 footers linken naar `privacy.html`. | Root | Juridische inhoud, cookies, rechten, contact. | Alleen links vanuit V2-layout. | Behoud root `privacy.html`, maar migreer styling/header/footer naar V2-template en voeg canonical `https://safetyxacademy.nl/privacy.html` toe. Niet noindex tenzij juridisch bewust gewenst. |
| Bedankt contact `/bedankt.html` | `bedankt.html`: noindex,follow. | `safetyxacademyV2/bedankt.html`: noindex,follow en V2-layout. | V2 | Mogelijk oud formulierbedanktpad. | Consistente V2-layout en footer. | Publiceer V2 op `/bedankt.html`. Houd `noindex,follow`. Niet opnemen in sitemap. |
| Bedankt jobs `/bedankt-jobs.html` | Geen root-equivalent. | `safetyxacademyV2/bedankt-jobs.html`: noindex,nofollow. | V2 | Geen. | Talent-pool bedankpagina. | Publiceer alleen als formulierflow dit gebruikt. Houd `noindex,nofollow`. Niet opnemen in sitemap. |

## NEBOSH- en carrière-landingspagina's

| Template / doel-URL | Root-versie | V2-versie | Betere SEO-basis | Unieke content root | Unieke content V2 | Aanbevolen consolidatie-strategie |
|---|---|---|---|---|---|---|
| NEBOSH quiz `/nebosh-quiz.html` | Geen root-equivalent. | `safetyxacademyV2/nebosh-quiz.html`: title, description, canonical, Course en Breadcrumb schema. | V2 | Geen. | Gratis oefentest, schema, quiz-funnel. | Publiceer V2 als canonical. Voeg Twitter Card tags toe. |
| IG1 oefenvragen `/nebosh-ig1-oefenvragen.html` | Geen root-equivalent. | `safetyxacademyV2/nebosh-ig1-oefenvragen.html`: sterke long-tail examenpagina met FAQ/Breadcrumb schema. | V2 | Geen. | 20 vragen, uitleg per antwoord, interne links naar quiz/opleiding/blog. | Publiceer V2 als canonical. In sitemap opnemen. |
| IG2 risk assessment `/nebosh-ig2-risk-assessment.html` | Geen root-equivalent. | `safetyxacademyV2/nebosh-ig2-risk-assessment.html`: sterke long-tail praktijkopdrachtpagina met schema. | V2 | Geen. | IG2-opdrachtstructuur, hazards, stappenplan, CTA. | Publiceer V2 als canonical. Kort meta description in. In sitemap opnemen. |
| Benelux havens `/nebosh-benelux-ports.html` | Geen root-equivalent. | `safetyxacademyV2/nebosh-benelux-ports.html`: lokale/regionale landingspagina voor Rotterdam, Antwerpen, Gent, Zeebrugge, Amsterdam, Groningen. | V2 | Geen. | Havenclusters, bereikbaarheid, Course/Breadcrumb schema. | Publiceer V2 als canonical. Overweeg later aparte subpagina's alleen bij voldoende unieke content per haven. |
| Offshore `/nebosh-offshore.html` | Geen root-equivalent. | `safetyxacademyV2/nebosh-offshore.html`: internationale HSE/offshore landingspagina met FAQ/Course/Breadcrumb schema. | V2 | Geen. | Dubai, Noorwegen, UK, offshore tarieven, FAQ. | Publiceer V2 als canonical. Factcheck jobplacement/verdienclaims en voeg bronnen toe. |

## Blog en kennisbank

| Template / doel-URL | Root-versie | V2-versie | Betere SEO-basis | Unieke content root | Unieke content V2 | Aanbevolen consolidatie-strategie |
|---|---|---|---|---|---|---|
| Blogindex `/blog/` | `blog/index.html`: heeft OG, Twitter, ItemList/Collection schema en 2026-artikelkaarten, maar oude root-template en placeholders. | `safetyxacademyV2/blog/index.html`: betere V2-layout, OG/Twitter, ItemList/Collection schema, linkt naar V2-artikelen. | V2, met root-contentmerge | Root bevat twee directory-blogposts en 2026 planning/placeholders. | V2 bevat vier actuele V2-blogartikelen en consistente navigatie. | Publiceer V2 op `/blog/`. Merge root-blogposts in de kaartlijst. Verwijder placeholders of markeer niet als indexeerbare content. Canonical `/blog/`. |
| Blogartikel: veiligheidskundige opleiding `/blog/veiligheidskundige-opleiding/` | `blog/veiligheidskundige-opleiding/index.html`: long-form gids met Article/Breadcrumb schema, OG/Twitter. | Geen V2-equivalent. | Root | Complete gids 2026, salaris, carrièrepad, FAQ, Article schema. | Geen. | Behoud als canonical directory-URL. Migreer styling/header/footer naar V2-blogtemplate zonder URL te wijzigen. Voeg auteur/instructeur en bronnen toe. |
| Blogartikel: student guide lunch/landmarks `/blog/nebosh-student-guide-rotterdam-lunch-landmarks/` | `blog/nebosh-student-guide-rotterdam-lunch-landmarks/index.html`: long-form lokale gids met Article/FAQ schema. | V2 heeft verwante maar andere URL: `blog/nebosh-student-guide-rotterdam-westplein-veerhaven.html`. | Content: beide; SEO-basis: V2-template | Root heeft bredere lunch/landmarks-content, FAQ en directory-URL. | V2 heeft compactere Westplein/Veerhaven-focus en betere V2-layout. | Kies één canonical. Aanbevolen: behoud root directory-URL als canonical als die al extern gedeeld is; merge V2-layout en V2-copy erin. 301 V2 `.html` naar directory-URL. Alternatief: als V2-URL al live rankt, 301 root naar V2 en merge root long-form content. |
| Blogartikel: wat is NEBOSH IGC `/blog/wat-is-nebosh-igc.html` | Geen root-equivalent. | `safetyxacademyV2/blog/wat-is-nebosh-igc.html`: title/description/canonical/OG, artikelcontent. | V2 | Geen. | Sterke awareness-content voor Nederlandstalige HSE'ers. | Publiceer V2 als canonical. Voeg Article schema en Twitter tags toe als die ontbreken. |
| Blogartikel: NEBOSH vs MVK `/blog/nebosh-vs-mkv.html` | Geen root-equivalent. | `safetyxacademyV2/blog/nebosh-vs-mkv.html`: title/description/canonical/OG en artikelcontent. | V2 | Geen. | Vergelijkingscontent voor commerciële zoekintentie. | Publiceer V2 als canonical. Controleer spelling in URL/content: bestand is `mkv`, title zegt `MVK`; kies één standaard, waarschijnlijk `mvk`. Overweeg 301 van verkeerd gespelde varianten. |
| Blogartikel: HSE ZZP dagtarieven `/blog/hse-zzp-dagtarieven-rotterdam-antwerpen.html` | Geen root-equivalent. | `safetyxacademyV2/blog/hse-zzp-dagtarieven-rotterdam-antwerpen.html`: title/description/canonical/OG. | V2 | Geen. | Dagtarieven, Rotterdam/Antwerpen, commerciële link naar opleiding/jobs. | Publiceer V2 als canonical. Voeg bronnen/factcheck toe voor tariefclaims. |
| Blogartikel: Westplein/Veerhaven `/blog/nebosh-student-guide-rotterdam-westplein-veerhaven.html` | Geen exact root-equivalent, maar overlapt sterk met root lunch/landmarks directorypost. | `safetyxacademyV2/blog/nebosh-student-guide-rotterdam-westplein-veerhaven.html`: V2-template en lokale focus. | V2-template, maar mogelijk duplicate met root | Geen exact, wel root lunch/landmarks. | Veerhaven/Westplein-copy en V2-layout. | Niet beide indexeerbaar houden. Merge met gekozen canonical student-guide. Gebruik 301 of canonical naar de gekozen URL. |

## Navigatie, shared layout en assets

| Template / onderdeel | Root-versie | V2-versie | Betere SEO-basis | Unieke content root | Unieke content V2 | Aanbevolen consolidatie-strategie |
|---|---|---|---|---|---|---|
| Header/navigatie include | `includes/header.html`: eenvoudige nav naar training, jobs, reviews, aanmelden. | `safetyxacademyV2/includes/header.html` en inline V2-headers: uitgebreidere NEBOSH/carrière/resources structuur. | V2 | Root heeft simpele ankerlinks naar homepage-secties. | V2 heeft dropdowns voor NEBOSH, Benelux, Offshore, Jobs, Blog, Over ons, Aanmelden. | Gebruik één V2-headercomponent/include voor alle pagina's. Behoud eventueel root-ankerlinks als footer/section-links, niet als primaire nav. |
| Footer | Root footers verschillen per pagina en zijn vaak simpeler/ouder. | V2-footer is consistent met Opleiding, Carrière, Content, Juridisch en Direct. | V2 | Root bevat soms contact/CTA-blokken. | V2 bevat KVK, LinkedIn, adres, consistente interne links. | Gebruik V2-footer overal. Voeg telefoon/openingstijden toe als beschikbaar. |
| CSS/template | Root gebruikt `css/style.css`, `css/header.css` en inline CSS. | V2 gebruikt `css/style-v3.css`, modernere layout en semantiek. | V2 | Root heeft enkele unieke componentstijlen voor long-form blogposts. | V2 heeft consistente sitebrede stijl. | Migreer root-only blogartikelen naar V2 CSS/layout. Vermijd dubbele CSS-bundels en inline page-level styles waar mogelijk. |
| JS | Root gebruikt header fetch en oudere scripts. | V2 gebruikt `js/main-v3.js` met nav/reveal/stat logic en `defer`. | V2 | Root fetch-based header include. | V2 betere ARIA states en menuinteractie. | Gebruik V2 JS sitebreed. Vermijd client-side header fetch voor kritieke navigatie als statische HTML direct kan worden gerenderd. |
| Images/video assets | Root en V2 verwijzen naar `/images/...`, maar repo-scan vond geen `images/` assets. | V2 gebruikt veel `.webp` en hero-video references. | V2 markup, assetlaag onzeker | Root heeft oudere image references. | V2 heeft betere `width`, `height`, `loading`, `fetchpriority`. | Maak asset-inventaris. Voeg ontbrekende deploy-assets toe of corrigeer paden. Test met `curl`/browser en 404-check. |
| Favicon/verification | Root bevat `favicon-svg.svg`, `googlea9eb476bc6025f6e.html`, `CNAME`. | V2 bevat eigen `favicon-svg.svg`; icons worden via absolute paden verwacht. | Root voor domeinmetadata, V2 voor pagina-heads | Google verification en CNAME. | V2 icon references. | Behoud domeinbestanden in root. Zorg dat alle faviconbestanden waarnaar verwezen wordt echt bestaan. |
| Tools/dev pages | Geen root-equivalent behalve gewone productiepagina's. | `create-thumbnail-auto.html`, `resize-exact.html` zijn utility/dev-pages. | Geen productie-SEO | Geen. | Interne thumbnailtools. | Niet publiceren of blokkeren/noindex + uit sitemap houden. Verplaats naar `tools/` buiten webroot als mogelijk. |

## Redirect- en canonical-map

| Bron-URL / bronbestand | Doel-URL | Type | Reden |
|---|---|---|---|
| `/safetyxacademyV2/` en alle V2-bestandspaden als die publiek bereikbaar zijn | Overeenkomstige root-URL | 301 | V2 is broncode/stagingmap, niet publieke URL-structuur. |
| `/index.html` | `/` | 301 of canonical | Homepage consolideren op root. |
| `https://www.safetyxacademy.nl/*` | `https://safetyxacademy.nl/*` | 301 | Non-www canonical-standaard afdwingen. |
| `/aanmelden` | `/aanmelden.html` | 301, tenzij extensionless wordt gekozen | Root en V2 gebruiken nu verschillende aanmeld-canonicals. |
| `/blog/index.html` | `/blog/` | 301 | Blogindex canonical consolideren. |
| `/over-ons.html` oude redirectstub | `/over-ons.html` V2-content | ✅ Vervangen (20 mei 2026) | In-place copy root; geen 301. |
| `/jobs.html` oude werken-bij-content | `/jobs.html` V2 jobs-content | Vervangen, geen redirect nodig | Zelfde doel-URL; publiceer juiste intent. |
| `/blog/nebosh-student-guide-rotterdam-westplein-veerhaven.html` | Gekozen canonical student-guide URL | 301 of canonical | Voorkomt overlap met `/blog/nebosh-student-guide-rotterdam-lunch-landmarks/`. |
| Eventuele `/blog/nebosh-vs-mkv.html` of andere typo-varianten | `/blog/nebosh-vs-mvk.html` als URL wordt hernoemd | 301 | Consistentie tussen MVK-keyword en URL. Alleen doen als URL-renaming gewenst is. |
| `/bedankt.html`, `/bedankt-jobs.html` | Zichzelf | `noindex`, geen sitemap | Conversiebedankpagina's niet indexeren. |

## Sitemap na consolidatie

| URL | Broncontent | Opnemen in sitemap? | Opmerking |
|---|---|---:|---|
| `/` | V2 homepage + selectieve root-copy | Ja | Priority hoog. |
| `/nebosh-opleiding.html` | V2 | Ja | Hoofdproduct. |
| `/aanmelden.html` | V2 | Ja/optioneel | Commerciële pagina mag indexeerbaar zijn; geen bedankpagina. |
| `/jobs.html` | V2 | Ja | Belangrijke commerciële/carrièrepagina. |
| `/werken-bij.html` | V2 + root talent-poolcopy | Ja/optioneel | Alleen als talent-pool publiek gewenst is. |
| `/over-ons.html` | V2 (root gepubliceerd 20 mei 2026) | Ja | E-E-A-T. Live sitemap bevat URL al. |
| `/privacy.html` | Root gemigreerd naar V2-layout | Ja/optioneel | Lage priority. |
| `/nebosh-quiz.html` | V2 | Ja | Lead magnet. |
| `/nebosh-ig1-oefenvragen.html` | V2 | Ja | Long-tail examen. |
| `/nebosh-ig2-risk-assessment.html` | V2 | Ja | Long-tail examen. |
| `/nebosh-benelux-ports.html` | V2 | Ja | Regionale SEO. |
| `/nebosh-offshore.html` | V2 | Ja | Internationale SEO. |
| `/blog/` | V2 + root article cards | Ja | Bloghub. |
| `/blog/veiligheidskundige-opleiding/` | Root article in V2-layout | Ja | Root-only long-form artikel. |
| Gekozen student-guide canonical | Root/V2 merge | Ja | Kies één URL, niet beide. |
| `/blog/wat-is-nebosh-igc.html` | V2 | Ja | Awareness. |
| `/blog/nebosh-vs-mvk.html` of huidige `/blog/nebosh-vs-mkv.html` | V2 | Ja | Kies spelling en redirect alternatief. |
| `/blog/hse-zzp-dagtarieven-rotterdam-antwerpen.html` | V2 | Ja | Commerciële long-tail. |
| `/bedankt.html`, `/bedankt-jobs.html` | V2 | Nee | Noindex. |
| `create-thumbnail-auto.html`, `resize-exact.html` | V2 tools | Nee | Niet publiceren. |

## Sitemap-consolidatie (open)

| Bron | `over-ons.html` | Opmerking |
|---|---|---|
| **Live** `https://safetyxacademy.nl/sitemap.xml` (gecheckt 20 mei 2026) | ✅ Aanwezig, priority 0.8 | Komt overeen met V2-structuur (non-www, V2-hoofdpagina's). |
| `safetyxacademyV2/sitemap.xml` | ✅ Aanwezig | Deploy-bron voor live sitemap (vermoedelijk). |
| Root `sitemap.xml` | ❌ Ontbreekt | Oude root-sitemap (www, ankers, geen `over-ons`) — **niet** wat live wordt geserveerd. |

**Beslissing nog open (aparte taak):** één root `sitemap.xml` in repo die live spiegelt, of expliciet documenteren dat alleen `safetyxacademyV2/sitemap.xml` wordt gedeployed. Geen wijziging aan live sitemap nodig voor over-ons (URL stond er al in).

## Uitvoeringsvolgorde

| Stap | Actie | Eigenaar | Resultaat |
|---:|---|---|---|
| 1 | Kies definitieve URL-standaard: non-www, `.html` voor statische pagina's, `/blog/` voor index en bestaande directoryposts. | Dev + marketing | Eén canonical policy. |
| 2 | Kopieer/publiceer V2-hoofdpagina's naar rootpaden. | Dev | Root wordt productieversie. |
| 3 | Migreer root-only blogartikelen naar V2-layout zonder URL-wijziging. | Dev + marketing | Behoud contentwaarde zonder templatefragmentatie. |
| 4 | Kies één canonical voor de twee Rotterdam student-guide varianten en merge content. | Marketing + dev | Geen duplicate local content. |
| 5 | Maak 301-regels voor `www`, `/index.html`, `/blog/index.html`, `/aanmelden` en eventuele V2-public paths. | Dev | Link equity geconsolideerd. |
| 6 | Genereer nieuwe root `sitemap.xml` met alleen indexeerbare canonical URLs. | Dev | Schone crawl hints. |
| 7 | Verwijder bedankpagina's en toolpagina's uit sitemap; zet/handhaaf `noindex`. | Dev | Geen dunne/utility content in index. |
| 8 | Harmoniseer head-tags sitebreed: title, description, canonical, OG, Twitter, robots. | Dev | Consistente previews en indexatie. |
| 9 | Controleer alle interne links na migratie met crawler of `curl`/build-output. | Dev | Geen 404's of redirect chains. |
| 10 | Factcheck en merge commerciële claims, testimonials en tariefcontent. | Marketing | Sterkere E-E-A-T en minder claimrisico. |
