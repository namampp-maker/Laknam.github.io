/* ─────────────────────────────────────────────────────────
   SmashPoint — Courts page
   ───────────────────────────────────────────────────────── */

let map, markers = {}, activeCard = null;
let filterState = { search:'', district:'all', surface:'all', lit:false, indoor:false, free:false };

// ── Populate district dropdown ─────────────────────────────
const districtSel = document.getElementById('f-district');
districts.forEach(d => {
  const opt = document.createElement('option');
  opt.value = d; opt.textContent = d;
  districtSel.appendChild(opt);
});

// ── Init Leaflet map ───────────────────────────────────────
function initMap() {
  map = L.map('map', { zoomControl: false, attributionControl: false }).setView([13.745, 100.565], 12);

  L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
    maxZoom: 19
  }).addTo(map);

  L.control.zoom({ position: 'bottomright' }).addTo(map);
  L.control.attribution({ position: 'bottomleft', prefix: '© CartoDB · © OSM' }).addTo(map);
}

function createMarkerIcon(count, isActive) {
  const size = isActive ? 38 : 32;
  const color = isActive ? '#b5f23d' : 'rgba(181,242,61,0.75)';
  const textColor = '#050508';
  return L.divIcon({
    className: '',
    html: `<div style="
      width:${size}px;height:${size}px;border-radius:50%;
      background:${color};
      display:flex;align-items:center;justify-content:center;
      font-family:'Space Grotesk',sans-serif;font-weight:700;
      font-size:${size < 36 ? 11 : 13}px;color:${textColor};
      box-shadow:0 2px 12px rgba(181,242,61,0.4);
      transition:all 0.2s;
      border:2px solid ${isActive ? '#fff' : 'transparent'};
    ">${count}</div>`,
    iconSize: [size, size],
    iconAnchor: [size/2, size/2]
  });
}

function addMarkers(filteredCourts) {
  // Remove old markers
  Object.values(markers).forEach(m => map.removeLayer(m));
  markers = {};

  filteredCourts.forEach(court => {
    const m = L.marker([court.lat, court.lng], {
      icon: createMarkerIcon(court.courts_count, false)
    }).addTo(map);

    const price = court.price_per_hour === 0
      ? '<span style="color:#34d399;font-weight:700">Free</span>'
      : `<span style="color:#b5f23d;font-weight:700">฿${court.price_per_hour}/hr</span>`;

    m.bindPopup(`
      <div class="map-popup">
        <h3>${court.name}</h3>
        <p>📍 ${court.district} · ${court.courts_count} court${court.courts_count > 1 ? 's' : ''}</p>
        <p>⏰ ${court.hours.open}–${court.hours.close} · ${court.hours.days}</p>
        <p>${price} · ${court.surface} · ${court.indoor ? 'Indoor' : 'Outdoor'}</p>
        <a href="events.html?court=${court.id}">View Events →</a>
      </div>
    `, { maxWidth: 220 });

    m.on('click', () => {
      setActiveCard(court.id);
      const cardEl = document.getElementById('card-' + court.id);
      if (cardEl) cardEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    });

    markers[court.id] = m;
  });
}

