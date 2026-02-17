// -------------------------------
// Navigation + page behavior
// -------------------------------

// Sections used for scroll tracking on the home page
const HOME_SECTION_IDS = [
  'top',
  'mission',
  'team',
  'requirements',
  'logistics',
  'faqs'
];

// Determine which page we're on
function getCurrentPage() {
  const path = window.location.pathname.toLowerCase();

  if (path.includes('programming')) return 'programming';
  if (path.includes('contact')) return 'contact';
  return 'home';
}

// Highlight active navigation link
function setActiveNavLink() {
  const currentPage = getCurrentPage();

  document.querySelectorAll('.nav-link[data-page]').forEach(link => {
    link.classList.toggle('active', link.dataset.page === currentPage);
  });
}

// Track which section is visible on the home page
function updateActiveHomeSection() {
  if (getCurrentPage() !== 'home') return;

  const scrollPosition = window.scrollY + 100;
  let currentSection = 'top';

  HOME_SECTION_IDS.forEach(id => {
    const section = document.getElementById(id);
    if (section && section.offsetTop <= scrollPosition) {
      currentSection = id;
    }
  });

  // Add logic here if you want section indicators to update
}

// Throttled scroll listener
let scrollTimeout;
window.addEventListener(
  'scroll',
  () => {
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(updateActiveHomeSection, 50);
  },
  { passive: true }
);

// Fade-in animation for sections
function initFadeInAnimations() {
  const sections = document.querySelectorAll('.section');

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;

        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.2 }
  );

  sections.forEach(section => observer.observe(section));
}

// Run on page load
window.addEventListener('load', () => {
  setActiveNavLink();
  initFadeInAnimations();

  // Update footer year automatically
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
});