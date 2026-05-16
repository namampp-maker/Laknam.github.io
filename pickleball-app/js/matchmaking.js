/* ─────────────────────────────────────────────────────────
   SmashPoint — Matchmaking Engine
   ───────────────────────────────────────────────────────── */

/* ── Storage keys ────────────────────────────────────────── */
const PLAYER_KEY = 'smashpoint_player';
const rosterKey  = id => `smashpoint_roster_${id}`;
const matchKey   = id => `smashpoint_matches_${id}`;

/* ── Player Profile ──────────────────────────────────────── */
function getPlayerProfile() {
  try { return JSON.parse(localStorage.getItem(PLAYER_KEY)); }
  catch { return null; }
}

function createPlayerProfile(name) {
  const profile = {
    id: 'local_' + Date.now(),
    name: name.trim(),
    rank: 1000,
    wins: 0,
    losses: 0,
    gamesPlayed: 0
  };
  localStorage.setItem(PLAYER_KEY, JSON.stringify(profile));
  return profile;
}

function savePlayerProfile(profile) {
  localStorage.setItem(PLAYER_KEY, JSON.stringify(profile));
}

/* ── Event Roster ────────────────────────────────────────── */
function getRoster(eventId) {
  try { return JSON.parse(localStorage.getItem(rosterKey(eventId)) || '[]'); }
  catch { return []; }
}

function saveRoster(eventId, roster) {
  localStorage.setItem(rosterKey(eventId), JSON.stringify(roster));
}

function addToRoster(eventId, player) {
  const roster = getRoster(eventId);
  if (roster.find(p => p.id === player.id)) return roster;
  roster.push({ id: player.id, name: player.name, rank: player.rank, joinedAt: Date.now() });
  saveRoster(eventId, roster);
  return roster;
}

function removeFromRoster(eventId, playerId) {
  const roster = getRoster(eventId).filter(p => p.id !== playerId);
  saveRoster(eventId, roster);
  return roster;
}

/* ── Rank Tiers ──────────────────────────────────────────── */
function rankTier(rank) {
  if (rank >= 1550) return { label: 'Pro',      cls: 'rank-pro' };
  if (rank >= 1400) return { label: 'Elite',    cls: 'rank-elite' };
  if (rank >= 1250) return { label: 'Strong',   cls: 'rank-strong' };
  if (rank >= 1100) return { label: 'Rising',   cls: 'rank-rising' };
  if (rank >=  900) return { label: 'Baseline', cls: 'rank-baseline' };
  return                    { label: 'Dropping', cls: 'rank-drop' };
}

function rankBadgeHtml(rank) {
  const t = rankTier(rank);
  return `<span class="rank-badge ${t.cls}" title="${t.label}">${rank.toLocaleString()}</span>`;
}

/* ── ELO Calculation ─────────────────────────────────────── */
const ELO_K = 32;

function expectedScore(myRank, oppRank) {
  return 1 / (1 + Math.pow(10, (oppRank - myRank) / 400));
}

function calcElo(myRank, oppRank, won) {
  const delta = Math.round(ELO_K * ((won ? 1 : 0) - expectedScore(myRank, oppRank)));
  return { newRank: myRank + delta, delta };
}

/* ── Skill-Window Shuffle ────────────────────────────────── */
function skillWindowShuffle(sorted, windowSize = 150) {
  const result = [];
  let i = 0;
  while (i < sorted.length) {
    const anchor = sorted[i].rank;
    let j = i;
    while (j < sorted.length && sorted[j].rank - anchor <= windowSize) j++;
    const bucket = sorted.slice(i, j);
    for (let k = bucket.length - 1; k > 0; k--) {
      const r = Math.floor(Math.random() * (k + 1));
      [bucket[k], bucket[r]] = [bucket[r], bucket[k]];
    }
    result.push(...bucket);
    i = j;
  }
  return result;
}

