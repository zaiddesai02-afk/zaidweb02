/* ===================================================
   ZAIDWEB — SCRIPT.JS
   =================================================== */

'use strict';

/* ---------- DOM References ---------- */
const navbar    = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('navLinks');
const navAnchors = navLinks.querySelectorAll('a');

/* ===================================================
   1. NAVBAR — Scroll Shadow + Active Link
   =================================================== */
function onScroll() {
  /* Sticky shadow */
  if (window.scrollY > 20) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }

  /* Highlight active section link */
  highlightActiveNav();
}

function highlightActiveNav() {
  const sections = document.querySelectorAll('section[id]');
  let currentId = '';

  sections.forEach(section => {
    const top = section.offsetTop - 90;
    if (window.scrollY >= top) {
      currentId = section.id;
    }
  });

  navAnchors.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${currentId}`) {
      link.classList.add('active');
    }
  });
}

window.addEventListener('scroll', onScroll, { passive: true });
onScroll(); // run once on load

/* ===================================================
   2. MOBILE MENU — Hamburger Toggle
   =================================================== */
hamburger.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');
  hamburger.classList.toggle('open', isOpen);
  hamburger.setAttribute('aria-expanded', String(isOpen));
});

/* Close menu when a nav link is clicked */
navAnchors.forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    hamburger.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
  });
});

/* Close menu when clicking outside */
document.addEventListener('click', e => {
  if (!navbar.contains(e.target)) {
    navLinks.classList.remove('open');
    hamburger.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
  }
});

/* ===================================================
   3. SCROLL ANIMATIONS — Intersection Observer
   =================================================== */
const aosElements = document.querySelectorAll('[data-aos]');

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('aos-visible');
        observer.unobserve(entry.target); // animate once only
      }
    });
  },
  {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
  }
);

aosElements.forEach(el => observer.observe(el));

/* ===================================================
   4. SMOOTH SCROLL — Polyfill for older browsers
   =================================================== */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});

/* ===================================================
   5. HERO TYPEWRITER — subtle text cycling
   =================================================== */
(function initTypewriter() {
  const badge = document.querySelector('.hero-badge');
  if (!badge) return;

  const lines = [
    'Professional Web Design',
    'Mobile-First Development',
    'SEO-Ready Websites',
    'Fast & Reliable Delivery',
  ];

  let index = 0;

  function fade(el, newText) {
    el.style.transition = 'opacity 0.4s ease';
    el.style.opacity    = '0';
    setTimeout(() => {
      el.textContent    = newText;
      el.style.opacity  = '1';
    }, 420);
  }

  setInterval(() => {
    index = (index + 1) % lines.length;
    fade(badge, lines[index]);
  }, 3000);
})();

/* ===================================================
   6. PRICING CARD — Hover ripple effect
   =================================================== */
document.querySelectorAll('.pricing-card').forEach(card => {
  card.addEventListener('mousemove', e => {
    const rect = card.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width)  * 100;
    const y = ((e.clientY - rect.top)  / rect.height) * 100;
    card.style.setProperty('--mx', `${x}%`);
    card.style.setProperty('--my', `${y}%`);
  });
});

/* ===================================================
   7. WHATSAPP FLOAT — Hide on top, show on scroll
   =================================================== */
const waFloat = document.querySelector('.whatsapp-float');
if (waFloat) {
  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
      waFloat.style.opacity   = '1';
      waFloat.style.transform = 'scale(1)';
    } else {
      waFloat.style.opacity   = '0';
      waFloat.style.transform = 'scale(0.8)';
    }
  }, { passive: true });

  /* Set initial state */
  waFloat.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
  waFloat.style.opacity    = '0';
  waFloat.style.transform  = 'scale(0.8)';
}

/* ===================================================
   8. COUNTER ANIMATION — triggers when pricing visible
      (Adds a subtle number count-up to prices)
   =================================================== */
// Pricing counter animation removed to prevent display issues
// Prices now show correctly immediately without animation glitches
