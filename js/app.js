(function () {
  "use strict";

  var root = document.documentElement;
  var darkQuery = window.matchMedia("(prefers-color-scheme: dark)");
  var toggles = [];

  function readStored() {
    try {
      var v = localStorage.getItem("theme");
      return v === "light" || v === "dark" ? v : null;
    } catch (e) {
      return null;
    }
  }

  function writeStored(theme) {
    try {
      localStorage.setItem("theme", theme);
    } catch (e) {}
  }

  function currentTheme() {
    var attr = root.getAttribute("data-theme");
    if (attr === "light" || attr === "dark") return attr;
    return darkQuery.matches ? "dark" : "light";
  }

  function syncToggles(theme) {
    toggles.forEach(function (btn) {
      btn.setAttribute("aria-pressed", String(theme === "dark"));
      btn.setAttribute(
        "aria-label",
        theme === "dark" ? "Switch to light theme" : "Switch to dark theme"
      );
    });
  }

  function initTheme() {
    toggles = Array.prototype.slice.call(
      document.querySelectorAll("[data-theme-toggle]")
    );
    syncToggles(currentTheme());
    toggles.forEach(function (btn) {
      btn.addEventListener("click", function () {
        var next = currentTheme() === "dark" ? "light" : "dark";
        root.setAttribute("data-theme", next);
        syncToggles(next);
        writeStored(next);
      });
    });
    darkQuery.addEventListener("change", function (e) {
      if (readStored()) return;
      syncToggles(e.matches ? "dark" : "light");
    });
  }

  var FOCUSABLE = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

  function initNav() {
    var nav = document.querySelector("[data-nav]");
    var toggle = document.querySelector("[data-nav-toggle]");
    if (!nav || !toggle) return;
    var list = nav.querySelector("[data-nav-list]") || nav;
    var lastFocused = null;

    function isOpen() {
      return nav.getAttribute("data-open") === "true";
    }
    function open() {
      nav.setAttribute("data-open", "true");
      toggle.setAttribute("aria-expanded", "true");
      lastFocused = document.activeElement;
      var first = list.querySelector(FOCUSABLE);
      if (first) first.focus();
      document.addEventListener("keydown", onKeydown);
    }
    function close(restore) {
      nav.setAttribute("data-open", "false");
      toggle.setAttribute("aria-expanded", "false");
      document.removeEventListener("keydown", onKeydown);
      if (restore !== false && lastFocused) lastFocused.focus();
    }
    function onKeydown(e) {
      if (e.key === "Escape") return close();
      if (e.key !== "Tab") return;
      var f = Array.prototype.slice.call(list.querySelectorAll(FOCUSABLE));
      if (!f.length) return;
      var first = f[0];
      var last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }

    toggle.addEventListener("click", function () {
      isOpen() ? close() : open();
    });
    list.querySelectorAll("a[href^='#']").forEach(function (link) {
      link.addEventListener("click", function () {
        if (isOpen()) close(false);
      });
    });
    window.matchMedia("(min-width: 768px)").addEventListener("change", function (e) {
      if (e.matches && isOpen()) close(false);
    });
  }

  function initActiveSection() {
    var links = Array.prototype.slice.call(
      document.querySelectorAll("[data-nav-list] a[href^='#']")
    );
    if (!links.length || !("IntersectionObserver" in window)) return;
    var sections = [];
    links.forEach(function (link) {
      var s = document.getElementById(link.getAttribute("href").slice(1));
      if (s) sections.push(s);
    });
    function setCurrent(id) {
      links.forEach(function (link) {
        link.setAttribute(
          "aria-current",
          link.getAttribute("href") === "#" + id ? "true" : "false"
        );
      });
    }
    var obs = new IntersectionObserver(
      function (entries) {
        entries
          .filter(function (e) {
            return e.isIntersecting;
          })
          .sort(function (a, b) {
            return b.intersectionRatio - a.intersectionRatio;
          })
          .forEach(function (e) {
            setCurrent(e.target.id);
          });
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 }
    );
    sections.forEach(function (s) {
      obs.observe(s);
    });
  }

  function initScrolledState() {
    var header = document.querySelector("[data-header]");
    if (!header) return;
    function update() {
      header.setAttribute("data-scrolled", String(window.scrollY > 8));
    }
    update();
    window.addEventListener("scroll", update, { passive: true });
  }

  function initReveal() {
    var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    var items = Array.prototype.slice.call(
      document.querySelectorAll("[data-reveal]")
    );
    if (!items.length) return;
    if (reduced || !("IntersectionObserver" in window)) {
      items.forEach(function (el) {
        el.classList.add("is-visible");
      });
      return;
    }
    var obs = new IntersectionObserver(
      function (entries, o) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          o.unobserve(entry.target);
        });
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.12 }
    );
    items.forEach(function (el) {
      obs.observe(el);
    });
  }

  function initYear() {
    var el = document.getElementById("year");
    if (el) el.textContent = new Date().getFullYear();
  }

  function init() {
    initTheme();
    initNav();
    initActiveSection();
    initScrolledState();
    initReveal();
    initYear();
  }

  if (document.readyState !== "loading") {
    init();
  } else {
    document.addEventListener("DOMContentLoaded", init, { once: true });
  }
})();
