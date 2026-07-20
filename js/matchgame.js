// "Match the symptom" — click a symptom, then click the condition it belongs to.
document.addEventListener('DOMContentLoaded', () => {
  const root = document.getElementById('match-game');
  if (!root) return;

  const pairs = [
    { symptom: "Irregular or absent periods, excess hair growth", condition: "PMOS" },
    { symptom: "Severe cramps, pain during bowel movements", condition: "Endometriosis" },
    { symptom: "Heavy periods, frequent urination, pelvic pressure", condition: "Fibroids" },
    { symptom: "Knifelike cramps, heavy bleeding with large clots", condition: "Adenomyosis" },
    { symptom: "Severe mood changes the week before your period", condition: "PMDD" }
  ];

  let selectedSymptom = null;
  let matched = new Set();
  let score = 0;

  function shuffled(arr) {
    return [...arr].sort(() => Math.random() - 0.5);
  }

  const symptomOrder = shuffled(pairs.map(p => p.symptom));
  const conditionOrder = shuffled(pairs.map(p => p.condition));

  function render() {
    root.innerHTML = `
      <div class="grid grid-2" style="gap:14px;">
        <div>
          <p class="eyebrow" style="margin-bottom:12px;">Symptoms</p>
          <div class="checklist" id="match-symptoms"></div>
        </div>
        <div>
          <p class="eyebrow" style="margin-bottom:12px;">Conditions</p>
          <div class="checklist" id="match-conditions"></div>
        </div>
      </div>
      <p class="form-note" id="match-status" style="margin-top:20px;">Matched ${matched.size} of ${pairs.length}.</p>
    `;
    const symptomsEl = root.querySelector('#match-symptoms');
    const conditionsEl = root.querySelector('#match-conditions');

    symptomOrder.forEach(s => {
      const pair = pairs.find(p => p.symptom === s);
      const isMatched = matched.has(pair.condition);
      const btn = document.createElement('button');
      btn.className = 'quiz-opt';
      btn.textContent = s;
      btn.disabled = isMatched;
      if (isMatched) btn.classList.add('correct');
      if (s === selectedSymptom) btn.style.borderColor = 'var(--primary)';
      btn.addEventListener('click', () => { selectedSymptom = s; render(); });
      symptomsEl.appendChild(btn);
    });

    conditionOrder.forEach(c => {
      const pair = pairs.find(p => p.condition === c);
      const isMatched = matched.has(c);
      const btn = document.createElement('button');
      btn.className = 'quiz-opt';
      btn.textContent = c;
      btn.disabled = isMatched;
      if (isMatched) btn.classList.add('correct');
      btn.addEventListener('click', () => {
        if (!selectedSymptom) return;
        const correctPair = pairs.find(p => p.symptom === selectedSymptom);
        if (correctPair.condition === c) {
          matched.add(c);
          score++;
        } else {
          btn.classList.add('wrong');
          setTimeout(() => btn.classList.remove('wrong'), 500);
        }
        selectedSymptom = null;
        render();
        if (matched.size === pairs.length) {
          document.getElementById('match-status').innerHTML =
            `<strong>All matched!</strong> You earned ${score} point${score === 1 ? '' : 's'}.`;
        }
      });
      conditionsEl.appendChild(btn);
    });
  }

  render();
});
