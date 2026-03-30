// -------------------------------
// Page behavior
// -------------------------------

function initFadeInAnimations() {
  const sections = document.querySelectorAll('.section');
  if (!sections.length) return;

  if (!('IntersectionObserver' in window)) {
    sections.forEach(section => section.classList.add('visible'));
    return;
  }

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

function setTeamCardState(card, isFlipped) {
  const front = card.querySelector('.person-front');
  const back = card.querySelector('.person-back');

  card.classList.toggle('is-flipped', isFlipped);
  card.setAttribute('aria-pressed', String(isFlipped));

  if (front) front.setAttribute('aria-hidden', String(isFlipped));
  if (back) back.setAttribute('aria-hidden', String(!isFlipped));
}

// Flip team cards on click/tap
function initTeamCardFlips() {
  const teamCards = document.querySelectorAll('.person-card');
  if (!teamCards.length) return;

  teamCards.forEach(card => {
    setTeamCardState(card, false);

    card.addEventListener('click', () => {
      setTeamCardState(card, !card.classList.contains('is-flipped'));
    });
  });
}

function initPage() {
  initFadeInAnimations();
  initTeamCardFlips();

  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
}

document.addEventListener('DOMContentLoaded', initPage);
