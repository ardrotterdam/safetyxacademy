# Live status SafetyXAcademy

Controle uitgevoerd: 20 mei 2026  
Domein: `https://safetyxacademy.nl`

## 1. Welke versie staat live?

De live site draait inhoudelijk op de `safetyxacademyV2`-versie, maar gepubliceerd op root-URL's zoals `/`, `/nebosh-opleiding.html`, `/jobs.html`, `/blog/` en `/werken-bij.html`.

De map `/safetyxacademyV2/` zelf is live niet bereikbaar: `https://safetyxacademy.nl/safetyxacademyV2/index.html` en `https://safetyxacademy.nl/safetyxacademyV2/nebosh-opleiding.html` geven 404. Dat betekent dat V2 vermoedelijk als deploy-bron naar de webroot is gekopieerd of dat de hosting-build vanuit `safetyxacademyV2` publiceert.

## 2. Bewijsvoering

### Homepage `/`

| Live marker | Matcht met | Betekenis |
|---|---|---|
| `<title>NEBOSH Opleiding Nederland \| SafetyX Academy Rotterdam</title>` | `safetyxacademyV2/index.html:7` | Exacte V2-title, niet root-title. |
| H1: `Studeer lokaal. Werk wereldwijd.` | `safetyxacademyV2/index.html:202` | V2-homepage hero. |
| Stylesheet: `css/style-v3.css` | `safetyxacademyV2/index.html:27` | V2-stylesheet. Root gebruikt `/css/style.css` en `/css/header.css`. |
| `JSONLD_COUNT: 2` | `safetyxacademyV2/index.html:36`, `safetyxacademyV2/index.html:80` | V2 heeft Organization/Course + LocalBusiness JSON-LD. |
| Headers: `Server: Vercel`, `X-Vercel-Cache: HIT` | Live response | Hosting via Vercel. |

Root-homepage markers die niet live als homepage verschijnen:

| Root marker | Root-bestand | Live status |
|---|---|---|
| Title `NEBOSH IGC Nederland €3.500 \| Start Jan 2026 Rotterdam \| SafetyXAcademy` | `index.html:21` | Niet gevonden op live `/`. |
| Tweede H1 `NEBOSH IGC – Het Slimme Alternatief voor MKV` | `index.html:82` | Niet gevonden als live homepage-H1. |
| `header-include` / fetch include | `index.html:44`, `index.html:46` | Niet gevonden op live `/`. |

### NEBOSH opleiding `/nebosh-opleiding.html`

| Live marker | Matcht met | Betekenis |
|---|---|---|
| Title `NEBOSH IGC Opleiding Rotterdam (NEBOSH opleiding Nederland) \| SafetyXAcademy` | `safetyxacademyV2/nebosh-opleiding.html:7` | V2 opleidingspagina staat live. |
| H1 `NEBOSH IGC opleiding in Rotterdam - Nederlandstalige uitleg, internationaal diploma` | `safetyxacademyV2/nebosh-opleiding.html:170` | V2 H1, met live encoding/normalisatie van de dash. |
| Stylesheet `css/style-v3.css` | `safetyxacademyV2/nebosh-opleiding.html:26` | V2-template. |
| `JSONLD_COUNT: 3` | `safetyxacademyV2/nebosh-opleiding.html:35`, `:46`, `:101` | FAQPage, Course en BreadcrumbList schema live aanwezig. |

### Jobs `/jobs.html`

| Live marker | Matcht met | Betekenis |
|---|---|---|
| Title `HSE jobs &amp; ZZP-opdrachten met NEBOSH \| SafetyXAcademy` | `safetyxacademyV2/jobs.html:7` | V2 jobs/ZZP-pagina staat live. |
| H1 `HSE jobs &amp; ZZP-opdrachten voor veiligheidskundigen met NEBOSH` | `safetyxacademyV2/jobs.html:117` | V2 content staat live, niet de root `jobs.html`. |
| Root title `Werken bij SafetyX Academy \| Lancering September 2026` | `jobs.html:6` | Niet live op `/jobs.html`; deze intent staat live op `/werken-bij.html`. |

### Blogindex `/blog/`

| Live marker | Matcht met | Betekenis |
|---|---|---|
| Title `Blog 2026: NEBOSH &amp; HSE carrièreadvies \| SafetyXAcademy` | `safetyxacademyV2/blog/index.html:7` | V2 blogindex staat live. |
| H1 `Blog over NEBOSH, HSE jobs &amp; ZZP` | `safetyxacademyV2/blog/index.html:133` | V2 H1; root blogindex heeft andere H1. |
| Stylesheet `../css/style-v3.css` | `safetyxacademyV2/blog/index.html:40` | V2 blogtemplate. |
| `JSONLD_COUNT: 2` | `safetyxacademyV2/blog/index.html:49`, `:61` | ItemList + CollectionPage schema live. |

### Over ons en aanmelden

