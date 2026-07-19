---
name: Pinocchio Pizzéria
description: Kemencében sült pizzák és friss paszták Baján — a "Playful Trattoria" vizuális rendszer (redesign-premium, /impeccable bolder óta)
colors:
  warm-ivory: "#faf6ee"
  surface-white: "#ffffff"
  espresso-ink: "#211d16"
  espresso-ink-deep: "#1c1810"
  soft-clay: "#6f6555"
  faint-clay: "#7a6e56"
  kemence-terrakotta: "#b3492f"
  terrakotta-deep: "#8f3823"
  terrakotta-wash: "#f3e2d6"
  olive-branch: "#5b6b45"
  olive-wash: "#e8ebdd"
  hairline: "#e7ddc9"
  hairline-strong: "#d9cbac"
  status-open: "#7fce6d"
  status-closed: "#e4a24c"
typography:
  display:
    fontFamily: "Bevan, Fraunces, Georgia, serif"
    fontSize: "clamp(3rem, 9vw, 6rem)"
    fontWeight: 400
    lineHeight: 1.15
    letterSpacing: "-0.01em"
  headline:
    fontFamily: "Bevan, Fraunces, Georgia, serif"
    fontSize: "clamp(1.9rem, 3vw, 2.6rem)"
    fontWeight: 400
    lineHeight: 1.15
    letterSpacing: "-0.01em"
  title:
    fontFamily: "Bevan, Fraunces, Georgia, serif"
    fontSize: "1.3rem"
    fontWeight: 400
    lineHeight: 1.2
  body:
    fontFamily: "Manrope, Segoe UI, sans-serif"
    fontSize: "16px"
    fontWeight: 400
    lineHeight: 1.65
  label:
    fontFamily: "Manrope, Segoe UI, sans-serif"
    fontSize: "0.78rem"
    fontWeight: 700
    letterSpacing: "0.04em"
rounded:
  sm: "6px"
  md: "14px"
  lg: "22px"
  pill: "999px"
components:
  button-primary:
    backgroundColor: "{colors.espresso-ink}"
    textColor: "{colors.surface-white}"
    rounded: "{rounded.pill}"
    padding: "15px 30px"
  button-primary-hover:
    backgroundColor: "{colors.kemence-terrakotta}"
    textColor: "{colors.surface-white}"
    rounded: "{rounded.pill}"
    padding: "15px 30px"
  button-outline:
    backgroundColor: "transparent"
    textColor: "{colors.espresso-ink}"
    rounded: "{rounded.pill}"
    padding: "15px 30px"
  info-card:
    backgroundColor: "{colors.surface-white}"
    rounded: "{rounded.md}"
    padding: "36px"
  bento-card:
    backgroundColor: "{colors.surface-white}"
    rounded: "{rounded.lg}"
  nav-link:
    textColor: "{colors.soft-clay}"
    padding: "8px 14px"
---

# Design System: Pinocchio Pizzéria

## 1. Overview

**Creative North Star: "The Playful Trattoria"**

A rendszer korábbi neve "The Quiet Trattoria" volt: visszafogott, sok levegőt hagyó felület, egyetlen ritka akcentussal. Egy `/impeccable critique` kör kimutatta, hogy ez a nyelv csak részben oldja fel a PRODUCT.md-ben rögzített márka-személyiséget (*"élénk, energikus, barátságos"*), utána egy `/impeccable bolder` kör (2026-07-19) végigvitte a tényleges feloldást: nagyobb, magabiztosabb tipográfia, két teljes márkaszín (terrakotta ÉS olíva) valódi Committed felületként, és egy tömör jelvény-eyebrow a ritkított nagybetűs "kicker" helyett. A rendszer innentől **"Playful Trattoria"**: még mindig hiteles olasz, még mindig nem papírtextúrás/nosztalgikus, de a korábbinál jóval kevésbé visszafogott.

A színstratégia a korábbi "3 kijelölt Committed-pont Restrained alapon" modellről egy szélesebb, de továbbra is fegyelmezett rendszerre bővült: a terrakotta és az olíva **mindketten** valódi, teli felületként jelennek meg több helyen (lásd Designated-Moment Rule lent), nem csak akcentusként. Ez nem az One Accent Rule feladása — az olíva máig másodlagos, sosem versenyez a terrakottával CTA-kon vagy navigáción —, hanem annak elismerése, hogy két fegyelmezetten használt márkaszín is lehet "Restrained" a szó named-strategy értelmében, ha a használatuk szabályokhoz kötött, nem ad hoc.

