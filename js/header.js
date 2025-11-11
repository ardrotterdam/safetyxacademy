// header.js - Werkt PERFECT met fetch-include

(function () {
  // Voorkom dubbele init
  if (window.__headerJS) return;
  window.__headerJS = true;

  // Wacht tot header is ingeladen
  function waitForHeader(callback) {
    const check = () => {
      const header = document.querySelector('#header-include .main-header');
      if (header) {
        callback(header);
      } else {
        requestAnimationFrame(check);
      }
    };
    check();
  }

  // Scroll effect
  function initScroll(header) {
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
  function initMobileMenu(header) {
    const toggle = header.querySelector('.mobile-menu-toggle');
    const overlay = header.querySelector('.mobile-menu-overlay');
    const nav = header.querySelector('.mobile-nav');
    const desktopNav = header.querySelector('.desktop-nav');

    if (!toggle || !overlay || !nav) return;

    // Verberg desktop menu op mobiel
    if (window.innerWidth <= 768) {
      if (desktopNav) desktopNav.style.display = 'none';
    }

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
  }

  // Start alles
  waitForHeader((header) => {
    initScroll(header);
    initMobileMenu(header);
  });

  // Herinitialiseer bij resize (mobiel ↔ desktop)
  window.addEventListener('resize', () => {
    const header = document.querySelector('#header-include .main-header');
    if (header) {
      const desktopNav = header.querySelector('.desktop-nav');
      if (desktopNav) {
        desktopNav.style.display = window.innerWidth <= 768 ? 'none' : 'flex';
    }
      }
  });
})();