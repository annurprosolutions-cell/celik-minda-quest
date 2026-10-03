/* Celik Minda Quest — aliran permainan */
'use strict';
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const STORE_KEY = 'celik-minda-quest-v1';

/* ---------------- Simpanan tempatan ---------------- */
function loadDB() {
  try { const d = JSON.parse(localStorage.getItem(STORE_KEY)); if (d && d.profiles) return d; } catch (e) { }
  return { profiles: {}, active: null, settings: { voice: true, sfx: true, rate: 0.85 } };
}
let DB = loadDB();
function save() { try { localStorage.setItem(STORE_KEY, JSON.stringify(DB)); } catch (e) { toast('Storan penuh — markah tidak dapat disimpan.'); } }
const me = () => DB.profiles[DB.active];

/* ---------------- Utiliti ---------------- */
const overlay = $('#overlay'), hud = $('#hud'), dialogEl = $('#dialog');
let world, backHandler = null, deferredInstall = null;
const pct = (g, m) => m ? Math.round(g / m * 100) : 0;
const starsFor = p => p >= 85 ? 3 : p >= 65 ? 2 : p >= 40 ? 1 : 0;
const starStr = n => '⭐'.repeat(n) + '☆'.repeat(3 - n);
const fmt = n => (Math.round(n * 10) / 10).toString();
function toast(msg) { const t = div('toast', esc(msg)); document.body.append(t); setTimeout(() => t.classList.add('show'), 10); setTimeout(() => { t.classList.remove('show'); setTimeout(() => t.remove(), 400); }, 2600); }
function subjChip(s) { const S = SUBJECTS[s]; return `<span class="chip" style="--c:${S.color}">${S.icon} ${S.name}</span>`; }

function screen(html, cls = '') {
  overlay.className = 'overlay show ' + cls; overlay.innerHTML = html; overlay.scrollTop = 0;
  world.pause(); hud.classList.add('hidden'); Sound.stop(); return overlay;
}
function closeScreen() {
  overlay.className = 'overlay'; overlay.innerHTML = ''; Sound.stop(); backHandler = null;
  hud.classList.remove('hidden'); refreshHUD(); world.resume();
}

/* ---------------- Mula ---------------- */
function init() {
  Sound.configure(DB.settings);
  Sound.onIssue = (lang, kind) => {
    if (kind === 'fallback') toast('Peranti ini tiada suara Melayu Malaysia, jadi guna suara Indonesia buat sementara. Lihat ⚙️ Tetapan untuk cara pasang.');
  };
  world = new World($('#world'), {
    onNear: z => {
      const b = $('#actBtn');
      if (!z) { b.classList.add('hidden'); return; }
      b.textContent = z.kind === 'door' ? `🚪 Masuk Rumah ${z.age} Tahun` : `💬 Cakap dengan ${z.npc.name}`;
      b.classList.remove('hidden');
    },
    onAct: z => {
      if (z.kind === 'door') { Sound.sfx('open'); openHouse(z.age); }
      else showDialog(z.npc, z.npc.lines);
    },
    badges: () => {
      const p = me(); if (!p) return {};
      const out = {};
      [5, 6].forEach(a => { out[a] = { crown: !!p.boss[a], stars: SETS[a].reduce((s, set) => s + starsFor(p.best[set.id] ?? -1), 0) }; });
      return out;
    },
  });
  setupHUD(); setupJoystick(); setupInstall(); registerSW();
  document.addEventListener('pointerdown', () => Sound.unlock(), { once: true });
  history.pushState({ cmq: 1 }, '');
  window.addEventListener('popstate', () => { if (backHandler) backHandler(); history.pushState({ cmq: 1 }, ''); });
  showTitle();
}

/* ---------------- Skrin tajuk ---------------- */
function showTitle() {
  const profs = Object.values(DB.profiles).sort((a, b) => (b.last || 0) - (a.last || 0));
  screen(`
    <div class="title-wrap">
      <div class="title-card">
        <div class="logo"><span>📚</span><span>🏡</span><span>🐲</span></div>
        <h1>Celik Minda <em>Quest</em></h1>
        <p class="lead">Pengembaraan belajar untuk murid PASTI 5 &amp; 6 tahun.<br>Belajar dulu, kemudian jawab kuiz dan kalahkan Raksasa Lupa!</p>
        <div class="profiles">${profs.map(p => `
          <button class="prof" data-id="${p.id}"><canvas width="64" height="72" data-look='${esc(JSON.stringify(p.look))}'></canvas>
            <span><b>${esc(p.name)}</b><small>Sambung pengembaraan ➜</small></span></button>`).join('')}
        </div>
        <button class="btn big primary" data-act="new">➕ Pemain Baru</button>
        <button class="btn ghost install-btn ${deferredInstall || isIOS() ? '' : 'hidden'}" data-act="install">📲 Pasang Aplikasi</button>
        <p class="tiny">Markah disimpan dalam peranti ini sahaja. Berfungsi tanpa internet selepas dipasang.</p>
      </div>
    </div>`, 'title');
  $$('.prof canvas', overlay).forEach(c => { const g = c.getContext('2d'); drawAvatar(g, 32, 70, 0.95, JSON.parse(c.dataset.look), 'down'); });
  overlay.onclick = e => {
    const pr = e.target.closest('.prof');
    if (pr) { DB.active = pr.dataset.id; me().last = Date.now(); save(); enterWorld(false); return; }
    const a = e.target.closest('[data-act]')?.dataset.act;
    if (a === 'new') showCreator();
    if (a === 'install') doInstall();
  };
  backHandler = null;
}

