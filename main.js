(function () {
  'use strict';

  const nav = document.getElementById('nav');
  const navLinks = document.getElementById('navLinks');
  const burger = document.getElementById('navBurger');

  function onScroll() {
    const y = window.scrollY || window.pageYOffset;
    if (y > 40) nav.classList.add('nav--scrolled');
    else nav.classList.remove('nav--scrolled');
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  function closeMenu() {
    navLinks.classList.remove('open');
    burger.classList.remove('open');
    burger.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }
  function openMenu() {
    navLinks.classList.add('open');
    burger.classList.add('open');
    burger.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  }
  if (burger && navLinks) {
    burger.addEventListener('click', function () {
      if (navLinks.classList.contains('open')) closeMenu();
      else openMenu();
    });
    navLinks.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', closeMenu);
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && navLinks.classList.contains('open')) closeMenu();
    });
  }

  document.querySelectorAll('a[href^="#"]').forEach(function (a) {
    a.addEventListener('click', function (e) {
      const id = this.getAttribute('href');
      if (id.length < 2) return;
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      const navH = nav ? nav.offsetHeight : 0;
      const y = target.getBoundingClientRect().top + window.scrollY - navH + 1;
      window.scrollTo({ top: y, behavior: 'smooth' });
    });
  });

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    document.querySelectorAll('.rise').forEach(function (el) { observer.observe(el); });

    const counters = document.querySelectorAll('.stat__num[data-count]');
    if (counters.length) {
      const counterObs = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          counterObs.unobserve(entry.target);
          const target = parseInt(entry.target.getAttribute('data-count'), 10) || 0;
          const suffix = entry.target.getAttribute('data-suffix') || '';
          const dur = 1400;
          const start = performance.now();
          function tick(now) {
            const t = Math.min(1, (now - start) / dur);
            const eased = 1 - Math.pow(1 - t, 3);
            entry.target.textContent = Math.round(target * eased) + suffix;
            if (t < 1) requestAnimationFrame(tick);
          }
          requestAnimationFrame(tick);
        });
      }, { threshold: 0.5 });
      counters.forEach(function (c) { counterObs.observe(c); });
    }
  } else {
    document.querySelectorAll('.rise').forEach(function (el) { el.classList.add('visible'); });
  }

  const filterRoot = document.querySelector('[data-beer-grid]');
  if (filterRoot) {
    const pills = document.querySelectorAll('.filter-pill');
    const cards = filterRoot.querySelectorAll('.beer');
    pills.forEach(function (pill) {
      pill.addEventListener('click', function () {
        const filter = pill.getAttribute('data-filter');
        pills.forEach(function (p) { p.classList.remove('active'); });
        pill.classList.add('active');
        cards.forEach(function (c) {
          const tags = (c.getAttribute('data-tags') || '').split(/\s+/);
          if (filter === 'all' || tags.indexOf(filter) >= 0) c.classList.remove('is-hidden');
          else c.classList.add('is-hidden');
        });
      });
    });
  }
})();