| URL | Live status | Match |
|---|---:|---|
| `/over-ons.html` | 200 | V2-title `Over SafetyXAcademy \| NEBOSH Rotterdam` en V2 H1 `Over SafetyXAcademy`. |
| `/aanmelden.html` | 200 | V2-title `Aanmelden NEBOSH IGC Rotterdam ... Wachtlijst 2026` en V2 H1 `Aanmelden NEBOSH IGC Opleiding Veerhaven Rotterdam`. |
| `/werken-bij.html` | 200 | V2-title `Werken bij SafetyX Academy \| Lancering September 2026`. |

## 3. Zijn er paden waar de andere versie toch bereikbaar is?

### Niet bereikbaar

| Pad | Live resultaat | Conclusie |
|---|---:|---|
| `/safetyxacademyV2/index.html` | 404 | V2-map zelf is niet publiek bereikbaar. |
| `/safetyxacademyV2/nebosh-opleiding.html` | 404 | V2-map zelf is niet publiek bereikbaar. |
| `/blog/veiligheidskundige-opleiding/` | 404 | Root-only directory-blogpost staat niet live. |
| `/blog/nebosh-student-guide-rotterdam-lunch-landmarks/` | 404 | Root-only directory-blogpost staat niet live. |
| `/privacy.html` | 404 | Root-only privacy-pagina staat niet live, ondanks footerlinks in V2-code die naar `privacy.html` kunnen wijzen. |
| `/aanmelden` | 404 | Extensionless aanmeldpad staat niet live; alleen `/aanmelden.html` werkt. |

### Wel bereikbaar, maar V2-content

| Pad | Live resultaat | Conclusie |
|---|---:|---|
| `/index.html` | 200 | Zelfde V2-homepagecontent als `/`; geen oude root-homepage. |
| `/blog/index.html` | 200 | Zelfde V2-blogindexcontent als `/blog/`; duplicaatpad zonder redirect. |
| `/jobs.html` | 200 | V2 jobs/ZZP-content; niet de oude root `jobs.html`. |
| `/blog/nebosh-student-guide-rotterdam-westplein-veerhaven.html` | 200 | V2-blogpost is live. |

### Redirect/canonical observaties

| Test | Resultaat | Opmerking |
|---|---|---|
| `https://www.safetyxacademy.nl/` | 200 met effective URL `https://safetyxacademy.nl/` | `www` wordt naar non-www geconsolideerd. |
| `/index.html` | 200, geen redirect naar `/` gemeten | Duplicate URL-risico; canonical zou moeten consolideren, maar 301 is schoner. |
| `/blog/index.html` | 200, geen redirect naar `/blog/` gemeten | Duplicate URL-risico; voeg 301 toe naar `/blog/`. |

## 4. Hosting-platform detectie

### Live headers

De live responses tonen Vercel:

```text
Server: Vercel
X-Vercel-Cache: HIT
X-Vercel-Id: fra1::...
Cache-Control: public, max-age=0, must-revalidate
```

Voorbeelden:

| URL | Headerbewijs |
|---|---|
| `/` | `Server: Vercel`, `X-Vercel-Cache: HIT`, `Content-Length: 23226` |
| `/nebosh-opleiding.html` | `Server: Vercel`, `Content-Disposition: inline; filename="nebosh-opleiding.html"` |
| `/jobs.html` | `Server: Vercel`, `Content-Disposition: inline; filename="jobs.html"` |

### Repo-config detectie

| Bestand | Gevonden? | Betekenis |
|---|---:|---|
| `_redirects` | Nee | Geen Netlify-style redirects in repo. |
| `_headers` | Nee | Geen Netlify/static headers config in repo. |
| `netlify.toml` | Nee | Geen Netlify projectconfig. |
| `vercel.json` | Nee | Geen expliciete Vercel routing/buildconfig in repo. |
| `.htaccess` | Nee | Geen Apache redirects/config. |
| `CNAME` | Ja: `safetyxacademy.nl` | Domeinconfig aanwezig, typisch bruikbaar voor GitHub Pages/custom domain, maar live headers wijzen op Vercel. |

## Conclusie

De live site is geen oude root-site en ook geen publiek beschikbare `/safetyxacademyV2/` submap. De live productie lijkt de `safetyxacademyV2` HTML te publiceren op rootpaden via Vercel.

Belangrijkste vervolgstappen:

1. Voeg redirects toe voor duplicaatpaden zoals `/index.html` -> `/` en `/blog/index.html` -> `/blog/`.
2. Los 404's op voor live gelinkte of strategische paden, vooral `/privacy.html` en eventueel root-only blogartikelen als die behouden moeten blijven.
3. Voeg een expliciete Vercel-config of documentatie toe zodat duidelijk is welke map als productiebron wordt gedeployed.
4. Controleer sitemap live opnieuw: die moet de nu live V2-rootpaden bevatten en geen 404-paden zoals root-only directoryposts.
