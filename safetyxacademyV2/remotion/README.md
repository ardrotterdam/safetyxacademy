# SafetyXAcademy — Remotion heroloop

Deze map is een **klein Remotion-project** om een korte, naadloos herhaalbare **achtergrondvideo** te maken: orbs, raster, sheen en vignet op `#0A0F1C` / `#FF6600`. **Geen titeltekst in de video** — die blijft in `index.html` (SEO, toegankelijkheid, snelle copy-wijzigingen).

## Waarom zo?

- **Remotion** schittert bij gecontroleerde animatie en export naar **WebM/MP4**, ideaal voor een statische site zonder zware `@remotion/player`-bundle op elke pageview.
- De live site gebruikt `<video>`; bronbestanden staan in `../images/`.

## Commando’s (vanuit deze `remotion/` map)

```bash
npm install
npm run dev
```

Studio openen, compositie **HeroLoop** bekijken.

### Renderen naar de site

```bash
npm run render:webm
# of universele H.264:
npm run render:mp4
```

Output:

- `../images/hero-remotion.webm` (VP8 — brede ondersteuning)
- `../images/hero-remotion.mp4` (H.264)

Eerste render downloadt een Chromium-build (Remotion); even geduld.

## Homepage

`index.html` gebruikt `<source>`-elementen: als `hero-remotion.webm` (en eventueel `.mp4`) bestaat, pakt de browser die; anders val je terug op `hero-video.mp4`.

Daarnaast staat er een **CSS mesh-laag** op de hero voor directe “2026”-diepte zonder render.
