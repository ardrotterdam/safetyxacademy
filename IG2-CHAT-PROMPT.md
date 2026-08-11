# Prompt — plak in de chat “NEBOSH IG2 risk assessment”

Rol: Senior Web Developer & SEO Specialist.

Taak: Update `/en/nebosh-ig2-risk-assessment.html` zodat title/content matchen op zoekintentie (examples + template). Gebruik bestaande SafetyXAcademy styling (`style-v3.css` / blog-post classes) — geen inline blauwe highlight-box of generieke CTA-styles.

Merk: `SafetyXAcademy` in prose/SEO.

---

## Implementeer deze contentstructuur

### H1
```html
<h1>NEBOSH IG2 Risk Assessment Examples + Template (GIC2 2026)</h1>
```

### Above-the-fold quick win (direct onder H1/intro)
Blok met:
- H2: `Quick Download: NEBOSH IG2 Template & Worked Example`
- Korte tekst: Preparing your IG2 risk assessment? Download our structured template or review the practical worked example below before submitting.
- CTA-link naar `#download-template`: `Download IG2 Template (PDF/XLS)`
- Als er nog geen echt PDF/XLS-bestand is: maak een anker + duidelijke template-sectie op de pagina (geen broken download beloven zonder bestand).

### Worked example
```html
<h2>NEBOSH IG2 Risk Assessment Example (Filled Table)</h2>
```
Korte intro + filled sample table (Part 2 style), minstens 1 rij:

| Hazard Category | Who might be harmed & how? | What are you already doing? | Further action required |
|---|---|---|---|
| Vibration (Hand-Arm) | Operators using angle grinders daily. Risk of HAVS causing nerve damage. | Anti-vibration gloves provided; equipment inspected annually. | Implement job rotation (max 2 hrs/day per operator) and source low-vibration grinders. |

### Overige H2/H3 (weven in bestaande content, niet dubbelen)
- `IG2 Risk Assessment Template Structure`
- `IG2 vs GIC2: What Changed for Your Submission`
- `Sample Hazard Description (Weak vs Strong)` (H3)
- `Example Priority Action Examiners Accept` (H3)
- `IG2 Submission Checklist`

### Schema / FAQ
Zorg dat zichtbare FAQ + bestaande FAQPage schema blijven kloppen met claims over template/examples (geen download beloven die niet bestaat).

---

## Output
Pas het HTML-bestand direct aan. Houd bestaande navigatie, footer, brand (`SafetyXAcademy`) en page CSS intact.
