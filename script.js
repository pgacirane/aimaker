/**
 * QOMEXIS LTD — script.js
 * Handles: sticky nav scroll state, active section highlighting,
 *          hamburger menu toggle, smooth-scroll nav clicks.
 */

(function () {
  'use strict';

  /* ── DOM refs ──────────────────────────────────── */
  const header      = document.getElementById('site-header');
  const hamburger   = document.getElementById('hamburger');
  const navLinks    = document.getElementById('nav-links');
  const navLinkEls  = document.querySelectorAll('.nav-link[data-section]');
  const sections    = document.querySelectorAll('section[id]');

  /* ── Sticky header on scroll ───────────────────── */
  function updateHeader () {
    if (window.scrollY > 10) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }

  /* ── Active nav link by IntersectionObserver ───── */
  const observerOptions = {
    root: null,
    rootMargin: '-50% 0px -45% 0px',
    threshold: 0
  };

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinkEls.forEach(link => {
          link.classList.toggle('active', link.dataset.section === id);
        });
      }
    });
  }, observerOptions);

  sections.forEach(sec => sectionObserver.observe(sec));

  /* ── Hamburger toggle ──────────────────────────── */
  function toggleMenu (forceClose = false) {
    const isOpen = navLinks.classList.contains('open');

    if (forceClose || isOpen) {
      navLinks.classList.remove('open');
      hamburger.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
    } else {
      navLinks.classList.add('open');
      hamburger.classList.add('open');
      hamburger.setAttribute('aria-expanded', 'true');
    }
  }

  hamburger.addEventListener('click', () => toggleMenu());

  /* Close menu when a nav link is clicked */
  navLinkEls.forEach(link => {
    link.addEventListener('click', () => toggleMenu(true));
  });

  /* Close menu when clicking outside */
  document.addEventListener('click', (e) => {
    if (!header.contains(e.target)) {
      toggleMenu(true);
    }
  });

  /* Close menu on Escape */
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') toggleMenu(true);
  });

  /* ── Smooth scroll for anchor links ───────────── */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href').slice(1);
      const target   = document.getElementById(targetId);

      if (target) {
        e.preventDefault();
        const navHeight = parseInt(
          getComputedStyle(document.documentElement)
            .getPropertyValue('--nav-h')
        );
        const targetY = target.getBoundingClientRect().top + window.scrollY - navHeight;

        window.scrollTo({ top: targetY, behavior: 'smooth' });
      }
    });
  });

  /* ── Scroll event listener ─────────────────────── */
  window.addEventListener('scroll', updateHeader, { passive: true });

  /* ── Init ──────────────────────────────────────── */
  updateHeader();

  /* ── Fade-in on scroll (Intersection Observer) ── */
  const fadeEls = document.querySelectorAll(
    '.service-card, .client-card, .pillar-card, .approach-tag, ' +
    '.why-item, .contact-item, .social-link, .contact-cta-block'
  );

  /* Apply initial state */
  fadeEls.forEach((el, i) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(24px)';
    el.style.transition =
      `opacity 0.55s cubic-bezier(0.16,1,0.3,1) ${i * 0.06}s, ` +
      `transform 0.55s cubic-bezier(0.16,1,0.3,1) ${i * 0.06}s`;
  });

  const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        fadeObserver.unobserve(entry.target);
      }
    });
  }, { rootMargin: '0px 0px -60px 0px', threshold: 0.1 });

  fadeEls.forEach(el => fadeObserver.observe(el));

})();
