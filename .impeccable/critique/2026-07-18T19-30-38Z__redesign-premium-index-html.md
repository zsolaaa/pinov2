---
target: redesign-premium/index.html
total_score: 34
p0_count: 1
p1_count: 2
timestamp: 2026-07-18T19-30-38Z
slug: redesign-premium-index-html
---
## Design Health Score

| # | Heuristic | Score | Key Issue |
|---|-----------|-------|-----------|
| 1 | Visibility of System Status | 4/4 | Busy state + focus-managed success confirmation on submit |
| 2 | Match Between System and Real World | 4/4 | Authentic Hungarian copy, standard icons |
| 3 | User Control and Freedom | 2/4 | Success state permanently hides the form with no way back except reload |
| 4 | Consistency and Standards | 4/4 | Identical info-card/footer/nav pattern across all 6 pages |
| 5 | Error Prevention | 3/4 | Email validated on blur + submit; phone/name unguarded but low-risk |
| 6 | Recognition Rather Than Recall | 4/4 | Hours/phone/address repeated on every page |
| 7 | Flexibility and Efficiency | 3/4 | `tel:` links everywhere; no other power-user affordances needed at this scale |
| 8 | Aesthetic and Minimalist Design | 3/4 | Clean execution, but the "Quiet Trattoria" vs. "élénk/energikus" brief tension is still unresolved |
| 9 | Error Recovery | 3/4 | Email error copy is specific and actionable |
| 10 | Help and Documentation | 3/4 | Baseline, appropriate for site size |
| **Total** | | **34/40** | **Good — address weak areas, solid foundation** |

**Trend: 24 → 34** (+10 since the clarify→adapt→audit→harden→polish pass)

## Anti-Patterns Verdict

**Largely clean — no new AI slop introduced by the fix pass.**

**LLM assessment**: No gradient text, no fake hero metrics, no numbered scaffolding, no glassmorphism-as-decoration (the header's `backdrop-filter: blur(10px)` is functional sticky-nav chrome). The `.support-item` border-left stripe is confirmed genuinely removed and replaced with a bottom-border under the heading only. Eyebrows stay within budget. Bento grids remain asymmetric, not templated.

**Deterministic scan**: `detect.mjs --json redesign-premium` → exit 2, **13 findings** (down from 19). Verified against the three specific prior findings:
- **`side-tab` border-left violation**: gone — zero `border-left` declarations anywhere in the CSS.
- **`design-system-radius` / `design-system-color` drift**: gone — no longer flagged.
- **`broken-image` false positive** (from the literal "`<img>`" text in a JS comment): gone — comment reworded, no longer triggers.

Remaining 13: 12 are the same **confirmed detector limitation** (it only parses the first `family=` parameter in the combined Google Fonts URL, so it can't see that Manrope is also loaded and used for all body/label text — verified directly against the CSS, `--font-body: "Manrope"` applied at 4+ selectors). The 13th is the previously-accepted `max-height` transition on the mobile nav accordion (`style.css:762`) — a deliberate, low-risk trade-off, not new.

**Visual overlays**: not available this session — no browser automation tool present, CLI scan + source reading only.

## Overall Impression

The fix pass genuinely worked: the CTA split reaches both the hero and the étlap page, touch targets are verifiably 44px+, and all three previously-flagged code-quality violations (border-left, token drift, the comment-triggered false positive) are gone with no regressions. But **the harden pass's own headline claim didn't hold up**: `--color-text-faint` was "fixed" to `#8a7d63`, and DESIGN.md now asserts this passes AA at ≈4.6:1 — it doesn't. The actual contrast is **≈3.75:1**, still a WCAG AA failure. That's the one finding worth treating as urgent, precisely because the documentation says it's already resolved.

## What's Working

- The hero CTA split (`Hívjon most` `tel:` + `Írjon nekünk`) is correctly applied in both places that matter (hero and étlap-bottom) — a real functional fix, not a cosmetic one.
- Touch-target fix is thorough and verified in the CSS: `.header-phone` (`min-height: 44px`), `.nav-toggle` (44×44), `.social-icons a` (44×44).
- The form success flow (busy-state button → focus-managed confirmation panel with a phone fallback) is a well-built, honest simulated-backend pattern for a site with no real server.

## Priority Issues

- **[P0] The contrast fix didn't actually pass AA.** `--color-text-faint: #8a7d63` on `#faf6ee`/white computes to **≈3.75:1**, not the ≈4.6:1 DESIGN.md currently claims — still below the 4.5:1 AA floor for the small text it's used on (menu category counts, pull-quote citation). **Why it matters**: the documentation now asserts a fix that isn't real, which is worse than an undocumented gap — the next person trusts the number. **Fix**: darken to `#7a6e56` (verified ≈4.65:1 against `#faf6ee`) and correct the DESIGN.md claim to match. **Suggested command**: `/impeccable harden`
- **[P1] Contact-form success state has no way back.** `contactForm.hidden = true` on success with no visible undo — a customer who wants to send a second message or fix a typo has to reload the page. **Why it matters**: violates user control/freedom (Heuristic 3, scored 2/4). **Fix**: add a small "Új üzenet küldése" link inside `.form-success` that un-hides the form and refocuses the first field. **Suggested command**: `/impeccable polish`
- **[P1] Every page's last visual beat is the muted SZÉP-kártya payment note.** For a brand brief calling for "élénk, energikus, barátságos," ending each page on flat administrative fine print undercuts the peak-end rule right before the reader might decide to call. **Fix**: reorder so the payment note isn't the final element, or close with a short warm line + repeated phone CTA instead. **Suggested command**: `/impeccable layout`
- **[P2] Dead social links.** Instagram/Facebook icons still use `href="#"`. **Fix**: real URLs, or omit the icons until they exist. **Suggested command**: `/impeccable harden` (needs real URLs from the user first)
- **[P3] Standing brand-tension gap (not a regression).** The system still reads "Quiet Trattoria," not the confirmed "élénk, energikus" personality — this was never in scope for the last fix round and remains the single biggest strategic opportunity. **Suggested command**: `/impeccable bolder` or `/impeccable colorize`

## Persona Red Flags

**Sam (Accessibility)**: hits the confirmed ≈3.75:1 contrast on menu-item counts and the pull-quote citation — still fails AA despite the prior fix attempt.

**Casey (Mobile User)**: below 760px, `.header-phone span.phone-text { display: none; }` leaves only an icon in the header — the actual phone number isn't visible without scrolling to the footer.

**Marika, 62, ebédszünetben napfényben telefonozó helyi lakos** *(project persona)*: exactly the reader who'd fail to read the faint category counts/citation text in bright daylight, and who'd want to correct a mistyped email without losing her already-typed message.

## Minor Observations

`.map-embed iframe`'s `filter: sepia(0.08) saturate(0.95)` is a nice subtle brand-match, not a slop tell · the placeholder-image fix only freezes dimensions if `getBoundingClientRect()` is non-zero at error time, so a lazy/below-fold image could still jump before it's ever measured · `rolunk.html` has no CTA button in the page body itself, only header/footer phone — a small missed conversion opportunity on the page most likely to build trust before a call.

## Questions to Consider

- What if the payment-note and compliance content were demoted to smaller print near the footer, freeing every page to end on a warmer, more energetic beat?
- What if the terracotta accent made one deliberate appearance per page as a background wash (not just text/hover), nudging toward "energetic" without breaking the One Accent Rule?
- What if the success-state "send another message" link doubled as the moment to finally resolve the brand-tension gap — a warmer, more personal confirmation line instead of a purely administrative one?
