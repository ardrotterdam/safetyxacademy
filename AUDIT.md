# SEO & Vindbaarheids-audit SafetyXAcademy

Auditdatum: 20 mei 2026  
Scope: statische HTML/CSS/JS-codebase in deze workspace, inclusief root-bestanden en `safetyxacademyV2`.

Aanvullende werkwijze voor vervolgchecks: als Cursor in agent-mode met terminal-toegang draait, draai waar nuttig `npm run build` en bekijk de output, of gebruik `curl` om de gerenderde HTML van key-pages te inspecteren.

## 1. Waar gaat de site over?

SafetyXAcademy is een Rotterdamse, Nederlandstalige opleider rond de NEBOSH International General Certificate (IGC). De kernpropositie is: lokaal in Rotterdam studeren, met Nederlandstalige begeleiding, en daarna internationaal inzetbaar zijn als HSE-/veiligheidskundige in havens, offshore, industrie, bouw en internationale projecten.

De sterkste actuele propositie staat in de V2-homepage: "Studeer lokaal. Werk wereldwijd." met NEBOSH IGC in Rotterdam, internationale erkenning in 120+ landen, €3.500 all-in en kleine groepen (`safetyxacademyV2/index.html:201`, `safetyxacademyV2/index.html:205`, `safetyxacademyV2/index.html:227`, `safetyxacademyV2/index.html:231`). De opleidingpagina maakt dit specifieker: SafetyXAcademy richt zich volledig op NEBOSH IGC, met les in het Nederlands en een Engels open-book examen (`safetyxacademyV2/nebosh-opleiding.html:170`, `safetyxacademyV2/nebosh-opleiding.html:173`, `safetyxacademyV2/nebosh-opleiding.html:175`).

### Diensten, cursussen en producten

| Aanbod | Bewijs in code | SEO-opmerking |
|---|---|---|
| NEBOSH IGC opleiding Rotterdam | `safetyxacademyV2/nebosh-opleiding.html:170`, `safetyxacademyV2/nebosh-opleiding.html:181` | Prima hoofdproduct; keyword-focus is duidelijk. |
| Gratis NEBOSH quiz / oefentest | `safetyxacademyV2/index.html:209`, `safetyxacademyV2/nebosh-ig1-oefenvragen.html:182` | Goed als lead magnet en interne linkhub. |
| IG1 oefenvragen en IG2 risk assessment content | `safetyxacademyV2/nebosh-ig1-oefenvragen.html:182`, `safetyxacademyV2/nebosh-ig2-risk-assessment.html:192` | Sterke long-tail content rond examenvoorbereiding. |
| Career support / HSE jobs / ZZP-opdrachten | `safetyxacademyV2/index.html:267`, `safetyxacademyV2/jobs.html:117`, `safetyxacademyV2/jobs.html:265` | Goede commerciële funnel, maar claims moeten consistent blijven met "startende academy". |
| Blog / kenniscentrum | `safetyxacademyV2/blog/index.html:133`, `safetyxacademyV2/blog/index.html:135` | Relevante topic clusters rond NEBOSH, HSE, ZZP en Rotterdam. |

### Doelgroep

De doelgroep is hoofdzakelijk B2B/B2P: werkende HSE-professionals, veiligheidskundigen, supervisors/teamleiders, zzp veiligheidskundigen, offshore workers en mensen met VCA/technische achtergrond die willen doorgroeien (`safetyxacademyV2/nebosh-opleiding.html:230`, `safetyxacademyV2/nebosh-opleiding.html:231`, `safetyxacademyV2/nebosh-opleiding.html:233`, `safetyxacademyV2/nebosh-opleiding.html:235`). Sectorfocus: havens, terminals, offshore wind, olie & gas, bouw, infrastructuur, logistiek, warehousing en internationale projecten (`safetyxacademyV2/index.html:336`, `safetyxacademyV2/index.html:343`, `safetyxacademyV2/index.html:351`, `safetyxacademyV2/index.html:358`, `safetyxacademyV2/index.html:365`, `safetyxacademyV2/index.html:373`).

### Taal en geografische focus

