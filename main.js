// ============================================
// COST OF BEING — scroll reveal + nav highlight
// ============================================

document.addEventListener('DOMContentLoaded', () => {

  // --- Intersection Observer for reveal animations ---
  const revealEls = document.querySelectorAll('.reveal');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
  });

  revealEls.forEach(el => observer.observe(el));


  // --- Active nav link highlight on scroll ---
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('nav a');

  const navObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(link => link.classList.remove('active'));
        const active = document.querySelector(`nav a[href="#${entry.target.id}"]`);
        if (active) active.classList.add('active');
      }
    });
  }, { threshold: 0.4 });

  sections.forEach(s => navObserver.observe(s));


  // --- Smooth scroll for nav links ---
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const target = document.querySelector(link.getAttribute('href'));
      if (target) target.scrollIntoView({ behavior: 'smooth' });
    });
  });


  // --- Staggered reveal for organ rows ---
  const organRows = document.querySelectorAll('.organ-row:not(.header)');
  organRows.forEach((row, i) => {
    row.style.transitionDelay = `${i * 0.07}s`;
  });


  // --- Nav active style ---
  const style = document.createElement('style');
  style.textContent = `nav a.active { color: var(--text); }`;
  document.head.appendChild(style);

});
