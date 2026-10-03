/* Sebutan (Web Speech API) + kesan bunyi (Web Audio) */
'use strict';
const Sound = (() => {
  // Keutamaan suara. BM: Melayu Malaysia dahulu; Indonesia hanya sandaran terakhir jika peranti tiada suara Melayu.
  const PREF = {
    ms: { main: ['ms-MY', 'ms'], name: /malay|melayu/i, fallback: ['id-ID', 'id'] },
    en: { main: ['en-GB', 'en-US', 'en'], name: /english/i, fallback: [] },
    ar: { main: ['ar-SA', 'ar'], name: /arab|عرب/i, fallback: [] },
  };
  const TAG = { ms: 'ms-MY', en: 'en-GB', ar: 'ar-SA' };
  const GOOD = /natural|online|neural|enhanced|premium|google/i;
  let voices = [];
  let settings = { voice: true, sfx: true, rate: 0.85 };
  let actx = null, timer = null;
  const reported = new Set();
  const api = { onIssue: null };

  function loadVoices() { try { voices = ('speechSynthesis' in window) ? speechSynthesis.getVoices() || [] : []; } catch (e) { voices = []; } }
  if ('speechSynthesis' in window) {
    loadVoices();
    if (speechSynthesis.addEventListener) speechSynthesis.addEventListener('voiceschanged', loadVoices);
    else speechSynthesis.onvoiceschanged = loadVoices;
  }

  const vlang = v => (v.lang || '').toLowerCase().replace(/_/g, '-');
  const best = pool => pool.find(v => GOOD.test(v.name)) || pool[0];
  function byLang(codes) {
    for (const c of codes) {
      const lc = c.toLowerCase();
      const exact = voices.filter(v => vlang(v) === lc);
      const pool = exact.length ? exact : voices.filter(v => vlang(v).startsWith(lc));
      if (pool.length) return best(pool);
    }
    return null;
  }
  // Pulangkan { v, fallback } — fallback = suara Indonesia digunakan kerana tiada suara Melayu
  function pickVoice(lang) {
    if (!voices.length) loadVoices();
    const P = PREF[lang] || { main: [lang], fallback: [] };
    const main = byLang(P.main) || (P.name && best(voices.filter(v => P.name.test(v.name))));
    if (main) return { v: main, fallback: false };
    const fb = byLang(P.fallback);
    return fb ? { v: fb, fallback: true } : { v: null, fallback: false };
  }

  function voiceStatus() {
    loadVoices();
    return Object.keys(PREF).map(l => {
      const { v, fallback } = pickVoice(l);
      return { lang: l, ok: !!v, name: v ? v.name : null, fallback };
    });
  }

  function report(lang, kind) {
    const k = lang + ':' + kind; if (reported.has(k)) return;
    reported.add(k); api.onIssue?.(lang, kind);
  }

  /* ---------- teks → sebutan ---------- */
  const D = ['kosong', 'satu', 'dua', 'tiga', 'empat', 'lima', 'enam', 'tujuh', 'lapan', 'sembilan'];
  function numMs(n) {
    if (n < 10) return D[n];
    if (n === 10) return 'sepuluh';
    if (n === 11) return 'sebelas';
    if (n < 20) return D[n - 10] + ' belas';
    if (n < 100) return D[Math.floor(n / 10)] + ' puluh' + (n % 10 ? ' ' + D[n % 10] : '');
    if (n < 1000) { const h = Math.floor(n / 100), r = n % 100; return (h === 1 ? 'seratus' : D[h] + ' ratus') + (r ? ' ' + numMs(r) : ''); }
    if (n < 1e6) { const t = Math.floor(n / 1000), r = n % 1000; return (t === 1 ? 'seribu' : numMs(t) + ' ribu') + (r ? ' ' + numMs(r) : ''); }
    return String(n);
  }
  // Nombor & simbol matematik dibaca dalam BM Malaysia (cth. 8 = "lapan", bukan "delapan")
  function malayText(t) {
    return t.replace(/RM\s?(\d+(?:\.\d+)?)/gi, '$1 ringgit')
      .replace(/(\d)\s*\+\s*(?=\d)/g, '$1 tambah ').replace(/(\d)\s*[−–-]\s*(?=\d)/g, '$1 tolak ')
      .replace(/(\d)\s*×\s*(?=\d)/g, '$1 darab ').replace(/(\d)\s*÷\s*(?=\d)/g, '$1 bahagi ')
      .replace(/\s*=\s*/g, ' sama dengan ')
      .replace(/\d+(?:\.\d+)?/g, s => { const [a, b] = s.split('.'); return numMs(+a) + (b ? ' perpuluhan ' + [...b].map(d => D[+d]).join(' ') : ''); });
  }
  const HAS_WORD = /[\p{L}\p{N}]/u;
  const CONSONANT = /^[b-df-hj-np-tv-z]$/i;
  // Pecahkan teks kepada [teks, bahasa]. Dalam BM, huruf konsonan tunggal disebut ikut nama huruf
  // Malaysia (H = "eic", Z = "zed") menggunakan suara English, bukan cara Indonesia ("ha", "zet").
  // Huruf vokal a, e, i, o, u kekal bunyi BM.
  function pieces(text, lang) {
    text = String(text);
    if (lang === 'en' && /^\s*[a-z]\s*$/i.test(text)) return [[text.trim().toUpperCase(), 'en']];
    if (lang !== 'ms') return [[text, lang]];
    const out = [];
    malayText(text).split(/(\s+|[,.;:!?·()"'“”])/).forEach(tok => {
      if (!tok) return;
      const last = out[out.length - 1];
      if (!HAS_WORD.test(tok)) { if (last) last[0] += tok; return; }
      const l = CONSONANT.test(tok) ? 'en' : 'ms', t = l === 'en' ? tok.toUpperCase() : tok;
      if (last && last[1] === l) last[0] += t; else out.push([t, l]);
    });
    return out;
  }

  function utterance(text, lang) {
    const { v, fallback } = pickVoice(lang);
    if (!v && voices.length) { report(lang, 'missing'); return null; }   // jangan baca dengan suara bahasa lain
    if (fallback) report(lang, 'fallback');
    const u = new SpeechSynthesisUtterance(text);
    if (v) { u.voice = v; u.lang = v.lang; } else u.lang = TAG[lang] || lang;
    u.rate = settings.rate; u.pitch = 1.05;
    return u;
  }

  function stop() {
    clearTimeout(timer); timer = null;
    if ('speechSynthesis' in window) try { speechSynthesis.cancel(); } catch (e) { }
  }

  function speak(text, lang = 'ms') {
    if (!settings.voice || !('speechSynthesis' in window) || text == null || text === '') return;
    try {
      stop();
      const list = pieces(text, lang).map(([t, l]) => utterance(t, l) || (l === 'en' && lang === 'ms' ? utterance(t.toLowerCase(), 'ms') : null)).filter(Boolean);
      if (!list.length) return;
      // Chrome kadang-kadang abaikan speak() yang dipanggil serta-merta selepas cancel(), jadi beri jeda kecil
      timer = setTimeout(() => { timer = null; list.forEach(u => { try { speechSynthesis.speak(u); } catch (e) { } }); }, 60);
    } catch (e) { /* abaikan */ }
  }

  function ctx() {
    if (!actx) { const AC = window.AudioContext || window.webkitAudioContext; if (AC) actx = new AC(); }
    if (actx && actx.state === 'suspended') actx.resume();
    return actx;
  }
  function tone(freq, dur, type = 'sine', vol = 0.15, delay = 0, slide = 0) {
    const a = ctx(); if (!a) return;
    const t = a.currentTime + delay;
    const o = a.createOscillator(), g = a.createGain();
    o.type = type; o.frequency.setValueAtTime(freq, t);
    if (slide) o.frequency.exponentialRampToValueAtTime(Math.max(40, freq + slide), t + dur);
    g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(vol, t + 0.015);
    g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    o.connect(g).connect(a.destination); o.start(t); o.stop(t + dur + 0.05);
  }
  const FX = {
    tap: () => tone(660, 0.07, 'triangle', 0.08),
    link: () => { tone(520, 0.08, 'triangle', 0.1); tone(780, 0.1, 'triangle', 0.1, 0.06); },
    drop: () => tone(440, 0.09, 'square', 0.05, 0, 220),
    good: () => [523, 659, 784].forEach((f, i) => tone(f, 0.16, 'triangle', 0.14, i * 0.09)),
    bad: () => { tone(260, 0.18, 'sawtooth', 0.07, 0, -80); tone(200, 0.22, 'sawtooth', 0.07, 0.12, -60); },
    hit: () => { tone(180, 0.15, 'square', 0.12, 0, -120); tone(90, 0.25, 'sawtooth', 0.1, 0.05, -40); },
    hurt: () => tone(140, 0.3, 'sawtooth', 0.12, 0, -70),
    win: () => [523, 659, 784, 1046, 784, 1046].forEach((f, i) => tone(f, 0.22, 'triangle', 0.14, i * 0.12)),
    open: () => { tone(392, 0.1, 'triangle', 0.1); tone(523, 0.12, 'triangle', 0.1, 0.08); tone(659, 0.16, 'triangle', 0.1, 0.16); },
    step: () => tone(120 + Math.random() * 30, 0.04, 'triangle', 0.03),
  };
  function sfx(name) { if (settings.sfx && FX[name]) try { FX[name](); } catch (e) { } }

  return Object.assign(api, {
    speak, sfx, voiceStatus, stop,
    configure(s) { Object.assign(settings, s); },
    unlock() {
      ctx(); loadVoices();
      // iOS: ucapan pertama mesti bermula dalam sentuhan pengguna
      try { const u = new SpeechSynthesisUtterance(' '); u.volume = 0; speechSynthesis.speak(u); } catch (e) { }
    },
  });
})();
