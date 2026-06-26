/* =====================================================================
   MID-CENTURY EDITION — minimal interactive layer
   - mobile nav toggle
   - scroll reveal (IntersectionObserver)
   No external libraries. Respects reduced-motion.
   ===================================================================== */
(function () {
  "use strict";

  var reduceMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* mobile nav toggle */
  (function () {
    var t = document.getElementById("navToggle"), l = document.getElementById("navLinks");
    if (t && l) {
      t.addEventListener("click", function () { l.classList.toggle("open"); });
      l.querySelectorAll("a").forEach(function (a) {
        a.addEventListener("click", function () { l.classList.remove("open"); });
      });
    }
  })();

  /* scroll reveal */
  (function () {
    var els = document.querySelectorAll(".reveal");
    if (!els.length) return;
    if (reduceMotion || !("IntersectionObserver" in window)) {
      els.forEach(function (el) { el.classList.add("is-visible"); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add("is-visible"); io.unobserve(e.target); }
      });
    }, { threshold: 0.12 });
    els.forEach(function (el) { io.observe(el); });
  })();

})();
