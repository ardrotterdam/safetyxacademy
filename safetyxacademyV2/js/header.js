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
      body.classList.add('nav-open');
      
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
      body.classList.remove('nav-open');
      
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
      console.log('Toggle clicked, overlay is-open:', overlay.classList.contains('is-open'));
      if (overlay.classList.contains('is-open')) {
        closeMenu();
      } else {
        openMenu();
      }
    });
    
    // Debug: log when initialized
    console.log('Mobile nav initialized successfully');

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

    return true;
  }

  // Initialize function with retry logic
  function tryInit() {
    return initHeaderNav();
  }

  // Function to setup initialization with multiple attempts
  function setupInit() {
    // Try immediately
    if (tryInit()) {
      return;
    }

    // Try after a short delay (for fetch-loaded headers)
    setTimeout(() => {
      if (!tryInit()) {
        // Try again after longer delay
        setTimeout(() => tryInit(), 500);
      }
    }, 100);

    // Listen for headerloaded events
    const handler = function() {
      setTimeout(() => tryInit(), 50);
    };
    
    document.addEventListener('headerloaded', handler);
    window.addEventListener('headerloaded', handler);

    // Also try on DOMContentLoaded
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', function() {
        setTimeout(() => tryInit(), 100);
      });
    } else {
      // DOM already loaded, try after a short delay
      setTimeout(() => tryInit(), 100);
    }
  }

  // Start initialization
  setupInit();

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

