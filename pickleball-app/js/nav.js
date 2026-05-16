/* ─────────────────────────────────────────────────────────
   SmashPoint — Shared Nav
   ───────────────────────────────────────────────────────── */

(function() {
  const NAV_HTML = `
    <nav class="nav" id="nav">
      <div class="nav-inner">
        <a href="index.html" class="nav-logo">
          <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="16" cy="16" r="14" fill="#b5f23d" opacity="0.15"/>
            <circle cx="16" cy="16" r="7" fill="#b5f23d"/>
            <line x1="16" y1="2" x2="16" y2="30" stroke="#b5f23d" stroke-width="1.5" opacity="0.4"/>
            <line x1="2" y1="16" x2="30" y2="16" stroke="#b5f23d" stroke-width="1.5" opacity="0.4"/>
          </svg>
          Smash<span>Point</span>
        </a>
        <div class="nav-links" id="nav-links">
          <a href="courts.html" data-page="courts">Courts</a>
          <a href="events.html" data-page="events">Events</a>
          <a href="players.html" data-page="players">Players</a>
          <a href="clubs.html" data-page="clubs">Clubs</a>
        </div>
        <div class="nav-cta">
          <a href="events.html" class="btn btn-fill btn-sm">Find a Game</a>
        </div>
        <div class="nav-hamburger" id="nav-hamburger" aria-label="Menu">
          <span></span><span></span><span></span>
        </div>
      </div>
    </nav>
    <div class="nav-overlay" id="nav-overlay">
      <a href="courts.html">Courts</a>
      <a href="events.html">Events</a>
      <a href="players.html">Players</a>
      <a href="clubs.html">Clubs</a>
      <a href="events.html" class="btn btn-fill">Find a Game →</a>
    </div>
  `;

  // Inject nav
  const placeholder = document.getElementById('nav-placeholder');
  if (placeholder) {
    placeholder.outerHTML = NAV_HTML;
  } else {
    document.body.insertAdjacentHTML('afterbegin', NAV_HTML);
  }

  // Scroll state
  const nav = document.getElementById('nav');
  function updateNav() {
    nav.classList.toggle('scrolled', window.scrollY > 20);
  }
  updateNav();
  window.addEventListener('scroll', updateNav, { passive: true });

  // Active link
  const page = document.body.dataset.page;
  if (page) {
    const link = document.querySelector(`.nav-links a[data-page="${page}"]`);
    if (link) link.classList.add('active');
  }

  // Hamburger
  const hamburger = document.getElementById('nav-hamburger');
  const overlay   = document.getElementById('nav-overlay');
  hamburger.addEventListener('click', () => {
    const open = overlay.classList.toggle('open');
    hamburger.classList.toggle('open', open);
    document.body.style.overflow = open ? 'hidden' : '';
  });

  // Close overlay on link click
  overlay.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      overlay.classList.remove('open');
      hamburger.classList.remove('open');
      document.body.style.overflow = '';
    });
  });

  // Tilt effect for [data-tilt] cards
  function initTilt() {
    document.querySelectorAll('[data-tilt]').forEach(card => {
      card.addEventListener('mousemove', e => {
        const r = card.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width  - 0.5;
        const y = (e.clientY - r.top)  / r.height - 0.5;
        card.style.transform = `perspective(800px) rotateY(${x * 8}deg) rotateX(${-y * 8}deg)`;
      });
      card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(800px) rotateY(0deg) rotateX(0deg)';
      });
    });
  }

  // Run tilt after page renders
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initTilt);
  } else {
    initTilt();
  }

  // Re-run tilt for dynamically added cards
  window.initTilt = initTilt;
})();
