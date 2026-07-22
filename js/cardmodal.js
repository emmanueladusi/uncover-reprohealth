// Click-to-read popup for cards marked [data-modal]. Click outside the
// box, or the close button, returns to the normal page view.
document.addEventListener('DOMContentLoaded', () => {
  const cards = document.querySelectorAll('[data-modal]');
  if (!cards.length) return;

  const overlay = document.createElement('div');
  overlay.className = 'modal-overlay';
  overlay.innerHTML = `
    <div class="modal-box" role="dialog" aria-modal="true">
      <button class="modal-close" aria-label="Close">✕</button>
      <div class="modal-icon"></div>
      <h3 class="modal-title"></h3>
      <p class="modal-body"></p>
    </div>`;
  document.body.appendChild(overlay);

  const iconEl = overlay.querySelector('.modal-icon');
  const titleEl = overlay.querySelector('.modal-title');
  const bodyEl = overlay.querySelector('.modal-body');

  function openModal(card) {
    const icon = card.querySelector('.icon');
    const title = card.querySelector('h3');
    const body = card.querySelector('p');
    iconEl.innerHTML = icon ? icon.outerHTML : '';
    titleEl.textContent = title ? title.textContent : '';
    bodyEl.textContent = body ? body.textContent : '';
    overlay.classList.add('open');
  }
  function closeModal() {
    overlay.classList.remove('open');
  }

  cards.forEach(card => {
    card.style.cursor = 'pointer';
    card.setAttribute('tabindex', '0');
    card.setAttribute('role', 'button');
    card.addEventListener('click', () => openModal(card));
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openModal(card); }
    });
  });

  // click outside the box closes it
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) closeModal();
  });
  overlay.querySelector('.modal-close').addEventListener('click', closeModal);
});
