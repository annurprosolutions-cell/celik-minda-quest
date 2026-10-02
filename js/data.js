/* Celik Minda Quest — kandungan pembelajaran & kuiz.
   Corak soalan mengikut kertas Ujian Celik Minda PASTI & Latihan Little Steps Mumtaz (SET 1–4).
   Pembetulan daripada review PDF:
   - 6T SET 3 S2: huruf "labu" kini l,c,u,a,b (PDF tersilap tulis "i").
   - 5T SET 1 S5, 5T SET 2 S5, 5T SET 4 S5, 6T SET 2 S5: item yang sepatutnya bergambar diberi gambar.
   - 6T SET 4 S10B: zebra diganti katak (status zebra boleh dipertikaikan dalam fiqh).
   - 6T SET 3 S5: "papan putih" -> papan hitam (ikut gambar). */
'use strict';

const S = i => `<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">${i}</svg>`;
const SVG_ICON = {
  meja: S('<rect x="6" y="18" width="52" height="9" rx="3" fill="#c98b52"/><rect x="11" y="27" width="6" height="28" rx="2" fill="#9a6235"/><rect x="47" y="27" width="6" height="28" rx="2" fill="#9a6235"/>'),
  laci: S('<rect x="12" y="6" width="40" height="52" rx="4" fill="#b9814e"/><rect x="16" y="11" width="32" height="13" rx="2" fill="#e1a96f"/><rect x="16" y="27" width="32" height="13" rx="2" fill="#e1a96f"/><rect x="16" y="43" width="32" height="11" rx="2" fill="#e1a96f"/><circle cx="32" cy="17.5" r="2" fill="#6b4220"/><circle cx="32" cy="33.5" r="2" fill="#6b4220"/><circle cx="32" cy="48.5" r="2" fill="#6b4220"/>'),
  tali: S('<g fill="none" stroke="#b08850" stroke-width="5"><ellipse cx="32" cy="34" rx="24" ry="14"/><ellipse cx="32" cy="34" rx="16" ry="9"/><ellipse cx="32" cy="34" rx="8" ry="4"/><path d="M54 36 q6 8 2 16"/></g>'),
  paku: S('<g stroke="#7d8790" stroke-width="5" stroke-linecap="round"><line x1="18" y1="12" x2="28" y2="56"/><line x1="40" y1="12" x2="46" y2="56"/></g><rect x="9" y="7" width="18" height="6" rx="2" fill="#5c656d"/><rect x="32" y="7" width="18" height="6" rx="2" fill="#5c656d"/>'),
  titi: S('<path d="M4 44 Q32 18 60 44" fill="none" stroke="#8a5a30" stroke-width="5"/><g stroke="#c98b52" stroke-width="6"><line x1="10" y1="40" x2="10" y2="50"/><line x1="20" y1="33" x2="20" y2="43"/><line x1="32" y1="30" x2="32" y2="40"/><line x1="44" y1="33" x2="44" y2="43"/><line x1="54" y1="40" x2="54" y2="50"/></g><path d="M4 50 Q32 26 60 50" fill="none" stroke="#8a5a30" stroke-width="4"/>'),
  guli: S('<circle cx="22" cy="38" r="14" fill="#7ec8e3"/><path d="M12 34 q10 -8 20 4" stroke="#1d6fa3" stroke-width="3" fill="none"/><circle cx="42" cy="30" r="14" fill="#f6a5c0"/><path d="M32 28 q10 10 20 0" stroke="#c2185b" stroke-width="3" fill="none"/><circle cx="18" cy="33" r="3" fill="#fff" opacity=".8"/><circle cx="38" cy="25" r="3" fill="#fff" opacity=".8"/>'),
  bubu: S('<path d="M6 22 L58 30 L58 40 L6 46 Z" fill="#d8b878" stroke="#8a6a30" stroke-width="2"/><g stroke="#8a6a30" stroke-width="2"><line x1="16" y1="24" x2="16" y2="45"/><line x1="26" y1="25" x2="26" y2="44"/><line x1="36" y1="27" x2="36" y2="43"/><line x1="46" y1="28" x2="46" y2="42"/></g><ellipse cx="6" cy="34" rx="4" ry="12" fill="#8a6a30"/>'),
  jala: S('<path d="M32 6 L6 56 L58 56 Z" fill="#f2e6c9" stroke="#7a6a50" stroke-width="2"/><g stroke="#7a6a50" stroke-width="1.5"><line x1="32" y1="6" x2="19" y2="56"/><line x1="32" y1="6" x2="32" y2="56"/><line x1="32" y1="6" x2="45" y2="56"/><line x1="19" y1="31" x2="45" y2="31"/><line x1="13" y1="44" x2="51" y2="44"/></g><circle cx="32" cy="6" r="3" fill="#7a6a50"/>'),
  atap: S('<path d="M4 30 L32 8 L60 30 Z" fill="#c9a25a" stroke="#7a5a20" stroke-width="2"/><g stroke="#7a5a20" stroke-width="1.5"><line x1="14" y1="22" x2="50" y2="22"/><line x1="22" y1="16" x2="42" y2="16"/></g><rect x="12" y="30" width="40" height="24" fill="#e8d2a8"/><rect x="14" y="30" width="4" height="24" fill="#8a6a30"/><rect x="46" y="30" width="4" height="24" fill="#8a6a30"/><path d="M58 2 L44 14" stroke="#e53935" stroke-width="3"/><path d="M42 16 l2 -8 l6 6 z" fill="#e53935"/>'),
  wisel: S('<rect x="8" y="26" width="34" height="18" rx="9" fill="#90a4ae"/><circle cx="40" cy="36" r="13" fill="#b0bec5"/><rect x="12" y="29" width="10" height="5" fill="#455a64"/><path d="M48 24 q8 -12 0 -18" stroke="#e57373" stroke-width="3" fill="none"/>'),
  kipas: S('<circle cx="32" cy="24" r="18" fill="#e3f2fd" stroke="#546e7a" stroke-width="3"/><g stroke="#90a4ae" stroke-width="1.5"><line x1="14" y1="24" x2="50" y2="24"/><line x1="32" y1="6" x2="32" y2="42"/><line x1="19" y1="11" x2="45" y2="37"/><line x1="45" y1="11" x2="19" y2="37"/></g><circle cx="32" cy="24" r="4" fill="#546e7a"/><rect x="29" y="42" width="6" height="12" fill="#546e7a"/><rect x="18" y="54" width="28" height="5" rx="2" fill="#546e7a"/>'),
  ciku: S('<ellipse cx="32" cy="36" rx="20" ry="18" fill="#9c6b3c"/><ellipse cx="25" cy="30" rx="5" ry="3" fill="#c49060" opacity=".7"/><path d="M32 18 q2 -8 8 -10" stroke="#5d4037" stroke-width="3" fill="none"/><path d="M36 12 q8 -4 12 2 q-8 4 -12 -2z" fill="#66bb6a"/>'),
  'papan hitam': S('<rect x="4" y="10" width="56" height="40" rx="2" fill="#8d6e63"/><rect x="8" y="14" width="48" height="32" fill="#2e4d3a"/><path d="M14 22 h14 M14 30 h22" stroke="#e0f2f1" stroke-width="2" opacity=".7"/><rect x="40" y="44" width="10" height="3" fill="#fff"/>'),
  tikar: S('<path d="M14 14 H60 L50 50 H4 Z" fill="#d7b26e"/><g stroke="#a67c32" stroke-width="2"><line x1="22" y1="14" x2="12" y2="50"/><line x1="31" y1="14" x2="21" y2="50"/><line x1="40" y1="14" x2="30" y2="50"/><line x1="49" y1="14" x2="39" y2="50"/><line x1="12" y1="26" x2="57" y2="26"/><line x1="9" y1="38" x2="54" y2="38"/></g>'),
  misai: S('<path d="M32 30 C26 24 14 24 8 34 C14 32 20 36 26 36 C29 36 31 34 32 33 C33 34 35 36 38 36 C44 36 50 32 56 34 C50 24 38 24 32 30 Z" fill="#4e342e"/>'),
  duri: S('<path d="M32 60 L32 8" stroke="#6d4c41" stroke-width="4"/><g fill="#6d4c41"><path d="M32 20 l-9 -4 l9 0z"/><path d="M32 30 l9 -4 l-9 0z"/><path d="M32 40 l-9 -4 l9 0z"/><path d="M32 50 l9 -4 l-9 0z"/></g><path d="M32 14 q14 -10 22 0 q-12 8 -22 0z" fill="#66bb6a"/><path d="M32 34 q-14 -8 -22 2 q12 6 22 -2z" fill="#66bb6a"/>'),
  jubah: S('<path d="M24 6 h16 l4 6 l10 8 l-4 8 l-4 -3 l0 35 h-28 l0 -35 l-4 3 l-4 -8 l10 -8 z" fill="#eceff1" stroke="#90a4ae" stroke-width="2"/><line x1="32" y1="10" x2="32" y2="26" stroke="#90a4ae" stroke-width="2"/>'),
  pagar: S('<g fill="#8d6e63"><rect x="4" y="12" width="6" height="46"/><rect x="54" y="12" width="6" height="46"/></g><g stroke="#5d4037" stroke-width="3"><line x1="16" y1="16" x2="16" y2="56"/><line x1="24" y1="14" x2="24" y2="56"/><line x1="32" y1="13" x2="32" y2="56"/><line x1="40" y1="14" x2="40" y2="56"/><line x1="48" y1="16" x2="48" y2="56"/><line x1="12" y1="24" x2="52" y2="24"/><line x1="12" y1="48" x2="52" y2="48"/></g>'),
  pam: S('<rect x="28" y="14" width="8" height="40" fill="#78909c"/><rect x="16" y="8" width="32" height="6" rx="3" fill="#455a64"/><rect x="18" y="54" width="28" height="5" rx="2" fill="#455a64"/><path d="M36 46 q14 0 16 10" stroke="#263238" stroke-width="3" fill="none"/>'),
  akar: S('<rect width="64" height="20" fill="#a5d6a7"/><rect y="20" width="64" height="44" fill="#a1887f"/><path d="M32 4 V28 M32 28 L18 50 M32 28 L44 52 M32 34 L28 58 M24 40 L12 44 M40 42 L54 46" stroke="#5d4037" stroke-width="3" fill="none" stroke-linecap="round"/>'),
  durian: S('<ellipse cx="32" cy="36" rx="22" ry="20" fill="#9ccc65"/><g fill="#689f38"><path d="M20 26 l3 -6 l3 6z"/><path d="M32 22 l3 -6 l3 6z"/><path d="M42 28 l3 -6 l3 6z"/><path d="M16 40 l3 -6 l3 6z"/><path d="M28 36 l3 -6 l3 6z"/><path d="M40 42 l3 -6 l3 6z"/><path d="M24 48 l3 -6 l3 6z"/></g><path d="M32 16 v-8" stroke="#5d4037" stroke-width="4"/>'),
  pemadam: S('<g transform="rotate(-12 32 33)"><rect x="10" y="22" width="44" height="22" rx="4" fill="#f48fb1"/><rect x="10" y="22" width="16" height="22" rx="4" fill="#90caf9"/></g>'),
  obor: S('<path d="M26 30 h12 l-3 28 h-6z" fill="#8d6e63"/><rect x="23" y="26" width="18" height="6" rx="2" fill="#5d4037"/><path d="M32 4 C40 12 44 18 38 26 H26 C20 18 26 12 32 4Z" fill="#ff7043"/><path d="M32 12 C36 16 38 20 35 26 H29 C26 20 28 16 32 12Z" fill="#ffd54f"/>'),
};

