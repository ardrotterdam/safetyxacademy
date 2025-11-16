/**
 * SafetyXAcademy Mobile Navigation Handler
 * Handles mobile menu toggle, ESC key, focus management, and overlay clicks
 */

(function() {
  'use strict';

  /**
   * Initialize mobile navigation
   * Robuuste init functie met alle features
   */
  function initHeaderNav() {
    const toggle = document.querySelector('.nav-toggle');
    const overlay = document.querySelector('.mobile-nav-overlay');
    const mobileNav = document.querySelector('.mobile-nav-panel');
    const body = document.body;

    if (!toggle || !overlay || !mobileNav) {
      // Header might not be loaded yet, wait for headerloaded event
      document.addEventListener('headerloaded', initHeaderNav, { once: true });
      return;
    }

    function openMenu() {
      overlay.classList.add('is-open');
      toggle.classList.add('active');
      body.classList.add('nav-open');
      toggle.setAttribute('aria-expanded', 'true');
      toggle.setAttribute('aria-label', 'Sluit navigatie');
    }

    function closeMenu() {
      overlay.classList.remove('is-open');
      toggle.classList.remove('active');
      body.classList.remove('nav-open');
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

    // Klik op donkere overlay buiten panel = sluiten
    overlay.addEventListener('click', function(e) {
      if (e.target === overlay) {
        closeMenu();
      }
    });

    // Prevent panel clicks from closing menu
    mobileNav.addEventListener('click', function(e) {
      e.stopPropagation();
    });

    // ESC = sluiten
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && overlay.classList.contains('is-open')) {
        closeMenu();
      }
    });

    // Klik op link in mobile-nav = sluiten
    mobileNav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', function() {
        closeMenu();
      });
    });
  }

  // Initialize when DOM is ready
  function tryInit() {
    const toggle = document.querySelector('.nav-toggle');
    const overlay = document.querySelector('.mobile-nav-overlay');
    const mobileNav = document.querySelector('.mobile-nav-panel');
    
    if (toggle && overlay && mobileNav) {
      initHeaderNav();
      return true;
    }
    return false;
  }

  // Try immediately
  if (!tryInit()) {
    // Wait for DOMContentLoaded
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', function() {
        if (!tryInit()) {
          // Wait for headerloaded event (in case header is loaded via fetch)
          document.addEventListener('headerloaded', initHeaderNav, { once: true });
        }
      });
    } else {
      // DOM already loaded, wait for headerloaded
      document.addEventListener('headerloaded', initHeaderNav, { once: true });
    }
  }

  // Also listen for headerloaded event (in case header is loaded via fetch)
  document.addEventListener('headerloaded', initHeaderNav, { once: true });

  /**
   * Desktop Navigation Dropdown Handler
   * Handles dropdown toggle for desktop navigation
   */
  function initDropdownNav() {
    const dropdownButtons = document.querySelectorAll('.nav-link--parent');
    const dropdownItems = document.querySelectorAll('.nav-item--has-dropdown');
    
    if (dropdownButtons.length === 0) {
      // Header might not be loaded yet, wait for headerloaded event
      window.addEventListener('headerloaded', initDropdownNav, { once: true });
      return;
    }

    // Close all dropdowns
    function closeAllDropdowns() {
      dropdownItems.forEach(item => {
        item.classList.remove('nav-item--open');
        const button = item.querySelector('.nav-link--parent');
        if (button) {
          button.setAttribute('aria-expanded', 'false');
        }
      });
    }

    // Toggle dropdown
    dropdownButtons.forEach(button => {
      button.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        
        const parentItem = button.closest('.nav-item--has-dropdown');
        const isOpen = parentItem.classList.contains('nav-item--open');
        
        // Close all dropdowns first
        closeAllDropdowns();
        
        // Toggle this dropdown
        if (!isOpen) {
          parentItem.classList.add('nav-item--open');
          button.setAttribute('aria-expanded', 'true');
        }
      });
    });

    // Close dropdowns when clicking outside
    document.addEventListener('click', function(e) {
      if (!e.target.closest('.nav-item--has-dropdown')) {
        closeAllDropdowns();
      }
    });

    // Close dropdowns on ESC key
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape') {
        closeAllDropdowns();
      }
    });
  }

  // Initialize dropdown nav when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initDropdownNav);
  } else {
    initDropdownNav();
  }

  // Also listen for headerloaded event (in case header is loaded via fetch)
  window.addEventListener('headerloaded', initDropdownNav, { once: true });

  // Set active navigation link based on current pathname
  function setActiveNavLink() {
    const pathname = window.location.pathname;
    // Only select actual anchor links, not buttons
    const navLinks = document.querySelectorAll('.nav-link[href]');
    
    // Remove active class from all nav links first
    navLinks.forEach(link => {
      link.classList.remove('nav-link--active');
      link.classList.remove('active'); // Also remove 'active' class
    });

    // Map pathnames to their corresponding nav links
    const pathMap = {
      '/index.html': '/index.html',
      '/': '/index.html',
      '/nebosh-opleiding.html': '/nebosh-opleiding.html',
      '/nebosh-quiz.html': '/nebosh-quiz.html',
      '/nebosh-benelux-ports.html': '/nebosh-benelux-ports.html',
      '/nebosh-offshore.html': '/nebosh-offshore.html',
      '/blog/index.html': '/blog/index.html',
      '/jobs.html': '/jobs.html',
      '/over-ons.html': '/over-ons.html',
      '/aanmelden.html': '/aanmelden.html'
    };

    // Determine which link should be active
    let activePath = null;

    // Check exact matches first
    if (pathMap[pathname]) {
      activePath = pathMap[pathname];
    }
    // Check for blog pages (any path starting with /blog/)
    else if (pathname.startsWith('/blog/')) {
      activePath = '/blog/index.html';
    }
    // Check for home page (index.html or root)
    else if (pathname === '/index.html' || pathname === '/' || pathname === '') {
      activePath = '/index.html';
    }

    // Find and activate the matching nav link (only anchor tags)
    if (activePath) {
      navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === activePath || (activePath === '/index.html' && (href === '/index.html' || href === '/'))) {
          link.classList.add('nav-link--active');
          link.classList.add('active'); // Also add 'active' class for new CSS
        }
      });
    }
  }

  // Initialize active nav link when DOM is ready
  function initActiveNav() {
    // Only select actual anchor links, not buttons
    const navLinks = document.querySelectorAll('.nav-link[href]');
    
    if (navLinks.length === 0) {
      // Header might not be loaded yet, wait for headerloaded event
      window.addEventListener('headerloaded', initActiveNav, { once: true });
      return;
    }

    setActiveNavLink();
  }

  // Run on DOMContentLoaded
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initActiveNav);
  } else {
    initActiveNav();
  }

  // Also listen for headerloaded event (in case header is loaded via fetch)
  window.addEventListener('headerloaded', setActiveNavLink, { once: false });
})();

