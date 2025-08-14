function initThemeAndEvents() {
  const btn = document.getElementById('themeToggle');
  const cur = localStorage.getItem('theme') || 'dark';
  document.documentElement.setAttribute('data-theme', cur);

  if (btn) {
    btn.addEventListener('click', () => {
      const current = document.documentElement.getAttribute('data-theme') || 'dark';
      const next = current === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', next);
      localStorage.setItem('theme', next);
      if (window.showToast) window.showToast(`Theme: ${next}`);
    });
  }

  // Modal triggers
  const openModal = document.getElementById('openModal');
  if (openModal && window.Modal) {
    openModal.addEventListener('click', () => Modal.open('#modal'));
  }

  // Toast demo
  const showToastBtn = document.getElementById('showToast');
  if (showToastBtn && window.showToast) {
    showToastBtn.addEventListener('click', () => window.showToast('Hello from Toast!'));
  }
}

initThemeAndEvents();
