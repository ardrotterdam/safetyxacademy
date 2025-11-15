// menu-scroll.js – active state bij scroll
document.addEventListener('DOMContentLoaded', () => {
  const links = document.querySelectorAll('header .nav-menu a, header nav ul a');
  const sections = document.querySelectorAll('section[id]');

  const setActive = () => {
    let current = '';
    sections.forEach(sec => {
      const rect = sec.getBoundingClientRect();
      if (rect.top <= 120 && rect.bottom > 0) {
        current = sec.id;
      }
    });

    links.forEach(link => {
      link.classList.remove('active');
      const href = link.getAttribute('href');
      if (href && href.slice(1) === current) {
        link.classList.add('active');
      }
    });
  };

  // Run bij scroll + resize
  window.addEventListener('scroll', setActive);
  window.addEventListener('resize', setActive);
  setActive(); // Init
});

