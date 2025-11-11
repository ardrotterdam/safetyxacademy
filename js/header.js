// header.js - Werkt met fetch-include

(function () {
  // Voorkom dubbele init
  if (window.__headerInit) return;
  window.__headerInit = true;

  // Scroll effect
  function initScroll() {
    const header = document.querySelector('.main-header');
    if (!header) return;

    const onScroll = () => {
      if (window.scrollY > 50) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  // Mobile menu
  function initMobileMenu() {
    const toggle = document.querySelector('.mobile-menu-toggle');
    const overlay = document.querySelector('.mobile-menu-overlay');
    const nav = document.querySelector('.mobile-nav');

    if (!toggle || !overlay || !nav) return false;
    if (toggle.dataset.init === 'true') return true;

    toggle.dataset.init = 'true';

    function open() {
      toggle.classList.add('active');
      overlay.classList.add('active');
      document.body.style.overflow = 'hidden';
    }

    function close() {
      toggle.classList.remove('active');
      overlay.classList.remove('active');
      document.body.style.overflow = '';
    }

    toggle.addEventListener('click', (e) => {
      e.preventDefault();
      overlay.classList.contains('active') ? close() : open();
    });

    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) close();
    });

    nav.querySelectorAll('a').forEach(a => a.addEventListener('click', close));

    return true;
  }

  // Wacht op header (via fetch)
  function waitForHeader() {
    const check = () => {
      if (document.querySelector('.main-header')) {
        initScroll();
        initMobileMenu();
      } else {
        requestAnimationFrame(check);
      }
    };
    check();
  }

  // Start
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', waitForHeader);
  } else {
    waitForHeader();
  }

  // Fallback: observer
  const observer = new MutationObserver(() => {
    if (document.querySelector('.main-header') && !window.__headerInitDone) {
      window.__headerInitDone = true;
      initScroll();
      initMobileMenu();
      observer.disconnect();
    }
  });
  observer.observe(document.body, { childList: true, subtree: true });
})();