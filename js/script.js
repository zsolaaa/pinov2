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
