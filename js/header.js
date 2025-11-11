// header.js - WERKT 100% MET FETCH

document.addEventListener('headerloaded', () => {
  const toggle = document.querySelector('.mobile-menu-toggle');
  const overlay = document.querySelector('.mobile-menu-overlay');

  if (!toggle || !overlay) return;

  toggle.onclick = () => overlay.classList.toggle('active');
  overlay.onclick = e => e.target === overlay && overlay.classList.remove('active');
});

// Fallback: als header al geladen is (voor als fetch te snel is)
if (document.querySelector('.mobile-menu-toggle')) {
  window.dispatchEvent(new Event('headerloaded'));
}