const ICON = Object.assign({
  awan: '☁️', epal: '🍎', ikan: '🐟', orang: '🧍', ulat: '🐛', baju: '👕', buku: '📕', penyapu: '🧹', susu: '🥛',
  rusa: '🦌', roti: '🍞', mata: '👁️', kereta: '🚗', kaki: '🦶', gajah: '🐘', seluar: '👖', kakak: '🧕', pisang: '🍌',
  mangga: '🥭', jaring: '🥅', potong: '🔪', tin: '🥫', matahari: '☀️', kuda: '🐴', bola: '⚽', rumah: '🏠', topi: '👒',
  cawan: '☕', keretapi: '🚂', bulan: '🌙', burung: '🐦', helikopter: '🚁', kapal: '🚢', lori: '🚚', udara: '🌬️',
  air: '🌊', darat: '🛣️', bibir: '👄', lipas: '🪳', luka: '🩹', ubat: '💊', ayam: '🐔', duduk: '🧘', gigi: '🦷',
  semut: '🐜', van: '🚐', 'layang-layang': '🪁', tikus: '🐭', kek: '🍰', aiskrim: '🍦', pasu: '🪴', badak: '🦛',
  bukit: '⛰️', udang: '🦐', cili: '🌶️', ular: '🐍', penyu: '🐢', sotong: '🐙', ketam: '🦀', arnab: '🐇', lobak: '🥕',
  'pokok pisang': '🌴', strawberi: '🍓', 'pokok strawberi': '🌱', 'labah-labah': '🕷️', sarang: '🕸️', harimau: '🐅',
  daging: '🥩', batu: '🪨', siku: '💪', labu: '🎃', sudu: '🥄', abang: '👦', ibu: '🧕', bapa: '👨', telur: '🥚',
  pen: '🖊️', zebra: '🦓', jam: '⏰', nuri: '🦜', lidah: '👅', hidung: '👃', bunga: '🌹', bulu: '🪶', lalat: '🪰',
  siput: '🐌', tupai: '🐿️', rambut: '💇', biskut: '🍪', membaca: '📖', kunci: '🔑', kotak: '📦', kacang: '🥜',
  itik: '🦆', tayar: '🛞', jari: '☝️', pokok: '🌳', dadu: '🎲', radio: '📻', televisyen: '📺', telinga: '👂',
  kulit: '✋', anjing: '🐕', singa: '🦁', lembu: '🐄', kedai: '🏪', masjid: '🕌', beg: '🎒', pensel: '✏️',
  bintang: '⭐', jagung: '🌽', nasi: '🍚', ceri: '🍒', ubi: '🍠', stoking: '🧦', komputer: '💻', lampu: '💡',
  kerusi: '🪑', 'tong sampah': '🗑️', basikal: '🚲', 'bunga raya': '🌺', 'pokok kelapa': '🌴', teko: '🫖',
  'jam tangan': '⌚', bakul: '🧺', adik: '👧', 'ibu dan bayi': '👩‍🍼', oren: '🍊', 'dua mata': '👀', pelampung: '🛟',
  raga: '🧺', budak: '🧑', daun: '🍃', cuka: '🍶', padi: '🌾', jarum: '🪡', gitar: '🎸', loceng: '🔔', baldi: '🪣',
  keldai: '🫏', tomato: '🍅', katak: '🐸', 'telur goreng': '🍳', lempeng: '🥞', jag: '🫗', 'bola keranjang': '🏀',
  tisu: '🧻', guru: '👩‍🏫', kasut: '👟', tulang: '🦴', saku: '👖',
}, SVG_ICON);

const SUBJECTS = {
  BM: { name: 'Bahasa Melayu', lang: 'ms', color: '#ff7a59', icon: '📘' },
  BA: { name: 'Bahasa Arab', lang: 'ar', color: '#16a394', icon: '🕌' },
  BI: { name: 'Bahasa Inggeris', lang: 'en', color: '#5c6bc0', icon: '🔤' },
  JW: { name: 'Jawi', lang: 'ms', color: '#8d6e63', icon: '✒️' },
  MT: { name: 'Matematik', lang: 'ms', color: '#f5a300', icon: '🔢' },
  SN: { name: 'Sains', lang: 'ms', color: '#3f9b46', icon: '🔬' },
};

/* ---------- pembantu ---------- */
const P = (p, o) => Object.assign({ p }, o);          // gambar (nama ikon = sebutan Melayu)
const T = (t, o) => Object.assign({ t }, o);          // teks
const J = (t, r) => ({ t, r });                       // tulisan Jawi + rumi (untuk sebutan)
const L = t => ({ t, letter: true });                 // huruf (fon literasi)
const E = (e, w) => ({ e, w });                       // emoji berbilang (kiraan)
const rep = (e, n) => Array(n).fill(e).join('');
const C = (v, t, say, s, lang) => ({ v, t, say, s, lang }); // kad pembelajaran

/* =====================================================================
   MODUL PEMBELAJARAN
   ===================================================================== */
