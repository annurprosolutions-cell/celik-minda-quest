/* Lukisan watak chibi. Perempuan sentiasa berhijab (tiada pilihan rambut). */
'use strict';
const AVATAR_OPTS = {
  skin: ['#fbe0c3', '#f1c9a0', '#e0a87a', '#c48455', '#8d5a3b'],
  hairStyle: [['pendek', 'Pendek'], ['pacak', 'Pacak'], ['kerinting', 'Kerinting'], ['belah', 'Belah tepi']],
  hairColor: ['#1b1210', '#3e2723', '#6d4c41', '#8d6e63'],
  hijabStyle: [['bulat', 'Bulat'], ['labuh', 'Labuh']],
  hijabColor: ['#ec407a', '#7e57c2', '#26a69a', '#42a5f5', '#ffb300', '#8d6e63', '#37474f', '#f5f5f5'],
  shirt: ['#ef5350', '#42a5f5', '#66bb6a', '#ffca28', '#ab47bc', '#26c6da', '#ff8a65', '#eeeeee'],
  bottom: ['#37474f', '#5d4037', '#1e3a8a', '#4a148c', '#1b5e20', '#880e4f'],
};
const DEFAULT_LOOK = {
  L: { gender: 'L', skin: '#f1c9a0', hairStyle: 'pendek', hairColor: '#1b1210', shirt: '#42a5f5', bottom: '#37474f', acc: { kopiah: false, glasses: false, bag: true } },
  P: { gender: 'P', skin: '#f1c9a0', hijabStyle: 'bulat', hijabColor: '#ec407a', shirt: '#ffca28', bottom: '#4a148c', acc: { glasses: false, bag: true, bros: true } },
};

function shade(hex, amt) {
  let c = hex.replace('#', ''); if (c.length === 3) c = c.split('').map(x => x + x).join('');
  const n = parseInt(c, 16);
  const f = v => Math.max(0, Math.min(255, Math.round(v + amt * 255)));
  return '#' + [f(n >> 16), f((n >> 8) & 255), f(n & 255)].map(v => v.toString(16).padStart(2, '0')).join('');
}
function rr(g, x, y, w, h, r) {
  g.beginPath(); g.moveTo(x + r, y); g.arcTo(x + w, y, x + w, y + h, r); g.arcTo(x + w, y + h, x, y + h, r);
  g.arcTo(x, y + h, x, y, r); g.arcTo(x, y, x + w, y, r); g.closePath();
}
function ell(g, x, y, rx, ry) { g.beginPath(); g.ellipse(x, y, rx, ry, 0, 0, Math.PI * 2); }