De site is Nederlandstalig (`<html lang="nl">` staat breed in de HTML, o.a. `safetyxacademyV2/index.html:2`). De geografische focus is Nederland en België, met Rotterdam/Veerhaven als opleidingslocatie en uitbreiding naar internationale carrières. Bewijs: "Westplein 12, 3016 BM Rotterdam" en "Studenten uit Nederland en België zijn welkom" (`safetyxacademyV2/index.html:505`, `safetyxacademyV2/index.html:503`). De content target ook Vlaanderen/België via Antwerpen, Gent, Zeebrugge en Brussel (`safetyxacademyV2/nebosh-benelux-ports.html:122`, `safetyxacademyV2/index.html:502`).

### Belangrijkste call-to-actions

| CTA | Voorbeeld | Funnelrol |
|---|---|---|
| Bekijk Opleiding | `safetyxacademyV2/index.html:209`, `safetyxacademyV2/jobs.html:124` | Commerciële verdieping. |
| Gratis Oefentest / Start Oefentest | `safetyxacademyV2/index.html:210`, `safetyxacademyV2/index.html:474` | Lead magnet / awareness. |
| Aanmelden / wachtlijst | `safetyxacademyV2/index.html:140`, `safetyxacademyV2/index.html:532`, `safetyxacademyV2/nebosh-opleiding.html:187` | Primaire conversie. |
| Jobs & ZZP bekijken | `safetyxacademyV2/index.html:271`, `safetyxacademyV2/nebosh-opleiding.html:188` | Career intent / commerciële motivatie. |

## 2. Technische SEO-audit

### Belangrijkste architectuurbevinding

Er staan twee versies naast elkaar:

- Root-site: `index.html`, `jobs.html`, `aanmelden.html`, `blog/index.html`, enz.
- V2-site: `safetyxacademyV2/index.html`, `safetyxacademyV2/nebosh-opleiding.html`, `safetyxacademyV2/jobs.html`, enz.

Dit is op dit moment het grootste SEO-risico. De V2-set heeft veel betere metadata, schema en navigatie, maar de root bevat ook pagina's met dezelfde canonicals, oudere content en afwijkende informatie. Voorbeeld: de root-homepage heeft twee H1's (`index.html:61`, `index.html:82`) en start "Januari 2026" in metadata (`index.html:21`, `index.html:22`), terwijl V2 spreekt over september 2026 (`safetyxacademyV2/index.html:8`, `safetyxacademyV2/index.html:533`). Daarnaast is root `jobs.html` inhoudelijk geen jobs/ZZP-pagina maar "Werken bij SafetyX Academy" volgens de title (`jobs.html:6`), terwijl de root-sitemap juist `https://www.safetyxacademy.nl/jobs.html` als jobs-pagina opneemt (`sitemap.xml:65`, `sitemap.xml:67`).

### Crawlability & indexering

| Onderdeel | Status | Bevinding | Bewijs |
|---|---:|---|---|
| `robots.txt` aanwezig | ✅ | Root `robots.txt` staat crawling toe. | `robots.txt:4`, `robots.txt:5` |
| Sitemap in robots | ⚠️ | Root robots verwijst naar `https://www.safetyxacademy.nl/sitemap.xml`, terwijl veel canonicals non-www gebruiken. | `robots.txt:8`, `safetyxacademyV2/index.html:9` |
| `sitemap.xml` aanwezig | ⚠️ | Root sitemap is incompleet en bevat anker-URL's als aparte URLs. Mist veel V2-pagina's zoals `nebosh-opleiding.html`, `nebosh-quiz.html`, `nebosh-offshore.html`. | `sitemap.xml:29`, `sitemap.xml:31`, `sitemap.xml:65` |
| V2 sitemap aanwezig | ⚠️ | V2 sitemap is completer, maar staat onder submap en gebruikt een verkeerde namespace (`https://www.sitemaps.org/...` i.p.v. `http://www.sitemaps.org/...`). | `safetyxacademyV2/sitemap.xml:2` |
| Noindex correct | ⚠️ | Bedankpagina's zijn terecht noindex, maar V2 sitemap bevat `bedankt.html`, wat niet geïndexeerd hoort te worden. | `safetyxacademyV2/bedankt.html:9`, `safetyxacademyV2/sitemap.xml:53` |
| Canonical tags | ⚠️ | V2-pagina's hebben meestal canonicals; root-pagina's zijn inconsistent. Root `aanmelden.html` canonicaliseert naar `/aanmelden` zonder `.html`; V2 naar `/aanmelden.html`. | `aanmelden.html:22`, `safetyxacademyV2/aanmelden.html:10` |
| www/non-www consistentie | ❌ | Door elkaar gebruikt in robots, sitemap, canonicals en OG-images. | `robots.txt:8`, `sitemap.xml:7`, `safetyxacademyV2/index.html:9`, `index.html:29` |
| Hreflang | ✅/⚠️ | Geen hreflang. Omdat er alleen Nederlands is, is dat acceptabel. Bij aparte NL/BE landingspagina's is `hreflang` of duidelijke canonicals nodig. | `safetyxacademyV2/index.html:2` |

