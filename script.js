/* ================================================================
   REGULATORY ADVISOR — script.js
   ICT Regulatory Counsel · Kigali, Rwanda
   ================================================================ */

(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', init);

  function init() {
    initNavScroll();
    initHamburger();
    initActiveNavLinks();
    initSmoothScroll();
    initFadeObserver();
    initFormHandler();
  }

  /* ================================================================
     NAV: shadow on scroll
     ================================================================ */
  function initNavScroll() {
    const nav = document.getElementById('navbar');
    if (!nav) return;
    const tick = () => nav.classList.toggle('scrolled', window.scrollY > 20);
    window.addEventListener('scroll', tick, { passive: true });
    tick();
  }

  /* ================================================================
     HAMBURGER
     ================================================================ */
  function initHamburger() {
    const btn  = document.getElementById('hamburger');
    const menu = document.getElementById('mobileMenu');
    if (!btn || !menu) return;

    btn.addEventListener('click', () => {
      const open = btn.classList.toggle('open');
      menu.classList.toggle('open', open);
      document.body.style.overflow = open ? 'hidden' : '';
      btn.setAttribute('aria-expanded', open);
    });

    document.addEventListener('click', (e) => {
      if (!btn.contains(e.target) && !menu.contains(e.target)) closeMenu();
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeMenu();
    });
  }

  function closeMenu() {
    const btn  = document.getElementById('hamburger');
    const menu = document.getElementById('mobileMenu');
    if (!btn || !menu) return;
    btn.classList.remove('open');
    menu.classList.remove('open');
    document.body.style.overflow = '';
    btn.setAttribute('aria-expanded', 'false');
  }

  // Exposed for onclick attributes in mobile menu links
  window.closeMobile = closeMenu;

  /* ================================================================
     ACTIVE NAV LINKS
     ================================================================ */
  function initActiveNavLinks() {
    const sections = Array.from(document.querySelectorAll('section[id]'));
    const links    = Array.from(document.querySelectorAll('.nav-links a[href^="#"]'));

    const onScroll = () => {
      let current = '';
      sections.forEach((s) => {
        if (window.scrollY >= s.offsetTop - 80) current = s.id;
      });
      links.forEach((a) => {
        a.classList.toggle('active', a.getAttribute('href') === '#' + current);
      });
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* ================================================================
     SMOOTH SCROLL (closes mobile menu on anchor click)
     ================================================================ */
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach((link) => {
      link.addEventListener('click', (e) => {
        const target = document.querySelector(link.getAttribute('href'));
        if (!target) return;
        e.preventDefault();
        closeMenu();
        const offset = target.getBoundingClientRect().top + window.scrollY - 68;
        window.scrollTo({ top: offset, behavior: 'smooth' });
      });
    });
  }

  /* ================================================================
     FADE-IN ON SCROLL
     ================================================================ */
  function initFadeObserver() {
    const els = document.querySelectorAll('.fade-in');
    if (!els.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );

    els.forEach((el) => observer.observe(el));
  }

  /* ================================================================
     CONTACT FORM HANDLER
     ================================================================ */
  function initFormHandler() {
    const form = document.getElementById('contactForm');
    if (!form) return;
    form.addEventListener('submit', handleSubmit);
  }

  function handleSubmit(e) {
    e.preventDefault();

    const submitBtn = e.target.querySelector('.btn-submit');
    const inputs    = e.target.querySelectorAll('input[required], textarea[required]');

    // Validate required fields
    let valid = true;
    inputs.forEach((inp) => {
      if (!inp.value.trim()) {
        valid = false;
        inp.style.borderColor = '#c0392b';
        inp.addEventListener('input', () => { inp.style.borderColor = ''; }, { once: true });
      }
    });
    if (!valid) return;

    // Sending state
    const original = submitBtn.innerHTML;
    submitBtn.disabled = true;
    submitBtn.innerHTML = `
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"
           style="animation:ra-spin 1s linear infinite">
        <path d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" opacity=".25"/>
        <path d="M21 12a9 9 0 00-9-9" stroke-linecap="round"/>
      </svg>
      Sending…`;

    setTimeout(() => {
      submitBtn.innerHTML      = '✓ Inquiry Received';
      submitBtn.style.background = '#2d6a4f';
      submitBtn.style.color      = '#fff';
      e.target.reset();

      setTimeout(() => {
        submitBtn.innerHTML        = original;
        submitBtn.style.background = '';
        submitBtn.style.color      = '';
        submitBtn.disabled         = false;
      }, 4000);
    }, 1500);
  }

  // Spinner keyframe
  const style = document.createElement('style');
  style.textContent = '@keyframes ra-spin { to { transform: rotate(360deg); } }';
  document.head.appendChild(style);

})();
