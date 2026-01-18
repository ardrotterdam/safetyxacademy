# SafetyX Academy — Award-Winning Website Blueprint (SafetyXAC)
**Version:** 1.0  
**Project:** safetyxacademy.nl  
**Owner:** Ard Rotterdam  
**Goal:** A premium, modern, trust-first education platform site that feels *award-winning* and converts visitors into waitlist sign-ups and leads.

---

## 1) Brand Positioning
### English
SafetyX Academy is a high-trust, no-nonsense training and career platform for safety professionals in the Benelux. The experience must feel: **professional, premium, calm, and confident**—not “course seller hype.”

### Nederlands
SafetyX Academy is een high-trust, no-nonsense opleidings- en carrièreplatform voor safety professionals in de Benelux. De site moet voelen: **professioneel, premium, rustig en zelfverzekerd**—geen “snelle cursusverkoper” vibe.

---

## 2) Non-Negotiables
1. **Trust-first visual language** (clean, structured, credible).
2. **Premium minimalism** (whitespace, strong type hierarchy).
3. **Rotterdam vibe (subtle)**: modern, direct, “aanpakken”, no fluff.
4. **Mobile-first** and fully responsive.
5. **Fast** and lightweight (Lighthouse Performance 90+).
6. **Accessible** (keyboard, focus states, contrast).
7. **One primary CTA per section** (no competing actions).

---

## 3) Design System (SafetyX)
### Colors
- **Primary:** `#A61C2B` (SafetyX Red)
- **Background:** `#FFFFFF` (white), optional near-white panels `#FAFAFA`
- **Text:** `#111111` (primary), muted `#6B7280` (secondary)
- **Borders:** `#E5E7EB` (soft gray)
- **Success/Info accents:** use sparingly, never loud

### Typography
- Use **existing site font**. If choosing: `Inter` or equivalent clean sans-serif.
- **H1:** strong, confident, slightly condensed feel (not playful)
- **Body:** 16–18px, line-height 1.6–1.75 for calm readability

### Layout
- Max width: **1100–1240px**
- Section padding: **56–80px desktop**, **36–48px mobile**
- Grid: 12 columns desktop, 1 column mobile
- Radius: 12–20px (consistent)
- Shadows: subtle only (premium depth, never “cheap”)

---

## 4) Motion & Interaction (Premium, Not Flashy)
### Rules
- Motion must guide attention, not distract.
- Use small, elegant transitions.

### Approved effects
- Fade + slight slide (8–16px) on hero content
- Staggered reveal for feature cards
- Hover: micro-lift + shadow + border tint
- Button hover: subtle darken + -1px translate
- Nav: clean active state, smooth underline or pill

### Avoid
- Bouncy animations, heavy parallax, particles, neon gradients

---

## 5) SafetyX Site Goals (Conversion)
### Primary goal
- **Waitlist sign-ups** (free, non-binding)

### Secondary goals
- Trust building (NEBOSH / safety outcomes)
- Lead qualification (future: training requests, job matching)

### Core trust barriers
- “Is this legit?”
- “Is it expensive?”
- “Is it a commitment?”
- “What do I get now if launch is later?”

---

## 6) Page Architecture (Ideal Structure)
### Homepage (H1 + clear flow)
1. **Hero (Launch message + waitlist CTA)**  
2. **Why SafetyX (value proposition)**  
3. **What you get as early member (prep content)**  
4. **Quizzes & tools preview (interactive or screenshot)**  
5. **Job alerts / career support (credible, practical)**  
6. **Social proof / credibility signals** (partners, experience, approach)  
7. **FAQ** (objections)  
8. **Final CTA** (waitlist)

### Other pages (typical)
- `quiz.html` / tools pages
- `contact.html`
- `aanmelden.html` (waitlist form)
- Legal: privacy/cookies (later)

---

## 7) SafetyX Copy Style (Dutch-first)
### Voice
- Direct, honest, calm confidence.
- No hype. No exaggerated claims.
- Short sentences. Concrete benefits.

### Example phrases that fit SafetyX
- “We kiezen voor kwaliteit boven snelheid.”
- “Gratis en vrijblijvend.”
- “Geen verplichtingen. Wel voordeel.”
- “Eerst bouwen we het goed. Daarna schalen we op.”

