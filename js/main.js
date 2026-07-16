/**
 * JK OVERSEAS — Main JavaScript
 * Scroll-to-top | Product Filter | Contact Form | Client Marquee
 */

(function () {
  'use strict';

  /* ---- Scroll To Top ---- */
  const scrollBtn = document.getElementById('scrollTop');

  if (scrollBtn) {
    window.addEventListener('scroll', function () {
      scrollBtn.classList.toggle('visible', window.scrollY > 400);
    }, { passive: true });

    scrollBtn.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ---- Product Filter (static UI) ---- */
  const filterTabs    = document.querySelectorAll('.filter-tab');
  const productCards  = document.querySelectorAll('[data-category]');

  if (filterTabs.length && productCards.length) {
    filterTabs.forEach(function (tab) {
      tab.addEventListener('click', function () {
        /* Update active tab */
        filterTabs.forEach(function (t) { t.classList.remove('active'); });
        tab.classList.add('active');

        const category = tab.getAttribute('data-filter');

        productCards.forEach(function (card) {
          if (category === 'all' || card.getAttribute('data-category') === category) {
            card.style.display = '';
            /* Re-trigger animation */
            card.classList.remove('visible');
            setTimeout(function () { card.classList.add('visible'); }, 50);
          } else {
            card.style.display = 'none';
          }
        });
      });
    });
  }

  /* ---- Static Search Box (UI feedback only) ---- */
  const searchInput = document.getElementById('productSearch');

  if (searchInput && productCards.length) {
    searchInput.addEventListener('input', function () {
      const query = this.value.toLowerCase().trim();
      productCards.forEach(function (card) {
        const title = (card.querySelector('.product-card-title, .product-detail-title') || card)
          .textContent.toLowerCase();
        const desc  = (card.querySelector('.product-card-desc, .product-detail-desc') || card)
          .textContent.toLowerCase();
        const match = !query || title.includes(query) || desc.includes(query);
        card.style.display = match ? '' : 'none';
      });
    });
  }

  /* ---- Contact Form ----
     Handled by js/contact.js using EmailJS.
     Validation + submission logic lives there.
  ---- */

  /* ---- Client Logos Auto-Scroll (CSS marquee fallback) ---- */
  const marquee = document.querySelector('.clients-track');
  if (marquee) {
    const list = marquee.querySelector('.clients-list');
    if (list) {
      /* Clone list for seamless loop */
      const clone = list.cloneNode(true);
      clone.setAttribute('aria-hidden', 'true');
      marquee.appendChild(clone);
    }
  }

  /* ---- Download Card Click ---- */
  document.querySelectorAll('.download-card[data-file]').forEach(function (card) {
    card.style.cursor = 'pointer';
    card.addEventListener('click', function () {
      const file = this.getAttribute('data-file');
      /* In production, replace with real file path */
      alert('Download will begin: ' + file + '\n(Replace with actual file path in production)');
    });
  });

  /* ---- Add field-error style ---- */
  const style = document.createElement('style');
  style.textContent =
    '.field-invalid { border-color: #DC2626 !important; box-shadow: 0 0 0 3px rgba(220,38,38,0.12) !important; }' +
    '.field-error { display:block; font-size:0.75rem; color:#DC2626; margin-top:0.25rem; min-height:1rem; }';
  document.head.appendChild(style);

})();
