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

