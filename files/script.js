/* ═══════════════════════════════════════════════
   QOMEXIS LTD — script.js
   Smooth scroll · Sticky nav · Hamburger · Scroll spy · Fade-in
═══════════════════════════════════════════════ */

(function () {
  'use strict';

  /* ── Elements ── */
  const navbar     = document.getElementById('navbar');
  const hamburger  = document.getElementById('hamburger');
  const navLinks   = document.getElementById('navLinks');
  const allNavLinks = document.querySelectorAll('.nav-link');

  /* ════════════════════════════════
     1. STICKY NAV — add .scrolled on scroll
  ════════════════════════════════ */
  function handleNavScroll() {
    if (window.scrollY > 20) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', handleNavScroll, { passive: true });
  handleNavScroll(); // run on load


  /* ════════════════════════════════
     2. SMOOTH SCROLL — intercept all anchor links
  ════════════════════════════════ */
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (!target) return;

      e.preventDefault();

      // Close mobile menu if open
      closeMobileMenu();

      const navHeight = parseInt(getComputedStyle(document.documentElement)
        .getPropertyValue('--nav-height')) || 72;

      const targetY = target.getBoundingClientRect().top + window.scrollY - navHeight;

      window.scrollTo({ top: targetY, behavior: 'smooth' });
    });
  });


  /* ════════════════════════════════
     3. HAMBURGER MENU
  ════════════════════════════════ */
  hamburger.addEventListener('click', function () {
    const isOpen = navLinks.classList.contains('open');
    if (isOpen) {
      closeMobileMenu();
    } else {
      openMobileMenu();
    }
  });

  function openMobileMenu() {
    navLinks.classList.add('open');
    hamburger.classList.add('open');
    hamburger.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  }

  function closeMobileMenu() {
    navLinks.classList.remove('open');
    hamburger.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  // Close on outside click
  document.addEventListener('click', function (e) {
    if (!navbar.contains(e.target) && navLinks.classList.contains('open')) {
      closeMobileMenu();
    }
  });

  // Close on Escape key
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && navLinks.classList.contains('open')) {
      closeMobileMenu();
    }
  });


  /* ════════════════════════════════
     4. SCROLL SPY — highlight active nav link
  ════════════════════════════════ */
  const sections = document.querySelectorAll('section[id]');

  function updateActiveLink() {
    const navHeight = parseInt(getComputedStyle(document.documentElement)
      .getPropertyValue('--nav-height')) || 72;
    const scrollPos = window.scrollY + navHeight + 60;

    let currentSection = '';

    sections.forEach(function (section) {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;

      if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
        currentSection = section.getAttribute('id');
      }
    });

    allNavLinks.forEach(function (link) {
      link.classList.remove('active');
      const href = link.getAttribute('href');
      if (href === '#' + currentSection) {
        link.classList.add('active');
      }
    });
  }

  window.addEventListener('scroll', updateActiveLink, { passive: true });
  updateActiveLink();


  /* ════════════════════════════════
     5. FADE-IN ON SCROLL (Intersection Observer)
  ════════════════════════════════ */
  const fadeTargets = [
    '.service-card',
    '.why-item',
    '.about-stat-card',
    '.mvv-item',
    '.client-card',
    '.contact-item',
    '.section-header',
    '.about-lead',
    '.about-body',
    '.approach-block',
    '.contact-text',
    '.contact-card',
    '.hero-badge',
    '.hero-actions',
  ];

  // Add .fade-up to animatable elements
  fadeTargets.forEach(function (selector) {
    document.querySelectorAll(selector).forEach(function (el) {
      el.classList.add('fade-up');
    });
  });

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        // Stagger children of grids
        const parent = entry.target.parentElement;
        const siblings = Array.from(parent.querySelectorAll('.fade-up'));
        const index = siblings.indexOf(entry.target);
        entry.target.style.transitionDelay = (index * 80) + 'ms';
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -40px 0px'
  });

  document.querySelectorAll('.fade-up').forEach(function (el) {
    observer.observe(el);
  });


  /* ════════════════════════════════
     6. RESIZE — close mobile menu if viewport widens
  ════════════════════════════════ */
  window.addEventListener('resize', function () {
    if (window.innerWidth > 768) {
      closeMobileMenu();
    }
  });

})();
