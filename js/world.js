/* Dunia atas-bawah: Kampung Celik Minda */
'use strict';
class World {
  constructor(canvas, hooks) {
    this.cv = canvas; this.g = canvas.getContext('2d'); this.hooks = hooks;
    this.T = 48; this.W = 40; this.H = 28;
    const T = this.T;
    this.player = { x: 20 * T, y: 21 * T, dir: 'up', phase: 0, moving: false, look: DEFAULT_LOOK.L, name: '' };
    this.keys = {}; this.joy = { x: 0, y: 0 }; this.target = null; this.autoAct = null;
    this.paused = true; this.near = null; this.t = 0; this.lastStep = 0;
    this.houses = [
      { age: 5, x: 4 * T, y: 3 * T, w: 9 * T, h: 7 * T, roof: '#ff8a50', label: 'RUMAH 5 TAHUN' },
      { age: 6, x: 27 * T, y: 3 * T, w: 9 * T, h: 7 * T, roof: '#4f8ef7', label: 'RUMAH 6 TAHUN' },
    ];
    this.zones = this.houses.map(h => ({ kind: 'door', age: h.age, x: h.x + h.w / 2, y: h.y + h.h + 18, r: 46, label: 'Masuk' }));
    const npcPos = { cikgu: [20, 17.6, 'down'], faris: [13, 14, 'right'], sarah: [25.2, 19.6, 'left'] };
    this.npcs = NPCS.map(n => ({ ...n, x: npcPos[n.id][0] * T, y: npcPos[n.id][1] * T, dir: npcPos[n.id][2] }));
    this.npcs.forEach(n => this.zones.push({ kind: 'npc', npc: n, x: n.x, y: n.y, r: 56, label: 'Cakap' }));
    this.buildMap();
    this.bg = this.renderBG();
    this.bindInput();
    this.resize(); window.addEventListener('resize', () => this.resize());
    this.last = performance.now();
    requestAnimationFrame(t => this.loop(t));
  }

  rng(seed) { return () => { seed |= 0; seed = seed + 0x6D2B79F5 | 0; let t = Math.imul(seed ^ seed >>> 15, 1 | seed); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; }; }

  buildMap() {
    const { W, H, T } = this;
    const path = this.path = Array.from({ length: H }, () => new Array(W).fill(0));
    for (let x = 2; x < W - 2; x++) { path[12][x] = 1; path[13][x] = 1; }
    for (let y = 10; y < 13; y++) { path[y][8] = 1; path[y][31] = 1; }
    for (let y = 13; y < 23; y++) { path[y][19] = 1; path[y][20] = 1; }
    this.pond = { x: 30 * T, y: 20.5 * T, rx: 4.2 * T, ry: 2.6 * T };
    this.plaza = { x: 20 * T, y: 20 * T, r: 2.6 * T };
    const r = this.rng(7);
    const trees = this.trees = [];
    for (let x = 0; x < W; x += 1) { trees.push([x, 0]); trees.push([x, H - 1]); }
    for (let y = 1; y < H - 1; y += 1) { trees.push([0, y]); trees.push([W - 1, y]); }
    [[2, 16], [3, 19], [5, 23], [8, 17], [10, 21], [6, 15], [14, 24], [15, 18], [24, 24], [36, 17], [35, 23], [37, 20],
      [16, 4], [18, 7], [22, 5], [24, 8], [14, 8], [38, 9], [2, 7], [26, 15], [12, 25], [33, 25]].forEach(t => trees.push(t));
    this.flowers = [];
    for (let i = 0; i < 140; i++) {
      const fx = 1 + Math.floor(r() * (W - 2)), fy = 1 + Math.floor(r() * (H - 2));
      if (path[fy][fx]) continue;
      this.flowers.push([fx * T + r() * T, fy * T + r() * T, ['#ff5c8a', '#ffd54f', '#ffffff', '#b388ff'][Math.floor(r() * 4)]]);
    }
    this.solids = [];
    this.houses.forEach(h => this.solids.push({ x: h.x - 4, y: h.y + h.h * 0.35, w: h.w + 8, h: h.h * 0.65 }));
    trees.forEach(([tx, ty]) => this.solids.push({ x: tx * T + 10, y: ty * T + 22, w: T - 20, h: 22 }));
    const p = this.pond; this.solids.push({ x: p.x - p.rx * 0.85, y: p.y - p.ry * 0.7, w: p.rx * 1.7, h: p.ry * 1.4 });
  }