/* ── Match Generation ────────────────────────────────────── */
function generateMatches(roster, format = 'doubles') {
  if (roster.length < 2) return null;

  const sorted   = [...roster].sort((a, b) => a.rank - b.rank);
  const shuffled = skillWindowShuffle(sorted);
  const courts   = [];
  const ts       = Date.now();

  if (format === 'singles') {
    let lo = 0, hi = shuffled.length - 1, num = 1;
    while (lo < hi) {
      courts.push({ id: `m_${ts}_${num}`, label: `Court ${num++}`, teamA: [shuffled[lo]], teamB: [shuffled[hi]], winner: null });
      lo++; hi--;
    }
    if (lo === hi) {
      courts.push({ id: `m_bye_${ts}`, label: `Court ${num}`, teamA: [shuffled[lo]], teamB: [], bye: true, winner: null });
    }
  } else {
    const teams = [];
    for (let i = 0; i + 1 < shuffled.length; i += 2) {
      teams.push([shuffled[i], shuffled[i + 1]]);
    }
    if (shuffled.length % 2 !== 0) {
      teams[teams.length - 1].push(shuffled[shuffled.length - 1]);
    }
    let num = 1;
    for (let i = 0; i + 1 < teams.length; i += 2) {
      courts.push({ id: `m_${ts}_${i}`, label: `Court ${num++}`, teamA: teams[i], teamB: teams[i + 1], winner: null });
    }
    if (teams.length % 2 !== 0 && teams.length > 1) {
      courts.push({ id: `m_bye_${ts}`, label: `Court ${num}`, teamA: teams[teams.length - 1], teamB: [], bye: true, winner: null });
    }
  }

  return { format, courts, generatedAt: ts };
}

function saveMatches(eventId, data) {
  localStorage.setItem(matchKey(eventId), JSON.stringify(data));
}

function loadMatches(eventId) {
  try { return JSON.parse(localStorage.getItem(matchKey(eventId))); }
  catch { return null; }
}

/* ── Demo Players ────────────────────────────────────────── */
function addDemoPlayers(eventId) {
  const roster     = getRoster(eventId);
  const existingIds = new Set(roster.map(p => p.id));
  const demos = (window.players || [])
    .filter(p => !existingIds.has('demo_' + p.id))
    .slice(0, 6)
    .map(p => ({
      id:       'demo_' + p.id,
      name:     p.name,
      rank:     Math.round((parseFloat(p.rating) - 2.5) * 200 + 1050),
      joinedAt: Date.now()
    }));
  if (!demos.length) return roster;
  const updated = [...roster, ...demos];
  saveRoster(eventId, updated);
  return updated;
}

/* ── Modal State ─────────────────────────────────────────── */
let mmEventId = null;
let mmFormat  = 'doubles';
let mmMatch   = null;

/* ── Matchmaking Modal ───────────────────────────────────── */
window.openMatchmaking = function(eventId) {
  mmEventId = eventId;
  mmFormat  = 'doubles';
  mmMatch   = loadMatches(eventId);

  const ev = (typeof getAllEvents === 'function' ? getAllEvents() : []).find(e => e.id === eventId);
  if (ev) document.getElementById('mm-event-title').textContent = ev.title;

  document.querySelectorAll('.mm-fmt-btn').forEach(b => {
    b.classList.toggle('active', b.dataset.fmt === 'doubles');
  });

  document.getElementById('mm-toast').style.display = 'none';
  document.getElementById('mm-backdrop').classList.add('open');
  document.body.style.overflow = 'hidden';

  mmRenderRoster();
  if (mmMatch) {
    mmRenderBracket();
    document.getElementById('mm-bracket').style.display = '';
  } else {
    document.getElementById('mm-bracket').style.display = 'none';
  }
};

window.closeMmModal = function() {
  document.getElementById('mm-backdrop').classList.remove('open');
  document.body.style.overflow = '';
  mmEventId = null;
};

window.handleMmBackdrop = function(e) {
  if (e.target === document.getElementById('mm-backdrop')) closeMmModal();
};

