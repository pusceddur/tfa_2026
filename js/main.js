(function () {
  'use strict';

  var toggle = document.querySelector('.nav-toggle');
  var navList = document.getElementById('nav-menu');
  if (toggle && navList) {
    toggle.addEventListener('click', function () {
      var open = toggle.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open);
    });
    navList.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        toggle.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!reduce) {
    var targets = document.querySelectorAll('.section, .hero, .ar-hero, .ar-cta');
    targets.forEach(function (el) { el.classList.add('reveal'); });

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });

    targets.forEach(function (el) { observer.observe(el); });
  }

  var cd = document.querySelector('[data-countdown]');
  if (cd) {
    var target = new Date(cd.getAttribute('data-countdown')).getTime();
    var tick = function () {
      var days = Math.ceil((target - Date.now()) / 86400000);
      cd.textContent = days > 0 ? 'J – ' + days : 'C’est parti !';
    };
    tick();
    setInterval(tick, 60000);
  }

  document.querySelectorAll('.slot-fav').forEach(function (btn) {
    btn.setAttribute('aria-pressed', 'false');
    btn.addEventListener('click', function () {
      btn.setAttribute('aria-pressed', btn.getAttribute('aria-pressed') !== 'true' ? 'true' : 'false');
    });
  });

  var cart = document.querySelector('.cart');
  if (cart) {
    var qtyVal = cart.querySelector('[data-qty]');
    var lineDesc = cart.querySelector('[data-line-desc]');
    var lineTotal = cart.querySelector('[data-line-total]');
    var totalEl = cart.querySelector('[data-total]');
    var nameEl = cart.querySelector('.cart-item-name');
    var noteEl = cart.querySelector('.cart-note');
    var passes = document.querySelectorAll('.ticket-input');
    var options = document.querySelectorAll('.option-check');
    var qty = parseInt(qtyVal && qtyVal.textContent, 10) || 1;
    var euro = function (n) { return n + ' €'; };

    var renderCart = function () {
      var sel = document.querySelector('.ticket-input:checked');
      var price = sel ? parseFloat(sel.getAttribute('data-price')) : 95;
      var name = sel ? sel.closest('.ticket').querySelector('.ticket-name').firstChild.textContent.trim() : 'Pass 3 Jours';
      var optTotal = 0, optCount = 0;
      options.forEach(function (o) {
        if (o.checked) {
          optCount++;
          optTotal += parseFloat(o.closest('.option').querySelector('.option-price').textContent) || 0;
        }
      });
      var line = price * qty;
      if (nameEl) nameEl.textContent = name;
      if (qtyVal) qtyVal.textContent = qty;
      if (lineDesc) lineDesc.textContent = name + ' × ' + qty;
      if (lineTotal) lineTotal.textContent = euro(line);
      if (noteEl) noteEl.textContent = optCount
        ? optCount + ' option' + (optCount > 1 ? 's' : '') + ' · ' + euro(optTotal)
        : 'Aucune option ajoutée.';
      if (totalEl) totalEl.textContent = euro(line + optTotal);
    };
    cart.querySelectorAll('.cart-qty-btn').forEach(function (b) {
      b.addEventListener('click', function () {
        qty = Math.max(1, qty + (parseInt(b.getAttribute('data-step'), 10) || 0));
        renderCart();
      });
    });
    passes.forEach(function (i) { i.addEventListener('change', renderCart); });
    options.forEach(function (o) { o.addEventListener('change', renderCart); });
    renderCart();
  }

  var y = document.querySelector('[data-year]');
  if (y) y.textContent = String(new Date().getFullYear());
})();
