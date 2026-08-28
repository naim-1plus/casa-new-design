/* Casa Salento — desktop interactions */
(function () {
  'use strict';

  /* --- Cart badge --- */
  var badge = document.getElementById('cartCount');
  document.querySelectorAll('.btn--cart').forEach(function (btn) {
    btn.addEventListener('click', function () {
      badge.textContent = String(parseInt(badge.textContent, 10) + 1);
    });
  });

  /* --- Newsletter --- */
  var form = document.getElementById('newsletterForm');
  var note = document.getElementById('newsletterNote');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var field = form.querySelector('.newsletter__input');
      if (!field.value.trim()) { field.focus(); return; }
      note.hidden = false;
      form.reset();
    });
  }

  /* --- Sticky header shadow (announcement bar scrolls away first) --- */
  var header = document.querySelector('.header');
  var bar = document.querySelector('.announcement');
  if (header) {
    var trigger = bar ? bar.offsetHeight : 0;
    var stuck = false;
    var sync = function () {
      var now = window.scrollY > trigger;
      if (now !== stuck) { stuck = now; header.classList.toggle('is-stuck', now); }
    };
    window.addEventListener('scroll', sync, { passive: true });
    sync();
  }

  /* --- "Unsere Geschichte" five-station story --- */
  var dots = Array.prototype.slice.call(document.querySelectorAll('.gsteps__dot'));
  var panels = Array.prototype.slice.call(document.querySelectorAll('.gpanel'));
  dots.forEach(function (dot) {
    dot.addEventListener('click', function () {
      var i = Number(dot.dataset.step);
      dots.forEach(function (d, n) {
        d.classList.toggle('is-active', n === i);
        d.setAttribute('aria-selected', n === i ? 'true' : 'false');
      });
      panels.forEach(function (p, n) {
        p.classList.toggle('is-active', n === i);
        p.hidden = n !== i;
      });
    });
  });

  /* --- Scroll reveal: a short fade and rise, once per element --- */
  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!reduced && 'IntersectionObserver' in window) {
    var targets = document.querySelectorAll(
      '.hero__copy, .hero__media, .usp__col, .story__text, .story__media,' +
      '.highlight__text, .highlight__media, .specs__item,' +
      '.section-eyebrow, .section-title, .section-lead,' +
      '.pcard, .steps__item, .wcard, .geschichte__box, .icard,' +
      '.newsletter__text, .newsletter__form, .trust__item'
    );
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        io.unobserve(entry.target);
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.06 });

    Array.prototype.forEach.call(targets, function (el, i) {
      el.classList.add('reveal');
      // a light stagger inside grids, capped so nothing lags
      el.style.transitionDelay = (i % 6) * 55 + 'ms';
      io.observe(el);
    });
  }
})();
