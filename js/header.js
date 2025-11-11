// header.js - 100% WERKT MET FETCH + MOBIEL

(function () {
  if (window.__headerJS) return;
  window.__headerJS = true;

  // Wacht tot header is ingeladen via fetch
  function waitForHeader() {
    return new Promise((resolve) => {
      const check = () => {
        const container = document.getElementById('header-include');
        const header = container?.querySelector('.main-header');
        if (header && container.innerHTML.includes('mobile-menu-toggle')) {
          resolve(header);
        } else {
          requestAnimationFrame(check);
        }
      };
      check();
    });
  }

  // Scroll effect
  function initScroll(header) {
    const onScroll = () => {
      header.classList.toggle('scrolled', window.scrollY > 50);
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
    const updateDisplay = () => {
      if (desktopNav) {
        desktopNav.style.display = window.innerWidth <= 768 ? 'none' : 'flex';
      }
    };
    updateDisplay();
    window.addEventListener('resize', updateDisplay);

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
  }

  // Start alles
  waitForHeader().then((header) => {
    initScroll(header);
    initMobileMenu(header);
  });

  // Fallback: als header later komt
  const observer = new MutationObserver(() => {
    if (document.getElementById('header-include')?.innerHTML.includes('main-header')) {
      waitForHeader().then((header) => {
        if (!window.__headerInitDone) {
          window.__headerInitDone = true;
          initScroll(header);
          initMobileMenu(header);
        }
      });
      observer.disconnect();
    }
  });
  observer.observe(document.body, { childList: true, subtree: true });
})();