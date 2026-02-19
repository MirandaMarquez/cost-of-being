// ============================================
// COST OF BEING — interactions + i18n
// ============================================

document.addEventListener('DOMContentLoaded', () => {

  // ---- LANGUAGE SWITCH ----
  let currentLang = localStorage.getItem('cob-lang') || 'en';
  const langBtn = document.getElementById('langSwitch');

  function applyLang(lang) {
    const t = window.i18n[lang];
    if (!t) return;

    // text nodes
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.dataset.i18n;
      if (t[key] !== undefined) el.textContent = t[key];
    });

    // html nodes (for <br>, <strong>, <em>)
    document.querySelectorAll('[data-i18n-html]').forEach(el => {
      const key = el.dataset.i18nHtml;
      if (t[key] !== undefined) el.innerHTML = t[key];
    });

    // h2 with \n → <br>
    document.querySelectorAll('h2[data-i18n]').forEach(el => {
      const key = el.dataset.i18n;
      if (t[key] !== undefined) el.innerHTML = t[key].replace(/\n/g, '<br>');
    });

    document.documentElement.lang = lang;
    langBtn.textContent = lang === 'en' ? 'CA' : 'EN';
    currentLang = lang;
    localStorage.setItem('cob-lang', lang);
  }

  langBtn.addEventListener('click', () => {
    applyLang(currentLang === 'en' ? 'ca' : 'en');
  });

  applyLang(currentLang);

  // ---- REVEAL ON SCROLL ----
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

  // ---- NAV ACTIVE LINK ----
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

  // ---- INTERACTIVE ORGAN TABLE ----
  const organRows = document.querySelectorAll('.organ-row:not(.header)');
  const costDisplay = document.getElementById('costValue');

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
    if (i === 0) { row.style.cursor = 'default'; return; } // primary screen always on
    row.addEventListener('click', () => {
      row.classList.toggle('active');
      updateCost();
    });
  });

  updateCost();
});