A rendszer explicit módon **elutasítja**: a papírtextúrás/kézzel-rajzolt "trattoria" nyelvet (a `redesign` mappa iránya — más regiszter, nem ennek a dokumentumnak a tárgya), és a hideg, személytelen SaaS-minimalizmust (nincs gradiens szöveg, nincs generikus hero-metrika sablon).

**Key Characteristics:**
- Ivory alapszín (nem fehér, nem bézs-sablon) + terrakotta ÉS olíva, mindkettő valódi, kijelölt felületként használva
- Bevan (vaskos szár-szerif display, vintage olasz csomagolás/matchbox-felirat karakterrel) + Manrope (humanista sans) páros — kontrasztos tengelyen, meleg, de precíz
- Bento-rácsos kártyák a hagyományos egyenletes rácsok helyett
- Tömör jelvény-eyebrow (terrakotta pirula, fehér szöveg) a ritkított nagybetűs "kicker" minta helyett
- Hajszálvonalak és felszín-váltás adja a hierarchiát, finom, meleg tónusú árnyékok emelik ki az interaktív elemeket
- Staggered scroll-reveal + finom, teljesítmény-barát hero-parallax — mozgás mindenütt céllal, sosem dísznek

## 2. Colors

Meleg, elefántcsont-alapú paletta egyetlen magabiztos terrakotta akcentussal — a "Restrained" színstratégia egy named accent-tel.