  renderBG() {
    const { W, H, T } = this;
    const c = document.createElement('canvas'); c.width = W * T; c.height = H * T;
    const g = c.getContext('2d'); const r = this.rng(42);
    g.fillStyle = '#8fd16a'; g.fillRect(0, 0, c.width, c.height);
    for (let i = 0; i < 2600; i++) { g.fillStyle = r() > 0.5 ? 'rgba(60,140,50,.25)' : 'rgba(200,255,160,.25)'; g.fillRect(r() * c.width, r() * c.height, 2, 5); }
    // plaza
    const pl = this.plaza; g.fillStyle = '#f3d9a4'; g.beginPath(); g.arc(pl.x, pl.y, pl.r, 0, Math.PI * 2); g.fill();
    g.strokeStyle = '#d9b877'; g.lineWidth = 4; g.stroke();
    // laluan
    for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) if (this.path[y][x]) {
      g.fillStyle = '#f0d39b'; g.fillRect(x * T, y * T, T, T);
      g.fillStyle = 'rgba(160,120,60,.25)'; for (let k = 0; k < 3; k++) { g.beginPath(); g.arc(x * T + r() * T, y * T + r() * T, 2 + r() * 2, 0, 7); g.fill(); }
    }
    // kolam
    const p = this.pond;
    g.fillStyle = '#d9c38f'; g.beginPath(); g.ellipse(p.x, p.y, p.rx + 8, p.ry + 8, 0, 0, 7); g.fill();
    const grd = g.createRadialGradient(p.x, p.y, 10, p.x, p.y, p.rx); grd.addColorStop(0, '#7fd3ff'); grd.addColorStop(1, '#3a9bdc');
    g.fillStyle = grd; g.beginPath(); g.ellipse(p.x, p.y, p.rx, p.ry, 0, 0, 7); g.fill();
    [[-60, -20], [50, 30], [90, -30]].forEach(([dx, dy]) => { g.fillStyle = '#4caf50'; g.beginPath(); g.arc(p.x + dx, p.y + dy, 13, 0.3, Math.PI * 2 - 0.3); g.lineTo(p.x + dx, p.y + dy); g.fill(); });
    g.fillStyle = '#ff80ab'; g.beginPath(); g.arc(p.x + 50, p.y + 26, 5, 0, 7); g.fill();
    // bunga
    this.flowers.forEach(([x, y, col]) => { g.fillStyle = col; for (let k = 0; k < 4; k++) { g.beginPath(); g.arc(x + Math.cos(k * 1.57) * 3, y + Math.sin(k * 1.57) * 3, 2.4, 0, 7); g.fill(); } g.fillStyle = '#ffb300'; g.beginPath(); g.arc(x, y, 1.8, 0, 7); g.fill(); });
    // rumah
    this.houses.forEach(h => this.drawHouse(g, h));
    // pokok
    this.trees.slice().sort((a, b) => a[1] - b[1]).forEach(([tx, ty]) => this.drawTree(g, tx * T + T / 2, ty * T + T - 4, r));
    // papan tanda tengah
    this.drawSign(g, 17.2 * T, 15.6 * T, '⬅ 5 Tahun  |  6 Tahun ➡');
    return c;
  }

  drawTree(g, x, y, r) {
    g.fillStyle = 'rgba(0,0,0,.15)'; g.beginPath(); g.ellipse(x, y, 20, 6, 0, 0, 7); g.fill();
    g.fillStyle = '#8d5a34'; g.fillRect(x - 5, y - 22, 10, 22);
    const greens = ['#3f9b46', '#4fb354', '#2e7d32'];
    [[0, -40, 22], [-14, -30, 16], [14, -30, 16], [0, -52, 14]].forEach(([dx, dy, rad], i) => {
      g.fillStyle = greens[i % 3]; g.beginPath(); g.arc(x + dx, y + dy, rad, 0, 7); g.fill();
    });
    if (r() > 0.6) { g.fillStyle = '#e53935'; g.beginPath(); g.arc(x + 8, y - 40, 3, 0, 7); g.fill(); g.beginPath(); g.arc(x - 9, y - 32, 3, 0, 7); g.fill(); }
  }

  drawSign(g, x, y, text) {
    g.font = 'bold 15px Fredoka, sans-serif'; const w = g.measureText(text).width + 24;
    g.fillStyle = '#795548'; g.fillRect(x + w / 2 - 4, y, 8, 34);
    g.fillStyle = '#a1887f'; rr(g, x, y - 26, w, 30, 6); g.fill(); g.strokeStyle = '#5d4037'; g.lineWidth = 3; g.stroke();
    g.fillStyle = '#fff'; g.textAlign = 'left'; g.textBaseline = 'middle'; g.fillText(text, x + 12, y - 11);
  }

  drawHouse(g, h) {
    const { x, y, w } = h, hh = h.h, wallTop = y + hh * 0.42, bottom = y + hh;
    g.fillStyle = 'rgba(0,0,0,.18)'; g.fillRect(x + 8, bottom - 6, w, 14);
    g.fillStyle = '#fff3dd'; g.fillRect(x, wallTop, w, bottom - wallTop);
    g.strokeStyle = 'rgba(180,140,90,.35)'; g.lineWidth = 2;
    for (let yy = wallTop + 18; yy < bottom; yy += 18) { g.beginPath(); g.moveTo(x, yy); g.lineTo(x + w, yy); g.stroke(); }
    g.fillStyle = h.roof; g.beginPath(); g.moveTo(x - 18, wallTop + 8); g.lineTo(x + w / 2, y); g.lineTo(x + w + 18, wallTop + 8); g.closePath(); g.fill();
    g.strokeStyle = shade(h.roof, -0.18); g.lineWidth = 3;
    for (let i = 1; i < 5; i++) { const yy = y + (wallTop + 8 - y) * i / 5; const half = (w / 2 + 18) * i / 5; g.beginPath(); g.moveTo(x + w / 2 - half, yy); g.lineTo(x + w / 2 + half, yy); g.stroke(); }
    g.fillStyle = shade(h.roof, -0.25); g.fillRect(x + w * 0.72, y + 22, 22, 40);
    // lencana nombor
    const bx = x + w / 2, by = y + (wallTop - y) * 0.58;
    g.fillStyle = '#fff'; g.beginPath(); g.arc(bx, by, 30, 0, 7); g.fill(); g.strokeStyle = shade(h.roof, -0.2); g.lineWidth = 5; g.stroke();
    g.fillStyle = shade(h.roof, -0.3); g.font = 'bold 36px Fredoka, sans-serif'; g.textAlign = 'center'; g.textBaseline = 'middle'; g.fillText(h.age, bx, by + 2);
    // tingkap
    [[x + 30, wallTop + 34], [x + w - 100, wallTop + 34]].forEach(([wx, wy]) => {
      g.fillStyle = '#b3e5fc'; rr(g, wx, wy, 70, 56, 6); g.fill(); g.strokeStyle = '#8d6e63'; g.lineWidth = 5; g.stroke();
      g.beginPath(); g.moveTo(wx + 35, wy); g.lineTo(wx + 35, wy + 56); g.moveTo(wx, wy + 28); g.lineTo(wx + 70, wy + 28); g.stroke();
    });
    // pintu
    const dw = 60, dh = 92, dx = x + w / 2 - dw / 2, dy = bottom - dh;
    g.fillStyle = '#8d5a34'; rr(g, dx, dy, dw, dh, 10); g.fill(); g.fillStyle = '#a86d40'; rr(g, dx + 8, dy + 10, dw - 16, dh - 18, 6); g.fill();
    g.fillStyle = '#ffd54f'; g.beginPath(); g.arc(dx + dw - 14, dy + dh / 2, 4, 0, 7); g.fill();
    g.fillStyle = '#bcaaa4'; g.fillRect(dx - 10, bottom, dw + 20, 10);
    // papan nama
    g.font = 'bold 18px Fredoka, sans-serif'; const tw = g.measureText(h.label).width + 26;
    g.fillStyle = shade(h.roof, -0.1); rr(g, x + w / 2 - tw / 2, wallTop - 2, tw, 30, 8); g.fill();
    g.fillStyle = '#fff'; g.textAlign = 'center'; g.fillText(h.label, x + w / 2, wallTop + 13);
  }

  bindInput() {
    const map = { ArrowUp: 'u', KeyW: 'u', ArrowDown: 'd', KeyS: 'd', ArrowLeft: 'l', KeyA: 'l', ArrowRight: 'r', KeyD: 'r' };
    window.addEventListener('keydown', e => {
      if (this.paused) return;
      if (map[e.code]) { this.keys[map[e.code]] = true; this.target = null; e.preventDefault(); }
      if (['Space', 'Enter', 'KeyE'].includes(e.code)) { this.interact(); e.preventDefault(); }
    });
    window.addEventListener('keyup', e => { if (map[e.code]) this.keys[map[e.code]] = false; });
    this.cv.addEventListener('pointerdown', e => {
      if (this.paused) return;
      const wx = e.clientX + this.camX, wy = e.clientY + this.camY;
      this.target = { x: wx, y: wy };
      const z = this.zones.find(z => Math.hypot(z.x - wx, (z.kind === 'npc' ? z.y - 30 : z.y) - wy) < z.r + 20);
      this.autoAct = z || null;
      if (z) this.target = { x: z.x, y: z.y + (z.kind === 'npc' ? 34 : 0) };
    });
  }

  resize() {
    const dpr = Math.min(2, window.devicePixelRatio || 1);
    this.vw = window.innerWidth; this.vh = window.innerHeight; this.dpr = dpr;
    this.cv.width = this.vw * dpr; this.cv.height = this.vh * dpr;
    this.cv.style.width = this.vw + 'px'; this.cv.style.height = this.vh + 'px';
  }

  collide(x, y) {
    const bw = 20, bh = 10, bx = x - bw / 2, by = y - bh;
    if (bx < 0 || by < 0 || bx + bw > this.W * this.T || y > this.H * this.T) return true;
    return this.solids.some(s => bx < s.x + s.w && bx + bw > s.x && by < s.y + s.h && by + bh > s.y);
  }

  update(dt) {
    const p = this.player;
    let vx = (this.keys.r ? 1 : 0) - (this.keys.l ? 1 : 0) + this.joy.x;
    let vy = (this.keys.d ? 1 : 0) - (this.keys.u ? 1 : 0) + this.joy.y;
    if (vx || vy) this.target = null;
    else if (this.target) {
      const dx = this.target.x - p.x, dy = this.target.y - p.y, d = Math.hypot(dx, dy);
      if (d < 6) this.target = null; else { vx = dx / d; vy = dy / d; }
    }
    const mag = Math.hypot(vx, vy);
    p.moving = mag > 0.1;
    if (p.moving) {
      if (mag > 1) { vx /= mag; vy /= mag; }
      const sp = 170 * dt;
      const nx = p.x + vx * sp, ny = p.y + vy * sp;
      let moved = false;
      if (!this.collide(nx, p.y)) { p.x = nx; moved = true; }
      if (!this.collide(p.x, ny)) { p.y = ny; moved = true; }
      if (!moved) this.target = null;
      p.dir = Math.abs(vx) > Math.abs(vy) ? (vx > 0 ? 'right' : 'left') : (vy > 0 ? 'down' : 'up');
      p.phase += dt * 11;
      if (this.t - this.lastStep > 0.28) { this.lastStep = this.t; Sound.sfx('step'); }
    }
    let best = null, bd = 1e9;
    this.zones.forEach(z => { const d = Math.hypot(z.x - p.x, z.y - p.y); if (d < z.r + 12 && d < bd) { bd = d; best = z; } });
    if (best !== this.near) { this.near = best; this.hooks.onNear?.(best); }
    if (best && this.autoAct === best && !this.target) { this.autoAct = null; this.interact(); }
  }

  interact() { if (this.near && !this.paused) { this.keys = {}; this.joy = { x: 0, y: 0 }; this.hooks.onAct?.(this.near); } }

  loop(now) {
    const dt = Math.min(0.05, (now - this.last) / 1000); this.last = now; this.t += dt;
    if (!this.paused) this.update(dt);
    this.draw();
    requestAnimationFrame(t => this.loop(t));
  }

  draw() {
    const { g, dpr, vw, vh, player: p } = this;
    const mw = this.W * this.T, mh = this.H * this.T;
    this.camX = Math.max(0, Math.min(mw - vw, p.x - vw / 2)); if (mw < vw) this.camX = (mw - vw) / 2;
    this.camY = Math.max(0, Math.min(mh - vh, p.y - 40 - vh / 2)); if (mh < vh) this.camY = (mh - vh) / 2;
    g.setTransform(dpr, 0, 0, dpr, 0, 0);
    g.fillStyle = '#5fae4a'; g.fillRect(0, 0, vw, vh);
    g.drawImage(this.bg, -this.camX, -this.camY);
    g.translate(-this.camX, -this.camY);
    // riak air
    const pd = this.pond; g.strokeStyle = 'rgba(255,255,255,.5)'; g.lineWidth = 2;
    for (let i = 0; i < 2; i++) { const rad = ((this.t * 18 + i * 30) % 60); g.globalAlpha = 1 - rad / 60; g.beginPath(); g.ellipse(pd.x - 20, pd.y, rad, rad * 0.5, 0, 0, 7); g.stroke(); }
    g.globalAlpha = 1;
    // lencana rumah
    const badges = this.hooks.badges?.() || {};
    this.houses.forEach(h => {
      const b = badges[h.age]; if (!b) return;
      g.font = '30px "Noto Color Emoji", sans-serif'; g.textAlign = 'center';
      if (b.crown) g.fillText('👑', h.x + h.w / 2, h.y - 14 + Math.sin(this.t * 3) * 3);
      if (b.stars) { g.font = 'bold 16px Fredoka, sans-serif'; g.fillStyle = '#5d4037'; g.fillText('⭐ ' + b.stars, h.x + h.w / 2, h.y + h.h + 50); }
    });
    // entiti ikut y
    const ents = this.npcs.map(n => ({ y: n.y, draw: () => this.drawNPC(n) }));
    ents.push({ y: p.y, draw: () => { drawAvatar(g, p.x, p.y, 1.05, p.look, p.dir, p.phase, p.moving); this.tag(p.x, p.y - 82, p.name || 'Saya', '#ff7a59'); } });
    ents.sort((a, b) => a.y - b.y).forEach(e => e.draw());
    // penunjuk zon
    if (this.near && !this.paused) {
      const z = this.near, by = (z.kind === 'npc' ? z.y - 100 : z.y - 40) + Math.sin(this.t * 6) * 4;
      g.fillStyle = '#fff'; g.strokeStyle = '#333'; g.lineWidth = 3; g.beginPath(); g.arc(z.x, by, 15, 0, 7); g.fill(); g.stroke();
      g.fillStyle = '#333'; g.font = 'bold 18px Fredoka, sans-serif'; g.textAlign = 'center'; g.textBaseline = 'middle'; g.fillText(z.kind === 'npc' ? '💬' : '⬆', z.x, by + 1);
    }
    if (this.target && !this.paused) { g.strokeStyle = 'rgba(255,255,255,.8)'; g.lineWidth = 2; g.beginPath(); g.ellipse(this.target.x, this.target.y, 10 + Math.sin(this.t * 8) * 2, 5, 0, 0, 7); g.stroke(); }
  }

  drawNPC(n) {
    const g = this.g; const bob = Math.sin(this.t * 2 + n.x) * 0.6;
    drawAvatar(g, n.x, n.y + bob, 1.0, n.look, n.dir, 0, false);
    this.tag(n.x, n.y - 80, n.name, '#16a394');
  }

  tag(x, y, text, col) {
    const g = this.g; g.font = 'bold 13px Fredoka, sans-serif'; const w = g.measureText(text).width + 14;
    g.fillStyle = col; rr(g, x - w / 2, y - 10, w, 20, 10); g.fill();
    g.fillStyle = '#fff'; g.textAlign = 'center'; g.textBaseline = 'middle'; g.fillText(text, x, y + 1);
  }

  setPlayer(look, name) { this.player.look = look; this.player.name = name; }
  placeAtDoor(age) { const z = this.zones.find(z => z.kind === 'door' && z.age === age); if (z) { this.player.x = z.x; this.player.y = z.y + 36; this.player.dir = 'down'; } }
  pause() { this.paused = true; this.keys = {}; this.joy = { x: 0, y: 0 }; this.target = null; }
  resume() { this.paused = false; this.last = performance.now(); }
}