const LESSONS = {
  5: [
    { id: 'bm1', s: 'BM', title: 'Huruf Vokal', desc: 'a, e, i, o, u', cards: [
      C(P('awan'), 'a', 'a. awan', 'a untuk awan'), C(P('epal'), 'e', 'e. epal', 'e untuk epal'),
      C(P('ikan'), 'i', 'i. ikan', 'i untuk ikan'), C(P('obor'), 'o', 'o. obor', 'o untuk obor'),
      C(P('ulat'), 'u', 'u. ulat', 'u untuk ulat'), C(T('6'), 'e', 'e. enam', 'e untuk enam')] },
    { id: 'bm2', s: 'BM', title: 'Huruf Kecil & Besar', desc: 'b–B, d–D, p–P …', cards:
      ['b', 'd', 'g', 'h', 'k', 'm', 'p', 'q', 't', 'f', 'r', 'e', 'j'].map(c =>
        C(L(c.toUpperCase() + ' ' + c), c, 'huruf ' + c, 'Besar ' + c.toUpperCase() + ' · kecil ' + c)) },
    { id: 'bm3', s: 'BM', title: 'Suku Kata & Perkataan', desc: 'ba-ju, bu-ku, ro-ti', cards: [
      ['baju', 'ba-ju'], ['buku', 'bu-ku'], ['roti', 'ro-ti'], ['meja', 'me-ja'], ['kaki', 'ka-ki'], ['susu', 'su-su'],
      ['tali', 'ta-li'], ['bibir', 'bi-bir'], ['luka', 'lu-ka'], ['lipas', 'li-pas'], ['batu', 'ba-tu'], ['siku', 'si-ku'],
      ['labu', 'la-bu'], ['sudu', 'su-du'], ['lalat', 'la-lat'], ['siput', 'si-put'], ['tikus', 'ti-kus'], ['tupai', 'tu-pai'],
      ['awan', 'a-wan'], ['epal', 'e-pal'], ['atap', 'a-tap'], ['ulat', 'u-lat'], ['ayam', 'a-yam'], ['laci', 'la-ci'],
      ['bola', 'bo-la'], ['ubat', 'u-bat'], ['titi', 'ti-ti'], ['guli', 'gu-li'], ['bubu', 'bu-bu']]
      .map(([w, sk]) => C(P(w), w, sk.replace('-', ', ') + '. ' + w, sk)) },
    { id: 'ba1', s: 'BA', title: 'Kosa Kata Arab', desc: 'Benda, haiwan & warna', cards: [
      C(P('gajah'), 'فِيلٌ', 'فِيلٌ', 'gajah', 'ar'), C(P('seluar'), 'سِرْوَالٌ', 'سِرْوَالٌ', 'seluar', 'ar'),
      C({ sw: '#e53935', w: 'merah' }, 'أَحْمَرُ', 'أَحْمَرُ', 'merah', 'ar'), C({ sw: '#212121', w: 'hitam' }, 'أَسْوَدُ', 'أَسْوَدُ', 'hitam', 'ar'),
      C(P('pisang'), 'مَوْزٌ', 'مَوْزٌ', 'pisang', 'ar'), C(P('buku'), 'كِتَابٌ', 'كِتَابٌ', 'buku', 'ar'),
      C(P('gigi'), 'سِنٌّ', 'سِنٌّ', 'gigi', 'ar'), C(P('papan hitam'), 'سَبُّورَةٌ', 'سَبُّورَةٌ', 'papan hitam', 'ar'),
      C(P('rambut'), 'شَعْرٌ', 'شَعْرٌ', 'rambut', 'ar'), C(P('biskut'), 'بِسْكُوِيتٌ', 'بِسْكُوِيتٌ', 'biskut', 'ar'),
      C(P('duduk'), 'جَلَسَ', 'جَلَسَ', 'duduk', 'ar'), C(P('membaca'), 'قَرَأَ', 'قَرَأَ', 'membaca', 'ar')] },
    { id: 'ba2', s: 'BA', title: 'Keluarga & Nombor Arab', desc: 'أُمٌّ، أَبٌ، ثَلَاثَةٌ', cards: [
      C(P('ibu'), 'أُمٌّ', 'أُمٌّ', 'ibu', 'ar'), C(P('bapa'), 'أَبٌ', 'أَبٌ', 'bapa', 'ar'), C(P('abang'), 'أَخٌ', 'أَخٌ', 'abang', 'ar'),
      C(P('kakak'), 'أُخْتٌ', 'أُخْتٌ', 'kakak', 'ar'), C(T('٣'), 'ثَلَاثَةٌ', 'ثَلَاثَةٌ', 'tiga (3)', 'ar'),
      C(T('٥'), 'خَمْسَةٌ', 'خَمْسَةٌ', 'lima (5)', 'ar'), C(T('٦'), 'سِتَّةٌ', 'سِتَّةٌ', 'enam (6)', 'ar'),
      C(T('٨'), 'ثَمَانِيَةٌ', 'ثَمَانِيَةٌ', 'lapan (8)', 'ar')] },
    { id: 'bi1', s: 'BI', title: 'English Words', desc: 'net, fan, sun, cake …', cards: [
      ['jaring', 'net'], ['potong', 'cut'], ['kipas', 'fan'], ['tin', 'tin'], ['matahari', 'sun'], ['semut', 'ant'], ['van', 'van'],
      ['layang-layang', 'kite'], ['tikus', 'rat'], ['kek', 'cake'], ['topi', 'hat'], ['epal', 'apple'], ['telur', 'egg'],
      ['arnab', 'rabbit'], ['pen', 'pen'], ['kereta', 'car'], ['kunci', 'key'], ['kotak', 'box'], ['tikar', 'mat']]
      .map(([m, e]) => C(P(m), e, e, m, 'en')) },
    { id: 'jw1', s: 'JW', title: 'Huruf Jawi', desc: 'ا ب ت ج چ …', cards: [
      ['ا', 'alif'], ['ب', 'ba'], ['ت', 'ta'], ['ج', 'jim'], ['چ', 'ca'], ['خ', 'kho'], ['د', 'dal'], ['ذ', 'zal'], ['س', 'sin'],
      ['ظ', 'zo'], ['غ', 'ghain'], ['ڤ', 'pa'], ['ق', 'qaf'], ['ک', 'kaf'], ['ݢ', 'ga'], ['ل', 'lam'], ['م', 'mim'],
      ['ن', 'nun'], ['و', 'wau'], ['ي', 'ya']].map(([j, n]) => C(T(j), n, n, 'huruf ' + n)) },
    { id: 'jw2', s: 'JW', title: 'Perkataan Jawi', desc: 'رومه، ايکن، سوسو', cards: [
      ['rumah', 'رومه'], ['ikan', 'ايکن'], ['meja', 'ميجا'], ['topi', 'توڤي'], ['susu', 'سوسو'], ['buku', 'بوکو'],
      ['baju', 'باجو'], ['kuda', 'كودا'], ['bola', 'بولا'], ['mata', 'ماتا'], ['tali', 'تالي'], ['dadu', 'دادو'],
      ['rumah', 'رومه'], ['cili', 'چيلي'], ['ciku', 'چيكو']].filter((x, i, a) => a.findIndex(y => y[1] === x[1]) === i)
      .map(([w, j]) => C(P(w), j, w, w)) },
    { id: 'mt1', s: 'MT', title: 'Nombor & Kira', desc: '1–10, tambah, tolak', cards: [
      ...['satu', 'dua', 'tiga', 'empat', 'lima', 'enam', 'tujuh', 'lapan', 'sembilan', 'sepuluh']
        .map((n, i) => C(E(rep('⭐', i + 1), n), String(i + 1), n, n)),
      C(E('🌙🌙🌙 + 🌙🌙', 'tambah'), '3 + 2 = 5', 'tiga tambah dua sama dengan lima', 'Tambah'),
      C(E('🍦🍦🍦🍦 − 🍦🍦', 'tolak'), '4 − 2 = 2', 'empat tolak dua sama dengan dua', 'Tolak'),
      C(T('10 → 20 → 30 → 40'), 'Turutan', 'sepuluh, dua puluh, tiga puluh, empat puluh', 'Nombor menaik')] },
    { id: 'sn1', s: 'SN', title: 'Sains di Sekelilingku', desc: 'Darat, air, udara, deria', cards: [
      C(P('kapal'), 'air', 'kapal bergerak di air', 'Kapal → air'), C(P('lori'), 'darat', 'lori bergerak di darat', 'Lori → darat'),
      C(P('helikopter'), 'udara', 'helikopter terbang di udara', 'Helikopter → udara'),
      C(P('dua mata'), 'lihat', 'mata untuk melihat', 'Mata → melihat'), C(P('telinga'), 'dengar', 'telinga untuk mendengar', 'Telinga → mendengar'),
      C(P('hidung'), 'hidu', 'hidung untuk menghidu', 'Hidung → menghidu bunga'), C(P('lidah'), 'rasa', 'lidah untuk merasa', 'Lidah → merasa aiskrim'),
      C(P('kulit'), 'sentuh', 'kulit untuk menyentuh', 'Kulit → menyentuh bulu'),
      C(P('bulu'), 'terapung', 'bulu terapung', 'Bulu → terapung'), C(P('paku'), 'tenggelam', 'paku tenggelam', 'Paku → tenggelam'),
      C(P('arnab'), 'lobak', 'arnab makan lobak', 'Arnab → lobak'), C(P('harimau'), 'daging', 'harimau makan daging', 'Harimau → daging')] },
  ],
  6: [
    { id: 'bm1', s: 'BM', title: 'Huruf Kecil & Besar', desc: 'Termasuk l–L dan i–I', cards:
      ['a', 'b', 'd', 'e', 'f', 'g', 'i', 'j', 'k', 'l', 'm', 'q', 'r', 't'].map(c =>
        C(L(c.toUpperCase() + ' ' + c), c, 'huruf ' + c, 'Besar ' + c.toUpperCase() + ' · kecil ' + c)) },
    { id: 'bm2', s: 'BM', title: 'Suku Kata & Perkataan', desc: 'na-si, ce-ri, du-ri …', cards: [
      ['buku', 'bu-ku'], ['roti', 'ro-ti'], ['nasi', 'na-si'], ['batu', 'ba-tu'], ['ceri', 'ce-ri'], ['duri', 'du-ri'],
      ['siku', 'si-ku'], ['wisel', 'wi-sel'], ['kotak', 'ko-tak'], ['kipas', 'ki-pas'], ['daun', 'da-un'], ['jarum', 'ja-rum'],
      ['gitar', 'gi-tar'], ['raga', 'ra-ga'], ['misai', 'mi-sai'], ['nuri', 'nu-ri'], ['cuka', 'cu-ka'], ['padi', 'pa-di'],
      ['gigi', 'gi-gi'], ['jubah', 'ju-bah'], ['burung', 'bu-rung'], ['paku', 'pa-ku']]
      .map(([w, sk]) => C(P(w), w, sk.replace('-', ', ') + '. ' + w, sk)) },
    { id: 'bm3', s: 'BM', title: 'Membina Ayat', desc: 'Abu beli bola.', cards: [
      ['bola', 'Abu beli bola.'], ['ikan', 'Ini ikan emas.'], ['baju', 'Liza cuci baju.'], ['jam', 'Jam itu cantik.'],
      ['paku', 'Paku itu tajam.'], ['gajah', 'Badan gajah besar.'], ['kek', 'Kek itu manis.'], ['jala', 'Ali jala ikan.'],
      ['rumah', 'Rumah saya cantik.'], ['nasi', 'Adik makan nasi.'], ['teko', 'Itu teko ibu.']]
      .map(([w, a]) => C(P(w), a, a, w)) },
    { id: 'ba1', s: 'BA', title: 'Anggota Badan (Arab)', desc: 'عَيْنٌ، أَنْفٌ، أُذُنٌ', cards: [
      C(P('mata'), 'عَيْنٌ', 'عَيْنٌ', 'mata', 'ar'), C(P('hidung'), 'أَنْفٌ', 'أَنْفٌ', 'hidung', 'ar'),
      C(P('telinga'), 'أُذُنٌ', 'أُذُنٌ', 'telinga', 'ar'), C(P('rambut'), 'شَعْرٌ', 'شَعْرٌ', 'rambut', 'ar'),
      C(P('gigi'), 'سِنٌّ', 'سِنٌّ', 'gigi', 'ar'), C(P('lidah'), 'لِسَانٌ', 'لِسَانٌ', 'lidah', 'ar'),
      C(P('kulit'), 'يَدٌ', 'يَدٌ', 'tangan', 'ar')] },
    { id: 'ba2', s: 'BA', title: 'Benda, Nombor & Perbuatan', desc: 'جَوْرَبٌ، شَجَرَةٌ، سَبْعَةٌ', cards: [
      C(P('stoking'), 'جَوْرَبٌ', 'جَوْرَبٌ', 'stoking', 'ar'), C(P('kasut'), 'حِذَاءٌ', 'حِذَاءٌ', 'kasut', 'ar'),
      C(P('pokok'), 'شَجَرَةٌ', 'شَجَرَةٌ', 'pokok', 'ar'), C(P('matahari'), 'شَمْسٌ', 'شَمْسٌ', 'matahari', 'ar'),
      C(P('kereta'), 'سَيَّارَةٌ', 'سَيَّارَةٌ', 'kereta', 'ar'), C(P('papan hitam'), 'سَبُّورَةٌ', 'سَبُّورَةٌ', 'papan hitam', 'ar'),
      C(P('biskut'), 'بِسْكُوِيتٌ', 'بِسْكُوِيتٌ', 'biskut', 'ar'), C(P('membaca'), 'قَرَأَ', 'قَرَأَ', 'membaca', 'ar'),
      C(T('٦'), 'سِتَّةٌ', 'سِتَّةٌ', 'enam (6)', 'ar'), C(T('٧'), 'سَبْعَةٌ', 'سَبْعَةٌ', 'tujuh (7)', 'ar'),
      C(T('٨'), 'ثَمَانِيَةٌ', 'ثَمَانِيَةٌ', 'lapan (8)', 'ar'), C(P('susu'), 'لَبَنٌ', 'لَبَنٌ', 'susu', 'ar'),
      C(P('baju'), 'قَمِيصٌ', 'قَمِيصٌ', 'baju', 'ar'), C(P('singa'), 'أَسَدٌ', 'أَسَدٌ', 'singa', 'ar'),
      C(P('pensel'), 'رَسَمَ', 'رَسَمَ', 'melukis', 'ar'), C(P('kakak'), 'جَدَّةٌ', 'جَدَّةٌ', 'nenek', 'ar')] },
    { id: 'bi1', s: 'BI', title: 'Numbers & Words', desc: 'one … twelve, bell, hair', cards: [
      C(T('1'), 'one', 'one', 'satu', 'en'), C(T('4'), 'four', 'four', 'empat', 'en'), C(T('7'), 'seven', 'seven', 'tujuh', 'en'),
      C(T('9'), 'nine', 'nine', 'sembilan', 'en'), C(T('12'), 'twelve', 'twelve', 'dua belas', 'en'),
      ...[['bola', 'ball'], ['paku', 'nail'], ['kerusi', 'chair'], ['pagar', 'gate'], ['pam', 'pump'], ['loceng', 'bell'],
        ['rambut', 'hair'], ['baldi', 'pail'], ['keldai', 'tail'], ['beg', 'bag'], ['oren', 'orange'], ['adik', 'sister'],
        ['dua mata', 'eyes']].map(([m, e]) => C(P(m), e, e, m, 'en'))] },
    { id: 'jw1', s: 'JW', title: 'Huruf Rumi & Jawi', desc: 'b=ب, c=چ, p=ڤ', cards: [
      ['ب', 'b', 'ba'], ['چ', 'c', 'ca'], ['ج', 'j', 'jim'], ['ڤ', 'p', 'pa'], ['ن', 'n', 'nun'], ['س', 's', 'sin'],
      ['ݢ', 'g', 'ga'], ['ک', 'k', 'kaf'], ['ل', 'l', 'lam'], ['ر', 'r', 'ra'], ['ت', 't', 'ta'], ['د', 'd', 'dal']]
      .map(([j, r, n]) => C(T(j), r, n, 'huruf ' + n + ' = ' + r)) },
    { id: 'jw2', s: 'JW', title: 'Perkataan Jawi', desc: 'چيكو، ايتيق، تولڠ', cards: [
      ['ciku', 'چيكو'], ['jam', 'جم'], ['itik', 'ايتيق'], ['saku', 'ساكو'], ['roti', 'روتي'], ['sudu', 'سودو'],
      ['susu', 'سوسو'], ['nasi', 'ناسي'], ['cawan', 'چاون'], ['baju', 'باجو'], ['tisu', 'تيسو'], ['guru', 'ݢورو'],
      ['cili', 'چيلي'], ['kuda', 'كودا'], ['tulang', 'تولڠ'], ['ikan', 'ايکن']]
      .map(([w, j]) => C(P(w), j, w, w)) },
    { id: 'mt1', s: 'MT', title: 'Nombor, Wang & Jam', desc: '10–100, sen, RM, pukul', cards: [
      C(T('10 20 30 40 50'), 'Kira sepuluh-sepuluh', 'sepuluh, dua puluh, tiga puluh, empat puluh, lima puluh', 'Nombor menaik'),
      C(T('90 80 70 60 50'), 'Nombor menurun', 'sembilan puluh, lapan puluh, tujuh puluh, enam puluh, lima puluh', 'Nombor menurun'),
      C(E('🪙10 + 🪙10 + 🪙10', 'syiling'), '30 sen', 'sepuluh sen tambah sepuluh sen tambah sepuluh sen sama dengan tiga puluh sen', 'Wang syiling'),
      C(E('💵RM1 + 💵RM1', 'wang kertas'), 'RM2', 'satu ringgit tambah satu ringgit sama dengan dua ringgit', 'Wang kertas'),
      C({ clock: 7 }, 'Pukul 7', 'pukul tujuh', 'Jarum pendek di 7, jarum panjang di 12'),
      C({ clock: 3 }, 'Pukul 3', 'pukul tiga', 'Jarum pendek di 3, jarum panjang di 12'),
      C(T('17 18 19 20'), 'Turutan', 'tujuh belas, lapan belas, sembilan belas, dua puluh', 'Nombor menaik'),
      C(E(rep('🏀', 5), 'lima'), '8 − 3 = 5', 'lapan tolak tiga sama dengan lima', 'Tolak')] },
    { id: 'sn1', s: 'SN', title: 'Sains & Teknologi', desc: 'Lampu isyarat, deria, tumbuhan', cards: [
      C({ sw: '#e53935', w: 'merah' }, 'Merah = berhenti', 'lampu merah bermaksud berhenti', 'Lampu isyarat atas'),
      C({ sw: '#fdd835', w: 'kuning' }, 'Kuning = bersedia', 'lampu kuning bermaksud bersedia', 'Lampu isyarat tengah'),
      C({ sw: '#43a047', w: 'hijau' }, 'Hijau = jalan', 'lampu hijau bermaksud jalan', 'Lampu isyarat bawah'),
      C(P('durian'), 'berbau', 'durian berbau', 'Durian & tong sampah berbau'), C(P('pemadam'), 'tidak berbau', 'pemadam tidak berbau', 'Buku & pemadam tidak berbau'),
      C(P('pelampung'), 'timbul', 'pelampung timbul', 'Pelampung & bola timbul'), C(P('kunci'), 'tenggelam', 'kunci tenggelam', 'Kunci tenggelam'),
      C(P('daun'), 'daun', 'daun', 'Bahagian tumbuhan'), C(P('akar'), 'akar', 'akar', 'Bahagian tumbuhan'), C(P('tomato'), 'buah', 'buah', 'Bahagian tumbuhan'),
      C(P('ayam'), 'bertelur', 'ayam bertelur', 'Pembiakan'), C(P('tikus'), 'melahirkan', 'tikus melahirkan anak', 'Pembiakan'),
      C(P('lembu'), 'halal', 'lembu halal dimakan', 'Haiwan halal: lembu, rusa')] },
  ],
};