// ── Render court cards ─────────────────────────────────────
function renderCards(filteredCourts) {
  const list = document.getElementById('courts-list');
  document.getElementById('f-count').textContent = `${filteredCourts.length} courts`;

  if (filteredCourts.length === 0) {
    list.innerHTML = `<div class="empty-state"><div class="icon">🎾</div><h3>No courts found</h3><p>Try adjusting your filters.</p></div>`;
    return;
  }

  list.innerHTML = filteredCourts.map(court => {
    const price = court.price_per_hour === 0
      ? `<span class="court-price free">Free</span>`
      : `<span class="court-price">฿${court.price_per_hour}<span style="font-size:0.7rem;color:var(--muted)">/hr</span></span>`;

    const surfaceCls = court.surface === 'Hard' ? 'badge-accent' : court.surface === 'Synthetic' ? 'badge-blue' : 'badge-muted';
    const amenityIcons = court.amenities.slice(0, 4).map(a => {
      const ai = amenityIcon(a);
      return `<span class="amenity">${ai.icon} ${ai.label}</span>`;
    }).join('');

    const mapsUrl = `https://www.google.com/maps?q=${court.lat},${court.lng}`;

    return `
      <div class="court-card" id="card-${court.id}" onclick="selectCourt('${court.id}')">
        <div class="court-card-top">
          <div style="flex:1">
            <div class="court-name">${court.name}</div>
            <div class="court-meta">
              <span class="badge badge-surface">📍 ${court.district}</span>
              <span class="badge ${surfaceCls}">${court.surface}</span>
              ${court.indoor ? '<span class="badge badge-blue">Indoor</span>' : ''}
              ${court.lit ? '<span class="badge badge-muted">💡 Lit</span>' : ''}
            </div>
          </div>
          <div style="text-align:right;flex-shrink:0">
            ${price}
            <div class="court-count-badge" style="margin-top:4px">${court.courts_count} court${court.courts_count > 1 ? 's' : ''}</div>
          </div>
        </div>
        <div class="amenities">${amenityIcons}</div>
        <div class="court-hours">⏰ ${court.hours.open} – ${court.hours.close} · ${court.hours.days}</div>
        <div class="court-rating" style="margin-top:6px">
          <div class="stars">${renderStars(court.rating)}</div>
          <span>${court.rating.toFixed(1)} (${court.reviews_count} reviews)</span>
        </div>
        <div class="court-actions">
          <a href="${mapsUrl}" target="_blank" rel="noopener" class="btn btn-outline btn-sm" onclick="event.stopPropagation()">Get Directions</a>
          <a href="events.html?court=${court.id}" class="btn btn-ghost btn-sm" onclick="event.stopPropagation()">View Events →</a>
        </div>
      </div>
    `;
  }).join('');

  // Hover sync: card → marker
  filteredCourts.forEach(court => {
    const card = document.getElementById('card-' + court.id);
    if (!card) return;
    card.addEventListener('mouseenter', () => {
      const m = markers[court.id];
      if (m) m.setIcon(createMarkerIcon(court.courts_count, true));
    });
    card.addEventListener('mouseleave', () => {
      if (activeCard !== court.id) {
        const m = markers[court.id];
        if (m) m.setIcon(createMarkerIcon(court.courts_count, false));
      }
    });
  });
}

function selectCourt(id) {
  setActiveCard(id);
  const court = courts.find(c => c.id === id);
  if (court && map) {
    map.flyTo([court.lat, court.lng], 15, { duration: 0.8 });
    if (markers[id]) markers[id].openPopup();
  }
}

function setActiveCard(id) {
  // Reset previous
  if (activeCard && markers[activeCard]) {
    const prev = courts.find(c => c.id === activeCard);
    if (prev) markers[activeCard].setIcon(createMarkerIcon(prev.courts_count, false));
    const prevCard = document.getElementById('card-' + activeCard);
    if (prevCard) prevCard.classList.remove('active');
  }
  activeCard = id;
  const court = courts.find(c => c.id === id);
  if (court && markers[id]) markers[id].setIcon(createMarkerIcon(court.courts_count, true));
  const card = document.getElementById('card-' + id);
  if (card) card.classList.add('active');
}

// ── Filters ────────────────────────────────────────────────
function runFilter() {
  const filtered = applyFilters(courts, filterState);
  renderCards(filtered);
  addMarkers(filtered);
}

document.getElementById('f-search').addEventListener('input', e => {
  filterState.search = e.target.value;
  runFilter();
});
document.getElementById('f-district').addEventListener('change', e => {
  filterState.district = e.target.value;
  runFilter();
});
document.getElementById('f-surface').addEventListener('change', e => {
  filterState.surface = e.target.value;
  runFilter();
});

['f-lit','f-indoor','f-free'].forEach(id => {
  document.getElementById(id).addEventListener('click', function() {
    const key = this.dataset.key;
    filterState[key] = !filterState[key];
    this.classList.toggle('active', filterState[key]);
    runFilter();
  });
});

document.getElementById('f-reset').addEventListener('click', () => {
  filterState = { search:'', district:'all', surface:'all', lit:false, indoor:false, free:false };
  document.getElementById('f-search').value = '';
  document.getElementById('f-district').value = 'all';
  document.getElementById('f-surface').value = 'all';
  ['f-lit','f-indoor','f-free'].forEach(id => document.getElementById(id).classList.remove('active'));
  runFilter();
});

// ── Boot ───────────────────────────────────────────────────
initMap();
runFilter();