/* ---------------- Pencipta watak ---------------- */
function showCreator(edit = false) {
  const p = edit ? me() : null;
  const st = {
    name: p ? p.name : '',
    gender: p ? p.look.gender : 'L',
    looks: { L: JSON.parse(JSON.stringify(DEFAULT_LOOK.L)), P: JSON.parse(JSON.stringify(DEFAULT_LOOK.P)) },
  };
  if (p) st.looks[p.look.gender] = JSON.parse(JSON.stringify(p.look));
  screen(`
    <div class="creator">
      <div class="cr-head"><button class="btn icon" data-act="back">⬅</button><h2>${edit ? 'Ubah Watak' : 'Cipta Watak Kamu'}</h2></div>
      <div class="cr-body">
        <div class="cr-preview"><canvas id="crCanvas" width="240" height="280"></canvas><div class="cr-name" id="crName"></div>
          <div class="cr-rot"><button data-rot="left">⟲</button><button data-rot="right">⟳</button></div></div>
        <div class="cr-opts" id="crOpts"></div>
      </div>
      <div class="cr-foot"><button class="btn big primary" data-act="done">${edit ? '💾 Simpan' : 'Mula Mengembara ➜'}</button></div>
    </div>`, 'solid');
  const dirs = ['down', 'left', 'up', 'right']; let di = 0, phase = 0;
  const cv = $('#crCanvas'), g = cv.getContext('2d');
  (function anim() {
    if (!cv.isConnected) return;
    phase += 0.12; g.clearRect(0, 0, cv.width, cv.height);
    g.fillStyle = '#c8ecb4'; g.beginPath(); g.ellipse(120, 252, 80, 18, 0, 0, 7); g.fill();
    drawAvatar(g, 120, 250, 3.1, st.looks[st.gender], dirs[di], phase, true);
    requestAnimationFrame(anim);
  })();
  const sw = (key, arr, sub = null) => `<div class="swatches">${arr.map(c => {
    const look = st.looks[st.gender]; const cur = sub ? look[sub]?.[key] : look[key];
    return `<button class="sw ${cur === c ? 'on' : ''}" style="background:${c}" data-k="${key}" data-v="${c}" aria-label="${c}"></button>`;
  }).join('')}</div>`;
  const choice = (key, arr) => `<div class="choices">${arr.map(([v, l]) => `<button class="ch ${st.looks[st.gender][key] === v ? 'on' : ''}" data-k="${key}" data-v="${v}">${l}</button>`).join('')}</div>`;
  const tog = (key, label) => `<button class="ch ${st.looks[st.gender].acc?.[key] ? 'on' : ''}" data-acc="${key}">${label}</button>`;
  function renderOpts() {
    const L = st.gender === 'L';
    $('#crOpts').innerHTML = `
      <label class="lbl">Nama</label>
      <input id="crInput" class="txtin" maxlength="14" placeholder="Tulis nama kamu" value="${esc(st.name)}" autocomplete="off">
      <label class="lbl">Jantina</label>
      <div class="choices big"><button class="ch ${L ? 'on' : ''}" data-g="L">👦 Lelaki</button><button class="ch ${!L ? 'on' : ''}" data-g="P">🧕 Perempuan</button></div>
      <label class="lbl">Warna kulit</label>${sw('skin', AVATAR_OPTS.skin)}
      ${L ? `<label class="lbl">Gaya rambut</label>${choice('hairStyle', AVATAR_OPTS.hairStyle)}
             <label class="lbl">Warna rambut</label>${sw('hairColor', AVATAR_OPTS.hairColor)}`
        : `<label class="lbl">Gaya hijab <small>(murid perempuan wajib berhijab)</small></label>${choice('hijabStyle', AVATAR_OPTS.hijabStyle)}
             <label class="lbl">Warna hijab</label>${sw('hijabColor', AVATAR_OPTS.hijabColor)}`}
      <label class="lbl">${L ? 'Warna baju' : 'Warna baju kurung'}</label>${sw('shirt', AVATAR_OPTS.shirt)}
      <label class="lbl">${L ? 'Warna seluar' : 'Warna kain'}</label>${sw('bottom', AVATAR_OPTS.bottom)}
      <label class="lbl">Aksesori</label>
      <div class="choices">${L ? tog('kopiah', '🧢 Kopiah') : tog('bros', '📍 Kerongsang')}${tog('glasses', '👓 Cermin mata')}${tog('bag', '🎒 Beg galas')}</div>`;
    $('#crName').textContent = st.name || 'Nama';
    $('#crInput').addEventListener('input', e => { st.name = e.target.value; $('#crName').textContent = st.name || 'Nama'; });
  }
  renderOpts();
  overlay.onclick = e => {
    const t = e.target;
    if (t.dataset.rot) { di = (di + (t.dataset.rot === 'left' ? 3 : 1)) % 4; return; }
    if (t.dataset.g) { st.gender = t.dataset.g; Sound.sfx('tap'); renderOpts(); return; }
    if (t.dataset.k) { st.looks[st.gender][t.dataset.k] = t.dataset.v; Sound.sfx('tap'); renderOpts(); return; }
    if (t.dataset.acc) { const a = st.looks[st.gender].acc = st.looks[st.gender].acc || {}; a[t.dataset.acc] = !a[t.dataset.acc]; Sound.sfx('tap'); renderOpts(); return; }
    const act = t.closest('[data-act]')?.dataset.act;
    if (act === 'back') edit ? closeScreen() : showTitle();
    if (act === 'done') {
      const name = st.name.trim(); if (!name) { toast('Tulis nama kamu dahulu 😊'); $('#crInput').focus(); return; }
      const look = st.looks[st.gender];
      if (edit) { p.name = name; p.look = look; save(); world.setPlayer(look, name); closeScreen(); toast('Watak disimpan!'); return; }
      const id = 'p' + Date.now().toString(36);
      DB.profiles[id] = { id, name, look, created: Date.now(), last: Date.now(), lessons: {}, results: [], best: {}, boss: {} };
      DB.active = id; save(); enterWorld(true);
    }
  };
  backHandler = () => edit ? closeScreen() : showTitle();
}

function enterWorld(first) {
  const p = me(); world.setPlayer(p.look, p.name);
  closeScreen();
  if (first) setTimeout(() => showDialog(NPCS[0], [`Assalamualaikum ${p.name}!`, ...NPCS[0].lines.slice(1)]), 400);
}