### Terms to avoid
- “Limited spots”, “Only today”, “Get rich”, “Secret method”, “Hacks”

---

## 8) SafetyX “Signature” Visual Identity
Subtle Rotterdam vibe without clichés:
- Modern, structured layouts (port-city energy)
- Strong lines/dividers, grid discipline
- Minimal geometric accent shapes in very light gray
- Optional: tiny “map line” motif (abstract), not literal skyline (unless brand demands)

---

## 9) Component Library (SafetyX Patterns)
### Core components
- Primary button (SafetyX red)
- Outline/ghost button
- Card (feature/benefit)
- Badge/eyebrow label
- Accordion (FAQ)
- Form input set (waitlist)

### Button spec (primary)
- Background: `#A61C2B`
- Text: white, semibold
- Hover: slightly darker (e.g., `#8F1825`)
- Focus ring: subtle red glow

### Card spec
- White with soft shadow
- Border: light gray
- Radius: 16px
- Optional subtle top gradient: white → #FAFAFA

---

## 10) Waitlist (Required UX)
### Must communicate clearly
- **Gratis**
- **Vrijblijvend**
- **Zonder verplichting**
- Early sign-ups get: priority + exclusive prep content (quizzes, tips, job alerts)

### Form fields (minimum viable)
- Name
- Email
- Optional: role (student / professional / employer)

### Confirmation text
- “Je staat op de lijst. We mailen alleen wanneer het relevant is.”

---

## 11) Performance & SEO (SafetyX Defaults)
- Optimize images (WebP)
- Limit fonts (1 family)
- Avoid heavy JS
- Semantic headings (1 H1)
- Open Graph image for sharing
- Sitemap/robots correct

Targets:
- Lighthouse Performance 90+
- Accessibility 95+
- SEO 90+

---

## 12) SafetyX AI Instructions (Copy/Paste for Cursor)
### English (primary)
You are a senior product designer and frontend engineer improving safetyxacademy.nl to feel premium and award-winning. Keep the existing style and codebase consistent. Prioritize trust-first design, mobile-first responsiveness, performance, and accessibility. Use SafetyX brand color #A61C2B and clean white background. Avoid flashy effects. Provide exact file changes and keep diffs minimal and safe.

### Nederlands (extra)
Werk als senior designer + frontend engineer. Maak SafetyX premium en onderscheidend, maar blijf exact in lijn met de bestaande look & code. Mobile-first, snel, toegankelijk. Geen onnodige tooling. Lever exacte file edits.

---

## 13) “September 2026 Launch Hero” Spec (Ready-to-Use)
### Required content (Dutch)
- Eyebrow (muted): **“Belangrijk bericht”**
- Headline: **“SafetyX Academy start in september 2026”**
- Paragraph: quality over speed + free/non-binding waitlist + early perks (priority + prep content)
- Reassurance line: **“Gratis, vrijblijvend en zonder verplichting”**
- One CTA button: **“Plaats me op de wachtlijst”** (link to `aanmelden.html` or `#wachtlijst`)

### Visual requirements
- Full width section directly under nav
- Premium depth (soft shadow card or subtle gradient panel)
- Generous whitespace
- Strong hierarchy
- Responsive stacking on mobile

---

## 14) QA Checklist Before Push (5 minutes)
- Mobile 375px: spacing + typography perfect
- Desktop 1440px: balanced, not too wide
- CTA visible and singular
- No layout shift
- Focus states visible
- Contrast OK
- Quick Lighthouse check if possible
- Copy feels honest and Rotterdam-direct

---

## 15) Release Process (Safe)
1. Create small commits with clear messages.
2. Preview locally (Go Live).
3. Push to GitHub main only when satisfied.
4. Confirm Vercel production deployment success.

Commit naming:
- `feat(home): add Sep 2026 launch hero + waitlist CTA`
- `style: refine SafetyX buttons and card depth`

---

## Blueprint Implementation Checklist (V2)
- Ensure all main sections align to a shared max-width container with consistent side padding.
- Reuse the existing orange primary button style for all primary CTAs on V2 pages.
- Keep exactly one H1 per page; demote secondary hero titles to H2 if needed.
- Add focus-visible styles to all primary links/buttons if missing.
- Validate contrast and readability for muted text and button labels.
- Verify no horizontal scroll on mobile (375px).

---
**End of SafetyX Academy Blueprint**
