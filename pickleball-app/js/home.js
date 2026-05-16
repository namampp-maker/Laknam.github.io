/* ─────────────────────────────────────────────────────────
   SmashPoint — Home page: GSAP + dynamic content
   ───────────────────────────────────────────────────────── */

gsap.registerPlugin(ScrollTrigger);

// ── Hero animations ────────────────────────────────────────
const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

tl.to('.hero-eyebrow', { opacity: 1, y: 0, duration: 0.7 }, 0.1)
  .to('.hero-line-inner', { y: '0%', duration: 0.9, stagger: 0.12 }, 0.2)
  .to('.hero-sub',  { opacity: 1, y: 0, duration: 0.7 }, 0.8)
  .to('.hero-ctas', { opacity: 1, y: 0, duration: 0.7 }, 1.0)
  .to('.scroll-cue',{ opacity: 1, duration: 0.5 }, 1.4);

// Parallax glow blobs
gsap.to('.hero-glow-1', {
  y: -60, x: 20,
  scrollTrigger: { trigger: '.hero', scrub: 1.5 }
});
gsap.to('.hero-glow-2', {
  y: -40, x: -20,
  scrollTrigger: { trigger: '.hero', scrub: 2 }
});

// ── Section reveal (fade + slide up) ──────────────────────
document.querySelectorAll('.section-head, .bento-card, .court-preview, .lb-teaser, .club-spot').forEach(el => {
  gsap.from(el, {
    opacity: 0,
    y: 40,
    duration: 0.7,
    ease: 'power2.out',
    scrollTrigger: {
      trigger: el,
      start: 'top 88%',
      toggleActions: 'play none none none'
    }
  });
});

// ── Stat counters ──────────────────────────────────────────
const statEls = document.querySelectorAll('.stat-big-num[data-target]');
let statsStarted = false;
ScrollTrigger.create({
  trigger: '.stats-bar',
  start: 'top 80%',
  onEnter: () => {
    if (statsStarted) return;
    statsStarted = true;
    statEls.forEach(el => {
      const target = parseInt(el.dataset.target, 10);
      countUp(el, target, 1600);
    });
  }
});

// ── Marquee: live events ───────────────────────────────────
(function buildMarquee() {
  const wrap = document.getElementById('events-marquee');
  if (!wrap) return;
  const items = events.slice(0, 8).map(ev => {
    const type = getEventTypeBadge(ev.type);
    return `<span class="marquee-item"><span class="dot"></span>${ev.title} · ${formatDate(ev.date)} · ${ev.time_start}<span class="badge ${type.cls}" style="margin-left:8px;font-size:0.65rem">${type.label}</span></span>`;
  });
  // Duplicate for seamless loop
  const all = [...items, ...items].join('');
  wrap.innerHTML = `<div class="marquee-track">${all}</div>`;
})();

// ── Mini map (non-interactive preview) ────────────────────
(function buildMiniMap() {
  const mapEl = document.getElementById('mini-map');
  if (!mapEl || typeof L === 'undefined') return;
  const miniMap = L.map('mini-map', {
    zoomControl: false,
    dragging: false,
    scrollWheelZoom: false,
    touchZoom: false,
    doubleClickZoom: false,
    keyboard: false,
    attributionControl: false
  }).setView([13.735, 100.575], 12);

  L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', { maxZoom: 19 }).addTo(miniMap);

  courts.forEach(court => {
    const icon = L.divIcon({
      className: '',
      html: `<div style="width:24px;height:24px;border-radius:50%;background:rgba(181,242,61,0.85);display:flex;align-items:center;justify-content:center;font-family:'Space Grotesk',sans-serif;font-weight:700;font-size:10px;color:#050508;box-shadow:0 2px 8px rgba(181,242,61,0.4)">${court.courts_count}</div>`,
      iconSize: [24, 24],
      iconAnchor: [12, 12]
    });
    L.marker([court.lat, court.lng], { icon }).addTo(miniMap);
  });
})();

// ── Featured courts list ───────────────────────────────────
(function buildFeaturedCourts() {
  const el = document.getElementById('featured-courts');
  if (!el) return;
  const top3 = courts.filter(c => c.rating >= 4.7).slice(0, 3);
  el.innerHTML = top3.map((court, i) => `
    <a class="mini-court-card" href="courts.html">
      <div class="mini-court-num">${i + 1}</div>
      <div style="flex:1">
        <div style="font-family:var(--font-head);font-weight:700;font-size:0.9rem">${court.name}</div>
        <div style="font-size:0.75rem;color:var(--muted);margin-top:3px">
          📍 ${court.district} · ${court.courts_count} courts · ${court.indoor ? 'Indoor' : 'Outdoor'}
        </div>
      </div>
      <div style="text-align:right;flex-shrink:0">
        <div style="font-family:var(--font-head);font-weight:700;color:var(--accent)">
          ${court.price_per_hour === 0 ? 'Free' : '฿' + court.price_per_hour + '/hr'}
        </div>
        <div class="stars" style="justify-content:flex-end;margin-top:2px">${renderStars(court.rating)}</div>
      </div>
    </a>
  `).join('');
})();

