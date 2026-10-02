/* Sebutan (Web Speech API) + kesan bunyi (Web Audio) */
'use strict';
const Sound = (() => {
  const LANG_PREF = {
    ms: ['ms-MY', 'ms', 'id-ID', 'id'],      // Bahasa Indonesia sebagai sandaran jika suara Melayu tiada
    en: ['en-GB', 'en-US', 'en'],
    ar: ['ar-SA', 'ar-EG', 'ar'],
  };
  const TAG = { ms: 'ms-MY', en: 'en-GB', ar: 'ar-SA' };
  let voices = [];
  let settings = { voice: true, sfx: true, rate: 0.85 };
  let actx = null;

  function loadVoices() { voices = ('speechSynthesis' in window) ? speechSynthesis.getVoices() : []; }
  if ('speechSynthesis' in window) {
    loadVoices();
    speechSynthesis.addEventListener?.('voiceschanged', loadVoices);
  }

  function pickVoice(lang) {
    const prefs = LANG_PREF[lang] || [lang];
    for (const p of prefs) {
      const lp = p.toLowerCase();
      const exact = voices.filter(v => v.lang.toLowerCase().replace('_', '-') === lp);
      const pool = exact.length ? exact : voices.filter(v => v.lang.toLowerCase().startsWith(lp));
      if (pool.length) return pool.find(v => /google|natural|online/i.test(v.name)) || pool[0];
    }
    return null;
  }

  function voiceStatus() {
    loadVoices();
    return Object.keys(LANG_PREF).map(l => {
      const v = pickVoice(l);
      const fallback = v && l === 'ms' && v.lang.toLowerCase().startsWith('id');
      return { lang: l, ok: !!v, name: v ? v.name : null, fallback };
    });
  }

  function speak(text, lang = 'ms') {
    if (!settings.voice || !('speechSynthesis' in window) || !text) return;
    try {
      speechSynthesis.cancel();
      const u = new SpeechSynthesisUtterance(String(text));
      const v = pickVoice(lang);
      if (v) { u.voice = v; u.lang = v.lang; } else u.lang = TAG[lang] || lang;
      u.rate = settings.rate; u.pitch = 1.05;
      speechSynthesis.speak(u);
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

  return {
    speak, sfx, voiceStatus,
    configure(s) { Object.assign(settings, s); },
    unlock() { ctx(); },
    stop() { if ('speechSynthesis' in window) speechSynthesis.cancel(); },
  };
})();
