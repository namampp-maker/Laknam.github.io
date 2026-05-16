/* ─────────────────────────────────────────────────────────
   SmashPoint — Events page
   ───────────────────────────────────────────────────────── */

let filterState = { search:'', type:'all', skill_level:'all', district:'all', free:false };
let quickMode = 'all';
const registered = new Set();

// ── LocalStorage: created events ───────────────────────────
const LS_KEY = 'smashpoint_created_events';

function loadCreatedEvents() {
  try { return JSON.parse(localStorage.getItem(LS_KEY) || '[]'); }
  catch { return []; }
}

function saveCreatedEvents(evts) {
  localStorage.setItem(LS_KEY, JSON.stringify(evts));
}

function getAllEvents() {
  return [...events, ...loadCreatedEvents()];
}

// ── Populate district dropdown ─────────────────────────────
const districtSel = document.getElementById('f-district');
districts.forEach(d => {
  const opt = document.createElement('option');
  opt.value = d; opt.textContent = d;
  districtSel.appendChild(opt);
});

// ── Populate modal court select ────────────────────────────
const courtSel = document.getElementById('ce-location');
if (courtSel) {
  courts.forEach(c => {
    const opt = document.createElement('option');
    opt.value = c.id;
    opt.textContent = `${c.name} (${c.district})`;
    courtSel.appendChild(opt);
  });
}

// ── Date helpers ───────────────────────────────────────────
const today = '2026-05-16';
const weekend = ['2026-05-16', '2026-05-17', '2026-05-18'];

function isToday(event)   { return event.date === today; }
function isWeekend(event) { return weekend.includes(event.date); }

// ── "My Games" tab visibility ──────────────────────────────
function refreshMineTab() {
  const created = loadCreatedEvents();
  const tab = document.getElementById('mine-tab');
  if (tab) tab.style.display = created.length > 0 ? '' : 'none';
}

// ── Render events ──────────────────────────────────────────
function renderEvents(evts) {
  const grid = document.getElementById('events-grid');
  const count = document.getElementById('f-count');
  count.textContent = `${evts.length} events`;
  document.getElementById('results-label').textContent =
    quickMode === 'today'   ? 'Today\'s Events' :
    quickMode === 'weekend' ? 'This Weekend' :
    quickMode === 'free'    ? 'Free Events' :
    quickMode === 'mine'    ? 'My Created Games' :
    `${evts.length} Upcoming Events`;

  if (evts.length === 0) {
    const emptyMsg = quickMode === 'mine'
      ? '<p>You haven\'t created any games yet. <button class="btn btn-fill btn-sm" onclick="openModal()" style="margin-left:8px">+ Host a Game</button></p>'
      : '<p>Try adjusting your filters or check back soon.</p>';
    grid.innerHTML = `<div class="empty-state" style="grid-column:1/-1"><div class="icon">🏓</div><h3>No events found</h3>${emptyMsg}</div>`;
    return;
  }

  grid.innerHTML = evts.map(ev => {
    const isCommunity = !!ev._community;
    const type = isCommunity && ev.type === 'social'
      ? { label: 'Community', cls: 'badge-purple', border: '#a78bfa' }
      : getEventTypeBadge(ev.type);

    const court = getCourtById(ev.court_id);
    const locationName = ev._location_label || (court ? court.name : '—');
    const sl = getSkillTier(ev.skill_level);
    const slLabel = getSkillLabel(ev.skill_level);
    const left = spotsLeft(ev);
    const pct = spotsPercent(ev);
    const isFull = left <= 0;
    const priceHtml = ev.price === 0
      ? `<span class="event-price free">Free</span>`
      : `<span class="event-price paid">฿${ev.price}</span>`;
    const isReg = registered.has(ev.id);
    const progressColor = left <= 3 ? 'red' : left <= 8 ? 'orange' : '';

    const communityBadge = isCommunity
      ? `<span class="badge badge-purple" title="Created by community">👤 Community</span>`
      : '';
    const deleteBtn = isCommunity
      ? `<button class="btn btn-ghost btn-sm" onclick="deleteCreatedEvent('${ev.id}',event)" title="Delete this game" style="color:var(--muted);padding:0 6px">✕</button>`
      : '';
    const matchmakingBtn = isCommunity
      ? `<button class="btn btn-sm" onclick="openMatchmaking('${ev.id}')" style="border:1px solid rgba(181,242,61,0.4);color:var(--accent);background:var(--accent-dim);flex-shrink:0">⚡ Matches</button>`
      : '';

    const desc = ev.description
      ? ev.description.slice(0, 90) + (ev.description.length > 90 ? '…' : '')
      : '';

    return `
      <div class="event-card ${ev.type}${isCommunity ? ' community' : ''}">
        <div class="event-meta">
          <span class="badge ${type.cls}">${type.label}</span>
          <span class="badge skill-${sl}">${slLabel}</span>
          ${priceHtml}
          ${communityBadge}
        </div>
        <div class="event-title">${ev.title}</div>
        <div>
          <div class="event-datetime">${formatDate(ev.date)} · ${ev.time_start}–${ev.time_end}</div>
          <div class="event-sub">📍 ${locationName}</div>
          ${ev.organizer ? `<div class="event-sub">🧑 ${ev.organizer}</div>` : ''}
        </div>
        ${desc ? `<div class="event-sub">${desc}</div>` : ''}
        <div>
          <div class="spots-row">
            <span>${isFull ? '⚠️ Fully booked' : `<strong>${left}</strong> spots left`}</span>
            <span>${ev.spots_taken}/${ev.spots_total}</span>
          </div>
          <div class="progress-bar" style="margin-top:6px">
            <div class="progress-fill ${progressColor}" style="width:${pct}%"></div>
          </div>
        </div>
        <div class="event-actions">
          ${isFull
            ? `<button class="btn btn-outline btn-sm register-btn" disabled style="opacity:0.4;cursor:not-allowed">Fully Booked</button>`
            : `<button class="btn ${isReg ? 'btn-outline register-btn registered' : 'btn-fill'} btn-sm register-btn"
                onclick="toggleRegister('${ev.id}', this)">${isReg ? '✓ Joined' : 'Join Game'}</button>`
          }
          ${matchmakingBtn}
          ${deleteBtn}
        </div>
      </div>
    `;
  }).join('');
}

