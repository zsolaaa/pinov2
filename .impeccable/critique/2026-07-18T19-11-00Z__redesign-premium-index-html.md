---
target: redesign-premium/index.html
total_score: 24
p0_count: 2
p1_count: 2
timestamp: 2026-07-18T19-11-00Z
slug: redesign-premium-index-html
---
## Design Health Score

| # | Heuristic | Score | Key Issue |
|---|-----------|-------|-----------|
| 1 | Visibility of System Status | 2/4 | Contact form has no submit/success/error state |
| 2 | Match Between System and Real World | 3/4 | Authentic Hungarian copy, standard icons |
| 3 | User Control and Freedom | 3/4 | Simple nav, no traps, but no undo needed anyway |
| 4 | Consistency and Standards | 2/4 | Hero CTA "Rendelés" leads to a text form, not a call — breaks the promise the label makes |
| 5 | Error Prevention | 2/4 | Only email required on contact form; no phone field at all |
| 6 | Recognition Rather Than Recall | 3/4 | Clear nav labels, labeled icons throughout |
| 7 | Flexibility and Efficiency | 3/4 | `tel:` links present for mobile dialing, at least in the header |
| 8 | Aesthetic and Minimalist Design | 3/4 | Restrained, hairline-driven hierarchy — but flat, no emotional peak |
| 9 | Error Recovery | 1/4 | No inline validation styling anywhere in the form |
| 10 | Help and Documentation | 2/4 | Baseline only; no contextual help, acceptable for site size |
| **Total** | | **24/40** | **Acceptable — significant improvements needed before users are happy** |

## Anti-Patterns Verdict

**Does this look AI-generated? Borderline — mostly avoided, with one self-inflicted exception.**

**LLM assessment**: The system avoids the loudest tells — no gradient text, no identical same-size card grid (the bento grid uses genuine `span-2`/`row-2` asymmetry), no 01/02/03 numbered scaffolding, no hero-metric block. It even respects its own DESIGN.md "No-Eyebrow-Everywhere Rule" (2-3 eyebrows per page, not one over every section). But `redesign-premium/css/style.css` defines `.support-item { border-left: 2px solid var(--color-accent); }` on the Támogatás page — a direct, literal instance of the exact pattern DESIGN.md's own Do's-and-Don'ts explicitly bans ("Don't use border-left/border-right colored stripe accents"). That's not a subtle drift; it's the system violating a rule it wrote for itself. The repeated page-header pattern (eyebrow + h1 [+ p]) copy-pasted verbatim across 5 subpages also reads templated rather than composed.

**Deterministic scan**: `node detect.mjs --json redesign-premium` → exit code 2, **19 findings**.
- **`side-tab` (style.css:625)** — the exact same `.support-item` border-left violation the LLM review flagged independently. Both assessments converge on this one; treat it as confirmed, not a false positive, despite the rule's generic phrasing.
- **`design-system-radius` (style.css:196, 213)** and **`design-system-color` (style.css:283, 643)** — 4 advisory findings for token drift: a `2px` radius and an `rgba(0,0,0,0.2)` / `#e3d2ac` not present in DESIGN.md's documented scale. Minor, but real drift between the spec and the code.
- **`layout-transition` (style.css:611, 701)** — `transition: padding-left` (menu-item hover) and `transition: max-height` (mobile nav) both animate layout-triggering properties instead of `transform`/`opacity`. Small-scale, but a known perf anti-pattern.
- **`overused-font` / `single-font` (all 6 HTML pages, 12 findings total)** — likely a **detector limitation, not a real issue**: the Google Fonts `<link>` loads both Fraunces AND Manrope in one request (`family=Fraunces:...&family=Manrope:...`), and the CSS clearly assigns Manrope to `--font-body` and uses it for all body/label text. The detector's regex appears to only pick up the first `family=` parameter. Discount these 12 findings; the actual typography already pairs two families as DESIGN.md specifies.

**Visual overlays**: not available this session — no browser automation tool was present, so this critique ran on source reading + deterministic scan only, no live-rendered screenshot or in-browser overlay. Take the visual reasoning below as informed source-code inference, not a rendered screenshot.

## Overall Impression

The system is disciplined and genuinely restrained — hairline borders, no resting shadows, a real accent-color rule that's mostly honored. But it optimizes for a *quiet, premium* feel that fights the brand's own confirmed personality ("élénk, energikus, barátságos") and, more concretely, undersells the site's actual job: getting a phone-browsing local resident to tap the phone number. The single biggest opportunity is the homepage hero CTA — "Rendelés" currently routes to a name/email/message form with no phone field, when the whole point of this brand (per PRODUCT.md) is a one-tap phone call.

## What's Working

- `.btn:hover` — ink-to-terracotta background swap, `box-shadow: 0 10px 26px rgba(179,73,47,.28)`, `translateY(-2px)`, tuned with a real custom `cubic-bezier(0.23,1,0.32,1)` — a deliberately-crafted micro-interaction, not a framework default.
- The hairline-and-surface hierarchy (`--color-line` borders, zero resting shadows) is consistently applied across all 6 pages — actual restraint, not an accident of unfinished work.
- The bento grid's `span-2`/`row-2` asymmetry gives the "Kedvenceink" section real visual variety that a uniform card grid wouldn't have.

## Priority Issues