/* ---------------- HUD & kawalan ---------------- */
function setupHUD() {
  hud.addEventListener('click', e => {
    const h = e.target.closest('[data-h]')?.dataset.h; if (!h) return;
    Sound.sfx('tap');
    if (h === 'rekod') openRecords();
    if (h === 'settings') openSettings();
    if (h === 'install') doInstall();
    if (h === 'title') showTitle();
  });
  $('#actBtn').addEventListener('click', () => world.interact());
}
function refreshHUD() {
  const p = me(); if (!p) return;
  $('#meName').textContent = p.name;
  const stars = [5, 6].reduce((s, a) => s + SETS[a].reduce((x, set) => x + starsFor(p.best[set.id] ?? -1), 0), 0);
  $('#meStars').textContent = `⭐ ${stars}  ·  👑 ${Object.values(p.boss).filter(Boolean).length}`;
  const c = $('#meAv'), g = c.getContext('2d'); g.clearRect(0, 0, c.width, c.height);
  g.save(); g.beginPath(); g.arc(24, 24, 24, 0, 7); g.clip(); g.fillStyle = '#fff3e0'; g.fillRect(0, 0, 48, 48);
  drawAvatar(g, 24, 86, 1.25, p.look, 'down'); g.restore();
}
function setupJoystick() {
  const joy = $('#joy'), knob = joy.querySelector('.knob'); let id = null, cx = 0, cy = 0;
  joy.addEventListener('pointerdown', e => { id = e.pointerId; const r = joy.getBoundingClientRect(); cx = r.left + r.width / 2; cy = r.top + r.height / 2; joy.setPointerCapture(id); move(e); });
  const move = e => {
    if (e.pointerId !== id) return;
    let dx = e.clientX - cx, dy = e.clientY - cy; const d = Math.hypot(dx, dy), R = 44;
    if (d > R) { dx = dx / d * R; dy = dy / d * R; }
    knob.style.transform = `translate(${dx}px, ${dy}px)`; world.joy = { x: dx / R, y: dy / R };
  };
  joy.addEventListener('pointermove', move);
  const end = () => { id = null; knob.style.transform = ''; world.joy = { x: 0, y: 0 }; };
  joy.addEventListener('pointerup', end); joy.addEventListener('pointercancel', end);
}

/* ---------------- Dialog NPC ---------------- */
function showDialog(npc, lines, done) {
  world.pause(); let i = 0;
  dialogEl.innerHTML = `<div class="dlg"><canvas width="90" height="100"></canvas><div class="dlg-body"><b>${esc(npc.name)}</b><p></p>
    <div class="dlg-btns"><button class="btn icon" data-d="say">🔊</button><button class="btn primary" data-d="next">Seterusnya ➜</button></div></div></div>`;
  dialogEl.classList.add('show');
  const g = dialogEl.querySelector('canvas').getContext('2d'); drawAvatar(g, 45, 150, 2.2, npc.look, 'down');
  const show = () => { dialogEl.querySelector('p').textContent = lines[i]; Sound.speak(lines[i], 'ms'); dialogEl.querySelector('[data-d=next]').textContent = i < lines.length - 1 ? 'Seterusnya ➜' : 'Baik! 👍'; };
  show();
  const close = () => { dialogEl.classList.remove('show'); dialogEl.innerHTML = ''; dialogEl.onclick = null; Sound.stop(); backHandler = null; world.resume(); done?.(); };
  dialogEl.onclick = e => {
    const d = e.target.closest('[data-d]')?.dataset.d;
    if (d === 'say') Sound.speak(lines[i], 'ms');
    if (d === 'next') { Sound.sfx('tap'); if (++i < lines.length) show(); else close(); }
  };
  backHandler = close;
}

