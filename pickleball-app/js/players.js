/* ─────────────────────────────────────────────────────────
   SmashPoint — Players page
   ───────────────────────────────────────────────────────── */

let filterState = {
  search: '', skill_level: 'all', district: 'all',
  style: 'all', gender: 'all', partner: false, sort: 'rating'
};
let viewMode = 'grid';

// ── Populate district pills ────────────────────────────────
const districtPills = document.getElementById('district-pills');
const usedDistricts = [...new Set(players.map(p => p.district))].sort();
usedDistricts.forEach(d => {
  const btn = document.createElement('button');
  btn.className = 'pill';
  btn.dataset.district = d;
  btn.textContent = d;
  districtPills.appendChild(btn);
});

// ── Leaderboard (top 5 by rating) ─────────────────────────
function renderLeaderboard() {
  const top5 = [...players].sort((a,b) => b.rating - a.rating).slice(0, 5);
  const lb = document.getElementById('leaderboard');
  lb.innerHTML = `
    <div class="leaderboard-head">
      <h2>🏆 Top Ranked Players</h2>
      <span class="eyebrow">Bangkok Ratings</span>
    </div>
    ${top5.map((p, i) => {
      const rankCls = i === 0 ? 'top gold' : i < 3 ? 'top' : '';
      const tier = getSkillTier(p.skill_level);
      const avatarColor = getAvatarColor(p.id);
      const initials = getInitials(p.name);
      const court = getCourtById(p.home_court_id);
      return `
        <a class="lb-row" href="player-detail.html?id=${p.id}">
          <div class="lb-rank ${rankCls}">${i === 0 ? '👑' : '#' + (i+1)}</div>
          <div class="lb-info">
            <div class="avatar avatar-lg" style="background:${avatarColor}">${initials}</div>
            <div>
              <div class="lb-name">${p.name}</div>
              <div class="lb-sub">📍 ${p.district} · ${court ? court.name.split('—')[0].trim() : '—'}</div>
            </div>
          </div>
          <div class="lb-right">
            <div class="lb-rating">${p.rating.toFixed(2)}</div>
            <div class="lb-record">${p.wins}W / ${p.losses}L · <span class="badge skill-${tier}">${p.skill_level}</span></div>
          </div>
        </a>
      `;
    }).join('')}
  `;
}

// ── Player grid/list ───────────────────────────────────────
function renderPlayers(filteredPlayers) {
  const grid = document.getElementById('players-grid');
  const count = document.getElementById('f-count');
  count.textContent = `${filteredPlayers.length} players`;
  document.getElementById('grid-title').textContent = `${filteredPlayers.length} Players`;

  if (filteredPlayers.length === 0) {
    grid.innerHTML = `<div class="empty-state" style="grid-column:1/-1"><div class="icon">🏓</div><h3>No players found</h3><p>Try adjusting your filters.</p></div>`;
    return;
  }

  grid.innerHTML = filteredPlayers.map(p => {
    const tier = getSkillTier(p.skill_level);
    const color = getAvatarColor(p.id);
    const initials = getInitials(p.name);
    const club = getClubById(p.club_id);
    return `
      <a class="player-card" href="player-detail.html?id=${p.id}">
        <div class="player-card-top">
          <div class="avatar avatar-lg" style="background:${color}">${initials}</div>
          <div class="player-info">
            <div class="player-name">${p.name}</div>
            <div style="font-size:0.75rem;color:var(--muted);margin-top:2px">📍 ${p.district}</div>
          </div>
          <div class="player-rating-big">${p.rating.toFixed(1)}</div>
        </div>
        <div class="player-tags">
          <span class="badge skill-${tier}">${p.skill_level}</span>
          <span class="badge badge-surface">${p.playing_style}</span>
          ${p.looking_for_partner ? '<span class="badge badge-accent">🤝 Partner</span>' : ''}
          ${p.gender === 'F' ? '<span class="badge badge-muted">F</span>' : '<span class="badge badge-muted">M</span>'}
        </div>
        ${viewMode === 'list'
          ? `<div style="font-family:var(--font-head);font-size:1.1rem;font-weight:700;color:var(--accent)">${p.rating.toFixed(2)}</div>`
          : ''}
      </a>
    `;
  }).join('');

  if (typeof initTilt === 'function') initTilt();
}

// ── View toggle ────────────────────────────────────────────
window.setView = function(mode) {
  viewMode = mode;
  const grid = document.getElementById('players-grid');
  grid.classList.toggle('list-view', mode === 'list');
  document.getElementById('grid-btn').classList.toggle('active', mode === 'grid');
  document.getElementById('list-btn').classList.toggle('active', mode === 'list');
  runFilter();
};

// ── Filter pipeline ────────────────────────────────────────
function runFilter() {
  let ps = [...players];

  // Text search
  if (filterState.search) {
    const q = filterState.search.toLowerCase();
    ps = ps.filter(p => p.name.toLowerCase().includes(q) || p.district.toLowerCase().includes(q));
  }
  if (filterState.skill_level !== 'all') ps = ps.filter(p => p.skill_level === filterState.skill_level);
  if (filterState.district !== 'all')    ps = ps.filter(p => p.district === filterState.district);
  if (filterState.style !== 'all')       ps = ps.filter(p => p.playing_style === filterState.style || p.playing_style === 'both');
  if (filterState.gender !== 'all')      ps = ps.filter(p => p.gender === filterState.gender);
  if (filterState.partner)               ps = ps.filter(p => p.looking_for_partner);

  // Sort
  if (filterState.sort === 'rating')     ps.sort((a,b) => b.rating - a.rating);
  else if (filterState.sort === 'games') ps.sort((a,b) => b.games_played - a.games_played);
  else if (filterState.sort === 'wins')  ps.sort((a,b) => b.wins - a.wins);

  renderPlayers(ps);
}

// ── Bind inputs ────────────────────────────────────────────
document.getElementById('f-search').addEventListener('input', e => { filterState.search = e.target.value; runFilter(); });
document.getElementById('f-style').addEventListener('change',  e => { filterState.style = e.target.value; runFilter(); });
document.getElementById('f-gender').addEventListener('change', e => { filterState.gender = e.target.value; runFilter(); });
document.getElementById('f-sort').addEventListener('change',   e => { filterState.sort = e.target.value; runFilter(); });

document.getElementById('f-partner').addEventListener('click', function() {
  filterState.partner = !filterState.partner;
  this.classList.toggle('active', filterState.partner);
  runFilter();
});

// Skill pills
document.getElementById('skill-pills').addEventListener('click', e => {
  const pill = e.target.closest('.pill');
  if (!pill) return;
  document.querySelectorAll('#skill-pills .pill').forEach(p => p.classList.remove('active'));
  pill.classList.add('active');
  filterState.skill_level = pill.dataset.skill;
  runFilter();
});

// District pills
districtPills.addEventListener('click', e => {
  const pill = e.target.closest('.pill');
  if (!pill) return;
  document.querySelectorAll('#district-pills .pill').forEach(p => p.classList.remove('active'));
  pill.classList.add('active');
  filterState.district = pill.dataset.district;
  runFilter();
});

// Boot
renderLeaderboard();
runFilter();
