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

// Mobile menu functionality
document.addEventListener('DOMContentLoaded', function () {
  const toggle = document.querySelector('.mobile-menu-toggle');
  const overlay = document.querySelector('.mobile-menu-overlay');
  const mobileNav = document.querySelector('.mobile-nav');

  if (!toggle || !overlay || !mobileNav) return;

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
});
