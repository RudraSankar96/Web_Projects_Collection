window.Modal = (function () {
  function open(selector) {
    const m = document.querySelector(selector);
    if (!m) return;
    m.setAttribute('aria-hidden', 'false');
    document.addEventListener('keydown', escListener);
  }
  function close(selector) {
    const m = document.querySelector(selector);
    if (!m) return;
    m.setAttribute('aria-hidden', 'true');
    document.removeEventListener('keydown', escListener);
  }
  function escListener(e) {
    if (e.key === 'Escape') close('#modal');
  }
  document.addEventListener('click', (e) => {
    if (e.target.matches('[data-close]') || e.target.closest('[data-close]')) close('#modal');
    if (e.target.classList.contains('modal__backdrop')) close('#modal');
  });
  return { open, close };
})();