/* ---------------- Rumah ---------------- */
function houseState(age) {
  const p = me(); const L = LESSONS[age];
  const learned = L.filter(l => p.lessons[age + ':' + l.id]).length;
  const setsDone = SETS[age].filter(s => p.best[s.id] != null).length;
  return { learned, total: L.length, allLearned: learned === L.length, setsDone, bossOpen: learned === L.length && setsDone >= 1 };
}
function openHouse(age, tab = 'belajar') {
  const p = me(), hs = houseState(age);
  const tabs = [['belajar', '📖 Belajar'], ['kuiz', '📝 Kuiz'], ['bos', '🐲 Bos'], ['rujukan', '📚 Rujukan'], ['rekod', '📊 Rekod']];
  screen(`
    <div class="house h${age}">
      <div class="h-head"><button class="btn icon" data-act="out">⬅</button>
        <div><h2>🏠 Rumah ${age} Tahun</h2><small>Belajar ${hs.learned}/${hs.total} · Set selesai ${hs.setsDone}/${SETS[age].length}${p.boss[age] ? ' · 👑 Bos dikalahkan' : ''}</small></div></div>
      <div class="tabs">${tabs.map(([k, l]) => `<button class="tab ${k === tab ? 'on' : ''}" data-tab="${k}">${l}</button>`).join('')}</div>
      <div class="h-body" id="hBody"></div>
    </div>`, 'solid');
  const body = $('#hBody');
  const L = LESSONS[age];
  if (tab === 'belajar') {
    body.innerHTML = `<div class="step"><b>Langkah 1:</b> Belajar semua modul. Tekan kad untuk dengar sebutan, kemudian lulus <b>Uji Faham</b>.</div>
      <div class="bar"><i style="width:${pct(hs.learned, hs.total)}%"></i></div>
      <div class="grid">${L.map(l => { const done = p.lessons[age + ':' + l.id]; const S = SUBJECTS[l.s];
        return `<button class="mod ${done ? 'done' : ''}" style="--c:${S.color}" data-lesson="${l.id}"><span class="mi">${S.icon}</span>
          <span class="mt"><b>${esc(l.title)}</b><small class="${AR_RE.test(l.desc) ? 'ar' : ''}">${esc(l.desc)}</small><em>${S.name} · ${l.cards.length} kad</em></span>
          <span class="ms">${done ? '✅' : '▶'}</span></button>`; }).join('')}</div>`;
  }
  if (tab === 'kuiz') {
    if (!hs.allLearned) body.innerHTML = lockBox('🔒 Kuiz masih berkunci', `Ilmu mesti penuh dahulu! Selesaikan semua modul pembelajaran (${hs.learned}/${hs.total}).`, 'belajar', '📖 Pergi Belajar');
    else {
      const card = s => { const b = p.best[s.id];
        return `<div class="setc ${s.past ? 'past' : ''}"><div class="sn">${esc(s.name)}</div><small>${esc(s.src)}</small><div class="sm">${s.qs.length} soalan · 100 markah</div>
          <div class="sb">${b != null ? `${starStr(starsFor(b))} <b>${b}%</b>` : '<em>Belum dijawab</em>'}</div>
          <button class="btn primary" data-quiz="${s.id}">${b != null ? '🔁 Jawab Lagi' : '▶ Mula'}</button></div>`; };
      body.innerHTML = `<div class="step"><b>Langkah 2:</b> Pilih set soalan. Corak soalan sama seperti kertas ujian sebenar.</div>
        <h3 class="sec">✏️ Set Latihan</h3><div class="grid">${SETS[age].filter(s => !s.past).map(card).join('')}</div>
        <h3 class="sec">📜 Kertas Sebenar Ujian Celik Minda PASTI</h3><div class="grid">${SETS[age].filter(s => s.past).map(card).join('')}</div>`;
    }
  }
  if (tab === 'bos') {
    const name = age === 5 ? 'Raksasa Lupa' : 'Naga Malas', emo = age === 5 ? '👾' : '🐲';
    body.innerHTML = `<div class="bosscard"><div class="bemo">${emo}</div><h3>${name}</h3>
      <p>Bos akhir mengambil soalan daripada semua set (setiap subjek). Jawab dengan betul untuk menyerang. Jika banyak salah, kamu hilang ❤️.</p>
      <ul class="req"><li class="${hs.allLearned ? 'ok' : ''}">Semua modul pembelajaran selesai (${hs.learned}/${hs.total})</li>
        <li class="${hs.setsDone >= 1 ? 'ok' : ''}">Sekurang-kurangnya 1 set kuiz dijawab (${hs.setsDone})</li></ul>
      ${hs.bossOpen ? `<button class="btn big danger" data-boss="${age}">⚔️ Lawan ${name}!</button>` : '<button class="btn big" disabled>🔒 Belum dibuka</button>'}
      ${p.boss[age] ? '<p class="win">👑 Kamu pernah mengalahkan bos ini!</p>' : ''}</div>`;
  }
  if (tab === 'rujukan') {
    body.innerHTML = `<div class="step">📚 Bilik rujukan: lihat semua soalan bersama jawapan. Rujukan setiap set dibuka selepas set itu dijawab sekali.</div>
      <div class="grid">${SETS[age].map(s => { const open = p.best[s.id] != null;
        return `<div class="setc"><div class="sn">${esc(s.name)}</div><small>${esc(s.src)}</small>
          <button class="btn ${open ? 'primary' : ''}" ${open ? `data-ref="${s.id}"` : 'disabled'}>${open ? '👁 Lihat Soalan & Jawapan' : '🔒 Jawab dahulu'}</button></div>`; }).join('')}</div>
`;
  }
  if (tab === 'rekod') body.innerHTML = recordsHTML(p.results.filter(r => r.age === age), age);

  overlay.onclick = e => {
    const t = e.target.closest('button'); if (!t) return;
    if (t.dataset.act === 'out') { closeScreen(); world.placeAtDoor(age); return; }
    if (t.dataset.tab) { Sound.sfx('tap'); openHouse(age, t.dataset.tab); return; }
    if (t.dataset.go) { openHouse(age, t.dataset.go); return; }
    if (t.dataset.lesson) { openLesson(age, t.dataset.lesson); return; }
    if (t.dataset.quiz) { startQuiz(age, SETS[age].find(s => s.id === t.dataset.quiz)); return; }
    if (t.dataset.boss) { startBoss(age); return; }
    if (t.dataset.ref) { openReference(age, SETS[age].find(s => s.id === t.dataset.ref)); return; }
    if (t.dataset.study) { openLesson(age, t.dataset.study); return; }
  };
  backHandler = () => { closeScreen(); world.placeAtDoor(age); };
}
function lockBox(title, msg, go, label) {
  return `<div class="lock"><div class="lk">🔒</div><h3>${title}</h3><p>${msg}</p><button class="btn primary" data-go="${go}">${label}</button></div>`;
}

/* ---------------- Pembelajaran ---------------- */
function openLesson(age, id) {
  const les = LESSONS[age].find(l => l.id === id), S = SUBJECTS[les.s];
  let idx = 0; const seen = new Set();
  const lang = c => c.lang || (les.s === 'BI' ? 'en' : les.s === 'BA' ? 'ar' : 'ms');
  screen(`<div class="lesson" style="--c:${S.color}">
    <div class="q-head"><button class="btn icon" data-act="back">⬅</button><div class="qh-mid"><b>${esc(les.title)}</b><small>${S.icon} ${S.name}</small></div><span></span></div>
    <div class="l-body" id="lBody"></div></div>`, 'solid');
  const body = $('#lBody');
  function showCard() {
    const c = les.cards[idx]; seen.add(idx);
    body.innerHTML = `<div class="lcard"><div class="lvis"></div><div class="lt ${AR_RE.test(c.t) ? 'ar' : ''}">${esc(c.t)}</div>${c.s ? `<div class="ls">${esc(c.s)}</div>` : ''}
        <button class="btn icon big" data-act="say">🔊</button></div>
      <div class="lnav"><button class="btn" data-act="prev" ${idx === 0 ? 'disabled' : ''}>◀</button>
        <div class="dots">${les.cards.map((_, i) => `<i class="${i === idx ? 'cur' : seen.has(i) ? 'seen' : ''}"></i>`).join('')}</div>
        <button class="btn" data-act="next" ${idx === les.cards.length - 1 ? 'disabled' : ''}>▶</button></div>
      <div class="lfoot">${seen.size === les.cards.length ? '<button class="btn big primary" data-act="test">✅ Uji Faham</button>' : `<small>Lihat semua kad untuk buka Uji Faham (${seen.size}/${les.cards.length})</small>`}</div>`;
    const vis = renderItem(c.v, 'big'); vis.addEventListener('click', () => Sound.speak(c.say, lang(c))); body.querySelector('.lvis').append(vis);
    Sound.speak(c.say, lang(c));
  }
  let round = 0, tries = 0;
  function showTest() {
    const pool = les.cards.filter((c, i, a) => a.findIndex(x => x.t === c.t) === i);
    const ans = pool[Math.floor(Math.random() * pool.length)];
    const opts = shuffle([ans, ...shuffle(pool.filter(c => c !== ans && JSON.stringify(c.v) !== JSON.stringify(ans.v))).slice(0, 2)]);
    body.innerHTML = `<div class="ltest"><div class="lprog">Uji Faham ${round + 1}/3</div>
      <p>Dengar dan pilih yang betul:</p><div class="lt ${AR_RE.test(ans.t) ? 'ar' : ''}">${esc(ans.t)}</div>
      <button class="btn icon big" data-act="tsay">🔊</button><div class="topts"></div></div>`;
    const box = body.querySelector('.topts');
    opts.forEach(o => {
      const el = renderItem(o.v, 'opt big'); box.append(el);
      el.addEventListener('click', () => {
        if (o === ans) {
          el.classList.add('ok'); Sound.sfx('good'); round++;
          setTimeout(() => { if (round >= 3) finishLesson(); else showTest(); }, 700);
        } else { el.classList.add('bad', 'shake'); tries++; Sound.sfx('bad'); setTimeout(() => el.classList.remove('shake'), 500); }
      });
    });
    body.querySelector('[data-act=tsay]').onclick = () => Sound.speak(ans.say, lang(ans));
    Sound.speak(ans.say, lang(ans));
  }
  function finishLesson() {
    const p = me(); p.lessons[age + ':' + id] = true; save(); Sound.sfx('win');
    const hs = houseState(age);
    body.innerHTML = `<div class="lock done"><div class="lk">🎉</div><h3>Tahniah! Modul selesai.</h3>
      <p>${hs.allLearned ? 'Semua modul sudah selesai. Ilmu kamu sudah penuh, jadi pintu kuiz kini terbuka! 🔓' : `Lagi ${hs.total - hs.learned} modul untuk buka kuiz.`}</p>
      <button class="btn big primary" data-act="house">${hs.allLearned ? '📝 Pergi ke Kuiz' : '📖 Modul Seterusnya'}</button></div>`;
  }
  showCard();
  overlay.onclick = e => {
    const a = e.target.closest('[data-act]')?.dataset.act;
    if (a === 'back') openHouse(age, 'belajar');
    if (a === 'say') { const c = les.cards[idx]; Sound.speak(c.say, lang(c)); }
    if (a === 'prev' && idx > 0) { idx--; showCard(); }
    if (a === 'next' && idx < les.cards.length - 1) { idx++; Sound.sfx('tap'); showCard(); }
    if (a === 'test') { round = 0; showTest(); }
    if (a === 'house') openHouse(age, houseState(age).allLearned ? 'kuiz' : 'belajar');
  };
  backHandler = () => openHouse(age, 'belajar');
}

