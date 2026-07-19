document.addEventListener("DOMContentLoaded", function () {
  var nav = document.querySelector(".menu-nav");
  var categories = document.querySelectorAll(".menu-category");
  var navLinks = nav ? nav.querySelectorAll("a") : [];
  if (!nav || !categories.length || !navLinks.length) return;

  var prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var header = document.querySelector(".site-header");

  function offsetTop(el) {
    return el.getBoundingClientRect().top + window.scrollY;
  }

  // A sticky fejléc + sticky kategória-sáv együttes magassága - a kattintásos
  // ugrás és az aktív-jelző közös referenciavonala, hogy a kettő egyezzen.
  function stickyOffset() {
    var headerH = header ? header.getBoundingClientRect().height : 0;
    return headerH + nav.getBoundingClientRect().height + 16;
  }

  // Kattintásra ugrás a kategóriára - a sticky elemek magasságát figyelembe
  // véve, hogy a cím ne csússzon alájuk.
  navLinks.forEach(function (link) {
    link.addEventListener("click", function (event) {
      var target = document.querySelector(link.getAttribute("href"));
      if (!target) return;
      event.preventDefault();
      window.scrollTo({
        top: offsetTop(target) - stickyOffset(),
        behavior: prefersReduced ? "auto" : "smooth"
      });
    });
  });

  function setActive(index) {
    navLinks.forEach(function (link, i) {
      var isActive = i === index;
      link.classList.toggle("active", isActive);
      if (isActive) {
        link.setAttribute("aria-current", "true");
      } else {
        link.removeAttribute("aria-current");
      }
    });
    var activeLink = navLinks[index];
    if (!activeLink) return;
    var navRect = nav.getBoundingClientRect();
    var linkRect = activeLink.getBoundingClientRect();
    if (linkRect.left < navRect.left || linkRect.right > navRect.right) {
      activeLink.scrollIntoView({ behavior: prefersReduced ? "auto" : "smooth", inline: "center", block: "nearest" });
    }
  }

  // Determinisztikus scroll-spy: az aktív szakasz mindig az, amelyik épp a
  // menü-sáv alatt van - vagyis az UTOLSÓ kategória, amelynek a teteje már a
  // referenciavonal fölé került. Ez pontosan azt jelöli, amit a felhasználó
  // néz, off-by-one lemaradás nélkül, és nem függ külső könyvtártól (GSAP).
  var currentIndex = -1;
  function updateActive() {
    // A vonal pár px-el a sticky sáv alatt van, hogy a kattintással odaugrott
    // cím (ami épp a sáv alá kerül) biztosan az adott szakaszt jelölje.
    var line = nav.getBoundingClientRect().bottom + 24;
    var index = 0;
    for (var i = 0; i < categories.length; i++) {
      if (categories[i].getBoundingClientRect().top <= line) {
        index = i;
      } else {
        break;
      }
    }
    if (index !== currentIndex) {
      currentIndex = index;
      setActive(index);
    }
  }

  var ticking = false;
  function onScroll() {
    if (!ticking) {
      window.requestAnimationFrame(function () {
        updateActive();
        ticking = false;
      });
      ticking = true;
    }
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", updateActive, { passive: true });
  updateActive();
});
