document.addEventListener("DOMContentLoaded", function () {
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.querySelector(".main-nav");

  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var isOpen = nav.classList.toggle("open");
      toggle.classList.toggle("open", isOpen);
      toggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });
  }

  // Placeholder fallback amíg a végleges fotók nincsenek a megfelelő néven.
  // A hibázó kép tényleges méretét lefagyasztjuk a placeholderen, hogy
  // 404 esetén ne ugorjon össze a bento/galéria rács (layout-jump elkerülése).
  document.querySelectorAll("img[data-ph]").forEach(function (img) {
    img.addEventListener("error", function () {
      var rect = img.getBoundingClientRect();
      var div = document.createElement("div");
      div.className = "placeholder-img";
      div.textContent = img.getAttribute("data-ph");
      if (rect.width > 0) { div.style.width = rect.width + "px"; }
      if (rect.height > 0) { div.style.height = rect.height + "px"; }
      img.replaceWith(div);
    });
  });

  // Staggered scroll-reveal: minden [data-reveal-group] konténeren belül
  // sorban indexeljük a gyerekeket, hogy a CSS --i alapján lépcsőzve jelenjenek meg.
  document.querySelectorAll("[data-reveal-group]").forEach(function (group) {
    Array.prototype.forEach.call(group.querySelectorAll("[data-reveal]"), function (el, i) {
      el.style.setProperty("--i", i);
    });
  });

  // Étlap: minden kategórián belül indexeljük a tételeket, hogy a CSS --mi
  // alapján lépcsőzve ússzanak be, amikor a kategória láthatóvá válik.
  // A késleltetést ~12 tételnél lekapjuk, hogy hosszú listán ne legyen vontatott.
  document.querySelectorAll(".menu-category").forEach(function (cat) {
    Array.prototype.forEach.call(cat.querySelectorAll(".menu-item"), function (item, i) {
      item.style.setProperty("--mi", Math.min(i, 12));
    });
  });

  // Fejléc: finom árnyék/tömörebb háttér, ha már görgettünk pár pixelt.
  // rAF-fel tördelve, passzív listenerrel - nem terheli a görgetést.
  var siteHeader = document.querySelector(".site-header");
  if (siteHeader) {
    var headerTicking = false;
    var applyHeaderState = function () {
      siteHeader.classList.toggle("scrolled", window.scrollY > 8);
      headerTicking = false;
    };
    applyHeaderState();
    window.addEventListener("scroll", function () {
      if (!headerTicking) {
        window.requestAnimationFrame(applyHeaderState);
        headerTicking = true;
      }
    }, { passive: true });
  }

  var revealEls = document.querySelectorAll("[data-reveal]");
  if ("IntersectionObserver" in window && revealEls.length) {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -60px 0px" }
    );
    revealEls.forEach(function (el) { observer.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add("is-visible"); });
  }

  // Kapcsolat-form: inline email-validáció + látható visszaigazolás.
  // Nincs backend, ezért a "sikeres küldés" itt szimulált - de a felhasználó
  // felé adott visszajelzés (state, üzenet, fókusz-kezelés) valós.
  var contactForm = document.getElementById("contact-form");
  if (contactForm) {
    var emailInput = document.getElementById("email");
    var emailError = document.getElementById("email-error");
    var successPanel = document.getElementById("form-success");
    var submitBtn = contactForm.querySelector("button[type='submit']");
    var resetBtn = document.getElementById("form-reset-btn");
    var submitBtnDefaultText = submitBtn.textContent;

    emailInput.addEventListener("blur", function () {
      if (emailInput.value && !emailInput.checkValidity()) {
        emailInput.setAttribute("aria-invalid", "true");
        emailError.hidden = false;
      } else {
        emailInput.removeAttribute("aria-invalid");
        emailError.hidden = true;
      }
    });

    contactForm.addEventListener("submit", function (event) {
      event.preventDefault();

      if (!emailInput.checkValidity()) {
        emailInput.setAttribute("aria-invalid", "true");
        emailError.hidden = false;
        emailInput.focus();
        return;
      }

      emailInput.removeAttribute("aria-invalid");
      emailError.hidden = true;
      submitBtn.setAttribute("aria-busy", "true");
      submitBtn.textContent = "Küldés folyamatban…";

      window.setTimeout(function () {
        contactForm.hidden = true;
        successPanel.hidden = false;
        successPanel.focus();
      }, 500);
    });

    if (resetBtn) {
      resetBtn.addEventListener("click", function () {
        contactForm.reset();
        submitBtn.removeAttribute("aria-busy");
        submitBtn.textContent = submitBtnDefaultText;
        successPanel.hidden = true;
        contactForm.hidden = false;
        emailInput.focus();
      });
    }
  }

  // Élő nyitva/zárva jelző a hero szekcióban - a nyitvatartás-lista adatai alapján
  // (jelenleg minden nap 11:00-22:00), hogy hívás előtt azonnal látszódjon,
  // van-e értelme most próbálkozni.
  var heroStatus = document.getElementById("hero-status");
  if (heroStatus) {
    var OPEN_HOUR = 11;
    var CLOSE_HOUR = 22;
    var now = new Date();
    var hour = now.getHours() + now.getMinutes() / 60;
    var isOpen = hour >= OPEN_HOUR && hour < CLOSE_HOUR;
    var statusText = heroStatus.querySelector(".hero-status-text");

    heroStatus.classList.toggle("is-closed", !isOpen);
    if (isOpen) {
      statusText.textContent = "Most nyitva — ma " + CLOSE_HOUR + ":00-ig";
    } else if (hour < OPEN_HOUR) {
      statusText.textContent = "Jelenleg zárva — ma " + OPEN_HOUR + ":00-től várjuk";
    } else {
      statusText.textContent = "Jelenleg zárva — holnap " + OPEN_HOUR + ":00-től várjuk";
    }
    heroStatus.hidden = false;
  }

  // Finom, teljesítmény-barát hero parallax - csak transform, rAF-fel tördelve.
  var heroImg = document.querySelector(".hero-bg-img");
  var prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // ---------- GYIK: lenyíló animáció ----------
  // A natív <details> azonnal ugrik nyitáskor, animáció nélkül. Itt átvesszük
  // a nyitás vezérlését, de a nyitott állapotot továbbra is az `open`
  // attribútum tartja - így a szemantika, a billentyűzet-kezelés és a
  // képernyőolvasók viselkedése érintetlen marad. Ha a szkript nem fut le,
  // a harmonika natívan működik tovább, csak animáció nélkül.
  var faqItems = document.querySelectorAll(".faq-item");
  var FAQ_EASE = "cubic-bezier(0.23, 1, 0.32, 1)";

  Array.prototype.forEach.call(faqItems, function (item) {
    var summary = item.querySelector("summary");
    var answer = item.querySelector(".faq-answer");
    if (!summary || !answer || !answer.animate) return;

    var running = null;
    // Záráskor az `open` attribútum csak az animáció végén kerül le, tehát
    // közben az attribútum még `true`. Ezt az egyetlen átmeneti fázist
    // jelöljük külön; minden más esetben az attribútum az igazság forrása,
    // így nem tud tartósan szétcsúszni a két állapot.
    var closing = false;

    summary.addEventListener("click", function (e) {
      // Csökkentett mozgás esetén maradjon a natív, azonnali viselkedés.
      if (prefersReduced) return;

      e.preventDefault();

      // A pillanatnyi magasságot még az animáció megszakítása előtt mérjük,
      // hogy félbeszakításkor onnan folytassa, ahol tart - ne ugorjon.
      var current = answer.getBoundingClientRect().height;
      if (running) {
        running.cancel();
        running = null;
      }

      // Záró animáció közbeni kattintás = a felhasználó vissza akar nyitni.
      var shouldOpen = closing || !item.open;
      closing = false;

      // A belső margót együtt kell animálni a magassággal. border-box
      // méretezésnél egy elem nem lehet alacsonyabb a saját belső margójánál,
      // így a magasság önmagában a padding értékénél megáll - záráskor ez
      // egy jól látható akadást okozott a mozgás végén.
      var pad = window.getComputedStyle(answer).paddingBottom;

      if (shouldOpen) {
        item.open = true;
        var full = answer.offsetHeight;
        running = answer.animate(
          [
            { height: current + "px", paddingBottom: "0px", opacity: 0, transform: "translateY(-6px)" },
            { height: full + "px", paddingBottom: pad, opacity: 1, transform: "translateY(0)" }
          ],
          { duration: 260, easing: FAQ_EASE }
        );
        running.onfinish = function () { running = null; };
      } else {
        closing = true;
        running = answer.animate(
          [
            { height: current + "px", paddingBottom: pad, opacity: 1, transform: "translateY(0)" },
            { height: "0px", paddingBottom: "0px", opacity: 0, transform: "translateY(-4px)" }
          ],
          // fill:"forwards" nélkül az animáció végén az elem egy frame erejéig
          // visszakapná a teljes magasságát, mielőtt az `open` levétele
          // érvényesül - ez okozta a záráskori akadást.
          { duration: 200, easing: FAQ_EASE, fill: "forwards" }
        );
        running.onfinish = function () {
          if (closing) {
            item.open = false;
            closing = false;
          }
          // Az `open` levétele után a tartalom már nem látszik, így a
          // kitartott stílus elengedése nem villan.
          if (running) running.cancel();
          running = null;
        };
      }
    });
  });
  // ---------- Google értékelések: mobil karusszel dot-navigáció ----------
  // A görgethető kártyasáv natív görgetősávja eszközönként/böngészőnként
  // eltérően (vagy egyáltalán nem) jelenik meg, és nem illik a márka
  // nyelvéhez - lásd a CSS-ben elrejtve. Itt pöttyök jelzik a pozíciót,
  // koppintással is válthatók.
  var reviewsGrid = document.querySelector(".reviews-grid");
  var reviewsDotsWrap = document.querySelector(".reviews-dots");

  if (reviewsGrid && reviewsDotsWrap) {
    var reviewCards = Array.prototype.slice.call(reviewsGrid.querySelectorAll(".review-card"));
    var reviewDots = Array.prototype.slice.call(reviewsDotsWrap.querySelectorAll(".reviews-dot"));

    var setActiveDot = function (index) {
      reviewDots.forEach(function (dot, i) {
        var active = i === index;
        dot.classList.toggle("is-active", active);
        dot.setAttribute("aria-current", active ? "true" : "false");
      });
    };

    // A legközelebbi kártyát a görgetősáv középpontjához mérten határozzuk
    // meg. getBoundingClientRect-tel, nem offsetLeft-tel: a kártya (li)
    // offsetParent-lánca nem feltétlenül maga a görgetősáv, a rect-különbség
    // viszont mindig helyes, a jelenlegi görgetési pozíciótól függetlenül.
    var closestCardIndex = function () {
      var gridRect = reviewsGrid.getBoundingClientRect();
      var gridCenter = gridRect.left + gridRect.width / 2;
      var closest = 0;
      var closestDist = Infinity;
      reviewCards.forEach(function (card, i) {
        var r = card.getBoundingClientRect();
        var dist = Math.abs(r.left + r.width / 2 - gridCenter);
        if (dist < closestDist) {
          closestDist = dist;
          closest = i;
        }
      });
      return closest;
    };

    // Saját, könnyű rAF-tween a natív `scrollTo({behavior:"smooth"})` helyett.
    // A `scroll-snap-type` és a natív smooth scroll együtt WebKit-en
    // dokumentáltan megbicsaklik (a snap-motor félbeszakítja vagy vissza-
    // rántja az animációt) - ez a saját tween a projekt már meglévő
    // rAF-mintáit követi (lásd a hero-parallaxot lejjebb), és mindenhol
    // egyformán viselkedik.
    var scrollGridTo = function (targetLeft) {
      if (prefersReduced) {
        reviewsGrid.scrollLeft = targetLeft;
        return;
      }
      var from = reviewsGrid.scrollLeft;
      var distance = targetLeft - from;
      if (distance === 0) return;
      var duration = 320;
      var start = null;
      var step = function (ts) {
        if (start === null) start = ts;
        var p = Math.min((ts - start) / duration, 1);
        var eased = 1 - Math.pow(1 - p, 3);
        reviewsGrid.scrollLeft = from + distance * eased;
        if (p < 1) window.requestAnimationFrame(step);
      };
      window.requestAnimationFrame(step);
    };

    reviewDots.forEach(function (dot, i) {
      dot.addEventListener("click", function () {
        var card = reviewCards[i];
        if (!card) return;
        // Azonnal jelezzük az aktív pöttyöt, nem várjuk meg a görgetés-
        // figyelőt: kattintáskor a visszajelzésnek egyidejűnek kell lennie
        // a koppintással, nem a görgetés (és a rá épülő rAF) ütemétől függő.
        setActiveDot(i);
        var delta = card.getBoundingClientRect().left - reviewsGrid.getBoundingClientRect().left;
        scrollGridTo(reviewsGrid.scrollLeft + delta);
      });
    });

    var dotsTicking = false;
    reviewsGrid.addEventListener("scroll", function () {
      if (dotsTicking) return;
      dotsTicking = true;
      window.requestAnimationFrame(function () {
        setActiveDot(closestCardIndex());
        dotsTicking = false;
      });
    }, { passive: true });

    // Egyszeri, finom "kukucskálás" jobbra-vissza, amikor a szekció először
    // látszóvá válik - jelzi, hogy a kártyasáv görgethető, mielőtt a
    // felhasználó véletlenül rájönne. Csak érintős eszközön, csökkentett
    // mozgás nélkül, és csak ha a felhasználó addig nem nyúlt hozzá.
    var coarsePointer = window.matchMedia("(pointer: coarse)").matches;
    if (coarsePointer && !prefersReduced && "IntersectionObserver" in window) {
      var userTouched = false;
      reviewsGrid.addEventListener("pointerdown", function () { userTouched = true; }, { passive: true, once: true });

      var nudgeObserver = new IntersectionObserver(function (entries, obs) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          obs.disconnect();
          window.setTimeout(function () {
            if (userTouched || reviewsGrid.scrollLeft !== 0) return;
            scrollGridTo(26);
            window.setTimeout(function () {
              if (userTouched) return;
              scrollGridTo(0);
            }, 420);
          }, 500);
        });
      }, { threshold: 0.6 });
      nudgeObserver.observe(reviewsGrid);
    }
  }

  // Mobilon/érintős eszközön kikapcsoljuk a parallaxot: ott a görgetéskor
  // minden frame-ben újrapozicionált nagy kép akadozást okoz (gyengébb GPU +
  // a böngésző címsorának ki/be úszása görgetéskor). A kép statikusan stabil.
  var isTouchOrSmall = window.matchMedia("(max-width: 900px), (pointer: coarse)").matches;

  if (heroImg && !prefersReduced && !isTouchOrSmall) {
    var ticking = false;
    window.addEventListener("scroll", function () {
      if (!ticking) {
        window.requestAnimationFrame(function () {
          var offset = Math.min(window.scrollY * 0.12, 60);
          // translate3d (nem translateY), hogy a réteg GPU-kompozitált maradjon
          // és ne demótálódjon vissza görgetés közben - így nincs villanás.
          heroImg.style.transform = "translate3d(0, " + offset + "px, 0)";
          ticking = false;
        });
        ticking = true;
      }
    }, { passive: true });
  }
});
