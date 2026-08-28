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
})();