window.setMatchFormat = function(fmt) {
  mmFormat = fmt;
  document.querySelectorAll('.mm-fmt-btn').forEach(b => b.classList.toggle('active', b.dataset.fmt === fmt));
  if (document.getElementById('mm-bracket').style.display !== 'none') mmGenerate();
};

window.mmAddDemo = function() {
  if (!mmEventId) return;
  addDemoPlayers(mmEventId);
  mmRenderRoster();
};

window.mmGenerate = function() {
  if (!mmEventId) return;
  const roster = getRoster(mmEventId);
  if (roster.length < 2) {
    showMmToast('Need at least 2 players to generate matches.', true);
    return;
  }
  mmMatch = generateMatches(roster, mmFormat);
  saveMatches(mmEventId, mmMatch);
  mmRenderBracket();
  document.getElementById('mm-bracket').style.display = '';
  document.getElementById('mm-toast').style.display = 'none';
};

window.mmShuffle = window.mmGenerate;

window.mmRecordResult = function(courtId, winner) {
  if (!mmMatch) return;
  const court = mmMatch.courts.find(c => c.id === courtId);
  if (!court || court.winner || court.bye) return;

  court.winner = winner;

  const teamA  = court.teamA;
  const teamB  = court.teamB;
  const avgA   = Math.round(teamA.reduce((s, p) => s + p.rank, 0) / teamA.length);
  const avgB   = Math.round(teamB.reduce((s, p) => s + p.rank, 0) / teamB.length);
  const aWon   = winner === 'A';
  const roster = getRoster(mmEventId);
  const profile = getPlayerProfile();
  const lines  = [];

  function applyElo(team, won, oppAvg) {
    team.forEach(p => {
      const { newRank, delta } = calcElo(p.rank, oppAvg, won);
      const sign  = delta >= 0 ? '+' : '';
      const color = delta >= 0 ? '#34d399' : '#ef4444';
      lines.push(`${p.name} <strong style="color:${color}">${sign}${delta}</strong> → ${rankBadgeHtml(newRank)}`);
      const rp = roster.find(r => r.id === p.id);
      if (rp) rp.rank = newRank;
      p.rank = newRank;
      if (profile && p.id === profile.id) {
        profile.rank = newRank;
        if (won) profile.wins = (profile.wins || 0) + 1;
        else     profile.losses = (profile.losses || 0) + 1;
        profile.gamesPlayed = (profile.gamesPlayed || 0) + 1;
        savePlayerProfile(profile);
      }
    });
  }

  applyElo(teamA,  aWon, avgB);
  applyElo(teamB, !aWon, avgA);

  saveRoster(mmEventId, roster);
  saveMatches(mmEventId, mmMatch);

  mmRenderBracket();
  mmRenderRoster();
  const winLabel = winner === 'A' ? 'Team A' : 'Team B';
  showMmToast(`🏆 ${winLabel} wins!<br>${lines.join('<br>')}`);
};

function mmRenderRoster() {
  const roster  = getRoster(mmEventId);
  const profile = getPlayerProfile();
  document.getElementById('mm-count').textContent = `${roster.length} player${roster.length !== 1 ? 's' : ''}`;

  const listEl = document.getElementById('mm-roster-list');
  if (!roster.length) {
    listEl.innerHTML = `<div style="text-align:center;padding:16px;color:var(--muted);font-size:0.85rem">No players yet — click "+ Add Demo Players" to test.</div>`;
    return;
  }
  const sorted = [...roster].sort((a, b) => b.rank - a.rank);
  listEl.innerHTML = sorted.map(p => {
    const isMe = profile && p.id === profile.id;
    return `<div class="mm-player-row">
      <div class="mm-player-name">${p.name}${isMe ? ' <span class="mm-player-self">You</span>' : ''}</div>
      ${rankBadgeHtml(p.rank)}
    </div>`;
  }).join('');
}

