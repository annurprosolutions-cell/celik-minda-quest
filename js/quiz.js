/* Enjin soalan — setiap jenis meniru cara menjawab dalam kertas PDF */
'use strict';
const AR_RE = /[؀-ۿݐ-ݿࢠ-ࣿ]/;
const SVGNS = 'http://www.w3.org/2000/svg';
function div(cls, html) { const d = document.createElement('div'); if (cls) d.className = cls; if (html != null) d.innerHTML = html; return d; }
function esc(s) { return String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c])); }
function shuffle(a) { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; }
const norm = v => String(v ?? '').trim().replace(/\s+/g, ' ');

/* ---------- sebutan item ---------- */
function itemSpeech(it, sub) {
  if (!it) return null;
  if (it.say) return [it.say, it.lang || (sub === 'BI' ? 'en' : 'ms')];
  if (it.t != null) {
    if (AR_RE.test(it.t)) { if (it.r) return [it.r, 'ms']; if (sub === 'JW') return null; return [it.t, 'ar']; }
    return [it.t, sub === 'BI' ? 'en' : 'ms'];
  }
  if (it.label && !AR_RE.test(it.label) && sub === 'BI' && !/_/.test(it.label)) return [it.label, 'en'];
  if (it.pp) return [it.pp.map(x => x.w || x.p).join(', '), 'ms'];
  const w = it.w || it.p; return w ? [w, 'ms'] : null;
}
function speakItem(it, sub) { const s = itemSpeech(it, sub); if (s) Sound.speak(s[0], s[1]); }

/* ---------- paparan item ---------- */
function iconHTML(name) {
  const ic = ICON[name] || name;
  return ic.startsWith('<svg') ? `<span class="svgi">${ic}</span>` : `<span class="emo">${ic}</span>`;
}
function clockSVG(hour, hide = []) {
  let s = `<svg viewBox="0 0 100 100" class="clock"><circle cx="50" cy="50" r="46" fill="#fff" stroke="#37474f" stroke-width="4"/>`;
  for (let n = 1; n <= 12; n++) {
    const a = (n / 12) * Math.PI * 2 - Math.PI / 2, x = 50 + Math.cos(a) * 35, y = 50 + Math.sin(a) * 35;
    s += hide.includes(n) ? `<rect x="${x - 7}" y="${y - 7}" width="14" height="14" rx="2" fill="#fff8e1" stroke="#ff7a59" stroke-width="2"/>`
      : `<text x="${x}" y="${y + 4}" text-anchor="middle" font-size="11" font-weight="700" fill="#37474f">${n}</text>`;
  }
  const ha = (hour % 12) / 12 * Math.PI * 2 - Math.PI / 2;
  s += `<line x1="50" y1="50" x2="50" y2="14" stroke="#37474f" stroke-width="3" stroke-linecap="round"/>`;
  s += `<line x1="50" y1="50" x2="${50 + Math.cos(ha) * 23}" y2="${50 + Math.sin(ha) * 23}" stroke="#e53935" stroke-width="5" stroke-linecap="round"/><circle cx="50" cy="50" r="4" fill="#37474f"/></svg>`;
  return s;
}
function trafficSVG() {
  return `<svg viewBox="0 0 60 130" class="traffic"><rect x="8" y="4" width="44" height="100" rx="10" fill="#37474f"/>
    <circle cx="30" cy="24" r="12" fill="#cfd8dc"/><circle cx="30" cy="54" r="12" fill="#cfd8dc"/><circle cx="30" cy="84" r="12" fill="#cfd8dc"/>
    <rect x="26" y="104" width="8" height="24" fill="#546e7a"/></svg>`;
}
function renderItem(it, extra = '') {
  const d = div('it ' + extra);
  if (it.p) { d.classList.add('pic'); d.innerHTML = iconHTML(it.p); }
  else if (it.e) { d.classList.add('pic', 'multi'); d.innerHTML = `<span class="emo"${it.sz ? ` style="font-size:${Math.round(32 * it.sz)}px"` : ''}>${it.e}</span>`; }
  else if (it.pp) { d.classList.add('pic', 'pair'); d.innerHTML = it.pp.map(x => iconHTML(x.p)).join('<i class="sep"></i>'); }
  else if (it.sw) { d.classList.add('pic'); d.innerHTML = `<span class="swatch" style="background:${it.sw}"></span>`; }
  else if (it.clock != null) { d.classList.add('pic', 'clk'); d.innerHTML = clockSVG(it.clock, it.hide || []); }
  else if (it.traffic) { d.classList.add('pic', 'trf'); d.innerHTML = trafficSVG(); }
  else if (it.scene) { d.classList.add('scene'); d.innerHTML = it.scene.map(e => `<span class="emo">${e}</span>`).join(''); }
  else { d.classList.add('txt'); if (AR_RE.test(it.t)) d.classList.add('ar'); if (it.letter) d.classList.add('ltr'); if (String(it.t).length > 14) d.classList.add('long'); d.textContent = it.t; }
  if (it.label) d.insertAdjacentHTML('beforeend', `<small class="${AR_RE.test(it.label) ? 'ar' : ''}">${esc(it.label)}</small>`);
  return d;
}
function speakable(el, it, sub) { el.classList.add('tappable'); el.addEventListener('click', () => speakItem(it, sub)); return el; }

