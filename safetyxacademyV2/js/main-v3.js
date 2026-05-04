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
    function closeMobileNav() {
      navPanel.classList.remove('is-open');
      document.body.classList.remove('nav-open');
      navToggle.setAttribute('aria-expanded', 'false');
    }

    navToggle.addEventListener('click', function () {
      var isOpen = navPanel.classList.contains('is-open');
      if (isOpen) {
        closeMobileNav();
      } else {
        navPanel.classList.add('is-open');
        document.body.classList.add('nav-open');
        navToggle.setAttribute('aria-expanded', 'true');
      }
    });

    navPanel.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', closeMobileNav);
    });
  }

  document.addEventListener('keydown', function (e) {
    if (e.key !== 'Escape') return;

    var subsOpen = document.querySelectorAll('.sx-nav-panel__subtoggle[aria-expanded="true"]');
    if (subsOpen.length) {
      subsOpen.forEach(function (btn) {
        btn.setAttribute('aria-expanded', 'false');
        var sid = btn.getAttribute('aria-controls');
        var subEl = sid ? document.getElementById(sid) : null;
        if (subEl) subEl.hidden = true;
      });
      return;
    }

    var ddsOpen = document.querySelectorAll('.sx-nav-dropdown.is-open');
    if (ddsOpen.length) {
      ddsOpen.forEach(function (dd) {
        dd.classList.remove('is-open');
        var t = dd.querySelector('.sx-nav-dropdown__toggle');
        if (t) t.setAttribute('aria-expanded', 'false');
      });
      return;
    }

    if (navPanel && navToggle && navPanel.classList.contains('is-open')) {
      navPanel.classList.remove('is-open');
      document.body.classList.remove('nav-open');
      navToggle.setAttribute('aria-expanded', 'false');
    }
  });

  document.querySelectorAll('.sx-nav-panel__subtoggle').forEach(function (btn) {
    var subId = btn.getAttribute('aria-controls');
    var subEl = subId ? document.getElementById(subId) : null;
    if (!subEl) return;
    btn.addEventListener('click', function (e) {
      e.stopPropagation();
      var open = btn.getAttribute('aria-expanded') === 'true';
      btn.setAttribute('aria-expanded', open ? 'false' : 'true');
      subEl.hidden = open;
    });
  });

  document.querySelectorAll('.sx-nav-dropdown').forEach(function (wrap) {
    var toggle = wrap.querySelector('.sx-nav-dropdown__toggle');
    var menu = wrap.querySelector('.sx-nav-dropdown__menu');
    if (!toggle || !menu) return;

    wrap.addEventListener('click', function (e) {
      e.stopPropagation();
    });

    toggle.addEventListener('click', function (e) {
      e.stopPropagation();
      var expanded = toggle.getAttribute('aria-expanded') === 'true';
      var nextOpen = !expanded;
      toggle.setAttribute('aria-expanded', nextOpen ? 'true' : 'false');
      wrap.classList.toggle('is-open', nextOpen);
    });

    menu.querySelectorAll('a').forEach(function (lnk) {
      lnk.addEventListener('keydown', function (ke) {
        if (ke.key !== 'Escape') return;
        ke.stopPropagation();
        wrap.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
        toggle.focus();
      });
    });
  });

  document.addEventListener('click', function () {
    document.querySelectorAll('.sx-nav-dropdown.is-open').forEach(function (wrap) {
      wrap.classList.remove('is-open');
      var tg = wrap.querySelector('.sx-nav-dropdown__toggle');
      if (tg) tg.setAttribute('aria-expanded', 'false');
    });
  });

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