/* ---------------- Kuiz & Bos ---------------- */
function startQuiz(age, set) { runQuiz({ age, set, qs: set.qs, mode: 'quiz', title: set.name }); }
function startBoss(age) {
  const all = SETS[age].flatMap(s => s.qs.map(q => ({ q, set: s })));
  const picked = [];
  Object.keys(SUBJECTS).forEach(sub => { const c = shuffle(all.filter(x => x.q.s === sub))[0]; if (c) picked.push(c); });
  shuffle(all.filter(x => !picked.includes(x))).slice(0, 2).forEach(x => picked.push(x));
  runQuiz({ age, set: { id: 'BOSS-' + age, name: age === 5 ? 'Raksasa Lupa' : 'Naga Malas' }, qs: shuffle(picked).map(x => x.q), mode: 'boss', title: 'Lawan Bos' });
}

function runQuiz(cfg) {
  const { age, qs, mode } = cfg; const boss = mode === 'boss';
  let i = 0; const res = []; let bossHP = 100, hearts = 3, over = false;
  const bname = cfg.set.name, bemo = age === 5 ? '👾' : '🐲';
  screen(`<div class="quiz ${boss ? 'boss' : ''}">
    <div class="q-head"><button class="btn icon" data-act="quit">✖</button>
      <div class="qh-mid"><b>${esc(cfg.title)}${boss ? '' : ' · ' + age + ' Tahun'}</b><div class="bar"><i id="qProg"></i></div></div><span id="qScore" class="qscore">0</span></div>
    ${boss ? `<div class="arena"><div class="boss-emo" id="bossEmo">${bemo}</div><div class="boss-info"><b>${esc(bname)}</b>
      <div class="hp"><i id="bossHP" style="width:100%"></i></div><div id="hearts" class="hearts">❤️❤️❤️</div></div></div>` : ''}
    <div class="q-card" id="qCard"></div>
    <div class="q-foot" id="qFoot"></div></div>`, 'solid');
  const card = $('#qCard'), foot = $('#qFoot');
  let ctrl, ctx;
  function show() {
    const q = qs[i]; ctx = { locked: false };
    const S = SUBJECTS[q.s];
    $('#qProg').style.width = pct(i, qs.length) + '%';
    card.innerHTML = `<div class="qmeta">${subjChip(q.s)}<span>Soalan ${i + 1}/${qs.length} · ${questionMarks(q)} markah</span></div>
      <div class="qtitle"><span>${i + 1}. ${esc(q.title)}</span><button class="btn icon sm" data-act="readq">🔊</button></div>
      ${q.jawi ? `<div class="jawi-title ar">${esc(q.jawi)}</div>` : ''}${q.ar ? `<div class="jawi-title ar tappable" data-act="readar">${esc(q.ar)}</div>` : ''}
      ${q.sub ? `<div class="qsub">${esc(q.sub)}</div>` : ''}
      ${q.words ? `<div class="wordlist">${q.words.map((w, k) => `<span class="wl ar" data-w="${k}">${esc(w.t)}</span>`).join('')}</div>` : ''}
      <div class="qbody"></div>`;
    card.style.setProperty('--c', S.color);
    ctrl = renderQuestion(q, card.querySelector('.qbody'), ctx);
    foot.innerHTML = `<button class="btn big primary" data-act="check">✔ Semak</button>`;
    card.scrollTop = 0; overlay.scrollTop = 0;
    readTitle(q);
  }
  // Soalan berbahagian bertajuk nama subjek dalam BM ("Bahasa Inggeris"), jadi hanya soalan BI tunggal dibaca dalam English
  function readTitle(q) { Sound.speak(q.title, q.s === 'BI' && !q.parts ? 'en' : 'ms'); }
  function check() {
    ctx.locked = true; const r = ctrl.check(); const q = qs[i];
    res.push({ q, got: r.got, max: r.max });
    const ratio = r.max ? r.got / r.max : 0;
    $('#qScore').textContent = fmt(res.reduce((a, x) => a + x.got, 0));
    const msg = ratio === 1 ? ['🌟 Hebat! Semua betul!', 'good'] : ratio >= 0.6 ? ['👍 Bagus! Hampir semua betul.', 'mid'] : ['💪 Tidak mengapa, cuba fahamkan jawapannya.', 'low'];
    Sound.sfx(ratio >= 0.6 ? 'good' : 'bad');
    Sound.speak(ratio === 1 ? 'Hebat!' : ratio >= 0.6 ? 'Bagus!' : 'Cuba lagi ya', 'ms');
    foot.innerHTML = `<div class="verdict ${msg[1]}"><b>${fmt(r.got)}/${r.max}</b> ${msg[0]}</div>
      <div class="vbtns"><button class="btn" data-act="solve">👁 Lihat Jawapan</button><button class="btn big primary" data-act="next">${i < qs.length - 1 ? 'Seterusnya ➜' : 'Lihat Keputusan 🏁'}</button></div>`;
    if (boss) bossTurn(ratio);
  }
  function bossTurn(ratio) {
    const emo = $('#bossEmo');
    const dmg = Math.round(ratio * 18);
    if (dmg > 0) {
      bossHP = Math.max(0, bossHP - dmg); Sound.sfx('hit');
      emo.classList.remove('hit'); void emo.offsetWidth; emo.classList.add('hit');
      const f = div('dmg', '-' + dmg); $('.arena').append(f); setTimeout(() => f.remove(), 1000);
      $('#bossHP').style.width = bossHP + '%';
    }
    if (ratio < 0.5) {
      hearts--; Sound.sfx('hurt'); overlay.classList.add('shake'); setTimeout(() => overlay.classList.remove('shake'), 500);
      $('#hearts').textContent = '❤️'.repeat(Math.max(0, hearts)) + '🖤'.repeat(3 - Math.max(0, hearts));
    }
    if (bossHP <= 0 || hearts <= 0) {
      over = true;
      $('[data-act=next]', foot).textContent = 'Lihat Keputusan 🏁';
      if (bossHP <= 0) { emo.classList.add('dead'); toast(`🎉 ${bname} tewas!`); }
    }
  }
  function finish() {
    const p = me();
    const bySub = {};
    res.forEach(r => { bySub[r.q.s] = bySub[r.q.s] || [0, 0]; bySub[r.q.s][0] += r.got; bySub[r.q.s][1] += r.max; });
    const got = res.reduce((a, r) => a + r.got, 0), max = res.reduce((a, r) => a + r.max, 0);
    const P = pct(got, max);
    const rec = { id: Date.now(), age, setId: cfg.set.id, setName: cfg.set.name, mode, date: new Date().toISOString(), got: Math.round(got * 10) / 10, max, pct: P, bySub,
      wrong: res.filter(r => r.got < r.max).map(r => ({ s: r.q.s, title: r.q.title, got: r.got, max: r.max })) };
    let bossWin = false;
    if (boss) { bossWin = bossHP <= 0; rec.bossWin = bossWin; if (bossWin) p.boss[age] = true; }
    else p.best[cfg.set.id] = Math.max(p.best[cfg.set.id] ?? 0, P);
    p.results.push(rec); if (p.results.length > 200) p.results.shift();
    save(); showResult(rec, cfg);
  }
  show();
  overlay.onclick = e => {
    const a = e.target.closest('[data-act]')?.dataset.act;
    const w = e.target.closest('[data-w]'); if (w) { const it = qs[i].words[+w.dataset.w]; speakItem(it, 'JW'); }
    if (a === 'readq') readTitle(qs[i]);
    if (a === 'readar') Sound.speak(qs[i].ar, 'ar');
    if (a === 'check') check();
    if (a === 'solve') { ctrl.solve(); e.target.closest('button').disabled = true; }
    if (a === 'next') { if (over || i >= qs.length - 1) finish(); else { i++; Sound.sfx('tap'); show(); } }
    if (a === 'quit' && confirm('Keluar? Markah kuiz ini tidak akan disimpan.')) openHouse(age, boss ? 'bos' : 'kuiz');
  };
  backHandler = () => { if (confirm('Keluar? Markah kuiz ini tidak akan disimpan.')) openHouse(age, boss ? 'bos' : 'kuiz'); };
}

