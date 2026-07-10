document.addEventListener('DOMContentLoaded', () => {
  const buttons = document.querySelectorAll('[data-filter]');
  const cards = document.querySelectorAll('[data-tags]');
  if (!buttons.length) return;

  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      buttons.forEach(b => b.classList.remove('btn-primary'));
      buttons.forEach(b => b.classList.add('btn-outline'));
      btn.classList.remove('btn-outline');
      btn.classList.add('btn-primary');

      const filter = btn.dataset.filter;
      cards.forEach(card => {
        const tags = card.dataset.tags.split(' ');
        card.style.display = (filter === 'all' || tags.includes(filter)) ? '' : 'none';
      });
    });
  });

  const form = document.getElementById('share-form');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      document.getElementById('share-confirm').style.display = 'block';
      form.reset();
    });
  }
});