/* ---------- PILIH: bulatkan / tandakan / warnakan ---------- */
function rPick(q, sub, root, ctx) {
  const style = q.style || 'tick';
  const wrap = div('pick ' + (q.layout || ''));
  const st = q.rows.map(() => new Set());
  const optEls = [], rowEls = [];
  q.rows.forEach((row, ri) => {
    const r = div('prow'); rowEls[ri] = r;
    if (row.prompt) r.append(speakable(renderItem(row.prompt, 'prompt'), row.prompt, sub));
    const opts = div('opts'); const multi = Array.isArray(row.ans); const need = row.need || (multi ? row.ans.length : 1);
    optEls[ri] = [];
    row.opts.forEach((o, oi) => {
      const b = renderItem(o, 'opt ' + style);
      if (style === 'tick') b.insertAdjacentHTML('beforeend', '<i class="box"></i>');
      b.addEventListener('click', () => {
        speakItem(o, sub); if (ctx.locked) return; Sound.sfx('tap');
        const s = st[ri];
        if (!multi) { s.clear(); s.add(oi); }
        else if (s.has(oi)) s.delete(oi);
        else { s.add(oi); if (s.size > need) s.delete(s.values().next().value); }
        optEls[ri].forEach((e, k) => e.classList.toggle('sel', s.has(k)));
      });
      optEls[ri].push(b); opts.append(b);
    });
    if (multi) r.append(div('need', `Pilih ${need}`));
    r.append(opts); wrap.append(r);
  });
  root.append(wrap);
  const ansSet = row => new Set(Array.isArray(row.ans) ? row.ans : [row.ans]);
  return {
    units: q.rows.length,
    check() {
      let got = 0;
      q.rows.forEach((row, ri) => {
        const a = ansSet(row), s = st[ri];
        const ok = row.need ? s.size === row.need && [...s].every(x => a.has(x)) : a.size === s.size && [...a].every(x => s.has(x));
        if (ok) got++;
        optEls[ri].forEach((e, k) => { if (s.has(k)) e.classList.add(a.has(k) ? 'ok' : 'bad'); else if (a.has(k) && !(ok && row.need)) e.classList.add('miss'); });
        rowEls[ri].classList.add(ok ? 'row-ok' : 'row-bad');
      });
      return got;
    },
    solve() { q.rows.forEach((row, ri) => { let a = ansSet(row); if (row.need) a = new Set([...a].slice(0, row.need)); st[ri] = new Set(a); optEls[ri].forEach((e, k) => { e.classList.toggle('sel', a.has(k)); e.classList.toggle('sol', a.has(k)); }); }); },
  };
}