### Metadata per pagina

| Paginatype | Status | Bevinding |
|---|---:|---|
| V2 homepage | ✅ | Title en description aanwezig, duidelijke NEBOSH/Rotterdam focus (`safetyxacademyV2/index.html:7`, `safetyxacademyV2/index.html:8`). |
| Root homepage | ⚠️ | Title/description aanwezig, maar wijkt inhoudelijk af van V2 en noemt start januari 2026 (`index.html:21`, `index.html:22`). |
| NEBOSH opleiding | ✅ | Sterke title en description, maar description is vrij lang en kan worden ingekort richting 150-160 tekens (`safetyxacademyV2/nebosh-opleiding.html:7`, `safetyxacademyV2/nebosh-opleiding.html:8`). |
| Jobs & ZZP | ⚠️ | V2 is goed, maar root `jobs.html` heeft een andere intent ("Werken bij"), terwijl sitemap dezelfde URL als jobs-pagina behandelt (`safetyxacademyV2/jobs.html:7`, `jobs.html:6`, `sitemap.xml:67`). |
| Blogindex | ⚠️ | Root en V2 blogindex hebben vergelijkbare canonicals en content maar andere templates; risico op dubbele/verwarrende bron. | `blog/index.html:7`, `safetyxacademyV2/blog/index.html:7` |
| Over ons | ⚠️ | Root `over-ons.html` is noindex redirect met canonical naar zichzelf; V2 bevat de echte pagina. Dit is alleen goed als root redirect bewust tijdelijk is. | `over-ons.html:7`, `over-ons.html:9`, `safetyxacademyV2/over-ons.html:7` |
| Twitter Cards | ⚠️ | Alleen blogindex en enkele root blogpagina's hebben Twitter Card tags; veel V2 servicepagina's hebben alleen OG-tags. | `safetyxacademyV2/blog/index.html:21`, `safetyxacademyV2/nebosh-opleiding.html:11` |
| Open Graph | ✅ | OG is breed aanwezig in V2. | `safetyxacademyV2/index.html:12`, `safetyxacademyV2/jobs.html:11` |
| Schema.org | ✅/⚠️ | Goede basis: Organization, LocalBusiness, Course, FAQPage, BreadcrumbList, CollectionPage. Niet overal even compleet en sommige pagina's missen Article-schema. | `safetyxacademyV2/index.html:36`, `safetyxacademyV2/index.html:80`, `safetyxacademyV2/nebosh-opleiding.html:46`, `safetyxacademyV2/nebosh-opleiding.html:101` |

Snippet van sterke structured data op de V2-homepage:

```html
// safetyxacademyV2/index.html:41
"@type": "EducationalOrganization",
"name": "SafetyXAcademy",
"url": "https://safetyxacademy.nl/",
"description": "SafetyXAcademy biedt Nederlandstalige NEBOSH IGC opleidingen in Rotterdam..."
```

### Heading structuur

| Onderdeel | Status | Bevinding |
|---|---:|---|
| V2 homepage | ✅ | Exact één H1 en logische H2/H3-opbouw. | `safetyxacademyV2/index.html:202`, `safetyxacademyV2/index.html:244` |
| Root homepage | ❌ | Twee H1's op één pagina. | `index.html:61`, `index.html:82` |
| V2 opleiding/jobs/blog | ✅ | Meestal één H1 en inhoudelijke H2's met keywords. | `safetyxacademyV2/nebosh-opleiding.html:170`, `safetyxacademyV2/jobs.html:117`, `safetyxacademyV2/blog/index.html:133` |
| Heading keywords | ✅ | NEBOSH, HSE, ZZP, Rotterdam, havens, offshore komen natuurlijk terug in H1/H2. | `safetyxacademyV2/jobs.html:133`, `safetyxacademyV2/nebosh-opleiding.html:415` |

### Performance & Core Web Vitals-indicatoren

