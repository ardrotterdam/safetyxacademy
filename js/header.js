// header donker maken bij scrollen
window.addEventListener('scroll', function () {
  const header = document.querySelector('.main-header');
  if (!header) return;

  if (window.scrollY > 50) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
});

// mobiel menu open/dicht
document.addEventListener('DOMContentLoaded', function () {
  const toggle = document.querySelector('.mobile-menu-toggle');
  const overlay = document.querySelector('.mobile-menu-overlay');

  if (!toggle || !overlay) return;

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

  toggle.addEventListener('click', function () {
    if (overlay.classList.contains('active')) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  // menu dicht als je op link klikt
  overlay.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  // klik naast het menu = dicht
  overlay.addEventListener('click', function (e) {
    if (e.target === overlay) {
      closeMenu();
    }
  });
});