/* ---------- BULATKAN SEMUA (huruf bertaburan dalam gambar) ---------- */
function rScatter(q, sub, root, ctx) {
  const box = div('scatter' + (q.bubble ? ' bubbles' : ''));
  if (q.bg) box.append(div('scbg emo', q.bg));
  const targets = new Set(q.targets);
  const n = q.letters.length, cols = Math.ceil(Math.sqrt(n)), rowsN = Math.ceil(n / cols);
  const sel = new Set();
  const els = q.letters.map((ch, i) => {
    const c = i % cols, r = Math.floor(i / cols);
    const jx = ((i * 37) % 7 - 3) * 0.8, jy = ((i * 53) % 7 - 3) * 0.8;
    const e = div('sc ltr', esc(ch));
    e.style.left = (10 + (c + 0.5 + (r % 2) * 0.25) * (75 / cols) + jx) + '%';
    e.style.top = (14 + (r + 0.5) * (72 / rowsN) + jy) + '%';
    e.addEventListener('click', () => {
      Sound.speak('huruf ' + ch, 'ms'); if (ctx.locked) return; Sound.sfx('tap');
      if (sel.has(i)) sel.delete(i); else sel.add(i); e.classList.toggle('sel', sel.has(i));
    });
    box.append(e); return e;
  });
  root.append(box);
  const units = q.letters.filter(c => targets.has(c)).length;
  return {
    units,
    check() {
      let good = 0, bad = 0;
      els.forEach((e, i) => { const t = targets.has(q.letters[i]); if (sel.has(i)) { e.classList.add(t ? 'ok' : 'bad'); t ? good++ : bad++; } else if (t) e.classList.add('miss'); });
      return Math.max(0, good - bad);
    },
    solve() { sel.clear(); els.forEach((e, i) => { const t = targets.has(q.letters[i]); if (t) sel.add(i); e.classList.toggle('sel', t); e.classList.toggle('sol', t); }); },
  };
}