| Onderdeel | Status | Bevinding | Bewijs |
|---|---:|---|---|
| Image optimization markup | ✅/⚠️ | Veel images hebben `alt`, `width`, `height` en `loading=lazy`; hero-image heeft `fetchpriority=high`. | `safetyxacademyV2/index.html:175`, `safetyxacademyV2/index.html:177`, `safetyxacademyV2/index.html:180` |
| Moderne formaten | ✅/⚠️ | HTML verwijst vaak naar `.webp`, goed. Maar de bestanden zelf staan niet in de repo volgens de bestandsscan: `images/` en `safetyxacademyV2/images/` leveren 0 bestanden op. | `safetyxacademyV2/index.html:175`, `safetyxacademyV2/nebosh-opleiding.html:196` |
| Video hero | ⚠️ | Homepage laadt een hero-video met WebM/MP4 bronnen. `preload="none"` is goed, maar assets ontbreken in repo en kunnen LCP/CLS beïnvloeden als fallback niet klopt. | `safetyxacademyV2/index.html:185`, `safetyxacademyV2/index.html:193`, `safetyxacademyV2/index.html:194` |
| Font loading | ⚠️ | V2 CSS gebruikt `@import` voor Google Fonts; sommige pagina's doen daarnaast preconnect/link. Dit is inconsistent en `@import` vertraagt font discovery. | `safetyxacademyV2/css/style-v3.css:1`, `safetyxacademyV2/blog/index.html:36` |
| JS bundling | ✅/⚠️ | Kleine statische JS-file met `defer`; geen bundler/code splitting nodig voor deze omvang. | `safetyxacademyV2/index.html:588`, `safetyxacademyV2/js/main-v3.js:1` |
| Third-party scripts | ⚠️ | Google Analytics/gtag staat inline op vrijwel elke pagina; Google Maps iframe op homepage. GA is async, Maps lazy. | `safetyxacademyV2/index.html:19`, `safetyxacademyV2/index.html:488`, `safetyxacademyV2/index.html:492` |

### Mobile & toegankelijkheid

| Onderdeel | Status | Bevinding |
|---|---:|---|
| Viewport | ✅ | Aanwezig op pagina's. | `safetyxacademyV2/index.html:5` |
| Responsive indicators | ✅ | CSS bevat responsive grid/flex en mobile navigation. | `safetyxacademyV2/css/style-v3.css:165`, `safetyxacademyV2/index.html:143` |
| Semantische HTML | ✅ | V2 gebruikt `header`, `nav`, `main`, `section`, `article`, `footer`. | `safetyxacademyV2/index.html:115`, `safetyxacademyV2/index.html:170`, `safetyxacademyV2/index.html:538` |
| ARIA | ✅/⚠️ | Navigatie heeft ARIA labels/expanded states; root include is beperkter. | `safetyxacademyV2/index.html:119`, `safetyxacademyV2/index.html:143`, `includes/header.html:14` |
| Alt-teksten | ✅/⚠️ | Meeste content-images hebben alt-tekst. Wel controleren of alle referenced assets bestaan en of alt-teksten niet keyword-stuffed zijn. | `safetyxacademyV2/jobs.html:215`, `safetyxacademyV2/jobs.html:216` |

### URLs & structuur

| Onderdeel | Status | Bevinding |
|---|---:|---|
| URL-structuur | ✅/⚠️ | Veel URL's zijn leesbaar (`/nebosh-opleiding.html`, `/blog/wat-is-nebosh-igc.html`), maar mix tussen `.html`, directory URLs en `/aanmelden` zonder `.html` is inconsistent. |
| Trailing slashes | ⚠️ | Blogindex canonical is `/blog/`, root sitemap bevat `/blog/index.html`. | `safetyxacademyV2/blog/index.html:9`, `sitemap.xml:15` |
| Breadcrumbs | ⚠️ | JSON-LD BreadcrumbList is op sommige pagina's aanwezig, maar zichtbare breadcrumbs ontbreken vaak. | `safetyxacademyV2/nebosh-opleiding.html:101`, `safetyxacademyV2/nebosh-quiz.html:88` |
| Interne links | ⚠️ | Goede linkstructuur in V2, maar root en V2 linken door elkaar naar dezelfde absolute URLs. Bij verkeerde deploy-map kunnen links naar niet-bestaande rootbestanden wijzen. | `safetyxacademyV2/index.html:127`, `safetyxacademyV2/blog/index.html:84` |
| Redirects | ⚠️ | Root `over-ons.html` doet meta refresh + JS redirect. Beter: server-side 301. | `over-ons.html:9`, `over-ons.html:11` |

