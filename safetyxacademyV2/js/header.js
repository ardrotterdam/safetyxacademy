/**
 * SafetyXAcademy Mobile Navigation Handler
 * Handles mobile menu toggle, ESC key, focus management, and overlay clicks
 */

(function() {
  'use strict';

  // Wait for DOM and header to be loaded
  function initMobileNav() {
    const navToggle = document.querySelector('.nav-toggle');
    const mobileOverlay = document.querySelector('.mobile-nav-overlay');
    const body = document.body;
    
    if (!navToggle || !mobileOverlay) {
      // Header might not be loaded yet, wait for headerloaded event
      window.addEventListener('headerloaded', initMobileNav, { once: true });
      return;
    }

    // Get first focusable element in mobile menu
    const firstMobileLink = mobileOverlay.querySelector('.mobile-nav-main-link');
    
    // Toggle menu function
    function toggleMenu(isOpen) {
      const isCurrentlyOpen = body.classList.contains('nav-open');
      
      if (isOpen === undefined) {
        isOpen = !isCurrentlyOpen;
      }
      
      if (isOpen) {
        body.classList.add('nav-open');
        navToggle.setAttribute('aria-expanded', 'true');
        navToggle.setAttribute('aria-label', 'Sluit navigatie');
        mobileOverlay.classList.add('is-open');
        
        // Focus first link when opening
        if (firstMobileLink) {
          setTimeout(() => firstMobileLink.focus(), 100);
        }
      } else {
        body.classList.remove('nav-open');
        navToggle.setAttribute('aria-expanded', 'false');
        navToggle.setAttribute('aria-label', 'Open navigatie');
        mobileOverlay.classList.remove('is-open');
        
        // Return focus to toggle button when closing
        navToggle.focus();
      }
    }

    // Toggle button click
    navToggle.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      toggleMenu();
    });

    // Close menu when clicking overlay (outside panel)
    mobileOverlay.addEventListener('click', function(e) {
      if (e.target === mobileOverlay) {
        toggleMenu(false);
      }
    });

    // Prevent panel clicks from closing menu
    const mobilePanel = mobileOverlay.querySelector('.mobile-nav-panel');
    if (mobilePanel) {
      mobilePanel.addEventListener('click', function(e) {
        e.stopPropagation();
      });
    }

    // ESC key to close menu
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && body.classList.contains('nav-open')) {
        toggleMenu(false);
      }
    });

    // Close menu when clicking any link inside (optional - for better UX)
    const mobileLinks = mobileOverlay.querySelectorAll('a');
    mobileLinks.forEach(link => {
      link.addEventListener('click', function() {
        // Small delay to allow navigation, then close
        setTimeout(() => toggleMenu(false), 100);
      });
    });
  }

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initMobileNav);
  } else {
    initMobileNav();
  }

  // Also listen for headerloaded event (in case header is loaded via fetch)
  window.addEventListener('headerloaded', initMobileNav, { once: true });
})();