/* ---------- PADANKAN: tarik garisan titik ke titik ---------- */
function rMatch(q, sub, root, ctx) {
  let Ls = q.L, Rs = q.R, ans = q.ans;
  if (q.pairs) { Ls = q.pairs.map(p => p[0]); Rs = q.pairs.map(p => p[1]); ans = Ls.map((_, i) => [i, i]); }
  let order = Rs.map((_, i) => i);
  if (!q.fixed && order.length > 1) { do order = shuffle(order); while (order.every((v, i) => v === i)); }
  const wrap = div('match'); const colL = div('mcol l'), colR = div('mcol r');
  const svg = document.createElementNS(SVGNS, 'svg'); svg.classList.add('mlines');
  wrap.append(svg, colL, colR);
  const lEls = [], rEls = [];
  const mk = (it, side, idx) => {
    const cell = div('mcell ' + side); cell.dataset.side = side; cell.dataset.idx = idx;
    cell.append(renderItem(it)); cell.append(div('dot')); cell._it = it; return cell;
  };
  Ls.forEach((it, i) => { lEls[i] = mk(it, 'l', i); });
  order.forEach(ri => { rEls[ri] = mk(Rs[ri], 'r', ri); });
  const group = (col, els, n) => { for (let g = 0; g < els.length; g += n) { const grp = div('mgrp'); els.slice(g, g + n).forEach(e => grp.append(e)); col.append(grp); } };
  if (q.groupL) group(colL, lEls, q.groupL); else lEls.forEach(c => colL.append(c));
  const rOrdered = order.map(ri => rEls[ri]);
  if (q.groupR) group(colR, rOrdered, q.groupR); else rOrdered.forEach(c => colR.append(c));
  root.append(wrap);

  const conns = new Map(); // kiri -> kanan
  let sel = null, drag = null, marks = null, showSol = false;
  const pos = cell => {
    const d = cell.querySelector('.dot').getBoundingClientRect(), b = wrap.getBoundingClientRect();
    return [d.left + d.width / 2 - b.left, d.top + d.height / 2 - b.top];
  };
  const line = (a, b, cls) => {
    const l = document.createElementNS(SVGNS, 'line');
    l.setAttribute('x1', a[0]); l.setAttribute('y1', a[1]); l.setAttribute('x2', b[0]); l.setAttribute('y2', b[1]);
    l.setAttribute('class', cls); svg.append(l);
  };
  function draw() {
    svg.innerHTML = ''; svg.setAttribute('width', wrap.clientWidth); svg.setAttribute('height', wrap.clientHeight);
    for (const [l, r] of conns) line(pos(lEls[l]), pos(rEls[r]), 'ln' + (marks ? (marks.has(l + ':' + r) ? ' ok' : ' bad') : ''));
    if (showSol) ans.forEach(([l, r]) => { if (conns.get(l) !== r) line(pos(lEls[l]), pos(rEls[r]), 'ln sol'); });
    if (drag && drag.moved) line(pos(drag.cell), [drag.x, drag.y], 'ln temp');
    [...lEls, ...rEls].forEach(c => c.classList.remove('linked'));
    for (const [l, r] of conns) { lEls[l].classList.add('linked'); rEls[r].classList.add('linked'); }
  }
  function connect(l, r) {
    if (!q.many) for (const [k, v] of [...conns]) if (v === r && k !== l) conns.delete(k);
    conns.set(l, r); Sound.sfx('link'); draw();
  }
  function link(a, b) { // a, b = cell
    if (a.dataset.side === b.dataset.side) return false;
    const l = a.dataset.side === 'l' ? a : b, r = a.dataset.side === 'l' ? b : a;
    connect(+l.dataset.idx, +r.dataset.idx); return true;
  }
  function setSel(cell) { [...lEls, ...rEls].forEach(c => c.classList.remove('sel')); sel = cell; if (cell) cell.classList.add('sel'); }

  wrap.addEventListener('pointerdown', e => {
    const cell = e.target.closest('.mcell'); if (!cell) return;
    speakItem(cell._it, sub); if (ctx.locked) return;
    e.preventDefault();
    const b = wrap.getBoundingClientRect();
    drag = { cell, sx: e.clientX, sy: e.clientY, x: e.clientX - b.left, y: e.clientY - b.top, moved: false };
    try { wrap.setPointerCapture(e.pointerId); } catch (_) { }
  });
  wrap.addEventListener('pointermove', e => {
    if (!drag) return; const b = wrap.getBoundingClientRect();
    drag.x = e.clientX - b.left; drag.y = e.clientY - b.top;
    if (Math.hypot(e.clientX - drag.sx, e.clientY - drag.sy) > 8) drag.moved = true;
    if (drag.moved) draw();
  });
  const end = e => {
    if (!drag) return; const d = drag; drag = null;
    if (d.moved) {
      const t = document.elementFromPoint(e.clientX, e.clientY)?.closest('.mcell');
      if (t && wrap.contains(t)) link(d.cell, t);
      setSel(null); draw(); return;
    }
    // ketik: pilih satu, kemudian ketik pasangannya
    if (sel && sel !== d.cell && link(sel, d.cell)) { setSel(null); return; }
    if (sel === d.cell) { // ketik dua kali = padam sambungan
      const i = +d.cell.dataset.idx;
      if (d.cell.dataset.side === 'l') conns.delete(i); else for (const [k, v] of [...conns]) if (v === i) conns.delete(k);
      setSel(null); draw(); return;
    }
    setSel(d.cell); Sound.sfx('tap');
  };
  wrap.addEventListener('pointerup', end);
  wrap.addEventListener('pointercancel', () => { drag = null; draw(); });
  new ResizeObserver(draw).observe(wrap);
  requestAnimationFrame(draw);
  return {
    units: ans.length,
    check() {
      marks = new Set(); let got = 0;
      ans.forEach(([l, r]) => { if (conns.get(l) === r) { got++; marks.add(l + ':' + r); } });
      showSol = true; draw(); return got;
    },
    solve() { conns.clear(); ans.forEach(([l, r]) => conns.set(l, r)); marks = new Set(ans.map(([l, r]) => l + ':' + r)); draw(); },
  };
}