## 3. Content & on-page SEO

### Keywordfocus per hoofdgroep

| Pagina/groep | Waarschijnlijk target keyword | Ondersteunende keywords |
|---|---|---|
| Homepage | NEBOSH opleiding Nederland / Rotterdam | SafetyXAcademy, HSE-carrière, werk wereldwijd, €3.500 |
| `nebosh-opleiding.html` | NEBOSH IGC opleiding Rotterdam | NEBOSH opleiding Nederland, NEBOSH diploma, MVK alternatief, HSE, veiligheidskundige |
| `jobs.html` | HSE jobs / HSE ZZP / ZZP veiligheidskundige | dagtarieven, Rotterdam, Antwerpen, offshore, Dubai, Noorwegen |
| `nebosh-ig1-oefenvragen.html` | NEBOSH IG1 oefenvragen | gratis oefenvragen, examenvoorbereiding, IG1 elementen |
| `nebosh-ig2-risk-assessment.html` | NEBOSH IG2 risk assessment | praktijkopdracht, hazards, risk assessment voorbeeld |
| `nebosh-benelux-ports.html` | NEBOSH Benelux havens | Rotterdam, Antwerpen, Gent, Zeebrugge, Amsterdam, Groningen |
| Blog | NEBOSH uitleg / NEBOSH vs MVK / veiligheidskundige opleiding | HSE salaris, ZZP dagtarieven, Rotterdam student guide |

### Contentdiepte

| Onderdeel | Status | Bevinding |
|---|---:|---|
| Commerciële hoofdcontent | ✅ | V2 opleiding- en jobs-pagina's zijn inhoudelijk substantieel en voldoen ruimschoots aan >300 woorden. | `safetyxacademyV2/nebosh-opleiding.html:170` t/m `safetyxacademyV2/nebosh-opleiding.html:513`; `safetyxacademyV2/jobs.html:117` t/m `safetyxacademyV2/jobs.html:351` |
| Blogcontent | ✅ | Blogartikelen zijn long-form en thematisch relevant. | `blog/veiligheidskundige-opleiding/index.html:252`, `blog/veiligheidskundige-opleiding/index.html:531` |
| Duplicate content risico | ❌ | Root en V2 bevatten overlappende pagina's; root en V2 blogindex hebben dezelfde canonical (`/blog/`), maar verschillende templates/content. | `blog/index.html:9`, `safetyxacademyV2/blog/index.html:9` |
| Interne linkvariatie | ✅/⚠️ | Veel interne links, maar anchor-teksten zijn soms herhalend rond "NEBOSH opleiding", "Aanmelden", "Jobs & ZZP". |
| Blog/kennisbank updates | ⚠️ | V2 blogindex toont artikelen in januari 2025 (`safetyxacademyV2/blog/index.html:149`, `safetyxacademyV2/blog/index.html:165`, `safetyxacademyV2/blog/index.html:197`), terwijl root blogindex "2026" en future dates toont (`blog/index.html:112`, `blog/index.html:131`). |
| E-E-A-T | ⚠️ | Er zijn missie, adres, KVK, LinkedIn en eerlijkheidssignalen. Er ontbreken zichtbare auteurprofielen, instructeurbio's, accreditatiebewijs, reviewbron en bronvermeldingen bij salaris/dagtariefclaims. | `safetyxacademyV2/over-ons.html:141`, `safetyxacademyV2/over-ons.html:240`, `safetyxacademyV2/index.html:581` |

Belangrijk inhoudelijk spanningsveld: de V2-over-ons-pagina zegt expliciet dat de academy nog startend is en geen afgerond alumni-netwerk of vaste jobplacement-pijplijn heeft (`safetyxacademyV2/over-ons.html:240`, `safetyxacademyV2/over-ons.html:241`). De root-homepage en V2-homepage bevatten echter studentenquotes/persona's en sterke verdienclaims (`index.html:314`, `safetyxacademyV2/index.html:383`, `safetyxacademyV2/index.html:394`). Dit is niet alleen E-E-A-T, maar ook conversierisico: maak duidelijk of het echte reviews, illustratieve persona's of toekomstige case studies zijn.

## 4. Internationale & lokale SEO

