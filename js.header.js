// scrolled header
window.addEventListener('scroll', function () {
  const header = document.querySelector('.main-header');
  if (!header) return;

  if (window.scrollY > 50) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
});

// mobile menu
document.addEventListener('DOMContentLoaded', function () {
  const toggle = document.querySelector('.mobile-menu-toggle');
  const overlay = document.querySelector('.mobile-menu-overlay');

  if (!toggle || !overlay) return;

  toggle.addEventListener('click', function () {
    overlay.classList.toggle('active');
    toggle.classList.toggle('active');
    document.body.style.overflow = overlay.classList.contains('active') ? 'hidden' : '';
  });

  // sluit als je op de achtergrond klikt
  overlay.addEventListener('click', function (e) {
    if (e.target === overlay) {
      overlay.classList.remove('active');
      toggle.classList.remove('active');
      document.body.style.overflow = '';
    }
  });
});