/* ---------- Sistem slot + jubin (seret atau ketik) ---------- */
class Slots {
  constructor(ctx, sub, once) { this.ctx = ctx; this.sub = sub; this.once = once; this.list = []; this.sel = null; this.tiles = []; }
  add(el, ans) {
    const s = { el, ans: String(ans), val: null, tile: null };
    el.classList.add('slot');
    el.addEventListener('click', () => {
      if (this.ctx.locked) return;
      if (s.val != null) { this.clear(s); Sound.sfx('tap'); }
      this.select(s);
    });
    this.list.push(s); return s;
  }
  select(s) { this.list.forEach(x => x.el.classList.remove('active')); this.sel = s; if (s) s.el.classList.add('active'); }
  clear(s) { if (s.tile) s.tile.classList.remove('used'); s.tile = null; s.val = null; s.el.textContent = ''; s.el.classList.remove('filled'); this.onchange?.(); }
  put(s, tile) {
    if (s.val != null) this.clear(s);
    s.val = tile.dataset.v; s.el.textContent = s.val; s.el.classList.add('filled');
    if (this.once) { s.tile = tile; tile.classList.add('used'); }
    Sound.sfx('drop');
    this.select(this.list.find(x => x.val == null) || null);
    this.onchange?.();
  }
  bank(values, cls) {
    const b = div('bank ' + (cls || ''));
    values.forEach(v => {
      const t = div('tile', esc(v)); t.dataset.v = v; if (AR_RE.test(v)) t.classList.add('ar');
      b.append(t); this.tiles.push(t); this.dragify(t);
    });
    return b;
  }
  speakTile(v) { if (AR_RE.test(v)) return; Sound.speak(v.length === 1 ? 'huruf ' + v : v, this.sub === 'BI' ? 'en' : 'ms'); }
  dragify(t) {
    let st = null, ghost = null;
    t.addEventListener('pointerdown', e => {
      if (this.ctx.locked || t.classList.contains('used')) return;
      e.preventDefault(); st = { x: e.clientX, y: e.clientY }; try { t.setPointerCapture(e.pointerId); } catch (_) { }
    });
    t.addEventListener('pointermove', e => {
      if (!st) return;
      if (!ghost && Math.hypot(e.clientX - st.x, e.clientY - st.y) > 6) {
        ghost = t.cloneNode(true); ghost.classList.add('ghost'); document.body.append(ghost);
      }
      if (ghost) { ghost.style.left = e.clientX + 'px'; ghost.style.top = e.clientY + 'px'; }
    });
    const up = e => {
      if (!st) return; st = null;
      if (ghost) {
        ghost.remove(); ghost = null;
        const target = document.elementFromPoint(e.clientX, e.clientY)?.closest('.slot');
        const s = this.list.find(x => x.el === target);
        if (s) this.put(s, t);
        return;
      }
      this.speakTile(t.dataset.v);
      const s = this.sel || this.list.find(x => x.val == null);
      if (s) this.put(s, t);
    };
    t.addEventListener('pointerup', up);
    t.addEventListener('pointercancel', () => { st = null; ghost?.remove(); ghost = null; });
  }
  check() { let got = 0; this.list.forEach(s => { const ok = norm(s.val) === norm(s.ans); if (ok) got++; s.el.classList.add(ok ? 'ok' : 'bad'); if (!ok) s.el.dataset.sol = s.ans; }); this.select(null); return got; }
  solve() { this.list.forEach(s => { s.val = s.ans; s.el.textContent = s.ans; s.el.classList.add('filled', 'sol'); }); this.tiles.forEach(t => this.once && t.classList.add('used')); this.onchange?.(); }
}

