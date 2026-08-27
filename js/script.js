/* Casa Salento — desktop interactions */
(function () {
  'use strict';

  /* --- Header dropdowns --- */
  var items = Array.prototype.slice.call(document.querySelectorAll('.nav__item.has-sub'));

  function closeAll(except) {
    items.forEach(function (item) {
      if (item === except) return;
      item.classList.remove('is-open');
      item.querySelector('.nav__link').setAttribute('aria-expanded', 'false');
    });
  }

  items.forEach(function (item) {
    var trigger = item.querySelector('.nav__link');
    trigger.addEventListener('click', function (e) {
      e.stopPropagation();
      var open = item.classList.toggle('is-open');
      trigger.setAttribute('aria-expanded', open ? 'true' : 'false');
      closeAll(item);
    });
  });

  document.addEventListener('click', function () { closeAll(null); });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeAll(null);
  });

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
})();
