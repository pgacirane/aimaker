/* ================================================================
   QOMEXIS LTD — script.js
   Communication in Excellence | ICT & Telecom Regulatory Advisory
   ================================================================ */

(function () {
  'use strict';

  /* ── DOM READY ── */
  document.addEventListener('DOMContentLoaded', init);

  function init() {
    initNavScroll();
    initHamburger();
    initActiveNavLinks();
    initFadeInObserver();
    initCounters();
    initFormHandler();
    initSmoothScrollLinks();
  }

  /* ================================================================
     NAV: Add 'scrolled' class for shadow on scroll
     ================================================================ */
  function initNavScroll() {
    const nav = document.getElementById('navbar');
    if (!nav) return;

    const onScroll = () => {
      nav.classList.toggle('scrolled', window.scrollY > 20);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll(); // run once on load
  }

  /* ================================================================
     HAMBURGER: Toggle mobile menu
     ================================================================ */
  function initHamburger() {
    const btn  = document.getElementById('hamburger');
    const menu = document.getElementById('mobileMenu');
    if (!btn || !menu) return;

    btn.addEventListener('click', () => {
      const isOpen = btn.classList.toggle('open');
      menu.classList.toggle('open', isOpen);
      // Prevent body scroll when menu open
      document.body.style.overflow = isOpen ? 'hidden' : '';
      btn.setAttribute('aria-expanded', isOpen);
    });

    // Close on outside click
    document.addEventListener('click', (e) => {
      if (!btn.contains(e.target) && !menu.contains(e.target)) {
        closeMobileMenu();
      }
    });

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeMobileMenu();
    });
  }

  function closeMobileMenu() {
    const btn  = document.getElementById('hamburger');
    const menu = document.getElementById('mobileMenu');
    if (!btn || !menu) return;
    btn.classList.remove('open');
    menu.classList.remove('open');
    document.body.style.overflow = '';
    btn.setAttribute('aria-expanded', 'false');
  }

  // Exposed globally for inline onclick in mobile menu links
  window.closeMobile = closeMobileMenu;

  /* ================================================================
     ACTIVE NAV LINKS: Highlight link matching current section
     ================================================================ */
  function initActiveNavLinks() {
    const sections  = Array.from(document.querySelectorAll('section[id]'));
    const navLinks  = Array.from(document.querySelectorAll('.nav-links a[href^="#"]'));
    const navHeight = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-h')) || 66;

    const onScroll = () => {
      const scrollY = window.scrollY;
      let current   = '';

      sections.forEach((section) => {
        if (scrollY >= section.offsetTop - navHeight - 10) {
          current = section.id;
        }
      });

      navLinks.forEach((a) => {
        a.classList.toggle('active', a.getAttribute('href') === '#' + current);
      });
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* ================================================================
     SMOOTH SCROLL: Close mobile menu and scroll to anchor
     ================================================================ */
  function initSmoothScrollLinks() {
    document.querySelectorAll('a[href^="#"]').forEach((link) => {
      link.addEventListener('click', (e) => {
        const target = document.querySelector(link.getAttribute('href'));
        if (!target) return;
        e.preventDefault();
        closeMobileMenu();
        const offset = target.getBoundingClientRect().top + window.scrollY
          - (parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-h')) || 66);
        window.scrollTo({ top: offset, behavior: 'smooth' });
      });
    });
  }

  /* ================================================================
     INTERSECTION OBSERVER: Fade-in elements on scroll
     ================================================================ */
  function initFadeInObserver() {
    const elements = document.querySelectorAll('.fade-in');
    if (!elements.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target); // fire once
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );

    elements.forEach((el) => observer.observe(el));
  }

  /* ================================================================
     COUNTERS: Animate stat numbers when visible
     ================================================================ */
  function initCounters() {
    const counters = document.querySelectorAll('[data-count]');
    if (!counters.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animateCounter(entry.target);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );

    counters.forEach((el) => observer.observe(el));
  }

  function animateCounter(el) {
    const target   = parseFloat(el.dataset.count);
    const suffix   = el.dataset.suffix || '';
    const duration = 1400;
    const start    = performance.now();

    const update = (now) => {
      const elapsed  = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased    = 1 - Math.pow(1 - progress, 3); // ease-out-cubic
      const value    = target * eased;

      el.textContent = (Number.isInteger(target) ? Math.round(value) : value.toFixed(1)) + suffix;

      if (progress < 1) requestAnimationFrame(update);
    };

    requestAnimationFrame(update);
  }

  /* ================================================================
     CONTACT FORM HANDLER
     ================================================================ */
  function initFormHandler() {
    const form = document.getElementById('contactForm');
    if (!form) return;

    form.addEventListener('submit', handleFormSubmit);
  }

  function handleFormSubmit(e) {
    e.preventDefault();

    const btn    = e.target.querySelector('.btn-send');
    const inputs = e.target.querySelectorAll('input, textarea, select');

    // Basic validation
    let valid = true;
    inputs.forEach((input) => {
      if (input.required && !input.value.trim()) {
        valid = false;
        highlightError(input);
      } else {
        clearError(input);
      }
    });

    if (!valid) return;

    // Simulate send state
    const originalHTML = btn.innerHTML;
    btn.innerHTML = `
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"
           style="animation:spin 1s linear infinite">
        <path d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" opacity=".25"/>
        <path d="M21 12a9 9 0 00-9-9" stroke-linecap="round"/>
      </svg>
      Sending…`;
    btn.disabled = true;

    setTimeout(() => {
      btn.innerHTML = `
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
          <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
        </svg>
        Message Sent!`;
      btn.style.background = '#1de8c8';
      btn.style.color      = '#080c12';
      e.target.reset();

      setTimeout(() => {
        btn.innerHTML        = originalHTML;
        btn.style.background = '';
        btn.style.color      = '';
        btn.disabled         = false;
      }, 4000);
    }, 1600);
  }

  function highlightError(input) {
    input.style.borderColor = '#e55353';
    input.addEventListener('input', () => clearError(input), { once: true });
  }

  function clearError(input) {
    input.style.borderColor = '';
  }

  /* ================================================================
     INJECT SPINNER KEYFRAME (needed for send button animation)
     ================================================================ */
  const spinStyle = document.createElement('style');
  spinStyle.textContent = '@keyframes spin { to { transform: rotate(360deg); } }';
  document.head.appendChild(spinStyle);

})();
