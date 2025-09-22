// ========================================
// Navigation and Animation System
// ========================================

// Page-aware active nav highlighting and optional section tracking for the Home page
const sectionIds = [
  'top',
  'programming',
  'mission',
  'history',
  'team',
  'requirements',
  'logistics',
  'faqs'
];

// Determine which page is currently active based on URL
function getActivePageKey() {
  const path = (location.pathname || '').toLowerCase();
  if (path.endsWith('/programming.html')) return 'programming';
  if (path.endsWith('/contact.html')) return 'contact';
  // Default to home for index.html or root
  return 'home';
}

// Highlight the active navigation link based on current page
function highlightActivePageLink() {
  const key = getActivePageKey();
  document.querySelectorAll('.nav-link[data-page]')
    .forEach(link => link.classList.toggle('active', link.dataset.page === key));
}

function highlightActiveSectionOnHome() {
  // Only run section-based highlighting on the Home page
  if (getActivePageKey() !== 'home') return;
  const fromTop = window.scrollY + 80;
  let current = 'top';
  for (const id of sectionIds) {
    const el = document.getElementById(id);
    if (!el) continue;
    if (el.offsetTop <= fromTop) current = id;
  }
  // Do not toggle page-level nav; Home stays active. Optional: no-op here.
}

window.addEventListener('scroll', () => {
  highlightActiveSectionOnHome();
}, { passive: true });

// Intersection Observer for fade-in animations
// ========================================
// Animation System - Scroll-triggered Fade-in Effects
// ========================================

// Set up scroll-triggered fade-in animations using Intersection Observer
function setupFadeInAnimations() {
  const sections = document.querySelectorAll('.section');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        // Stop observing once animated to prevent re-triggering
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.5, // Trigger at 50% visibility
    rootMargin: '0px 0px 0px 0px' // No offset
  });

  sections.forEach(section => {
    observer.observe(section);
  });
}

// ========================================
// Event Listeners and Initialization
// ========================================

// Initialize all functionality when page loads
window.addEventListener('load', () => {
  highlightActivePageLink();
  highlightActiveSectionOnHome();
  setupFadeInAnimations();
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
});


