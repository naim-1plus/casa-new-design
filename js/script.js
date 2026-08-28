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
})();
