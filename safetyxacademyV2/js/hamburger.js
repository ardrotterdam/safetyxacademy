// Hamburger menu - werkt ook wanneer header dynamisch wordt geladen
function initHamburgerMenu() {
  const hamburger = document.querySelector('.hamburger');
  const mobileNav = document.querySelector('.mobile-nav');

  if (hamburger && mobileNav) {
    // Verwijder oude listeners om duplicaten te voorkomen
    const newHamburger = hamburger.cloneNode(true);
    hamburger.parentNode.replaceChild(newHamburger, hamburger);
    
    newHamburger.addEventListener('click', () => {
      const expanded = newHamburger.getAttribute('aria-expanded') === 'true';
      newHamburger.setAttribute('aria-expanded', !expanded);
      mobileNav.classList.toggle('active');
    });
  }
}

// Direct uitvoeren als DOM al geladen is
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initHamburgerMenu);
} else {
  initHamburgerMenu();
}

// Ook uitvoeren wanneer header geladen is (voor dynamisch geladen headers)
window.addEventListener('headerloaded', initHamburgerMenu);

// Polling fallback voor het geval header zonder event wordt geladen
let attempts = 0;
const maxAttempts = 10;
const checkInterval = setInterval(() => {
  attempts++;
  const hamburger = document.querySelector('.hamburger');
  const mobileNav = document.querySelector('.mobile-nav');
  
  if (hamburger && mobileNav && !hamburger.hasAttribute('data-initialized')) {
    hamburger.setAttribute('data-initialized', 'true');
    initHamburgerMenu();
    clearInterval(checkInterval);
  } else if (attempts >= maxAttempts) {
    clearInterval(checkInterval);
  }
}, 200);
