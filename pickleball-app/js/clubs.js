/* ─────────────────────────────────────────────────────────
   SmashPoint — Clubs page
   ───────────────────────────────────────────────────────── */

let filterState = { search:'', district:'all', indoor:false, coaching:false, cafe:false };

// ── District dropdown ──────────────────────────────────────
const districtSel = document.getElementById('f-district');
if (districtSel) {
  districts.forEach(d => {
    const opt = document.createElement('option');
    opt.value = d; opt.textContent = d;
    districtSel.appendChild(opt);
  });
}

// ── Render clubs ───────────────────────────────────────────
function renderClubs(filteredClubs) {
  const grid = document.getElementById('clubs-grid');
  const count = document.getElementById('f-count');
  if (count) count.textContent = `${filteredClubs.length} clubs`;

  if (filteredClubs.length === 0) {
    grid.innerHTML = `<div class="empty-state" style="grid-column:1/-1"><div class="icon">🏢</div><h3>No clubs found</h3><p>Try adjusting your filters.</p></div>`;
    return;
  }

  grid.innerHTML = filteredClubs.map(club => {
    const color = getAvatarColor(club.id);
    const initial = club.name[0];
    const amenityList = club.amenities.slice(0, 5).map(a => {
      const ai = amenityIcon(a);
      return `<span class="badge badge-surface" style="font-size:0.68rem">${ai.icon} ${ai.label}</span>`;
    }).join('');
    const price = club.membership_fee
      ? `฿${club.membership_fee}/mo`
      : 'Free membership';
    const mapsUrl = `https://www.google.com/maps?q=${club.lat},${club.lng}`;

    return `
      <a class="club-card${club.featured ? ' card-accent' : ''}" href="club-detail.html?id=${club.id}">
        <div style="display:flex;align-items:flex-start;justify-content:space-between">
          <div class="club-logo" style="background:${color}">${initial}</div>
          ${club.featured ? '<span class="featured-banner">Featured</span>' : ''}
        </div>
        <div class="club-name">${club.name}</div>
        <div class="club-meta">
          <span class="badge badge-surface">📍 ${club.district}</span>
          <div class="stars">${renderStars(club.rating)}</div>
          <span style="font-size:0.75rem;color:var(--muted)">(${club.reviews_count})</span>
        </div>
        <div class="club-stats">
          <div>
            <div class="cstat-num">${club.courts_count}</div>
            <div class="cstat-label">Courts</div>
          </div>
          <div>
            <div class="cstat-num">${club.member_count}</div>
            <div class="cstat-label">Members</div>
          </div>
        </div>
        <div class="club-amenities">${amenityList}</div>
        <div class="club-hours">⏰ ${club.hours.open}–${club.hours.close} · ${club.hours.days}</div>
        <div class="club-footer">
          <span class="club-price">💳 ${price}</span>
          <span class="btn btn-ghost btn-sm">View Club →</span>
        </div>
      </a>
    `;
  }).join('');

  if (typeof initTilt === 'function') initTilt();
}

// ── Filter ─────────────────────────────────────────────────
function runFilter() {
  let cs = [...clubs];
  if (filterState.search) {
    const q = filterState.search.toLowerCase();
    cs = cs.filter(c => c.name.toLowerCase().includes(q) || c.district.toLowerCase().includes(q));
  }
  if (filterState.district !== 'all') cs = cs.filter(c => c.district === filterState.district);
  if (filterState.indoor)   cs = cs.filter(c => c.amenities.includes('indoor'));
  if (filterState.coaching) cs = cs.filter(c => c.amenities.includes('coaching'));
  if (filterState.cafe)     cs = cs.filter(c => c.amenities.includes('cafe'));

  // Featured first
  cs.sort((a,b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));

  renderClubs(cs);
}

// ── Bind ───────────────────────────────────────────────────
document.getElementById('f-search').addEventListener('input', e => { filterState.search = e.target.value; runFilter(); });
document.getElementById('f-district').addEventListener('change', e => { filterState.district = e.target.value; runFilter(); });

['f-indoor','f-coaching','f-cafe'].forEach(id => {
  document.getElementById(id).addEventListener('click', function() {
    const key = id.replace('f-','');
    filterState[key] = !filterState[key];
    this.classList.toggle('active', filterState[key]);
    runFilter();
  });
});

document.getElementById('f-reset').addEventListener('click', () => {
  filterState = { search:'', district:'all', indoor:false, coaching:false, cafe:false };
  document.getElementById('f-search').value = '';
  document.getElementById('f-district').value = 'all';
  ['f-indoor','f-coaching','f-cafe'].forEach(id => document.getElementById(id).classList.remove('active'));
  runFilter();
});

runFilter();