/* ---------------- Keputusan & analisis ---------------- */
function analysisHTML(bySub, age) {
  const rows = Object.entries(bySub).map(([s, [g, m]]) => ({ s, g, m, p: pct(g, m) })).sort((a, b) => a.p - b.p);
  if (!rows.length) return '';
  const weak = rows.filter(r => r.p < 80);
  const bars = Object.keys(SUBJECTS).filter(s => bySub[s]).map(s => {
    const [g, m] = bySub[s], P = pct(g, m), S = SUBJECTS[s];
    return `<div class="sbar"><span class="sl">${S.icon} ${S.name}</span><div class="bar"><i style="width:${P}%;background:${S.color}"></i></div><span class="sp">${fmt(g)}/${m} · ${P}%</span></div>`;
  }).join('');
  const tips = weak.length ? `<div class="weak"><h4>🎯 Perlu diulang kaji</h4>${weak.map(r => {
    const S = SUBJECTS[r.s]; const mods = LESSONS[age].filter(l => l.s === r.s);
    return `<div class="wk"><b>${S.icon} ${S.name} (${r.p}%)</b><div>${mods.map(m => `<button class="btn sm" data-study="${m.id}" data-age="${age}">📖 ${esc(m.title)}</button>`).join('')}</div></div>`;
  }).join('')}</div>` : `<div class="weak good"><h4>🏆 Cemerlang!</h4><p>Semua subjek 80% ke atas. Teruskan!</p></div>`;
  return `<div class="analysis"><h4>📊 Prestasi ikut subjek</h4>${bars}</div>${tips}`;
}
function showResult(rec, cfg) {
  const s = starsFor(rec.pct); const boss = rec.mode === 'boss';
  const head = boss ? (rec.bossWin ? `<div class="big-emo">🏆</div><h2>Bos tewas! Kamu menang!</h2>` : `<div class="big-emo">😤</div><h2>Bos masih kuat… Ulang kaji dan cuba lagi!</h2>`)
    : `<div class="stars">${starStr(s)}</div><h2>${s === 3 ? 'Cemerlang!' : s === 2 ? 'Bagus!' : s === 1 ? 'Boleh lagi!' : 'Jangan putus asa!'}</h2>`;
  screen(`<div class="result">
    <div class="r-top">${head}<div class="score"><b>${fmt(rec.got)}</b><span>/ ${rec.max}</span></div><div class="rp">${rec.pct}% · ${esc(rec.setName)} · ${rec.age} Tahun</div></div>
    ${analysisHTML(rec.bySub, rec.age)}
    ${rec.wrong.length ? `<div class="wrong"><h4>📝 Soalan yang belum sempurna</h4>${rec.wrong.map(w => `<div class="wr">${subjChip(w.s)} <span>${esc(w.title)}</span><b>${fmt(w.got)}/${w.max}</b></div>`).join('')}</div>` : ''}
    <div class="r-btns"><button class="btn big primary" data-act="again">🔁 Cuba Lagi</button><button class="btn big" data-act="house">🏠 Kembali ke Rumah</button></div></div>`, 'solid');
  if (s >= 2 || rec.bossWin) { Sound.sfx('win'); confetti(); }
  Sound.speak(boss ? (rec.bossWin ? 'Tahniah! Bos sudah tewas!' : 'Cuba lagi ya!') : `Markah kamu ${Math.round(rec.got)} daripada ${rec.max}`, 'ms');
  overlay.onclick = e => {
    const t = e.target.closest('button'); if (!t) return;
    if (t.dataset.study) { openLesson(rec.age, t.dataset.study); return; }
    if (t.dataset.act === 'again') boss ? startBoss(rec.age) : startQuiz(rec.age, cfg.set);
    if (t.dataset.act === 'house') openHouse(rec.age, boss ? 'bos' : 'kuiz');
  };
  backHandler = () => openHouse(rec.age, 'kuiz');
}
function confetti() {
  const box = div('confetti'); document.body.append(box);
  for (let i = 0; i < 60; i++) { const c = document.createElement('i'); c.style.left = Math.random() * 100 + '%'; c.style.background = ['#ff7a59', '#ffd54f', '#4fc3f7', '#81c784', '#ba68c8'][i % 5]; c.style.animationDelay = Math.random() * 0.6 + 's'; c.style.transform = `rotate(${Math.random() * 360}deg)`; box.append(c); }
  setTimeout(() => box.remove(), 3200);
}

