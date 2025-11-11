// Init when header include is ready
document.addEventListener('headerloaded', () => {
  const toggle = document.querySelector('.mobile-menu-toggle');
  const overlay = document.querySelector('.mobile-menu-overlay');
  if (!toggle || !overlay) return;

  // Open/close overlay
  toggle.onclick = () => overlay.classList.toggle('active');

  // Close when tapping outside panel
  overlay.onclick = (e) => {
    if (e.target === overlay) overlay.classList.remove('active');
  };
});

// Fallback if header is already in the DOM
if (document.querySelector('.mobile-menu-toggle')) {
  window.dispatchEvent(new Event('headerloaded'));
}
