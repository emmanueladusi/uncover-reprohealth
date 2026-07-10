// Lightweight client-side polls. Counts persist only in this browser (localStorage) —
// not a real shared backend, but gives a working "cast your vote / see results" loop.
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('[data-poll]').forEach(pollEl => {
    const pollId = pollEl.dataset.poll;
    const storeKey = `uncover_poll_${pollId}`;
    const seed = JSON.parse(pollEl.dataset.seed);
    const votedKey = `${storeKey}_voted`;

    function getCounts() {
      const stored = localStorage.getItem(storeKey);
      return stored ? JSON.parse(stored) : seed.slice();
    }
    function setCounts(counts) {
      localStorage.setItem(storeKey, JSON.stringify(counts));
    }
    function render() {
      const counts = getCounts();
      const total = counts.reduce((a, b) => a + b, 0) || 1;
      const options = pollEl.querySelectorAll('.poll-option');
      options.forEach((opt, i) => {
        const pct = Math.round((counts[i] / total) * 100);
        opt.querySelector('.poll-bar-fill').style.width = pct + '%';
        opt.querySelector('.poll-pct').textContent = pct + '%';
      });
      pollEl.querySelector('.poll-total').textContent = `${total} response${total === 1 ? '' : 's'} on this device`;
    }

    pollEl.querySelectorAll('.poll-option').forEach((opt, i) => {
      opt.querySelector('.poll-vote').addEventListener('click', () => {
        if (localStorage.getItem(votedKey)) return;
        const counts = getCounts();
        counts[i]++;
        setCounts(counts);
        localStorage.setItem(votedKey, '1');
        pollEl.classList.add('voted');
        render();
      });
    });

    if (localStorage.getItem(votedKey)) pollEl.classList.add('voted');
    render();
  });
});
