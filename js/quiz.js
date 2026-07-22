// Myth-vs-fact quiz engine with a difficulty picker. Reads window.QUIZ_DATA
// (an object keyed easy/medium/hard), renders into #quiz-app.
document.addEventListener('DOMContentLoaded', () => {
  const root = document.getElementById('quiz-app');
  if (!root || !window.QUIZ_DATA) return;

  const LEVELS = [
    { key: 'easy', label: 'Easy', desc: 'The basics, no tricks.' },
    { key: 'medium', label: 'Medium', desc: 'What most students told us they weren’t sure about.' },
    { key: 'hard', label: 'Hard', desc: 'Specific, clinical, and easy to get wrong.' }
  ];

  let data = [];
  let index = 0;
  let score = 0;
  let answered = false;

  function renderPicker() {
    root.innerHTML = `
      <span class="eyebrow">Choose a level</span>
      <h3 style="margin-top:14px;">How tricky do you want it?</h3>
      <div class="quiz-options" style="margin-top:22px;">
        ${LEVELS.map(l => `
          <button class="quiz-opt" data-level="${l.key}" style="text-align:left;">
            <strong>${l.label}</strong>
            <div class="form-note" style="margin-top:4px;">${l.desc}</div>
          </button>
        `).join('')}
      </div>
    `;
    root.querySelectorAll('[data-level]').forEach(btn => {
      btn.addEventListener('click', () => {
        data = window.QUIZ_DATA[btn.dataset.level];
        index = 0;
        score = 0;
        render();
      });
    });
  }

  function render() {
    if (index >= data.length) return renderResult();
    const q = data[index];
    answered = false;
    root.innerHTML = `
      <div class="quiz-progress"><div class="quiz-progress-bar" style="width:${(index / data.length) * 100}%"></div></div>
      <span class="eyebrow">Question ${index + 1} of ${data.length}</span>
      <h3 style="margin-top:14px;">${q.statement}</h3>
      <div class="quiz-options">
        ${q.options.map((opt, i) => `<button class="quiz-opt" data-i="${i}">${opt}</button>`).join('')}
      </div>
      <div class="quiz-feedback" id="quiz-feedback">${q.explanation}</div>
      <div class="cta-row" style="margin-top:26px;">
        <button class="btn btn-primary" id="quiz-next" style="display:none;">Next <span class="btn-arrow">→</span></button>
      </div>
    `;
    root.querySelectorAll('.quiz-opt').forEach(btn => {
      btn.addEventListener('click', () => {
        if (answered) return;
        answered = true;
        const chosen = Number(btn.dataset.i);
        const correct = q.answer;
        root.querySelectorAll('.quiz-opt').forEach((b, i) => {
          if (i === correct) b.classList.add('correct');
          else if (i === chosen) b.classList.add('wrong');
        });
        if (chosen === correct) score++;
        document.getElementById('quiz-feedback').style.display = 'block';
        document.getElementById('quiz-next').style.display = 'inline-flex';
      });
    });
    const next = document.getElementById('quiz-next');
    next.addEventListener('click', () => { index++; render(); });
  }

  function renderResult() {
    const pct = Math.round((score / data.length) * 100);
    root.innerHTML = `
      <div class="quiz-progress"><div class="quiz-progress-bar" style="width:100%"></div></div>
      <div class="quiz-result" style="display:block;">
        <span class="stat-num">${score}/${data.length}</span>
        <p class="form-note" style="margin-top:6px; font-size:1rem;">${pct}% correct</p>
        <h3 style="margin-top:14px;">${pct >= 80 ? "You know your stuff." : pct >= 50 ? "Good start, a few myths to unlearn." : "That's exactly why this page exists."}</h3>
        <p class="muted" style="margin-top:10px;">Scroll back up any time to review the explanations.</p>
        <div class="cta-row" style="margin-top:24px; justify-content:center;">
          <button class="btn btn-outline" id="quiz-restart">Try again <span class="btn-arrow">→</span></button>
          <button class="btn btn-outline" id="quiz-change-level">Try a different level <span class="btn-arrow">→</span></button>
        </div>
      </div>
    `;
    document.getElementById('quiz-restart').addEventListener('click', () => {
      index = 0; score = 0; render();
    });
    document.getElementById('quiz-change-level').addEventListener('click', renderPicker);
  }

  renderPicker();
});
