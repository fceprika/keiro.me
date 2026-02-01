/**
 * Keiro - Visual Animations
 * Starfield, scroll reveal, and 3D iPhone reveal
 */

function isMobile() {
  return window.innerWidth <= 968;
}

document.addEventListener('DOMContentLoaded', () => {
  initStarfield();
  initScrollReveal();
  initiPhoneReveal();
  window.addEventListener('resize', handleResize);
});

/**
 * Handle window resize - update hero iPhone behavior
 */
function handleResize() {
  // No special resize handling needed — hero iPhone is managed
  // by delayed reveal on desktop and scroll observer on mobile
}

/**
 * Starfield Generation
 */
function initStarfield() {
  const starfield = document.querySelector('.starfield');
  if (!starfield) return;

  const starCount = 100;

  for (let i = 0; i < starCount; i++) {
    const star = document.createElement('div');
    star.className = 'star';

    const x = Math.random() * 100;
    const y = Math.random() * 100;
    const size = Math.random() > 0.9 ? 2 : 1;
    const delay = Math.random() * 5;
    const driftDelay = Math.random() * 80;

    star.style.left = `${x}%`;
    star.style.top = `${y}%`;
    star.style.width = `${size}px`;
    star.style.height = `${size}px`;
    star.style.animationDelay = `${delay}s, ${driftDelay}s`;

    const opacity = 0.15 + Math.random() * 0.4;
    star.style.opacity = opacity;

    starfield.appendChild(star);
  }
}

/**
 * Text Scroll Reveal Animations
 */
function initScrollReveal() {
  const revealElements = document.querySelectorAll('.reveal');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, 50);
        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
  });

  revealElements.forEach(el => revealObserver.observe(el));
}

/**
 * iPhone Bidirectional Scroll-Driven Reveal Animation
 */
function initiPhoneReveal() {
  const heroIphone = document.querySelector('.hero .iphone-3d');

  // Desktop: Hero iPhone reveals with 0.5s delay after page load
  if (!isMobile() && heroIphone) {
    setTimeout(() => {
      heroIphone.classList.add('revealed');
      // After animation completes, flatten 3D to prevent iOS compositing bugs
      setTimeout(() => heroIphone.classList.add('settled'), 2500);
    }, 500);
  }

  // All iPhones (including hero on mobile) use bidirectional scroll reveal
  const featureIphones = document.querySelectorAll('.iphone-3d');

  const iphoneObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const iphone = entry.target;

      // On desktop, skip scroll logic for hero iPhone (handled by timeout)
      if (!isMobile() && iphone.closest('.hero')) return;

      if (entry.isIntersecting) {
        iphone.classList.add('revealed');
        // After animation completes, flatten 3D to prevent iOS compositing bugs
        setTimeout(() => iphone.classList.add('settled'), 2500);
        iphoneObserver.unobserve(iphone);
      }
    });
  }, {
    threshold: 0.25,
    rootMargin: '-50px 0px -50px 0px'
  });

  featureIphones.forEach(iphone => iphoneObserver.observe(iphone));
}