### Primary
- **Kemence Terrakotta** (#b3492f): az egyetlen akcentusszín — CTA gombok hover-állapota, aktív nav-jelző, ár-kiemelés az étlapon, "eyebrow" feliratok. Szándékosan ritka; a ritkasága maga a hatás.
- **Terrakotta Mély** (#8f3823): a Kemence Terrakotta hover/active sötétebb változata.
- **Terrakotta Mosás** (#f3e2d6): halvány akcens-háttér kiemelt dobozokhoz (pl. támogatási kiemelő blokk, bento "plain" kártyák).

### Secondary
- **Olívaág** (#5b6b45): apró, dekoratív felület-szín — pl. a "Kedvenceink" rács bor-kártyájának ikon-jelvénye (`.icon-badge.olive`). Egy `/impeccable ui-ux-pro-max` kör után a korábbi teli-olíva bento-kártya megszűnt (túl "SaaS-dobozos" hatást keltett egy étteremnél); az Olívaág visszatért a rendszer eredeti, valóban ritka dekoratív szerepéhez. Sosem CTA-kon vagy navigáción.
- **Olíva Mosás** (#e8ebdd): az Olívaág halvány háttér-változata — most valódi szekció-felület (`.section-surface`, pl. a Kezdőlap "Friss olasz alapanyagok" blokkja és minden oldal záró partnerlogó/fizetés-blokkja), nem csak egy rejtett bento-kártya háttere. Szöveg rajta 4.65–14.6:1 kontraszttal (WCAG AA).

### Neutral
- **Meleg Elefántcsont** (#faf6ee): az oldal alapháttere — nem fehér, nem AI-sablon bézs; a projekt saját meleg tónusa.
- **Felszín Fehér** (#ffffff): kártyák, form-mezők, lábléc-logó háttere — a legvilágosabb réteg.
- **Espresso Tinta** (#211d16): elsődleges szövegszín.
- **Espresso Tinta Mély** (#1c1810): címsorok színe — az Espresso Tintánál egy árnyalattal sötétebb.
- **Lágy Agyag** (#6f6565): másodlagos szövegszín (leírások, alcímek).
- **Halvány Agyag** (#7a6e56): a leghalványabb szöveg-tónus — kategória-számlálók, apró metaadatok. Kézzel újraszámolva ≈4.65:1 a Meleg Elefántcsont / fehér háttéren, WCAG AA-kompatibilis. Két korábbi érték is megbukott: az eredeti #a99d87 (~2.5:1), majd egy első `/impeccable harden` kísérlet #8a7d63-ra javította, ami a dokumentált ≈4.6:1 állítás ellenére a valóságban csak ~3.75:1-et ért el — egy `/impeccable critique` újrafutás derítette ki, ezt a második kört a tényleges érték rögzíti.
- **Hajszálvonal** (#e7ddc9): alapértelmezett elválasztó vonal kártyák és szekciók között.
- **Hajszálvonal Erős** (#d9cbac): hangsúlyosabb elválasztó (pl. menü-kategória fejléc alatt).

### Functional
- **Nyitva-zöld** (#7fce6d): kizárólag a hero élő nyitvatartás-jelzőjének "most nyitva" állapotához.
- **Zárva-borostyán** (#e4a24c): ugyanennek a jelzőnek a "most zárva" állapotához.

Ez a két szín kifejezetten funkcionális állapotjelzés (nyitva/zárva), nem dekoratív márka-akcentus — ezért nem esik a One Accent Rule alá, hasonlóan ahhoz, ahogy egy hibaüzenet piros színe sem "második akcentus". Ne használd őket máshol, és ne vezess be újabb funkcionális színt anélkül, hogy itt dokumentálnád.

### Named Rules
**The One Accent Rule.** A Kemence Terrakotta az egyetlen telített *dekoratív, CTA/navigáció-szintű* szín az egész rendszerben — gombok, aktív nav-jelző, linkek hover-je mind terrakotta, sosem olíva vagy más szín. Az Olívaág teljes felületként megjelenhet (lásd Designated-Moment Rule), de kizárólag a lent felsorolt, kijelölt helyeken, sosem interakciós elemen. (A fenti Functional színek ettől függetlenek — azok állapotot jeleznek, nem a márkát.)

**The Designated-Moment Rule.** A terrakotta alapból Restrained módban él (szöveg, ikon, hover, vékony hangsúly), de kijelölt pontokon teljes, Committed felületként jelenik meg: a Kezdőlap idézet-szekciója (`.pull-quote-section`), minden oldal záró CTA-ja (`.closing-cta`), és a hero/page-header eyebrow-jelvény (`.eyebrow`) minden oldalon. Az olíva `.section-surface` háttérként (halvány mosásban, nem telített felületként) jelenik meg — lásd fent.

**A "Kedvenceink" bento-rács NEM a Designated-Moment felülete.** Egy `/impeccable ui-ux-pro-max` kör kifejezetten emiatt alakította át: a rács most fotó-vezérelt (valódi étel-/tészta-fotók) és letisztult ikon-kártyás (`.bento-card.icon-card` — fehér felület, hajszálvonal, kis kerek ikon-jelvény, sok belső padding), NEM teli-színű dobozokkal — mert azok "SaaS feature-kártya" hatást keltettek egy étterem-oldalon. Ha valaki új teli-színű bento-kártyát akarna ide visszahozni, ezt a döntést előbb felül kell vizsgálni.

Ez a lista rögzített; új teli-színű felület bevezetése előtt mindig kérdés, hogy tényleg indokolja-e egy ilyen szintű energikus pillanat, nem csak "mert jól néz ki".

## 3. Typography

**Display Font:** Bevan (Fraunces, majd Georgia fallback)
**Body Font:** Manrope (Segoe UI fallback)

**Character:** A Bevan vaskos szár-szerif, egyetlen súlyban (400) — a betűformák maguk hordozzák a "boldot", nincs szükség 600+ súlyra. Vintage olasz csomagolás/matchbox-felirat karaktere van, magabiztosabb és energikusabb, mint a korábbi Fraunces, de nem esik bele a script/kézzel-rajzolt "rusztikus trattoria" regiszterbe (az tudatosan el van utasítva, lásd Overview). A Manrope tiszta, geometrikus-humanista sans, ami olvashatóságot és modern precizitást ad. A két család kontrasztos tengelyen párosított (vaskos szár-szerif + humanista sans), nem két hasonló sans keveréke. (A Fraunces korábbi kandidátus volt, de a márka-regiszter reflex-elutasított betűtípus-listájának #1 helyén állt — a Bevan erre is válasz.)

**Egy súly, nem több:** mivel a Bevan csak 400-as súlyban létezik, MINDEN h1–h4 (és minden display-font-ot használó elem, pl. `.pull-quote p`) `font-weight: 400`-at kér — sosem 600+-at, mert az böngészőnkénti szintetikus/ál-bold torzítást okozna egy olyan fonton, aminek nincs valódi vastagabb metszete.

### Hierarchy
- **Display** (400, `clamp(3rem, 9vw, 6rem)`, line-height 1.15): hero címsor, kizárólag a Kezdőlapon — a legnagyobb tipográfiai pillanat az oldalon.
- **Headline** (400, `clamp(1.9rem, 3vw, 2.6rem)`, line-height 1.15): szekció-címek (`h2`).
- **Title** (400, 1.3rem–1.75rem, line-height 1.2): kártya- és alszekció-címek (`h3`).
- **Body** (400, 16px, line-height 1.65): törzsszöveg; max. 65–75ch sortávon belül tartva a hosszabb bekezdéseknél.
- **Label** (700, 0.78rem, letter-spacing 0.04em): tömör, terrakotta pirula-jelvény (`.eyebrow`) — lásd lent.

### Named Rules
**The Badge, Not Kicker Rule.** Az "eyebrow" NEM ritkított nagybetűs kis-kapitális felirat többé (az volt a korábbi, 2023-as AI-sablon mintázatú "kicker"), hanem egy tömör, kerekített terrakotta pirula fehér szöveggel — vizuálisan rokon a hero `.hero-status` jelvénnyel, de saját, megkülönböztethető formanyelvvel. Ez a váltás egyszerre old fel egy AI-slop jelet ÉS ad valódi színenergiát a fejlécek fölé. Az elhelyezési fegyelem megmaradt: szakasz-szinten jelenik meg, egy oldalon belül maximum 2-3 helyen — nem minden kártya vagy blokk fölött.

## 4. Elevation

A rendszer alapból lapos (hajszálvonalak és felszín-váltás adja a hierarchiát, nem árnyék), de a felhasználói döntés alapján **finom, meleg tónusú emelt árnyékok engedélyezettek** interaktív elemeken: gombok hover-állapotban, kiemelt bento-kártyák hover-állapotban. Az árnyék soha nem alapállapotban jelenik meg — mindig állapotváltás (hover/focus) válasza, sosem statikus díszítés.

### Shadow Vocabulary
- **CTA hover-glow** (`box-shadow: 0 10px 26px rgba(179, 73, 47, 0.28)`): elsődleges gomb hover-állapotában, a Kemence Terrakotta tónusában.
- **Kártya hover-emelés** (`box-shadow: 0 16px 32px rgba(33, 29, 22, 0.14)`): bento-kártyák és galéria-elemek hover-állapotában, semleges espresso-tónusban.

### Named Rules
**The Response-Only Shadow Rule.** Árnyék csak `:hover` vagy `:focus-visible` állapot válaszaként jelenhet meg. Nyugalmi állapotban minden felszín lapos; a hajszálvonal és a felszín-váltás adja a strukturális mélységet.

## 5. Components

### Buttons
- **Shape:** teljesen lekerekített pill (999px sugár).
- **Primary:** Espresso Tinta háttér, Felszín Fehér szöveg, 15px/30px padding; hover-en Kemence Terrakotta háttérre vált, `translateY(-2px)` emeléssel és CTA hover-glow árnyékkal.
- **Hover / Focus:** 160-220ms, egyedi `cubic-bezier(0.23, 1, 0.32, 1)` ease-out; `:active` állapotban `scale(0.97)`.
- **Secondary / Outline:** átlátszó háttér, Espresso Tinta szöveg és keret (Hajszálvonal Erős, 1px); hover-en tömör Espresso Tinta háttérre vált.

### Cards / Bento kártyák
- **Corner Style:** 14px (info-kártyák) vagy 22px (bento- és galéria-kártyák).
- **Background:** Felszín Fehér, 1px Hajszálvonal keret.
- **Shadow Strategy:** nyugalmi állapotban nincs árnyék; hover-en Kártya hover-emelés (lásd Elevation).
- **Internal Padding:** 28-36px a tartalmi kártyákon.
- **Signature Component — Bento Grid:** aszimmetrikus rács (`span-2`, `row-2` módosítók), fotó-kártyák sötét gradiens-átfedéssel és alsó címkével (kategória + név).
- **Icon Card (`.bento-card.icon-card`):** fehér felület, hajszálvonal keret, 40px/36px belső padding, egy 44px kerek ikon-jelvény (Terrakotta Mosás vagy Olíva Mosás háttér, a megfelelő telített szín az ikonon), rövid `h3` cím, egy mondat leírás. A "Kedvenceink" rács nem-fotós elemeihez — kép nélküli tétel esetén ez a helyes minta, NEM egy teli-színű "plain" doboz.

### Inputs / Fields
- **Style:** Hajszálvonal Erős keret, Felszín Fehér háttér, 14px/16px padding, 6px sugár.
- **Focus:** keret Kemence Terrakotta-ra vált, 3px Terrakotta Mosás glow (`box-shadow: 0 0 0 3px var(--color-accent-soft)`).

### Hero Status Badge
- **Purpose:** élő nyitva/zárva állapotjelző a hero tartalom tetején, a nyitvatartás-adatokból számolva (JS, `hero-status`) — a hívás-előtti gyors infókeresést szolgálja.
- **Style:** pill alakú jelvény, `rgba(20, 14, 8, 0.45)` sötét háttér, 1px fehér 30%-os keret; 8px pöttyel (Nyitva-zöld / Zárva-borostyán) balra.
- **Motion:** a hero szöveg lépcsőzött belépő animációjának első eleme (0ms delay); progresszív feljavítás — JS nélkül rejtve marad (`hidden`), sosem jelenik meg hibás/üres állapotban.

### Partner logók + Fizetés-jegyzet kártya
- **Purpose:** a partnerlogók (Chilli Baja, Pinocchio) egy önálló, kártya-keret nélküli sáv (`partners-strip`) formájában közvetlenül a SZÉP-kártyás fizetési tájékoztató fölött jelennek meg — mindkettő "harmadik fél / bizalmi jel" típusú tartalom, ezért egy vizuális egységként, közvetlenül egymás felett ülnek a bento-grid és a záró CTA között.
- **Style:** `partners-strip img` — 40px magasság, 0.85 opacitás, középre igazítva, 32px gap. Alatta `images/szep_kartyak.png` — az OTP, K&H és MBH SZÉP kártya logóit tartalmazó, átlátszó hátterű kép, 60px magasságra korlátozva. (A SZÉP-kártya kép korábban hiányzott, ezért egy ideiglenes szöveg-badge megoldás helyettesítette; a végleges kép feltöltése után visszaállt az eredeti img-alapú megoldás.)

### Navigation
- **Style:** sticky fejléc, félig átlátszó Meleg Elefántcsont háttér `backdrop-filter: blur(10px)`-rel; nav-linkek Lágy Agyag színűek, hover/active-on Espresso Tinta Mélyre váltanak, alattuk középről induló, Kemence Terrakotta aláhúzás-animáció (`scaleX` 0→1, 220ms ease-out).
- **Mobile:** hamburger-ikon, lenyíló panel `max-height` átmenettel; linkek egymás alatt, teljes szélességű aláhúzással.

### Lábléc
- **Purpose:** letisztult, két elemre redukált lábléc — márkanév balra, social ikonok jobbra. Az oldalankénti navigációs linkek (Kezdőlap/Étlap/stb.) törölve lettek innen, mivel a fő fejléc-navigáció már lefedi ugyanezt, a lábléces duplikáció felesleges volt. A partnerlogók sem itt vannak — lásd fentebb, a `partners-strip`-nél.
- **Style:** `social-icons a` — 44×44px kör alakú linkek, `rgba(255,255,255,0.08)` háttérrel és `rgba(255,255,255,0.18)` kerettel (sötét-lábléc-változat), hover-en Kemence Terrakotta háttérre vált.

## 6. Do's and Don'ts

### Do:
- **Do** tarts egyetlen telített *CTA/navigáció-szintű* akcentust (Kemence Terrakotta, #b3492f) — gombok, aktív nav, linkek hover-je mind ebből a színből jöjjön.
- **Do** használj hajszálvonalat (1px, Hajszálvonal #e7ddc9) elsődleges elválasztóként; árnyékot csak hover/focus válaszként.
- **Do** párosítsd a Bevan display-fontot Manrope törzsszöveggel — kontrasztos tengelyen (vaskos szár-szerif + humanista sans), sosem két hasonló sans-t egymás mellett.
- **Do** kérj `font-weight: 400`-at minden Bevan-t használó elemen — a fontnak nincs 600+ metszete.
- **Do** korlátozd az "eyebrow" jelvényeket szakasz-szintre, oldalanként 2-3 előfordulásra.
- **Do** biztosíts `prefers-reduced-motion` alternatívát minden animációhoz (crossfade vagy azonnali átmenet).

### Don't:
- **Don't** vezess be harmadik telített akcentusszínt a Kemence Terrakotta és az Olívaág mellé.
- **Don't** használj olívát CTA-n, gombon vagy navigáción — az kizárólag terrakotta.
- **Don't** használj `border-left`/`border-right` színes csík-akcentust kártyákon vagy listaelemeken.
- **Don't** használj gradiens-szöveget (`background-clip: text` gradienssel) — a hangsúlyt súllyal vagy mérettel add, nem gradienssel.
- **Don't** tegyél eyebrow-jelvényt MINDEN szekció fölé — a forma megváltozott (kicker → pirula), de a "ne mindenhol" fegyelem nem.
- **Don't** keverd a papírtextúrás/kézzel-rajzolt "trattoria" nyelvet (a `redesign` mappa stílusa) ebbe a rendszerbe — a két irány külön regiszter, nem keverendő egy oldalon belül.
- **Don't** alkalmazz árnyékot nyugalmi állapotban — a "Response-Only Shadow Rule" szerint árnyék csak hover/focus válasza lehet.