| Onderdeel | Status | Bevinding |
|---|---:|---|
| Land/taal-targeting | ✅/⚠️ | Nederlands als taal en NL/BE als markt zijn duidelijk. Geen aparte `nl-BE` of `nl-NL` hreflang nodig zolang er geen aparte landingspagina's met vergelijkbare content bestaan. |
| NAP-consistentie | ✅/⚠️ | Naam, adres en e-mail zijn consistent aanwezig; telefoonnummer ontbreekt. | `safetyxacademyV2/index.html:505`, `safetyxacademyV2/index.html:509`, `safetyxacademyV2/index.html:576` |
| LocalBusiness schema | ✅ | Aanwezig op V2-homepage met adres, geo en areaServed. | `safetyxacademyV2/index.html:80`, `safetyxacademyV2/index.html:90`, `safetyxacademyV2/index.html:97`, `safetyxacademyV2/index.html:102` |
| Lokale content | ✅ | Rotterdam/Veerhaven/Westplein content is sterk uitgewerkt. | `safetyxacademyV2/index.html:480`, `safetyxacademyV2/blog/nebosh-student-guide-rotterdam-westplein-veerhaven.html:141` |
| Local trust | ⚠️ | KVK staat in footer, maar er is geen zichtbaar telefoonnummer, openingstijden, routeblok met structured openingHours of Google Business Profile-link. | `safetyxacademyV2/index.html:581` |

## 5. Concrete bevindingen

### 🔴 Kritiek

| Bevinding | Waarom kritisch | Bewijs | Aanpak |
|---|---|---|---|
| Root en V2 concurreren met elkaar | Google kan verkeerde/oude pagina's crawlen; live deployment is onduidelijk. | `index.html:21`, `safetyxacademyV2/index.html:7` | Kies één productiebron. Verplaats V2 naar root of verwijder/noindex staging. |
| Sitemap is incompleet/inconsistent | Belangrijke pagina's ontbreken of oude URLs staan erin; indexatie wordt slechter gestuurd. | `sitemap.xml:13`, `sitemap.xml:65`, `safetyxacademyV2/sitemap.xml:9` | Maak één root `sitemap.xml` met alleen indexeerbare canonicals. |
| Root `jobs.html` matcht niet met sitemap/intent | Sitemap zegt jobs, maar root pagina is "Werken bij"; dit kan ranking en gebruikerservaring breken. | `jobs.html:6`, `sitemap.xml:67`, `safetyxacademyV2/jobs.html:117` | Publiceer de juiste jobs/ZZP-pagina op `/jobs.html`. |
| Root homepage heeft twee H1's | Verzwakt headingstructuur en is een duidelijk HTML/SEO-probleem. | `index.html:61`, `index.html:82` | Maak één H1; tweede H1 wordt H2. |
| www/non-www en `.html`/slash canonical inconsistent | Verkeerde canonical consolidatie en duplicate URL-risico. | `robots.txt:8`, `safetyxacademyV2/index.html:9`, `aanmelden.html:22`, `safetyxacademyV2/aanmelden.html:10` | Kies canonical standaard: bijv. `https://safetyxacademy.nl/...`. |
| Referenced image/video assets ontbreken in repo | Kans op 404's voor LCP/OG-images/social previews en visuele content. | `safetyxacademyV2/index.html:175`, `safetyxacademyV2/index.html:194` | Voeg assets toe of corrigeer paden; check build/deploy artifact. |

### 🟡 Belangrijk

| Bevinding | Waarom belangrijk | Bewijs | Aanpak |
|---|---|---|---|
| Twitter Card tags missen op veel V2 servicepagina's | Social previews minder controleerbaar. | Wel op `safetyxacademyV2/blog/index.html:21`, niet op `safetyxacademyV2/nebosh-opleiding.html:11` t/m `:16` | Voeg standaard Twitter tags toe aan template/head. |
| Font loading via CSS `@import` | Trager dan preconnect + stylesheet/preload in HTML. | `safetyxacademyV2/css/style-v3.css:1` | Verplaats Google Fonts naar `<head>` of host fonts lokaal met `font-display: swap`. |
| Meta descriptions soms te lang | SERP-snippets worden afgekapt. | `safetyxacademyV2/nebosh-opleiding.html:8`, `safetyxacademyV2/nebosh-ig2-risk-assessment.html:8` | Schrijf descriptions rond 145-160 tekens. |
| E-E-A-T claims zijn niet volledig onderbouwd | Veiligheid/opleiding is trust-heavy; claims over alumni/verdiensten vragen bewijs. | `safetyxacademyV2/over-ons.html:240`, `safetyxacademyV2/index.html:394` | Voeg echte instructeurbio's, accreditatiestatus, bronnen en reviewdisclaimer toe. |
| Bedankpagina in V2 sitemap | Noindex URL's horen niet in sitemap. | `safetyxacademyV2/sitemap.xml:53`, `safetyxacademyV2/bedankt.html:9` | Verwijder uit sitemap. |
| Root redirects via meta refresh/JS | Minder schoon dan 301 en kan crawlbudget verspillen. | `over-ons.html:9`, `over-ons.html:11` | Stel server-side 301 in of publiceer echte pagina. |

