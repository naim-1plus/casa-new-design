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

  /* --- Scroll reveal (same timing and easing as the reference build) --- */
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.documentElement.classList.add('no-motion');
  } else if ('IntersectionObserver' in window) {
    var targets = document.querySelectorAll(
      '.usp__col,' +
      '.story__text, .story__media,' +
      '.highlight__text, .highlight__media, .specs__item,' +
      '.section-eyebrow, .section-title, .section-lead,' +
      '.pcard, .steps__item, .wcard,' +
      '.geschichte__media, .geschichte__story,' +
      '.icard, .newsletter__text, .newsletter__form,' +
      '.trust__item, .footer__brand, .footer__col'
    );

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('rv-on');
        io.unobserve(entry.target);
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    var groups = {};
    Array.prototype.forEach.call(targets, function (el) {
      // stagger siblings that share a parent, the way the reference does
      var key = el.parentNode.className || 'root';
      groups[key] = (groups[key] || 0);
      el.style.transitionDelay = Math.min(groups[key], 3) * 90 + 'ms';
      groups[key]++;

      if (el.getBoundingClientRect().top < window.innerHeight * 0.85) {
        el.classList.add('rv-on');          // already in view: show it straight away
      } else {
        el.classList.add('rv-init');
        io.observe(el);
      }
    });
  }

})();
