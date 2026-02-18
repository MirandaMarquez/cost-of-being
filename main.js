// ============================================
// COST OF BEING — interactions
// ============================================

document.addEventListener('DOMContentLoaded', () => {

  // --- Reveal on scroll ---
  const revealEls = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
  revealEls.forEach(el => revealObserver.observe(el));

  // --- Nav active link ---
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('nav a');
  const navObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(l => l.classList.remove('active'));
        const active = document.querySelector(`nav a[href="#${entry.target.id}"]`);
        if (active) active.classList.add('active');
      }
    });
  }, { threshold: 0.35 });
  sections.forEach(s => navObserver.observe(s));

  navLinks.forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      document.querySelector(link.getAttribute('href'))?.scrollIntoView({ behavior: 'smooth' });
    });
  });

  // --- Interactive organ table ---
  const organRows = document.querySelectorAll('.organ-row:not(.header)');
  const costDisplay = document.getElementById('costValue');
  const ALWAYS_ON_COST = 0.10; // primary screen, always active

  function updateCost() {
    let total = 0;
    organRows.forEach(row => {
      if (row.classList.contains('active')) {
        total += parseFloat(row.dataset.cost || 0);
      }
    });
    costDisplay.textContent = `$${total.toFixed(2)}`;
    costDisplay.classList.toggle('high', total > 1.5);
  }

  organRows.forEach((row, i) => {
    // First row (primary screen) is always on — not toggleable
    if (i === 0) {
      row.style.cursor = 'default';
      return;
    }
    row.addEventListener('click', () => {
      row.classList.toggle('active');
      updateCost();
    });
  });

  updateCost();

  // --- Stagger organ rows on scroll ---
  organRows.forEach((row, i) => {
    row.style.transitionDelay = `${i * 0.05}s`;
  });

});
