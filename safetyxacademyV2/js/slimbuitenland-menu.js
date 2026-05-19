/**
 * Slim Buitenland Mobile Menu Handler
 * Handles mobile hamburger menu toggle, ESC key, overlay clicks, and body scroll lock
 */

(function() {
  'use strict';

  /**
   * Initialize mobile navigation
   */
  function initSBMobileNav() {
    const toggle = document.querySelector('.sb-nav-toggle');
    const overlay = document.querySelector('.sb-mobile-nav-overlay');
    const body = document.body;

    if (!toggle || !overlay) {
      return false;
    }

    // Prevent double initialization
    if (toggle.hasAttribute('data-nav-initialized')) {
      return true;
    }
    toggle.setAttribute('data-nav-initialized', 'true');

    // Store scroll position
    let scrollPosition = 0;

    function openMenu() {
      // Save current scroll position
      scrollPosition = window.pageYOffset || document.documentElement.scrollTop;
      
      overlay.classList.add('is-open');
      toggle.classList.add('active');
      body.classList.add('sb-nav-open');
      
      // Prevent body scroll and restore scroll position
      body.style.top = `-${scrollPosition}px`;
      body.style.position = 'fixed';
      body.style.width = '100%';
      
      toggle.setAttribute('aria-expanded', 'true');
      toggle.setAttribute('aria-label', 'Sluit navigatie');
    }

    function closeMenu() {
      overlay.classList.remove('is-open');
      toggle.classList.remove('active');
      body.classList.remove('sb-nav-open');
      
      // Restore scroll position
      body.style.top = '';
      body.style.position = '';
      body.style.width = '';
      window.scrollTo(0, scrollPosition);
      
      toggle.setAttribute('aria-expanded', 'false');
      toggle.setAttribute('aria-label', 'Open navigatie');
      // Return focus to toggle button when closing
      toggle.focus();
    }

    // Toggle via hamburger
    toggle.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      if (overlay.classList.contains('is-open')) {
        closeMenu();
      } else {
        openMenu();
      }
    });
    
    // Click on dark overlay outside panel = close
    overlay.addEventListener('click', function(e) {
      if (e.target === overlay) {
        closeMenu();
      }
    });

    // Prevent panel clicks from closing menu
    const mobilePanel = overlay.querySelector('.sb-mobile-nav-panel');
    if (mobilePanel) {
      mobilePanel.addEventListener('click', function(e) {
        e.stopPropagation();
      });
    }

    // ESC = close
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && overlay.classList.contains('is-open')) {
        closeMenu();
      }
    });

    // Click on link in mobile-nav = close
    overlay.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', function() {
        closeMenu();
      });
    });

    return true;
  }

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
      setTimeout(() => initSBMobileNav(), 100);
    });
  } else {
    setTimeout(() => initSBMobileNav(), 100);
  }
})();