// ── Register toggle ────────────────────────────────────────
window.toggleRegister = function(id, btn) {
  if (registered.has(id)) {
    registered.delete(id);
    const profile = getPlayerProfile();
    if (profile) removeFromRoster(id, profile.id);
    btn.textContent = 'Join Game';
    btn.className = 'btn btn-fill btn-sm register-btn';
  } else {
    const profile = getPlayerProfile();
    if (!profile) {
      openProfileModal(id, btn);
      return;
    }
    registered.add(id);
    addToRoster(id, profile);
    btn.textContent = '✓ Joined';
    btn.className = 'btn btn-outline btn-sm register-btn registered';
  }
};

// ── Delete created event ───────────────────────────────────
window.deleteCreatedEvent = function(id, e) {
  e.stopPropagation();
  const created = loadCreatedEvents().filter(ev => ev.id !== id);
  saveCreatedEvents(created);
  refreshMineTab();
  runFilter();
};

// ── Filter pipeline ────────────────────────────────────────
function runFilter() {
  let evts = getAllEvents();

  if (quickMode === 'today')   evts = evts.filter(isToday);
  if (quickMode === 'weekend') evts = evts.filter(isWeekend);
  if (quickMode === 'free')    evts = evts.filter(e => e.price === 0);
  if (quickMode === 'mine')    evts = evts.filter(e => e._community);

  evts = applyFilters(evts, filterState);
  evts.sort((a, b) => a.date.localeCompare(b.date) || a.time_start.localeCompare(b.time_start));

  renderEvents(evts);
}

// ── Input bindings ─────────────────────────────────────────
document.getElementById('f-search').addEventListener('input', e => { filterState.search = e.target.value; runFilter(); });
document.getElementById('f-type').addEventListener('change',  e => { filterState.type = e.target.value; runFilter(); });
document.getElementById('f-skill').addEventListener('change', e => { filterState.skill_level = e.target.value; runFilter(); });
document.getElementById('f-district').addEventListener('change', e => { filterState.district = e.target.value; runFilter(); });

document.getElementById('f-free').addEventListener('click', function() {
  filterState.free = !filterState.free;
  this.classList.toggle('active', filterState.free);
  runFilter();
});

document.getElementById('f-reset').addEventListener('click', () => {
  filterState = { search:'', type:'all', skill_level:'all', district:'all', free:false };
  document.getElementById('f-search').value = '';
  document.getElementById('f-type').value = 'all';
  document.getElementById('f-skill').value = 'all';
  document.getElementById('f-district').value = 'all';
  document.getElementById('f-free').classList.remove('active');
  quickMode = 'all';
  document.querySelectorAll('.quick-tab').forEach(t => t.classList.toggle('active', t.dataset.quick === 'all'));
  runFilter();
});

document.querySelectorAll('.quick-tab').forEach(tab => {
  tab.addEventListener('click', function() {
    quickMode = this.dataset.quick;
    document.querySelectorAll('.quick-tab').forEach(t => t.classList.remove('active'));
    this.classList.add('active');
    runFilter();
  });
});