- **[P0] Hero CTA doesn't match the product's stated goal.** `<a href="kapcsolat.html" class="btn">Rendelés</a>` sends the highest-intent visitor to a text-entry contact form with no phone field — directly contradicting PRODUCT.md's core principle ("könnyebb legyen felhívni, ne nehezebb"). **Why it matters**: this is the exact conversion moment the whole site exists for, and it currently detours through the slowest possible path. **Fix**: split into a primary `tel:` "Hívjon most" button plus a secondary, smaller "Írjon nekünk" link to the form. **Suggested command**: `/impeccable clarify`
- **[P0] The design system violates its own explicit rule.** `.support-item { border-left: 2px solid var(--color-accent); }` (style.css:625) is a colored side-stripe accent — confirmed independently by both the design review and the deterministic scanner — and DESIGN.md's own Do's-and-Don'ts explicitly forbids exactly this pattern. **Why it matters**: a design system that visibly breaks its own written rules undermines the whole point of having documented one. **Fix**: replace with a hairline top-rule or a tinted background chip on `.support-item`. **Suggested command**: `/impeccable audit`
- **[P1] Contrast failure on faint text.** `--color-text-faint: #a99d87` on `--color-bg: #faf6ee` computes to roughly 2.5:1 — well under WCAG AA's 4.5:1 floor even accounting for large-text exceptions. Used for menu item counts ("5 tétel") and the homepage pull-quote citation. **Why it matters**: fails accessibility for low-vision users and violates PRODUCT.md's own stated accessibility bar. **Fix**: darken to roughly `#8a7d63` or deeper and re-verify contrast. **Suggested command**: `/impeccable harden`
- **[P1] Touch targets under the 44px mobile minimum.** `.nav-toggle` (~28px) and the icon-only mobile `.header-phone` link (~24px hit area) are exactly the elements a phone-browsing local resident needs to hit reliably, per PRODUCT.md's own audience description. **Why it matters**: undersized targets on the *primary* CTA path for the *primary* audience is a direct hit against the top design principle in PRODUCT.md. **Fix**: expand hit areas to 44×44px minimum (padding, not just visual size). **Suggested command**: `/impeccable adapt`
- **[P2] Contact form has no phone field and no feedback states.** Only `email` is marked `required`; there's no phone input, no inline validation styling, and no visible success/error state anywhere in the CSS or JS. **Why it matters**: for a phone-first audience, a form that doesn't even collect a phone number is backwards, and silent submission erodes trust. **Fix**: add an optional/required phone field, inline validation on blur, and a visible submit-confirmation state. **Suggested command**: `/impeccable harden`

## Persona Red Flags

**Casey (Distracted Mobile User)**: taps the ~28px hamburger icon or the icon-only header phone link one-handed on the go — both are meaningfully under the 44×44pt touch target floor and are exactly where this persona mis-taps and gives up.

**Sam (Accessibility-Dependent User)**: the ~2.5:1 faint-clay text (menu item counts, pull-quote citation) is close to unreadable at low vision; a screen reader also announces "Rendelés" identically on both the phone-intent hero button and the form-intent secondary link, with nothing distinguishing "this one calls" from "this one opens a form."

**Márta, 52, helyi lakos ebédszünetben (project-specific persona, derived from PRODUCT.md)**: opens the homepage on her phone specifically to decide whether to call before her break ends, taps "Rendelés" expecting to dial or order, and instead lands on a name/email/message form — the exact inversion of the "one-tap call" job PRODUCT.md defines as the site's whole reason to exist.

## Minor Observations

- "In salate" as a menu category name is neither correct Italian nor Hungarian — likely meant "Insalate" or a Hungarian equivalent.
- Phone number renders unformatted everywhere (`+36307556846`) instead of the more readable `+36 30 755 6846`.
- Social icons (`href="#"`) are dead links on every page.
- The `data-ph` image-error placeholder fallback (script.js) doesn't preserve aspect ratio in the bento/gallery grids — expect a layout jump once a real image 404s into a placeholder box.
- The ~100-line info-block/payment-note boilerplate is duplicated verbatim across all 5 subpages — a template/include would remove the drift risk each time one copy gets edited without the others.
- Detector-flagged token drift: a `2px` radius and an `rgba(0,0,0,0.2)` / `#e3d2ac` not present in DESIGN.md's documented color/radius scale (style.css:196, 213, 283, 643) — small, but worth reconciling spec vs. code.
- Detector-flagged layout-property transitions: `.menu-item:hover { transition: padding-left }` and the mobile nav's `transition: max-height` both animate layout-triggering properties rather than `transform`/`opacity` — low-risk at this scale, but worth revisiting during a motion pass.
- Detector's 12 "single-font"/"overused-font" findings are very likely a detector limitation (it appears to parse only the first `family=` parameter in the combined Google Fonts URL) rather than a real issue — the CSS does load and use both Fraunces and Manrope as documented.

## Questions to Consider

- What if the hero CTA split into "Hívjon most" (`tel:`) and "Rendelés" (form), resolving the P0 mismatch without adding visual noise?
- What if the quiet, restrained system kept its discipline everywhere *except* the one true conversion action — letting only the phone CTA borrow scale or saturation?
- What if the 6-item nav collapsed to the PRODUCT.md-critical set (Étlap, Kapcsolat, nyitvatartás) with Galéria/Rólunk/Támogatás tucked under a secondary "Több"?
