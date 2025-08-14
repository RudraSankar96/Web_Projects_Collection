(function () {
  const el = document.getElementById('toast');
  if (!el) return;

  let t;
  window.showToast = function (msg = 'Action complete', timeout = 2200) {
    el.textContent = msg;
    el.style.display = 'block';
    clearTimeout(t);
    t = setTimeout(() => {
      el.style.display = 'none';
    }, timeout);
  };
})();
