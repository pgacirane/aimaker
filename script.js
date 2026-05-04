/* ================================================
   QOMEXIS LTD — script.js
   Smooth scroll · Sticky nav · Active link · Hamburger
   ================================================ */

(function () {
  'use strict';

  const navbar    = document.getElementById('navbar');
  const hamburger = document.getElementById('hamburger');
  const navLinks  = document.getElementById('navLinks');
  const allLinks  = document.querySelectorAll('.nav-link');
  const sections  = document.querySelectorAll('section[id]');

  /* ---- Sticky nav on scroll ---- */
  function handleScroll() {
    if (window.scrollY > 20) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
    updateActiveLink();
  }

  /* ---- Highlight active nav link based on scroll position ---- */
  function updateActiveLink() {
    let current = '';
    const navH = parseInt(getComputedStyle(document.documentElement)
      .getPropertyValue('--nav-h')) || 72;

    sections.forEach(section => {
      const top    = section.getBoundingClientRect().top;
      const height = section.offsetHeight;
      if (top <= navH + 40 && top + height > navH + 40) {
        current = section.id;
      }
    });

    allLinks.forEach(link => {
      link.classList.remove('active');
      const href = link.getAttribute('href');
      if (href === '#' + current) {
        link.classList.add('active');
      }
    });
  }

  /* ---- Hamburger toggle ---- */
  function toggleMenu() {
    const isOpen = navLinks.classList.toggle('open');
    hamburger.classList.toggle('open', isOpen);
    hamburger.setAttribute('aria-expanded', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
  }

  /* ---- Close menu when a link is clicked ---- */
  function closeMenu() {
    navLinks.classList.remove('open');
    hamburger.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  /* ---- Smooth scroll with nav offset ---- */
  function smoothScrollTo(targetId) {
    const target = document.getElementById(targetId);
    if (!target) return;
    const navH = parseInt(getComputedStyle(document.documentElement)
      .getPropertyValue('--nav-h')) || 72;
    const top = target.getBoundingClientRect().top + window.scrollY - navH;
    window.scrollTo({ top, behavior: 'smooth' });
  }

  /* ---- Event Listeners ---- */
  window.addEventListener('scroll', handleScroll, { passive: true });

  hamburger.addEventListener('click', toggleMenu);

  allLinks.forEach(link => {
    link.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href && href.startsWith('#')) {
        e.preventDefault();
        closeMenu();
        smoothScrollTo(href.slice(1));
      }
    });
  });

  /* Also close menu if clicking outside */
  document.addEventListener('click', function (e) {
    if (navLinks.classList.contains('open')) {
      if (!navbar.contains(e.target)) {
        closeMenu();
      }
    }
  });

  /* ---- Intersection Observer: card reveal animation ---- */
  const revealItems = document.querySelectorAll(
    '.service-card, .client-card, .mv-card, .contact-item, .stat-item, .tag'
  );

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    revealItems.forEach((el, i) => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(24px)';
      el.style.transition = `opacity 0.55s ease ${i * 0.07}s, transform 0.55s ease ${i * 0.07}s`;
      observer.observe(el);
    });

    /* Inject .revealed style dynamically */
    const style = document.createElement('style');
    style.textContent = '.revealed { opacity: 1 !important; transform: translateY(0) !important; }';
    document.head.appendChild(style);
  }

  /* ---- Initial calls ---- */
  handleScroll();

})();