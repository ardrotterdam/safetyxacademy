(function () {
  'use strict';

  var header = document.getElementById('sx-header');
  var navToggle = document.getElementById('sx-nav-toggle');
  var navPanel = document.getElementById('sx-nav-panel');
  var heroInner = document.querySelector('.sx-hero__inner');
  var heroMedia = document.querySelector('.sx-hero__media');
  var heroVideo = document.getElementById('sx-hero-video');

  function onScroll() {
    var y = window.scrollY || document.documentElement.scrollTop;
    if (header) {
      header.classList.toggle('sx-header--scrolled', y > 48);
    }
    if (heroInner) {
      var offset = Math.min(y * 0.12, 80);
      heroInner.style.transform = 'translate3d(0, ' + offset + 'px, 0)';
      var op = Math.max(0.35, 1 - y * 0.001);
      heroInner.style.opacity = String(op);
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  if (navToggle && navPanel) {
    navToggle.addEventListener('click', function () {
      var open = navPanel.classList.toggle('is-open');
      navToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      document.body.classList.toggle('sx-nav-open', open);
    });
    navPanel.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        navPanel.classList.remove('is-open');
        navToggle.setAttribute('aria-expanded', 'false');
        document.body.classList.remove('sx-nav-open');
      });
    });
  }

  if (heroVideo && heroMedia) {
    heroVideo.addEventListener('error', function () {
      heroMedia.classList.add('sx-hero__media--fallback');
    });

    var narrowHero =
      window.matchMedia && window.matchMedia('(max-width: 768px)');
    function syncHeroPlayback() {
      if (!narrowHero) return;
      if (narrowHero.matches) {
        heroVideo.pause();
      } else {
        heroVideo.play().catch(function () {});
      }
    }
    syncHeroPlayback();
    if (narrowHero.addEventListener) {
      narrowHero.addEventListener('change', syncHeroPlayback);
    } else if (narrowHero.addListener) {
      narrowHero.addListener(syncHeroPlayback);
    }
  }

  var prefersReduced =
    window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function formatNl(n) {
    return new Intl.NumberFormat('nl-NL').format(n);
  }

  function animateStat(el, duration) {
    if (!el) return;
    var raw = el.getAttribute('data-target');
    if (!raw) return;
    var target = parseInt(raw, 10);
    if (isNaN(target)) return;
    var suffix = el.getAttribute('data-suffix') || '';
    var prefix = el.getAttribute('data-prefix') || '';
    if (prefersReduced) {
      el.textContent = prefix + formatNl(target) + suffix;
      return;
    }
    var start = performance.now();

    function frame(now) {
      var t = Math.min((now - start) / duration, 1);
      var eased = 1 - Math.pow(1 - t, 3);
      var val = Math.round(target * eased);
      el.textContent = prefix + formatNl(val) + suffix;
      if (t < 1) requestAnimationFrame(frame);
    }
    requestAnimationFrame(frame);
  }

  var statObserver = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var root = entry.target;
        root.querySelectorAll('[data-target]').forEach(function (el) {
          if (el.dataset.animated) return;
          el.dataset.animated = '1';
          animateStat(el, 1400);
        });
        statObserver.unobserve(root);
      });
    },
    { rootMargin: '0px 0px -10% 0px', threshold: 0.2 }
  );

  var bar = document.getElementById('sx-trust-bar');
  if (bar) statObserver.observe(bar);

  var revealObserver = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { rootMargin: '0px 0px -8% 0px', threshold: 0.08 }
  );

  document.querySelectorAll('.sx-reveal').forEach(function (el) {
    revealObserver.observe(el);
  });
})();