/* ---------------- Rekod ---------------- */
function recordsHTML(records, age) {
  if (!records.length) return `<div class="lock"><div class="lk">📊</div><h3>Belum ada rekod</h3><p>Jawab kuiz dahulu. Markah dan analisis kelemahan akan dipaparkan di sini.</p></div>`;
  const agg = {};
  records.forEach(r => Object.entries(r.bySub).forEach(([s, [g, m]]) => { agg[s] = agg[s] || [0, 0]; agg[s][0] += g; agg[s][1] += m; }));
  const hist = records.slice().reverse().slice(0, 30).map(r => `<div class="hr"><span>${new Date(r.date).toLocaleDateString('ms-MY', { day: 'numeric', month: 'short' })} ${new Date(r.date).toLocaleTimeString('ms-MY', { hour: '2-digit', minute: '2-digit' })}</span>
      <b>${esc(r.setName)}${r.mode === 'boss' ? (r.bossWin ? ' 👑' : ' ⚔️') : ''}</b><span>${fmt(r.got)}/${r.max}</span><span>${starStr(starsFor(r.pct))}</span></div>`).join('');
  return `<div class="step">Analisis keseluruhan berdasarkan ${records.length} percubaan${age ? '' : ' (5 & 6 Tahun)'}.</div>
    ${analysisHTML(agg, age || records[records.length - 1].age)}<div class="hist"><h4>🕑 Sejarah</h4>${hist}</div>`;
}
function openRecords() {
  const p = me();
  screen(`<div class="house"><div class="h-head"><button class="btn icon" data-act="out">⬅</button><div><h2>📊 Rekod ${esc(p.name)}</h2><small>Disimpan dalam peranti ini</small></div></div>
    <div class="tabs"><button class="tab on" data-r="5">5 Tahun</button><button class="tab" data-r="6">6 Tahun</button></div><div class="h-body" id="rBody"></div></div>`, 'solid');
  const draw = age => { $('#rBody').innerHTML = recordsHTML(p.results.filter(r => r.age === age), age); $$('.tab', overlay).forEach(t => t.classList.toggle('on', +t.dataset.r === age)); };
  draw(5);
  overlay.onclick = e => {
    const t = e.target.closest('button'); if (!t) return;
    if (t.dataset.act === 'out') closeScreen();
    if (t.dataset.r) draw(+t.dataset.r);
    if (t.dataset.study) openLesson(+t.dataset.age, t.dataset.study);
  };
  backHandler = closeScreen;
}

/* ---------------- Rujukan (soalan + jawapan) ---------------- */
function openReference(age, set) {
  screen(`<div class="quiz ref"><div class="q-head"><button class="btn icon" data-act="back">⬅</button><div class="qh-mid"><b>Rujukan · ${esc(set.name)}</b><small>${esc(set.src)}</small></div><span></span></div>
    <div id="refList"></div></div>`, 'solid');
  const list = $('#refList');
  set.qs.forEach((q, i) => {
    const c = div('q-card'); c.style.setProperty('--c', SUBJECTS[q.s].color);
    c.innerHTML = `<div class="qmeta">${subjChip(q.s)}<span>${questionMarks(q)} markah</span></div><div class="qtitle"><span>${i + 1}. ${esc(q.title)}</span></div>
      ${q.jawi ? `<div class="jawi-title ar">${esc(q.jawi)}</div>` : ''}${q.ar ? `<div class="jawi-title ar">${esc(q.ar)}</div>` : ''}
      ${q.words ? `<div class="wordlist">${q.words.map(w => `<span class="wl ar">${esc(w.t)}</span>`).join('')}</div>` : ''}<div class="qbody"></div>`;
    list.append(c);
    const ctx = { locked: true }; const ctrl = renderQuestion(q, c.querySelector('.qbody'), ctx);
    requestAnimationFrame(() => ctrl.solve());
  });
  overlay.onclick = e => { if (e.target.closest('[data-act=back]')) openHouse(age, 'rujukan'); };
  backHandler = () => openHouse(age, 'rujukan');
}