function mmRenderBracket() {
  if (!mmMatch) return;
  document.getElementById('mm-courts').innerHTML = mmMatch.courts.map(court => {
    if (court.bye) {
      return `<div class="mm-court-card">
        <div class="mm-court-label">${court.label}</div>
        <div class="mm-team">
          ${court.teamA.map(p => `<div class="mm-team-player"><span>${p.name}</span>${rankBadgeHtml(p.rank)}</div>`).join('')}
        </div>
        <div class="mm-bye">Bye — waiting for an opponent</div>
      </div>`;
    }
    const resultHtml = court.winner
      ? `<span class="mm-winner-badge">🏆 ${court.winner === 'A' ? 'Team A' : 'Team B'} Won</span>`
      : `<div class="mm-result-btns">
           <button class="btn btn-outline btn-sm" onclick="mmRecordResult('${court.id}','A')">Team A Won</button>
           <button class="btn btn-outline btn-sm" onclick="mmRecordResult('${court.id}','B')">Team B Won</button>
         </div>`;
    return `<div class="mm-court-card">
      <div class="mm-court-label">${court.label}</div>
      <div class="mm-matchup">
        <div class="mm-team">
          ${court.teamA.map(p => `<div class="mm-team-player"><span>${p.name}</span>${rankBadgeHtml(p.rank)}</div>`).join('')}
        </div>
        <div class="mm-vs">VS</div>
        <div class="mm-team mm-team-right">
          ${court.teamB.map(p => `<div class="mm-team-player"><span>${p.name}</span>${rankBadgeHtml(p.rank)}</div>`).join('')}
        </div>
      </div>
      <div style="margin-top:10px">${resultHtml}</div>
    </div>`;
  }).join('');
}

let _toastTimer = null;
function showMmToast(html, isError) {
  const el = document.getElementById('mm-toast');
  el.innerHTML = html;
  el.style.borderColor = isError ? '#ef4444' : 'var(--border-hi)';
  el.style.display = '';
  clearTimeout(_toastTimer);
  _toastTimer = setTimeout(() => { el.style.display = 'none'; }, 5000);
}

/* ── Profile Modal ───────────────────────────────────────── */
let _pendingJoinId  = null;
let _pendingJoinBtn = null;

window.openProfileModal = function(eventId, btn) {
  _pendingJoinId  = eventId;
  _pendingJoinBtn = btn;
  document.getElementById('pm-name').value = '';
  document.getElementById('pm-err').style.display = 'none';
  document.getElementById('profile-backdrop').classList.add('open');
  document.body.style.overflow = 'hidden';
  setTimeout(() => document.getElementById('pm-name').focus(), 120);
};

window.closeProfileModal = function() {
  document.getElementById('profile-backdrop').classList.remove('open');
  document.body.style.overflow = '';
  _pendingJoinId  = null;
  _pendingJoinBtn = null;
};

window.handleProfileBackdrop = function(e) {
  if (e.target === document.getElementById('profile-backdrop')) closeProfileModal();
};

window.confirmJoin = function() {
  const name  = document.getElementById('pm-name').value.trim();
  const errEl = document.getElementById('pm-err');
  if (!name) { errEl.style.display = 'block'; return; }
  errEl.style.display = 'none';

  createPlayerProfile(name);

  const id  = _pendingJoinId;
  const btn = _pendingJoinBtn;
  // Clear pending state before calling toggleRegister to avoid re-entering
  _pendingJoinId  = null;
  _pendingJoinBtn = null;
  document.getElementById('profile-backdrop').classList.remove('open');
  document.body.style.overflow = '';

  // Profile now exists — call toggleRegister again to complete the join
  if (id && btn && typeof window.toggleRegister === 'function') {
    window.toggleRegister(id, btn);
  }
};

// Enter key submits profile form
document.addEventListener('keydown', function(e) {
  if (e.key === 'Enter' && document.getElementById('profile-backdrop').classList.contains('open')) {
    confirmJoin();
  }
});