/* (x,y) = kedudukan kaki. s = skala (1 ≈ 64px tinggi). */
function drawAvatar(g, x, y, s, look, dir = 'down', phase = 0, moving = false) {
  const L = Object.assign({}, DEFAULT_LOOK[look.gender || 'L'], look);
  const acc = L.acc || {};
  const female = L.gender === 'P';
  const sw = moving ? Math.sin(phase) : 0;
  const bob = moving ? Math.abs(Math.sin(phase)) * 1.5 : 0;
  const up = dir === 'up', side = dir === 'left' || dir === 'right';
  g.save(); g.translate(x, y); g.scale(s, s);
  if (dir === 'left') g.scale(-1, 1);

  g.fillStyle = 'rgba(0,0,0,.18)'; ell(g, 0, 0, 13, 4); g.fill();
  g.translate(0, -bob);

  // beg galas di belakang (nampak bila menghadap atas / sisi)
  if (acc.bag && (up || side)) {
    g.fillStyle = '#e53935'; rr(g, side ? -15 : -10, -33, side ? 9 : 20, 19, 5); g.fill();
    g.fillStyle = '#b71c1c'; rr(g, side ? -15 : -10, -22, side ? 9 : 20, 5, 2); g.fill();
  }

  // kaki / kain
  const shoe = '#3e2723';
  if (female) {
    g.fillStyle = shoe; ell(g, -5 + sw * 2, -1, 4, 2.5); g.fill(); ell(g, 5 - sw * 2, -1, 4, 2.5); g.fill();
    g.fillStyle = L.bottom; g.beginPath(); g.moveTo(-10, -17); g.lineTo(10, -17); g.lineTo(13, -2); g.lineTo(-13, -2); g.closePath(); g.fill();
    g.strokeStyle = shade(L.bottom, -0.12); g.lineWidth = 1; g.beginPath(); g.moveTo(-3, -15); g.lineTo(-4, -3); g.moveTo(4, -15); g.lineTo(5, -3); g.stroke();
  } else {
    const lA = Math.max(0, sw) * 3, lB = Math.max(0, -sw) * 3;
    g.fillStyle = L.bottom; rr(g, -8, -15, 7, 13 - lA, 2); g.fill(); rr(g, 1, -15, 7, 13 - lB, 2); g.fill();
    g.fillStyle = shoe; ell(g, -4.5, -1.5 - lA, 4.2, 2.6); g.fill(); ell(g, 4.5, -1.5 - lB, 4.2, 2.6); g.fill();
  }

  // badan
  g.fillStyle = L.shirt;
  if (female) { rr(g, -12, -33, 24, 21, 7); g.fill(); }
  else { rr(g, -11, -33, 22, 19, 6); g.fill(); g.fillStyle = shade(L.shirt, -0.1); g.fillRect(-11, -18, 22, 3); }
  // tali beg (depan)
  if (acc.bag && dir === 'down') { g.fillStyle = '#c62828'; g.fillRect(-8, -32, 3, 16); g.fillRect(5, -32, 3, 16); }

  // tangan
  const armY = sw * 2.2;
  g.fillStyle = shade(L.shirt, -0.06);
  if (!side) {
    rr(g, -16, -31 + armY, 6, 14, 3); g.fill(); rr(g, 10, -31 - armY, 6, 14, 3); g.fill();
    g.fillStyle = L.skin; ell(g, -13, -16 + armY, 3, 3); g.fill(); ell(g, 13, -16 - armY, 3, 3); g.fill();
  } else {
    rr(g, -3 + sw * 3, -31, 6, 14, 3); g.fill(); g.fillStyle = L.skin; ell(g, sw * 3, -16, 3, 3); g.fill();
  }

  // kepala
  const hy = -46;
  if (female) drawHijab(g, L, hy, up, side, acc);
  else {
    g.fillStyle = L.skin; ell(g, 0, hy, 14, 14); g.fill();
    g.fillStyle = shade(L.skin, -0.08); ell(g, side ? 2 : -13, hy + 2, 2.5, 3.5); g.fill(); if (!side) { ell(g, 13, hy + 2, 2.5, 3.5); g.fill(); }
    drawHair(g, L, hy, up, side);
    if (acc.kopiah) {
      g.fillStyle = '#fafafa'; rr(g, -12, hy - 16, 24, 9, 3); g.fill();
      g.strokeStyle = '#cfd8dc'; g.lineWidth = 1; g.beginPath(); g.moveTo(-11, hy - 11); g.lineTo(11, hy - 11); g.stroke();
    }
  }
  if (!up) drawFace(g, L, hy, side, acc);
  g.restore();
}

function drawHair(g, L, hy, up, side) {
  const c = L.hairColor;
  g.fillStyle = c;
  if (up) { ell(g, 0, hy - 1, 14.5, 14); g.fill(); return; }
  g.beginPath(); g.arc(0, hy, 14.6, Math.PI * 1.02, Math.PI * 1.98); g.closePath(); g.fill();
  switch (L.hairStyle) {
    case 'pacak':
      for (let i = -2; i <= 2; i++) { g.beginPath(); g.moveTo(i * 5 - 4, hy - 10); g.lineTo(i * 5, hy - 19 + Math.abs(i)); g.lineTo(i * 5 + 4, hy - 10); g.fill(); }
      break;
    case 'kerinting':
      for (let i = 0; i < 7; i++) { const a = Math.PI * (1.05 + i * 0.15); ell(g, Math.cos(a) * 13, hy + Math.sin(a) * 13, 4.5, 4.5); g.fill(); }
      break;
    case 'belah':
      g.beginPath(); g.moveTo(-14, hy - 2); g.quadraticCurveTo(-6, hy - 12, 6, hy - 6); g.quadraticCurveTo(10, hy - 4, 14, hy - 1);
      g.lineTo(14, hy - 6); g.arc(0, hy, 14.6, Math.PI * 1.98, Math.PI * 1.02, true); g.fill();
      g.strokeStyle = shade(c, 0.15); g.lineWidth = 1.2; g.beginPath(); g.moveTo(-3, hy - 14); g.lineTo(-6, hy - 8); g.stroke();
      break;
    default: // pendek
      g.beginPath(); g.moveTo(-14, hy - 2); g.quadraticCurveTo(-7, hy - 6, 0, hy - 5); g.quadraticCurveTo(7, hy - 7, 14, hy - 2); g.lineTo(14, hy - 6);
      g.arc(0, hy, 14.6, Math.PI * 1.98, Math.PI * 1.02, true); g.fill();
  }
  if (side) { g.fillStyle = c; ell(g, -9, hy - 3, 6, 8); g.fill(); }
}

