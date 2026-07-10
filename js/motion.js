// Shared motion layer: scroll reveal, magnetic buttons, card tilt,
// cursor glow, nav shadow, count-up stats, smooth accordions, marquee.
// Everything here checks prefers-reduced-motion and pointer capability first.
(() => {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

  document.addEventListener('DOMContentLoaded', () => {
    initScrollReveal();
    initNavShadow();
    if (finePointer && !reduceMotion) {
      initMagneticButtons();
      initCardTilt();
      initHeroGlow();
    }
    initCountUp();
    initSmoothAccordions();
  });

  // ---- scroll reveal ----
  function initScrollReveal() {
    const selector = '.section-head, .card, .banner, .quiz-card, .accordion, .two-col > div, .two-col > form, .stats-row > div';
    const els = Array.from(document.querySelectorAll(selector));
    if (!els.length) return;

    if (reduceMotion || !('IntersectionObserver' in window)) return;

    const groups = new Map();
    els.forEach(el => {
      el.classList.add('reveal-init');
      const parent = el.parentElement;
      const i = groups.get(parent) || 0;
      el.style.transitionDelay = `${(i % 4) * 90}ms`;
      groups.set(parent, i + 1);
    });

    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('reveal-in');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });

    els.forEach(el => io.observe(el));
  }

  // ---- nav shadow on scroll ----
  function initNavShadow() {
    const nav = document.querySelector('.nav');
    if (!nav) return;
    const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  // ---- magnetic buttons ----
  function initMagneticButtons() {
    document.querySelectorAll('.btn').forEach(btn => {
      btn.addEventListener('mousemove', (e) => {
        const r = btn.getBoundingClientRect();
        const x = e.clientX - r.left - r.width / 2;
        const y = e.clientY - r.top - r.height / 2;
        btn.style.transform = `translate(${x * 0.16}px, ${y * 0.35}px)`;
      });
      btn.addEventListener('mouseleave', () => { btn.style.transform = ''; });
    });
  }

  // ---- card tilt ----
  function initCardTilt() {
    document.querySelectorAll('.card').forEach(card => {
      card.classList.add('tilt');
      card.addEventListener('mousemove', (e) => {
        const r = card.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width - 0.5;
        const py = (e.clientY - r.top) / r.height - 0.5;
        card.style.transform = `perspective(900px) rotateX(${py * -6}deg) rotateY(${px * 7}deg) translateY(-4px)`;
      });
      card.addEventListener('mouseleave', () => { card.style.transform = ''; });
    });
  }

  // ---- cursor glow in hero ----
  function initHeroGlow() {
    document.querySelectorAll('.hero').forEach(hero => {
      const glow = document.createElement('div');
      glow.className = 'hero-glow';
      hero.appendChild(glow);
      let tx = 0, ty = 0, cx = 0, cy = 0, active = false;

      hero.addEventListener('mouseenter', () => { active = true; glow.classList.add('active'); });
      hero.addEventListener('mouseleave', () => { active = false; glow.classList.remove('active'); });
      hero.addEventListener('mousemove', (e) => {
        const r = hero.getBoundingClientRect();
        tx = e.clientX - r.left;
        ty = e.clientY - r.top;
      });

      function loop() {
        cx += (tx - cx) * 0.09;
        cy += (ty - cy) * 0.09;
        if (active) glow.style.transform = `translate(${cx}px, ${cy}px)`;
        requestAnimationFrame(loop);
      }
      requestAnimationFrame(loop);
    });
  }

  // ---- count-up stats ----
  function initCountUp() {
    const els = document.querySelectorAll('[data-count]');
    if (!els.length) return;
    els.forEach(el => {
      const target = parseFloat(el.dataset.count);
      const suffix = el.dataset.suffix || '';
      const decimals = String(el.dataset.count).includes('.') ? 1 : 0;

      const run = () => {
        if (reduceMotion || !('IntersectionObserver' in window)) {
          el.textContent = target.toFixed(decimals) + suffix;
          return;
        }
        const start = performance.now();
        const dur = 1100;
        function tick(now) {
          const p = Math.min(1, (now - start) / dur);
          const eased = 1 - Math.pow(1 - p, 3);
          el.textContent = (target * eased).toFixed(decimals) + suffix;
          if (p < 1) requestAnimationFrame(tick);
        }
        requestAnimationFrame(tick);
      };

      if (reduceMotion || !('IntersectionObserver' in window)) { run(); return; }
      const io = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) { run(); io.unobserve(el); }
        });
      }, { threshold: 0.5 });
      io.observe(el);
    });
  }

  // ---- smooth accordions ----
  function initSmoothAccordions() {
    document.querySelectorAll('.accordion-item').forEach(details => {
      const summary = details.querySelector('summary');
      const body = details.querySelector('.accordion-body');
      if (!summary || !body) return;

      summary.addEventListener('click', (e) => {
        e.preventDefault();
        if (details.open) {
          const h = body.scrollHeight;
          body.style.height = h + 'px';
          requestAnimationFrame(() => {
            body.style.height = '0px';
            body.style.opacity = '0';
          });
          body.addEventListener('transitionend', function onEnd() {
            details.open = false;
            body.style.height = '';
            body.style.opacity = '';
            body.removeEventListener('transitionend', onEnd);
          }, { once: true });
        } else {
          details.open = true;
          const h = body.scrollHeight;
          body.style.height = '0px';
          body.style.opacity = '0';
          requestAnimationFrame(() => {
            body.style.height = h + 'px';
            body.style.opacity = '1';
          });
          body.addEventListener('transitionend', function onEnd() {
            body.style.height = '';
            body.removeEventListener('transitionend', onEnd);
          }, { once: true });
        }
      });
    });
  }
})();
