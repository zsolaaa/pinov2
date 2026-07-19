document.addEventListener("DOMContentLoaded", function () {
  var nav = document.querySelector(".menu-nav");
  var categories = document.querySelectorAll(".menu-category");
  var navLinks = nav ? nav.querySelectorAll("a") : [];
  if (!nav || !categories.length || !navLinks.length) return;

  var prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function offsetTop(el) {
    return el.getBoundingClientRect().top + window.scrollY;
  }

  // Kattintásra ugrás a kategóriára - a sticky fejléc + a sticky kategória-sáv
  // magasságát figyelembe véve, hogy a cím ne csússzon alájuk.
  navLinks.forEach(function (link) {
    link.addEventListener("click", function (event) {
      var targetId = link.getAttribute("href");
      var target = document.querySelector(targetId);
      if (!target) return;
      event.preventDefault();
      var header = document.querySelector(".site-header");
      var offset = (header ? header.getBoundingClientRect().height : 0) + nav.getBoundingClientRect().height + 16;
      window.scrollTo({
        top: offsetTop(target) - offset,
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
    var navRect = nav.getBoundingClientRect();
    var linkRect = activeLink.getBoundingClientRect();
    if (linkRect.left < navRect.left || linkRect.right > navRect.right) {
      activeLink.scrollIntoView({ behavior: prefersReduced ? "auto" : "smooth", inline: "center", block: "nearest" });
    }
  }

  // A GSAP/ScrollTrigger CDN-ről töltődik; ha valamiért nem érhető el
  // (lassú/hibás hálózat), a fenti kattintásos ugrás akkor is működik -
  // csak az automatikus aktív-állapot-jelzés marad el.
  if (typeof gsap === "undefined" || typeof ScrollTrigger === "undefined") return;
  gsap.registerPlugin(ScrollTrigger);

  categories.forEach(function (category, index) {
    // A kategóriák közt 72px rés van (`.menu-categories { gap: 72px }`) - ha
    // az "end" a saját elem aljára mutatna, ez a rés holt zóna lenne, ahol
    // egyik kategória sem aktív. Az "end" ezért a KÖVETKEZŐ kategória
    // tetejéig tart, hézag nélkül; az utolsónál a saját alja marad a vég.
    var next = categories[index + 1];
    ScrollTrigger.create({
      trigger: category,
      start: "top 150px",
      endTrigger: next || category,
      end: next ? "top 150px" : "bottom 150px",
      onToggle: function (self) {
        if (self.isActive) setActive(index);
      }
    });
  });
});
