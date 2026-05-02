/* ================================================================
   QOMEXIS LTD — script.js
   Communication in Excellence | Market Access Across Africa
   ================================================================ */

(function () {
  'use strict';

  /* ── INIT on DOM ready ── */
  document.addEventListener('DOMContentLoaded', function () {
    initNavScroll();
    initHamburger();
    initActiveNav();
    initSmoothScroll();
    initFadeObserver();
    initFormHandler();
  });

  /* ================================================================
     1. NAV — add .scrolled class for shadow
     ================================================================ */
  function initNavScroll() {
    var nav = document.getElementById('navbar');
    if (!nav) return;
    function tick() { nav.classList.toggle('scrolled', window.scrollY > 20); }
    window.addEventListener('scroll', tick, { passive: true });
    tick();
  }

  /* ================================================================
     2. HAMBURGER — toggle mobile menu
     ================================================================ */
  function initHamburger() {
    var btn  = document.getElementById('hamburger');
    var menu = document.getElementById('mobileMenu');
    if (!btn || !menu) return;

    btn.addEventListener('click', function () {
      var open = btn.classList.toggle('open');
      menu.classList.toggle('open', open);
      document.body.style.overflow = open ? 'hidden' : '';
      btn.setAttribute('aria-expanded', String(open));
    });

    /* Close on outside click */
    document.addEventListener('click', function (e) {
      if (!btn.contains(e.target) && !menu.contains(e.target)) closeMenu();
    });

    /* Close on Escape */
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closeMenu();
    });
  }

  function closeMenu() {
    var btn  = document.getElementById('hamburger');
    var menu = document.getElementById('mobileMenu');
    if (!btn || !menu) return;
    btn.classList.remove('open');
    menu.classList.remove('open');
    document.body.style.overflow = '';
    btn.setAttribute('aria-expanded', 'false');
  }

  /* Exposed globally for onclick attributes in mobile-menu links */
  window.closeMobile = closeMenu;

  /* ================================================================
     3. ACTIVE NAV LINKS — highlight on scroll
     ================================================================ */
  function initActiveNav() {
    var sections = Array.from(document.querySelectorAll('section[id]'));
    var links    = Array.from(document.querySelectorAll('.nav-links a[href^="#"]'));

    function update() {
      var current = '';
      sections.forEach(function (s) {
        if (window.scrollY >= s.offsetTop - 80) current = s.id;
      });
      links.forEach(function (a) {
        a.classList.toggle('active', a.getAttribute('href') === '#' + current);
      });
    }

    window.addEventListener('scroll', update, { passive: true });
    update();
  }

  /* ================================================================
     4. SMOOTH SCROLL — also closes mobile menu on anchor click
     ================================================================ */
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(function (link) {
      link.addEventListener('click', function (e) {
        var target = document.querySelector(link.getAttribute('href'));
        if (!target) return;
        e.preventDefault();
        closeMenu();
        var offset = target.getBoundingClientRect().top + window.scrollY
          - parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-h') || '66', 10);
        window.scrollTo({ top: offset, behavior: 'smooth' });
      });
    });
  }

  /* ================================================================
     5. FADE-IN on scroll — IntersectionObserver
     ================================================================ */
  function initFadeObserver() {
    var els = document.querySelectorAll('.fade-in');
    if (!els.length) return;

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

    els.forEach(function (el) { observer.observe(el); });
  }

  /* ================================================================
     6. CONTACT FORM HANDLER
     ================================================================ */
  function initFormHandler() {
    var form = document.getElementById('contactForm');
    if (!form) return;
    form.addEventListener('submit', handleSubmit);
  }

  function handleSubmit(e) {
    e.preventDefault();

    var sendBtn = e.target.querySelector('.btn-send');
    var required = Array.from(e.target.querySelectorAll('[required]'));

    /* Validate */
    var valid = true;
    required.forEach(function (inp) {
      if (!inp.value.trim()) {
        valid = false;
        inp.style.borderColor = '#e74c3c';
        inp.addEventListener('input', function () { inp.style.borderColor = ''; }, { once: true });
      }
    });
    if (!valid) return;

    /* Sending state */
    var original = sendBtn.innerHTML;
    sendBtn.disabled = true;
    sendBtn.innerHTML =
      '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"' +
      ' style="animation:qs-spin 1s linear infinite">' +
      '<path d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" opacity=".25"/>' +
      '<path d="M21 12a9 9 0 00-9-9" stroke-linecap="round"/></svg>Sending…';

    setTimeout(function () {
      sendBtn.innerHTML        = '✓ Message Sent!';
      sendBtn.style.background = '#1de8c8';
      sendBtn.style.color      = '#080c12';
      e.target.reset();

      setTimeout(function () {
        sendBtn.innerHTML        = original;
        sendBtn.style.background = '';
        sendBtn.style.color      = '';
        sendBtn.disabled         = false;
      }, 4000);
    }, 1600);
  }

  /* Spinner keyframe injection */
  var spinStyle = document.createElement('style');
  spinStyle.textContent = '@keyframes qs-spin { to { transform: rotate(360deg); } }';
  document.head.appendChild(spinStyle);

})();
