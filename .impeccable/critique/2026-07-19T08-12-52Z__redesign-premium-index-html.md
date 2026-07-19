---
target: redesign-premium/index.html
total_score: 28
p0_count: 0
p1_count: 2
timestamp: 2026-07-19T08-12-52Z
slug: redesign-premium-index-html
---
## Design Health Score

| # | Heuristic | Score | Key Issue |
|---|-----------|-------|-----------|
| 1 | Visibility of System Status | 3 | Live open/closed badge is genuinely good, but is `hidden` with no static fallback — slow JS = a blank gap at the top of the hero for a beat |
| 2 | Match System / Real World | 4 | Real Hungarian copy, address, hours, SZÉP-card note — all locally accurate |
| 3 | User Control and Freedom | 3 | No traps; no back-to-top or breadcrumbs, but fine for this brief |
| 4 | Consistency and Standards | 3 | Buttons/eyebrow/hairline pattern consistent site-wide; docked for the phone-link mobile inconsistency (see P1) |
| 5 | Error Prevention | 3 | Contact form has `aria-invalid` + `.form-error`, reasonable validation pattern |
| 6 | Recognition Rather Than Recall | 3 | Phone number repeated in header/hero/CTA/footer — strong |
| 7 | Flexibility and Efficiency | 2 | No accelerators beyond `tel:` link; acceptable for a marketing page but nothing extra |
| 8 | Aesthetic and Minimalist Design | 3 | Generous whitespace, restrained accents — but reads calmer than PRODUCT.md's "vivid/energetic" brief |
| 9 | Error Recovery | 2 | Only the contact form has error states; nothing else to review in scope |
| 10 | Help and Documentation | 2 | No FAQ/tooltips — acceptable for this page's complexity |
| **Total** | | **28/40** | **Good — solid foundation, address the weak areas below** |

## Anti-Patterns Verdict

**LLM assessment**: Borderline pass, not a clean pass. No cross-register absolute bans present (no side-stripe borders, no gradient text, no hero-metric template, no numbered scaffolding, no overflow). But: Fraunces is literally #1 on the brand register's reflex-reject font list (identity-preservation applies since it's an already-committed system, not a fresh pick — so not scored as a fresh violation, but the debt is latent); the homepage's 3 eyebrows sit at DESIGN.md's own tolerance ceiling, and the identical eyebrow treatment repeated on every sub-page's `.page-header` reads as scaffolding in aggregate even though each page individually stays in-bounds; the ivory/terracotta/olive palette is the single most predictable palette a designer would sketch blind for "Italian pizzeria" (first-order category-reflex), and "premium bento-grid minimalism" is close to the second most likely guess given the project's own stated anti-references (second-order reflex) — i.e., it reads as the safe middle path between the two named extremes rather than a genuinely fresh POV.

**Deterministic scan**: CLI scan (`detect.mjs`) returned 2 warnings: `overused-font` and `single-font` (both flagging Fraunces as the only detected face). The live browser overlay additionally reported: 3× `clipped-overflow-container`, 1× `hero-eyebrow-chip`, 4× `low-contrast` (all on the same two photo-card labels), 1× `overused-font`, 1× `cream-palette`.

**Confirmed and likely false positives** (verified by both assessments independently, cross-checked against the source):
- **`low-contrast` white-on-white (4 instances) — confirmed false positive.** The detector compared `.bento-label` text color against `.bento-card`'s nominal white `background-color`, but `.bento-card.has-photo::after` inserts a dark gradient scrim (`rgba(15,10,6,0.75)→0.05`) between the text and the photo specifically for legibility. The detector doesn't account for `::after` overlays, so it never saw the actual rendered backdrop.
- **`clipped-overflow-container` (3 instances) — likely false positive.** All three are the standard "oversized bled image inside `overflow:hidden`" and "contain the hover-zoom" patterns (hero background bleed, bento-card photo zoom) — intentional, working techniques, not accidental clipping.
- **`single-font` / `overused-font` (Fraunces-only) — confirmed false positive.** `index.html` line 9 loads both Fraunces *and* Manrope from the same Google Fonts request, and `style.css` clearly pairs them (`--font-body: "Manrope"` on `body`, Fraunces reserved for `h1-h4`/display). The detector's rendered-text sampling apparently missed Manrope entirely — possibly a webfont-load issue in its headless pass, not a real single-font violation. Worth a quick manual look in a real browser to be certain nothing is silently falling back to a system serif for body text, but the source code is unambiguous.

