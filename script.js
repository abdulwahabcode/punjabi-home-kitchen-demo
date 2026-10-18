/* The Punjabi Home Kitchen — mobile nav + scroll reveal */
(function () {
  "use strict";

  /* ---- Mobile navigation ---- */
  var toggle = document.getElementById("navToggle");
  var nav = document.getElementById("mainNav");

  function closeNav() {
    nav.classList.remove("open");
    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-label", "Open menu");
    document.body.classList.remove("nav-open");
  }

  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var isOpen = nav.classList.toggle("open");
      toggle.setAttribute("aria-expanded", String(isOpen));
      toggle.setAttribute("aria-label", isOpen ? "Close menu" : "Open menu");
      document.body.classList.toggle("nav-open", isOpen);
    });

    // Close when a link is tapped, and on Escape
    nav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", closeNav);
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && nav.classList.contains("open")) closeNav();
    });
  }

  /* ---- Scroll reveal (IntersectionObserver with fallback) ---- */
  var items = document.querySelectorAll(".reveal");

  if ("IntersectionObserver" in window && items.length) {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("in");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );
    items.forEach(function (el) { observer.observe(el); });
  } else {
    // Fallback: reveal everything immediately
    document.documentElement.classList.add("reveal-fallback");
    items.forEach(function (el) { el.classList.add("in"); });
  }

  /* ---- Sticky header shadow on scroll ---- */
  var header = document.getElementById("siteHeader");
  function onScroll() {
    if (window.scrollY > 12) {
      header.style.boxShadow = "0 10px 30px -12px rgba(0,0,0,.45)";
    } else {
      header.style.boxShadow = "none";
    }
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
})();