### 🟢 Nice-to-have

| Bevinding | Kans | Aanpak |
|---|---|---|
| Zichtbare breadcrumbs ontbreken op veel pagina's | Betere UX en interne context. | Voeg visuele breadcrumbs toe naast JSON-LD. |
| FAQ schema niet overal gekoppeld aan zichtbare FAQ | Rich result-kans verbeteren. | Match FAQPage JSON-LD exact met zichtbare FAQ's. |
| Blog auteurs ontbreken | E-E-A-T en topical authority. | Voeg auteur/instructeurprofielen toe met credentials. |
| Meer lokale SEO-signalen | Rotterdam/Benelux ranking versterken. | Voeg openingstijden, telefoon, route, GBP-link, LocalBusiness `openingHours` toe. |
| Contentclusters uitbreiden | Long-tail groei. | Maak hub rond "NEBOSH examen", "HSE salaris", "veiligheidskundige zzp", "NEBOSH België". |

## 6. Actieplan: top 10 prioriteiten

| Prioriteit | Wat moet gebeuren | Wie | Impact | Effort |
|---:|---|---|---|---|
| 1 | Bepaal productieversie: publiceer V2 op root of verwijder/noindex de oude root-variant. | Dev | Hoog | 0,5-1 dag |
| 2 | Maak één canonical URL-strategie: non-www of www, `.html` of directory URLs, trailing slash-regel. | Dev + Marketing | Hoog | 2-4 uur |
| 3 | Genereer één correcte root `sitemap.xml` met alleen indexeerbare canonicals en verwijs die in `robots.txt`. | Dev | Hoog | 2-4 uur |
| 4 | Zet de juiste `jobs.html` live op root en verwijder de verkeerde/oude "Werken bij" content van die URL. | Dev | Hoog | 2-4 uur |
| 5 | Controleer alle referenced assets en voeg ontbrekende images/video/favicon assets toe aan het deploybare pad. | Dev | Hoog | 0,5-1 dag |
| 6 | Los heading-issues op, vooral dubbele H1 op root of verwijder root als oude variant. | Dev | Middel | 1-2 uur |
| 7 | Harmoniseer metadata voor hoofdtemplates: title, description, OG, Twitter, canonical, robots. | Dev + Marketing | Middel/hoog | 0,5 dag |
| 8 | Onderbouw E-E-A-T: echte instructeurbio's, accreditatiestatus, bronnen voor salaris/dagtarieven en duidelijke status van testimonials. | Marketing | Hoog | 1-3 dagen |
| 9 | Verbeter performance-basics: font loading zonder CSS `@import`, image dimensions check, hero-video fallback/LCP-test. | Dev | Middel | 0,5-1 dag |
| 10 | Bouw contentkalender en clusterstructuur: NEBOSH examen, NEBOSH België, HSE ZZP, veiligheidskundige opleiding, lokale Rotterdam content. | Marketing | Middel | 1 dag setup + doorlopend |

## Samenvatting voor team

De inhoudelijke basis van SafetyXAcademy is sterk: heldere niche, duidelijke NEBOSH-propositie, goede lokale Rotterdam-positionering en relevante contentclusters rond HSE, ZZP, havens en offshore. De grootste SEO-winst zit niet in meer content schrijven, maar in eerst de technische verwarring oplossen: één live site, één sitemap, één canonical strategie en geen oude root-pagina's die bots of gebruikers naar verkeerde content sturen.

Als die basis schoon staat, kan marketing vooral winnen op trust: echte expertise tonen, claims onderbouwen, auteur/instructeurprofielen toevoegen en de blog systematisch uitbreiden rond de zoekintenties die al in de site aanwezig zijn.