// ── Leaderboard teaser (top 5) ─────────────────────────────
(function buildLeaderboard() {
  const el = document.getElementById('lb-teaser');
  if (!el) return;
  const top5 = [...players].sort((a,b) => b.rating - a.rating).slice(0, 5);
  el.innerHTML = `
    <div class="lb-teaser-head">
      <h2>🏆 Bangkok Top 5</h2>
      <a href="players.html" class="btn btn-ghost btn-sm">See All →</a>
    </div>
    ${top5.map((p, i) => {
      const color = getAvatarColor(p.id);
      const tier = getSkillTier(p.skill_level);
      const rankIcon = i === 0 ? '👑' : '#' + (i+1);
      return `
        <a class="lb-row" href="player-detail.html?id=${p.id}">
          <div class="lb-rank ${i < 3 ? 'top' : ''}">${rankIcon}</div>
          <div class="lb-info">
            <div class="avatar" style="background:${color}">${getInitials(p.name)}</div>
            <div>
              <div class="lb-name">${p.name}</div>
              <div class="lb-sub">📍 ${p.district}</div>
            </div>
          </div>
          <div class="lb-right">
            <div class="lb-rating">${p.rating.toFixed(2)}</div>
            <div class="lb-record"><span class="badge skill-${tier}">${p.skill_level}</span></div>
          </div>
        </a>
      `;
    }).join('')}
  `;
})();

// ── Upcoming events (sidebar) ──────────────────────────────
(function buildUpcomingEvents() {
  const el = document.getElementById('upcoming-events');
  if (!el) return;
  const upcoming = [...events].sort((a,b) => a.date.localeCompare(b.date)).slice(0, 5);
  el.innerHTML = upcoming.map(ev => {
    const type = getEventTypeBadge(ev.type);
    const left = spotsLeft(ev);
    return `
      <a href="events.html" style="display:flex;align-items:center;gap:var(--space-md);padding:var(--space-sm) 0;border-bottom:1px solid var(--border);text-decoration:none;color:inherit;transition:opacity 0.2s" onmouseover="this.style.opacity='0.7'" onmouseout="this.style.opacity='1'">
        <div style="font-family:var(--font-head);font-size:0.8rem;font-weight:700;color:var(--accent);width:72px;flex-shrink:0">${formatDate(ev.date)}</div>
        <div style="flex:1">
          <div style="font-size:0.85rem;font-weight:600">${ev.title}</div>
          <div style="font-size:0.72rem;color:var(--muted);margin-top:2px">
            ${ev.time_start} · <span class="badge ${type.cls}" style="font-size:0.65rem">${type.label}</span>
          </div>
        </div>
        <div style="font-size:0.78rem;color:${left <= 3 ? '#ef4444' : 'var(--muted)'}">
          ${left} left
        </div>
      </a>
    `;
  }).join('');
})();

// ── Club spotlight ─────────────────────────────────────────
(function buildClubSpotlight() {
  const el = document.getElementById('club-spotlight');
  if (!el) return;
  const featured = clubs.filter(c => c.featured).slice(0, 5);
  el.innerHTML = featured.map(club => {
    const color = getAvatarColor(club.id);
    return `
      <a class="club-spot" href="club-detail.html?id=${club.id}">
        <div style="display:flex;align-items:center;gap:var(--space-md)">
          <div style="width:44px;height:44px;border-radius:var(--r-md);background:${color};display:flex;align-items:center;justify-content:center;font-family:var(--font-head);font-size:1.2rem;font-weight:700;color:#050508;flex-shrink:0">${club.name[0]}</div>
          <div>
            <div style="font-family:var(--font-head);font-weight:700;font-size:0.9rem">${club.name}</div>
            <div style="font-size:0.72rem;color:var(--muted)">📍 ${club.district}</div>
          </div>
        </div>
        <div style="display:flex;gap:var(--space-lg)">
          <div>
            <div style="font-family:var(--font-head);font-weight:700;font-size:1.2rem;color:var(--accent)">${club.courts_count}</div>
            <div style="font-size:0.68rem;color:var(--muted);text-transform:uppercase;letter-spacing:0.06em">Courts</div>
          </div>
          <div>
            <div style="font-family:var(--font-head);font-weight:700;font-size:1.2rem;color:var(--accent)">${club.member_count}</div>
            <div style="font-size:0.68rem;color:var(--muted);text-transform:uppercase;letter-spacing:0.06em">Members</div>
          </div>
        </div>
        <div style="display:flex;gap:5px;flex-wrap:wrap">
          ${renderStars(club.rating)}
          <span style="font-size:0.75rem;color:var(--muted)">${club.rating}</span>
        </div>
        <span style="font-size:0.78rem;color:var(--accent);font-weight:600">View Club →</span>
      </a>
    `;
  }).join('');
})();

// ── Mouse parallax on hero glows ──────────────────────────
document.addEventListener('mousemove', e => {
  const x = (e.clientX / window.innerWidth  - 0.5) * 30;
  const y = (e.clientY / window.innerHeight - 0.5) * 20;
  gsap.to('.hero-glow-1', { x: x * 0.8, y: y * 0.8, duration: 1.2, ease: 'power1.out' });
  gsap.to('.hero-glow-2', { x: -x * 0.5, y: -y * 0.5, duration: 1.5, ease: 'power1.out' });
});