/* ---------- ISI TEMPAT KOSONG ---------- */
function rFill(q, sub, root, ctx) {
  const wrap = div('fill t-' + (q.tile || 'letter'));
  const sys = new Slots(ctx, sub, q.once);
  const inputs = [];
  q.rows.forEach(row => {
    const r = div('frow' + (row.example ? ' example' : ''));
    if (row.p) r.append(speakable(renderItem(row.p, 'prompt'), row.p, sub));
    const line = div('fparts'); if (q.dir === 'rtl') line.dir = 'rtl';
    let ai = 0;
    row.parts.forEach(part => {
      if (part === null) {
        const a = String(row.ans[ai++]);
        if (row.example) { line.append(div('fixed given', esc(a))); return; }
        if (q.num) {
          const inp = document.createElement('input'); inp.className = 'numin'; inp.inputMode = 'numeric'; inp.maxLength = 3;
          inp.autocomplete = 'off'; inp.dataset.ans = a; inp.addEventListener('input', () => { inp.value = inp.value.replace(/\D/g, ''); });
          line.append(inp); inputs.push(inp);
        } else { const s = div('slotbox'); if (AR_RE.test(a)) s.classList.add('ar'); line.append(s); sys.add(s, a); }
      } else line.append(div('fixed' + (AR_RE.test(part) ? ' ar' : '') + (String(part).length > 2 ? ' word' : ''), esc(part)));
    });
    if (row.example) r.append(div('contoh', 'contoh'));
    r.append(line); wrap.append(r);
  });
  root.append(wrap);
  const lamp = wrap.querySelector('.traffic');
  if (lamp) { // "Warnakan lampu isyarat": lampu ikut jawapan yang diisi
    const COL = { Merah: '#e53935', Kuning: '#fdd835', Hijau: '#43a047' };
    sys.onchange = () => lamp.querySelectorAll('circle').forEach((c, k) => c.setAttribute('fill', COL[sys.list[k]?.val] || '#cfd8dc'));
  }
  if (!q.num) {
    let vals = q.bank ? q.bank.slice() : [...new Set(sys.list.map(s => s.ans).concat(q.extra || []))];
    if (!q.bankFixed) vals = shuffle(vals);
    const bank = sys.bank(vals, 't-' + (q.tile || 'letter')); root.append(bank);
    if (q.once) q.rows.filter(r => r.example).forEach(r => r.ans.forEach(a => sys.tiles.find(t => t.dataset.v === String(a) && !t.classList.contains('used'))?.classList.add('used')));
    sys.select(sys.list[0]);
  }
  return {
    units: sys.list.length + inputs.length,
    check() {
      let got = sys.check();
      inputs.forEach(i => { i.readOnly = true; const ok = norm(i.value) === norm(i.dataset.ans); if (ok) got++; i.classList.add(ok ? 'ok' : 'bad'); if (!ok) i.parentElement && i.insertAdjacentHTML('afterend', `<span class="hint">${esc(i.dataset.ans)}</span>`); });
      return got;
    },
    solve() { sys.solve(); inputs.forEach(i => { i.value = i.dataset.ans; i.readOnly = true; i.classList.add('sol'); }); },
  };
}

/* ---------- SUSUN AYAT ---------- */
function rArrange(q, sub, root, ctx) {
  const wrap = div('arrange'); const state = [];
  q.rows.forEach((row, ri) => {
    const r = div('arow'); if (row.p) r.append(speakable(renderItem(row.p, 'prompt'), row.p, sub));
    const body = div('abody'); const chips = div('achips'); const ansLine = div('aline');
    const st = { picked: [], line: ansLine, row };
    row.words.forEach((w, wi) => {
      const c = div('chip', esc(w));
      c.addEventListener('click', () => {
        Sound.speak(w.replace(/\./g, ''), 'ms'); if (ctx.locked || c.classList.contains('used')) return;
        Sound.sfx('drop'); c.classList.add('used'); st.picked.push(wi); render();
      });
      chips.append(c);
    });
    function render() {
      ansLine.innerHTML = '';
      st.picked.forEach((wi, k) => {
        const c = div('chip on', esc(row.words[wi]));
        c.addEventListener('click', () => { if (ctx.locked) return; st.picked.splice(k, 1); chips.children[wi].classList.remove('used'); render(); });
        ansLine.append(c);
      });
      if (!st.picked.length) ansLine.innerHTML = '<span class="ph">Tekan perkataan mengikut susunan…</span>';
    }
    st.render = render; render();
    body.append(chips, ansLine); r.append(body); wrap.append(r); state.push(st);
  });
  root.append(wrap);
  const sentence = st => st.picked.map(i => st.row.words[i]).join(' ');
  return {
    units: q.rows.length,
    check() { let got = 0; state.forEach(st => { const ok = norm(sentence(st)) === norm(st.row.ans); if (ok) got++; st.line.classList.add(ok ? 'ok' : 'bad'); if (!ok) st.line.insertAdjacentHTML('beforeend', `<span class="hint">${esc(st.row.ans)}</span>`); }); return got; },
    solve() {
      state.forEach(st => {
        const used = new Set(); st.picked = st.row.ans.split(' ').map(w => { const k = st.row.words.findIndex((x, j) => x === w && !used.has(j)); used.add(k); return k; });
        st.line.innerHTML = `<span class="chip on sol">${esc(st.row.ans)}</span>`;
      });
    },
  };
}

