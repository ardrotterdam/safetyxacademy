// header.js - 100% WERKT MET FETCH (definitief)

document.addEventListener('DOMContentLoaded', () => {
  // Wacht tot header is ingeladen
  const initHeader = () => {
    const container = document.getElementById('header-include');
    const header = container?.querySelector('.main-header');
    const toggle = header?.querySelector('.mobile-menu-toggle');
    const overlay = header?.querySelector('.mobile-menu-overlay');
    const nav = header?.querySelector('.mobile-nav');
    const desktopNav = header?.querySelector('.desktop-nav');

    if (!toggle || !overlay || !nav) {
      // Nog niet klaar → probeer opnieuw
      setTimeout(initHeader, 50);
      return;
    }

    // Eén keer initialiseren
    if (window.__headerReady) return;
    window.__headerReady = true;

    // Scroll effect
    const onScroll = () => {
      header.classList.toggle('scrolled', window.scrollY > 50);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    // Verberg desktop menu op mobiel
    const updateNav = () => {
      if (desktopNav) {
        desktopNav.style.display = window.innerWidth <= 768 ? 'none' : 'flex';
      }
    };
    updateNav();
    window.addEventListener('resize', updateNav);

    // Mobile menu
    const open = () => {
      toggle.classList.add('active');
      overlay.classList.add('active');
      document.body.style.overflow = 'hidden';
    };
    const close = () => {
      toggle.classList.remove('active');
      overlay.classList.remove('active');
      document.body.style.overflow = '';
    };

    toggle.addEventListener('click', (e) => {
      e.preventDefault();
      overlay.classList.contains('active') ? close() : open();
    });
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) close();
    });
    nav.querySelectorAll('a').forEach(a => a.addEventListener('click', close));
  };

  // Start
  initHeader();
});