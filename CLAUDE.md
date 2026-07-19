# CLAUDE.md

## Design Context

Ez a projekt a Pinocchio Pizzéria (Baja) marketing/bemutatkozó weboldala. Teljes stratégiai és vizuális kontextusért lásd `PRODUCT.md` és `DESIGN.md`.

- **Regiszter:** brand (marketing/landing — a design maga a termék célja)
- **Célközönség:** helyi lakosok, telefonon böngészve, gyors infókeresés (nyitvatartás, étlap, telefonszám) hívás/betérés előtt
- **Elsődleges cél:** telefonos asztalfoglalás/rendelés — a telefonszám és cím legyen mindig egy koppintásra elérhető
- **Márka-személyiség:** élénk, energikus, barátságos, de hitelesen olasz

### Projektstruktúra

Ez a repo az **egyetlen élő site-verzió** — a GitHubbal szinkronizált, publikálásra szánt változat. Minden munka itt történik.

- `index.html`, `etlap.html`, `galeria.html`, `kapcsolat.html`, `rolunk.html`, `tamogatas.html` — az oldalak
- `css/`, `js/` — stílusok és szkriptek
- `images/` — minden kép WebP formátumban, web-méretre optimalizálva

Korábban létezett két párhuzamos design-irány (`redesign/` trattoria és `redesign-premium/` prémium minimalista). Ezek **archiválva** lettek a `../../Pinocchio-archiv/` mappába, és nem képezik részét az aktív munkának. Ha valamelyikből ötlet kell, onnan hozható vissza.

### Nyitott design-kérdés

A jelenlegi vizuális nyelv visszafogottabb, mint a PRODUCT.md-ben rögzített "élénk/energikus" márka-személyiség — ez tudatosan dokumentált feszültség, amit egy következő design-kör (pl. `/impeccable colorize` vagy `/impeccable bolder`) hivatott feloldani.

Lásd `PRODUCT.md`-t a teljes stratégiai kontextusért (célok, anti-referenciák, accessibility) és `DESIGN.md`-t a vizuális rendszerért (színek, tipográfia, komponensek).