/* ---------- LUKIS BENTUK BULAT ---------- */
function rDraw(q, sub, root, ctx) {
  const wrap = div('draw'); const st = [];
  q.rows.forEach(row => {
    const r = div('drow'); r.append(div('dnum', row.n));
    const box = div('dbox'); const s = { n: 0, box, row };
    const paint = () => { box.innerHTML = '<i></i>'.repeat(s.n) + (s.n ? '' : '<span class="ph">Ketik untuk lukis ○</span>'); };
    if (row.example) { s.n = row.n; paint(); r.classList.add('example'); r.append(box, div('contoh', 'contoh')); wrap.append(r); return; }
    paint();
    box.addEventListener('click', () => { if (ctx.locked || s.n >= 12) return; s.n++; Sound.sfx('tap'); paint(); });
    const undo = div('dundo', '↺'); undo.addEventListener('click', () => { if (ctx.locked) return; s.n = 0; paint(); });
    r.append(box, undo); wrap.append(r); st.push(s);
  });
  root.append(wrap);
  return {
    units: st.length,
    check() { let got = 0; st.forEach(s => { const ok = s.n === s.row.n; if (ok) got++; s.box.classList.add(ok ? 'ok' : 'bad'); }); return got; },
    solve() { st.forEach(s => { s.n = s.row.n; s.box.innerHTML = '<i></i>'.repeat(s.n); s.box.classList.add('sol'); }); },
  };
}

/* ---------- SILANG KATA ---------- */
function rCross(q, sub, root, ctx) {
  const wrap = div('cross');
  const clues = div('clues');
  q.clues.forEach(c => { const e = div('clue'); e.append(renderItem(c.p, 'prompt'), renderItem(c.t, 'cw')); speakable(e, c.t, sub); clues.append(e); });
  const grid = div('cgrid'); grid.style.gridTemplateColumns = `repeat(${q.cols}, 1fr)`;
  const sys = new Slots(ctx, sub, false);
  const cellAt = {};
  q.cells.forEach(([r, c, ch, given]) => { cellAt[r + ',' + c] = { ch, given }; });
  for (let r = 0; r < q.rows; r++) for (let c = 0; c < q.cols; c++) {
    const v = cellAt[r + ',' + c];
    const e = div(v ? 'ccell ar' : 'ccell empty');
    if (v) { if (v.given) { e.textContent = v.ch; e.classList.add('given'); } else sys.add(e, v.ch); }
    grid.append(e);
  }
  wrap.append(clues, grid); root.append(wrap);
  const vals = shuffle([...new Set(sys.list.map(s => s.ans))]);
  root.append(sys.bank(vals, 't-letter'));
  sys.select(sys.list[0]);
  return { units: sys.list.length, check: () => sys.check(), solve: () => sys.solve() };
}

const RENDERERS = { pick: rPick, scatter: rScatter, match: rMatch, fill: rFill, arrange: rArrange, draw: rDraw, cross: rCross };

/* Papar satu soalan (dengan bahagian A/B/C jika ada). Pulangkan pengawal. */
function renderQuestion(q, root, ctx) {
  const parts = q.parts || [Object.assign({}, q, { marks: q.marks || 10 })];
  const ctrls = parts.map(p => {
    const box = div('part');
    if (q.parts) {
      box.append(div('ptitle', `<b>${esc(p.label)}.</b> ${esc(p.title)} <span class="pm">(${p.marks} markah)</span>`));
      if (p.jawi) box.append(div('jawi-title ar', esc(p.jawi)));
    }
    root.append(box);
    const c = RENDERERS[p.type](p, q.s, box, ctx); c.marks = p.marks; return c;
  });
  return {
    check() {
      let got = 0, max = 0;
      ctrls.forEach(c => { const g = c.check(); got += c.units ? c.marks * g / c.units : 0; max += c.marks; });
      return { got: Math.round(got * 10) / 10, max };
    },
    solve() { ctrls.forEach(c => c.solve()); },
  };
}
function questionMarks(q) { return q.parts ? q.parts.reduce((a, p) => a + p.marks, 0) : (q.marks || 10); }