/* =====================================================================
   SET SOALAN — 10 soalan / 100 markah (BM 40, BA 10, BI 10, JW 20, MT 10, SN 10)
   type: pick | scatter | match | fill | arrange | draw | cross
   ===================================================================== */
const SETS = {
  5: [
    { id: '5-1', name: 'SET 1', src: 'Little Steps Mumtaz · 5 Tahun', qs: [
      { s: 'BM', title: 'Padankan gambar dengan huruf vokal yang betul.', type: 'match',
        pairs: [[P('awan'), L('a')], [P('epal'), L('e')], [P('ikan'), L('i')], [P('orang'), L('o')], [P('ulat'), L('u')]] },
      { s: 'BM', title: 'Bulatkan huruf besar yang betul.', type: 'pick', style: 'circle', rows: [
        { prompt: L('b'), opts: [L('D'), L('B'), L('P')], ans: 1 }, { prompt: L('h'), opts: [L('H'), L('N'), L('K')], ans: 0 },
        { prompt: L('m'), opts: [L('W'), L('M'), L('N')], ans: 1 }, { prompt: L('q'), opts: [L('O'), L('G'), L('Q')], ans: 2 },
        { prompt: L('t'), opts: [L('F'), L('T'), L('L')], ans: 1 }] },
      { s: 'BM', title: 'Warnakan gambar yang betul.', type: 'pick', style: 'colour', rows: [
        { prompt: T('ba'), opts: [P('baju'), P('buku')], ans: 0 }, { prompt: T('su'), opts: [P('penyapu'), P('susu')], ans: 1 },
        { prompt: T('ro'), opts: [P('rusa'), P('roti')], ans: 1 }, { prompt: T('me'), opts: [P('meja'), P('mata')], ans: 0 },
        { prompt: T('ka'), opts: [P('kereta'), P('kaki')], ans: 1 }] },
      { s: 'BM', title: 'Isi tempat kosong dengan huruf yang betul.', type: 'fill', tile: 'letter', extra: ['o', 'u'], rows: [
        { p: P('baju'), parts: ['b', null, 'j', 'u'], ans: ['a'] }, { p: P('roti'), parts: ['r', 'o', null, 'i'], ans: ['t'] },
        { p: P('meja'), parts: ['m', null, 'j', 'a'], ans: ['e'] }, { p: P('kaki'), parts: ['k', 'a', 'k', null], ans: ['i'] },
        { p: P('kereta'), parts: ['k', 'e', null, 'e', 't', 'a'], ans: ['r'] }] },
      { s: 'BA', title: 'Padankan jawapan yang betul.', ar: 'وَفِّقْ', type: 'match', fixed: true, groupL: 2,
        L: [T('بَقَرَةٌ'), T('فِيلٌ'), T('سِرْوَالٌ'), T('حِمَارٌ'), T('أَحْمَرُ'), T('أَسْوَدُ'), T('جَدٌّ'), T('أُخْتٌ'), P('pisang'), P('mangga')],
        R: [P('gajah'), P('seluar'), { sw: '#e53935', w: 'merah' }, P('kakak'), T('مَوْزٌ')],
        ans: [[1, 0], [2, 1], [4, 2], [7, 3], [8, 4]] },
      { s: 'BI', title: 'Tick (✓) the correct answer.', type: 'pick', style: 'tick', rows: [
        { prompt: P('jaring', { label: 'net' }), opts: [T('pet'), T('net')], ans: 1 },
        { prompt: P('potong', { label: 'cut' }), opts: [L('c'), L('h')], ans: 0 },
        { prompt: P('kipas', { label: 'fan' }), opts: [L('f'), L('b')], ans: 0 },
        { prompt: P('tin'), opts: [T('pin'), T('tin')], ans: 1 }, { prompt: P('matahari'), opts: [T('sun'), T('bun')], ans: 0 }] },
      { s: 'JW', title: 'Tandakan (✓) jawapan yang betul.', jawi: 'تندأكن (✓) جاوڤن يڠ بتول', parts: [
        { label: 'A', title: 'Pilih ejaan Jawi yang betul.', marks: 4, type: 'pick', style: 'tick', rows: [
          { prompt: T('buku'), opts: [J('بوكي', 'buki'), J('بوكو', 'buku'), J('باكو', 'baku')], ans: 1 },
          { prompt: T('baju'), opts: [J('باجي', 'baji'), J('بيجو', 'biju'), J('باجو', 'baju')], ans: 2 }] },
        { label: 'B', title: 'Lengkapkan perkataan Jawi dengan suku kata akhir yang betul.', marks: 6, type: 'pick', style: 'tick', rows: [
          { prompt: P('kuda', { label: 'كو __' }), opts: [J('دي', 'di'), J('دا', 'da')], ans: 1 },
          { prompt: P('bola', { label: 'بو __' }), opts: [J('لا', 'la'), J('لي', 'li')], ans: 0 },
          { prompt: P('mata', { label: 'ما __' }), opts: [J('تي', 'ti'), J('تا', 'ta')], ans: 1 }] }] },
      { s: 'JW', title: 'Padankan gambar dengan perkataan Jawi yang betul.', jawi: 'ڤادنكن ݢمبر دڠن ڤرکاتاءن جاوي يڠ بتول', type: 'match',
        pairs: [[P('rumah'), J('رومه', 'rumah')], [P('ikan'), J('ايکن', 'ikan')], [P('meja'), J('ميجا', 'meja')], [P('topi'), J('توڤي', 'topi')], [P('susu'), J('سوسو', 'susu')]] },
      { s: 'MT', title: 'Selesaikan.', parts: [
        { label: 'A', title: 'Tandakan (✓) pada kumpulan yang lebih banyak.', marks: 2, type: 'pick', style: 'tick', rows: [
          { opts: [E(rep('🐟', 3), 'tiga ekor ikan'), E(rep('🐟', 4), 'empat ekor ikan')], ans: 1 }] },
        { label: 'B', title: 'Kira objek dan tulis angkanya.', marks: 2, type: 'fill', num: true, rows: [
          { p: E(rep('☕', 3), 'cawan'), parts: [null], ans: [3] }] },
        { label: 'C', title: 'Lengkapkan turutan nombor.', marks: 2, type: 'fill', num: true, rows: [
          { p: E('🚂', 'kereta api'), parts: ['10', null, '30', null], ans: [20, 40] }] },
        { label: 'D', title: 'Selesaikan operasi berikut.', marks: 4, type: 'fill', num: true, rows: [
          { p: E('🌙🌙🌙 + 🌙🌙', 'bulan'), parts: ['3 + 2 =', null], ans: [5] }, { parts: ['4 − 2 =', null], ans: [2] }] }] },
      { s: 'SN', title: 'Suaikan jawapan yang betul.', type: 'match', many: true,
        L: [P('ikan'), P('burung'), P('helikopter'), P('kapal'), P('lori')],
        R: [P('udara', { label: 'udara' }), P('air', { label: 'air' }), P('darat', { label: 'darat' })],
        ans: [[0, 1], [1, 0], [2, 0], [3, 1], [4, 2]] },
    ] },

    { id: '5-2', name: 'SET 2', src: 'Little Steps Mumtaz · 5 Tahun', qs: [
      { s: 'BM', title: 'Bulatkan huruf p.', type: 'scatter', bg: '🫙', letters: ['p', 'q', 'p', 'p', 'q', 'p', 'q', 'p'], targets: ['p'] },
      { s: 'BM', title: 'Warnakan huruf vokal yang betul.', type: 'pick', style: 'colour', rows: [
        { prompt: P('awan'), opts: [L('a'), L('o')], ans: 0 }, { prompt: P('ikan'), opts: [L('i'), L('e')], ans: 0 },
        { prompt: P('ulat'), opts: [L('a'), L('u')], ans: 1 }, { prompt: P('obor'), opts: [L('i'), L('o')], ans: 1 },
        { prompt: T('6', { w: 'enam', say: 'enam' }), opts: [L('e'), L('a')], ans: 0 }] },
      { s: 'BM', title: 'Suaikan.', type: 'match',
        pairs: [[T('ta'), P('tali')], [T('bi'), P('bibir')], [T('lu'), P('luka')], [T('sa'), T('1', { say: 'satu' })], [T('li'), P('lipas')]] },
      { s: 'BM', title: 'Tuliskan perkataan yang diberi berdasarkan gambar.', type: 'fill', tile: 'word', once: true,
        bank: ['susu', 'titi', 'laci', 'bola', 'ubat', 'ayam'], bankFixed: true, rows: [
          { p: P('susu'), parts: [null], ans: ['susu'], example: true }, { p: P('laci'), parts: [null], ans: ['laci'] },
          { p: P('bola'), parts: [null], ans: ['bola'] }, { p: P('ubat'), parts: [null], ans: ['ubat'] },
          { p: P('titi'), parts: [null], ans: ['titi'] }, { p: P('ayam'), parts: [null], ans: ['ayam'] }] },
      { s: 'BA', title: 'Padankan jawapan yang betul.', ar: 'وَفِّقْ', type: 'match',
        pairs: [[{ sw: '#212121', w: 'hitam' }, T('أَسْوَدُ')], [P('duduk'), T('جَلَسَ')], [T('٣'), T('ثَلَاثَةٌ')], [P('buku'), T('كِتَابٌ')], [P('gigi'), T('سِنٌّ')]] },
      { s: 'BI', title: 'Circle the correct answer.', type: 'pick', style: 'circle', rows: [
        { prompt: P('semut'), opts: [L('a'), L('c')], ans: 0 }, { prompt: P('van'), opts: [L('w'), L('v')], ans: 1 },
        { prompt: P('layang-layang'), opts: [T('key'), T('kite')], ans: 1 }, { prompt: P('tikus'), opts: [T('rat'), T('red')], ans: 0 },
        { prompt: T('cake'), opts: [P('kek'), P('aiskrim')], ans: 0 }] },
      { s: 'JW', title: 'Bulatkan dua gambar yang bunyi pangkalnya sama.', jawi: 'بولتكن دوا ݢمبر يڠ بوپي ڤڠکلڽ سام', type: 'pick', style: 'circle', rows: [
        { opts: [P('paku'), P('pasu'), P('pisang')], ans: [0, 1] }, { opts: [P('badak'), P('bulan'), P('bukit')], ans: [1, 2] },
        { opts: [P('ulat'), P('ikan'), P('udang')], ans: [0, 2] }, { opts: [P('ciku'), P('cili'), P('cawan')], ans: [0, 1] },
        { opts: [P('awan'), P('ayam'), P('ular')], ans: [0, 1] }] },
      { s: 'JW', title: 'Tandakan (✓) pada jawapan yang betul.', jawi: 'تندأكن (✓) ڤد جاوڤن يڠ بتول', type: 'pick', style: 'tick', rows: [
        { prompt: J('بي', 'bi'), opts: [J('تي', 'ti'), J('بي', 'bi')], ans: 1 }, { prompt: J('جا', 'ja'), opts: [J('جا', 'ja'), J('چا', 'ca')], ans: 0 },
        { prompt: J('كا', 'ka'), opts: [J('ݢا', 'ga'), J('كا', 'ka')], ans: 1 }, { prompt: J('غي', 'ghi'), opts: [J('ڤي', 'pi'), J('غي', 'ghi')], ans: 1 },
        { prompt: J('قو', 'qu'), opts: [J('تو', 'tu'), J('قو', 'qu')], ans: 1 }] },
      { s: 'MT', title: 'Selesaikan.', parts: [
        { label: 'A', title: 'Kira dan tulis bilangannya.', marks: 6, type: 'fill', num: true, rows: [
          { p: { scene: ['🐢', '🐟', '🐢', '🪼', '🐙', '🐟', '🪼', '🐢'], w: 'laut' }, parts: ['🐟 ikan =', null], ans: [2] },
          { parts: ['🐢 penyu =', null], ans: [3] }, { parts: ['🐙 sotong =', null], ans: [1] }] },
        { label: 'B', title: 'Lengkapkan turutan nombor.', marks: 4, type: 'fill', num: true, rows: [
          { p: E('🦀🦀🦀🦀', 'ketam'), parts: ['5', null, '7', null], ans: [6, 8] }] }] },
      { s: 'SN', title: 'Suaikan jawapan yang betul.', type: 'match',
        pairs: [[P('arnab'), P('lobak')], [P('pokok pisang'), P('pisang')], [P('pokok strawberi'), P('strawberi')], [P('labah-labah'), P('sarang')], [P('harimau'), P('daging')]] },
    ] },

    { id: '5-3', name: 'SET 3', src: 'Little Steps Mumtaz · 5 Tahun', qs: [
      { s: 'BM', title: 'Bulatkan huruf j.', type: 'scatter', bg: '🍄', letters: ['j', 'i', 'j', 'i', 'i', 'j', 'j', 'i', 'i', 'j'], targets: ['j'] },
      { s: 'BM', title: 'Bulatkan huruf vokal.', type: 'scatter', bubble: true, letters: ['a', 'c', 'i', 'n', 'o', 'u', 'e'], targets: ['a', 'e', 'i', 'o', 'u'] },
      { s: 'BM', title: 'Suaikan.', type: 'match',
        pairs: [[T('ba'), P('batu')], [T('si'), P('siku')], [T('la'), P('labu')], [T('bu'), P('buku')], [T('su'), P('sudu')]] },
      { s: 'BM', title: 'Tulis perkataan yang diberi berdasarkan gambar.', type: 'fill', tile: 'word', once: true,
        bank: ['bola', 'tiga', 'buku', 'tali', 'bubu', 'guli'], bankFixed: true, rows: [
          { p: P('buku'), parts: [null], ans: ['buku'], example: true }, { p: T('3', { say: 'tiga' }), parts: [null], ans: ['tiga'] },
          { p: P('guli'), parts: [null], ans: ['guli'] }, { p: P('tali'), parts: [null], ans: ['tali'] },
          { p: P('bola'), parts: [null], ans: ['bola'] }, { p: P('bubu'), parts: [null], ans: ['bubu'] }] },
      { s: 'BA', title: 'Padankan jawapan yang betul.', ar: 'وَفِّقْ', type: 'match',
        pairs: [[P('abang'), T('أَخٌ')], [P('ibu'), T('أُمٌّ')], [P('bapa'), T('أَبٌ')], [T('٥'), T('خَمْسَةٌ')], [T('٨'), T('ثَمَانِيَةٌ')]] },
      { s: 'BI', title: 'Circle the correct word.', type: 'pick', style: 'circle', rows: [
        { prompt: P('topi'), opts: [T('bat'), T('hat')], ans: 1 }, { prompt: P('epal'), opts: [T('apple'), T('cake')], ans: 0 },
        { prompt: P('matahari'), opts: [T('zip'), T('sun')], ans: 1 }, { prompt: P('telur'), opts: [T('egg'), T('pen')], ans: 0 },
        { prompt: P('arnab'), opts: [T('rabbit'), T('zebra')], ans: 0 }] },
      { s: 'JW', title: 'Tandakan (✓) huruf pangkal yang betul.', jawi: 'تندأكن (✓) حروف ڤڠکل يڠ بتول', type: 'pick', style: 'tick', rows: [
        { prompt: P('jam'), opts: [J('ج', 'jim'), J('س', 'sin'), J('د', 'dal')], ans: 0 },
        { prompt: P('gigi'), opts: [J('و', 'wau'), J('ݢ', 'ga'), J('ي', 'ya')], ans: 1 },
        { prompt: P('ayam'), opts: [J('م', 'mim'), J('ا', 'alif'), J('ن', 'nun')], ans: 1 },
        { prompt: P('kuda'), opts: [J('ک', 'kaf'), J('غ', 'ghain'), J('ت', 'ta')], ans: 0 },
        { prompt: P('nuri'), opts: [J('ط', 'to'), J('ف', 'fa'), J('ن', 'nun')], ans: 2 }] },
      { s: 'JW', title: 'Bulatkan suku kata yang sama.', jawi: 'بولتكن سوکو کات يڠ سام', type: 'pick', style: 'circle', rows: [
        { prompt: J('سو', 'su'), opts: [J('صو', 'su'), J('سو', 'su')], ans: 1 }, { prompt: J('يا', 'ya'), opts: [J('يا', 'ya'), J('تا', 'ta')], ans: 0 },
        { prompt: J('كا', 'ka'), opts: [J('كا', 'ka'), J('كي', 'ki')], ans: 0 }, { prompt: J('هو', 'hu'), opts: [J('حو', 'hu'), J('هو', 'hu')], ans: 1 },
        { prompt: J('نا', 'na'), opts: [J('ما', 'ma'), J('نا', 'na')], ans: 1 }] },
      { s: 'MT', title: 'Selesaikan.', parts: [
        { label: 'A', title: 'Lengkapkan nombor menaik.', marks: 3, type: 'fill', num: true, rows: [{ p: E('🚂', 'kereta api'), parts: ['4', null, '6', null, null], ans: [5, 7, 8] }] },
        { label: 'B', title: 'Lengkapkan nombor menurun.', marks: 3, type: 'fill', num: true, rows: [{ p: E('🚂', 'kereta api'), parts: ['10', null, '8', null, null], ans: [9, 7, 6] }] },
        { label: 'C', title: 'Selesaikan operasi tambah dan tolak.', marks: 4, type: 'fill', num: true, rows: [
          { p: P('kereta'), parts: ['4 + 3 =', null], ans: [7] }, { p: P('kereta'), parts: ['8 − 2 =', null], ans: [6] }] }] },
      { s: 'SN', title: 'Suaikan jawapan yang betul.', parts: [
        { label: 'A', title: 'Suaikan anggota deria dengan objek yang betul.', marks: 4, type: 'match', pairs: [[P('lidah'), P('aiskrim')], [P('hidung'), P('bunga')]] },
        { label: 'B', title: 'Suaikan objek dengan jawapan yang betul.', marks: 6, type: 'match', many: true,
          L: [P('paku'), P('bola'), P('bulu')], R: [T('TERAPUNG'), T('TENGGELAM')], ans: [[0, 1], [1, 0], [2, 0]] }] },
    ] },

    { id: '5-4', name: 'SET 4', src: 'Little Steps Mumtaz · 5 Tahun (corak Ujian PASTI 2024)', qs: [
      { s: 'BM', title: 'Bulatkan huruf vokal yang sama.', type: 'pick', style: 'circle', rows: [
        { prompt: L('a'), opts: [L('c'), L('a')], ans: 1 }, { prompt: L('e'), opts: [L('e'), L('a')], ans: 0 },
        { prompt: L('i'), opts: [L('l'), L('i')], ans: 1 }, { prompt: L('o'), opts: [L('o'), L('a')], ans: 0 },
        { prompt: L('u'), opts: [L('v'), L('u')], ans: 1 }] },
      { s: 'BM', title: 'Suaikan huruf kecil dengan huruf besar.', type: 'match', fixed: true, groupR: 2,
        L: [L('b'), L('d'), L('g'), L('k'), L('f')],
        R: [L('B'), L('D'), L('D'), L('B'), L('G'), L('Q'), L('K'), L('R'), L('E'), L('F')],
        ans: [[0, 0], [1, 2], [2, 4], [3, 6], [4, 9]] },
      { s: 'BM', title: 'Warnakan suku kata awal yang mewakili gambar.', type: 'pick', style: 'colour', rows: [
        { prompt: P('lalat'), opts: [T('ta'), T('sa'), T('la')], ans: 2 }, { prompt: P('baju'), opts: [T('sa'), T('ba'), T('la')], ans: 1 },
        { prompt: P('siput'), opts: [T('bi'), T('si'), T('li')], ans: 1 }, { prompt: P('tikus'), opts: [T('bi'), T('ti'), T('li')], ans: 1 },
        { prompt: P('tupai'), opts: [T('tu'), T('li'), T('mi')], ans: 0 }] },
      { s: 'BM', title: 'Tulis perkataan yang betul berdasarkan gambar.', type: 'fill', tile: 'word', once: true,
        bank: ['ulat', 'awan', 'ayam', 'atap', 'epal'], bankFixed: true, rows: [
          { p: P('awan'), parts: [null], ans: ['awan'] }, { p: P('epal'), parts: [null], ans: ['epal'] }, { p: P('atap'), parts: [null], ans: ['atap'] },
          { p: P('ulat'), parts: [null], ans: ['ulat'] }, { p: P('ayam'), parts: [null], ans: ['ayam'] }] },
      { s: 'BA', title: 'Padankan gambar dengan perkataan Arab yang betul.', ar: 'وَفِّقْ', type: 'match',
        pairs: [[P('papan hitam'), T('سَبُّورَةٌ')], [P('rambut'), T('شَعْرٌ')], [P('biskut'), T('بِسْكُوِيتٌ')], [E(rep('⚽', 6), 'enam biji bola'), T('٦')], [P('membaca'), T('قَرَأَ')]] },
      { s: 'BI', title: 'Fill in the blanks.', type: 'fill', tile: 'letter', rows: [
        { p: P('pen', { label: 'pen' }), parts: [null, null, null], ans: ['p', 'e', 'n'] },
        { p: P('kereta', { label: 'car' }), parts: [null, null, null], ans: ['c', 'a', 'r'] },
        { p: P('kunci', { label: 'key' }), parts: [null, null, null], ans: ['k', 'e', 'y'] },
        { p: P('kotak', { label: 'box' }), parts: [null, null, null], ans: ['b', 'o', 'x'] },
        { p: P('tikar', { label: 'mat' }), parts: [null, null, null], ans: ['m', 'a', 't'] }] },
      { s: 'JW', title: 'Jawi', parts: [
        { label: 'A', title: 'Tandakan (✓) pada 2 pasangan gambar yang mempunyai bunyi awal yang sama.', jawi: 'تندأكن (✓) ڤد ٢ ڤاسڠن ݢمبر يڠ بوپي اولڽ سام', marks: 6, type: 'pick', style: 'tick', rows: [
          { opts: [{ pp: [P('ayam'), P('awan')] }, { pp: [P('kacang'), P('itik')] }, { pp: [P('labu'), P('tayar')] },
            { pp: [P('jari'), P('jala')] }, { pp: [P('batu'), P('pasu')] }, { pp: [P('rumah'), P('tayar')] }], ans: [0, 3] }] },
        { label: 'B', title: 'Suaikan suku kata dengan gambar yang betul.', marks: 4, type: 'match', pairs: [[J('دا', 'da'), P('dadu')], [J('رو', 'ru'), P('rumah')]] }] },
      { s: 'JW', title: 'Jawi', parts: [
        { label: 'A', title: 'Bulatkan jawapan yang betul.', jawi: 'بولتكن جاوڤن يڠ بتول', marks: 6, type: 'pick', style: 'circle', rows: [
          { prompt: P('tali'), opts: [J('جالا', 'jala'), J('تالي', 'tali')], ans: 1 }, { prompt: P('susu'), opts: [J('تيتي', 'titi'), J('سوسو', 'susu')], ans: 1 },
          { prompt: P('kuda'), opts: [J('سودو', 'sudu'), J('كودا', 'kuda')], ans: 1 }] },
        { label: 'B', title: 'Warnakan gambar yang mempunyai suku kata awal چ (c).', jawi: 'ورناکن ݢمبر يڠ مڠندوڠي سوکو کات اول چ', marks: 4, type: 'pick', style: 'colour', layout: 'scene', rows: [
          { opts: [P('bunga'), P('cili'), P('topi'), P('pasu'), P('ciku'), P('budak')], ans: [1, 4] }] }] },
      { s: 'MT', title: 'Selesaikan.', parts: [
        { label: 'A', title: 'Lengkapkan nombor menaik.', marks: 2, type: 'fill', num: true, rows: [{ parts: ['1', null, '3', null], ans: [2, 4] }] },
        { label: 'B', title: 'Lukis bentuk bulat mengikut angka.', marks: 4, type: 'draw', rows: [{ n: 2, example: true }, { n: 5 }, { n: 7 }] },
        { label: 'C', title: 'Kira dan tulis jawapan.', marks: 4, type: 'fill', num: true, rows: [
          { p: E(rep('🍰', 8) + ' + 🍰🍰', 'kek'), parts: ['8 + 2 =', null], ans: [10] },
          { p: E('🍦🍦🍦❌❌❌', 'aiskrim'), parts: ['6 − 3 =', null], ans: [3] }] }] },
      { s: 'SN', title: 'Suaikan jawapan yang betul.', sub: 'Padankan setiap objek dengan anggota deria yang betul.', type: 'match',
        pairs: [[P('radio'), P('telinga')], [P('televisyen'), P('mata')], [P('bunga'), P('hidung')], [P('aiskrim'), P('lidah')], [P('bulu', { label: 'bulu pelepah' }), P('kulit')]] },
    ] },
  ],

  6: [
    { id: '6-1', name: 'SET 1', src: 'Little Steps Mumtaz · 6 Tahun', qs: [
      { s: 'BM', title: 'Berpandukan perkataan, tulis semula dengan HURUF BESAR.', marks: 20, type: 'fill', tile: 'letter',
        rows: ['baju', 'mata', 'kaki', 'gula', 'susu', 'nasi', 'roti', 'buku', 'meja', 'bola'].map(w => ({
          p: T(w), parts: w.split('').map(() => null), ans: w.toUpperCase().split('') })) },
      { s: 'BM', title: 'Bulatkan jawapan yang betul.', marks: 8, type: 'pick', style: 'circle', rows: [
        { prompt: P('anjing'), opts: [T('singa'), T('anjing'), T('lembu')], ans: 1 }, { prompt: P('rumah'), opts: [T('rumah'), T('kedai'), T('masjid')], ans: 0 },
        { prompt: P('buku'), opts: [T('beg'), T('buku'), T('pensel')], ans: 1 }, { prompt: P('matahari'), opts: [T('bintang'), T('bulan'), T('matahari')], ans: 2 }] },
      { s: 'BM', title: 'Isi huruf kecil yang hilang.', marks: 12, type: 'fill', tile: 'letter', rows: [
        { parts: ['a', 'b', null, 'd', null, 'f', 'g'], ans: ['c', 'e'] }, { parts: [null, 'i', 'j', null, null, 'm', null], ans: ['h', 'k', 'l', 'n'] },
        { parts: [null, 'p', null, 'r', 's', null], ans: ['o', 'q', 't'] }, { parts: [null, 'v', null, null, 'y', 'z'], ans: ['u', 'w', 'x'] }] },
      { s: 'BI', title: 'Match the number words to the correct numerals.', type: 'match',
        pairs: [[T('Seven'), T('7')], [T('One'), T('1')], [T('Twelve'), T('12')], [T('Four'), T('4')], [T('Nine'), T('9')]] },
      { s: 'MT', title: 'Isi tempat kosong dengan jawapan yang betul.', parts: [
        { label: 'a', title: 'Nombor menaik.', marks: 5, type: 'fill', num: true, rows: [
          { parts: ['1', null, '3', null, '5'], ans: [2, 4] }, { parts: ['3', '4', null, '6', null], ans: [5, 7] }, { parts: ['6', null, '8', '9', '10'], ans: [7] }] },
        { label: 'b', title: 'Nombor menurun.', marks: 5, type: 'fill', num: true, rows: [
          { parts: ['10', null, '8', null, '6'], ans: [9, 7] }, { parts: ['8', '7', null, '5', null], ans: [6, 4] }, { parts: ['6', null, '4', '3', '2'], ans: [5] }] }] },
      { s: 'JW', title: 'Padankan huruf Rumi dengan huruf Jawi.', jawi: 'ڤادنكن حروف رومي دڠن حروف جاوي', type: 'match',
        pairs: [[L('b'), J('ب', 'ba')], [L('c'), J('چ', 'ca')], [L('j'), J('ج', 'jim')], [L('p'), J('ڤ', 'pa')], [L('n'), J('ن', 'nun')]] },
      { s: 'JW', title: 'Warnakan suku kata awal yang betul.', jawi: 'ورناکن سوکو کات اول يڠ بتول', type: 'pick', style: 'colour', rows: [
        { prompt: P('singa'), opts: [J('سو', 'su'), J('سي', 'si')], ans: 1 }, { prompt: P('bulan'), opts: [J('بو', 'bu'), J('تي', 'ti')], ans: 0 },
        { prompt: P('pisang'), opts: [J('ڤا', 'pa'), J('ڤي', 'pi')], ans: 1 }, { prompt: P('nasi'), opts: [J('نو', 'no'), J('نا', 'na')], ans: 1 },
        { prompt: P('jagung'), opts: [J('جا', 'ja'), J('جي', 'ji')], ans: 0 }] },
      { s: 'BA', title: 'Padankan perkataan dengan gambar.', ar: 'وَفِّقْ بَيْنَ الصُّوَرِ وَالْكَلِمَاتِ', type: 'match',
        pairs: [[P('mata'), T('عَيْنٌ')], [P('gigi'), T('سِنٌّ')], [P('hidung'), T('أَنْفٌ')], [P('rambut'), T('شَعْرٌ')], [P('telinga'), T('أُذُنٌ')]] },
      { s: 'SN', title: 'Lampu isyarat.', parts: [
        { label: 'A', title: 'Warnakan lampu isyarat dan isi tempat kosong dengan jawapan yang diberikan.', marks: 6, type: 'fill', tile: 'word', once: true,
          bank: ['Hijau', 'Merah', 'Kuning'], bankFixed: true, rows: [{ p: { traffic: true, w: 'lampu isyarat' }, parts: ['Atas:', null, 'Tengah:', null, 'Bawah:', null], ans: ['Merah', 'Kuning', 'Hijau'] }] },
        { label: 'B', title: 'Bulatkan jawapan yang betul.', marks: 4, type: 'pick', style: 'circle', rows: [
          { prompt: T('Kuning bermaksud:'), opts: [T('bersedia'), T('berhenti')], ans: 0 }, { prompt: T('Hijau bermaksud:'), opts: [T('jalan'), T('berhenti')], ans: 0 }] }] },
    ] },

    { id: '6-2', name: 'SET 2', src: 'Little Steps Mumtaz · 6 Tahun', qs: [
      { s: 'BM', title: 'Suaikan.', type: 'match', pairs: [[T('je'), T('JE')], [T('ko'), T('KO')], [T('di'), T('DI')], [T('tu'), T('TU')], [T('ma'), T('MA')]] },
      { s: 'BM', title: 'Lorekkan huruf awalan yang mewakili gambar.', type: 'pick', style: 'colour', rows: [
        { prompt: P('gigi'), opts: [L('p'), L('g'), L('y'), L('u')], ans: 1 }, { prompt: P('jubah'), opts: [L('j'), L('h'), L('s'), L('m')], ans: 0 },
        { prompt: P('burung'), opts: [L('b'), L('k'), L('t'), L('p')], ans: 0 }, { prompt: P('paku'), opts: [L('a'), L('k'), L('t'), L('p')], ans: 3 },
        { prompt: P('wisel'), opts: [L('s'), L('w'), L('u'), L('e')], ans: 1 }] },
      { s: 'BM', title: 'Lengkapkan suku kata.', type: 'fill', tile: 'syll', once: true, rows: [
        { p: P('buku', { label: 'buku' }), parts: ['bu', null], ans: ['ku'] }, { p: P('roti', { label: 'roti' }), parts: [null, 'ti'], ans: ['ro'] },
        { p: P('nasi', { label: 'nasi' }), parts: ['na', null], ans: ['si'] }, { p: P('batu', { label: 'batu' }), parts: [null, 'tu'], ans: ['ba'] },
        { p: P('ceri', { label: 'ceri' }), parts: ['ce', null], ans: ['ri'] }] },
      { s: 'BM', title: 'Susun dan tulis semula.', type: 'arrange', rows: [
        { p: P('bola'), words: ['beli', 'bola.', 'Abu'], ans: 'Abu beli bola.' }, { p: P('ikan'), words: ['emas.', 'ikan', 'Ini'], ans: 'Ini ikan emas.' },
        { p: P('baju'), words: ['cuci', 'Liza', 'baju.'], ans: 'Liza cuci baju.' }, { p: P('jam'), words: ['cantik.', 'Jam', 'itu'], ans: 'Jam itu cantik.' },
        { p: P('ubi'), words: ['Saya', 'ubi.', 'ada'], ans: 'Saya ada ubi.' }] },
      { s: 'BA', title: 'Padankan jawapan yang betul.', ar: 'وَفِّقْ', type: 'pick', style: 'circle', rows: [
        { prompt: P('stoking'), opts: [T('حِذَاءٌ'), T('جَوْرَبٌ')], ans: 1 }, { prompt: P('pokok'), opts: [T('شَجَرَةٌ'), T('شَمْسٌ')], ans: 0 },
        { prompt: T('٧'), opts: [T('سَبْعَةٌ'), T('ثَمَانِيَةٌ')], ans: 0 }, { prompt: T('سَيَّارَةٌ'), opts: [P('kereta'), P('lori')], ans: 0 },
        { prompt: P('hidung'), opts: [T('أَنْفٌ'), T('أُذُنٌ')], ans: 0 }] },
      { s: 'BI', title: 'Fill in the blanks.', type: 'fill', tile: 'letter', extra: ['e', 'o'], rows: [
        { p: P('bola', { label: 'ball' }), parts: [null, 'a', null, 'l'], ans: ['b', 'l'] }, { p: P('paku', { label: 'nail' }), parts: ['n', null, 'i', null], ans: ['a', 'l'] },
        { p: P('kerusi', { label: 'chair' }), parts: ['c', 'h', null, null, 'r'], ans: ['a', 'i'] },
        { p: P('pagar', { label: 'gate' }), parts: [null, 'a', 't', 'e'], ans: ['g'] }, { p: P('pam', { label: 'pump' }), parts: [null, 'u', 'm', 'p'], ans: ['p'] }] },
      { s: 'JW', title: 'Warnakan objek yang betul.', jawi: 'ورناکن', words: [J('جم', 'jam'), J('ڤاسو', 'pasu'), J('بوکو', 'buku'), J('لاچي', 'laci'), J('ساتو', 'satu')],
        type: 'pick', style: 'colour', layout: 'scene', rows: [
          { opts: [P('komputer'), P('jam'), P('lampu'), P('pasu'), P('kerusi'), P('buku'), P('tong sampah'), P('laci'), T('1', { say: 'satu' })], ans: [1, 3, 5, 7, 8] }] },
      { s: 'JW', title: 'Lengkapkan perkataan.', jawi: 'لڠکڤکن', type: 'fill', tile: 'letter', once: true, dir: 'rtl', bank: ['ي', 'رو', 'ب', 'لي', 'س'], bankFixed: true, rows: [
        { p: P('baju', { label: 'baju' }), parts: [null, 'ا', 'ج', 'و'], ans: ['ب'] }, { p: P('ibu', { label: 'ibu' }), parts: ['ا', null, 'ب', 'و'], ans: ['ي'] },
        { p: P('tisu', { label: 'tisu' }), parts: ['ت', 'ي', null, 'و'], ans: ['س'] }, { p: P('guru', { label: 'guru' }), parts: ['ݢو', null], ans: ['رو'] },
        { p: P('cili', { label: 'cili' }), parts: ['چي', null], ans: ['لي'] }] },
      { s: 'MT', title: 'Selesaikan.', parts: [
        { label: 'A', title: 'Lengkapkan turutan nombor.', marks: 2, type: 'fill', num: true, rows: [{ parts: ['17', null, '19', null], ans: [18, 20] }] },
        { label: 'B', title: 'Tolak.', marks: 2, type: 'fill', num: true, rows: [{ p: E('🏀🏀🏀🏀🏀❌❌❌', 'bola keranjang'), parts: ['8 − 3 =', null], ans: [5] }] },
        { label: 'C', title: 'Kira nilai wang.', marks: 4, type: 'fill', num: true, rows: [
          { p: E('💵 + 💵', 'wang kertas'), parts: ['RM10 + RM10 = RM', null], ans: [20] }, { p: E('🪙 + 🪙', 'syiling'), parts: ['20 sen + 10 sen =', null, 'sen'], ans: [30] }] },
        { label: 'D', title: 'Lihat jam. Pukul berapa?', marks: 2, type: 'fill', num: true, rows: [{ p: { clock: 7, w: 'jam' }, parts: ['Pukul', null], ans: [7] }] }] },
      { s: 'SN', title: 'Suaikan jawapan yang betul.', type: 'match',
        pairs: [[T('basikal'), P('basikal')], [T('melahirkan'), P('tikus')], [T('bertelur'), E('🐔🥚', 'ayam dan telur')], [T('berbunga'), P('bunga raya')], [T('pokok kelapa'), P('pokok kelapa')]] },
    ] },

    { id: '6-3', name: 'SET 3', src: 'Little Steps Mumtaz · 6 Tahun (corak Ujian PASTI 2024)', qs: [
      { s: 'BM', title: 'Padankan suku kata yang sama.', type: 'match', pairs: [[T('hi'), T('hi')], [T('fa'), T('fa')], [T('ne'), T('ne')], [T('cu'), T('cu')], [T('go'), T('go')]] },
      { s: 'BM', title: 'Warnakan huruf yang membentuk perkataan yang betul.', type: 'pick', style: 'colour', rows: [
        { prompt: P('baju', { label: 'baju' }), opts: ['d', 'b', 'u', 'a', 'j'].map(L), ans: [1, 2, 3, 4] },
        { prompt: P('kuda', { label: 'kuda' }), opts: ['a', 'k', 'n', 'd', 'u'].map(L), ans: [0, 1, 3, 4] },
        { prompt: P('nasi', { label: 'nasi' }), opts: ['u', 'n', 'i', 's', 'a'].map(L), ans: [1, 2, 3, 4] },
        { prompt: P('dadu', { label: 'dadu' }), opts: ['a', 'd', 'b', 'u', 'd'].map(L), ans: [0, 1, 3, 4] },
        { prompt: P('labu', { label: 'labu' }), opts: ['l', 'c', 'u', 'a', 'b'].map(L), ans: [0, 2, 3, 4] }] },
      { s: 'BM', title: 'Lengkapkan huruf vokal yang hilang.', type: 'fill', tile: 'letter', bank: ['a', 'e', 'i', 'o', 'u'], bankFixed: true, rows: [
        { p: P('duri'), parts: ['d', null, 'r', 'i'], ans: ['u'] }, { p: P('siku'), parts: ['s', null, 'k', 'u'], ans: ['i'] },
        { p: P('wisel'), parts: ['w', 'i', 's', null, 'l'], ans: ['e'] }, { p: P('kotak'), parts: ['k', null, 't', 'a', 'k'], ans: ['o'] },
        { p: P('kipas'), parts: ['k', 'i', 'p', null, 's'], ans: ['a'] }] },
      { s: 'BM', title: 'Isikan tempat kosong berdasarkan gambar.', type: 'fill', tile: 'word', once: true, bank: ['nasi', 'gajah', 'kereta', 'teko', 'jam'], rows: [
        { p: P('nasi'), parts: ['Adik makan', null, '.'], ans: ['nasi'] }, { p: P('gajah'), parts: ['Badan', null, 'besar.'], ans: ['gajah'] },
        { p: P('kereta'), parts: ['Bapa beli', null, 'baru.'], ans: ['kereta'] }, { p: P('teko'), parts: ['Itu', null, 'ibu.'], ans: ['teko'] },
        { p: P('jam tangan'), parts: ['Di atas meja ada', null, '.'], ans: ['jam'] }] },
      { s: 'BA', title: 'Padankan gambar dengan perkataan.', ar: 'وَفِّقْ بَيْنَ الصُّوَرِ وَالْكَلِمَاتِ', type: 'match',
        pairs: [[P('papan hitam'), T('سَبُّورَةٌ')], [P('rambut'), T('شَعْرٌ')], [P('biskut'), T('بِسْكُوِيتٌ')], [E(rep('⚽', 6), 'enam biji bola'), T('٦')], [P('membaca'), T('قَرَأَ')]] },
      { s: 'BI', title: 'Tick (✓) the correct picture.', type: 'pick', style: 'tick', rows: [
        { prompt: T('I have a bag.'), opts: [P('beg'), P('bakul')], ans: 0 }, { prompt: T('I have a sister.'), opts: [P('ibu dan bayi'), P('adik')], ans: 1 },
        { prompt: T('I like to eat an orange.'), opts: [P('oren'), P('ceri')], ans: 0 }, { prompt: T('There are seven days in a week.'), opts: [T('5'), T('7')], ans: 1 },
        { prompt: T('I can see with my ____.'), opts: [P('dua mata'), P('telinga')], ans: 0 }] },
      { s: 'JW', title: 'Tandakan (✓) jawapan yang betul.', jawi: 'تندأكن (✓) جاوڤن يڠ بتول', type: 'pick', style: 'tick', rows: [
        { prompt: T('ciku'), opts: [J('چيلي', 'cili'), J('چيكو', 'ciku')], ans: 1 }, { prompt: T('cat'), opts: [J('چت', 'cat'), J('نت', 'nat')], ans: 0 },
        { prompt: T('itik'), opts: [J('ايتيق', 'itik'), J('ايكور', 'ekor')], ans: 0 }, { prompt: T('jam'), opts: [J('دم', 'dam'), J('جم', 'jam')], ans: 1 },
        { prompt: T('saku'), opts: [J('ساكو', 'saku'), J('سيكو', 'siku')], ans: 0 }] },
      { s: 'JW', title: 'Warnakan gambar berpandukan perkataan.', jawi: 'ورناکن ݢمبر برڤندوکن ڤرکاتاءن', words: [J('روتي', 'roti'), J('سودو', 'sudu'), J('سوسو', 'susu'), J('ناسي', 'nasi'), J('چاون', 'cawan')],
        type: 'pick', style: 'colour', layout: 'scene', rows: [
          { opts: [P('susu'), P('roti'), P('jag'), P('pisang'), P('nasi'), P('cawan'), P('telur goreng'), P('sudu'), P('lempeng')], ans: [0, 1, 4, 5, 7] }] },
      { s: 'MT', title: 'Selesaikan.', parts: [
        { label: 'a', title: 'Suaikan operasi tambah dengan jawapan yang betul.', marks: 3, type: 'match',
          pairs: [[T('5 + 1 ='), E(rep('🌶️', 6), 'enam cili')], [T('3 + 5 ='), E(rep('🐭', 8), 'lapan tikus')], [T('4 + 0 ='), E(rep('☕', 4), 'empat cawan')]] },
        { label: 'b', title: 'Lengkapkan nombor menaik.', marks: 2, type: 'fill', num: true, rows: [{ parts: ['10', null, '30', null, '50'], ans: [20, 40] }] },
        { label: 'c', title: 'Lengkapkan nombor menurun.', marks: 2, type: 'fill', num: true, rows: [{ parts: [null, '80', null, '60', '50'], ans: [90, 70] }] },
        { label: 'd', title: 'Kira nilai wang.', marks: 3, type: 'fill', num: true, rows: [
          { p: E('🪙10 🪙10 🪙10', 'syiling'), parts: [null, 'sen'], ans: [30] }, { p: E('🪙50 🪙5', 'syiling'), parts: [null, 'sen'], ans: [55] },
          { p: E('💵RM1 💵RM1', 'wang kertas'), parts: ['RM', null], ans: [2] }] }] },
      { s: 'SN', title: 'Suaikan jawapan yang betul.', parts: [
        { label: 'A', title: 'Padankan objek yang sama ciri (berbau / tidak berbau).', marks: 4, type: 'match',
          pairs: [[P('durian', { label: 'berbau' }), P('tong sampah', { label: 'berbau' })], [P('buku', { label: 'tidak berbau' }), P('pemadam', { label: 'tidak berbau' })]] },
        { label: 'B', title: 'Timbul atau tenggelam?', marks: 6, type: 'match', many: true,
          L: [P('kunci'), P('pelampung'), P('bola')], R: [T('timbul'), T('tenggelam')], ans: [[0, 1], [1, 0], [2, 0]] }] },
    ] },

    { id: '6-4', name: 'SET 4', src: 'Little Steps Mumtaz · 6 Tahun', qs: [
      { s: 'BM', title: 'Padankan huruf kecil dengan huruf besar.', type: 'match',
        pairs: [[L('f'), L('F')], [L('i'), L('I')], [L('l'), L('L')], [L('e'), L('E')], [L('m'), L('M')]] },
      { s: 'BM', title: 'Warnakan gambar berdasarkan suku kata awal yang diberi.', type: 'pick', style: 'colour', rows: [
        { prompt: T('ra'), opts: [P('budak'), P('pen'), P('raga')], ans: 2 }, { prompt: T('mi'), opts: [P('misai'), P('abang'), P('ikan')], ans: 0 },
        { prompt: T('nu'), opts: [P('rumah'), P('nuri'), P('daun')], ans: 1 }, { prompt: T('cu'), opts: [P('gigi'), P('cawan'), P('cuka')], ans: 2 },
        { prompt: T('pa'), opts: [P('harimau'), P('padi'), P('bunga')], ans: 1 }] },
      { s: 'BM', title: 'Tandakan (✓) pada jawapan yang betul.', type: 'pick', style: 'tick', rows: [
        { prompt: P('daun'), opts: [T('dahi'), T('daun')], ans: 1 }, { prompt: P('van'), opts: [T('van'), T('lori')], ans: 0 },
        { prompt: P('jarum'), opts: [T('paku'), T('jarum')], ans: 1 }, { prompt: P('gitar'), opts: [T('gajus'), T('gitar')], ans: 1 },
        { prompt: P('wisel'), opts: [T('siput'), T('wisel')], ans: 1 }] },
      { s: 'BM', title: 'Tulis jawapan yang betul.', type: 'fill', tile: 'sentence', once: true,
        bank: ['Paku itu tajam.', 'Badan gajah besar.', 'Kek itu manis.', 'Ali jala ikan.', 'Rumah saya cantik.'], bankFixed: true, rows: [
          { p: P('kek', { label: 'kek' }), parts: [null], ans: ['Kek itu manis.'] }, { p: P('jala', { label: 'jala' }), parts: [null], ans: ['Ali jala ikan.'] },
          { p: P('paku', { label: 'paku' }), parts: [null], ans: ['Paku itu tajam.'] }, { p: P('gajah', { label: 'gajah' }), parts: [null], ans: ['Badan gajah besar.'] },
          { p: P('rumah', { label: 'rumah' }), parts: [null], ans: ['Rumah saya cantik.'] }] },
      { s: 'BA', title: 'Bulatkan dua perkataan yang sama.', ar: 'دَوِّرْ كَلِمَتَيْنِ مُتَشَابِهَتَيْنِ', type: 'pick', style: 'circle', rows: [
        { opts: [T('لَبَنٌ'), T('لَبَنٌ'), T('رَسَمَ')], ans: [0, 1] }, { opts: [T('قَمِيصٌ'), T('جَدَّةٌ'), T('جَدَّةٌ')], ans: [1, 2] },
        { opts: [T('رَسَمَ'), T('أَسَدٌ'), T('رَسَمَ')], ans: [0, 2] }, { opts: [T('قَمِيصٌ'), T('قَمِيصٌ'), T('جَدَّةٌ')], ans: [0, 1] },
        { opts: [T('لَبَنٌ'), T('أَسَدٌ'), T('أَسَدٌ')], ans: [1, 2] }] },
      { s: 'BI', title: 'Tick (✓) the correct answer.', type: 'pick', style: 'tick', rows: [
        { prompt: P('loceng', { label: 'This is a ____.' }), opts: [T('ball'), T('bell')], ans: 1 },
        { prompt: P('rambut', { label: 'This is my ____.' }), opts: [T('hair'), T('pair')], ans: 0 },
        { prompt: P('baldi', { label: 'This is a ____.' }), opts: [T('pail'), T('hail')], ans: 0 },
        { prompt: P('pagar', { label: 'This is a ____.' }), opts: [T('date'), T('gate')], ans: 1 },
        { prompt: P('keldai', { label: 'This is a ____. (ekor)' }), opts: [T('tail'), T('tall')], ans: 0 }] },
      { s: 'JW', title: 'Warnakan bulatan bagi dua perkataan yang mempunyai suku kata akhir yang sama.', jawi: 'ورناکن بولتن باݢي دوا ڤرکاتاءن يڠ سوکو کات اخيرڽ سام', type: 'pick', style: 'colour', rows: [
        { opts: [J('قاري', 'kari'), J('ساتو', 'satu'), J('ساري', 'sari')], ans: [0, 2] }, { opts: [J('لاكو', 'laku'), J('توكو', 'toko'), J('كولا', 'kola')], ans: [0, 1] },
        { opts: [J('تيرو', 'tiru'), J('هاتي', 'hati'), J('تيتي', 'titi')], ans: [1, 2] }, { opts: [J('موكا', 'muka'), J('چوكا', 'cuka'), J('كامو', 'kamu')], ans: [0, 1] },
        { opts: [J('ساكو', 'saku'), J('ڤاسو', 'pasu'), J('ڤاكو', 'paku')], ans: [0, 2] }] },
      { s: 'JW', title: 'Isikan jawapan yang betul (silang kata).', jawi: 'ايسيکن سيلڠ کات', type: 'cross',
        clues: [{ p: P('kuda'), t: J('كودا', 'kuda') }, { p: P('tulang'), t: J('تولڠ', 'tulang') }, { p: P('nasi'), t: J('ناسي', 'nasi') }, { p: P('ikan'), t: J('ايکن', 'ikan') }, { p: P('roti'), t: J('روتي', 'roti') }],
        cols: 5, rows: 7,
        cells: [[0, 3, 'ک', 1], [1, 1, 'ڠ', 1], [1, 2, 'ل', 1], [1, 3, 'و', 0], [1, 4, 'ت', 0], [2, 3, 'د', 1], [3, 0, 'ن', 0], [3, 1, 'ک', 0], [3, 2, 'ي', 1], [3, 3, 'ا', 0],
          [4, 0, 'ا', 0], [5, 0, 'س', 1], [6, 0, 'ي', 0], [6, 1, 'ت', 0], [6, 2, 'و', 0], [6, 3, 'ر', 1]] },
      { s: 'MT', title: 'Selesaikan.', parts: [
        { label: 'A', title: 'Padankan nombor dengan perkataan.', marks: 6, type: 'match', pairs: [[T('5'), T('lima')], [T('10'), T('sepuluh')], [T('8'), T('lapan')]] },
        { label: 'B', title: 'Lengkapkan nombor pada muka jam.', marks: 2, type: 'fill', num: true, rows: [{ p: { clock: 3, hide: [9, 6], w: 'jam' }, parts: ['Kiri:', null, 'Bawah:', null], ans: [9, 6] }] },
        { label: 'C', title: 'Kira.', marks: 2, type: 'fill', num: true, rows: [{ parts: ['5 + 1 =', null], ans: [6] }, { parts: ['8 − 4 =', null], ans: [4] }] }] },
      { s: 'SN', title: 'Suaikan jawapan yang betul.', parts: [
        { label: 'A', title: 'Bahagian tumbuhan.', marks: 6, type: 'match', pairs: [[P('daun'), T('daun')], [P('akar'), T('akar')], [P('tomato'), T('buah')]] },
        { label: 'B', title: 'Warnakan haiwan yang halal dimakan.', marks: 4, type: 'pick', style: 'colour', layout: 'scene', rows: [
          { opts: [P('katak'), P('lembu'), P('rusa'), P('ular')], ans: [1, 2] }] }] },
    ] },
  ],
};

