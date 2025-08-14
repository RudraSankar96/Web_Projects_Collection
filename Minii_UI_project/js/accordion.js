(function () {
  const acc = document.querySelector('.accordion');
  if (!acc) return;

  acc.addEventListener('click', (e) => {
    const header = e.target.closest('.accordion__header');
    if (!header) return;
    const panelId = header.getAttribute('aria-controls');
    const panel = document.getElementById(panelId);
    const expanded = header.getAttribute('aria-expanded') === 'true';
    header.setAttribute('aria-expanded', String(!expanded));
    panel.dataset.open = String(!expanded);
  });
})();