// Shared behavior: mobile nav toggle, quick-exit, footer year, active link.
document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.querySelector('.nav-toggle');
  const links = document.querySelector('.nav-links');
  if (toggle && links) {
    toggle.addEventListener('click', () => {
      const open = links.classList.toggle('open');
      toggle.textContent = open ? '✕' : '☰';
    });
    links.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
      links.classList.remove('open');
      toggle.textContent = '☰';
    }));
  }

  const year = document.querySelector('[data-year]');
  if (year) year.textContent = new Date().getFullYear();

  // Quick exit: press Esc or click the button to leave instantly.
  const exitBtn = document.querySelector('[data-quick-exit]');
  const doExit = () => { window.location.href = 'https://www.google.com'; };
  if (exitBtn) exitBtn.addEventListener('click', doExit);
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') doExit();
  });
});
