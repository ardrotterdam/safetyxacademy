// Header scroll behavior
window.addEventListener('scroll', function () {
  const header = document.querySelector('.main-header');
  if (!header) return;

  if (window.scrollY > 50) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
});

// Mobile menu initialization function
function initMobileMenu() {
  const toggle = document.querySelector('.mobile-menu-toggle');
  const overlay = document.querySelector('.mobile-menu-overlay');
  const mobileNav = document.querySelector('.mobile-nav');

  // Return if elements don't exist or menu is already initialized
  if (!toggle || !overlay || !mobileNav) return false;
  if (toggle.dataset.initialized === 'true') return true;

  // Mark as initialized to prevent duplicate event listeners
  toggle.dataset.initialized = 'true';

  function openMenu() {
    toggle.classList.add('active');
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    toggle.classList.remove('active');
    overlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  // Toggle menu on button click
  toggle.addEventListener('click', function (e) {
    e.preventDefault();
    e.stopPropagation();
    if (overlay.classList.contains('active')) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  // Close menu when clicking on overlay (outside nav)
  overlay.addEventListener('click', function (e) {
    if (e.target === overlay) {
      closeMenu();
    }
  });

  // Prevent clicks inside nav from closing menu
  mobileNav.addEventListener('click', function (e) {
    e.stopPropagation();
  });

  // Close menu when clicking on any link
  mobileNav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', function () {
      closeMenu();
    });
  });

  // Close menu on escape key
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && overlay.classList.contains('active')) {
      closeMenu();
    }
  });

  return true;
}

// Try to initialize immediately if DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', function () {
    initMobileMenu();
    // Also try again after delays in case header loads asynchronously
    setTimeout(initMobileMenu, 100);
    setTimeout(initMobileMenu, 500);
  });
} else {
  // DOM is already ready
  initMobileMenu();
  // Try again after delays in case header loads asynchronously
  setTimeout(initMobileMenu, 100);
  setTimeout(initMobileMenu, 500);
}

// Use MutationObserver to watch for when header elements are added to DOM
let observer = null;
const startObserver = function() {
  if (observer) return; // Already observing
  
  observer = new MutationObserver(function(mutations) {
    const toggle = document.querySelector('.mobile-menu-toggle');
    if (toggle && !toggle.dataset.initialized) {
      if (initMobileMenu()) {
        // Menu initialized successfully, stop observing
        observer.disconnect();
        observer = null;
      }
    }
  });

  if (document.body) {
    observer.observe(document.body, {
      childList: true,
      subtree: true
    });
  }
};

// Start observing when DOM is ready
if (document.body) {
  startObserver();
} else {
  document.addEventListener('DOMContentLoaded', function() {
    startObserver();
  });
}

// Expose init function globally so it can be called after async header load
window.initMobileMenu = initMobileMenu;
