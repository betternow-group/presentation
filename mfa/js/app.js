/* Uruchomienie prezentacji: dobór kadru do ekranu, dopasowanie treści, animacje wejścia.
   reveal.js 6.0.2 + wtyczka notatek (klawisz S otwiera widok prelegenta). */
(function () {
  var root = document.documentElement;
  function pick() {
    var r = window.innerWidth / window.innerHeight;
    if (r < 0.95) return { n: 'tall', w: 1080, h: Math.max(1500, Math.min(2400, Math.round(1080 / r))) };
    if (r < 1.45) return { n: 'mid',  w: 1440, h: 1080 };
    return { n: 'wide', w: 1920, h: 1080 };
  }
  var lay = pick();
  root.classList.add('layout-' + lay.n);
  var deck = new Reveal({
    width: lay.w, height: lay.h, margin: 0, minScale: 0.1, maxScale: 4,
    center: false, display: 'flex', hash: true, controls: true, progress: true,
    slideNumber: 'c/t', transition: 'fade', transitionSpeed: 'default',
    backgroundTransition: 'none', scrollActivationWidth: null, view: null, pause: false, help: true,
    plugins: [RevealNotes]
  });
  var slides = Array.prototype.slice.call(document.querySelectorAll('.reveal .slides > section.slide'));

  // Oznacz elementy do animacji i nadaj im kolejność (opóźnienia kaskadowe)
  slides.forEach(function (s) {
    var items = s.querySelectorAll(
      '.kicker, h1, h2, .lead, .author, .grid > *, .methods > *, .big-list > li, ' +
      '.sources > li, .links > *, .chart, .conclusion, .note, .slide > p, .when, .agenda > *, .price > *, .bn-offer > *, .steps, .bn-end-grid > *, .bn-end-links'
    );
    Array.prototype.forEach.call(items, function (el, idx) {
      el.classList.add('anim');
      el.style.setProperty('--i', idx);
    });
  });

  function overflows(sl) {
    var r = sl.getBoundingClientRect();
    var padB = parseFloat(getComputedStyle(sl).paddingBottom) * (r.height / sl.offsetHeight) || 0;
    var bottom = 0;
    Array.prototype.forEach.call(sl.children, function (c) {
      bottom = Math.max(bottom, c.getBoundingClientRect().bottom);
    });
    return bottom + padB > r.bottom + 1;
  }
  // Jeśli treść slajdu nie mieści się w kadrze 1920x1080, zmniejsz go proporcjonalnie
  function fit(sl) {
    if (!sl || sl.dataset.fitted) return;
    sl.style.setProperty('--k', 1);
    var k = 1;
    while (overflows(sl) && k > 0.6) {
      k -= 0.03;
      sl.style.setProperty('--k', k.toFixed(2));
    }
    sl.dataset.fitted = '1';
  }
  function show(sl, prev) {
    fit(sl);
    sl.classList.add('active');
    if (prev && prev !== sl) {
      setTimeout(function () {
        if (prev !== deck.getCurrentSlide()) prev.classList.remove('active'); // reset animacji
      }, 900);
    }
  }
  deck.on('ready', function (e) { show(e.currentSlide); });
  deck.on('slidechanged', function (e) { show(e.currentSlide, e.previousSlide); });
  deck.initialize();
  window.addEventListener('resize', function () {
    var n = pick();
    if (n.n === lay.n && n.h === lay.h) return;
    root.classList.remove('layout-' + lay.n); root.classList.add('layout-' + n.n);
    lay = n;
    deck.configure({ width: n.w, height: n.h });
    slides.forEach(function (sl) { delete sl.dataset.fitted; sl.style.setProperty('--k', 1); });
    setTimeout(function () { fit(deck.getCurrentSlide()); }, 120);
  });
})();
