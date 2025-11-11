// header.js - WERKT 100% MET FETCH

document.addEventListener('headerloaded', () => {
  const toggle = document.querySelector('.mobile-menu-toggle');
  const overlay = document.querySelector('.mobile-menu-overlay');
  const nav = document.querySelector('.mobile-nav');

  if (!toggle || !overlay || !nav) return;

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

  toggle.onclick = (e) => {
    e.preventDefault();
    overlay.classList.contains('active') ? close() : open();
  };

  overlay.onclick = (e) => {
    if (e.target === overlay) close();
  };

  nav.querySelectorAll('a').forEach(a => a.onclick = close);
});

// Fallback: als header al geladen is
document.addEventListener('DOMContentLoaded', () => {
  if (document.querySelector('.mobile-menu-toggle')) {
    window.dispatchEvent(new Event('headerloaded'));
  }
});