/* Dialog NPC */
const NPCS = [
  { id: 'cikgu', name: 'Cikgu Aminah', look: { gender: 'P', skin: '#e8b98f', hijabColor: '#7e57c2', hijabStyle: 'labuh', shirt: '#b39ddb', bottom: '#4527a0', acc: { glasses: true } },
    lines: [
      'Assalamualaikum! Selamat datang ke Kampung Celik Minda.',
      'Rumah oren di sebelah kiri ialah Rumah 5 Tahun. Rumah biru di sebelah kanan ialah Rumah 6 Tahun.',
      'Di dalam rumah, belajar dahulu semua modul. Bila ilmu sudah penuh, pintu kuiz akan terbuka.',
      'Selepas itu, cabar Raksasa Lupa! Semoga berjaya, insya-Allah!'] },
  { id: 'faris', name: 'Abang Faris', look: { gender: 'L', skin: '#c98d5f', hairStyle: 'pacak', hairColor: '#2b1b12', shirt: '#26a69a', bottom: '#37474f', acc: { kopiah: true } },
    lines: ['Tip: tekan gambar atau perkataan untuk dengar sebutannya.', 'Soalan padankan? Tarik garisan dari titik ke titik, macam dalam kertas ujian!'] },
  { id: 'sarah', name: 'Kak Sarah', look: { gender: 'P', skin: '#f9d7b5', hijabColor: '#ec407a', hijabStyle: 'bulat', shirt: '#f8bbd0', bottom: '#ad1457', acc: {} },
    lines: ['Lepas kuiz, lihat Rekod untuk tahu subjek mana yang perlu diulang kaji.', 'Markah kamu disimpan dalam peranti ini sahaja.'] },
];