// ── URL param: ?court= ─────────────────────────────────────
const params = new URLSearchParams(window.location.search);
const courtParam = params.get('court');
if (courtParam) {
  const court = getCourtById(courtParam);
  if (court) {
    document.getElementById('f-search').value = court.district;
    filterState.search = court.district;
  }
}

// ── Modal logic ────────────────────────────────────────────
let selectedType = 'open_play';

window.openModal = function() {
  document.getElementById('modal-backdrop').classList.add('open');
  document.body.style.overflow = 'hidden';
  document.getElementById('modal-success').classList.remove('show');
  document.getElementById('modal-form-wrap').style.display = '';
  // Default date to today
  document.getElementById('ce-date').value = today;
};

window.closeModal = function() {
  document.getElementById('modal-backdrop').classList.remove('open');
  document.body.style.overflow = '';
  runFilter();
  refreshMineTab();
  // Show "My Games" tab if events exist
  if (loadCreatedEvents().length > 0 && quickMode !== 'mine') {
    quickMode = 'mine';
    document.querySelectorAll('.quick-tab').forEach(t => t.classList.toggle('active', t.dataset.quick === 'mine'));
    runFilter();
  }
};

window.resetAndOpen = function() {
  document.getElementById('create-event-form').reset();
  document.getElementById('ce-date').value = today;
  document.getElementById('ce-type').value = 'open_play';
  selectedType = 'open_play';
  document.querySelectorAll('.type-pill').forEach(p => p.classList.toggle('active', p.dataset.val === 'open_play'));
  document.getElementById('modal-success').classList.remove('show');
  document.getElementById('modal-form-wrap').style.display = '';
};

window.handleBackdropClick = function(e) {
  if (e.target === document.getElementById('modal-backdrop')) closeModal();
};

// Escape key closes modal
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeModal();
});

// Type pill selection
document.querySelectorAll('.type-pill').forEach(pill => {
  pill.addEventListener('click', function() {
    document.querySelectorAll('.type-pill').forEach(p => p.classList.remove('active'));
    this.classList.add('active');
    selectedType = this.dataset.val;
    document.getElementById('ce-type').value = selectedType;
  });
});

// ── Form submission ────────────────────────────────────────
window.submitEvent = function(e) {
  e.preventDefault();

  // Validate
  let valid = true;
  const title = document.getElementById('ce-title').value.trim();
  const date  = document.getElementById('ce-date').value;
  const courtId = document.getElementById('ce-location').value;
  const customLoc = document.getElementById('ce-location-custom').value.trim();

  document.getElementById('err-title').classList.toggle('show', !title);
  document.getElementById('err-date').classList.toggle('show', !date);
  document.getElementById('err-location').classList.toggle('show', !courtId && !customLoc);
  if (!title || !date || (!courtId && !customLoc)) valid = false;
  if (!valid) return;

  // Build location label
  let locationLabel = customLoc;
  let resolvedCourtId = null;
  if (courtId) {
    const c = getCourtById(courtId);
    locationLabel = c ? c.name : courtId;
    resolvedCourtId = courtId;
  }

  const start = document.getElementById('ce-start').value || '09:00';
  const end   = document.getElementById('ce-end').value   || '11:00';
  const spots = parseInt(document.getElementById('ce-spots').value, 10) || 8;
  const price = parseInt(document.getElementById('ce-price').value, 10) || 0;
  const skill = document.getElementById('ce-skill').value;
  const desc  = document.getElementById('ce-desc').value.trim();
  const organizer = document.getElementById('ce-organizer').value.trim() || 'Community';

  const newEvent = {
    id: 'u_' + Date.now(),
    title,
    type: selectedType,
    court_id: resolvedCourtId,
    club_id: null,
    organizer,
    date,
    time_start: start,
    time_end: end,
    skill_level: skill,
    price,
    spots_total: spots,
    spots_taken: 1, // creator counts as 1
    description: desc || 'Casual game hosted by the community.',
    tags: ['community'],
    _community: true,
    _location_label: locationLabel,
    _created_at: Date.now()
  };

  const created = loadCreatedEvents();
  created.unshift(newEvent);
  saveCreatedEvents(created);

  // Show success
  document.getElementById('modal-form-wrap').style.display = 'none';
  document.getElementById('modal-success').classList.add('show');
};

// ── Boot ───────────────────────────────────────────────────
refreshMineTab();
runFilter();

// Auto-open modal if navigated from homepage "Host a Game" button
if (sessionStorage.getItem('openHostModal') === '1') {
  sessionStorage.removeItem('openHostModal');
  openModal();
}