**Findings that agree with the LLM review** (not false positives, corroboration across both assessments):
- `hero-eyebrow-chip` — corroborates the LLM review's eyebrow-scaffolding observation.
- `cream-palette` — corroborates the LLM review's category-reflex palette observation. Note: the register guide's caution against cream/sand body backgrounds is explicitly scoped to *new* design choices; this is an already-documented, committed system, so identity-preservation wins for now — but it's a real, machine-confirmed signal for the "next round" question DESIGN.md itself already flags.

**Visual overlays**: Not available this run. The `computer` screenshot tool timed out in both assessments (a sandbox-wide limitation, confirmed independently twice) — no user-visible `[Human]`-tab overlay exists for this critique. Every finding above is DOM/CSS/console/computed-style evidence, not an eyeballed screenshot.

## Overall Impression

This is executed with real craft, not templated laziness — the live open/closed badge is genuinely useful, the hero text contrast checks out at 18.6:1 against the actual photographed+gradient background (not just assumed), and the motion/shadow rules are followed consistently. But it sits in a "safe middle" zone on two axes at once: it's the modal palette/aesthetic choice for an Italian pizzeria (category-reflex), and it's calmer than its own brief asks for (PRODUCT.md wants "vivid, energetic, friendly"; DESIGN.md's system delivers that in only 3 designated accent moments and documents this itself as a partial, not full, resolution). The single biggest opportunity is resolving that documented tension for real. The single most urgent fix is smaller but sharper: the header phone link — the page's #1 literal conversion control — may lose its accessible name entirely on mobile.

## What's Working

1. **`#hero-status` live open/closed badge** — JS-computed from real hours, degrades safely (hidden by default, never shows a broken/empty state), and directly serves the brief's #1 stated design principle (fast pre-call info).
2. **`.pull-quote-section`** — the strongest of the three "Committed" terracotta moments; full-bleed color, italic Fraunces, one sentence, genuinely reads as an emotional beat rather than decoration.
3. **Hero legibility engineering** — independently verified (pixel-sampled the real photo blended with the CSS gradient): white h1 text computes to 18.6:1 contrast against the actual rendered backdrop, reinforced with `text-shadow`. Real care, not a lucky default.

## Priority Issues

**[P1] Header phone link may lose its accessible name on mobile**
Why it matters: `.header-phone` hides `span.phone-text` via `display:none` at ≤760px with no `aria-label` fallback on the parent link. Per the accname spec, `display:none` content is excluded from the accessible name — a screen-reader user on mobile (the primary declared audience) may hear no name at all for the site's single most important conversion control.
Fix: add `aria-label="Hívás: +36 30 755 6846"` to `.header-phone`, or mark the icon `aria-hidden="true"` and replace `display:none` on the label with a visually-hidden (not display:none) technique.
Suggested command: `/impeccable harden`

**[P1] Admin/logistics content interrupts the emotional runway into the closing CTA**
Why it matters: DOM order is pull-quote (the page's real emotional peak) → partner logos + SZÉP-card payment note (cold, administrative) → closing CTA (the final ask). This directly works against PRODUCT.md's own stated principle that every decision should make it *easier* to call — the last thing read before the ask is logistics, not warmth.
Fix: move `.payment-note` and `.partners-strip` to after `.closing-cta`, directly above the footer, so the pull-quote runs straight into the CTA.
Suggested command: `/impeccable layout`

**[P2] No designed `:focus-visible` state on primary interactive elements**
Why it matters: only form inputs get a designed focus ring. `.btn`, `.btn-outline`, `.main-nav a`, `.social-icons a`, and `.header-phone` all fall back to the browser default outline, untested against the dark hero and the terracotta `.closing-cta` block. PRODUCT.md explicitly lists visible focus states as a requirement.
Fix: add a consistent `:focus-visible { outline: 2px solid var(--color-accent); outline-offset: 3px; }` (or equivalent) across all interactive elements, tuned per background.
Suggested command: `/impeccable harden`

**[P2] Category-reflex palette risk (documented tension, only partially resolved)**
Why it matters: confirmed by both the LLM review and the deterministic scanner's `cream-palette` flag — the ivory/terracotta/olive palette is the first thing anyone would guess for this category, and the brief explicitly asks for more energy than the current 3-moment "Committed" system delivers. DESIGN.md already names this as an open question for a future round.
Fix: this is the next-round decision DESIGN.md itself is waiting on — not a code bug to patch quietly.
Suggested command: `/impeccable bolder`

**[P3] Repeated page-header eyebrow reads as scaffolding across the site**
Why it matters: each individual page stays within the documented 2-3-eyebrows-per-page cap, but every sub-page opens its `.page-header` with the identical eyebrow construction. Site-wide, that's the "kicker repeated as section grammar" pattern the register guide calls AI scaffolding unless it's a deliberately named brand system — DESIGN.md doesn't currently name the page-header eyebrow specifically as that system.
Fix: either vary the page-header treatment (e.g., only the homepage gets an eyebrow) or explicitly document it in DESIGN.md as an intentional, named pattern.
Suggested command: `/impeccable polish`

## Persona Red Flags

**Jordan (confused first-timer)**: The three stacked homepage eyebrows ("PINOCCHIO PIZZÉRIA · BAJA" → "FRISS OLASZ ALAPANYAGOK" → "KEDVENCEINK") give no wayfinding value on a fast scan — they read as decorative typographic rhythm, not orientation aids.

**Riley (deliberate stress tester)**: The mobile phone-link accessible-name gap (P1) is exactly the class of bug this persona finds by testing with a screen reader or disabled CSS. Also worth a manual re-check: `--color-text-faint` (`#7a6e56`) computes to 4.65:1 against the ivory background — passes AA by a hair, and DESIGN.md itself documents that a *previous* "fix" to this exact token landed at ~3.75:1 despite a similar documented claim, only caught on re-audit. Worth verifying in an actual rendering engine, not just trusting the documented value again.

**Casey (distracted mobile user)**: On mobile, `.header-phone` shows icon-only with (per P1) potentially no accessible label — for someone who wants to tap-and-call without reading, this is the riskiest control on the page precisely because it's the primary conversion action.

**Márta (local Baja resident, project-specific)**: Mobile-only, wants hours/menu/phone in under 5 seconds. The homepage's "Kedvenceink" bento grid shows zero prices ("Házi tészták," "Válogatott borok," "Birra Moretti" are all price-free teasers) — she has to click through to the menu page to get information PRODUCT.md says should be available at a glance.

**Gábor (local resident calling from the car, project-specific)**: Relies entirely on the live open/closed badge to decide whether to detour. That badge is JS-only with `hidden` as the default — on a slow mobile connection (the exact context PRODUCT.md describes), he may see the hero with no status signal at all for a beat, with no static fallback text.

## Minor Observations

- The Széchenyi Terv Plusz compliance badge sits `position:absolute` over the top-right of the hero photo, competing slightly with the eyebrow/h1 for first-paint attention — low priority, it's a compliance requirement, not a design choice.
- `.closing-cta .btn` (accent-dark text on white) computes to ~5.5:1 contrast — comfortably passes AA, no issue.
- Title and meta description are present and specific — good basic hygiene.
- Social icons already have proper `aria-label`s, which makes the phone-link gap (P1) more of an inconsistency than a systemic oversight — the pattern for doing it right already exists elsewhere on the same page.

## Questions to Consider

1. If the brand brief calls for "vivid, energetic, friendly" and the shipped system's own documentation admits this is only "partially resolved" by three terracotta moments — at what point does a documented, named tension stop being an intentional design decision and start being an unresolved disagreement between the brief and what shipped?
2. The homepage's highest-emotion content (the pull-quote) and its highest-stakes content (the closing CTA) are separated by a SZÉP-card payment paragraph — was that ordering ever tested against someone who just wants to call, or did it fall out of "trust signals cluster together" logic instead of conversion-path logic?
3. Given Fraunces sits at position #1 on the reflex-reject font list, if a genuine "bolder/more energetic" round happens, is a full typography reconsideration on the table, or is the font family permanently locked by the identity-preservation carve-out regardless of how far the color/energy work goes?
