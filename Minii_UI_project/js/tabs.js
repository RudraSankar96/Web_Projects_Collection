(function () {
  const tabs = document.querySelector('[data-tabs]');
  if (!tabs) return;

  const tabButtons = tabs.querySelectorAll('[role="tab"]');
  const panels = tabs.querySelectorAll('[role="tabpanel"]');

  function activateTab(button) {
    tabButtons.forEach(btn => {
      const selected = btn === button;
      btn.setAttribute('aria-selected', String(selected));
      const panel = document.getElementById(btn.getAttribute('aria-controls'));
      if (panel) panel.hidden = !selected;
    });
  }

  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => activateTab(btn));

    // Keyboard support
    btn.addEventListener('keydown', (e) => {
      const idx = Array.from(tabButtons).indexOf(btn);

      if (e.key === 'ArrowRight') {
        e.preventDefault();
        const next = tabButtons[(idx + 1) % tabButtons.length];
        next.focus();
        activateTab(next);
      }

      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        const prev = tabButtons[(idx - 1 + tabButtons.length) % tabButtons.length];
        prev.focus();
        activateTab(prev);
      }
    });
  });
})();