/* ---------------- Tetapan ---------------- */
function openSettings() {
  const s = DB.settings; const vs = Sound.voiceStatus();
  const LN = { ms: 'Bahasa Melayu (Malaysia)', en: 'English', ar: 'Bahasa Arab' };
  screen(`<div class="house"><div class="h-head"><button class="btn icon" data-act="out">⬅</button><div><h2>⚙️ Tetapan</h2></div></div>
    <div class="h-body settings">
      <label class="row"><span>🔊 Suara sebutan</span><input type="checkbox" data-s="voice" ${s.voice ? 'checked' : ''}></label>
      <label class="row"><span>🎵 Kesan bunyi</span><input type="checkbox" data-s="sfx" ${s.sfx ? 'checked' : ''}></label>
      <label class="row"><span>🐢 Kelajuan suara</span><input type="range" min="0.6" max="1.2" step="0.05" value="${s.rate}" data-s="rate"></label>
      <div class="voices"><h4>Suara dalam peranti ini</h4>${vs.map(v => `<div class="vrow"><span>${LN[v.lang]}</span>
        <b class="${!v.ok ? 'warn' : v.fallback ? 'warn' : 'ok'}">${!v.ok ? '❓ Tiada dalam senarai. Tekan Uji, telefon mungkin masih boleh sebut.' : v.fallback ? '⚠️ Tiada suara Melayu Malaysia. Sementara guna: ' + esc(v.name) : '✅ ' + esc(v.name)}</b>
        <button class="btn sm" data-test="${v.lang}">Uji</button></div>`).join('')}
        <p class="tiny">Suara datang daripada pelayar dan peranti, bukan daripada aplikasi. Untuk suara Melayu Malaysia dan Arab:<br>
          • <b>Komputer:</b> buka guna <b>Microsoft Edge</b>. Edge ada suara Melayu (Malaysia) dan Arab. Chrome di Windows selalunya tiada kedua-duanya.<br>
          • <b>Android:</b> Tetapan → Pertuturan teks (Text-to-speech) → enjin Google → Pasang data suara → muat turun <i>Melayu (Malaysia)</i> dan <i>Arab</i>.<br>
          • <b>iPhone/iPad:</b> Settings → Accessibility → Spoken Content → Voices → muat turun <i>Malay</i> dan <i>Arabic</i>.<br>
          Selepas pasang, tutup dan buka semula aplikasi. Jika suara Melayu Malaysia tiada langsung, aplikasi guna suara Indonesia buat sementara.</p>
        <details class="vlist"><summary>Senarai semua suara dalam peranti (${Sound.voiceList().length})</summary>
          ${Sound.voiceList().map(v => `<div>${esc(v.name)} <small>${esc(v.lang)}</small></div>`).join('') || '<div>Senarai kosong. Pelayar ini tidak menyenaraikan suara, tetapi mungkin masih boleh bercakap.</div>'}</details></div>
      <div class="sbtns"><button class="btn" data-act="edit">🎨 Ubah Watak</button><button class="btn" data-act="switch">👥 Tukar Pemain</button>
        <button class="btn danger" data-act="reset">🗑 Padam Rekod Pemain Ini</button></div>
      <p class="tiny">Celik Minda Quest · PWA luar talian · v1.3</p>
    </div></div>`, 'solid');
  overlay.onchange = e => {
    const k = e.target.dataset.s; if (!k) return;
    s[k] = e.target.type === 'checkbox' ? e.target.checked : +e.target.value; Sound.configure(s); save();
  };
  overlay.onclick = e => {
    const t = e.target.closest('button'); if (!t) return;
    const TEST = { ms: 'Selamat datang ke Celik Minda Quest. Ini huruf h.', en: 'Welcome to Celik Minda Quest.', ar: 'مَرْحَبًا، أَهْلًا وَسَهْلًا' };
    if (t.dataset.test) Sound.speak(TEST[t.dataset.test], t.dataset.test);
    if (t.dataset.act === 'out') { overlay.onchange = null; closeScreen(); }
    if (t.dataset.act === 'edit') { overlay.onchange = null; showCreator(true); }
    if (t.dataset.act === 'switch') { overlay.onchange = null; showTitle(); }
    if (t.dataset.act === 'reset' && confirm('Padam semua markah & kemajuan pemain ini? Tindakan ini tidak boleh dibatalkan.')) {
      const p = me(); Object.assign(p, { lessons: {}, results: [], best: {}, boss: {} }); save(); toast('Rekod dipadam.');
    }
  };
  backHandler = () => { overlay.onchange = null; closeScreen(); };
}

/* ---------------- PWA ---------------- */
function isIOS() { return /iphone|ipad|ipod/i.test(navigator.userAgent) && !window.navigator.standalone; }
function setupInstall() {
  window.addEventListener('beforeinstallprompt', e => { e.preventDefault(); deferredInstall = e; $$('.install-btn').forEach(b => b.classList.remove('hidden')); });
  window.addEventListener('appinstalled', () => { deferredInstall = null; $$('.install-btn').forEach(b => b.classList.add('hidden')); toast('Aplikasi dipasang! 🎉'); });
  if (isIOS()) $$('.install-btn').forEach(b => b.classList.remove('hidden'));
}
async function doInstall() {
  if (deferredInstall) { deferredInstall.prompt(); await deferredInstall.userChoice; deferredInstall = null; return; }
  if (isIOS()) alert('Untuk pasang di iPhone/iPad:\n1. Tekan butang Kongsi (□↑) di Safari\n2. Pilih "Add to Home Screen"');
  else toast('Gunakan menu pelayar → "Pasang aplikasi" / "Add to Home screen".');
}
function registerSW() {
  if (!('serviceWorker' in navigator) || location.protocol === 'file:') return;
  // Bila versi baharu mengambil alih, muat semula sekali supaya pengguna terus dapat kemas kini
  const hadController = !!navigator.serviceWorker.controller; let reloaded = false;
  navigator.serviceWorker.addEventListener('controllerchange', () => { if (hadController && !reloaded) { reloaded = true; location.reload(); } });
  navigator.serviceWorker.register('sw.js').catch(() => { });
}

document.addEventListener('DOMContentLoaded', init);