function drawHijab(g, L, hy, up, side, acc) {
  const c = L.hijabColor, dark = shade(c, -0.14), light = shade(c, 0.12);
  const labuh = L.hijabStyle === 'labuh';
  // labuh / jatuh ke dada
  g.fillStyle = dark;
  g.beginPath(); g.moveTo(-17, hy);
  g.quadraticCurveTo(-20, labuh ? hy + 30 : hy + 22, 0, labuh ? hy + 34 : hy + 25);
  g.quadraticCurveTo(20, labuh ? hy + 30 : hy + 22, 17, hy); g.closePath(); g.fill();
  g.fillStyle = c; ell(g, 0, hy - 1, 17, 17); g.fill();
  if (up) { g.fillStyle = dark; g.beginPath(); g.arc(0, hy + 2, 14, 0.2, Math.PI - 0.2); g.fill(); return; }
  // wajah
  const fx = side ? 3 : 0;
  g.fillStyle = L.skin; ell(g, fx, hy + 1, side ? 9.5 : 11, 12); g.fill();
  // lipatan hijab di sekeliling wajah
  g.strokeStyle = light; g.lineWidth = 2.2; ell(g, fx, hy + 1, side ? 10.6 : 12.2, 13.2); g.stroke();
  g.fillStyle = light; g.beginPath(); g.ellipse(fx, hy - 11.5, side ? 8 : 10, 3, 0, Math.PI, 0); g.fill();
  if (acc.bros) { g.fillStyle = '#fff59d'; ell(g, fx + 7, hy + 13, 2.3, 2.3); g.fill(); g.strokeStyle = '#f9a825'; g.lineWidth = 0.8; g.stroke(); }
}

function drawFace(g, L, hy, side, acc) {
  const fx = side ? 4 : 0;
  const eyes = side ? [[fx + 4, hy]] : [[-5, hy], [5, hy]];
  g.fillStyle = '#2b1b12';
  eyes.forEach(([ex, ey]) => { ell(g, ex, ey, 2.1, 2.6); g.fill(); });
  g.fillStyle = '#fff'; eyes.forEach(([ex, ey]) => { ell(g, ex + 0.7, ey - 0.9, 0.7, 0.7); g.fill(); });
  g.fillStyle = 'rgba(244,143,177,.55)';
  (side ? [[fx + 5, hy + 5]] : [[-8, hy + 5], [8, hy + 5]]).forEach(([bx, by]) => { ell(g, bx, by, 2.6, 1.6); g.fill(); });
  g.strokeStyle = '#6d2e1f'; g.lineWidth = 1.3; g.lineCap = 'round';
  g.beginPath(); g.arc(side ? fx + 3 : 0, hy + 5, 3, 0.15 * Math.PI, 0.85 * Math.PI); g.stroke();
  if (acc.glasses) {
    g.strokeStyle = '#263238'; g.lineWidth = 1.1;
    eyes.forEach(([ex, ey]) => { ell(g, ex, ey, 3.8, 3.4); g.stroke(); });
    if (!side) { g.beginPath(); g.moveTo(-1.2, hy); g.lineTo(1.2, hy); g.stroke(); }
  }
}
